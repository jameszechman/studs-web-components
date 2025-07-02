import { VisibilityChangedEvent } from '../../directives/virtualize/visibilityChangedEvent';
import tableStyle from '@studs/styles/components/datagrid';
import exportFromJSON, { ExportType } from 'export-from-json';
import { jsPDF } from "jspdf";
import { CSSResult, html, LitElement, nothing, PropertyValueMap, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import Sortable from 'sortablejs';
import { IconController } from '../../controllers/iconController';
import { studsElement } from '../../decorators/studs-element';
import { virtualize, VirtualizerHostElement, virtualizerRef } from '../../directives/virtualize';
import { watch } from '../../directives/watch.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { getTableThIndex, parseDate } from '../../utils/shared';
import { getRootTransition } from '../../utils/shared.ts';
import { StudsCheckbox } from '../inputs/checkbox.ts';
import { StudsDatePicker } from '../inputs/date-picker.ts';
import { StudsDropdown } from '../inputs/dropdown.ts';
import { StudsFormControl } from '../inputs/form-control.ts';
import { StudsInput } from '../inputs/input.ts';
import { StudsTextarea } from '../inputs/textarea.ts';
import { StudsMenu } from '../navigation/menu.ts';
import { StudsPopover } from '../overlays/popover.ts';
import { StudsToaster } from '../overlays/toaster.ts';
import { StudsButton } from './button.ts';
import { StudsDivider } from './divider.ts';
import { StudsPagination } from './pagination.ts';


// !TODO - Sort Multi Doesn't work anymore
type IFilterType = 'text' | 'dropdown' | 'datepicker';

interface Row {
  [key: string]: any;
}

type ColumnRender = (cell: any, { row, column, key, idx }: { row: Row, column: Column, key: string, idx: number, host: StudsGrid }) => TemplateResult | HTMLElement[] | string;
interface Column {
  key: string;
  label: string;
  align?: 'start' | 'center' | 'end';
  editable?: boolean;
  filterable?: boolean | {
    type?: IFilterType,
    options?: StudsDropdown['options'];
    mode?: 'search' | 'multi';
  };
  render?: ColumnRender;
  minWidth?: number;
}

interface FilteredColumns {
  key: string;
  type: IFilterType;
  criterion: string;
  value: string | Array<string>;
}

/**
 * @element studs-grid
 *
 * @slot filter_title - The title of the filter popover
 */

@studsElement('studs-grid')
export class StudsGrid extends StudsElement(LitElement) {
  //#region Static Enumerations
  static readonly MIN_CELL_WIDTH = 90;
  static readonly MAX_CELL_WIDTH = 300;
  static readonly MIN_CELL_WIDTH_BY_VALUE = [
    [100, StudsGrid.MAX_CELL_WIDTH],
    [50, 250],
    [30, 200],
    [25, 150],
    [20, 120],
    [10, StudsGrid.MIN_CELL_WIDTH]
  ];
  static readonly FREEZE_COL_DISABLE_CURSOR = '--freeze-col-disable-cursor';
  static readonly TABLE_STYLE_FREEZE_COLS_ID = 'freezeColumnStyle';
  static readonly TABLE_STYLE_RESIZING_ID = 'resizingColumnStyle';
  static readonly TABLE_SELECTED_TH_INDEX = 'data-th-selected-index';
  static readonly SELECTION_COLUMN_ID = 'selection_all';
  static readonly TOGGLE_NESTED_ROW_ID = 'toggleNestedRow';
  static readonly DROPDOWN_VALUES = {
    NO_FILTER: 'noFilter',
    CONTAINS: 'contains',
    DOES_NOT_CONTAINS: 'doesNotContains',
    STARTS_WITH: 'startsWith',
    ENDS_WITH: 'endsWith',
    EQUALTO: 'equalTo',
    NOT_EQUAL_TO: 'notEqualTo',
    GREATER_THAN: 'greaterThan',
    LESS_THAN: 'lessThan',
    GREATER_THAN_OR_EQUAL_TO: 'greaterThanOrEqualTo',
    LESS_THAN_OR_EQUAL_TO: 'lessThanOrEqualTo',
    ISEMPTY: 'isEmpty',
    IS_NOT_EMPTY: 'isNotEmpty',
    NULLVALUE: 'nullValue',
    NOT_NULL_VALUE: 'notNullValue'
  };
  static readonly VIRTUAL_LIST_ROW_HEIGHT = 45;
  //#endregion Static Enumerations
  static elementDefinitions = {
    'studs-button': StudsButton,
    'studs-textarea': StudsTextarea,
    'studs-dropdown': StudsDropdown,
    'studs-popover': StudsPopover,
    'studs-checkbox': StudsCheckbox,
    'studs-date-picker': StudsDatePicker,
    'studs-input': StudsInput,
    'studs-form-control': StudsFormControl,
    'studs-divider': StudsDivider,
    'studs-pagination': StudsPagination,
    'studs-menu': StudsMenu,
  };
  toasterRef:Ref<StudsToaster> = createRef();

  //#region Properties
  /**
   * The grid heading
   */
  @property({ type: String }) caption?: string;
  /**
   * Page size of grid
   */
  @property({ type: Number, attribute: 'page-size' }) pageSize: number = 10;
  /**
   * Options list for page size
   */
  @property({ type: Array })
  itemsPerPageSelector?: number[] = [10, 25, 50, 100];
  /**
   * Enable show border for each cell
   */
  @property({ type: Boolean, attribute: 'show-borders' }) showBorders: boolean = false;
  /**
   * Use for nested grid inside grid
   */
  @property({ type: Number, attribute: 'nested-level' }) nestedLevel = 0;
  /**
   * Enable filter feature for columns
   */
  @property({ type: Boolean, attribute: 'enable-filtering' }) enableFiltering: boolean =
    false;
  /**
   * Enable changing the column size
   */
  @property({ type: Boolean, attribute: 'enable-column-resizing' })
  enableColumnResizing: boolean = false;
  /**
   * Enable column reordering to change column position
   */
  @property({ type: Boolean, attribute: 'enable-column-reordering' })
  enableColumnReordering: boolean = false;
  /**
   * Enable row reordering to change row position
   */
  @property({ type: Boolean, attribute: 'enable-row-reordering' })
  enableRowReordering: boolean = false;
  /**
   * Enable virtualizer and infinite scroll
   */
  @property({ type: Boolean, attribute: 'enable-infinite-scroll' })
  enableInfiniteScroll: boolean = false;
  /**
   * Default height for grid
   */
  @property({ type: Number })
  height?: number;
  /**
   * Enable showing pagination section
   */
  @property({ type: Boolean, attribute: 'enable-pagination' }) enablePagination: boolean =
    false;
  /**
   * Enable global search
   */
  @property({ type: Boolean, attribute: 'enable-global-search' })
  enableGlobalSearch: boolean = false;
  /**
   * Enable sticky header
   */
  @property({ type: Boolean, attribute: 'enable-sticky-header' })
  enableStickyHeader: boolean = false;
  /**
   * Enable sorting
   */
  @property({ type: Boolean, attribute: 'enable-sorting' }) enableSorting: boolean = false;
  /**
   * Array of column list for grid
   */
  @property({ type: Array }) columns: Column[] = [];
  /**
   * Data source is array of row data for grid
   */
  @property({ type: Array }) dataSource: Row[] = [];
  /**
   * Enable lock column
   */
  @property({ type: Boolean, attribute: 'enable-locked-columns' }) enableLockedColumns: boolean = false;
  /**
   * List of locked column
   */
  @property({ type: Array, attribute: 'locked-columns' }) lockedColumns: string[] = [];

  /**
   * List of columns have sorting feature
   */
  @property({ type: Array }) sortedColumns: string[] = [];
  /**
   * Sort ascending or descending
   */
  @property({ type: Boolean, attribute: 'sort-ascending' }) sortAscending: boolean = false;
  /**
   * Enable multiple selection row
   */
  @property({ type: Boolean, attribute: 'enable-selection-rows' }) enableSelectionRows: boolean = false;
  /**
   * Disabled columns filter
   */
  @property({ type: Array }) disableColumnFilter: Array<string> = [];
  /**
   * Enable double click on the edge of the column to auto expand/shrink column width
   */
  @property({ type: Boolean, attribute: 'enable-fit-width-column' }) enableFitWidthColumn: boolean = false;
  /**
   * Custom Renderer for the Column Render method for frameworks that don't utilize native HTML Elements
   * @param content - The content of the cell
   * @param container - The container to render the content
   * @returns void
   *
   * @example
   * ```typescript
   * const renderer = (content: any, container: HTMLElement) => {
   * // For React
   * ReactDOM.render(content, container); || createRoot(container).render(content);
   * // For Angular
   * render(content, container);
   * // For Vue
   * createApp(content).mount(container);
   * }
   * ```
   */
  @property({ type: Function }) renderer?: (content: any, container: HTMLElement) => void;
  //#endregion Properties
  @state() hasChildren: Boolean = false;
  @state() lockColumnData: {[key: string]: {th: StyleInfo, td: StyleInfo} | undefined} = {};

  //#region Styles & Necessary Variables
  static styles = tableStyle as CSSResult;
  private iconController = new IconController(this);

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.initGrid();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    const watchInitProps = [
      'enableLockedColumns',
      'lockedColumns',
      'enableInfiniteScroll',
      'enableColumnReordering',
      'enableSelectionRows',
      'enablePagination',
      'columns',
      'dataSource'
    ];

    let enableInit = false;
    for (let i = 0; i < watchInitProps.length; i++) {
      if (_changedProperties.has(watchInitProps[i])) {
        enableInit = true;
        break;
      }
    }

    if (enableInit) {
      if (_changedProperties.has('enableInfiniteScroll')) {
        this.setPage = 1;
      }
      this.initGrid();
      setTimeout(() => {
        this.requestUpdateVirtualList();
        this.updateLockColumn();
      }, 1);
    }
  }

  protected get data() {
    return this.dataSource;
  }

  protected get filteredData() {
    const filterColumns = this._filteredColumns.length > 0;

    if (filterColumns && this._searchTerm) {
      const searchFilter = this.filterSearchResults;
      return this.filterResults(searchFilter);
    }
    if (filterColumns) {
      return this.filterResults(this.data);
    }

    if (this._searchTerm) return this.filterSearchResults;

    return this.data;
  }

  protected get gridTemplateColumns() {
    const property = this.style.getPropertyValue('--grid-template-columns');
    return { default: property, stripped: property.split(/\s(?![^()]*\))/) };
  }

  //#endregion Styles & Necessary Variables

  //#region Lock column template, props, funcs

  private updateLockColumn() {
    if(!this.enableLockedColumns) return;

    const lockColCount = this.lockedColumns?.length;
    if (!lockColCount || this.columns?.length <= lockColCount) return;

    let left = 0;
    let prevColCount = 0;
    const colKeys = [...this.columns?.map((c) => c.key)];
    if (this.enableSelectionRows) {
      prevColCount++;
      colKeys.unshift(StudsGrid.SELECTION_COLUMN_ID);
    }
    if (this.hasChildren) {
      prevColCount++;
      colKeys.unshift(StudsGrid.TOGGLE_NESTED_ROW_ID);
    }

    if (lockColCount !== 0) {
      const newLockColData: any = {};
      for (let i = 0; i < lockColCount + prevColCount; i++) {
        const lockData: { th: Object; td: Object } = {
          th: {},
          td: {},
        };
        // calculate left sticky
        const prevHeader = this.shadowRoot?.getElementById(colKeys[i - 1]);
        const leftHeaderPos = prevHeader?.getBoundingClientRect().width || 0;
        left += leftHeaderPos;

        // headers style
        const header = this.shadowRoot?.getElementById(`${colKeys[i]}`);
        if (header) {
          lockData.th = {
            position: 'sticky',
            zIndex: '500',
            left: `${left}px`,
            pointerEvents: `var(${StudsGrid.FREEZE_COL_DISABLE_CURSOR})`,
          };
        }
        // cells style
        lockData.td = {
          position: 'sticky',
          zIndex: '400',
          left: `${left}px`,
        };
        newLockColData[colKeys[i]] = lockData;
      }
      this.lockColumnData = { ...this.lockColumnData, ...newLockColData };
    }
  }

  private disposeLockColumn(colKey: string) {
    if(!this.enableLockedColumns) return;

    if(this.lockedColumns?.length === 0) {
      this.lockColumnData = {};
      return;
    }
    this.lockColumnData = {
      ...this.lockColumnData,
      [colKey]: undefined,
    };
  }

  private lockColumnThStyle(key: string) {
    if(!this.enableLockedColumns) return {};

    return this.lockColumnData[key]?.th || {};
  }

  protected renderManageColumnButton() {
    if (!this.enableLockedColumns) return nothing;

    return html`<studs-button-group>
      <studs-button
        id="manageColumn"
        button-type="secondary"
        size="medium"
        type="button"
      >
        Manage Columns
      </studs-button>
      <studs-popover
        query="#manageColumn"
        close-on-click-outside
        hide-close-button
      >
        ${this.columns.map((item) => {
          return html`<div class="lockColumnItem">
            <label>${item.label}</label>
            <studs-icon
              @click=${() => this.onLockColumn(item)}
              slot="prefix"
              icon="${this.checkLocked(item.key)}"
            ></studs-icon>
          </div>`;
        })}
      </studs-popover>
    </studs-button-group>`;
  }

  private renderLockColStatus(column: Column) {
    if(!this.enableLockedColumns) return nothing;

    const exist = this.lockedColumns?.includes(column.key)
    if(!exist) return nothing;

    return html`<studs-icon
      class="lockIcon"
      @click=${(e: Event) => {
        this.onLockColumn(column);
        e.stopPropagation();
      }}
      slot="prefix"
      icon="lock"
      size="small"
      color="secondary"
    ></studs-icon>`;
  }

  private checkLocked(colKey: string) {
    if(!this.enableLockedColumns) return nothing;
    const index = this.lockedColumns?.indexOf(colKey);
    if (index > -1) {
      return 'lock'
    } else {
      return 'lock_open'
    }
  }

  private onLockColumn(item: Column) {
    if(!this.lockedColumns) this.lockedColumns = [];

    const index = this.lockedColumns?.indexOf(item.key);
    if (index > -1) {
      // unlock col
      this.lockedColumns?.splice(index, 1);
      this.disposeLockColumn(item.key);
    } else {
      if(this.lockedColumns?.length >= 3) {
        this.toasterRef.value?.createErrorToast({
          message: 'Maximum 3 locked columns',
          duration: 1000,
        } as any)
        return;
      }
      this.lockedColumns?.push((item.key))
    }
    this.columns = this.mapArrays(this.lockedColumns, this.columns)
  }

  mapArrays(firstArray: Array<String>, secondArray: Array<Object>) {
    const orderedKeys = new Set(firstArray); // Use a Set for efficient lookups
    return secondArray.map((item: any) => {
      const isOrderedKey = orderedKeys.has(item.key);
      return {
        ...item,
        order: isOrderedKey ? orderedKeys.size - (orderedKeys.delete(item.key) as any) : Infinity,
      };
    }).sort((a: any, b: any) => a.order - b.order);
  }

  //#endregion

  protected renderColumns() {
    if (this.columns) {
      //We have to render the popover as siblings of the th tag to avoid the overlap of th tag when th was locked (using position sticky & z-index)
      //We have to render popovers after all th tags to avoid collision with Sortable column feature
      const popoverTemplates: TemplateResult[] = [];
      let columnTemplate = repeat(this.columns, column => column.key, (column, index) => {
        if(!this.isEditing && this.enableFiltering && column.filterable) {
          popoverTemplates.push(html`
          <studs-popover query=${`#${column.key} .filter`} close-on-click-outside>
            <p slot="filter_title">Filter</p>
            ${this.renderColumnFilterField(column)}
          </studs-popover>`)
        }
        return html`
          <th
            data-index=${index}
            id=${column.key}
            data-id="${column.key}"
            style=${styleMap(this.lockColumnThStyle(column.key))}
          >
            <div class="th-wrapper">
              ${this.enableColumnReordering
                && !this.lockedColumns?.includes(column.key)
            ? html`
                  <div
                    class="reorder-handle"
                  >
                    ${this.iconController.icon('reorder', {
              color: 'primary',
              size: 'small'
            })}
                  </div>`
            : ``}
              <div class="th-content">
                <p
                  @click=${(event: MouseEvent) =>
            this.onSortTable(column.key, event)}
                >
                  ${column.label}
                  ${this.sortedColumns.includes(column.key) &&
            this.sortOrders[column.key] !== null
            ? html`<span
                      class="-sorting"
                    >${this.sortOrders[column.key] ?
                html`
                        <studs-button button-type="tertiary" size="small" icon="switch_left"
                                      class="filter"></studs-button>`
                :
                html`
                        <studs-button button-type="tertiary" size="small" icon="switch_right"
                                      class="filter"></studs-button>`
              }
                          ${this.sortedColumns?.length > 1
                ? this.sortedColumns.findIndex((i) => i === column.key) +
                1
                : ''}</div
                        >`
            : ''}
            ${ this.renderLockColStatus(column) }
                </p>
                ${this.enableFiltering && column.filterable
            ? html`
                    <div class="filtered-column">
                      <studs-button
                        ?disabled="${this.isFilterDisabled(column)}"
                        button-type="tertiary"
                        size="medium"
                        icon="filter_list"
                        class="filter"
                      ></studs-button>
                      ${this.isFilterApplied(column) ? html`
                        <div class="dot-icon"></div>` : nothing}
                    </div> `
            : nothing}
                </span>


                ${this.enableColumnResizing && index !== this.columns.length - 1
            ? html`
                    <div
                      class="resize-handle"
                      @dblclick=${() => this.enableFitWidthColumn ? this.onFitColumnWidth(index, column) : null}
                      @mousedown=${this.onMouseMoveDown}
                    >
                      ${this.iconController.icon('width', {
              color: 'primary',
              size: 'small'
            })}
                    </div>`
            : ''}
              </div>
          </th>
        `;
      });
      return html`
        ${columnTemplate}
        ${repeat(popoverTemplates, p => p)}
      `
    }
  }

  protected renderRows() {
    if (this.data) {
      this._rowStartIndex = (this._currentPage - 1) * this.pageSize;
      this._rowEndIndex = this._rowStartIndex + this.pageSize;
      const item = (row: Row, _style?: Object, virtualizer?: boolean) => {
        const selectColStyle = {
          ..._style,
          ...this.lockColumnData[StudsGrid.SELECTION_COLUMN_ID]?.td
        }
        return html`
          <tr
            data-index=${row.id}
            data-row-virtualizer=${ifDefined(virtualizer)}
          >
            ${this.renderToggleRow(row)}
            ${this.enableSelectionRows
            ? html`
                <td data-column=${StudsGrid.SELECTION_COLUMN_ID}
                    style=${selectColStyle ? styleMap(selectColStyle as Readonly<StyleInfo>) : nothing}>
                    <studs-checkbox
                      @change="${(e: CustomEvent) => this.onSelectedRows(e, row)}"
                      .checked="${this.selectedRows.has(row)}"
                      ?disabled=${this.isEditing}
                    ></studs-checkbox>
                </td>
              `
            : nothing}
            ${this.columns.map((col, idx) => {
              const key = (col as Column).key;
              if (key === 'children') {
                return nothing;
              }
              const style = {
                ..._style,
                ...this.lockColumnData[key]?.td
              }
              const column = this.columns[idx];
              const cell = row[key];
              const isEditable = !column?.render && ((typeof cell === 'string' || typeof cell === 'number') && column?.editable) || false;
              const td = (children: TemplateResult) => isEditable ? html`
                <td
                  data-column=${key}
                  class=${classMap({
                [`-${column.align}`]: column.align || false
              })}
                  style=${style ? styleMap(style as Readonly<StyleInfo>) : nothing}
                  contenteditable=${isEditable}
                  @click=${() => this.isEditing = true}
                  @blur=${(e: CustomEvent) => this.onEditingCell(e, row, key)}
                  .innerText=${cell}
                ></td>
              ` : html`
                <td
                  data-column=${key}
                  class=${classMap({
                [`-${column.align}`]: column.align || false
              })}
                  style=${style ? styleMap(style as Readonly<StyleInfo>) : nothing}
                >
                    ${children}
                </td>`
              const children = () => {
                if (typeof cell === 'undefined') return nothing;
                if (column?.render && typeof column?.render === 'function') {
                  const render = column.render(cell, {
                    row,
                    column,
                    key,
                    idx,
                    host: this
                  });
                  // Check if Render is a Lit Template
                  if (render instanceof HTMLElement || (render as TemplateResult)?._$litType$) {
                    return render;
                  } else if (typeof render === 'string') {
                    return unsafeHTML(render as string)
                  } else if (this.renderer && typeof this.renderer === 'function') {
                    const div = document.createElement('div');
                    this.renderer(render, div);
                    return div;
                  } else {
                    return nothing
                  }
                } else return cell;
              }
              return td(children());
            })}
          </tr>
          ${!this.isVirtualizedEnabled && !!row?.children ? html`
            <tr
              class="nested-row"
              id="nested_${this.nestedLevel + 1}_${row?.id}"
              aria-expanded="false"
            >
              <td style="grid-column: 1 / ${this.totalColumns + 1}">
                <div class="-nested">
                  <studs-grid
                    page-size="10"
                    ?show-borders=${this.showBorders}
                    ?enable-column-resizing=${this.enableColumnResizing}
                    ?enable-selection-rows=${this.enableSelectionRows}
                    ?enable-fit-width-column=${this.enableFitWidthColumn}
                    ?enable-pagination=${false}
                    ?enable-sticky-header=${this.enableStickyHeader}
                    enable-sorting=${this.enableSorting}
                    columns="${JSON.stringify(row.children?.columns || [])}"
                    dataSource="${JSON.stringify(row.children?.dataSource || [])}"
                    nested-level="${this.nestedLevel + 1}"
                  ></studs-grid>
                </div>
              </td>
            </tr>` : null
          }
        `;
      };
      return this.isVirtualizedEnabled
        ? virtualize(
          {
            containerHeight: StudsGrid.VIRTUAL_LIST_ROW_HEIGHT * (this.pageSize + 1),
            itemHeight: StudsGrid.VIRTUAL_LIST_ROW_HEIGHT,
            total: this.filteredData?.length as number,
            generate: (index, style) => {
              const row: Row = this.filteredData?.[index] as Row;
              return item(row, style, true);
            }
          }
        )
        : repeat(
          // @ts-ignore
          this.filteredData?.slice(this._rowStartIndex, this._rowEndIndex),
          (row: Row) => row.id,
          (row: Row) => {
            return item(row);
          }
        );
    }

    return null;
  }

  //#region Grid Virtualized
  @state() protected _lastVisible: number = 0;
  @query('tbody') tableBodyRef!: VirtualizerHostElement;
  @query('table') tableRef!: VirtualizerHostElement;

  protected get isVirtualizedEnabled() {
    // Getter that checks length of items and value of enableInfiniteScroll
    if (this.filteredData) {
      return this.enableInfiniteScroll;
    }
    return false;
  }

  protected get totalColumns() {
    let total = this.columns.length || 0;
    if (this.enableSelectionRows) total++;
    if (this.hasChildren) total++;
    return total;
  }

  /**
   * Force request update the virtual list
   * This request update is only fire when enableInfiniteScroll = true
   * @returns nothing
   */
  private requestUpdateVirtualList() {
    if (!this.enableInfiniteScroll) {
      return;
    }
    this.tableRef[virtualizerRef]?.requestUpdate();
  }

  private onVisibilityChanged(e: VisibilityChangedEvent) {
    if (this.totalPages) {
      const { first, last } = e;
      const isFirst = first === 0;
      const isLast = last === this.totalPages - 1;
      const lastPage = this.totalPages / this.pageSize;
      if (isFirst) {
        this._psuedoCurrentPage = 1;
        this._lastVisible = this.pageSize;
      } else if (isLast) {
        this._psuedoCurrentPage = lastPage;
        this._lastVisible = this.totalPages - 1;
      } else {
        this._lastVisible = e.last;
      }

      if (this.enablePagination) {
        if (this._currentPage > 1) {
          const page = Math.floor(
            (this._currentPage * this.pageSize + this._lastVisible) /
            this.pageSize
          );
          if (page !== this._psuedoCurrentPage) {
            this._psuedoCurrentPage = page <= 0 ? 1 : page;
            // this.requestUpdate();
          }
        } else {
          const page = Math.floor(this._lastVisible / this.pageSize);
          if (page !== this._psuedoCurrentPage) {
            this._psuedoCurrentPage = page <= 0 ? 1 : page;
            // this.requestUpdate();
          }
        }
      }
    }
  }

  //#endregion Grid Virtualized
  //#region Grid Pagination
  @state() protected _currentPage: number = 1;
  @state() protected _psuedoCurrentPage: number = this._currentPage;

  protected get totalPages() {
    if (this.filteredData)
      return Math.ceil(this.filteredData.length);
  }

  protected set setPage(page: number) {
    this._currentPage = page;
    this._psuedoCurrentPage = page;
  }

  private onPageClick(e: CustomEvent) {
    const page = e.detail.selectedPage;
    if (this.isVirtualizedEnabled) {
      const pageSize = Math.floor(this.tableRef?.clientHeight / StudsGrid.VIRTUAL_LIST_ROW_HEIGHT);
      const scrollToElement = (page - 1) * pageSize;
      this.tableRef[virtualizerRef]?.jumpToIndex(scrollToElement);
      this._lastVisible = scrollToElement;
      // Force a recalculation
      this.pageSize = pageSize;
    } else {
      this.setPage = page;
    }
  }

  //#endregion Grid Pagination
  //#region Grid Searching
  @state() protected _searchTerm: string = '';

  protected get filterSearchResults() {
    return this.data.filter((row) => {
      return Object.values(row).some((value) => {
        if (typeof value === 'object') value = JSON.stringify(value);
        return String(value).toLowerCase().includes(this._searchTerm.toLowerCase());
      }
      );
    });
  }

  private onSearch(e: CustomEvent) {
    this.setPage = 1;
    this._searchTerm = (e.target as HTMLInputElement).value;
    this.requestUpdateVirtualList();
  }

  //#endregion Grid Searching
  //#region Grid Nesting
  /**
   * Render Toggle row for nested Grid
   * @param row
   * @returns
   */
  renderToggleRow(row: Row) {
    const style = this.lockColumnData[StudsGrid.TOGGLE_NESTED_ROW_ID]?.td;
    if (this.isVirtualizedEnabled) return nothing;
    if (!row?.children) return this.hasChildren ? html`
      <td
        data-column=${StudsGrid.TOGGLE_NESTED_ROW_ID}
        style=${style ? styleMap(style as Readonly<StyleInfo>) : nothing}
      ></td>` : nothing;
    this.hasChildren = true;

    return html`
      <td 
        data-column=${StudsGrid.TOGGLE_NESTED_ROW_ID}
        style=${style ? styleMap(style as Readonly<StyleInfo>) : nothing}
      >
        <div class="nested-action">
          <studs-button
            style="transition: rotate var(--transition-m)"
            id="nested_${this.nestedLevel + 1}_${row?.id}_toggleRow"
            size="medium"
            button-type="tertiary"
            icon="chevron_right"
            aria-label="Collapse row"
            @click=${(e: any) => this.toggleRow(row, e)}
          ></studs-button>
        </div>
      </td>`;
  }

  /**
   * Toggle expand/shrink row for nested grid
   * @param rowData
   * @param e
   * @returns
   */
  toggleRow(rowData: Row, e: any) {
    if (!rowData?.id && rowData?.id != 0) return;
    const row = this?.shadowRoot?.querySelector(`tr#nested_${this.nestedLevel + 1}_${rowData?.id}`);
    if (!row) return;

    const toggleBtnEl = e?.target;
    if (row.getAttribute('aria-expanded') === 'true') {
      row.setAttribute('aria-expanded', 'false');
      toggleBtnEl?.setAttribute('aria-label', 'Collapse row');
      if (toggleBtnEl.style) toggleBtnEl.style.rotate = 'unset';
    } else {
      row.setAttribute('aria-expanded', 'true');
      toggleBtnEl?.setAttribute('aria-label', 'Expand row');
      if (toggleBtnEl.style) toggleBtnEl.style.rotate = '90deg';
      const nestedGridEl = this.shadowRoot?.querySelector('studs-grid');
      nestedGridEl?.firstUpdated({} as any);
    }
  }

  //#endregion Grid Nesting
  //#region Column Resizing
  @state() protected _startX: number = 0;
  @state() protected _pressed: HTMLElement | undefined;
  @state() protected _startWidth: number = 0;
  @state() protected _activeRows?: NodeListOf<Element>;

  /**
   * Adjust style when user resize a column
   * Add class resizing to th element
   * Create stylesheet and append to table to style border for td at the same th's index
   * @param th thRef
   */
  private initializeResizing(th: HTMLElement) {

    th?.classList.add('resizing');

    const thIndex = getTableThIndex(th);
    const css = `td:nth-child(${thIndex + 1
      }) { border-right: 2px solid var(--primary) !important }`;
    const style = document.createElement('style');
    style.setAttribute('id', StudsGrid.TABLE_STYLE_RESIZING_ID);
    style.appendChild(document.createTextNode(css));
    this.tableRef?.appendChild(style);
  }

  /**
   * Remove class resizing from th element
   * Remove stylesheet was appended in table
   */
  private disposeResizing() {
    const th = this._pressed?.closest('th');
    th?.classList.remove('resizing');

    const styleRef = this.tableRef.querySelector(`#${StudsGrid.TABLE_STYLE_RESIZING_ID}`);
    styleRef?.remove();
  }

  private recalculateVirtualizerCellWidth() {
    if (!this.enableInfiniteScroll) return;
    const ths = this.tableRef.querySelectorAll('th');
    const gridTemplateColumns: string[] = [];
    ths.forEach((th) => {
      const width = th.getBoundingClientRect().width;
      gridTemplateColumns.push(`${width || StudsGrid.MIN_CELL_WIDTH}px`);
    });
    this.updateGridColumnsToView(gridTemplateColumns);
  }

  private initGrid() {
    if (!this.enableInfiniteScroll) {
      this.tableRef[virtualizerRef]?.clearVirtualizerProps();
    }

    const gridTemplateColumns = [];
    if (this.enableSelectionRows) {
      gridTemplateColumns.push(`60px`);
    }
    if (this.hasChildren) {
      gridTemplateColumns.push(`60px`);
    }

    this.columns.forEach((c) => {
      gridTemplateColumns.push(`minmax(${c?.minWidth || StudsGrid.MIN_CELL_WIDTH}px, auto)`);
    });

    this.updateGridColumnsToView(gridTemplateColumns);
    this.recalculateVirtualizerCellWidth();
  }

  private updateGridColumnsToView(gridTemplateColumns: string[]) {
    const columns = gridTemplateColumns.join(' ');
    this.style.setProperty('--grid-template-columns', columns);
  }

  private onMouseMoveDown(e: MouseEvent) {
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    const th = target.closest('th');
    const thElements = this.tableRef.querySelectorAll('th');
    let currentIndex: unknown = -1;
    for (let i = 0; i < thElements.length; i++) {
      if (thElements[i] === th) {
        currentIndex = i;
        break;
      }
    }
    this.tableRef?.setAttribute(StudsGrid.TABLE_SELECTED_TH_INDEX, currentIndex as string);
    if (currentIndex === thElements?.length - 1) {
      return;
    }

    const id = th?.getAttribute('id');
    const rows = this.shadowRoot?.querySelectorAll(`td[data-column=${id}]`);
    if (rows) this._activeRows = rows;
    this._pressed = target;
    this._startX = e.clientX;
    this._startWidth = target.closest('th')?.offsetWidth || 0;

    this.initializeResizing(th as HTMLElement);
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseup', () => this.onMouseMoveUp());
  }

  private onMouseMoveUp() {
    this.disposeResizing();
    this._pressed = undefined;
    this.tableRef?.removeAttribute(StudsGrid.TABLE_SELECTED_TH_INDEX);
    this._startWidth = 0;
    this._startX = 0;
    this._activeRows = undefined;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseMoveUp);
  }

  private onMouseMove(e: any) {
    if (this._pressed) {
      const { gridTemplateColumns: { stripped: columns } } = this;
      const width = Math.max(StudsGrid.MIN_CELL_WIDTH, this._startWidth + e.clientX - this._startX);
      const thIndex = this.tableRef?.getAttribute(StudsGrid.TABLE_SELECTED_TH_INDEX) as unknown as number;

      if (thIndex > -1) {
        columns[thIndex] = `${width}px`;
      }

      this.updateGridColumnsToView(columns);
      this.updateLockColumn();
    }
  }

  protected onFitColumnWidth(index: number, column: Column) {
    let width = StudsGrid.MIN_CELL_WIDTH;
    // calculate first 15 rows width
    const cells = this.shadowRoot?.querySelectorAll(`td[data-column="${column.key}"]`) || [];
    for (let i = 0; i < cells?.length; i++) {
      if (i > 15) break;
      const cell = cells[i];
      const cellTextLength = cell.textContent?.trim()?.length || 0;
      let lastVal: any = undefined;
      for (let [k, v] of StudsGrid.MIN_CELL_WIDTH_BY_VALUE) {
        if (cellTextLength < Number(k)) {
          lastVal = [k, v];
          continue;
        }
        width = Math.max(width, Number(lastVal?.[1] || v));
        break;
      }
    }

    const { gridTemplateColumns: { stripped: columns } } = this;

    let thIndex = index;
    if (this.enableSelectionRows) thIndex++;
    if (this.hasChildren) thIndex++;

    if (thIndex > -1) {
      columns[thIndex] = `${width}px`;
    }
    this.updateGridColumnsToView(columns);
    this.updateLockColumn();
  }

  //#endregion Column Resizing
  //#region Column Sorting
  public sortOrders: { [key: string]: boolean } = {};
  public clickCounts: { [key: string]: number } = {};

  // Store the original order of the data
  @state() originalData: Array<Row> = [...this.dataSource];

  private onSortTable(column: string, event: MouseEvent) {
    if (!this.enableSorting || this.isEditing) {
      return;
    }

    // Initialize the click count for the column if it doesn't exist
    if (!this.clickCounts[column]) {
      this.clickCounts[column] = 0;
    }

    // Increment the click count for the column
    this.clickCounts[column]++;

    if (event.shiftKey) {
      // If the Shift key is held down, add the column to sortedColumns
      if (!this.sortedColumns.includes(column)) {
        this.sortedColumns.push(column);
      }
    } else {
      // If the Shift key is not held down, replace sortedColumns with the column
      this.sortedColumns = [column];
    }

    // Depending on the click count, set the sort order or reset the column to default order
    if (this.clickCounts[column] % 3 === 1) {
      // Set Initial Data on First Click before Sorting Data
      this.originalData = [...this.dataSource];
      this.sortOrders[column] = true;
    } else if (this.clickCounts[column] % 3 === 2) {
      this.sortOrders[column] = false;
    } else {
      //@ts-ignore
      this.sortOrders[column] = null; // Reset to default order
    }

    if (this.sortOrders[column] === null) {
      // If the sort order is null, revert to the original order
      this.dataSource = [...this.originalData];
    } else {
      // Otherwise, sort the data
      this.dataSource.sort((a, b) => {
        for (let i = 0; i < this.sortedColumns.length; i++) {
          const col = this.sortedColumns[i];
          if (a[col] < b[col]) {
            return this.sortOrders[col] ? -1 : 1;
          } else if (a[col] > b[col]) {
            return this.sortOrders[col] ? 1 : -1;
          }
        }
        return 0;
      });
    }

    this.requestUpdate();
    this.requestUpdateVirtualList();
  }

  //#endregion Column Sorting
  //#region Column Reordering
  @query('thead tr') tableHeaderRef!: HTMLElement;
  private sortableColumns?: Sortable;
  private colBefore?: any;

  /**
   * Handle logic disabled filter columns
   * accept disabled if user passes ID or Label
   */

  @watch('enableColumnReordering')
  async handleColumnReorderInit() {
    await this.updateComplete;
    if (this.enableColumnReordering) {
      const duration = getRootTransition('small');
      if (!this.sortableColumns) {
        this.sortableColumns = new Sortable(this.tableHeaderRef, {
          handle: '.reorder-handle', // handle's class
          filter: '#selection_all', // filter out the selection column
          animation: duration,
          draggable: 'th',
          direction: 'horizontal',
          easing: 'cubic-bezier(1, 0, 0, 1)',
          // Classes
          ghostClass: 'ghost',
          chosenClass: 'chosen',
          dragClass: 'dragging',
          swapClass: 'highlighted',
          onStart: (e: Sortable.SortableEvent) => {
            this.colBefore = e.item.previousSibling;
            this.tableHeaderRef.style.setProperty(StudsGrid.FREEZE_COL_DISABLE_CURSOR, 'none');
          },
          onEnd: (e: Sortable.SortableEvent) => {
            this.tableHeaderRef.style.removeProperty(StudsGrid.FREEZE_COL_DISABLE_CURSOR);
            const to = this.enableSelectionRows ? (e.newIndex as number) - 1 : e.newIndex;
            const from = this.enableSelectionRows ? (e.oldIndex as number) - 1 : e.oldIndex;
            this.colBefore.after(e.item);
            this.columns.splice(to as number, 0, this.columns.splice(from as number, 1)[0]);
            this.colBefore = undefined;
            this.requestUpdate();
            this.requestUpdateVirtualList();
          }
        });
      }
    } else {
      this.sortableColumns?.destroy();
      this.sortableColumns = undefined;
    }
  }

  //#endregion Column Reordering
  //#region Column Filtering
  @state() protected _filteredColumns: FilteredColumns[] = [];

  protected validateFilterInput(value: string, column: FilteredColumns, criterion: string) {
    const isNotEmpty = (value: string) => {
      // Check for null or undefined
      if (value === null || value === undefined) return false;

      // Handle strings (including those with only whitespace)
      if (typeof value === 'string') return value.trim().length > 0;
      // For all other types that are not considered "empty"
      return true;
    }
    switch (criterion) {
      case StudsGrid.DROPDOWN_VALUES.CONTAINS:
        return String(value)
          .toLowerCase()
          .includes((column.value as string).toLowerCase());
      case StudsGrid.DROPDOWN_VALUES.DOES_NOT_CONTAINS:
        return !String(value)
          .toLowerCase()
          .includes((column.value as string).toLowerCase());
      case StudsGrid.DROPDOWN_VALUES.EQUALTO:
        if (parseInt(column.value as string)) {
          return parseInt(value) === parseInt(column.value as string);
        }
        return value.toLowerCase() === (column.value as string).toLowerCase();
      case StudsGrid.DROPDOWN_VALUES.NOT_EQUAL_TO:
        if (parseInt(column.value as string)) {
          return parseInt(value) !== parseInt(column.value as string);
        }
        return value !== column.value;
      case StudsGrid.DROPDOWN_VALUES.STARTS_WITH:
        const firstChar = (column.value as string)
          ?.charAt(0)
          .toLowerCase();
        return firstChar === value?.charAt(0).toLowerCase();
      case StudsGrid.DROPDOWN_VALUES.ENDS_WITH:
        const lastChar = (column.value as string)?.slice(-1).toLowerCase();
        return lastChar === value?.slice(-1).toLowerCase();
      case StudsGrid.DROPDOWN_VALUES.GREATER_THAN:
        return parseInt(value) > parseInt((column?.value as string));
      case StudsGrid.DROPDOWN_VALUES.LESS_THAN:
        return parseInt(value) < parseInt(column.value as string);
      case StudsGrid.DROPDOWN_VALUES.GREATER_THAN_OR_EQUAL_TO:
        return (
          parseInt(value) >= parseInt((column?.value as string))
        );
      case StudsGrid.DROPDOWN_VALUES.LESS_THAN_OR_EQUAL_TO:
        return (
          parseInt(value) <= parseInt(column.value as string)
        );
      case StudsGrid.DROPDOWN_VALUES.ISEMPTY:
        return !value;
      case StudsGrid.DROPDOWN_VALUES.IS_NOT_EMPTY:
        return isNotEmpty(value as string);
      case StudsGrid.DROPDOWN_VALUES.NULLVALUE:
        return value === null && true;
      case StudsGrid.DROPDOWN_VALUES.NOT_NULL_VALUE:
        return value !== null && true;
      default:
        return true;
    }
  }
  protected filterResults(data: object[]) {
    if (data) {
      const filtered = data.filter((row: Row) => {
        return this._filteredColumns.every((column) => {
          const value: string = typeof row[column.key] === "object" ? JSON.stringify(row[column.key]) : row[column.key] as string;
          switch (column.type) {
            case 'text':
              return this.validateFilterInput(value, column, column.criterion);
            case 'dropdown':
              if (Array.isArray(column.value)) {
                return column.value.includes(value);
              }
              if (parseInt(column.value as string)) {
                return parseInt(value) === parseInt(column.value as string);
              }
              return value === column.value;
            case 'datepicker':
              if (column.value !== '') {
                return (
                  parseDate(new Date(value)) ===
                  parseDate(new Date(column.value as string))
                );
              }
              return false;
            default:
              return true;
          }
        });

      });
      if (filtered.length === 0) return data;
      return filtered;
    }
  }

  protected handleFilterSubmitForm(e: SubmitEvent, column: Column) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const select = form.querySelector('studs-dropdown')?.value;
    const formData = new FormData(form);

    for (const key of formData.entries()) {
      const value = typeof column?.filterable === "boolean" ? key[1] : column?.filterable?.mode === 'multi' && (key[1] as string).length > 0 ? JSON.parse(key[1] as string) : key[1];
      const newData = Object.assign({}, {
        key: key[0],
        type: typeof column?.filterable === "boolean" ? 'text' : column?.filterable?.type as IFilterType,
        criterion: select as string,
        value: value as string
      });
      const isExist = this._filteredColumns.some(col => col.key === newData.key);
      if (!isExist) {
        this._filteredColumns = [...this._filteredColumns, newData];
      } else {
        this._filteredColumns = this._filteredColumns.map(col => col.key === newData.key ? { ...col, ...newData } : col);
      }
      this.setPage = 1;
    }
    this.requestUpdateVirtualList();
  }

  protected handleFilterSubmitClick(e: SubmitEvent, column: Column) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      this.handleFilterSubmitForm(e, column);
    } else this.handleFilterReset(column);
  }

  protected handleFilterReset(col: Column) {
    this._filteredColumns = this._filteredColumns.filter(column => column.key !== col.key);
    this.requestUpdateVirtualList();
  }

  protected isFilterDisabled(column: Column) {
    return this.disableColumnFilter?.includes(column.key) || this.disableColumnFilter?.includes(column.label);
  }
  protected isFilterApplied(column: Column) {
    const col = this._filteredColumns.find(col => col.key === column.key);
    return col && col?.value.length > 0;
  }

  protected renderFilter(column: Column) {
    const type = typeof column?.filterable === "boolean" ? 'text' : column.filterable?.type;
    const columnTable = this._filteredColumns.find(
      (col) => col?.key === column?.key
    );
    const selectValue = columnTable ? columnTable?.criterion : StudsGrid.DROPDOWN_VALUES.NO_FILTER;
    const options = [
      {
        label: 'No Filter',
        value: StudsGrid.DROPDOWN_VALUES.NO_FILTER,
      },
      {
        label: 'Contains',
        value: StudsGrid.DROPDOWN_VALUES.CONTAINS,
      },
      {
        label: 'Does Not Contains',
        value: StudsGrid.DROPDOWN_VALUES.DOES_NOT_CONTAINS,
      },
      {
        label: 'Starts With',
        value: StudsGrid.DROPDOWN_VALUES.STARTS_WITH,
      },
      {
        label: 'Ends With',
        value: StudsGrid.DROPDOWN_VALUES.ENDS_WITH,
      },
      {
        label: 'Greater Than',
        value: StudsGrid.DROPDOWN_VALUES.GREATER_THAN,
      },
      {
        label: 'Equals To',
        value: StudsGrid.DROPDOWN_VALUES.EQUALTO,
      },
      {
        label: 'Not Equals To',
        value: StudsGrid.DROPDOWN_VALUES.NOT_EQUAL_TO,
      },
      {
        label: 'Less Than',
        value: StudsGrid.DROPDOWN_VALUES.LESS_THAN,
      },
      {
        label: 'Greater Than Or Equal To',
        value: StudsGrid.DROPDOWN_VALUES.GREATER_THAN_OR_EQUAL_TO,
      },
      {
        label: 'Less Than Or Equal To',
        value: StudsGrid.DROPDOWN_VALUES.LESS_THAN_OR_EQUAL_TO,
      },
      {
        label: 'Is Empty',
        value: StudsGrid.DROPDOWN_VALUES.ISEMPTY,
      },
      {
        label: 'Is Not Empty',
        value: StudsGrid.DROPDOWN_VALUES.IS_NOT_EMPTY,
      },
      {
        label: 'Null Value',
        value: StudsGrid.DROPDOWN_VALUES.NULLVALUE,
      },
      {
        label: 'Not Null Value',
        value: StudsGrid.DROPDOWN_VALUES.NOT_NULL_VALUE,
      },
    ];
    switch (type) {
      case 'dropdown':
        if (typeof column?.filterable === "object" && column?.filterable?.options) return html`
          <studs-dropdown
            name=${column.key}
            .options=${column.filterable?.options}
            type=${ifDefined(column.filterable?.mode)}
          ></studs-dropdown>
        `;
        else break;
      case 'datepicker':
        return html`
          <studs-date-picker name=${column.key}></studs-date-picker>
        `;
      default:
        return html`
          <studs-dropdown .options=${options} .value=${selectValue}></studs-dropdown>
          <studs-input name=${column.key}></studs-input>`;
    }
  }

  protected renderColumnFilterField(column: Column) {
    if (this.enableFiltering && column?.filterable) {
      return html`
        <form @enter=${(e: SubmitEvent) => this.handleFilterSubmitClick(e, column)}
              @submit=${(e: SubmitEvent) => this.handleFilterSubmitForm(e, column)}>
          <div>
            <studs-form-control>
              <div class="form-container">       
                ${this.renderFilter(column)}
              </div>
            </studs-form-control>
            </br>
            <studs-divider></studs-divider>
            <div
              class="form-actions"
            >
              <studs-button
                @click=${() => this.handleFilterReset(column)}
                type="reset"
                size="small"
                button-type="secondary"
                variant="outline"
              >Reset
              </studs-button
              >
              <studs-button type="submit" size="small" button-type="primary"
              >Apply
              </studs-button
              >
            </div>
          </div>
        </form>
      `;
    }
  }

  //#endregion Column Filtering
  //#region Row Selection
  protected selectedRows: Set<unknown> = new Set();

  protected onSelectedRows(e: CustomEvent, rowItem: unknown) {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedRows.add(rowItem);
    } else {
      this.selectedRows.delete(rowItem);
    }
    this.requestUpdate();
    const event = new CustomEvent('onSelectedRows', {
      detail: {
        rowItem: Array.from(this.selectedRows)
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  protected get isCheckAllRows() {
    return this.selectedRows.size === this.dataSource?.length;
  }

  /**
   * Handle Selected All Rows
   */

  protected toggleAllCheckboxes(e: CustomEvent) {
    const checked = (e.target as HTMLInputElement).checked;
    if (!checked) {
      this.selectedRows?.clear();
    } else {
      this.dataSource?.forEach((r) => this.selectedRows.add(r));
    }
    this.requestUpdate();
    this.requestUpdateVirtualList();
    const event = new CustomEvent('onSelectedRows', {
      detail: {
        rowItem: Array.from(this.selectedRows)
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  //#endregion Row Selection
  //#region Row Reordering
  @state() protected _rowStartIndex: number = 0;
  @state() protected _rowEndIndex: number = 0;
  private sortableRows?: Sortable;
  private rowBefore?: any;

  /**
   * Virtual list key for enableInfiniteScroll = true
   */

  @watch('enableRowReordering')
  async handleRowReorderInit() {
    await this.updateComplete;
    if (this.enableRowReordering) {
      const duration = getRootTransition('small');
      if (!this.sortableRows) {
        this.sortableRows = new Sortable(this.tableBodyRef, {
          animation: duration,
          draggable: 'tr',
          direction: 'vertical',
          easing: 'cubic-bezier(1, 0, 0, 1)',
          dataIdAttr: 'data-index',
          // Classes
          ghostClass: 'ghost',
          chosenClass: 'chosen',
          dragClass: 'dragging',
          swapClass: 'highlighted',
          onStart: (e: Sortable.SortableEvent) => {
            this.rowBefore = e.item.previousSibling;
          },
          onEnd: (e: Sortable.SortableEvent) => {
            this.rowBefore.after(e.item);
            const prevItems = (this.pageSize *  (this._currentPage - 1)) || 0;
            const from = e.oldIndex as number + prevItems;
            const to = e.newIndex as number + prevItems;
            this.dataSource.splice(to, 0, this.dataSource.splice(from, 1)[0]);
            this.requestUpdate();
            this.rowBefore = undefined;
          }
        });
      }
    } else {
      this.sortableRows?.destroy();
      this.sortableRows = undefined;
    }
  }

  //#endregion Row Reordering
  //#region Cell Editability

  @state() protected isEditing: boolean = false;

  protected onEditingCell(e: CustomEvent, originalRow: Row, colKey: string) {
    const target = e.target as HTMLElement | StudsTextarea;
    const value = target.innerText
    if (value === originalRow[colKey]) return;
    const _editingRowData = {
      ...originalRow,
      [colKey]: value
    };
    this.dispatchEditableEvent(e, originalRow, _editingRowData);
    if (this.isEditing) this.isEditing = false;
  }

  protected dispatchEditableEvent(e: CustomEvent, originalRow: Row, _editingRowData?: Row) {
    e?.preventDefault();
    const event = new CustomEvent('onChangeRowData', {
      detail: {
        originalRow,
        newRow: _editingRowData
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  //#endregion Cell Editability
  //#region File Exportation

  /**
   * Handle toggle checkboxes
   */

  protected exportWith = { 'applied-filters': false, 'selected-rows': false };

  protected get isExportWithFilters() {
    return this.exportWith['applied-filters'];
  }

  protected get isExportWithSelectedRows() {
    return this.exportWith['selected-rows'];
  }

  protected get exportedData() {
    if (this.isExportWithSelectedRows) {
      return Array.from(this.selectedRows);
    }

    if (this.isExportWithFilters) {
      return this.filteredData;
    }

    if (this.isExportWithSelectedRows && this.isExportWithFilters) {
      return this.filteredData?.filter((filterRow: Row) =>
        Array.from(this.selectedRows).some(
          (selectedRow) => filterRow.id === (selectedRow as Row).id
        )
      );
    }

    return this.dataSource;
  }

  protected toggleExportWith(e: CustomEvent, option: string) {
    const checked = (e.target as HTMLInputElement).checked;

    this.exportWith = Object.assign({
      ...this.exportWith,
      [option]: Boolean(checked),
    });
  }

  /**
   * Handle export to csv, xls and xml
   */

  private exportTo(type: ExportType) {
    const fileName = 'data';
    const data = this.exportedData as object;
    if (!data) return;
    
    const exportType = exportFromJSON.types[type];

    return exportFromJSON({ data, fileName, exportType });
  }

  /**
   * Handle export to pdf
   */

  private exportPdf() {
    const fileName = 'data';
    const data = this.exportedData
    if (!data) return;

    const doc = new jsPDF({
      putOnlyUsedFonts: true,
      orientation: 'landscape',
    });

    doc.table(
      1,
      1,
      (data as Record<string, any>[]).map((d: Record<string, any>) => ({ ...d, id: String(d.id) })),
      this.columns.map((c) => c.key),
      { autoSize: true }
    );
    
    return doc.save(fileName + '.pdf');
  }
  //#endregion File Exportation

  override render() {
    // Get correct width of the column
    return html`
      <studs-toaster ${ref(this.toasterRef)}></studs-toaster>
      <div class=${classMap({
        grid: true,
        '-virtualized': this.isVirtualizedEnabled
      })}>
        <div class="grid -header">
          ${this.enableGlobalSearch
            ? html` <studs-input
                type="search"
                ?disabled=${this.isEditing}
                placeholder="Search..."
                .value=${this._searchTerm}
                @change=${this.onSearch}
              ></studs-input>`
            : null}
          <studs-button-group>
            <studs-button
              button-type="primary"
              @click=${() => this.exportTo('csv')}
              >Export CSV</studs-button
            >
            <studs-menu position="bottom">
              <studs-button
                slot="trigger"
                button-type="icon"
                icon="arrow_drop_down"
              ></studs-button>
              <ul class="export-options">
                <li>
                  <studs-checkbox
                    id="applied-filters"
                    name="applied-filters"
                    value="applied-filters"
                    label="with applied filters"
                    ?checked=${this.isExportWithFilters}
                    @change="${(e: CustomEvent) =>
                      this.toggleExportWith(e, 'applied-filters')}"
                  ></studs-checkbox>
                </li>
                <li>
                  <studs-checkbox
                    id="selected-rows"
                    name="selected-rows"
                    value="selected-rows"
                    label="with selected rows"
                    ?checked=${this.isExportWithSelectedRows}
                    @change="${(e: CustomEvent) =>
                      this.toggleExportWith(e, 'selected-rows')}"
                  ></studs-checkbox>
                </li>
                <studs-divider></studs-divider>
                <li @click=${() => this.exportTo('xls')}>Excel</li>
                <li @click=${() => this.exportPdf()}>PDF</li>
                <li @click=${() => this.exportTo('xml')}>XML</li>
              </ul>
            </studs-menu>
          </studs-button-group>
          ${ this.renderManageColumnButton() }
        </div>
        ${this.caption ? html`
          <caption>${this.caption}</caption>` : ''}
        <div
          class=${classMap({
      '-withBorder': this.showBorders
    })}>
          <table
            @visibilityChanged=${this.isVirtualizedEnabled ? this.onVisibilityChanged : nothing}
          >
            <thead class=${classMap({
      '-sticky': this.enableStickyHeader
    })}>
            <tr>
              ${this.hasChildren ? html`
                <th 
                  id=${StudsGrid.TOGGLE_NESTED_ROW_ID}
                  style=${styleMap(this.lockColumnThStyle(StudsGrid.TOGGLE_NESTED_ROW_ID))}
                ></th>` : nothing}
              ${this.enableSelectionRows
        ? html`
                  <th 
                    id=${StudsGrid.SELECTION_COLUMN_ID}
                    style=${styleMap(this.lockColumnThStyle(StudsGrid.SELECTION_COLUMN_ID))}
                  >
                    <div>
                      <p>
                        <studs-checkbox
                          id="select-all"
                          ?indeterminate=${this.selectedRows.size > 0 &&
          !this.isCheckAllRows}
                          ?checked=${this.isCheckAllRows}
                          @change="${this.toggleAllCheckboxes}"
                          ?disabled=${this.isEditing}
                        ></studs-checkbox>
                      </p>
                    </div>
                  </th>
                `
        : nothing}
              ${this.renderColumns()}
            </tr>
            </thead>
            <tbody>
            ${this.renderRows()}
            </tbody>
          </table>
        </div>
      </div>
      <div class="tableFooter -actions">
        ${this.enablePagination ? html`
          <studs-pagination current-page=${this._psuedoCurrentPage} total-items=${this.totalPages}
                            items-per-page=${this.pageSize} has-jumper ?has-select=${!this.isVirtualizedEnabled}
                            @changePage=${this.onPageClick} @change-items-per-page=${(e: CustomEvent) => {
          this.pageSize = e.detail.itemsPerPage;
        }}></studs-pagination>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-grid': StudsGrid;
  }
}
