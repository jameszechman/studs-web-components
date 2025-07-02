import style from '@studs/styles/components/inputs';
import { CSSResult, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IconController } from '../../controllers/iconController';
import { studsElement } from '../../decorators/studs-element';
import { FormElement } from '../../mixins/formElement.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { watch } from '../../directives/watch.ts';

export type Adornment = {
  [value: string]: {
    type?: 'icon' | 'text';
    position?: 'start' | 'end';
  }
}

/**
 * @element studs-input
 */

@studsElement('studs-input')
export class StudsInput extends FormElement(StudsElement(LitElement)) {
  static styles = style as CSSResult;
  /**
   * The value of the input
   */
  @property({ type: String }) value?: string;
  /**
   * The type of the input
   */
  @property({ type: String }) type: 'text' | 'password' | 'number' | 'tel' | 'email' | 'search' | 'date' = 'text';
  /**
   * Sets the input to infinite mode
   */
  @property({ type: Boolean }) infinite: boolean;
  /**
   * The max length of the input
   */
  @property({ type: Number }) maxlength: number;
  /**
   * The min length of the input
   */
  @property({ type: Number }) minlength: number;
  @property({ type: Number }) min: number;
  @property({ type: Number }) max: number;
  /**
   * The size of the input
   */
  @property({ type: String, attribute: 'input-size' })
  inputSize?: 'short' | 'small' | 'medium' | 'large';
  /**
   * The adornments of the input
   */
  @property({ type: Object }) adornments?: Adornment;
  // If the Type is Password, provide the ability to show.
  @state() showPassword = false;
  private iconController = new IconController(this);
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
  private get inputType() {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }
    return this.type;
  }
  private renderAdornments() {
    if (this.adornments) return Object.entries(this.adornments).map(([value, {
      type = 'text',
      position = 'start'
    }]) => {
      return html`
        <div
          class=${classMap({
        adornment: true,
        [`-${position}`]: true,
        '-icon': type === 'icon' || false
      })}
        >
          ${type === 'icon' ? this.iconController.icon(value) : value}
        </div>`;
    });
  }

  render() {
    return html`
      <div
        class=${classMap({
          inputComponent: true
        })}
      >
        <div
          part="wrapper"
          class=${classMap({
            inputWrapper: true,
            [`-${this.type}`]: !!this.type,
            [`-${this.inputSize}`]: !!this.inputSize,
            [`-${this.status}`]: !!this.status,
            [`-required`]: this.required || false
          })}
          ?disabled=${this.disabled}
        >
          ${this.renderAdornments()}
          <input
            part="input"
            class=${classMap({
              input: true
            })}
            type=${this.inputType}
            id=${this.inputId}
            name=${ifDefined(this.name)}
            .value=${ifDefined(this.value)}
            ?required=${this.required}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${this.status === 'error' ? 'true' : 'false'}
            placeholder=${ifDefined(this.placeholder)}
            ?disabled=${this.disabled || this.infinite}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            maxlength=${ifDefined(this.maxlength)}
            minlength=${ifDefined(this.minlength)}
            @input=${this.handleChange}
            @keydown=${this.handleKeyDown}
          />
          ${this.type === 'search'
            ? html`
              <div class="adornment -search">
                <studs-button
                  type="submit"
                  button-type="tertiary"
                  @click=${this.handleSubmit}
                  icon="search"
                  size="small"
                ></studs-button>
              </div>`
            : nothing}
          ${this.type === 'password'
            ? html`
              <div class="adornment -password">
                <studs-button
                  type="button"
                  button-type="tertiary"
                  icon=${this.showPassword ? 'visibility_off' : 'visibility'}
                  @click=${() => {
              this.showPassword = !this.showPassword;
            }}
                  size="small"
                ></studs-button>
              </div>`
            : nothing}
          ${this.infinite
            ? html`
              <div class="adornment -infinite">
                <span>∞</span>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.type === 'search') {
      this.handleSubmit(e);
    }
  }

  private handleSubmit(e: MouseEvent | KeyboardEvent) {
    if ((e as KeyboardEvent)?.key === 'Enter' || e instanceof MouseEvent)
      if (this.form) this.form.requestSubmit();
  }

  private handleChange(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatch();
  }

  protected reset = () => {
    this.value = '';
    this.clearFormValue();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-input': StudsInput;
  }
}