import { LitElement, html } from 'lit';
import { InputGroup } from '../../mixins/inputGroupElement.ts';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { classMap } from 'lit/directives/class-map.js';
import { StudsCheckbox } from './checkbox.ts';

/**
 * @element studs-checkbox-group
 *
 * @slot - The default slot for the CheckboxGroup's content
 */
@studsElement('studs-checkbox-group')
export class StudsCheckboxGroup extends InputGroup(StudsElement(LitElement)) {
  protected static formAssociated = false;

  render() {
    return html`<div
      class=${classMap({
        [`-${this.direction}`]: true
      })}
      role='group'
    >
      <slot @slotchange=${this.initializeGroup}></slot>
    </div>`;
  }

  private initializeGroup(e: Event) {
    const inputs = (e.target as HTMLSlotElement)?.assignedElements() as StudsCheckbox[];
    inputs.forEach((input, index) => {
      const isChecked = input.checked;
      const isIndeterminate = input.indeterminate;
      if (isIndeterminate) {
        input.setAttribute('aria-checked', 'mixed');
      }
      /**
       * Setup Input NAMES
       */
      if (!input.hasAttribute('name')) {
        input.setAttribute('name', `${this.name}-${index}`);
      } 
      input.setAttribute('role', 'checkbox');
      input.setAttribute('aria-checked', String(isChecked));
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-checkbox-group': StudsCheckboxGroup;
  }
}