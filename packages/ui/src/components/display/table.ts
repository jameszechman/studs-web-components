import style from '@studs/styles/components/table';
import { CSSResult, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { validateCssUnitValue } from '../../utils/shared.ts';
import { watch } from '../../directives/watch.ts';

export interface TableProps {
  fixedHeader: boolean;
  fixedOffset: string;
  size: 'small' | 'medium' | 'large';
  sortable: boolean;
  filterable: boolean;
  disabled: boolean;
  searchable: boolean;
  children?: string;
}

/**
 * @element studs-table
 *
 * @slot - The default slot for the Table's content
 */
@studsElement('studs-table')
export class StudsTable extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Whether the table has a fixed header or not
   */
  @property({ type: Boolean, attribute: 'fixed-header' })
  fixedHeader: TableProps['fixedHeader'] = false;
  /**
   * The offset of the fixed header
   */
  @property({ type: String, attribute: 'fixed-offset' })
  fixedOffset: TableProps['fixedOffset'] = '0px';
  /**
   * The size of the table
   */
  @property({ type: String })
  size: TableProps['size'] = 'medium';
  /**
   * Whether the table is sortable or not
   */
  @property({ type: Boolean })
  sortable: TableProps['sortable'] = false;
  /**
   * Whether the table is filterable or not
   */
  @property({ type: Boolean })
  filterable: TableProps['filterable'] = false;
  /**
   * Whether the table is disabled or not
   */
  @property({ type: Boolean })
  disabled: TableProps['disabled'] = false;
  /**
   * Whether the table is searchable or not
   */
  @property({ type: Boolean })
  searchable: TableProps['searchable'] = false;
  @state() rows?: Array<any>;
  @state() _children?: Element[];

  @watch('fixedOffset', {waitUntilFirstUpdate: true})
  handleFixedOffsetChange() {
    if(validateCssUnitValue(this.fixedOffset)) {
      this.style.setProperty('--fixed-offset', this.fixedOffset);
    }
  }

  render() {
    return html`
      <slot @slotchange=${this.onSlotChange}></slot>
    `;
  }

  private onSlotChange(e: Event) {
    const assignedElements = (e.target as HTMLSlotElement).assignedElements();
    if (assignedElements.length > 0) {
      const table = assignedElements.find((el) => el.tagName === 'TABLE') as HTMLTableElement;
      table?.classList.add('table');
      table?.classList.add(`-${this.size}`);
      if (this.fixedHeader) {
        table?.classList.add('-sticky-header');
      }
      if(validateCssUnitValue(this.fixedOffset)) {
        this?.style.setProperty('--fixed-offset', this.fixedOffset);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-table': StudsTable;
  }
}
