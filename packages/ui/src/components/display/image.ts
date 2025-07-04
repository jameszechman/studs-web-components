import { CSSResult, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import style from '@studs/styles/components/image';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-image
 *
 */
@studsElement('studs-image')
export class StudsImage extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Whether to render a placeholder or not
   */
  @property({ type: Boolean }) placeholder: boolean =
    true;
  /**
   * The image source
   */
  @property({ type: String }) src: string;
  /**
   * The image source for small screens
   */
  @property({ type: String }) small?: string;
  /**
   * The image source for medium screens
   */
  @property({ type: String }) medium?: string;
  /**
   * The image source for large screens
   */
  @property({ type: String }) large?: string;
  /**
   * The alt text for the image
   */
  @property({ type: String }) alt: string;
  /**
   * The caption for the image
   */
  @property({ type: String }) caption: string;

  private get getPlaceholder() {
    if (this.placeholder && !this.src) {
      return html`
        <div class="placeholder">
          <svg
            width="100%"
            height="100%"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="var(--disabled)"
          >
            <path
              d="M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
              stroke="var(--disabled)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 16l7-3 11 5M16 10a2 2 0 110-4 2 2 0 010 4z"
              stroke="var(--disabled)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      `;
    }
  }

  private get renderImages() {
    const isSrcSet = this.small || this.medium || this.large;
    if (isSrcSet) {
      return html`
        ${this.large
          ? html`
            <source srcset=${this.large} media="(min-width: 905px)" /> `
          : nothing}
        ${this.medium
          ? html`
            <source srcset=${this.medium} media="(min-width: 600px)" /> `
          : nothing}
        ${this.small
          ? html`
            <source srcset=${this.small} media="(max-width: 600px)" /> `
          : nothing}
        <img
          src="${this.medium || this.large || this.small}"
          alt=${ifDefined(this.alt)}
        />
      `;
    } else if (this.src) {
      return html`
        <source srcset=${this.src} />
        <img
          src="${this.src}"
          alt=${ifDefined(this.alt) || ifDefined(this.caption)}
        />`;
    } else {
      return this.getPlaceholder;
    }
  }

  render() {
    return html`
      <figure>
        <picture>${this.renderImages}</picture>
        ${this.caption ? html`
          <figcaption>${this.caption}</figcaption>` : nothing}
      </figure>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-image': StudsImage;
  }
}