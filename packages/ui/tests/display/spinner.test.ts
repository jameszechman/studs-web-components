import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsSpinner } from '../../src/components/display/spinner';
import { getDocumentElement } from '../../src/utils/shared';

describe('StudsSpinner', async () => {
  it('should render', async () => {
    const el = await fixture<StudsSpinner>(html`
      <studs-spinner></studs-spinner>
    `);
    expect(el).to.be.instanceOf(StudsSpinner);
  });

  it('should change following the open property', async () => {
    const el = await fixture<StudsSpinner>(html`
      <studs-spinner></studs-spinner>
    `);
    const spinnerEl = el?.shadowRoot?.querySelector('.spinner');
    expect(spinnerEl?.getAttribute('aria-hidden')).to.be.eq('true');

    (el as StudsSpinner).toggleOpen();
    await elementUpdated(el);
    expect(spinnerEl?.getAttribute('aria-hidden')).to.be.eq('false');
    const spinnerIcon = spinnerEl?.querySelector('.loader.-spinner.-primary');
    expect(spinnerIcon).to.be.exist;
  });

  it('should hide after click on the overlay', async () => {
    const el = await fixture<StudsSpinner>(html`
      <studs-spinner open close-on-overlay-click></studs-spinner>
    `);
    const spinnerEl = el?.shadowRoot?.querySelector('.spinner');

    const overlayEl = el?.shadowRoot?.querySelector(
      '.-overlay'
    ) as HTMLDivElement;
    overlayEl?.click();

    await elementUpdated(el);
    expect(spinnerEl?.getAttribute('aria-hidden')).to.be.eq('true');
  });

  it('should hide after press escape key', async () => {
    const el = await fixture<StudsSpinner>(html`
      <studs-spinner
        open
        close-on-overlay-click
        close-on-escape
      ></studs-spinner>
    `);
    expect(el).to.be.instanceOf(StudsSpinner);
    const spinnerEl = el?.shadowRoot?.querySelector('.spinner');
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
    });
    const doc = getDocumentElement(el);
    doc?.dispatchEvent(event);
    await elementUpdated(el);
    await aTimeout(1);

    expect(spinnerEl?.getAttribute('aria-hidden')).to.be.eq('true');
  });

  it('should disabled the backdrop', async () => {
    const el = await fixture<StudsSpinner>(html`
      <studs-spinner
        open
        close-on-overlay-click
        disable-backdrop
      ></studs-spinner>
    `);
    const overlayEl = el?.shadowRoot?.querySelector('.-overlay');
    await elementUpdated(el);
    await aTimeout(0);
    expect(overlayEl?.hasAttribute('disabled')).to.be.true;
  });
});
