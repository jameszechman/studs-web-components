import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsChip } from '../../src/components/display/chip';
import sinon from 'sinon';
import { StudsButton } from '../../src/components/display/button';

describe('StudsChip', async () => {
  it('should render', async () => {
    const el = await fixture<StudsChip>(html` <studs-chip></studs-chip> `);
    expect(el).to.be.instanceOf(StudsChip);
  });

  it('should render with deletable', async () => {
    const el = await fixture<StudsChip>(
      html` <studs-chip deletable></studs-chip> `
    );
    expect(el).to.be.instanceOf(StudsChip);
    expect(el?.shadowRoot?.querySelector('studs-button[button-type="close"]'))
      .to.be.exist;
  });

  it('should render with icon', async () => {
    const el = await fixture<StudsChip>(
      html` <studs-chip icon="add"></studs-chip> `
    );
    expect(el).to.be.instanceOf(StudsChip);
    expect(el?.shadowRoot?.querySelector('i.icon')).to.be.exist;
  });

  it('should render with sizes', async () => {
    const sizes = ['small', 'medium', 'large'];
    const el = await fixture<StudsChip>(
      html` <studs-chip deletable>Default</studs-chip> `
    );
    expect(el).to.be.instanceOf(StudsChip);

    sizes.forEach(async (type) => {
      await aTimeout(1);
      el.setAttribute('size', type);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.eq(type);
      expect(
        el.shadowRoot?.querySelector('div.chip')?.classList.contains(`-${type}`)
      ).to.be.true;
    });
  });

  it('should render with select', async () => {
    const el = await fixture<StudsChip>(
      html` <studs-chip deletable selected>Default</studs-chip> `
    );
    expect(el).to.be.instanceOf(StudsChip);

    expect(
      el.shadowRoot?.querySelector('div.chip')?.classList.contains(`-selected`)
    ).to.be.true;
    expect(
      el.shadowRoot?.querySelector('div.chip')?.getAttribute('aria-selected')
    ).to.be.eq('true');
  });

  it('should render with disabled', async () => {
    const el = await fixture<StudsChip>(
      html` <studs-chip disabled>Default</studs-chip> `
    );
    expect(el).to.be.instanceOf(StudsChip);
    expect(el?.hasAttribute('disabled')).to.be.true;

    expect(el.shadowRoot?.querySelector('div.chip')?.hasAttribute('disabled'))
      .to.be.true;
  });

  it('should run event delete', async () => {
    const el = await fixture<StudsChip>(
      html` <studs-chip deletable>Default</studs-chip> `
    );
    expect(el).to.be.instanceOf(StudsChip);

    const closeButtonEl = el?.shadowRoot?.querySelector(
      'studs-button[button-type="close"]'
    ) as StudsButton;

    const spyOnClick = sinon.spy();
    el.addEventListener('delete', spyOnClick);
    el?.click();

    expect(closeButtonEl).to.be.exist;
    closeButtonEl?.click();

    expect(spyOnClick.called).to.be.true;
  });
});
