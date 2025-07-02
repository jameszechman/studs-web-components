import style from '@studs/styles/components/radioButton';
import { CSSResult, html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormElement } from '../../mixins/formElement.ts';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { watch } from '../../directives/watch.ts';
import { consume } from '@lit/context';
import { inputGroupContext, InputGroupInterface } from '../../mixins/inputGroupElement.ts';

/**
 * @element studs-radio
 *
 * @slot - The default slot for radio label content
 */
@studsElement('studs-radio')
export class StudsRadio extends FormElement(StudsElement(LitElement)) {
  static styles = style as CSSResult;
  /**
   * The label of the input
   */
  @property({ type: String }) public label?: string;
  /**
   * The value of the input
   */
  @property({ type: String }) public value?: string;
  /**
   * The checked state of the input
   */
  @property({ type: Boolean }) public checked?: boolean = false;

  @consume({ context: inputGroupContext }) private group?: InputGroupInterface;

  @watch('checked')
  handleCheckedChange() {
    /**
     * Ensure Radios don't set their own value when within a Radio Group
     */
    if(!this.group) {
      if(!this.hasUpdated) {
        /**
        * Runs before the first update
        */
        if(this.checked) this.setFormValue(this.value || 'on');
      } else {
        /**
        * Runs after the first update
        */
        if(this.checked) {
          this.setFormValue(this.value || 'on')
        } else this.clearFormValue();
      }
    }
  }

  render() {
    return html`
      <div part="wrapper" class="radioButton">
        <input
          part="input"
          id="${ifDefined(this.inputId)}"
          type="radio"
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          ?disabled="${this.disabled}"
          @input="${this.handleChange}"
        />
        <label part="label" for="${ifDefined(this.inputId)}">
          <slot>${this.label}</slot>
        </label>
      </div>
    `;
  }

  private handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked
    this.dispatch();
  }

  protected reset = () => {
    this.checked = false;
    this.clearFormValue();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-radio': StudsRadio;
  }
}