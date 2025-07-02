import { VisibilityChangedEvent } from './visibilityChangedEvent';
import { noChange, Part, render, TemplateResult } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { ChildPart, directive, DirectiveParameters, PartInfo } from 'lit/directive.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { areObjectsEqual } from '../../utils/shared';

/**
 * ? TODO
 * ! Dynamically set heights
 * ! On Disconnect, disconnect everything
 */

export interface UserProvidedConfig {
  width?: string | number;
  height?: string | number;
  items?: Array<any>;
  itemHeight: number | number[];
  total: number;
  generate: (index: number, style: string | Object) => TemplateResult | {
    element?: HTMLElement;
    height?: number;
  };
  horizontal?: boolean;
  reverse?: boolean;
  scroller?: TemplateResult;
  scrollerTagName?: string;
  scrollContainer?: HTMLElement;
  afterRender?: () => void;
  containerHeight?: number;
}

// Default configuration.
const defaultConfig = {
  maxWidth: 'auto',
  height: '100%'
};

// Check for valid number.
const isNumber = (input: number) => !Number.isNaN(Number(input));

export const virtualizerRef = Symbol('virtualizer');


export interface VirtualizerHostElement extends HTMLElement {
  [virtualizerRef]?: VirtualizedListDirective;
}

class VirtualizedListDirective extends AsyncDirective {

  /**
   * html`
   * <tr scroller />
   * <list of trs>
   *`
   */
  protected from!: number;
  protected to!: number;
  private container!: VirtualizerHostElement;
  // @ts-expect-error - Config is assigned via Object.assign, this will throw an error
  private config: UserProvidedConfig = {};

  private _tbody!: HTMLElement;
  private _lastRepaint!: number;
  private _maxElementHeight = VirtualizedListDirective.getMaxBrowserHeight();
  private _renderAnimationFrame!: number;
  private _scrollHeight!: number;
  private _itemHeights!: number[];
  private _itemPositions!: number[];
  private _averageHeight!: number;
  private _scrollPaddingBottom!: number;
  private _scrollPaddingTop!: number;
  private _cachedItemsLen!: number;
  private _screenItemsLen!: number;
  private _containerSize!: number;
  private _lastFrom!: number;
  private _vKey: number | string = Math.random();
  private _lastVKey: number | string;

  constructor(partInfo: ChildPart | PartInfo) {
    super(partInfo);
    this._tbody = (partInfo as ChildPart).parentNode as HTMLElement;
    this.container = this._tbody.closest('table') as HTMLTableElement;
    if(this.container) {
      this.container[virtualizerRef] = this;
    } else {
      throw new Error('Invalid container!');
    }
  }

  protected get isHorizontal() {
    return Boolean(this.config.horizontal);
  }

  /**
   * Merge given css style on an element
   * @param {DOMElement} element
   * @param {Object} style
   */
  static mergeStyle(element: HTMLElement, style: Object) {
    Object.assign(element.style, style);
  }

  static getMaxBrowserHeight() {
    // Create two elements, the wrapper is `1px` tall and is transparent and
    // positioned at the top of the page. Inside that is an element that gets
    // set to 1 billion pixels. Then reads the max height the browser can
    // calculate.
    const wrapper = document.createElement('div');
    const fixture = document.createElement('div');

    // As said above, these values get set to put the fixture elements into the
    // right visual state.
    VirtualizedListDirective.mergeStyle(wrapper, { position: 'absolute', height: '1px', opacity: 0 });
    VirtualizedListDirective.mergeStyle(fixture, { height: '1e7px' });

    // Add the fixture into the wrapper element.
    wrapper.appendChild(fixture);

    // Apply to the page, the values won't kick in unless this is attached.
    document.body.appendChild(wrapper);

    // Get the maximum element height in pixels.
    const maxElementHeight = fixture.offsetHeight;

    // Remove the element immediately after reading the value.
    document.body.removeChild(wrapper);

    return maxElementHeight;
  }

  public clearVirtualizerProps() {
    // scroll to top
    if (this.config.horizontal) {
      this.container.scrollTo({ left: 0, behavior: 'instant' });
    } else {
      this.container.scrollTo({ top: 0, behavior: 'instant' });
    }
    // remove scroller element
    const scrollerEl = this.container.querySelector(`${this.config?.scrollerTagName || 'div'}[data-scroller]`) as HTMLElement;
    if(scrollerEl) {
      scrollerEl.style.display = 'none';
    }
    // reset container attribute
    const elementStyle = {
      width: `auto`,
      height: `auto`,
      overflow: 'auto',
    }
    VirtualizedListDirective.mergeStyle(this.container, elementStyle)
    // remove all virtualizer rows
    render(null, this._tbody);
  }

  public requestUpdate() {
    this._vKey = Math.random();
  }

  // @ts-ignore
  update(_part: Part, [config]: DirectiveParameters<any>) {
    if (!config) {
      throw new Error('Virtualizer requires a config object');
    }

    if (!areObjectsEqual(this.config, config)) {
      Object.assign(this.config, defaultConfig, config);
      this.disconnected();
      this.connected();
    }
    const loop = () => {
      let forceUpdate = this._lastVKey != this._vKey;
      const scrollTop = this._getScrollPosition();
      const lastRepaint = this._lastRepaint;
      this._renderAnimationFrame = window.requestAnimationFrame(loop);
      if (scrollTop === lastRepaint && !forceUpdate) {
        return noChange;
      }
      const diff = lastRepaint ? scrollTop - lastRepaint : 0;
      if (!lastRepaint || diff < 0 || diff > this._averageHeight || forceUpdate) {
        let rendered = this._renderChunk();

        this._lastRepaint = scrollTop;
        // @ts-ignore
        if (rendered !== false && typeof config.afterRender === 'function') {
          // @ts-ignore
          config.afterRender();
        }

        this.container.dispatchEvent(new VisibilityChangedEvent({
          first: this._lastFrom,
          last: this._lastFrom + this._screenItemsLen
        }));

        forceUpdate = false;
        this._lastVKey = this._vKey;
        // @ts-expect-error - This is a directive, we can return noChange
        return this.render();
      } else {
        return noChange;
      }
    };

    return loop();
  }
  // @ts-expect-error config exists and is in use
  render(config: UserProvidedConfig) {
    this.configScrollerHeight();

    const items = [];
    for (let i = this.from; i < this.to; i++) {
      let row = this._getRow(i);
      items.push(row);
    }
    const returnItems = repeat(items, (item) => item);
    render(returnItems, this._tbody);
  }

  public jumpToIndex(elementIndex: number) {
    if (elementIndex < 0 || elementIndex >= this.config.total) {
      console.error('Position is out of range');
      return;
    }
    const scrollPosition = this._itemPositions[elementIndex];
    if (this.config.horizontal) {
      this.container.scrollTo({ left: scrollPosition, behavior: 'instant' });
    } else {
      this.container.scrollTo({ top: scrollPosition, behavior: 'instant' });
    }
  }

  _computeScrollPadding() {
    const config = this.config;
    const isReverse = config.reverse;
    const styles = window.getComputedStyle(this.container);

    const padding = (location: 'left' | 'right' | 'top' | 'bottom') => {
      const cssValue = styles.getPropertyValue(`padding-${location}`);
      return parseInt(cssValue, 10) || 0;
    };

    if (this.isHorizontal && isReverse) {
      return {
        bottom: padding('left'),
        top: padding('right')
      };
    } else if (this.isHorizontal) {
      return {
        bottom: padding('right'),
        top: padding('left')
      };
    } else if (isReverse) {
      return {
        bottom: padding('top'),
        top: padding('bottom')
      };
    } else {
      return {
        bottom: padding('bottom'),
        top: padding('top')
      };
    }
  }

  _getFrom(scrollTop: number) {
    let i = 0;

    while (this._itemPositions[i] < scrollTop) {
      i++;
    }

    return i;
  }

  _getReverseFrom(scrollTop: number) {
    let i = this.config.total - 1;

    while (i > 0 && this._itemPositions[i] < scrollTop + this._containerSize) {
      i--;
    }

    return i;
  }

  protected connected(): void {
    const { container, config } = this;
    if (!container || container.nodeType !== 1) {
      throw new Error('Virtualizer requires a valid DOM Node container');
    }
    if (!config.generate) {
      throw new Error('Missing required `generate` function');
    }

    if (!isNumber(config.total)) {
      throw new Error('Invalid required `total` value, expected number');
    }

    if (!Array.isArray(config.itemHeight) && !isNumber(config.itemHeight)) {
      throw new Error(`
        Invalid required \`itemHeight\` value, expected number or array
      `.trim());
    } else if (isNumber(config.itemHeight as number)) {
      this._itemHeights = Array(config.total).fill(config.itemHeight);
    } else {
      this._itemHeights = config.itemHeight as number[];
    }

    if (!config.containerHeight) {
      throw new Error('Missing \`containerHeight\`. Eg: 500');
    }

    // Width and height should be coerced to string representations. Either in
    // `%` or `px`.
    Object.keys(defaultConfig).filter(prop => prop in config).forEach(prop => {
      const value = config[prop as keyof UserProvidedConfig];
      const isValueNumber = isNumber(value as number);

      if (value && typeof value !== 'string' && typeof value !== 'number') {
        let msg = `Invalid optional \`${prop}\`, expected string or number`;
        throw new Error(msg);
      } else if (isValueNumber) {
        (config[prop as keyof UserProvidedConfig] as string) = `${value}px`;
      }
    });

    const value = config[this.isHorizontal ? 'width' : 'height'];

    if (value) {
      const isValueNumber = isNumber(value as number);
      const isValuePercent = isValueNumber ? false : (value as string).slice(-1) === '%';
      // Compute the containerHeight as number
      const numberValue = isValueNumber ? value : parseInt((value as string).replace(/px|%/, ''), 10);
      const innerSize = window[this.isHorizontal ? 'innerWidth' : 'innerHeight'];

      if (isValuePercent) {
        this._containerSize = (innerSize * (numberValue as number)) / 100;
      } else {
        this._containerSize = isNumber(value as number) ? value as number : numberValue as number;
      }
    }

    const scrollContainer = config.scrollContainer;
    const scrollerHeight = (config.itemHeight as number) * config.total;
    const maxElementHeight = this._maxElementHeight;

    if (scrollerHeight > maxElementHeight) {
      console.warn([
        'Virtualizer: The maximum element height', maxElementHeight + 'px has',
        'been exceeded; please reduce your item height.'
      ].join(' '));
    }

    // const itemHeights = this._itemHeights.reduce((a, b) => a + b, 0);
    // const itemHeightLessThanContainer = itemHeights < Number((config.height as String).replace('px', ''));
    // Decorate the container element with styles that will match
    // the user supplied configuration.
    const elementStyle = {
      width: `${config.width}`,
      height: `${config.containerHeight}px`,
      // height: scrollContainer ? `${scrollerHeight}px` : `${itemHeightLessThanContainer ? `${itemHeights}px` : config.height}`,
      overflow: scrollContainer ? 'none' : 'auto',
      position: 'relative'
    };

    VirtualizedListDirective.mergeStyle(container, elementStyle);

    if (scrollContainer) {
      VirtualizedListDirective.mergeStyle(scrollContainer, { overflow: 'auto' });
    }

    const padding = this._computeScrollPadding();
    this._scrollPaddingBottom = padding.bottom;
    this._scrollPaddingTop = padding.top;

    // Set the scroller instance.
    this._scrollHeight = this._computeScrollHeight();

    // Reuse the item positions if refreshed, otherwise set to empty array.
    this._itemPositions = this._itemPositions || Array(config.total).fill(0);

    // Each index in the array should represent the position in the DOM.
    this._computePositions(0);

    // Render after refreshing. Force render if we're calling refresh manually.
    this._renderChunk(this._lastRepaint !== null);

    if (typeof config.afterRender === 'function') {
      config.afterRender();
    }
  }

  protected reconnected(): void {
    this.connected();
  }

  protected disconnected(): void {
    window.cancelAnimationFrame(this._renderAnimationFrame);
  }

  private configScrollerHeight() {
    const scrollerTagName = unsafeStatic(`${this.config?.scrollerTagName || 'div'}`)
    let totalHeight = 0;
    if(typeof this.config.itemHeight === 'number') {
      totalHeight = this.config.itemHeight * this.config.total;
    } else {
      totalHeight = this.config.itemHeight.reduce((a, b) => a + b);
    }

    // The element that forces the container to scroll.
    const scroller = this.config?.scroller || html`<${scrollerTagName} style=${styleMap({
      display: 'block',
      opacity: 0,
      pointerEvents: 'none',
      position: 'absolute',
      [this.isHorizontal ? 'height' : 'width']: '1px',
      [this.isHorizontal ? 'width' : 'height']: `${ totalHeight + 50 }px`, // height of thead
    })} data-scroller></${scrollerTagName}>`
    render(scroller, this.container)
  }

  private _getRow(i: number) {
    const config = this.config;

    const height = typeof this.config.itemHeight === 'number'
      ? this.config.itemHeight
      : this.config.itemHeight[i];

    let item = config.generate(i, {
      height: `${this._itemHeights[i]}px`,
      // use transform because position sticky (locked column - horizontally scroll) can't use top
      // top: `${ this.from * height }px`,
      transform: `translateY(${ this.from * height }px)`,
    });
    return item
  }

  private _getScrollPosition() {
    const config = this.config;
    return this.container[config.horizontal ? 'scrollLeft' : 'scrollTop'];
  }

  private _renderChunk(force?: boolean) {
    const config = this.config
    const scrollTop = this._getScrollPosition()
    const total = config.total

    this.from = config.reverse ? this._getReverseFrom(scrollTop) : this._getFrom(scrollTop) - 1

    if (this.from < 0) {
      this.from = 0
    }

    if (!force && this._lastFrom === this.from) {
      return false
    }
    this._lastFrom = this.from

    this.to = this.from + this._cachedItemsLen

    if (this.to > total || this.to + this._cachedItemsLen > total) {
      this.to = total
    }
  }

  private _computePositions(from = 1) {
    const config = this.config
    const total = config.total
    const reverse = config.reverse

    if (from < 1 && !reverse) {
      from = 1
    }

    for (let i = from; i < total; i++) {
      if (reverse) {
        if (i === 0) {
          this._itemPositions[0] = this._scrollHeight - this._itemHeights[0]
        } else {
          this._itemPositions[i] = this._itemPositions[i - 1] - this._itemHeights[i]
        }
      } else {
        this._itemPositions[i] = this._itemHeights[i - 1] + this._itemPositions[i - 1]
      }
    }
  }

  private _computeScrollHeight() {
    const config = this.config
    const total = config.total
    const scrollHeight = this._itemHeights.reduce((a, b) => a + b, 0) + this._scrollPaddingBottom + this._scrollPaddingTop
    this._scrollHeight = scrollHeight;
    // Calculate the height median
    const sortedItemHeights = this._itemHeights.slice(0).sort((a, b) => a - b)
    const middle = Math.floor(total / 2)
    const averageHeight = total % 2 === 0 ? (sortedItemHeights[middle] + sortedItemHeights[middle - 1]) / 2 : sortedItemHeights[middle]

    const clientProp = this.isHorizontal ? 'clientWidth' : 'clientHeight'
    const element = config.scrollContainer ? config.scrollContainer : this.container
    const containerHeight = element[clientProp] ? element[clientProp] : this._containerSize
    this._screenItemsLen = Math.ceil(containerHeight / averageHeight)
    this._containerSize = containerHeight

    // Cache 2 items that fit in the container viewport.
    this._cachedItemsLen = Math.max(this._cachedItemsLen || 0, this._screenItemsLen + 2)
    this._averageHeight = averageHeight

    if (config.reverse) {
      window.requestAnimationFrame(() => {
        if (this.isHorizontal) {
          this.container.scrollLeft = scrollHeight
        } else {
          this.container.scrollTop = scrollHeight
        }
      })
    }

    return scrollHeight
  }

}
// @ts-ignore
export const virtualize = directive(VirtualizedListDirective);
