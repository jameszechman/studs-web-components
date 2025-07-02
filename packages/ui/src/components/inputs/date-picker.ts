import { ifDefined } from 'lit/directives/if-defined.js';
import style from '@studs/styles/components/datePicker';
import { CSSResult, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { FormElement } from '../../mixins/formElement.ts';
import { studsElement } from '../../decorators/studs-element';
import { PopperElement } from '../../mixins/popperElement.ts';
import { parseDate } from '../../utils/shared';
import { StudsElement } from '../../mixins/studsElement.ts';
import { watch } from '../../directives/watch.ts';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

/**
 * @element studs-date-picker
 *
 * @fires onSelectedDate - Fired when a date is selected
 */
@studsElement('studs-date-picker')
export class StudsDatePicker extends FormElement(PopperElement(StudsElement(LitElement))) {
  static styles: CSSResultGroup = [super.styles as CSSResult, style as CSSResult];
  private _weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  /**
   * The minimum date of the datepicker
   */
  @property({ type: String, attribute: 'min-date' }) minDate: string;
  /**
   * The maximum date of the datepicker
   */
  @property({ type: String, attribute: 'max-date' }) maxDate: string;
  /**
   * The value of the datepicker
   */
  @property({ type: String }) value!: string;
  @state() month: number = 0;
  @state() year: number = 0;

  @query('[data-toggle]') toggle: HTMLElement;

  constructor() {
    super();
    this.position = 'bottom';
    this.on = 'toggle';
    this.closeOnClickOutside = true;
    this.useAvailableWidth = true;
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
  }

    @watch('value')
    handleValueChange() {
      if(!this.hasUpdated) {
        /**
        * Runs before the first update
        */
        if(this.value) this.setFormValue(this.value);
      } else {
        /**
        * Runs after the first update
        */
        if(this.value) {
          this.setFormValue(this.value)
        } else this.clearFormValue();
      }
    }

    private renderDays() {
      const daysOfMonth = [];
      const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
      const numberOfDays = new Date(this.year, this.month + 1, 0).getDate();
      const minDate = new Date(this.minDate).setHours(0, 0, 0, 0) - 1;
      const maxDate = new Date(this.maxDate).setHours(23, 59, 0, 0);
      const [year, month, day] = this.value?.split('-').map(Number) || [null, null, null];
      const selectedDate = new Date(year, month - 1, day, 0, 0, 0, 0).getTime();

      for (let i = 0; i < firstDayOfMonth; i++) {
        daysOfMonth.push(html`
          <div class="day empty"></div>`);
      }
      for (let day = 1; day <= numberOfDays; day++) {
        const days = new Date(this.year, this.month, day, 0, 0, 0, 0)
        daysOfMonth.push(
          html`
            <button
              data-index=${day}
              class=${classMap({
                'month-day': true,
                '-disabled': days.getTime() <= minDate || days.getTime() >= maxDate || this.disabled,
                '-selected': selectedDate == days?.getTime()
              
              })}
              ?disabled=${this.disabled}
            >
              ${day}
            </button>`
        );
      }
  
      return repeat(daysOfMonth, (item) => item);
    }

  render() {
    return html`
      <div
        class="datePicker"
        part="wrapper"
      >
        <studs-input
          data-toggle
          part="input"
          type='date'
          placeholder=${ifDefined(this.placeholder)}
          autocomplete="off"
          .value=${this.value}
          ?disabled=${this.disabled}
          @click=${(e: Event) => e.preventDefault()}
          @input=${this.handleChange}
        ></studs-input>
        <div
          class="popper"
          part="popper"
        >
          <div class="header">
            <button
              type="button"
              aria-label="previous month"
              @click=${this.handlePrev}
            ></button>
            <h4 tabindex="0" aria-label="current month">
              ${this.getMonthName(this.month)}, ${this.year}
            </h4>
            <button
              type="button"
              aria-label="next month"
              @click=${this.handleNext}
            ></button>
          </div>
          <div class="week-days">
            ${this._weekDays.map((w) => html` <span>${w}</span> `)}
          </div>
          <div class="month-days" @click=${this.handleDateClick}>${this.renderDays()}</div>
        </div>
      </div>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.firstUpdated(_changedProperties);
    if (this.toggle instanceof HTMLElement) {
      this.element = this.toggle;
    }
  }

  protected reset = () => {
    this.value = '';
    this.clearFormValue();
  };

  private getMonthName(month: number) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return monthNames[month];
  }

  private handleNext() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
  }

  private handlePrev() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
  }

  private handleChange(e: Event) { 
    this.value = (e.target as HTMLInputElement).value 
    this.dispatch();
  } 

  private handleDateClick(event: Event) {
    if(event.target instanceof HTMLButtonElement) {
      this.value = parseDate(new Date(this.year, this.month, Number((event.target as HTMLButtonElement).dataset.index)));;
      this.dispatch();
      this.hidePopper();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-date-picker': StudsDatePicker;
  }
}