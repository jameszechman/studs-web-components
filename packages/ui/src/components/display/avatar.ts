import style from '@studs/styles/components/avatar';
import { property, state } from 'lit/decorators.js';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { studsElement } from '../../decorators/studs-element.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { classMap } from 'lit/directives/class-map.js';
import { Icon, IconController } from '../../controllers/iconController.ts';
import { StudsBadge } from './badge.ts';

/**
 * @element studs-avatar
 *
 * @fires value - Fires an event that lets the user know when the avatar's selected state is toggled.
 */
@studsElement('studs-avatar')
export class StudsAvatar extends StudsElement(LitElement) {
  static styles = style as CSSResult;

  /**
   * The size of the avatar
   */
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * The source of the avatar
   */
  @property({ type: String }) source: string;

  /**
   * The icon fallback value for the avatar
   */
  @property({ type: String, attribute: 'icon-fallback' })
  iconFallback: Icon = 'person';

  /**
   * The name of the avatar
   */
  @property({ type: String }) name: string;

  /**
   * Enable badge
   */
  @property({ type: String, attribute: 'enable-badge' })
  enableBadge: boolean = false;
  /**
   * The position of the badge
   */
  @property({ type: String, attribute: 'badge-position' })
  badgePosition: StudsBadge['position'] = 'bottom-right';
  /**
   * The status of the badge
   */
  @property({ type: String, attribute: 'badge-status' })
  badgeStatus:  'online' | 'busy' | 'offline' = 'online';
  /**
   * Enable avatar selection
   */
  @property({type: Boolean, attribute: 'selectable'}) selectable: boolean = false;
  /**
   * Whether the avatar is selected
   */
  @state() selected: boolean = false;

  private iconController = new IconController(this);

  private get _renderContent() {

    if (this.source) {
      return html` <img src=${this.source} alt="Avatar image" /> `;
    }

    if (this.name?.trim()) {
      const firstChar = this.name.charAt(0);
      return html`
        <div class="-text"><span>${firstChar}</span></div>`;
    }

    return this._renderIcon;
  }

  private get _renderTooltip(): undefined | TemplateResult<1> {
    if (!this.name?.trim()) return undefined;

    return html`
      <studs-tooltip standalone position="top" class="tooltip">
        ${this.name}
      </studs-tooltip>`;
  }

  private get _renderIcon() {

    return this.iconController.icon(this.iconFallback, {
      size: this.size,
      color: 'inherit'
    });
  }

  override render(): TemplateResult<1> {
    return this._renderBadge(
      html`
        <div class="avatar" tabindex="0" @click=${this.selectable ? this.onSelect : nothing}>
          <div
            class=${classMap({
              wrapper: true,
              [`-${this.size}`]: this.size,
              [`-selected`]: this.selectable && this.selected
            })}
          >
            ${this._renderContent} ${this._renderTooltip}
          </div>
        </div>`);
  }

  /**
   * Accepts Children as Props and returns TemplateResults based on enableBadge
   * @param children
   * @private
   */
  private _renderBadge(children: TemplateResult<1>): TemplateResult<1> {
    if (!this.enableBadge) return children;

    return html`
      <studs-badge marker position=${this.badgePosition} count="1" class=${classMap({
        [`-${this.badgeStatus}`]: true,
        [`-${this.size}`]: true
      })}>${children}
      </studs-badge>`;
  }

  private onSelect() {
    this.selected = !this.selected;
    const event = new CustomEvent('selected', {
      bubbles: false,
      composed: true,
      detail: {
        selected: this.selected
      }
    })
    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-avatar': StudsAvatar
  }
}