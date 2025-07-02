import { LitElement, html } from 'lit';
import { InputGroup } from '../../mixins/inputGroupElement.ts';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { classMap } from 'lit/directives/class-map.js';
import { StudsRadio } from './radio.ts';
import { watch } from '../../directives/watch.ts';
import { onKeyDown } from '../../utils/shared.ts';
import { focus } from '../../directives/focus.ts';

/**
 * @element studs-radio-group
 *
 * @slot - The default slot for the RadioGroup's content
 */
@studsElement('studs-radio-group')
export class StudsRadioGroup extends InputGroup(StudsElement(LitElement)) {

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
        this.setFormValue(this.value);
        this.resetCheckedInputs();
      } else this.clearFormValue();
    }
  }

  render() {
    return html`<div
      class=${classMap({
        [`-${this.direction}`]: true
      })}
      @keydown=${this.handleKeyDown}
      @input=${this.handleChange}
      role='radiogroup'
    >
      <slot @slotchange=${this.initializeRadioGroup}></slot>
    </div>`;
  }

  private setFocusable = (element: StudsRadio) => {
    if (element) {
      const inputsNotNext = Array.from(this.inputs).filter((input) => input !== element);
      if (inputsNotNext) {
        inputsNotNext.forEach((input) => {
          if (input?.getAttribute('tabindex') !== '-1') input?.setAttribute('tabindex', '-1');
        });
      }
      if (element?.getAttribute('tabindex') !== '0') element?.setAttribute('tabindex', '0');
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => onKeyDown(event, {
    navigating: (target: HTMLElement) => {
      const inputs = Array.from(this.inputs);
      const index = inputs.indexOf(target as StudsRadio);
      const nextIndex = event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'Up' || event.key === 'Left' ? index - 1 : index + 1;
      const next = inputs[nextIndex] as StudsRadio;
      if (next) {
        this.setFocusable(next);
        focus(next as HTMLElement);
        next.checked = true;
        this.handleChange(event, next);
      }
    },
    triggering: () => {
      event.preventDefault();
      this.handleChange(event);
    }
  }, {
    compareFunc: (element) => {
        const isInGroup = element.getAttribute('name') === this.name;
        const isRadio = element.getAttribute('type') === 'radio';
        if (isInGroup) return !isRadio;
        return true;
    }
  });

  private async resetCheckedInputs() {
    await this.updateComplete;
    this.inputs.forEach((input) => {
      if(input.checked && input.value !== this.value) input.checked = false;
    });
  }

  private handleChange(e: Event, radio?: StudsRadio) {
    const target = radio || e.target as StudsRadio;
    if(target.checked) this.value = target.value;
    this.dispatch();
  }

  private initializeRadioGroup(e: Event) { 
    const inputs = (e.target as HTMLSlotElement).assignedElements() as StudsRadio[];
    inputs?.forEach((input) => {
      const isChecked = this.value === input.value || input.checked;
      input.setAttribute('role', 'radio');
      input.setAttribute('aria-checked', String(isChecked));
      if (!input.hasAttribute('name')) input.setAttribute('name', String(this.name));
      if(isChecked) {
        input.setAttribute('tabindex', '0');
        input.checked = true;
      }
      else if (this.value) {
        input.setAttribute('tabindex', '-1');
      }
    })
  }

  protected reset = () => {
    this.value = undefined;
    this.clearFormValue();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-radio-group': StudsRadioGroup;
  }
}