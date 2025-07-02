import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsCarousel } from '../../src/components/display/carousel';

const slides = [
  {
    id: '1',
    image: 'https://picsum.photos/id/1/300',
    alt: 'image 1',
  },
  {
    id: '2',
    image: 'https://picsum.photos/id/10/300',
    alt: 'image 2',
  },
  {
    id: '3',

    image: 'https://picsum.photos/id/268/300',
    alt: 'image 3',
  },
  {
    id: '4',

    image: 'https://picsum.photos/id/25/300',
    alt: 'image 4',
  },
  {
    id: '5',

    image: 'https://picsum.photos/id/37/300',
    alt: 'image 5',
  },
  {
    id: '6',

    image: 'https://picsum.photos/id/56/300',
    alt: 'image 6',
  },
  {
    id: '7',

    image: 'https://picsum.photos/id/112/300',
    alt: 'image 7',
  },
  {
    id: '8',

    image: 'https://picsum.photos/id/145/300',
    alt: 'image 8',
  },
  {
    id: '9',

    image: 'https://picsum.photos/id/237/300',

    alt: 'image 9',
  },
];

describe('StudsCarousel', async () => {
  it('should render', async () => {
    const el = await fixture<StudsCarousel>(
      html`
        <studs-carousel
          slides="${JSON.stringify(slides)}"
          perPage="3"
        ></studs-carousel>
      `
    );
    expect(el).to.be.instanceOf(StudsCarousel);
    expect(el?.shadowRoot?.querySelectorAll('.slide')?.length).to.be.eq(9);
    expect(el?.shadowRoot?.querySelector('.carouselPrevBtn studs-button')).to.be
      .exist;
    expect(el?.shadowRoot?.querySelector('.carouselNextBtn studs-button')).to.be
      .exist;
  });

  it('should change active slide', async () => {
    const el = await fixture<StudsCarousel>(
      html`
        <studs-carousel
          slides="${JSON.stringify(slides)}"
          perPage="3"
        ></studs-carousel>
      `
    );
    expect(el).to.be.instanceOf(StudsCarousel);
    const slideEls = el?.shadowRoot?.querySelectorAll('.slide');
    slideEls?.forEach(async (element: any) => {
      if (element.id === 2) {
        const activeSlideEl = element;
        activeSlideEl?.click();
        await elementUpdated(el);
        expect(activeSlideEl).to.have.style('order', '0');
      }
    });
  });
});
