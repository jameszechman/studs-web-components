import { CSSResult, html, LitElement, PropertyValueMap } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/toasts';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { styleMap } from 'lit/directives/style-map.js';


/**
 * @element studs-toast
 *
 * @slot - The default slot for toast content
 */

@studsElement('studs-toast')
export class StudsToast extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Disables the positioning of the toast for self implemented positioning
   */
  @property({ type: Boolean }) static: boolean = false;
  /**
   * Whether the toast is open
   */
  @property({ type: Boolean }) open: boolean = false;
  /**
   * The type of the toast
   */
  @property({ type: String }) type: 'info' | 'success' | 'warning' | 'error' = 'info';
  /**
   * The position of the toast
   */
  @state() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' =
    'top-right';
  /**
   * The duration of the toast, can be disabled by setting duration to 0
   */
  @state() duration: number = 5000;
  /**
   * Whether the toast is closeable
   */
  @property({ type: Boolean }) closeable: boolean = false;
  /**
   * The heading of the toast
   */
  @property({ type: String }) heading: string;
  /**
   * The message of the toast
   */
  @property({ type: String }) message: string;
  // Duration Properties
  private _timerID?: any;

  disconnectedCallback() {
    // Clear the timer when the host is disconnected
    if(this._timerID) {
      clearInterval(this._timerID);
      this._timerID = undefined;
    }
  }

  render() {
    const classes = {
      toast: true,
      '-static': this.static,
      '-open': this.open,
      [`-${this.type}`]: true,
      [`-${this.position}`]: !this.static
    };

    return html`
      <div class=${classMap(classes)} aria-hidden=${!this.open}>
        <div class="toastMessage">
          ${this.renderStatusIcon()}
          <div>
            ${this.heading ? html`<strong>${this.heading}</strong>` : ''}
            ${this.message ? html`<p>${this.message}</p>` : ''}
          </div>
        </div>

        <slot></slot>
        
        ${this.closeable
          ? html`
            <studs-button
              button-type="close"
              size="small"
              icon="close"
              @click=${this.onClose}
            ></studs-button>`
          : ''}
        <div class="${classMap({
          progress: true,
          static: this.duration < 1000
        })}" style="${styleMap({
          animationDuration: `${this.duration}ms`
        })}"></div>
      </div>`;
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (this.duration > 1000 && this.open && !this._timerID) {
      this._timerID = setInterval(() => {
        this.onClose();
      }, this.duration);
    } else if(this._timerID) {
        clearInterval(this._timerID);
        this._timerID = undefined;
    }
  }

  private renderStatusIcon() {
    if (this.type) {
      switch (this.type) {
        case 'info':
          return html`<i class="icon -info">info</i>`;

        case 'success':
          return html`<i class="icon -success">check_circle</i>`;

        case 'warning':
          return html`<i class="icon -warning">warning</i>`;

        case 'error':
          return html`<i class="icon -error">error</i>`;

        default:
          return null;
      }
    } else {
      return null;
    }
  }

  private onClose() {
    this.open = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-toast': StudsToast;
  }
}
