import { Constructor } from '../utils/types.ts';
import { LitElement } from 'lit';

export interface StudsElementInterface {

}

export const StudsElement = <T extends Constructor<LitElement>>(superClass: T) => {
  // @ts-ignore
  class StudsElementClass extends superClass {
    // constructor() {
    //   super();
    //   setContext('component', {
    //     name: (this as LitElement).localName
    //   });
    // }
  }

  return StudsElementClass as unknown as Constructor<StudsElementInterface> & T;
};