import style from '@studs/styles/components/resizer';
import { CSSResult, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { studsElement } from '../../decorators/studs-element';
import { clamp } from '../../directives/clamp';
import { watch } from '../../directives/watch';
import { StudsElement } from '../../mixins/studsElement.ts';

type MoveableElement = {
  el: HTMLElement;
  size: string;
  rect: DOMRect;
}

/**
 * @element studs-resizer
 *
 * @slot - The default slot for resizer content
 * @slot pane-{number} - The default slot for the first pane, autogenerated based on order of content added to default slot
 * @slot divider-{number} - The default slot for the divider
 */
@studsElement('studs-resizer')
export class StudsResizer extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The width of the divider
   */
  @property({ type: Number, attribute: 'divider-width' }) dividerWidth: number = 4;
  /**
   * The position of the divider
   */
  @property({ type: Number, reflect: true }) position: number = 50;
  /**
   * The direction of the divider
   */
  @property({ type: String }) direction: 'inline' | 'block' = 'inline';
  /**
   * Whether the divider is disabled or not
   */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  /**
   * The minimum position of the divider
   */
  @property({ type: Number }) min: number = 0;
  /**
   * The maximum position of the divider
   */
  @property({ type: Number }) max: number = 100;
  /**
   * Whether the divider should have a default cursor or not
   */
  @property({ type: Boolean, attribute: 'default-cursor' }) defaultCursor = false;
  @state() panes!: HTMLElement[];
  @state() _resizing: boolean = false;
  private _initialPosition!: number;

  private get axis() {
    return this.direction === 'inline' ? 'width' : 'height';
  }

  private get client() {
    return this.direction === 'inline' ? 'clientX' : 'clientY';
  }

  private get size() {
    const size = this.getBoundingClientRect()[this.axis];
    if (size > 0) return size;
    return 0;
  }

  private get gridTemplate() {
    return this.direction === 'inline' ? 'gridTemplateColumns' : 'gridTemplateRows';
  }

  private get isSingle() {
    return this.panes?.length === 1;
  }

  private get cellCount() {
    let cols = '';
    if (this.panes?.length) this.panes.forEach((pane, index) => {
      cols += `calc(${pane.dataset.size}% - ${this.dividerWidth / 2}px)`;
      if (this.isSingle || index !== this.panes.length - 1) {
        cols += ` ${this.dividerWidth}px `;
      }
    });

    return cols;
  }

  // @ts-expect-error - @watch doesn't have typed support for arguments
  @watch('position', { waitUntilFirstUpdate: true })
  handlePositionChange(initial: boolean = false) {
    if (this.disabled) return;
    const { panes } = this;
    let max = Number(`${this.max}`);
    if (panes?.length > 0) {
      (panes as HTMLElement[]).forEach((pane, index) => {
        if (index === 0) {
          pane.dataset.size = String(clamp(this.position, this.min, this.max - (this.pixelsToPercentage(this.dividerWidth) / 2)));
          max -= this.position;
        } else {
          pane.dataset.size = initial ? pane.dataset.size ? pane.dataset.size : String(max / (panes.length - 1)) : String(max / (panes.length - 1));
        }
        if (pane.dataset.size) pane.dataset.initialSize = pane.dataset.size;
      });
    }

  }

  render() {
    return html`
      <div class=${classMap({
        'resizeContainer': true,
        [`-${this.direction}`]: true,
        '-resizing': !!this._resizing,
        '-default-cursor': !!this.defaultCursor
      })} style=${styleMap({
        [this.gridTemplate]: this.cellCount
      })}
           ?disabled=${this.disabled}
      >
        ${this.renderPanes()}
        <slot @slotchange=${this.onRegisterPanes}></slot>
      </div>
    `;
  }

  private renderPanes() {
    return map(this.panes, (_, index) => {
      return html`
        <slot name="pane-${index}" class="panel" data-index=${index}></slot>
        ${index !== this.panes.length - 1 || this.isSingle ? html`
          <div class='resizeDivider'
               data-last=${index === this.panes.length - 1}
               data-index=${index}
               aria-controls=${this.panes[index].getAttribute('id') || `pane-${index}`}
               @mousedown=${this.handleMove}
               @touchstart=${this.handleMove}
               @dblclick=${this.handleDblClick}
               role="separator"
               aria-orientation=${this.direction}
          >
            <slot name="divider-${index}"></slot>` : nothing}
        </div>`;
    });
  }

  private pixelsToPercentage(value: number) {
    if (this.size) return (value / this.size) * 100;
    return 0
  }

  private handleMove(event: MouseEvent | TouchEvent) {
    if (this.disabled) return;
    event.preventDefault();
    this._resizing = true;
    const target = event.target as HTMLElement;
    const index = Number(target.dataset.index);
    const prev = this.panes[index];
    const next = this.panes[index + 1] || null;
    const modifier = this.max / this.size; //each pixel is moved by this percent
    const isLast = Boolean(target.dataset.last === 'true');
    const initial = event instanceof MouseEvent ? event[this.client] : event.touches[0][this.client];
    const prevElement: MoveableElement = {
      el: prev,
      size: prev.dataset.size || '0',
      rect: prev.getBoundingClientRect()
    };
    let nextElement: MoveableElement;
    if (!this.isSingle) nextElement = {
      el: next,
      size: next.dataset.size || '0',
      rect: next.getBoundingClientRect()
    };

    this.dispatchEvent(new CustomEvent('resize-start', {
      detail: {
        index: index,
        size: prevElement.el.dataset.size
      }
    }));

    const move = (event: PointerEvent) => {
      const current = event[this.client];
      const delta = current - initial;
      const amount = (delta * modifier);
      const pad = isLast ? this.dividerWidth : 0;
      const prevSizeGreaterThanZero = prevElement.rect[this.axis] + delta > 0;

      if (this.isSingle) {
        // If there is only one pane, set the size directly
        if (prevSizeGreaterThanZero) prevElement.el.dataset.size = String(clamp(Math.abs(amount + parseFloat(prevElement.size)), this.min, this.max - (this.pixelsToPercentage(pad) / 2)));
      } else {
        // If there are multiple panes, proceed with the existing resizing logic
        const nextSizeGreaterThanZero = !!nextElement && nextElement.rect[this.axis] - delta - pad > 0;
        if (prevSizeGreaterThanZero && nextSizeGreaterThanZero) {
          const prevSize = String(clamp(Math.abs(amount + parseFloat(prevElement.size)), this.min, this.max));
          prevElement.el.dataset.size = prevSize;
          if (!!nextElement) nextElement.el.dataset.size = String(clamp(Math.abs(amount - parseFloat(nextElement.size)), this.min, this.max));
          this.dispatchEvent(new CustomEvent('resize', {
            detail: {
              index: index,
              size: prevSize
            }
          }));
        }
      }

      // Run a update to update layout shift
      requestAnimationFrame(() => {
        this.requestUpdate();
      });
    };

    const stop = () => {
      this._resizing = false;
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', stop);

      this.dispatchEvent(new CustomEvent('resize-end', {
        detail: {
          index: index,
          size: prevElement.el.dataset.size
        }
      }));
    };

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerup', stop);
  }

  private handleDblClick(event: PointerEvent) {
    if (this.disabled) return;
    const target = event.target as HTMLElement;
    const index = Number(target.dataset.index);
    const pane = this.panes[index];
    const nextPane = this.panes[index + 1];
    if (index === 0) {
      this.position = this._initialPosition;
      pane.dataset.size = pane.dataset.initialSize || pane.dataset.size;
      if (nextPane) nextPane.dataset.size = nextPane.dataset.initialSize || nextPane.dataset.size;
    } else {
      const isLast = (index + 1) === this.panes.length - 1;
      pane.dataset.size = pane.dataset.initialSize || pane.dataset.size;
      if (isLast) nextPane.dataset.size = this.panes.reduce((acc, pane) => acc + Number(pane.dataset.size), 0).toString();
      else nextPane.dataset.size = nextPane.dataset.initialSize || nextPane.dataset.size;
    }
    this.requestUpdate();
  }

  private onRegisterPanes(e: Event) {
    const panes = (e.target as HTMLSlotElement).assignedElements();
    if (panes.length > 0) {
      (panes as HTMLElement[]).forEach((pane, index) => {
        const id = pane.getAttribute('id') || `pane-${index}`;
        if (!pane.getAttribute('id')) pane.setAttribute('id', id);
        if (index === 0 && pane.dataset.size) this.position = Number(pane.dataset.size);
        pane.slot = `pane-${index}`;
      });
      this.panes = panes as HTMLElement[];
      if (this.position && !this._initialPosition) this._initialPosition = this.position;
      this.handlePositionChange(true);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-resizer': StudsResizer;
  }
}
