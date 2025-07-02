import style from '@studs/styles/components/pagination';
import { CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { ResponsiveController } from '../../controllers/responsiveController';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-pagination
 *
 */
@studsElement('studs-pagination')
export class StudsPagination extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The current page
   */
  @property({ attribute: 'current-page', type: Number, reflect: true })
  currentPage: number = 1;
  /**
   * The total number of items
   */
  @property({ attribute: 'total-items', type: Number })
  totalItems: number = 0;
  /**
   * The number of items per page
   */
  @property({ attribute: 'items-per-page', type: Number, reflect: true })
  itemsPerPage: number = 10;
  /**
   * Whether to show the jumper or not
   */
  @property({ attribute: 'has-jumper', type: Boolean })
  hasJumper: boolean = false;
  /**
   * The label for the jumper
   */
  @property({ attribute: 'jumper-label', type: String })
  jumperLabel: string = 'Go To';
  /**
   * Whether to show the select or not
   */
  @property({ attribute: 'has-select', type: Boolean })
  hasSelect: boolean = false;
  /**
   * The label for the select
   */
  @property({ attribute: 'select-label', type: String })
  selectLabel: string= 'Show';
  /**
   * Whether the Pagination is Disabled
   */
  @property({type: Boolean}) disabled: boolean = false;
  /**
   * The options for the items per page select
   */
  @property({ type: Array, attribute: false })
  itemsPerPageOptions = [
    {
      label: '10 Items',
      value: '10'
    },
    {
      label: '25 Items',
      value: '25'
    },
    {
      label: '50 Items',
      value: '50'
    },
    {
      label: '100 Items',
      value: '100'
    }
  ];
  protected mediaQuery = new ResponsiveController(this);
  @state() private pages: Array<number | string> = [];

  override connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.getRootNode()?.addEventListener('resize', () => this._paginate());
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.getRootNode()?.removeEventListener('resize', this._paginate);
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('currentPage') ||
      changedProperties.has('itemsPerPage') ||
      changedProperties.has('totalItems')
    ) {
      this._paginate();
    }
  }

  override render(): TemplateResult {
    const selectEl = this.hasSelect
      ? html`
        <div class="select">
          <label class=${classMap({ '-disabled': this.disabled })}>${this.selectLabel}</label>
          <studs-dropdown
            .value=${String(this.itemsPerPage)}
            .options=${this.itemsPerPageOptions}
            @change="${this._selectHandler}"
            ?disabled=${this.disabled}
          >
          </studs-dropdown>
        </div>
      `
      : null;

    const jumperEl = this.hasJumper
      ? html`
        <div class="jumper">
          <label class=${classMap({ '-disabled': this.disabled })}>${this.jumperLabel}</label>
          <studs-input
            .value=${this.currentPage}
            input-size="short"
            @input="${this._inputHandler}"
            type="number"
            min="1"
            max=${this._getLastPage()}
            ?disabled=${this.disabled}
          ></studs-input>
        </div>`
      : null;

    const getHelperElements = () => {
      if (!this.hasSelect && !this.hasJumper) return;
      return html`
        <div class="pagination-helpers">${selectEl} ${jumperEl}</div>
      `;
    };

    return html`
      <nav class="pagination" aria-label="Pagination">
        ${this.renderPages()} ${getHelperElements()}
      </nav>`;
  }

  private _paginate() {
    this.pages = [];
    const pageListLength =
      Math.ceil(Math.abs(this.totalItems / this.itemsPerPage)) || 1;

    if (pageListLength <= 8) {
      this.pages = Array.from(Array(pageListLength), (_, index) => index + 1);
      return;
    }

    this.pages.push(1);

    if (this.currentPage < 5) {
      this.pages.push(2, 3, 4, 5, '...');
    } else if (
      this.currentPage >= 5 &&
      this.currentPage <= pageListLength - 4
    ) {
      this.pages.push(
        '...',
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        '...'
      );
    } else {
      this.pages.push(
        '...',
        pageListLength - 4,
        pageListLength - 3,
        pageListLength - 2,
        pageListLength - 1
      );
    }

    this.pages.push(pageListLength);
  }

  private _changePage(selectedPage: number): void {
    const prevPage = this.currentPage;

    this.currentPage = selectedPage;
    const event = new CustomEvent('changePage', {
      detail: {
        selectedPage,
        prevPage,
        itemsPerPage: this.itemsPerPage
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private _pageBack(): void {
    if (this.currentPage === 1) return;
    this._changePage(this.currentPage - 1);
  }

  private _pageForward(): void {
    if (this.currentPage === this._getLastPage()) return;
    this._changePage(this.currentPage + 1);
  }

  private _getLastPage(): number {
    return +this.pages[this.pages.length - 1];
  }

  private _inputHandler(event: Event) {
    event.stopPropagation();
    const inputValue = +(event.target as HTMLInputElement).value;
    const newPage =
      inputValue > 0 ? Math.min(this._getLastPage(), inputValue) : 1;
    this._changePage(newPage);
  }

  private _selectHandler(event: Event) {
    this.itemsPerPage = +(event.target as HTMLInputElement).value || 100;
    this._changePage(1);
    const changeItemsPerPage = new CustomEvent('change-items-per-page', {
      detail: {
        itemsPerPage: this.itemsPerPage
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeItemsPerPage);
  }

  private _renderSinglePage(page: number | string) {
    if (typeof page === 'string') {
      return html`
        <li class="dots">
          <i class="icon">more_horiz</i>
        </li>`;
    }
    const ariaCurrent = this.currentPage === page ? 'page' : undefined;

    return html`
      <li>
        <studs-button
          @click="${() => this._changePage(page)}"
          button-type=${this.currentPage === page ? 'link' : 'tertiary'}
          size="small"
          label="Page ${page}"
          aria-current=${ifDefined(ariaCurrent)}
          ?disabled=${this.disabled}
        >
          ${page}
        </studs-button>
      </li>`;
  }

  private renderPages() {
    return html`
      <div class="page-container">
        <studs-button
          @click="${this._pageBack}"
          button-type="tertiary"
          icon="chevron_left"
          class="previous"
          label="Previous"
          ?disabled=${this.currentPage === 1 || this.disabled}
        ></studs-button>
        <ul class="page-list">
          ${this.mediaQuery.isMobile
      ? this._renderSinglePage(this.currentPage)
      : this.pages.map((page) => this._renderSinglePage(page))}
        </ul>
        <studs-button
          @click="${this._pageForward}"
          button-type="tertiary"
          icon="chevron_right"
          class="next"
          label="Next"
          ?disabled=${this.currentPage === this._getLastPage() || this.disabled}
        ></studs-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-pagination': StudsPagination;
  }
}
