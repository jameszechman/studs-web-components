import { LitElement } from 'lit';
import { isTabbable, tabbable } from 'tabbable';
import { getDeepActiveElement } from '../utils/shared';

export const focus = (element: HTMLElement | LitElement) => {
  const activeElement = getDeepActiveElement();
  const isEqual = activeElement === element;
  if (element?.shadowRoot) {
    if (element.shadowRoot!.delegatesFocus && !isEqual) {
      return element.focus();
    } else {
      //@ts-ignore
      const delegateTarget = tabbable((element as HTMLElement).shadowRoot)[0] || tabbable(element)[0];
      if (isTabbable(delegateTarget) && delegateTarget !== activeElement) {
        return (delegateTarget as HTMLElement | LitElement).focus();
      } else {
        if (!isEqual) return element.focus();
      }
    }
  } else {
    return element.focus();
  }
};
