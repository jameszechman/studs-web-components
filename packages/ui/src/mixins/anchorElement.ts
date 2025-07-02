import { Constructor } from '../utils/types.ts';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export interface AnchorElementInterface {
  href?: HTMLAnchorElement["href"];
  target?: HTMLAnchorElement["target"];
  download?: HTMLAnchorElement["download"];
  hreflang?: HTMLAnchorElement["hreflang"];
  ping?: HTMLAnchorElement["ping"];
  referrerpolicy?: HTMLAnchorElement["referrerPolicy"];
  rel?: HTMLAnchorElement["rel"];
}

/**
 * A mixin to add anchor element properties to a component
 * @param superClass
 * @constructor
 */
export const AnchorElement = <T extends Constructor<LitElement>>(superClass: T) => {
  // @ts-ignore
  class AnchorElementClass extends superClass {
    /**
     * The URL that the hyperlink points to.
     */
    @property({type: String}) href?: HTMLAnchorElement["href"];
    /**
     * Where to display the linked URL
     */
    @property({type: String}) target?: HTMLAnchorElement["target"];
    /**
     * Causes the browser to treat the linked URL as a download. Can be used with or without a filename value:
     */
    @property({type: Boolean}) download?: HTMLAnchorElement["download"];
    /**
     * Hints at the human language of the linked URL
     */
    @property({type: String}) hreflang?: HTMLAnchorElement["hreflang"];
    /**
     * A space-separated list of URLs. When the link is followed, the browser will send POST requests with the body PING to the URLs. Typically for tracking.
     */
    @property({type: String}) ping?: HTMLAnchorElement["ping"];
    /**
     * How much of the referrer to send when following the link.
     */
    @property({type: String}) referrerpolicy?: HTMLAnchorElement["referrerPolicy"];
    /**
     * The relationship of the linked URL as space-separated link types.
     */
    @property({type: String}) rel?: HTMLAnchorElement["rel"];
  }

  return AnchorElementClass as unknown as Constructor<AnchorElementInterface> & T;
};