import style from '@studs/styles/components/switch';
import { CSSResult, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { studsElement } from '../../decorators/studs-element';
import { FormElement } from '../../mixins/formElement.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { watch } from '../../directives/watch.ts';

/**
 * @element studs-switch
 *
 * @slot - The default slot for switch label content
 */
@studsElement('studs-switch')
export class StudsSwitch extends FormElement(StudsElement(LitElement)) {
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
  /**
   * The label position of the switch
   */
  @property({ type: String, attribute: 'label-position' }) labelPosition: 'start' | 'end' | 'top' | 'bottom' = 'end';
  /**
   * The size of the switch
   */
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  /**
   * Whether to show the value of the switch
   */
  @property({ type: Boolean, attribute: 'show-value' }) showValue: boolean = false;
  /**
   * The alignment of the switch on an x-axis
   */
  @property({ type: String }) align: 'start' | 'center' | 'end' = 'start';

  @watch('checked')
  handleCheckedChange() {
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

  render() {
    return html`
      <div part="wrapper" class="switch -${this.labelPosition} -${this.size} -align-${this.align}">
        <input
          part="input"
          role="switch"
          aria-checked=${this.checked ? 'true' : 'false'}
          type="checkbox"
          id="${this.inputId}"
          name=${ifDefined(this.name)}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @input=${this.handleChange}
        />

        <label part="label" for="${this.inputId}">
          <div class="wrapper">
            <span class="slider"></span>
            ${this.showValue && this.value ? html`<span class='value'>${this.value}</span>` : nothing}
          </div>
          ${this.label}
        </label>
      </div>
    `;
  }

  private handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.dispatch();
  }

  protected reset = () => {
    this.checked = false;
    this.clearFormValue();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-switch': StudsSwitch;
  }
}