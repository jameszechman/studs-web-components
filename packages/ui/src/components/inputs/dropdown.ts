import style from '@studs/styles/components/dropdowns';
import { CSSResult, CSSResultGroup, html, LitElement, nothing, PropertyValueMap, TemplateResult } from 'lit';
import { property, query, queryAll, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { repeat } from 'lit/directives/repeat.js';
import { type Icon, IconController } from '../../controllers/iconController';
import { focus } from '../../directives/focus';
import { sanitize } from '../../directives/sanitize';
import { FormElement } from '../../mixins/formElement.ts';
import { PopperElement } from '../../mixins/popperElement.ts';
import { onKeyDown } from '../../utils/shared';
import { StudsCheckbox } from './checkbox';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { watch } from '../../directives/watch.ts';
import { ArrayAndStringConverter } from '../../utils/converters.ts';

interface Option {
  label?: string;
  value?: string;
  name?: string;
  icon?: Icon;
  image?: string | URL;
  options?: Option[];
}

/**
 * @element studs-dropdown
 *
 */
@studsElement('studs-dropdown')
/**
 * A custom dropdown component that extends LitElement and includes FormElement and WithPopper mixins.
 * @fires StudsDropdown#change - Fired when the selected option(s) change.
 * @fires StudsDropdown#input - Fired when the user types in the search input (only for search and multi type dropdowns).
 * @fires StudsDropdown#toggle - Fired when the dropdown is opened or closed.
 */
export class StudsDropdown extends FormElement(PopperElement(StudsElement(LitElement))) {
  static styles: CSSResultGroup = [super.styles as CSSResult, style as CSSResult];
  /**
   * The value of the input
   */
  @property({ type: Array, converter: ArrayAndStringConverter }) value?: string | string[];
  /**
   * The icon to display in the action button.
   */
  @property({ type: String }) icon?: Icon;
  /**
   * The options to display in the dropdown.
   */
  @property({ type: Array }) options: Option[] = [];
  /**
   * The size of the dropdown
   */
  @property({ type: String }) size?: 'small' | 'medium' = 'medium';
  /**
   * The type of dropdown
   */
  @property({ type: String }) type?: 'default' | 'search' | 'multi' = 'default';
  @state() _query?: string = '';
  @state() _hovered?: string | null;
  @query('.toggle.-wrapper') private toggleButton!: HTMLElement;
  @queryAll('[role="option"]') private optionElements!: HTMLElement[];
  @query('input[type="search"]') private searchInput!: HTMLElement;
  private iconController = new IconController(this);
  private _lastKey: string = '';
  private _lastKeyTime: number = 0;

  /**
   * Initiate Popper
   */
  constructor() {
    super();
    this.position = 'bottom';
    this.strategy = 'fixed';
    this.on = 'toggle';
  }

  override firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    if (this.toggleButton instanceof HTMLElement) {
      this.element = this.toggleButton;
      this.scheduleUpdate();
    }
  }

  @watch('options')
  @watch('type')
  handleOptionsInit() {
    this.updateComplete.then(() => {
      const groupOptions = this.options?.reduce((acc: Option[], option: Option) => {
        if (option.options) {
          acc.push(...option.options);
        }
        return acc;
      }, []);
      if ((this.options?.length > 10 || groupOptions?.length > 10) && this.type === 'default') {
        this.type = 'search';
      }
    });
  }

  @watch('value')
  handleValueChange() {
    const value = (this.type === 'multi' ? JSON.stringify(this.value) : this.value as string);
    if(!this.hasUpdated) {
      /**
       * Runs before the first update
       */
      if(this.value) {
        this.setFormValue(value)
      };
    } else {
      /**
       * Runs after the first update
       */
      if(this.value) {
        this.setFormValue(value)
      } else this.clearFormValue();
    }
  }

  private get open(): boolean {
    return this.popperOpen;
  }
  /**
   * Returns an array of options that match the current query.
   * If there is no query, returns all options.
   * @returns An array of Option objects.
   */
  private get filteredOptions(): Option[] {
    if (!this._query) {
      return this.options;
    }

    const filteredOptions: Option[] = [];

    this.options.forEach((option: Option) => {
      if (option.options) {
        const filteredSubOptions = option.options.filter(subOption => subOption.label?.toLowerCase().includes((this._query as string).toLowerCase()));
        if (filteredSubOptions.length > 0) {
          filteredOptions.push({ ...option, options: filteredSubOptions });
        }
      } else if (this._query && option.label?.toLowerCase().includes(this._query.toLowerCase())) {
        filteredOptions.push(option);
      }
    });

    return filteredOptions;
  }
  /**
   * Returns the total number of options in the dropdown, including nested options.
   * @returns The total number of options in the dropdown.
   */
  private get length(): number {
    const combinedOptions = this.options?.reduce((acc: Option[], option: Option) => {
        if (option.options) {
          acc.push(...option.options);
        } else {
          acc.push(option);
        }
        return acc;
      }
      , []);
    return combinedOptions?.length || 0;
  }
  /**
   * Returns the selected option(s) label(s) based on the dropdown type.
   * @returns The selected option(s) label(s) or undefined if no option is selected.
   */
  private get getSelected(): string | string[] | Option | Option[] | undefined {
    if (!this.options) {
      return this.placeholder || '';
    }

    if (!this.value) {
      return this.placeholder || undefined;
    }

    const findSelectedOption = (value: string): Option | undefined => {
      const option = this.options.find(option => {
        return option.value === value;
      });

      if (option) {
        return option;
      }

      for (const option of this.options) {
        if (option.options) {
          const subOption = option.options.find(subOption => subOption.value === value);
          if (subOption) {
            return subOption;
          }
        }
      }
    };

    if (this.type === 'multi') {
      if (typeof this.value === 'string') {
        this.value = [this.value];
      }


      return (this.value as string[])?.map((value: string) => {
        return findSelectedOption(value);
      }) as Option[];
    }

    const selected = findSelectedOption(this.value as string);
    return selected?.label || selected?.options?.find((subOption: Option) => subOption.value === this.value)?.label;
  }
  /**
   * Renders the adornment for a given option in the dropdown.
   * @param option - The option to render the adornment for.
   * @returns The rendered adornment element.
   */
  private renderAdornment(option: Option) {
    if (option.image) {
      const isVisible = this._hovered ? this._hovered === String(option.value) : this.value === option.value;
      return html`
        <studs-image class="adornment" src=${option.image} aria-hidden=${!isVisible}></studs-image>`;
    } else if (option.icon) {
      return html`<span class="adornment"
      >${this.iconController.icon(option.icon)}</span
      >`;
    } else {
      return nothing;
    }
  }
  /**
   * Returns a TemplateResult for rendering a single option in the dropdown.
   * @param option - The option to render.
   * @returns A TemplateResult for the option.
   */
  private renderOptionTemplate(option: Option): TemplateResult | undefined {
    return choose(this.type, [
        ['multi', () => {
          const selected = this.value ? (this.value as string[])?.some((selectedOption: string) => selectedOption === option.value) : false;
          return html`
            <li
              @click=${(event: MouseEvent) => this.handleChange(event, option)}
              role="option"
              aria-selected=${selected}
              id=${option.value}
              @mouseenter=${this.handleMouseEnter}
            >
              <studs-checkbox 
                name=${ifDefined(this.name)} 
                label=${ifDefined(option.label)} 
                value=${option.value} 
                .checked=${selected} 
                >
              </studs-checkbox>
              ${this.renderAdornment(option)}
            </li>
          `;
        }
        ]
      ],
      () => html`
        <li @click=${(event: MouseEvent) => this.handleChange(event, option)} role="option"
            aria-selected=${String(option.value) === String(this.value)} id=${String(option.value)}
            @mouseenter=${this.handleMouseEnter}
            >
          <input name=${this.name} value=${option.value} />
          <label for=${ifDefined(option.value)}>${sanitize(option.label)}</label>
          ${this.renderAdornment(option)}
        </li>`
    );
  }
  /**
   * Renders the option type for the dropdown component.
   * @param option - The option to render.
   * @returns The HTML template for the option.
   */
  private renderOptionType(option: Option) {
    if (option.options && option.options?.length > 0) {
      return html`
        <li class="group -wrapper">
          ${option.name ? html`<span class="group -header">${option.name}</span>` : nothing}
          <ul>
            ${repeat(option.options, (option) => option.value || option.name, (option: Option) => {
              return this.renderOptionTemplate(option);
            })}
          </ul>
        </li>`;
    }
    return this.renderOptionTemplate(option);
  }
  /**
   * Returns a TemplateResult of the options to be rendered in the dropdown.
   * If `this.options` is defined, it will render the options based on the `type` property.
   * If `this.filteredOptions` is empty, it will render a "No options found" message.
   * @returns {TemplateResult | undefined} A TemplateResult of the options to be rendered in the dropdown.
   */
  private renderDropdownOptions(): TemplateResult | undefined {
    if (this.options)
      return choose(this.type, [
          [
            'default',
            () => {
              return repeat(this.options, (option) => option.value || option.name, (option: Option) => {
                return this.renderOptionType(option);
              });
            }
          ]
        ],
        () => {
          if (this.filteredOptions.length > 0)
            return html` ${this.options && this.length > 5 && !this._query && this.type === 'multi'
              ? html`
                <li @click=${this.handleSelectAllChange} role="option">
                  <studs-checkbox
                    name=${this.name}
                    label=${this.value === this.options
                ? 'Deselect All'
                : 'Select All'}
                    ?indeterminate=${this.value && (this.value as string[] | Option[])?.length > 0 && (this.value as string[] | Option[])?.length !== this.length}
                  ></studs-checkbox>
                </li>`
              : null}

            ${repeat(this.filteredOptions, (option) => option.value || option.name, (option: Option) => this.renderOptionType(option))}`;
          return html`
            <li>No options found</li>`;
        }
      ) as TemplateResult;
  }

  /**
   * Returns the toggle element for the dropdown component based on the type of dropdown.
   * @returns {TemplateResult} The toggle element as a TemplateResult.
   */
  private renderToggle(): TemplateResult<1> | undefined {
    return choose(this.type, [
      [
        'search',
        () => html`<span id='trigger-label' class="toggle -item"
        ><input
          type="search"
          placeholder=${ifDefined(this.placeholder)}
          .value=${this._query || (this.getSelected as string) || ''}
          @input=${(event: InputEvent) => {
            this.handleSearchChange(event);
            if (this._query === '' || typeof this._query === undefined)
              this.value = undefined;
          }}
        />
          ${!this.icon ? this.iconController.icon('expand_more') : nothing}
        </span
        >`
      ],
      [
        'multi',
        () => html`<span id='trigger-label' class="toggle -item"
        ><span class="chips">${map(
          this.getSelected as Option[],
          (option: Option) =>
            html`
              <studs-chip
                deletable
                @delete=${() => this.handleSelectedDelete(option)}
              >${option?.label}
              </studs-chip
              >`
        )}</span><input
          type="search"
          placeholder=${this.placeholder || 'Search'}
          .value=${this._query}
          @input=${this.handleSearchChange}
        /><studs-badge position='center'
                       count=${(this.value as string[] | Option[])?.length || 0}></studs-badge>${!this.icon ? this.iconController.icon('expand_more') : nothing}</span
        >`
      ]
    ], () =>
      html`<span id='trigger-label' class="toggle -item">
              ${sanitize(this.getSelected as string)} ${!this.icon ? this.iconController.icon('expand_more') : nothing}
        </span>`);
  }

  render() {
    return html`
      <div
        part="wrapper"
        class=${classMap({
      dropdown: true,
      '-wrapper': true,
      [`-${this.size}`]: this.size || false,
      '-icon': this.icon || false
    })}
        ?disabled=${this.disabled}
      >
        <div class="dropdown -content" role="combobox"
             @keydown=${this.handleKeyDown}
        >
          <div
            class=${classMap({
      'toggle -wrapper': true,
      [`-${this.status}`]: !!this.status
    })}
            ?disabled=${this.disabled}
            role="button"
            tabindex="0"
            aria-labelledby="trigger-label"
            aria-expanded="${String(this.open)}"
            aria-haspopup="listbox"
            aria-owns="menu"
            aria-controls="menu"
            aria-required=${ifDefined(this.required)}
          >
            ${this.renderToggle()}
            ${this.icon
      ? html`
                <studs-button
                  class="dropdown -action"
                  icon=${this.icon}
                  button-type="tertiary"
                  size="small"
                ></studs-button>`
      : nothing}
          </div>

          <ul
            id="menu"
            part="dropdown"
            class="popper"
            role="listbox"
            tabindex="-1"
            aria-activedescendant=${ifDefined(this.value)}
          >
            ${this.renderDropdownOptions()}
            <div id="arrow"></div>
          </ul>
        </div>
      </div>`;
  }

  private handleKeyDown = (event: KeyboardEvent) => onKeyDown(event, {
    navigating: (target) => {
      const query = choose(this.type, [
        ['multi', () => 'studs-checkbox']
      ], () => 'input');
      if (!this.popperOpen) this.showPopper();
      const selectedOption = Array.from(this.optionElements).find((option: HTMLElement) => option.getAttribute('id') === this.value)?.querySelector(query as string);
      const initial = selectedOption || this.optionElements[0]?.querySelector(query as string);
      if (initial && (target as HTMLElement).tagName.toLowerCase() !== query) {
        focus(initial as HTMLElement);
      } else {
        const options = Array.from(this.optionElements);
        const index = options.indexOf((target as HTMLElement).parentElement as HTMLElement);
        const nextIndex = event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'Up' || event.key === 'Left' ? index - 1 : index + 1;
        const next = options[nextIndex]?.querySelector(query as string);
        if (next) {
          focus(next as HTMLElement);
        }
      }
    },
    triggering: (target) => {
      event.preventDefault();
      if (this.open) {
        switch (this.type) {
          case 'multi':
            const label = (target as StudsCheckbox).label?.toLowerCase();

            if (label === 'select all') {
              this.handleSelectAllChange(event);
            }
            if (event.key !== ' ') this.handleChange(event, { value: (target as StudsCheckbox).value } as Option);
            break;
          default:
            this.handleChange(event, { value: (target as StudsCheckbox).value } as Option);
            break;
        }
      } else if (!this.disabled) {
        this.showPopper();
      }
    },
    typing: () => {
      if (this.type !== 'default') {
        focus(this.searchInput);
      } else {
        const currentTime = new Date().getTime();
        const interval = 200;
        if (currentTime - this._lastKeyTime < interval || this._lastKeyTime === 0) {
          if (this.popperOpen) {
            const elements = Array.from(this.optionElements);
            elements.find((option: HTMLElement) => {
              if (option.getAttribute('id')?.toLowerCase().startsWith(this._lastKey + event.key.toLowerCase()) || option.innerText.toLowerCase().startsWith(this._lastKey + event.key.toLowerCase())) {
                const input = option.querySelector('input');
                if (input) focus(input as HTMLInputElement);
                return true;
              }
            });
          } else {
            this.options.find((option: Option) => {
              if (option.label?.toLowerCase().startsWith(this._lastKey + event.key.toLowerCase())) {
                this.handleChange(event, option);
                return true;
              }
            });
          }
          this._lastKeyTime = currentTime;
          this._lastKey = event.key;
        }
        const timeout = setTimeout(() => {
          this._lastKeyTime = 0;
          this._lastKey = '';
          clearTimeout(timeout);
        }, interval);
      }
    }
  }, {
    triggers: {
      typing: true
    },
    compareFunc: (element) => {
      const isOption = Boolean(element?.parentElement?.getAttribute('role') == 'option');
      const isCheckbox = Boolean(element?.getAttribute('type') === 'checkbox' && element?.getAttribute('name')?.includes('dropdown'));
      return !isOption && !isCheckbox;
    }
  });

  /**
   * Handles the change event of the search input element.
   * If the popper controller is not open, it shows the popper.
   * Sets the query to the value of the input element.
   * @param event - The input event.
   */
  private handleSearchChange(event: InputEvent) {
    if (!this.popperOpen) {
      this.showPopper();
    }
    this._query = (event.target as HTMLInputElement).value;
  }

  private handleChange(event: MouseEvent | KeyboardEvent, option: Option) {
    if(event.target instanceof StudsCheckbox) {
      event.preventDefault();
    }
    if(this.type === 'multi') {
      if (this.value) {
        const selected = Array.from(this.value as string[]);
        const index = selected.findIndex(
          (selectedOption: string) => selectedOption === option.value
        );

        if (index > -1) {
          selected.splice(index, 1);
        } else {
          if (option.value) selected.push(option.value);
        }
        this.value = selected;
      } else {
        if (option.value)
          this.value = [option.value];
      }

      this._query = '';
    } else {
      this.value = option.value;
      if (this.type === 'search') this._query = undefined;
      this.hidePopper();
    }
    this.dispatch();
  }

  /**
   * Handles the change event when the "Select All" checkbox is clicked.
   * @param event - The MouseEvent object.
   */
  private handleSelectAllChange(event: MouseEvent | KeyboardEvent) {
    let checkbox: StudsCheckbox;
    if(event.target instanceof StudsCheckbox) {
      event.preventDefault();
      checkbox = event.target;
    } else {
      checkbox = (event.target as HTMLElement).querySelector('studs-checkbox') as StudsCheckbox;
    }
    const options: string[] = [];
    this.options.forEach((option: Option) => {
      if (option.options) {
        option.options.forEach((subOption: Option) => {
          if (subOption.value) options.push(subOption.value);
        });
      } else if (option.value) options.push(option.value);
    });

    if (JSON.stringify(this.value) === JSON.stringify(options)) {
      this.value = [];
      checkbox.checked = false;
    } else {
      this.value = options;
      checkbox.checked = true;
    }
    this._query = '';
  }

  private handleMouseEnter(event: MouseEvent | PointerEvent) {
    const handleMouseLeave = () => {
      this._hovered = undefined;
      event.target?.removeEventListener('mouseleave', handleMouseLeave)
    }
    event.target?.addEventListener('mouseleave', handleMouseLeave, { once: true })
    this._hovered = (event.target as HTMLElement).getAttribute('id');
  }

  /**
   * Callback function that is called when an option is deleted from the selected options.
   * @param option - The option that was deleted.
   */
  private handleSelectedDelete = (option: Option) => {
    const selected = Array.from(this.value as string[]);
    const index = selected.findIndex(
      (selectedOption: string) => selectedOption === option?.value
    );
    selected.splice(index, 1);
    this.value = selected;
    this.dispatch();
  };

  protected reset = () => {
    if (this.type === 'multi') {
      this.value = [];
    } else {
      this.value = '';
    }
    this.clearFormValue();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-dropdown': StudsDropdown;
  }
}