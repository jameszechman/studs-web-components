import { createContext, provide } from '@lit/context';
import style from '@studs/styles/components/form-control';
import { CSSResult, LitElement, TemplateResult } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { html, literal } from 'lit/static-html.js';
import { studsElement } from '../../decorators/studs-element';
import { watch } from '../../directives/watch';
import { generateUniqueId } from '../../utils/shared';
import { StudsElement } from '../../mixins/studsElement.ts';

export const formControlContext = createContext<string | undefined>('formControl');

const inputSelectors = [
  'studs-checkbox-group',
  'studs-checkbox',
  'studs-dropdown',
  'studs-input',
  'studs-radio-group',
  'studs-radio',
  'studs-slider',
  'studs-switch',
  'studs-textarea',
  'studs-date-picker'
];

/**
 * @element studs-form-control
 *
 * @slot - The default slot for form control content
 */
@studsElement('studs-form-control')
export class StudsFormControl extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Define html tag of the form control
   */
  @property({ type: String }) public as: 'div' | 'fieldset' = 'div';
  /**
   * Define the name of the form control
   */
  @provide({ context: formControlContext }) @property({ type: String }) public name: string = generateUniqueId('form-control');
  /**
   * Define the display of the form control
   */
  @property({ type: String }) public display: 'inline' | 'block' = 'block';
  /**
   * Define if the form control is required
   */
  @property({ type: Boolean }) public required: boolean = false;
  /**
   * Define if the form control is optional
   */
  @property({ type: Boolean }) public optional: boolean = false;
  /**
   * Define if the form control is invalid
   */
  @property({ type: Boolean }) public invalid: boolean = false;
  /**
   * Define if the form control is disabled
   */
  @property({ type: Boolean }) public disabled: boolean = false;
  /**
   * Define if the form control is success
   */
  @property({ type: Boolean }) public success: boolean = false;
  /**
   * Define if the form control is warning
   */
  @property({ type: Boolean }) public warning: boolean = false;
  private tag = literal`div`;
  @queryAssignedElements({ selector: 'studs-label' }) private labels!: NodeListOf<HTMLElement>;
  @queryAssignedElements({ selector: inputSelectors.join(',') }) private inputs!: NodeListOf<HTMLElement>;
  @queryAssignedElements({ selector: 'studs-helper-text' }) private helperTexts!: NodeListOf<HTMLElement>;
  @queryAssignedElements({ selector: 'studs-error-message' }) private errorMessages!: NodeListOf<HTMLElement>;

  private get hasInputs() {
    return this.inputs.length > 0;
  }

  private get hasLabels() {
    return this.labels.length > 0;
  }

  private get hasHelperTexts() {
    return this.helperTexts.length > 0;
  }

  private get hasErrorMessages() {
    return this.errorMessages.length > 0;
  }

  @watch('as')
  updateTag() {
    const label = this.labels[0];
    switch (this.as) {
      case 'fieldset':
        this.tag = literal`fieldset`;
        if (label) label.setAttribute('as', 'legend');
        break;
      default:
        this.tag = literal`div`;
        if (label) label.setAttribute('as', 'label');
        break;
    }
  }

  @watch('required', { waitUntilFirstUpdate: true })
  updateRequired() {
    const { hasLabels, hasInputs, labels, inputs, required } = this;
    const label = hasLabels ? labels[0] : null;
    when(required, () => {
      if (label) label.setAttribute('required', `${required}`);
      if (hasInputs) {
        inputs.forEach((input) => {
          input.setAttribute('required', `${required}`);
          input.setAttribute('aria-required', `${required}`);
        });
      }
    }, () => {
      if (label && label.hasAttribute('required')) label.removeAttribute('required');
      if (hasInputs) {
        inputs.forEach((input) => {
          if (input.hasAttribute('required')) input.removeAttribute('required');
          if (input.hasAttribute('aria-required')) input.removeAttribute('aria-required');
        });
      }
    });

  }

  @watch('optional', { waitUntilFirstUpdate: true })
  updateOptional() {
    const { hasLabels, optional, labels } = this;
    const label = hasLabels ? labels[0] : null;
    when(optional, () => {
      if (label) label.setAttribute('optional', `${optional}`);
    }, () => {
      if (label && label.hasAttribute('optional')) label.removeAttribute('optional');
    });

  }

  @watch('invalid', { waitUntilFirstUpdate: true })
  updateInvalid() {
    const {
      hasInputs,
      hasHelperTexts,
      hasErrorMessages,
      errorMessages,
      helperTexts,
      inputs,
      invalid,
      getInputID
    } = this;
    when(invalid, () => {
      if (hasInputs) {
        inputs.forEach((input) => {
          const id = getInputID(input);
          input.setAttribute('status', 'error');
          input.setAttribute('aria-invalid', `${invalid}`);
          input.removeAttribute('aria-describedby');
          if (hasErrorMessages) {
            input.setAttribute('aria-errormessage', `${id}-error-message`);
            errorMessages.forEach((errorMessage) => {
              errorMessage.setAttribute('aria-hidden', 'false');
            });
            if (hasHelperTexts) helperTexts.forEach((helperText) => {
              helperText.setAttribute('aria-hidden', 'true');
            });
          }
        });
      }
    }, () => {
      if (hasInputs) {
        inputs.forEach((input) => {
          const id = getInputID(input);
          input.removeAttribute('status');
          input.removeAttribute('aria-invalid');
          if (hasHelperTexts) input.setAttribute('aria-describedby', `${id}-helper-text`);
          if (hasErrorMessages) {
            errorMessages.forEach((errorMessage) => {
              errorMessage.setAttribute('aria-hidden', 'true');
            });
            if (hasHelperTexts) helperTexts.forEach((helperText) => {
              helperText.setAttribute('aria-hidden', 'false');
            });
          }

          if (input.hasAttribute('aria-errormessage')) input.removeAttribute('aria-errormessage');
        });
      }
    });
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  updateDisabled() {
    const { hasInputs, inputs, disabled } = this;
    when(disabled, () => {
      if (hasInputs) {
        inputs.forEach((input) => {
          input.setAttribute('disabled', `${disabled}`);
          input.setAttribute('aria-disabled', `${disabled}`);
        });
      }
    }, () => {
      if (hasInputs) {
        inputs.forEach((input) => {
          input.removeAttribute('disabled');
          input.removeAttribute('aria-disabled');
        });
      }
    });
  }

  @watch('success', { waitUntilFirstUpdate: true })
  updateSuccess() {
    const { hasInputs, hasHelperTexts, helperTexts, inputs, success } = this;
    when(success, () => {
      if (this.invalid) this.invalid = false;
      if (this.warning) this.warning = false;
      if (hasInputs) inputs.forEach((input) => {
        input.setAttribute('status', 'success');
      });
      if (hasHelperTexts) helperTexts.forEach((helperText) => {
        helperText.setAttribute('status', 'success');
      });
    }, () => {
      if (hasInputs) inputs.forEach((input) => {
        input.removeAttribute('status');
      });
      if (hasHelperTexts) helperTexts.forEach((helperText) => {
        helperText.removeAttribute('status');
      });
    });
  }

  @watch('warning', { waitUntilFirstUpdate: true })
  updateWarning() {
    const { hasInputs, hasHelperTexts, helperTexts, inputs, warning } = this;
    when(warning, () => {
      if (this.invalid) this.invalid = false;
      if (this.success) this.success = false;
      if (hasInputs) inputs.forEach((input) => {
        input.setAttribute('status', 'warning');
      });
      if (hasHelperTexts) helperTexts.forEach((helperText) => {
        helperText.setAttribute('status', 'warning');
      });
    }, () => {
      if (hasInputs) inputs.forEach((input) => {
        input.removeAttribute('status');
      });
      if (hasHelperTexts) helperTexts.forEach((helperText) => {
        helperText.removeAttribute('status');
      });
    });
  }

  render(): TemplateResult {
    return html`
      <${this.tag}
        class="${classMap({
          'wrapper': true,
          [`-${this.display}`]: true
        })}"
        role="group"
        ?aria-invalid=${this.invalid}
      >
        <slot @slotchange=${this.initGroup}></slot>
      </${this.tag}>
    `;
  }

  private getInputID = (input: HTMLElement) => {
    const { name } = this;
    return input.getAttribute('id') || input.getAttribute('name') || `${name}-input`;
  };

  private initGroup() {
    const {
      as,
      required,
      optional,
      invalid,
      success,
      warning,
      disabled,
      hasLabels,
      hasInputs,
      hasHelperTexts,
      hasErrorMessages,
      inputs,
      labels,
      helperTexts,
      errorMessages,
      getInputID
    } = this;
    if (hasLabels) {
      const label = labels[0];
      label.setAttribute('as', as === 'fieldset' ? 'legend' : 'label');
    }
    if (hasInputs) inputs.forEach((input) => {
      const label = hasLabels ? labels[0] : null;
      const id = getInputID(input);
      // Init Label
      if (label && !label.hasAttribute('for') && !input.hasAttribute('id')) {
        label.setAttribute('for', id);
        label.setAttribute('id', `${id}-label`);
      }
      if (!input.hasAttribute('aria-labelledby') && label) input.setAttribute('aria-labelledby', `${id}-label`);
      // Init Input
      if (!input.hasAttribute('id')) input.setAttribute('id', id);
      if (!input.hasAttribute('aria-describedby') && helperTexts.length > 0) input.setAttribute('aria-describedby', `${id}-helper-text`);
      // Init HelperText
      if (hasHelperTexts) helperTexts.forEach((helperText) => {
        if (!helperText.hasAttribute('id')) helperText.setAttribute('id', `${id}-helper-text`);
      });
      // Init ErrorMessage
      if (hasErrorMessages) errorMessages.forEach((errorMessage) => {
        if (!errorMessage.hasAttribute('id')) errorMessage.setAttribute('id', `${id}-error-message`);
        if (!errorMessage.hasAttribute('aria-live')) errorMessage.setAttribute('aria-live', 'polite');
      });
    });
    if (required) this.updateRequired();
    if (optional) this.updateOptional();
    if (invalid) this.updateInvalid();
    if (success) this.updateSuccess();
    if (warning) this.updateWarning();
    if (disabled) this.updateDisabled();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-form-control': StudsFormControl;
  }
}