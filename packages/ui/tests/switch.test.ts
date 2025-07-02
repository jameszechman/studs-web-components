import { describe, it } from 'vitest';
import {
  fixture,
  html,
  waitUntil,
  expect,
  elementUpdated,
  aTimeout,
} from '@open-wc/testing';
import sinon from 'sinon';

import { StudsSwitch } from '../src/components/inputs/switch';

describe('StudsSwitch', async () => {
  it('should render', async () => {
    const el = await fixture<StudsSwitch>(html`
      <studs-switch></studs-switch>
    `);
    expect(el).to.be.instanceOf(StudsSwitch);
  });

  it('should render shadow root', async () => {
    const el = await fixture<StudsSwitch>(html`
      <studs-switch></studs-switch>
    `);
    await waitUntil(
      () => el.shadowRoot?.querySelector('input'),
      'Element did not render children'
    );
  });

  it('should render with a disabled attribute', async () => {
    const el = await fixture<StudsSwitch>(html`
      <studs-switch disabled>Test</studs-switch>
    `);
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.shadowRoot?.querySelector('input')?.hasAttribute('disabled')).to
      .be.true;
  });

  it('should render with a name attribute', async () => {
    const name = 'switch';
    const el = await fixture<StudsSwitch>(html`
      <studs-switch>Test</studs-switch>
    `);

    await aTimeout(1);
    el.setAttribute('name', name);
    await elementUpdated(el);

    expect(el.hasAttribute('name')).to.be.true;
    expect(el.getAttribute('name')).to.eq(name);
    expect(el.shadowRoot?.querySelector('input')?.getAttribute('name')).to.eq(
      name
    );
  });

  it('should render with size', async () => {
    const sizes = ['small', 'medium', 'large'];
    const el = await fixture<StudsSwitch>(html`
      <studs-switch></studs-switch>
    `);
    sizes.forEach(async (size) => {
      await aTimeout(1);
      el.setAttribute('size', size);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.eq(size);
      expect(
        el.shadowRoot?.querySelector('div')?.classList.contains(`-${size}`)
      ).to.be.true;
    });
  });

  it('should render with labelPosition', async () => {
    const labelPositions = ['start', 'end', 'top', 'bottom'];
    const el = await fixture<StudsSwitch>(html`
      <studs-switch></studs-switch>
    `);
    labelPositions.forEach(async (labelPosition) => {
      await aTimeout(1);
      el.setAttribute('size', labelPosition);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.eq(labelPosition);
      expect(
        el.shadowRoot
          ?.querySelector('div')
          ?.classList.contains(`-${labelPosition}`)
      ).to.be.true;
    });
  });
});
