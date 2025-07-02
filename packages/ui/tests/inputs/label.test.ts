import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsLabel } from '../../src/components/inputs/label';

describe('StudsLabel', async () => {
  it('should render', async () => {
    const el = await fixture<StudsLabel>(html`
      <studs-label>Default label</studs-label>
    `);
    expect(el).to.be.instanceOf(StudsLabel);
    expect(el.shadowRoot?.querySelector('label')).be.exist;
  });

  it('should render as legend', async () => {
    const el = await fixture<StudsLabel>(html`
      <studs-label>Default label</studs-label>
    `);
    el.setAttribute('as', 'legend');
    await aTimeout(0);
    expect(el).to.be.instanceOf(StudsLabel);
    expect(el.shadowRoot?.querySelector('legend')).be.exist;
  });

  it('should render with required', async () => {
    const el = await fixture<StudsLabel>(html`
      <studs-label required="true">Default label</studs-label>
    `);
    expect(el).to.be.instanceOf(StudsLabel);
    expect(el.shadowRoot?.querySelector('.required')).be.exist;
  });

  it('should render with optional', async () => {
    const el = await fixture<StudsLabel>(html`
      <studs-label optional>Default label</studs-label>
    `);
    expect(el).to.be.instanceOf(StudsLabel);
    expect(el.shadowRoot?.querySelector('.optional')).be.exist;
  });

  it('should render with tooltip', async () => {
    const el = await fixture<StudsLabel>(html`
      <studs-label tooltip="Label's tooltip">Default label</studs-label>
    `);
    expect(el).to.be.instanceOf(StudsLabel);
    expect(el.shadowRoot?.querySelector('studs-tooltip')).be.exist;
  });
});
