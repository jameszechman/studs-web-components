import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsTabs } from '../../src/components/display/tabs';

describe('StudsTabs', async () => {
  it('should render', async () => {
    const el = await fixture<StudsTabs>(html`
      <studs-tabs direction="horizontal">
        <button slot="tab">Tab 1</button>
        <section slot="panel">
          <strong>Content for tab 1</strong>
          <p>Lorem ipsum dolor</p>
        </section>

        <button slot="tab">Tab 2</button>
        <section slot="panel">
          <strong>Content for tab 2</strong>
          <p>Lorem ipsum dolor</p>
          <p>Tempus egestas volutpat</p>
        </section>

        <button slot="tab">Tab 3</button>
        <section slot="panel">
          <strong>Content for tab 3</strong>
          <p>Lorem ipsum</p>
          <p>Elementum pharetra</p>
          <p>Blandit dolore condimentum</p>
        </section>
      </studs-tabs>
    `);
    expect(el).to.be.instanceOf(StudsTabs);
  });

  it('should render with horizontal direction', async () => {
    const el = await fixture<StudsTabs>(html`
      <studs-tabs direction="horizontal">
        <button slot="tab">Tab 1</button>
        <section slot="panel">
          <strong>Content for tab 1</strong>
          <p>Lorem ipsum dolor</p>
        </section>

        <button slot="tab">Tab 2</button>
        <section slot="panel">
          <strong>Content for tab 2</strong>
          <p>Lorem ipsum dolor</p>
          <p>Tempus egestas volutpat</p>
        </section>

        <button slot="tab">Tab 3</button>
        <section slot="panel">
          <strong>Content for tab 3</strong>
          <p>Lorem ipsum</p>
          <p>Elementum pharetra</p>
          <p>Blandit dolore condimentum</p>
        </section>
      </studs-tabs>
    `);
    expect(el).to.be.instanceOf(StudsTabs);
    expect(el?.getAttribute('direction')).to.be.eq('horizontal');
    const horizontalWrapperEl = el?.shadowRoot?.querySelector(
      'div.tabsComponent.-horizontal'
    );
    expect(horizontalWrapperEl).to.be.exist;
  });

  it('should render with vertical direction', async () => {
    const el = await fixture<StudsTabs>(html`
      <studs-tabs direction="vertical">
        <button slot="tab">Tab 1</button>
        <section slot="panel">
          <strong>Content for tab 1</strong>
          <p>Lorem ipsum dolor</p>
        </section>

        <button slot="tab">Tab 2</button>
        <section slot="panel">
          <strong>Content for tab 2</strong>
          <p>Lorem ipsum dolor</p>
          <p>Tempus egestas volutpat</p>
        </section>

        <button slot="tab">Tab 3</button>
        <section slot="panel">
          <strong>Content for tab 3</strong>
          <p>Lorem ipsum</p>
          <p>Elementum pharetra</p>
          <p>Blandit dolore condimentum</p>
        </section>
      </studs-tabs>
    `);
    expect(el).to.be.instanceOf(StudsTabs);
    expect(el?.getAttribute('direction')).to.be.eq('vertical');
    const verticalWrapperEl = el?.shadowRoot?.querySelector(
      'div.tabsComponent.-vertical'
    );
    expect(verticalWrapperEl).to.be.exist;
  });

  it('should render with default selected tab', async () => {
    const el = await fixture<StudsTabs>(html`
      <studs-tabs direction="vertical" selected="1">
        <button slot="tab">Tab 1</button>
        <section slot="panel">
          <strong>Content for tab 1</strong>
          <p>Lorem ipsum dolor</p>
        </section>

        <button slot="tab">Tab 2</button>
        <section slot="panel">
          <strong>Content for tab 2</strong>
          <p>Lorem ipsum dolor</p>
          <p>Tempus egestas volutpat</p>
        </section>

        <button slot="tab">Tab 3</button>
        <section slot="panel">
          <strong>Content for tab 3</strong>
          <p>Lorem ipsum</p>
          <p>Elementum pharetra</p>
          <p>Blandit dolore condimentum</p>
        </section>
      </studs-tabs>
    `);
    expect(el).to.be.instanceOf(StudsTabs);
    await aTimeout(0);
    const tabButtonEl1 = el?.querySelector('button#tab-0');
    const tabButtonEl2 = el?.querySelector('button#tab-1');
    const tabButtonEl3 = el?.querySelector('button#tab-2');
    const panel2El = el?.querySelector('section#panel-1');
    expect(tabButtonEl1?.getAttribute('aria-selected')).to.not.be.eq('true');
    expect(tabButtonEl2?.getAttribute('aria-selected')).to.be.eq('true');
    expect(panel2El?.getAttribute('aria-expanded')).to.be.eq('true');
    expect(tabButtonEl3?.getAttribute('aria-selected')).to.not.be.eq('true');
  });

  it('should render with disabled tabs', async () => {
    const el = await fixture<StudsTabs>(html`
      <studs-tabs direction="vertical" selected="1">
        <button slot="tab">Tab 1</button>
        <section slot="panel">
          <strong>Content for tab 1</strong>
          <p>Lorem ipsum dolor</p>
        </section>

        <button slot="tab">Tab 2</button>
        <section slot="panel">
          <strong>Content for tab 2</strong>
          <p>Lorem ipsum dolor</p>
          <p>Tempus egestas volutpat</p>
        </section>

        <button slot="tab" disabled>Tab 3</button>
        <section slot="panel">
          <strong>Content for tab 3</strong>
          <p>Lorem ipsum</p>
          <p>Elementum pharetra</p>
          <p>Blandit dolore condimentum</p>
        </section>
      </studs-tabs>
    `);
    expect(el).to.be.instanceOf(StudsTabs);
    const tabButtonEl3 = el?.querySelector('button#tab-2');
    expect(tabButtonEl3?.hasAttribute('disabled')).to.be.true;
  });

  it('should run event change', async () => {
    const el = await fixture<StudsTabs>(html`
      <studs-tabs direction="vertical">
        <button slot="tab">Tab 1</button>
        <section slot="panel">
          <strong>Content for tab 1</strong>
          <p>Lorem ipsum dolor</p>
        </section>

        <button slot="tab">Tab 2</button>
        <section slot="panel">
          <strong>Content for tab 2</strong>
          <p>Lorem ipsum dolor</p>
          <p>Tempus egestas volutpat</p>
        </section>

        <button slot="tab">Tab 3</button>
        <section slot="panel">
          <strong>Content for tab 3</strong>
          <p>Lorem ipsum</p>
          <p>Elementum pharetra</p>
          <p>Blandit dolore condimentum</p>
        </section>
      </studs-tabs>
    `);
    expect(el).to.be.instanceOf(StudsTabs);

    const spyOnClick = sinon.spy();
    el.addEventListener('change', spyOnClick);
    el?.setAttribute('selected', '1');
    await aTimeout(0);
    const customEvent = spyOnClick.getCall(0)?.args[0];
    expect(spyOnClick.calledOnce).to.be.true;
    expect(customEvent?.detail?.tabIndex).to.be.eq(1);
  });

  it('should change selected tab', async () => {
    const el = await fixture<StudsTabs>(html`
      <studs-tabs direction="vertical" selected="0">
        <button slot="tab">Tab 1</button>
        <section slot="panel">
          <strong>Content for tab 1</strong>
          <p>Lorem ipsum dolor</p>
        </section>

        <button slot="tab">Tab 2</button>
        <section slot="panel">
          <strong>Content for tab 2</strong>
          <p>Lorem ipsum dolor</p>
          <p>Tempus egestas volutpat</p>
        </section>

        <button slot="tab">Tab 3</button>
        <section slot="panel">
          <strong>Content for tab 3</strong>
          <p>Lorem ipsum</p>
          <p>Elementum pharetra</p>
          <p>Blandit dolore condimentum</p>
        </section>
      </studs-tabs>
    `);
    expect(el).to.be.instanceOf(StudsTabs);
    const panel0El = el?.querySelector('section#panel-0');
    const panel1El = el?.querySelector('section#panel-1');
    expect(panel0El?.getAttribute('aria-expanded')).to.be.equal('true');
    expect(panel1El?.getAttribute('aria-expanded')).to.be.equal('false');

    el?.setAttribute('selected', '1');
    await elementUpdated(el);

    expect(panel0El?.getAttribute('aria-expanded')).to.be.equal('false');
    expect(panel1El?.getAttribute('aria-expanded')).to.be.equal('true');
  });
});
