import style from '@studs/styles/components/checkbox';
import { CSSResult, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormElement } from '../../mixins/formElement.ts';
import { live } from 'lit/directives/live.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { watch } from '../../directives/watch.ts';

/**
 * @element studs-checkbox
 *
 */
@studsElement('studs-checkbox')
export class StudsCheckbox extends FormElement(StudsElement(LitElement)) {
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
   * Whether the checkbox is indeterminate or not
   */
  @property({ type: Boolean }) indeterminate?: boolean;
  @query('input') protected input!: HTMLInputElement;

  @watch('indeterminate')
  handleIndeterminateChange() {
    this.updateComplete.then(() => {
      if (this.input) {
        this.input.indeterminate = this.indeterminate || false;
      }
    });
  }

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
      <div
        part="wrapper"
        class="${classMap({
          checkbox: true
        })}"
      >
        <input
          part="input"
          id=${this.inputId}
          type="checkbox"
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          @input=${this.handleChange}
          aria-checked=${this.indeterminate ? 'mixed' : (this.checked ? 'true' : 'false')}
        />
        <label part="label" for="${ifDefined(this.inputId)}"
        >${this.label}</label
        >
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
    'studs-checkbox': StudsCheckbox;
  }
}