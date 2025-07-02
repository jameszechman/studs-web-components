import style from '@studs/styles/components/accordion';
import inputStyle from '@studs/styles/components/inputs';
import { CSSResult, html, LitElement, nothing, PropertyValueMap } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { StudsAccordionItem } from './accordion-item';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-accordion
 *
 * @slot - The default slot for Studs Accordion Items
 * @fires change - Fired when an accordion item is opened or closed
 * @fires search - Fired when the search input is used
 */
@studsElement('studs-accordion')
export class StudsAccordion extends StudsElement(LitElement) {
  static styles = [style as CSSResult, inputStyle as CSSResult];
  /**
   * Whether the accordion header is enabled or not
   */
  @property({ type: Boolean, attribute: 'enable-header' }) enableHeader: boolean = false;
  /**
   * Whether the accordion search is enabled or not
   */
  @property({ type: Boolean, attribute: 'enable-search' }) enableSearch: boolean = false;
  /**
   * The size of the accordion panel
   */
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * The variant of the accordion panel
   */
  @property({ type: String, reflect: true }) variant: 'border' | 'borderless' = 'borderless';
  /**
   * The direction of the accordion panel
   */
  @property({ type: String, reflect: true }) direction: 'start' | 'end' = 'end';
  /**
   * Whether the accordion panel is disabled or not
   */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  /**
   * Whether the accordion panels are open or not by default
   */
  @property({ type: Boolean, attribute: 'default-open', reflect: true }) defaultOpen: boolean = false;
  @queryAssignedElements({ selector: 'studs-accordion-item' }) private items!: StudsAccordionItem[];

  render() {
    return html`
      <div
        class=${classMap({
          'accordion -container': true,
          [`-${this.size}`]: true,
          [`-${this.variant}`]: true,
          [`-${this.direction}`]: true
        })}
        ?disabled=${this.disabled}
        role="tablist"
        aria-multiselectable="true"
        aria-expanded=${this.defaultOpen ? 'true' : 'false'}
        part="base"
      >
        ${this.enableHeader ? html`
          <header>
            ${this.enableSearch
              ? html`
                <div class="accordion -search">
                  <studs-input
                    type="search"
                    @change=${this.onSearch}
                    ?disabled=${this.disabled}
                    aria-label="Search"
                  ></studs-input>
                </div>`
              : nothing}
            <div class="accordion -actions">
              <studs-button
                button-type="tertiary"
                @click=${this.onExpandAll}
                ?disabled=${this.disabled}
                icon="add_circle"
                icon-position="end"
                role="button"
                aria-controls="accordion"
                aria-label="Expand all sections"
              >Expand All
              </studs-button
              >
              <studs-button
                button-type="tertiary"
                @click=${this.onCollapseAll}
                ?disabled=${this.disabled}
                icon-position="end"
                icon="do_not_disturb_on"
                role="button"
                aria-controls="accordion"
                aria-label="Collapse all sections"
              >Collapse All
              </studs-button
              >
            </div>
          </header>` : nothing}
        <slot></slot>
      </div>`;
  }

  public onExpandAll() {
    if (this.items) this.items.forEach((item) => {
      (item as StudsAccordionItem)?.show();
    });
  }

  public onCollapseAll() {
    if (this.items) this.items.forEach((item) => {
      (item as StudsAccordionItem)?.hide();
    });
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);
    this.updateComplete.then(() => {
      if (this.items) {
        if (_changedProperties.has('disabled'))
          this.items.forEach((item) => {
            if (item.disabled === _changedProperties.get('disabled')) (item as StudsAccordionItem).disabled = this.disabled;
          });
        if (_changedProperties.has('size'))
          this.items.forEach((item) => {
            (item as StudsAccordionItem).size = this.size;
          });
        if (_changedProperties.has('variant'))
          this.items.forEach((item) => {
            (item as StudsAccordionItem).variant = this.variant;
          });
        if (_changedProperties.has('direction'))
          this.items.forEach((item) => {
            (item as StudsAccordionItem).direction = this.direction;
          });
        if (_changedProperties.has('defaultOpen')) {
          if (this.defaultOpen) this.onExpandAll();
          else this.onCollapseAll();
        }
      }
    });
  }

  private onSearch(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const query = target.value;

    if (query === '' || !query) {
      this.onCollapseAll();
    }
    // Search Inner text of all accordion items
    if (this.items)
      this.items.forEach((item) => {
        const innerText = item.outerHTML.replace(/(<([^>]+)>)/gi, "").replace(/(\r\n|\n|\r)/gm, "").trim().toLowerCase();
        if (query.length > 2 && innerText?.includes(query?.toLowerCase())) {
          const index = this.items?.indexOf(item);
          (item as StudsAccordionItem).show();
          this.dispatchEvent(
            new CustomEvent('search', {
              detail: { query, index },
              bubbles: true,
              composed: true
            })
          );
        } else {
          (item as StudsAccordionItem).hide();
        }
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-accordion': StudsAccordion;
  }
}
