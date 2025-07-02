import style from '@studs/styles/components/slider';
import { CSSResult, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FormElement } from '../../mixins/formElement.ts';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { watch } from '../../directives/watch.ts';
import { createRef, ref } from 'lit/directives/ref.js';
import { ArrayAndNumberConverter } from '../../utils/converters.ts';

// #ref: https://github.com/carbon-design-system/carbon-web-components/tree/main

interface Mark {
  value: number;
  label?: string;
}

/**
 * @element studs-slider
 */

@studsElement('studs-slider')
export class StudsSlider extends FormElement(StudsElement(LitElement)) {
  static override styles: CSSResult = style as CSSResult;
  /**
   * The minimum value of the slider
   */
  @property({ type: Number }) min: number = 0;
  /**
   * The maximum value of the slider
   */
  @property({ type: Number }) max: number = 100;
  /**
   * The current step of the slider
   */
  @property({ type: Number }) step: number = 1;
  /**
   * The default value of the slider
   */
  @property({ type: Array, converter: ArrayAndNumberConverter }) defaultValue: number | number[];
  /**
   * The label of the input
   */
  @property({ type: String }) public label?: string;
  /**
   * The value of the input
   */
  @property({ type: Array, converter: ArrayAndNumberConverter }) value?: number | number[]
  /**
   * The marks of the slider
   */
  @property({ type: Array }) marks: Mark[];
  /**
   * The label to the right of the slider
   */
  @property({ type: String, attribute: 'end-label' }) endLabel: string = '';
  /**
   * Whether to enable input or not
   */
  @property({ type: Boolean, attribute: 'enable-input' }) enableInput: boolean = false;
  /**
   * Whether to enable label or not
   */
  @property({ type: Boolean, attribute: 'enable-label' }) enableLabel: boolean = false;
  /**
   * Whether to enable tooltip or not
   */
  @property({ type: Boolean, attribute: 'enable-tooltip' }) enableTooltip: boolean =
    false;
  /**
   * A function that determines the tooltip label
   */
  @property({ type: Function, attribute: 'calculate-tooltip-label' })
  calculateTooltipLabel: (value: number) => string = (
    value: number
  ) => {
    return value + '°';
  };

  @watch('defaultValue')
  @watch('value')
  handleValueMismatches() {
    const containsArray = Array.isArray(this.defaultValue) || Array.isArray(this.value)
    const doesNotContainArray = typeof this.defaultValue === 'number' || typeof this.value === 'number';
    if(containsArray && doesNotContainArray) console.warn('Slider value and defaultValue contains a mix of types: array and number');
    if(this.isRange) {
      const rangeValue = this.value as number[] || this.defaultValue;
      if(rangeValue[1] > this.max) console.warn('Slider ending range value should not be greater than max value');
      if(rangeValue[0] < this.min) console.warn('Slider starting range value should not be less than min value');
    }
  }

  @watch('defaultValue')
  handleDefaultValueChange() {
    const value = (Array.isArray(this.defaultValue) ? JSON.stringify(this.defaultValue) : this.defaultValue) as string;
    if(!this.hasUpdated) {
      /**
       * Runs before the first update
       */
      if(value) this.setFormValue(value);
    }
  }

  @watch('value')
  handleValueChange() {
    const value = (Array.isArray(this.value) ? JSON.stringify(this.value) : this.value) as string;
    const valueExists = value || value === '0' || (value as unknown as number) === 0;
    if(!this.hasUpdated) {
      /**
       * Runs before the first update
       */
      if(valueExists) this.setFormValue(value);
    } else {
      /**
       * Runs after the first update
       */
      if (valueExists) {
        this.setFormValue(value)
      } else this.clearFormValue();
    }
  }

  private get _minValue(): number {
    if(this.isRange) {
      const value = this.value || this.defaultValue
      if(Array.isArray(value) && value[0] >= 0) return value[0] as number;
      return this.min
    } else {
      const value = typeof this.value === 'number' && this.value >= 0 ? this.value : this.defaultValue;
      if(value) return value as number;
      return this.min;
    }
  }
  private get _maxValue(): number {
    const value = this.value || this.defaultValue
    if(Array.isArray(value) && value[1] >= 0) return value[1] as number;
    return this.max;
  }
  private _leftThumbRef = createRef();
  private _rightThumbRef = createRef()
  private _sliderRef = createRef();
  
  private get isRange() {
    return Array.isArray(this.value) || Array.isArray(this.defaultValue);
  }
  private getPercent = (value: number) => {
    return Math.round(((value - this.min) / (this.max - this.min)) * 100);
  };
  private get _minPercentage() {
    return this.getPercent(this._minValue);
  }
  private get _maxPercentage() {
    return this.getPercent(this._maxValue);
  }
  private getToolTipValue(value: number) {
    if (this.calculateTooltipLabel) {
      return this.calculateTooltipLabel(value);
    }
    return value;
  }
  private renderLabel(position: 'left' | 'right') {
    if (this.enableLabel) {
      if (position === 'left') {
        return html`
          <div class="leftTxt">
            ${this.label ? this.label?.substring(0, 15) : nothing}
          </div>`;
      }
      if (position === 'right') {
        return html`
          <div class="rightTxt">
            ${this.endLabel ? this.endLabel?.substring(0, 15) : nothing}
          </div>`;
      }
    }
    return nothing;
  }
  private renderInput(type: 'min' | 'max') {
    if (this.enableInput) {
      const {isRange} = this;
      const isMax = type === 'max';
      if(!isRange && !isMax) return nothing;
      return html`
        <div class="inputNumber">
              <studs-input
                class="inputNumber"
                type="number"
                input-size="small"
                min=${this.min}
                max=${this.max}
                step=${this.step}
                .value=${isRange ? isMax ? this._maxValue : this._minValue : this._minValue}
                @input=${isRange ? isMax ? this.handleMaxValue : this.handleMinValue : this.handleMinValue}
                aria-label=${isRange ? isMax ? `${this.endLabel ? this.endLabel : "Maximum"} Value` : `${this.label ? this.label : "Minimum"} value` : `${this.label ? this.label + ` ` : ``}Value`}
              ></studs-input>
            </div>
      `
    }
  }
  private renderRange() {
    const isRangeStyles = {
      left: `${this._minPercentage}%`,
      width: `${this._maxPercentage - this._minPercentage}%`
    };
    const defaultStyles = {
      width: `${this._minPercentage}%`
    };
    return html`
      <div
        class=${classMap({
          sliderRange: true
        })}
        style=${styleMap(
          this.isRange
            ? isRangeStyles
            : defaultStyles
        )}
      ></div>`;
  }
  private renderMarks() {
    if (this.marks) {
      return map(this.marks, (mark) => {
        const leftMark = `${
          ((mark.value - this.marks[0]?.value) /
            (Math.abs(this.marks[0]?.value) +
              Math.abs(this.marks[this.marks.length - 1]?.value))) *
          100
        }%`;
        return html`
          <span style="left: ${leftMark}" class="sliderMarkValue"></span>
          <span style="left: ${leftMark}" class="sliderMarkLabel"
          >${mark.label}</span
          >
        `;
      });
    }
  }
  private renderTooltip(position: 'left' | 'right') {
    const {_leftThumbRef, _rightThumbRef, _sliderRef} = this;
    const bound = _sliderRef?.value?.getBoundingClientRect();
  
    if (position === 'left') {
      const leftThumb = _leftThumbRef?.value;
      const leftPos = -1 * ((bound?.width || 0) / 2 - ((bound?.width || 0)) * Number(this._minValue || 0) / this.max);
      if (leftThumb)
        return html`
          <studs-tooltip
            .element=${leftThumb}
            position="top"
            class="tooltip"
            .marginLeft=${leftPos}
          >
            ${this.getToolTipValue(this._minValue)}
          </studs-tooltip>`;
    }
    if (position === 'right') {
      const rightThumb = _rightThumbRef?.value;
      const leftPos = -1 * ((bound?.width || 0) / 2 - ((bound?.width || 0)) * Number(this._maxValue || 0) / this.max);
      if (rightThumb)
        return html`
          <studs-tooltip
            .element=${rightThumb}
            position="top"
            class="tooltip"
            .marginLeft=${leftPos}
          >${this.getToolTipValue(this._maxValue)}
          </studs-tooltip
          >`;
    }
  }

  render() {
    return html`
      <div class="slider">
        ${this.renderInput('min')} ${this.renderLabel('left')}
        <div class="sliderWrapper" part="wrapper" ${ref(this._sliderRef)}>
          <div>
            ${this.enableTooltip ? this.renderTooltip('left') : nothing}
            <input
              role="slider"
              aria-label="Minimum value"
              name=${this.name ? this.isRange ? `${this.name}-min` : this.name : nothing}
              type="range"
              class="thumb thumbLeft"
              min=${this.min}
              max=${this.max}
              step=${this.step}
              .value=${this._minValue}
              @input=${this.handleMinValue}
              aria-valuemin=${this.min}
              aria-valuemax=${this.max}
              aria-valuenow=${this._minValue}
              ${ref(this._leftThumbRef)}
            />

            ${this.isRange
              ? html`
                ${this.enableTooltip ? this.renderTooltip('right') : nothing}
                <input
                  role="slider"
                  aria-label="Maximum value"
                  name=${this.name ? `${this.name}-max` : nothing}
                  type="range"
                  class="thumb thumbRight"
                  min=${this.min}
                  max=${this.max}
                  step=${this.step}
                  .value=${this._maxValue}
                  @input=${this.handleMaxValue}
                  aria-valuemin=${this.min}
                  aria-valuemax=${this.max}
                  aria-valuenow=${this._maxValue}
                  ${ref(this._rightThumbRef)}
                />
              `
              : nothing}
          </div>
          <div class="sliderTrack">
            ${this.renderMarks()} ${this.renderRange()}
          </div>
        </div>
        ${this.renderLabel('right')} ${this.renderInput('max')}
      </div> `;
  }

  private preventOverlap(changedThumb: string): void {
    if (this.isRange) {
      let [minValue, maxValue] = this.value as number[];
      minValue = Number(minValue);
      maxValue = Number(maxValue);

      if (changedThumb === 'min' && minValue >= maxValue) {
        maxValue = Math.min(maxValue + this.step, this.max);
        this.value = [minValue, maxValue];
      } else if (changedThumb === 'max' && maxValue <= minValue) {
        minValue = Math.max(minValue - this.step, this.min);
        this.value = [minValue, maxValue];
      }
    }
  }

  private handleMinValue(event: Event) {
    const target = (event.target as HTMLInputElement);
    if(this.isRange) {
      const originalValue = [this._minValue, this._maxValue];
      const max: number = originalValue[1]
      const value: number = target.value === '' ? this.min : (Math.min(Number(target.value), originalValue[1] || this.max)) as number;
      this.value = [value, max];
    } else {
      this.value = target.value === '' ? this.min : (Math.min(Number(target.value)));
    }
    this.preventOverlap('min');
    this.dispatch();
  }

  private handleMaxValue(event: Event) {
    const target = (event.target as HTMLInputElement);
    const originalValue = [this._minValue, this._maxValue];
    const min = originalValue[0];
    const value: number = target.value === '' ? this.max : (Math.max(Number(target.value), originalValue[0] || this.min) as number);
    this.value = [min, value];
    this.preventOverlap('max');
    this.dispatch();
  }

  protected reset = () => {
    if(this.isRange) {
      if(this.defaultValue) this.value = this.defaultValue
      else this.value = [this._minValue, this._maxValue];
    } else {
      this.value = this.defaultValue || this.min;
    }
    this.clearFormValue();
    if(this.defaultValue) this.setFormValue(String(this.defaultValue))
    this.requestUpdate();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-slider': StudsSlider;
  }
}