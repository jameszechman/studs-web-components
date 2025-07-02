import style from '@studs/styles/components/popover';
import { CSSResult, CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { IconController } from '../../controllers/iconController';
import { studsElement } from '../../decorators/studs-element';
import { PopperElement } from '../../mixins/popperElement.ts';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-popover
 *
 * @slot title - The default slot for popover title content
 * @slot media - The default slot for popover media content
 * @slot - The default slot for popover content
 * @slot footer - The default slot for popover footer content
 */

@studsElement('studs-popover')
export class StudsPopover extends PopperElement(StudsElement(LitElement)) {
  static styles: CSSResultGroup = [super.styles as CSSResult, style as CSSResult];
  /**
   * The icon to show in the header of the popover
   */
  @property({ type: String }) icon?: string;
  /**
   * Whether to show the close button
   */
  @property({ type: Boolean, attribute: 'hide-close-button' }) hideCloseButton?: boolean = false;
  @state() isHeader: boolean = false;
  @state() isFooter: boolean = false;
  private iconController = new IconController(this);

  constructor() {
    super();
    this.on = 'click';
    this.useAvailableWidth = true;
    this.useAvailableHeight = true;
  }

  override render(): TemplateResult<1> {
    return html`
      <div
        class=${classMap({
          popper: true,
          popover: true,
          '-wrapper': true,
          [`-${this.position}`]: true
        })}
        role="popover"
        part="popover"
      >
        ${!this.isHeader ? this.renderCloseButton() : nothing}
        <header part="header" class="popover -title" ?hidden=${!this.isHeader}>
          ${this.icon ? this.iconController.icon(this.icon) : nothing}
          <slot name="title" @slotchange=${this.registerHeader}></slot>
          ${this.isHeader ? this.renderCloseButton() : nothing}
        </header>
        <slot class="popover -media" name="media"></slot>
        <main part="main">
          <slot></slot>
        </main>
        <footer part="footer" class="popover -footer" ?hidden=${!this.isFooter}>
          <slot name="footer" @slotchange=${this.registerFooter}></slot>
        </footer>
        <div id="arrow"></div>
      </div>`;
  }

  private renderCloseButton() {
    if (this.hideCloseButton) return nothing;
      return html`
      <studs-button
        aria-label="Close popover"
        button-type="close"
        size="small"
        icon="close"
        @click=${this.hidePopper}
      ></studs-button>`;
  }

  private registerFooter(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements();
    if (elements.length > 0) this.isFooter = true;
  }

  private registerHeader(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements();
    if (elements.length > 0) this.isHeader = true;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'studs-popover': StudsPopover;
  }
}