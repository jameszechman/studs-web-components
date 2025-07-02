import { consume } from '@lit/context';
import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { formControlContext } from '../components/inputs/form-control';
import { generateUniqueId } from '../utils/shared';
import { Constructor } from '../utils/types';

export declare class FormElementInterface {
  public name?: string;
  public status?: 'error' | 'success' | 'warning';
  public disabled: boolean;
  public placeholder?: string;
  public required?: boolean;
  protected dispatch: () => void;
  protected form?: HTMLFormElement | null;
  protected validity?: ValidityState;
  protected validationMessage?: string;
  protected willValidate?: boolean;
  protected checkValidity?: () => boolean;
  protected reportValidity?: () => boolean;
  protected setFormValue: (value: string | File | FormData ) => void;
  protected clearFormValue: () => void;
  protected inputId?: string;
  protected reset: () => void;
  protected _internals?: ElementInternals;
}

export const FormElement = <T extends Constructor<LitElement>>(superClass: T) => {
  class FormElementClass extends superClass {
    static formAssociated = true;
    static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};
    protected inputId = generateUniqueId(
      this.localName?.split('-')[1]
    );
    /**
     * The name of the input
     */
    @consume({ context: formControlContext }) @property({ type: String }) public name?: FormElementInterface['name'] =
      this.inputId;
    /**
     * The status of the input
     */
    @property({ type: String }) public status?: FormElementInterface['status'];
    /**
     * The placeholder of the input
     */
    @property({ type: String }) public placeholder?: FormElementInterface['placeholder'];
    /**
     * Whether the input is required
     */
    @property({ type: Boolean }) public required?: FormElementInterface['required'];
    /**
     * Whether the input is disabled
     */
    @property({ type: Boolean }) public disabled: FormElementInterface['disabled'] = false;

    @state() _internals?: FormElementInterface['_internals'];

    /**
     * Retrieves the form element the element is associated with.
     */
    protected get form() {
      if (this._internals) return this._internals.form;
    }
    /**
     * Retrieves the validity state of the form element.
     */
    protected get validity() {
      if (this._internals) return this._internals.validity;
    }
    /**
     * Retrieves the validation message of the form element.
     */
    protected get validationMessage() {
      if (this._internals) return this._internals.validationMessage;
    }
    /**
     * Retrieves the willValidate state of the form element.
     */
    protected get willValidate() {
      if (this._internals) return this._internals.willValidate;
    }
    /**
     * Retrieves the checkValidity state of the form element.
     */
    protected checkValidity() {
      if (this._internals) return this._internals.checkValidity();
    }
    /**
     * Retrieves the reportValidity state of the form element.
     */
    protected reportValidity() {
      if (this._internals) return this._internals.reportValidity();
    }
    /**
     * Sets the form value of the form element.
     */
    protected setFormValue(value: string | File | FormData | null, state?: string | File | FormData | null) {
      if (this._internals) return this._internals.setFormValue(value, state);
    }
    /**
     * Clears the form value of the form element.
     */
    protected clearFormValue() {
      if (this._internals) this.setFormValue(null);
    }

    connectedCallback(): void {
      super.connectedCallback();
      if ((this.constructor as any).formAssociated && typeof this.attachInternals === 'function' && !this._internals) this._internals =
        this.attachInternals();
      if (this.form) this.form.addEventListener('reset', this.reset);
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this.form) this.form.removeEventListener('reset', this.reset);
    }

    // Sets form Value & Dispatches custom Change Event.
    protected dispatch() {
      this.dispatchEvent(
        new Event('change')
      );
    }

    // Resets the form value to the initial value.
    protected reset = () => {};

  }

  return FormElementClass as unknown as Constructor<FormElementInterface> & T;
};
