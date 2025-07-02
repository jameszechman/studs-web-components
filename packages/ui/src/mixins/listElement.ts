import { Constructor } from '../utils/types.ts';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export interface ListElementInterface {
  size: 'small' | 'medium' | 'large'
  selected?: number | boolean
  direction?:  'start' | 'end'
  icon?: 'arrow_right' | 'chevron_right'
  disableIndentation?: boolean
}

export const ListElement = <T extends Constructor<LitElement>>(superClass: T) => {
  // @ts-ignore
  class ListElementClass extends superClass {
    /**
     * The size of the list
     */
    @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
    /**
     * The selected index of the list
     */
    @property({ type: Boolean }) selected?: boolean;
    /**
     * Determines the position of the collapse icon if expandable
     */
    @property({type: String}) direction: 'start' | 'end' = 'start';
    /**
     * Determines the arrow to show if expandable
     */
    @property({type: String}) icon: 'arrow_right' | 'chevron_right' = 'arrow_right';
    /**
     * Disable the indentation of the list
     */
    @property({type: Boolean, attribute: 'disable-indentation'}) disableIndentation: boolean = false;
  }

  return ListElementClass as unknown as Constructor<ListElementInterface> & T;
};