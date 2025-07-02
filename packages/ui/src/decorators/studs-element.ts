/**
 * Allow for custom element classes with private constructors
 */
type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

const legacyCustomElement = (tagName: string, clazz: CustomElementClass) => {
  customElements.get(tagName) || customElements.define(tagName, clazz as CustomElementConstructor);
  // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return clazz as any;
};

const standardCustomElement = (
  tagName: string,
  descriptor: unknown
) => {
  // @ts-ignore
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    // This callback is called once the class is otherwise fully defined
    finisher(clazz: unknown) {
      customElements.get(tagName) || customElements.define(tagName, clazz as CustomElementConstructor);
    }
  };
};

/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
export const studsElement =
  (tagName: string) =>
    (classOrDescriptor: unknown) =>
      typeof classOrDescriptor === 'function'
        ? legacyCustomElement(tagName, classOrDescriptor)
        : standardCustomElement(tagName, classOrDescriptor as unknown);
