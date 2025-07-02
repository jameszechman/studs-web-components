import {
  ComputePositionConfig, Placement, Strategy, arrow,
  autoUpdate,
  computePosition,
  flip,
  inline,
  offset,
  shift,
  size, FlipOptions
} from '@floating-ui/dom';
import { CSSResult, LitElement, PropertyValueMap } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { Constructor } from '../utils/types';
import { watch } from '../directives/watch.ts';
import style from '@studs/styles/components/poppers';
import { detectClickInsideOutside } from '../utils/shared.ts';

export declare class PopperElementInterface {
  // Properties
  public on?: 'click' | 'hover' | 'hover-interactive' | 'manual' | 'toggle';
  public position: Placement;
  public strategy?: Strategy;
  public disabled?: boolean;
  public query?: string;
  public element: HTMLElement | null;
  public marginLeft?: string;
  public closeOnClickOutside?: boolean;
  public useAvailableWidth?: boolean;
  public useAvailableHeight?: boolean;
  public padding?: number;
  public offset?: number;
  // States
  protected flipOptions: FlipOptions;
  protected popperOpen: boolean;
  protected top: number;
  protected left: number;
  // Queries
  public popper: HTMLElement;
  public arrow: HTMLElement;
  // Methods
  public init(): void;
  public destroy(): void;
  public refresh(): void;
  public showPopper(e?: MouseEvent | FocusEvent): void;
  public hidePopper(e?: MouseEvent | FocusEvent): void;
}

export const PopperElement = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class WithPopperClass extends superClass {
    static styles = style as CSSResult;
    /**
     * How the popper is triggered
     */
    @property({type: String}) on: PopperElementInterface['on'] = 'hover';
    /**
     * The position of the popover
     */
    @property({ type: String }) position: PopperElementInterface['position'] =
      'bottom';
    /**
     * The strategy of the popover
     */
    @property({ type: String }) strategy?: PopperElementInterface['strategy'] = 'absolute';
    /**
     * Whether the popover is disabled
     */
    @property({ type: Boolean }) disabled: PopperElementInterface['disabled'] =
      false;
    /**
     * The query to find the element to attach the popover to
     */
    @property({ type: String }) query?: PopperElementInterface['query'];
    /**
     * The element to attach the popover to
     */
    @property({ type: HTMLElement }) element!: PopperElementInterface['element']
    /**
     * The margin left of the popover
     */
    @property({ type: String }) marginLeft?: PopperElementInterface['marginLeft'];
    /**
     * Whether the popover should close when clicking outside
     */
    @property({ type: Boolean, attribute: 'close-on-click-outside' }) closeOnClickOutside: PopperElementInterface['closeOnClickOutside'] = false;
    /**
     * Whether the popover should use available width
     */
    @property({ type: Boolean, attribute: 'use-available-width' }) useAvailableWidth: PopperElementInterface['useAvailableWidth'] = false;
    /**
     * Whether the popover should use available height
     */
    @property({ type: Boolean, attribute: 'use-available-height' }) useAvailableHeight: PopperElementInterface["useAvailableHeight"] = false;
    /**
     * The padding of the popover
     */
    @property({type: Number}) padding: number = 5;
    /**
     * The offset of the popover
     */
    @property({type: Number}) offset: number = 6;
    @state() private popperOptions: ComputePositionConfig = {
      placement: this.position,
      strategy: this.strategy
    }
    /**
     * The flip options of the popover
     * @protected
     */
    @state() protected flipOptions: FlipOptions = {};
    /**
     * The open state of the popper
     * @protected
     */
    @state() protected popperOpen: boolean = false;
    /**
     * The top position of the popper
     * @protected
     */
    @state() protected top: number = 0;
    /**
     * The left position of the popper
     * @protected
     */
    @state() protected left: number = 0;
    /**
     * The popper element
     * @protected
     */
    @query('.popper') popper!: HTMLElement;
    /**
     * The arrow element
     * @protected
     */
    @query('#arrow') arrow!: HTMLElement;
    /**
     * The cleanup function
     * @protected
     */
    private cleanup!: Function;

    /**
     * Ensure that init is called after the popper element is available
     */
    private getPopperExists = async () => {
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (this.popper) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
      return this.popper;
    }

    /**
     * Initialize the popper
     */
    protected init = async () => {
      await this.getPopperExists();
      if(this.popper) {
        this.element?.setAttribute('aria-haspopup', this.popper.getAttribute('role') || 'true');
        this.element?.setAttribute('aria-expanded', 'false');
        if (!this.arrow) {
          const arrow = this.popper.querySelector('#arrow');
          if (arrow) this.arrow = arrow as HTMLElement;
        }
        this.popper.setAttribute('aria-hidden', 'true');
        switch (this.on) {
          case 'hover':
            case 'hover-interactive':
              this.element?.addEventListener('mouseenter', this.showPopper);
              this.element?.addEventListener('focus', this.showPopper);
            break;
          case 'click':
            this.popper?.addEventListener('click', (e) => e.stopPropagation());
            this.element?.addEventListener('click', this.showPopper);
            break;
          case 'toggle':
            this.element?.addEventListener('click', this.onToggle);
            break;
          default:
            break;
        }
      }
    }

    /**
     * Destroy the popper
     */
    protected destroy() {
      switch (this.on) {
        case 'hover':
          this.element?.removeEventListener('mouseenter', this.showPopper);
          this.element?.removeEventListener('focus', this.showPopper);
          this.element?.removeEventListener('mouseleave', this.hidePopper);
          this.element?.removeEventListener('blur', this.hidePopper);
          break;
        case 'hover-interactive':
          this.element?.removeEventListener('mouseenter', this.showPopper);
          this.element?.removeEventListener('focus', this.showPopper);
          this.removeEventListener('mouseleave', this.hidePopper);
          this.removeEventListener('blur', this.hidePopper);
          break;
        case 'click':
          this.popper?.removeEventListener('click', (e) => e.stopPropagation());
          this.element?.removeEventListener('click', this.showPopper);
          break;
        case 'toggle':
          this.element?.removeEventListener('click', this.onToggle);
          break;
        default:
          break;
      }
      if (this.popper) {
        this.element?.removeAttribute('aria-haspopup');
        this.element?.removeAttribute('aria-expanded');
        this.popper.removeAttribute('aria-hidden');
      }
      if (this.cleanup) this.cleanup();
    }

    override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
      super.firstUpdated(_changedProperties);
      if(!this.element) this.element = this.parentElement;
    }

    @watch('element')
    refresh() {
        this.destroy();
        this.init();
    }

    @watch('query')
    async handleQueryChange() {
      await this.updateComplete;
      if(this.query) {
        const root = this.parentElement?.getRootNode();
        const shadowRootQuery: HTMLElement | null = (root as unknown as ShadowRoot)?.querySelector(this.query) as unknown as HTMLElement
        const slottedQuery: HTMLElement | null = (root as unknown as ShadowRoot)?.host?.querySelector(this.query) as unknown as HTMLElement
        const documentQuery: HTMLElement | null = document.querySelector(this.query)
        if (shadowRootQuery || slottedQuery || documentQuery) {
          this.element = shadowRootQuery || slottedQuery || documentQuery;
        } else {
          this.element = this.parentElement
        }
      }
    }

    @watch('position')
    @watch('strategy')
    handlePositionChange() {
      const obj = {...this.popperOptions};
      Object.assign(obj, {placement: this.position, strategy: this.strategy});
      this.popperOptions = obj;
    }

    @watch('marginLeft')
    handleMarginLeftChange() {
      this.updateCustomPopperPosition();
    }

    @watch('padding')
    @watch('offset')
    handlePaddingChange() {
      this.updatePosition();
    }

    /**
     * Show the popper
     * @param e
     */
    protected showPopper = (e?: MouseEvent | FocusEvent) => {
      if(this.disabled) return;
      // fire document event for remove the opened popovers
      this.updateComplete.then(() => {
        this.popperOpen = true;
        this.popper?.setAttribute('aria-hidden', 'false');
        if (this.element) this.element.setAttribute('aria-expanded', 'true');
        if (document) {
          document.addEventListener('keydown', this.closeOnESC);
          if (this.closeOnClickOutside) {
            const remove = detectClickInsideOutside(this.popper, (clickType: string) => {
              if (clickType === 'outside') {
                this.hidePopper();
                remove();
              }
            });
          }
        }
        switch(this.on) {
          case 'click':
            if(e) e.stopPropagation();
            break;
          case 'hover':
            this.element?.addEventListener('mouseleave', this.hidePopper);
            this.element?.addEventListener('blur', this.hidePopper);
            break;
            case 'hover-interactive':
              this.addEventListener('mouseleave', this.hidePopper);
              this.addEventListener('blur', this.hidePopper);
            break;
          default:
            break;
        }
        this.updatePosition();
      });
    };

    /**
     * Hide the popper
     * @param e
     */
    protected hidePopper = (e?: MouseEvent | FocusEvent) => {
      if(this.disabled) return;
      this.updateComplete.then(() => {
        this.popperOpen = false;
        this.popper?.setAttribute('aria-hidden', 'true');
        if (this.element) this.element.setAttribute('aria-expanded', 'false');
        if(document) {
          document.removeEventListener('keydown', this.closeOnESC);
        }
        if (this.cleanup) this.cleanup();
        switch(this.on) {
          case 'click':
            if(e) e.stopPropagation();
            break;
          case 'hover':
            this.element?.removeEventListener('mouseleave', this.hidePopper);
            this.element?.removeEventListener('blur', this.hidePopper);
            break;
          case 'hover-interactive':
            this.removeEventListener('mouseleave', this.hidePopper);
            this.removeEventListener('blur', this.hidePopper);
            break;
          default:
            break;
        }
      });
    };

    /**
     * Toggle the popper
     * @param e
     */
    private onToggle = (e: MouseEvent | FocusEvent) => {
      if (this.popper?.getAttribute('aria-hidden') === 'true') {
        this.showPopper(e);
      } else {
        this.hidePopper(e);
      }
    };

    private closeOnESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.hidePopper();
        document.removeEventListener('keydown', this.closeOnESC);
      }
    };

    private updateCustomPopperPosition() {
      const {popper} = this;
      if (!popper) return;
      if (this.marginLeft) {
        Object.assign(popper.style, {
          marginLeft: `${this.marginLeft || 0}px`
        });
      }
    }

    private setPositions = (x: number, y: number) => {
      this.left = x;
      this.top = y;
    }

    private updatePosition = () => {
      const {popper, arrow: arrowElement, useAvailableWidth, padding, useAvailableHeight, setPositions, flipOptions} = this;
      if (popper && this.element)
        this.cleanup = autoUpdate(this.element, popper, () => {
            computePosition(this.element as HTMLElement, popper, {
              ...this.popperOptions,
              middleware: [
                offset(this.offset),
                inline({ padding: this.padding }),
                flip({ padding: this.padding, ...flipOptions }),
                shift({ padding: this.padding }),
                size({
                  apply({ availableWidth, availableHeight, elements, rects }) {
                    const width = useAvailableWidth ? availableWidth - (padding * 2) : rects.reference.width;
                    // Do things with the data, e.g.
                    Object.assign(elements.floating.style, {
                      maxWidth: `${width}px`
                    });
                    if(useAvailableHeight) {
                      Object.assign(elements.floating.style, {
                        maxHeight: `${availableHeight - (padding * 2)}px`
                      })
                    }
                  },
                  padding: this.padding
                }),
                arrowElement ? arrow({ element: arrowElement, padding: 5 }) : null
              ]
            }).then(({ x, y, placement, middlewareData }) => {
              setPositions(x, y);
              Object.assign(popper.style, {
                left: `${x}px`,
                top: `${y}px`
              });

              this.updateCustomPopperPosition();

              // Accessing the data
              if (arrowElement) {
                const style = getComputedStyle(document.documentElement);
                const arrowSize = Number(style.getPropertyValue('--popper-arrow-size').trim().split('px')[0]) / 2;
                const { x: arrowX, y: arrowY }: any = middlewareData.arrow;
                const staticSide = {
                  top: 'bottom',
                  right: 'left',
                  bottom: 'top',
                  left: 'right'
                }[placement.split('-')[0]];

                Object.assign(arrowElement.style, {
                  left: arrowX != null ? `${arrowX}px` : '',
                  top: arrowY != null ? `${arrowY}px` : '',
                  right: '',
                  bottom: '',
                  [staticSide as any]: `-${arrowSize}px`
                });
              }
            });
          },
          {
            ancestorResize: true,
            elementResize: true,
            ancestorScroll: false,
            layoutShift: false
          }
        );
    };

    override connectedCallback() {
      super.connectedCallback();
      this.init();
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      this.destroy();
    }
  }

  return WithPopperClass as unknown as Constructor<PopperElementInterface> & T;
};
