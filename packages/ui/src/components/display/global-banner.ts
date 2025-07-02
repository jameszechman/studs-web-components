import { CSSResult, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/globalBanner';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-global-banner
 *
 * @slot message - The message to be displayed in the banner.
 */

@studsElement('studs-global-banner')
export class StudsGlobalBanner extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Specifies the type of banner, which can be either 'info' or 'warning'.
   */
  @property({ type: String }) type: 'info' | 'warning' | 'error' = 'info';
  /**
   * Specifies the icon to be displayed in the banner.
   */
  @property({ type: String }) icon?: string;
  /**
   * Specifies the placement of the banner, which can be either 'left', 'right', or 'center'.
   */
  @property({ type: String }) placement: 'left' | 'right' | 'center' = 'left';
  /**
   * Specifies if the banner is open.
   */
  @property({ type: Boolean }) open: boolean = false;
  /**
   * Indicates if the banner can be dismissed by the user.
   */
  @property({ type: Boolean }) dismissable = false;

  render() {
    const classes = {
      globalBanner: true,
      '-open': this.open,
      '-dismissable': this.dismissable,
      '-info': this.type === 'info',
      '-warning': this.type === 'warning',
      '-error': this.type === 'error',
      '-left': this.placement === 'left',
      '-right': this.placement === 'right',
      '-center': this.placement === 'center',
    };

    return html`
      <div
        class=${classMap(classes)}
        aria-live="polite"
        aria-hidden=${!this.open}
      >
        ${this.icon ? html`<studs-icon icon="${this.icon}"></studs-icon>` : ''}
        <slot></slot>
        ${this.dismissable
          ? html`
              <studs-button
                @click=${this.onClose}
                button-type="close"
                icon="close"
              ></studs-button>
            `
          : ''}
      </div>
    `;
  }

  private onClose() {
    this.open = false;
  }
}
