import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsList } from '../../src/components/display/list';
import { StudsListItem } from '../../src/components/display/list-item';
import { spy } from 'sinon';

describe('StudsResizer', async () => {
  it('should render successfully', async () => {
    const el = await fixture<StudsList>(html`
      <studs-list>
        <studs-list-item>
          <span slot="prefix">🍎</span>
          <span>Apple</span>
          <span slot="secondary">Best Seller!</span>
          <span slot="suffix">$1.00</span>
          <span slot="action">🛒</span>
        </studs-list-item>
        <studs-list-item>
          <span slot="prefix">🍊</span>
          <span>Orange</span>
          <span slot="suffix">$1.00</span>
          <span slot="action">🛒</span>
        </studs-list-item>
      </studs-list>
    `);
    expect(el).to.be.instanceOf(StudsList);
  });

  it('should render as div/nav', async () => {
    const el = await fixture<StudsList>(html`
      <studs-list>
        <studs-list-item>
          <span slot="prefix">🍎</span>
          <span>Apple</span>
          <span slot="secondary">Best Seller!</span>
          <span slot="suffix">$1.00</span>
          <span slot="action">🛒</span>
        </studs-list-item>
        <studs-list-item>
          <span slot="prefix">🍊</span>
          <span>Orange</span>
          <span slot="suffix">$1.00</span>
          <span slot="action">🛒</span>
        </studs-list-item>
      </studs-list>
    `);
    expect(el).to.be.instanceOf(StudsList);

    el.setAttribute('as', 'nav');
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('nav[role="list"]')).be.exist;

    el.setAttribute('as', 'div');
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('div[role="list"]')).be.exist;
  });

  it('should render with sizes', async () => {
    const sizes = ['small', 'medium', 'large'];
    const el = await fixture<StudsList>(html`
      <studs-list>
        <studs-list-item>
          <span slot="prefix">🍎</span>
          <span>Apple</span>
          <span slot="secondary">Best Seller!</span>
          <span slot="suffix">$1.00</span>
          <span slot="action">🛒</span>
        </studs-list-item>
        <studs-list-item>
          <span slot="prefix">🍊</span>
          <span>Orange</span>
          <span slot="suffix">$1.00</span>
          <span slot="action">🛒</span>
        </studs-list-item>
      </studs-list>
    `);
    expect(el).to.be.instanceOf(StudsList);

    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      await aTimeout(0);
      el.setAttribute('size', size);
      await aTimeout(0);
      expect(el.getAttribute('size')).be.eq(size);
      const listItemEls = el.querySelectorAll('studs-list-item');
      for (let j = 0; j < listItemEls.length; j++) {
        const itemEl = listItemEls[j];
        expect(itemEl).be.instanceOf(StudsListItem);
        expect(
          itemEl?.shadowRoot
            ?.querySelector(`div[role="listitem"]`)
            ?.classList.contains(`-${size}`)
        ).be.true;
      }
    }
  });

  it('should render nested list', async () => {
    const el = await fixture<StudsList>(html`
      <studs-list>
        <studs-list-item>
          <img
            style="border-radius: 100%; width: 20px; height: 20px;"
            src="https://www.thispersondoesnotexist.com"
            slot="prefix"
          />
          Jane Doe
          <studs-icon icon="delete" slot="action"></studs-icon>
          <studs-icon icon="save" slot="action"></studs-icon>
        </studs-list-item>
        <studs-list-item data-test-id="nested-item">
          <img
            style="border-radius: 100%; width: 20px; height: 20px;"
            src="https://www.thispersondoesnotexist.com"
            slot="prefix"
          />
          Jane Doe
          <studs-icon icon="delete" slot="action"></studs-icon>
          <studs-icon icon="save" slot="action"></studs-icon>
          <studs-list slot="list">
            <studs-list-item
              >Last Edited
              <p slot="suffix">Today</p></studs-list-item
            >
            <studs-list-item
              >Created
              <p slot="suffix">12/01/23</p></studs-list-item
            >
            <studs-list-item
              >Due by
              <p slot="suffix">12/01/24</p>
              <studs-list slot="list">
                <studs-list-item
                  >Status
                  <p slot="suffix">Valid</p>
                </studs-list-item></studs-list
              >
            </studs-list-item>
          </studs-list>
        </studs-list-item>
      </studs-list>
    `);
    expect(el).to.be.instanceOf(StudsList);
    const nestedItem = el.querySelector(`[data-test-id="nested-item"]`);
    expect(nestedItem).be.instanceOf(StudsListItem);

    // collapsed
    expect(
      nestedItem?.shadowRoot?.querySelector('details')?.hasAttribute('open')
    ).be.false;

    // expanded
    nestedItem?.shadowRoot?.querySelector('summary')?.click();
    expect(nestedItem?.hasAttribute("open")).to.be.true;
  });
});
