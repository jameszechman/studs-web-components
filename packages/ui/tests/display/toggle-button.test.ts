import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsToggleButton } from '../../src/components/display/toggle-button';

describe('StudsToggleButton', async () => {
  it('should render', async () => {
    const el = await fixture<StudsToggleButton>(html`
      <studs-toggle-button></studs-toggle-button>
    `);
    expect(el).to.be.instanceOf(StudsToggleButton);
  });

  it('should render with button-type', async () => {
    const buttonTypes = [
      'cta',
      'primary',
      'secondary',
      'tertiary',
      'link',
      'close',
      'icon',
    ];
    const el = await fixture<StudsToggleButton>(html`
      <studs-toggle-button></studs-toggle-button>
    `);
    buttonTypes.forEach(async (type) => {
      await aTimeout(1);
      el.setAttribute('button-type', type);
      await elementUpdated(el);
      expect(el.getAttribute('button-type')).to.eq(type);
      expect(
        el.shadowRoot?.querySelector('button')?.classList.contains(`-${type}`)
      ).to.be.true;
    });
  });

  it('Should run event onClick', async () => {
    const el = await fixture<StudsToggleButton>(html`
      <studs-toggle-button></studs-toggle-button>
    `);

    const spyOnClick = sinon.spy();
    el.addEventListener('click', spyOnClick);
    el?.click();

    await aTimeout(0);

    expect(spyOnClick.calledOnce).to.be.true;
    expect(el.getAttribute('aria-pressed')).to.be.eq('true');
    expect(el.hasAttribute('selected')).to.be.true;

    const shadowRootButton = el.shadowRoot?.querySelector('button');
    expect(shadowRootButton?.classList.contains('-active')).to.be.true;
  });

  it('Should run event toggle-selected', async () => {
    const el = await fixture<StudsToggleButton>(html`
      <studs-toggle-button></studs-toggle-button>
    `);
    const spyOnClick = sinon.spy();
    el.addEventListener('toggle-selected', spyOnClick);

    // unselected to selected
    el?.click();
    await aTimeout(0);
    const customEvent = spyOnClick.getCall(0).args[0];
    expect(spyOnClick.calledOnce).to.be.true;
    expect(customEvent?.detail?.selected).to.be.true;

    // selected to unselected
    el?.click();
    await aTimeout(0);
    const secondCustomEvent = spyOnClick.getCall(1)?.args[0];
    expect(spyOnClick.calledTwice).to.be.true;
    expect(secondCustomEvent?.detail?.selected).to.be.false;
  });
});
