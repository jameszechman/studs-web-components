import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsCard } from '../../src/components/display/card';

describe('StudsCard', async () => {
  it('should render', async () => {
    const el = await fixture<StudsCard>(html`
      <studs-card type="vertical" placement="top">
        <img
          slot="media"
          alt="placeholder image"
          src="https://via.placeholder.com/200x200"
        />
        <header slot="title">
          <h2>Title</h2>
          This is additional title content
        </header>

        <div slot="content">
          This is my custom body content. Lorem ipsum dolor sit amet nullam
          dolore vel velit facilisi aliqua mattis.
        </div>

        <div slot="footer">
          <studs-button>Button</studs-button>
          <studs-button button-type="secondary">Button</studs-button>
        </div>
      </studs-card>
    `);
    expect(el).to.be.instanceOf(StudsCard);
    const imgEl = el?.querySelector('img');
    expect(imgEl?.src).to.be.eq('https://via.placeholder.com/200x200');
    expect(imgEl?.getAttribute('alt')).to.be.eq('placeholder image');

    const headerEl = el?.querySelector('header[slot="title"] h2');
    expect(headerEl?.textContent?.trim()).to.be.eq('Title');
  });

  it('should render with slot', async () => {
    const el = await fixture<StudsCard>(html`
      <studs-card type="vertical" placement="top">
        <img
          slot="media"
          alt="placeholder image"
          src="https://via.placeholder.com/200x200"
        />
        <header slot="title">
          <h2>Title</h2>
          This is additional title content
        </header>

        <div slot="content">
          This is my custom body content. Lorem ipsum dolor sit amet nullam
          dolore vel velit facilisi aliqua mattis.
        </div>

        <div slot="footer">
          <studs-button>Button</studs-button>
          <studs-button button-type="secondary">Button</studs-button>
        </div>
      </studs-card>
    `);
    expect(el).to.be.instanceOf(StudsCard);

    const titleEl = el?.shadowRoot?.querySelector('article slot[name="title"]');
    expect(titleEl).to.be.exist;

    const contentEl = el?.shadowRoot?.querySelector(
      'article slot[name="content"]'
    );
    expect(contentEl).to.be.exist;

    const footerEl = el?.shadowRoot?.querySelector(
      'article slot[name="footer"]'
    );
    expect(footerEl).to.be.exist;
  });

  it('should render with types', async () => {
    const types = ['horizontal', 'vertical', 'compact'];
    const el = await fixture<StudsCard>(html`
      <studs-card>
        <img
          slot="media"
          alt="placeholder image"
          src="https://via.placeholder.com/200x200"
        />
        <header slot="title">
          <h2>Title</h2>
          This is additional title content
        </header>

        <div slot="content">
          This is my custom body content. Lorem ipsum dolor sit amet nullam
          dolore vel velit facilisi aliqua mattis.
        </div>

        <div slot="footer">
          <studs-button>Button</studs-button>
          <studs-button button-type="secondary">Button</studs-button>
        </div>
      </studs-card>
    `);
    expect(el).to.be.instanceOf(StudsCard);

    types.forEach(async (t) => {
      await aTimeout(0);
      el.setAttribute('type', t);
      await elementUpdated(el);
      const article = el?.shadowRoot?.querySelector('article');
      expect(article?.classList.contains(`-${t}`)).be.true;
    });
  });

  it('should render with placements', async () => {
    const placements = ['left', 'right', 'top', 'middle', 'none'];
    const el = await fixture<StudsCard>(html`
      <studs-card>
        <img
          slot="media"
          alt="placeholder image"
          src="https://via.placeholder.com/200x200"
        />
        <header slot="title">
          <h2>Title</h2>
          This is additional title content
        </header>

        <div slot="content">
          This is my custom body content. Lorem ipsum dolor sit amet nullam
          dolore vel velit facilisi aliqua mattis.
        </div>

        <div slot="footer">
          <studs-button>Button</studs-button>
          <studs-button button-type="secondary">Button</studs-button>
        </div>
      </studs-card>
    `);
    expect(el).to.be.instanceOf(StudsCard);

    placements.forEach(async (p) => {
      await aTimeout(0);
      el.setAttribute('placement', p);
      await elementUpdated(el);
      const article = el?.shadowRoot?.querySelector('article');
      expect(article?.classList.contains(`-${p}`)).be.true;
    });
  });

  it('should render without media', async () => {
    const el = await fixture<StudsCard>(html`
      <studs-card type="compact" placement="none">
        <img
          slot="media"
          alt="placeholder image"
          src="https://via.placeholder.com/200x200"
        />
        <header slot="title">
          <h2>Title</h2>
          This is additional title content
        </header>

        <div slot="content">
          This is my custom body content. Lorem ipsum dolor sit amet nullam
          dolore vel velit facilisi aliqua mattis.
        </div>

        <div slot="footer">
          <studs-button>Button</studs-button>
          <studs-button button-type="secondary">Button</studs-button>
        </div>
      </studs-card>
    `);
    expect(el).to.be.instanceOf(StudsCard);

    const mediaSlot = el?.shadowRoot?.querySelector(
      'article slot[name="media"]'
    );
    expect(mediaSlot).be.not.exist;
  });
});
