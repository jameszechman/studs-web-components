import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import style from '@studs/styles/components/alert-dialog';

/**
 * @element studs-alert-dialog
 *
 * @slot - The default slot for alert dialog body content
 * @slot header-icon - Render the icon on the header
 * @slot footer-buttons - Render the buttons on the footer
 */

@studsElement('studs-alert-dialog')
export class StudsAlertDialog extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Whether or not the alert dialog is open
   */
  @property({ type: Boolean }) open: boolean = false;
  /**
   * The heading of the alert dialog
   */
  @property({ type: String }) heading: string;
  /**
   * The type of the alert dialog
   */
  @property({ type: String }) type:
    | 'default'
    | 'contrast'
    | 'success'
    | 'error' = 'default';
  /**
   * The id of the alert dialog
   */
  @property({ type: String }) id: string;
  /**
   * Whether or not the alert dialogs is static for stacked
   */
  @property({ type: Boolean }) static: boolean = false;

  render() {
    return html`<div
      class="${classMap({
        'alert-dialog': true,
        [`-${this.type}`]: true,
        '-show': this.open,
        '-hide': !this.open,
        '-static': this.static,
      })}"
      id=${ifDefined(this.id)}
      aria-hidden=${!this.open}
    >
      <header
        class="${classMap({
          '-header': true,
        })}"
      >
        <div
          class="${classMap({
            icon: true,
            [`-${this.type}`]: true,
          })}"
        >
          <slot name="header-icon"></slot>
        </div>
        ${this.heading && html`<h1>${this.heading}</h1>`}
      </header>

      <studs-divider></studs-divider>

      <main class="-body">
        <slot></slot>
      </main>

      <studs-divider></studs-divider>

      <footer class="-footer">
        <slot
          name="footer-buttons"
          @slotchange=${this.onFooterSlotChange}
        ></slot>
      </footer>
    </div>`;
  }

  private onFooterSlotChange(e: Event) {
    const assignedElements = (e.target as HTMLSlotElement).assignedElements();
    const children = (assignedElements[0] as HTMLElement).children;
    if (children && children.length > 1)
      console.warn(
        'studs-alert-dialog does not support more than two elements on footer'
      );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-alert-dialog': StudsAlertDialog;
  }
}
