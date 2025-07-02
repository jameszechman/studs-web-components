import { CSSResult, LitElement, ReactiveControllerHost } from 'lit';
import { FocusableElement, tabbable } from 'tabbable';
import { focus } from '../directives/focus';

export const generateUniqueId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export function parseDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns a 0-based month
  const day = date.getDate();

  // Pad the month and day with leading zeros if necessary
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');

  // Combine the year, month, and day into a string in the format 'yyyy-mm-dd'
  const dateString = `${year}-${monthStr}-${dayStr}`;

  return dateString;
}

export const formatTimeBySecond = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const timeString = [hrs, mins, secs]
    .map((v) => (v < 10 ? '0' + v : v))
    .join(':');

  return timeString;
}

/**
 * Floating UI
 * @license MIT
 * https://github.com/floating-ui/floating-ui/blob/master/packages/utils/dom/src/index.ts
 */

export function getNodeName(node: Node | Window): string {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}

export function getWindow(node: any): Window {
  return node?.ownerDocument?.defaultView || window;
}

export function getDocumentElement(node: Node | Window): HTMLElement {
  return (
    (isNode(node) ? node.ownerDocument : node.document) || window.document
  )?.documentElement;
}

export function isNode(value: unknown): value is Node {
  // @ts-ignore
  return value instanceof Node || value instanceof getWindow(value).Node;
}

export function isElement(value: unknown): value is Element {
  // @ts-ignore
  return value instanceof Element || value instanceof getWindow(value).Element;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
  return (
    value instanceof HTMLElement ||
    // @ts-ignore
    value instanceof getWindow(value).HTMLElement
  );
}

export function isShadowRoot(value: unknown): value is ShadowRoot {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  return (
    // @ts-ignore
    value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
  );
}

export function detectClickInsideOutside(element: HTMLElement, callback: (str: string) => void) {
  const root = element.getRootNode() as ShadowRoot;
  const host = root.host as HTMLElement;
  let targetFound: number | undefined;
  let parentFound: number | undefined;
  // Function to handle document click
  const documentClickHandler = (event: Event) => {
    // Reset Target & Parent
    targetFound = undefined;
    parentFound = undefined;
    /**
     * We need to check elements within the ShadowRoot
     * Document will only return a click from the main host element at the top level
     */
    const path = event.composedPath();
    const target = path[0] as HTMLElement;

    for(let i = 0, len = path.length; i < len; i++) {
      if(path[i] instanceof HTMLElement) {
        if(path[i] as HTMLElement === target) {
          targetFound = i;
        }
        if(path[i] as HTMLElement === host) {
          parentFound = i;
        }
        if((typeof targetFound === 'number' && typeof parentFound === 'number') &&  targetFound < parentFound) {
          break;
        }
      }
    }

    if ((typeof targetFound === 'number' && typeof parentFound === 'number') &&  targetFound < parentFound) {
      callback('inside')
    } else {
      callback('outside')
    }
  };

  // Add click event listener to the document
  document.addEventListener('click', documentClickHandler, true);

  // Function to remove click event listener
  const removeListener = () => {
    document.removeEventListener('click', documentClickHandler);
  };

  // Return a function to remove the event listener and stop further detection
  return removeListener;
}

export function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element).getComputedStyle(element);
}

export function getParentNode(node: Node): Node {
  if (getNodeName(node) === 'html') {
    return node;
  }

  const result =
    // Step into the shadow DOM of the parent of a slotted node.
    (node as any).assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    (isShadowRoot(node) && node.host) ||
    // Fallback.
    getDocumentElement(node);

  return isShadowRoot(result) ? result.host : result;
}

interface NavigatorUAData {
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
  platform: string;
}

// Avoid Chrome DevTools blue warning.
export function getPlatform(): string {
  const uaData = (navigator as any).userAgentData as
    | NavigatorUAData
    | undefined;

  if (uaData?.platform) {
    return uaData.platform;
  }

  return navigator.platform;
}

export function getViewportWidth(): number {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}

export function getUserAgent(): string {
  const uaData = (navigator as any).userAgentData as
    | NavigatorUAData
    | undefined;

  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands
      .map(({ brand, version }) => `${brand}/${version}`)
      .join(' ');
  }

  return navigator.userAgent;
}

export const applyStylesToHost = (host: ReactiveControllerHost, style: string) => {
  // Add Icon Styles to the host.
  // This ensures that the styles do not get deuplicated within the component.
  const styles = (host.constructor as typeof LitElement).elementStyles;
  const hasStyles = JSON.stringify(styles).includes(JSON.stringify(style));
  if (!hasStyles) (host.constructor as typeof LitElement).elementStyles = [
    style as unknown as CSSResult,
    ...styles
  ];
};
export const getTableThIndex = (node?: HTMLElement) => {
  if (!node?.parentNode) {
    return 0;
  }
  const ths = Array.from(node.parentNode.childNodes).filter(
    (e) => e.nodeName?.toLowerCase() == 'th'
  );
  return Array.prototype.indexOf.call(ths, node);
};

export function getDeepActiveElement() {
  let activeElement = document.activeElement;
  while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

const typeableItems = ['input', 'select', 'dropdown', 'textarea'].join(', ');
export const isTypeable = (element: HTMLElement) => element.matches(typeableItems);

interface Triggers {
  typing?: boolean;
  startEnd?: boolean;
}

interface ActionFuncs {
  navigating?: (target: HTMLElement) => void;
  triggering?: (target: HTMLElement) => void;
  shiftTabbing?: () => void;
  tabbing?: () => void;
  typing?: (target: HTMLElement) => void;
  startEnd?: (target: HTMLElement) => void;
}

type CompareFunc = (element: FocusableElement, currentIndex: number, focusableElements: FocusableElement[]) => boolean

export const getKeyAction = (shiftKey: boolean, key: string, triggers: Triggers) => {
  if (shiftKey && key === 'Tab') {
    return 'shiftTabbing';
  }
  if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Up' || key === 'Down' || key === 'ArrowLeft' || key === 'ArrowRight') {
    return 'navigating';
  }
  if (key === 'Tab') {
    return 'tabbing';
  }
  if (key === ' ' || key === 'Enter') {
    return 'triggering';
  }
  if (triggers?.startEnd) {
    if (key === 'Home' || key === 'End') {
      return 'navigatingStartEnd';
    }
  }
  if (triggers?.typing) {
    const typingRegex = /^[a-zA-Z0-9]+$/;
    if (typingRegex.test(key) && !shiftKey) {
      return 'typing';
    }
  }
  return 'none';
};

export const findNearestFocusable = (direction: 'next' | 'prev', compareFunc: CompareFunc) => {
  const focusableElements = tabbable(document.body, {
    getShadowRoot: true
  });
  const activeElement = getDeepActiveElement();

  const next = () => {
    const currentIndex = focusableElements.indexOf(activeElement as FocusableElement);
    const nextIndex = focusableElements.findIndex((element, index) => {
      if (index > currentIndex && compareFunc(element, currentIndex, focusableElements)) {
        return true;
      }
    });
    return focusableElements[nextIndex];
  };

  const prev = () => {
    const reversed = focusableElements.slice().reverse();
    const currentIndex = reversed.indexOf(activeElement as FocusableElement);
    const prevIndex = reversed.findIndex((element, index) => {
      if (index > currentIndex && compareFunc(element, currentIndex, reversed)) {
        return true;
      }
    });
    return reversed[prevIndex];
  };

  return (direction === 'next') ? next() : prev();
};

/**
 * Handles keyboard events and triggers corresponding actions.
 * @param event - The keyboard event to handle.
 * @param actionFuncs - An object containing functions to be called when a specific action is triggered.
 * @param options - An optional object containing additional options for the function.
 * @param options.triggers - An object containing key triggers for specific actions.
 * @param options.items - An array of focusable elements to navigate through.
 * @param options.axis - An object containing arrays of keys to navigate through the items in a specific axis.
 * @param options.compareFunc - A function to compare focusable elements when navigating.
 */
export const onKeyDown = (
  event: KeyboardEvent,
  actionFuncs: ActionFuncs,
  options?: {
    triggers?: Triggers,
    items?: FocusableElement[] | HTMLElement[] | Element[],
    axis?: {
      next: string[] // ArrowDown, ArrowRight,
      prev: string[] // ArrowUp, ArrowLeft,
    }
    compareFunc?: CompareFunc
  }) => {
  const { key, shiftKey } = event;
  const action = getKeyAction(shiftKey, key, options?.triggers || {});
  const target = event.target as HTMLElement;

  switch (action) {
    case 'navigating':
      event.preventDefault();
      // need to prevent if target is not navigating element)
      if (!actionFuncs.navigating && (options?.items && options.items.some((option) => option === target))) {
        const {
          axis = {
            next: ['ArrowRight', 'Right', 'ArrowDown', 'Down'],
            prev: ['ArrowLeft', 'Left', 'ArrowUp', 'Up']
          },
          items
        } = options || {};
        if (items) {
          const index = items.indexOf(target as HTMLElement);
          const focusNextIndex = (index: number) => {
            const nextIndex = axis.next.includes(event.key) ? index + 1 : axis.prev.includes(event.key) ? index - 1 : index;
            const next = items[nextIndex];
            if (next && !next.hasAttribute('disabled')) {
              focus(next as HTMLElement);
            } else if (index <= items.length - 1 && index >= 0) {
              axis.next.includes(event.key) ? index += 1 : axis.prev.includes(event.key) ? index -= 1 : index;
              focusNextIndex(index);
            }
          };
          focusNextIndex(index);
        }
      } else if (actionFuncs.navigating) actionFuncs.navigating(target);
      break;
    case 'triggering':
      if (actionFuncs.triggering) {
        actionFuncs.triggering(target);
      }

      break;
    case 'shiftTabbing':
      event.preventDefault();
      if (!actionFuncs.shiftTabbing) {
        const prevFocusable = findNearestFocusable('prev', options?.compareFunc || (() => true));
        if (prevFocusable) {
          focus(prevFocusable as HTMLElement);
        }
      } else {
        actionFuncs.shiftTabbing();
      }
      break;
    case 'tabbing':
      event.preventDefault();
      if (!actionFuncs.tabbing) {
        const nextFocusable = findNearestFocusable('next', options?.compareFunc || (() => true));
        if (nextFocusable) {
          focus(nextFocusable as HTMLElement);
        }
      } else {
        actionFuncs.tabbing();
      }
      break;
    case 'typing':
      if (actionFuncs.typing) {
        actionFuncs.typing(target);
      }
      break;
    case 'navigatingStartEnd':
      if (options?.triggers?.startEnd) {
        if (!actionFuncs.startEnd && options?.items) {
          event.preventDefault();
          const itemsNotDisabled = options?.items?.filter((item) => !item.hasAttribute('disabled'));
          const first = itemsNotDisabled?.[0];
          const last = itemsNotDisabled?.[itemsNotDisabled?.length - 1];
          const index = itemsNotDisabled?.indexOf(target as HTMLElement);
          index === 0 ? focus(last as HTMLElement) : focus(first as HTMLElement);
        } else if (actionFuncs.startEnd) actionFuncs.startEnd(target);
      }
      break;
    case 'none':
      break;
  }
};

export function areObjectsEqual(obj1: any, obj2: any): boolean {
  // Base case for Date objects or functions
  if (obj1 instanceof Date || obj2 instanceof Date || typeof obj1 === 'function' || typeof obj2 === 'function') {
    return obj1.toString() === obj2.toString();
  }

  // Base case for non-object types or null
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  // Check if both objects are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!areObjectsEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  // Check if both objects have the same number of properties
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all properties and values are equal
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) {
      return false;
    }
    if (!areObjectsEqual(obj1[keys1[i]], obj2[keys2[i]])) {
      return false;
    }
  }

  return true;
}

export function getRootTransition(size: 'small' | 'medium' | 'large') {
  const sizes = {
    small: 'transition-s',
    medium: 'transition-m',
    large: 'transition-l'
  }
  const style = getComputedStyle(document.documentElement);
  const property = style.getPropertyValue(`--${sizes[size]}`).trim();
  // convert to ms
  return parseFloat(property) * 1000;
}

export function validateCssUnitValue(value: string) {
  if(String(value) === '0') return true;
  //  valid CSS unit types
  const CssUnitTypes = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin',
  'vmax', '%', 'cm', 'mm', 'in', 'px', 'pt', 'pc'];
  const regexps = CssUnitTypes.map((unit) => {
    return new RegExp(`^[0-9]+${unit}$|^[0-9]+\\.[0-9]+${unit}$`, 'i');
  });
  const isValid = regexps.find((regexp) => regexp.test(value)) !== undefined;
  return isValid;
}