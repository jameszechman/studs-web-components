import { CSSResult, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { Icon, IconController } from '../../controllers/iconController';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/badge';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-badge
 */
@studsElement('studs-badge')
export class StudsBadge extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The icon to display in the badge
   */
  @property({ type: String }) icon?: Icon;
  /**
   * The count to display in the badge
   */
  @property({ type: Number }) count: number = 0;
  /**
   * The maximum count to display in the badge
   */
  @property({ type: Number }) max: number = 99;
  /**
   * Whether to show the badge when the count is 0
   */
  @property({ type: Boolean, attribute: 'show-zero' })
  showZero?: boolean = false;
  /**
   * The size of the badge
   */
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * The position of the badge
   */
  @property({ type: String }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' = 'top-right';
  /**
   * The color of the badge
   */
  @property({ type: String }) color: string = 'primary';
  /**
   * Whether the badge is a marker or not
   */
  @property({ type: Boolean }) marker?: boolean = false;
  private iconController = new IconController(this);

  private get badgeText() {
    if (this.count === 0 && !this.showZero) return null;
    if (this.count === undefined || this.max === undefined) return null;
    else if (this.count > this.max) return `${this.max}+`;
    return this.count;
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          badge: true,
          [`-${this.size}`]: true,
          [`-${this.position}`]: true,
          [`-${this.color}`]: true
        })}
      >
        ${this.icon ? this.iconController.icon(this.icon, { size: 'medium' }) : html`<slot></slot>`}
        ${this.marker && (this.count ? this.count : 0) > 0
          ? html`
            <div
              part="dot"
              class=${classMap({
                dot: true,
                [`-${this.position}`]: true
              })}
            ></div>`
          : this.badgeText || this.badgeText === 0
            ? html`<span
              class=${classMap({
                badgeContent: true,
                '-badge': true,
                [`-${this.position}`]: true
              })}
            >${this.badgeText}</span
            >`
            : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-badge': StudsBadge;
  }
}