import { expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsImage } from '../../src/components/display/image';

const src =
  'https://ssttoolbox.widen.net/content/whccz2ba5x/jpeg/homepage-hero-at3g.jpeg';

describe('StudsImage', async () => {
  it('should render', async () => {
    const el = await fixture<StudsImage>(html` <studs-image></studs-image> `);
    expect(el).to.be.instanceOf(StudsImage);
  });

  it('should render with src', async () => {
    const el = await fixture<StudsImage>(html`
      <studs-image src="${src}"></studs-image>
    `);
    expect(el).to.be.instanceOf(StudsImage);
    expect(el.getAttribute('src')).to.be.eq(src);
    expect(el?.shadowRoot?.querySelector('img')?.getAttribute('src')).to.be.eq(
      src
    );
  });

  it('should render with alt', async () => {
    const el = await fixture<StudsImage>(html`
      <studs-image src="${src}" alt="This is a alt text."></studs-image>
    `);
    expect(el).to.be.instanceOf(StudsImage);
    expect(el.getAttribute('alt')).to.be.eq('This is a alt text.');
    expect(el?.shadowRoot?.querySelector('img')?.getAttribute('alt')).to.be.eq(
      'This is a alt text.'
    );
  });

  it('should render with caption', async () => {
    const el = await fixture<StudsImage>(html`
      <studs-image src="${src}" caption="This is a caption."></studs-image>
    `);
    expect(el).to.be.instanceOf(StudsImage);
    expect(el.getAttribute('caption')).to.be.eq('This is a caption.');
    expect(
      el?.shadowRoot?.querySelector('figcaption')?.textContent?.trim()
    ).to.be.eq('This is a caption.');
  });

  it('should render with placeholder', async () => {
    const el = await fixture<StudsImage>(html` <studs-image></studs-image> `);
    expect(el).to.be.instanceOf(StudsImage);
    expect(el?.shadowRoot?.querySelector('.placeholder')).to.be.exist;
  });

  it('should render with srcset', async () => {
    const el = await fixture<StudsImage>(
      html`
        <studs-image
          small="https://ssttoolbox.widen.net/content/ck8bcx0mzm/png/homepage-agpd-feature.png?crop=false&amp;position=c&amp;color=ffffffff&amp;w=900&amp;h=675"
          medium="https://ssttoolbox.widen.net/content/whccz2ba5x/jpeg/homepage-hero-at3g.jpeg?keep=c&amp;crop=yes&amp;color=ffffff00&amp;quality=80&amp;w=900&amp;h=675"
          large="https://ssttoolbox.widen.net/content/whccz2ba5x/jpeg/homepage-hero-at3g.jpeg"
        ></studs-image>
      `
    );
    expect(el).to.be.instanceOf(StudsImage);
    expect(el?.shadowRoot?.querySelector('img'))?.to.be.exist;
  });
});
