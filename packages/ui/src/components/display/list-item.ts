import style from '@studs/styles/components/list-item';
import { CSSResult, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, literal } from 'lit/static-html.js';
import { ExpandableController } from '../../controllers/expandable';
import { watch } from '../../directives/watch';
import { StudsList } from './list';
import { StudsElement } from '../../mixins/studsElement.ts';
import { ListElement } from '../../mixins/listElement.ts';

/**
 * @element studs-list-tem
 *
 * @slot prefix - Renders content before the main content
 * @slot - The default slot for the List Item's content
 * @slot secondary - Renders content after the main content
 * @slot suffix - Renders content after the secondary content
 * @slot action - Renders content after the suffix content
 * @slot list - Renders a nested list
 */
@customElement('studs-list-item')
export class StudsListItem extends ListElement(StudsElement(LitElement)) {
  static override styles = style as CSSResult;
  @property({ type: Boolean }) disabled: boolean = false;


  @state() isExpandable: boolean = false;
  @state() role: 'listitem' | 'option' = 'listitem';
  protected expandable?: ExpandableController;
  private innerTag = literal`div`;

  private get innerTemplate() {
    return html`
      <${this.innerTag}
        role=${this.role}
        class=${classMap({
          [`-${this.size}`]: true,
          '-selected': this.selected || false,
          '-expandable': this.isExpandable,
          [`-${this.direction}`]: this.isExpandable
        })}
        ?disabled=${this.disabled}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        tabindex=${ifDefined(!this.isExpandable ? '0' : undefined)}
      >
        <slot name='prefix'></slot>
        <div>
          <slot></slot>
          <small class="secondary">
            <slot name='secondary'></slot>
          </small>
        </div>
        <slot name='suffix'></slot>
        <slot name='action'></slot>
      </${this.innerTag}>
      <div role=${ifDefined(this.isExpandable ? 'list' : undefined)} class=${classMap({
        content: true,
        '-indent': !this.disableIndentation && this.isExpandable
      })}>
        <slot name='list' @slotchange=${this.registerInnerList}></slot>
      </div>
    `;
  }

  private get staticTemplate() {
    return html`${this.innerTemplate}`;
  }

  private get expandableTemplate() {
    return html`
      <details ?disabled=${this.disabled}>
        ${this.innerTemplate}
      </details>`;
  }

  private get template(): TemplateResult {
    return html`${cache(this.isExpandable ? this.expandableTemplate : this.staticTemplate)}`;
  }

  @watch('isExpandable')
  handleExpandableChange() {
    this.updateComplete.then(() => {
      if (this.isExpandable) {
        this.expandable = new ExpandableController(this);
        this.innerTag = literal`summary`;
      } else {
        this.expandable = undefined;
        this.innerTag = literal`div`;
      }
    });
  }

  @watch('selected')
  handleSelectedChange() {
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          selected: this.selected
        },
        bubbles: true,
        composed: true
      }));
    });
  }

  @watch('icon')
  handleIconChange() {
    if(this.isExpandable && this.icon) {
      this.style.setProperty('--arrow', `"${this.icon}"`);
    }
  }

  render() {
    return this.template;
  }

  private registerInnerList(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if ((slot.assignedElements() as StudsList[]).length > 0) this.isExpandable = true;
    (slot.assignedElements() as StudsList[]).forEach(list => {
      Object.assign(list, {
        size: this.size,
        direction: this.direction,
        icon: this.icon,
        disableIndentation: this.disableIndentation
      })
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-list-item': StudsListItem;
  }
}
