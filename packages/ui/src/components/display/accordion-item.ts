import style from '@studs/styles/components/accordion-item';
import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { ExpandableController } from '../../controllers/expandable.ts';
import { watch } from '../../directives/watch.ts';

/**
 * @element studs-accordion-item
 *
 * @slot toggle - Renders the title of the Accordion Item
 * @slot - The default slot for the Accordion Item Content
 *
 * @cssprops --primary - The primary color of the Accordion Item
 * @cssprops --accordion-bkg - The background color of the Accordion Item
 * @cssprops --background-content - The background color of the Accordion Item Content
 * @cssprops --border-color - The border color of the Accordion Item
 * @cssprops --accordion-hover - The hover color of the Accordion Item
 * @cssprops --disabled - The disabled color of the Accordion Item
 * @cssprops --text-disabled - The disabled color of the Accordion Item Text
 *
 */
@studsElement('studs-accordion-item')
export class StudsAccordionItem extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Whether the accordion panel is open or not
   */
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  /**
   * Whether the accordion panel is disabled or not
   */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  /**
   * The size of the accordion panel
   */
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * The variant of the accordion panel
   */
  @property({ type: String }) variant: 'border' | 'borderless' = 'borderless';
  /**
   * The direction of the accordion panel
   */
  @property({ type: String }) direction: 'start' | 'end' = 'end';

  @watch('open')
  updateOpen() {
    this.updateComplete.then(() => {
      if(!this.disabled) this.expandable.toggle(this.open);
    });
  }

  protected expandable = new ExpandableController(this);

  private get toggleID() {
    return this.querySelector('[slot="toggle"]')?.textContent?.replace(/\s+/g, '-').toLowerCase();
  }

  render() {
    return html`
      <details
        class=${classMap({
          'accordion -panel': true,
          [`-${this.size}`]: true,
          [`-${this.variant}`]: true,
          [`-${this.direction}`]: true
        })}
        ?disabled=${this.disabled}
        part="base"
      >
        <summary
          tabindex=${!this.disabled ? '0' : '-1'}
            class="accordion -header"
            part="toggle"
            id=${`${this.toggleID}-tab`}>
            <slot name="toggle">Accordion Header</slot>
            <studs-icon
              tabindex="-1"
              size="medium"
              icon="chevron_right"
              color='inherit'
              aria-label=${this.open ? 'Collapse accordion panel' : 'Expand accordion panel'}
            ></studs-icon>
        </summary>
        <main
          id=${`${this.toggleID}-panel`}
          part="panel">
          <div class="content" part="content">
            <slot></slot>
          </div>
        </main>
      </details>`;
  }

  /**
   * Toggles the accordion panel
   */
  public onToggle() {
    if (!this.disabled) this.open = !this.open;
  }

  /**
   * Opens the accordion panel
   */
  public show() {
    if (!this.disabled) this.open = true;
  }

  /**
   * Closes the accordion panel
   */
  public hide() {
    if (!this.disabled) this.open = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-accordion-item': StudsAccordionItem;
  }
}
