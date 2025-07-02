import { createContext, provide } from '@lit/context';
import style from '@studs/styles/components/input-group';
import { CSSResult, LitElement } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { StudsCheckbox } from '../components/inputs/checkbox';
import { StudsCheckboxGroup } from '../components/inputs/checkbox-group';
import { StudsRadio } from '../components/inputs/radio';
import { StudsRadioGroup } from '../components/inputs/radio-group';
import { watch } from '../directives/watch';
import { Constructor } from '../utils/types';
import { FormElement, FormElementInterface } from './formElement.ts';

export const inputGroupContext = createContext<StudsRadioGroup | StudsCheckboxGroup>('inputGroup');

export declare class InputGroupInterface extends FormElementInterface {
  direction: 'inline' | 'block';
  value?: string;
  checked?: boolean;
  group: StudsRadioGroup | StudsCheckboxGroup;
  inputs: NodeListOf<StudsRadio | StudsCheckbox>;
}

export const InputGroup = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class InputGroupClass extends FormElement(superClass) {
    static styles = style as CSSResult;
    /**
     * The direction of the group
     */
    @property({ type: String }) direction: 'inline' | 'block' = 'block';
    @property({ type: String }) value?: string;
    @property({ type: Boolean }) checked?: boolean = false; 
    @provide({ context: inputGroupContext }) protected group = this;
    @queryAssignedElements() private inputs!: StudsCheckbox[] | StudsRadio[];

    @watch('disabled')
    async onDisabledChange() {
      await this.updateComplete;
      this.inputs.forEach((input) => {
        input.disabled = this.disabled;
      });
    }
  }

  return InputGroupClass as unknown as Constructor<InputGroupInterface> & T;
};
  