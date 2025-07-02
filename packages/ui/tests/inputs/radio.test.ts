import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsRadio } from '../../src/components/inputs/radio';

describe('StudsRadio', async () => {
  it('should render', async () => {
    const el = await fixture<StudsRadio>(html`
      <studs-radio name="radio" value="radio" label="Radio"></studs-radio>
    `);
    expect(el).to.be.instanceOf(StudsRadio);
  });

  it('should render with a label', async () => {
    const el = await fixture<StudsRadio>(html`
      <studs-radio name="radioName" value="radio" label="A label"></studs-radio>
    `);
    expect(el.shadowRoot?.querySelector('label')?.textContent?.trim()).to.be.equal(
      'A label'
    );
  });

  it('should render with a name', async () => {
    const el = await fixture<StudsRadio>(html`
      <studs-radio name="radioName" value="radio" label="A label"></studs-radio>
    `);
    expect(el.getAttribute('name')).to.be.equal('radioName');

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('name')).to.be.eq('radioName');
  });

  it('should render with checked', async () => {
    const el = await fixture<StudsRadio>(html`
      <studs-radio
        name="radio"
        value="radio"
        checked
        label="A label"
      ></studs-radio>
    `);
    expect(el.hasAttribute('checked')).to.be.true;

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.checked).to.be.true;
  });

  it('should render with disabled', async () => {
    const el = await fixture<StudsRadio>(html`
      <studs-radio
        name="radio"
        value="radio"
        disabled
        label="A label"
      ></studs-radio>
    `);
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.shadowRoot?.querySelector('input')?.hasAttribute('disabled')).to
      .be.true;
  });

  it('should run an onChange event', async () => {
    const el = await fixture<StudsRadio>(html`
      <studs-radio name="radio" value="radio" label="A label"></studs-radio>
    `);

    const spyOnChange = sinon.spy();
    el.addEventListener('change', spyOnChange);

    const input = el.shadowRoot?.querySelector('input');
    input?.click();

    await aTimeout(0);
    expect(spyOnChange.called).to.be.true;
  });
});
