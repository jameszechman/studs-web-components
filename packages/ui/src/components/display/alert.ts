import { CSSResult, html, LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/alert';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { Icon } from '../../controllers/iconController.ts';

/**
 * @element studs-alert
 *
 * @slot - The default slot for alert content
 */

@studsElement('studs-alert')
export class StudsAlert extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Whether or not the alert is static
   */
  @property({ type: Boolean }) static: boolean = false;
  /**
   * Whether or not the alert is open
   */
  @property({ type: Boolean }) open: boolean = false;
  /**
   * The type of the alert
   */
  @property({ type: String }) type: 'info' | 'success' | 'warning' | 'error' | 'bottom' = 'bottom';
  /**
   * The position of the alert
   */
  @property({ type: String }) position:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right' = 'bottom-right';
  /**
   * The duration of the alert
   */
  @property({ type: String }) duration?: number;

  @property({ type: String }) icon?: Icon;
  /**
   * The action of the alert
   */
  @property({ type: Function })
  onActionClick?: () => void;
  /**
   * Whether or not the alert is closeable
   */
  @property({ type: Boolean }) closeable: boolean = false;
  /**
   * The heading of the alert
   */
  @property({ type: String }) heading: string;
  /**
   * The message of the alert
   */
  @property({ type: String }) message: string;
  /**
   * The action of the alert
   */
  @property({ type: String }) action: string;

  private _timerID?: any;

  disconnectedCallback() {
    // Clear the timer when the host is disconnected
    clearInterval(this._timerID);
    this._timerID = undefined;
  }

  render() {
    const classes = {
      alert: true,
      '-static': this.static,
      '-open': this.open,
      [`-${this.type}`]: true,
      [`-${this.position}`]: this.static ? false : true,
    };
    // '-row': (this.message && this.message?.length < 20) || false,

    return html` <div class=${classMap(classes)} aria-hidden=${!this.open}>
      <div class="message">
        <div>
          ${this.renderIcon()}
          ${this.heading ? html`<strong>${this.heading}</strong>` : ''}
        </div>
        ${this.message ? html`<p>${this.message}</p>` : ''}
      </div>

      <slot></slot>

      <div class="actionContainer">
        ${this.action
          ? html` <div class="actions">
              <studs-button button-type="link" onclick=${this.onActionClick}
                >${this.action}
              </studs-button>
            </div>`
          : ''}
        ${this.closeable
          ? html` <studs-button
              button-type="close"
              size="medium"
              icon="close"
              @click=${this.onClose}
            ></studs-button>`
          : ''}
      </div>
    </div>`;
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (this.duration && this.open && !this._timerID) {
      this._timerID = setInterval(() => {
        // Update the host with new value
        this.onClose();
      }, this.duration);
    }
  }

  private renderIcon() {
    return html`<i class="icon">${this.icon ? this.icon : 'error'}</i>`;
  }

  private onClose() {
    this.open = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-alert': StudsAlert;
  }
}
