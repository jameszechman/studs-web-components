import style from '@studs/styles/components/list';
import { CSSResult, LitElement, TemplateResult } from 'lit';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js';
import { watch } from '../../directives/watch';
import { StudsListItem } from './list-item';
import { html, literal } from 'lit/static-html.js';
import { generateUniqueId } from '../../utils/shared';
import { StudsElement } from '../../mixins/studsElement.ts';
import { ListElement } from '../../mixins/listElement.ts';

/**
 * @element studs-list
 *
 * @slot - The default slot for the List's content
 */
@customElement('studs-list')
export class StudsList extends ListElement(StudsElement(LitElement)) {
  static styles = style as CSSResult;
  /**
   * The tag to render the list as
   */
  @property({ type: String }) as: 'div' | 'nav' = 'div';
  @queryAssignedElements({ selector: 'studs-list-item' }) items: StudsListItem[];
  private listID = generateUniqueId('list');
  @state() private hasSelectedNode: boolean = false;
  private tag = literal`div`;

  private get tagRole() {
    return this.hasSelectedNode ? 'listbox' : 'list';
  }

  @watch('as')
  updateTag() {
    switch (this.as) {
      case 'nav':
        this.tag = literal`nav`;
        break;
      default:
        this.tag = literal`div`;
        break;
    }
  }

  @watch('size')
  handleSizeChange() {
    this.updateComplete.then(() => {
      this.items.forEach(item => {
        item.size = this.size;
      });
    });
  }

  @watch('direction')
  handleDirectionChange() {
    this.updateComplete.then(() => {
      this.items.forEach(item => {
        item.direction = this.direction;
      })
    })
  }

  @watch('icon')
  handleIconChange() {
    this.updateComplete.then(() => {
      this.items.forEach(item => {
        item.icon = this.icon
      })
    })
  }

  @watch('disableIndentation')
  handleIndentationChange() {
    this.updateComplete.then(() => {
      this.items.forEach(item => {
        item.disableIndentation = this.disableIndentation
      })
    })
  };

  render(): TemplateResult {
    return html`
      <${this.tag} role=${this.tagRole} id=${this.listID} 
        @click=${this.handleClickItem}
      >
        <slot @slotchange=${this.registerItems}></slot>
      </${this.tag}>
    `;
  }

  private handleClickItem (e: MouseEvent) {
    if(!this.selected) return;
    if (e.target instanceof StudsListItem) {
      e.target.selected = !e.target.selected;
    }
  }

  private registerItems(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const items = slot.assignedElements() as StudsListItem[];
    const selectedExists = items.some(item => item.selected);
    items.forEach((item, idx) => {
      if (!item.id) item.id = `${this.listID}-item-${idx}`;
      if (selectedExists) item.role = 'option';
    });
    if (selectedExists) this.hasSelectedNode = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-list': StudsList;
  }
}