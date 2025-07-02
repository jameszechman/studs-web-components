import { CSSResult, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { map } from 'lit/directives/map.js';
import style from '@studs/styles/components/carousel';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

export interface CarouselProps {
  nextIcon: string;
  prevIcon: string;
  perPage: number;
  initialSlide: number;
  slides: any[];
}

/**
 * @element studs-carousel
 *
 */

@studsElement('studs-carousel')
export class StudsCarousel extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * Sets a custom icon for the next icon
   */
  @property({ type: String }) nextIcon: CarouselProps['nextIcon'] =
    'arrow_forward';
  /**
   * Sets a custom icon for the previous icon
   */
  @property({ type: String }) prevIcon: CarouselProps['prevIcon'] =
    'arrow_back';
  /**
   * Sets the number of slides to display per page
   */
  @property({ type: Number }) perPage: CarouselProps['perPage'] = 3;
  /**
   * Sets the initial slide to display
   */
  @property({ type: Number }) initialSlide: CarouselProps['initialSlide'] = 0;
  /**
   * Sets the slides to display
   */
  @property({ type: Array }) slides: CarouselProps['slides'] = [];
  @state() _currentSlide: number = this.initialSlide;
  @state() _direction: string = '';
  @state() _shouldMove: boolean = false;

  render() {
    const slideItems = this.slides;
    const classes = {
      carousel: true
    };

    return html`
      <div class=${classMap(classes)}>
        <div class="carouselPrevBtn">
          <studs-button
            buttonType="primary"
            icon=${this.prevIcon}
            btnClasses="prevBtn"
            @click=${() => this.setCurrentSlide(this._currentSlide - 1)}
          ></studs-button>
        </div>
        ${this.renderContainer(slideItems)}
        <div class="carouselNextBtn">
          <studs-button
            buttonType="primary"
            icon=${this.nextIcon}
            btnClasses="nextBtn"
            @click=${() => this.setCurrentSlide(this._currentSlide + 1)}
          ></studs-button>
        </div>
      </div>
    `;
  }

  /**
   * Render Slides
   * @param slides
   * @returns
   */
  protected renderContainer(slides: any) {
    if (slides.length > 0) {
      return html`
        <style>
          .slide {
            flex: 0 0 calc(100% / ${this.perPage});
          }
        </style>
        <div class="slideContainer">
          ${map(slides, (item: any, index: number) => {
            const currentItem = index === this._currentSlide;
            const classes = {
              slide: true,
              '-active': currentItem,
              '-side': !currentItem
            };

            const order = this.calculateOrder(
              index,
              this._currentSlide,
              slides.length
            );

            return html`
              <div
                class=${classMap(classes)}
                id=${item.id || `slide-${index}`}
                @click=${() => this.setCurrentSlide(index)}
                style=${styleMap({
                  order: order
                })}
              >
                <img
                  src=${item.image}
                  alt=${item.alt || 'image'}
                  class="image"
                />
              </div>
            `;
          })}
        </div>`;
    }
  }

  /**
   * Functions
   */
  private setCurrentSlide(index: number) {
    this._shouldMove = true;
    if (index < this._currentSlide) this._direction = 'prev';
    if (index > this._currentSlide) this._direction = 'next';
    if (index !== this._currentSlide) this._currentSlide = index;
    if (index === this.slides.length) this._currentSlide = 0;
  }

  private calculateOrder(
    index: number,
    currentActiveIndex: number,
    totalItems: number
  ) {
    const order = index - currentActiveIndex;
    if (order < 0) return totalItems;
    return order;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-carousel': StudsCarousel;
  }
}