import style from '@studs/styles/components/textarea';
import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { studsElement } from '../../decorators/studs-element';
import { FormElement } from '../../mixins/formElement.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { watch } from '../../directives/watch.ts';

/**
 * @element studs-textarea
 */

@studsElement('studs-textarea')
export class StudsTextarea extends FormElement(StudsElement(LitElement)) {
  static styles = style as CSSResult;
  /**
   * The value of the textarea
   */
  @property({ type: String }) value?: string = '';
  /**
   * The amount of rows to display
   */
  @property({ type: Number }) rows: number = 3;
  /**
   * The amount of columns to display
   */
  @property({ type: Number }) cols: number = 40;
  /**
   * Whether to show the character counter
   */
  @property({ type: Boolean, attribute: 'character-counter' })
  characterCounter: boolean = false;
  /**
   * The min length of the textarea
   */
  @property({ type: Number}) minlength?: number;
  /**
   * The max length of the textarea
   */
  @property({ type: Number }) maxlength?: number;
  /**
   * The size of the textarea
   */
  @property({ type: String }) size?: 'small' | 'medium' | 'large';
  /**
   * Whether to make the textarea full width
   */
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: boolean = false;

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
  
  render() {
    const valueLength = typeof this.value === 'string' ? this.value.length : 0;
    let counterClass = '';

    if (typeof this.maxlength === 'number') {
      if (valueLength >= this.maxlength) {
        counterClass = '-error';
      } else if (valueLength >= this.maxlength * 0.8) {
        counterClass = '-warning';
      }
    }

    return html`
      <div
        class=${classMap({
          textareaComponent: true,
          [`-${this.size}`]: !!this.size,
          [`-${this.status}`]: !!this.status,
          [`-required`]: !!this.required
        })}
        ?disabled=${this.disabled}
      >
        <div 
          part="wrapper"
          class=${classMap({
          textareaWrapper: true,
          '-full': this.fullWidth
        })}>
          <textarea
            part="input"
            id=${this.inputId}
            name=${ifDefined(this.name)}
            placeholder=${ifDefined(this.placeholder)}
            rows=${ifDefined(this.rows)}
            cols=${ifDefined(this.cols)}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            ?required=${this.required}
            ?disabled=${this.disabled}
            @input=${this.handleChange}
            .value=${this.value}
            aria-describedby="helper-text"
            aria-required=${this.required ? 'true' : 'false'}
          ></textarea>
          ${this.characterCounter
            ? html`
              <div class="counter ${counterClass}">
                ${valueLength}/${this.maxlength}
              </div>`
            : ''}
        </div>
      </div>
    `;
  }

  private handleChange(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.dispatch();
  }

  protected reset = () => {
    this.value = '';
    this.clearFormValue();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-textarea': StudsTextarea;
  }
}
