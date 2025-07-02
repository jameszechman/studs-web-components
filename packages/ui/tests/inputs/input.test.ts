import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsInput } from '../../src/components/inputs/input';
import { StudsHelperText } from '../../src/components/inputs/helper-text';

describe('StudsInput', async () => {
  it('should render', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input type="text" label="Default Input"></studs-input>
    `);
    expect(el).to.be.instanceOf(StudsInput);
  });

  it('should render with disabled input', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input type="text" disabled label="Default label"></studs-input>
    `);
    const studsInput = el?.shadowRoot?.querySelector('input');
    expect((studsInput as HTMLInputElement)?.hasAttribute('disabled')).to.be
      .true;
  });

  it('should render with infinity-input', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input type="number" label="Infinity input" infinite></studs-input>
    `);
    const inputElement = el?.shadowRoot?.querySelector('input');
    expect(inputElement?.hasAttribute('disabled')).to.be.true;
    const infiniteElement = el?.shadowRoot?.querySelector('.-infinite');
    expect(infiniteElement).to.be.exist;
    expect(infiniteElement?.querySelector('span')?.textContent).to.eq('∞');
  });

  it('should render a search input', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input type="search" label="Default label"></studs-input>
    `);
    expect(el.shadowRoot?.querySelector('input')?.getAttribute('type')).to.eq(
      'search'
    );
  });

  it('should render with input-types', async () => {
    const inputTypes = ['text', 'password', 'number', 'tel', 'email', 'search'];
    const el = await fixture<StudsInput>(html`
      <studs-input type="text" label="Default label"></studs-input>
    `);
    inputTypes.forEach(async (type) => {
      await aTimeout(1);
      el.setAttribute('type', type);
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector('input')?.getAttribute('type')).to.eq(
        type
      );
    });
  });

  it('should change type text/password after click visible icon with', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input type="password" label="Password"></studs-input>
    `);
    const btnIcon = el?.shadowRoot?.querySelector(
      'studs-button[icon="visibility"]'
    ) as HTMLButtonElement;
    btnIcon?.click();
    await aTimeout(0);
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('type')).to.be.eq('text');
  });

  it('should render with Adornment Start', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input
        type="text"
        label="Adornment Start"
        adornments='{"lbs":{"position":"start"}}'
      ></studs-input>
    `);
    const adornmentElement = el?.shadowRoot?.querySelector('.adornment.-start');
    expect((adornmentElement as HTMLDivElement)?.textContent?.trim()).to.be.eq(
      'lbs'
    );
  });

  it('should render with Adornment End', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input
        type="text"
        label="Adornment End"
        adornments='{"$":{"position":"end"}}'
      ></studs-input>
    `);
    const adornmentElement = el?.shadowRoot?.querySelector('.adornment.-end');
    expect((adornmentElement as HTMLDivElement)?.textContent?.trim()).to.be.eq(
      '$'
    );
  });

  it('should render with type password', async () => {
    const el = await fixture<StudsInput>(html`
      <studs-input type="password" label="Password"></studs-input>
    `);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('type')).to.be.eq('password');

    const iconAdornment = el?.shadowRoot?.querySelector('.adornment.-password');
    expect(iconAdornment).to.not.be.undefined;
  });

  it('Should run event onChange', async (done) => {
    const el = await fixture<StudsInput>(html`
      <studs-input type="password" label="Password"></studs-input>
    `);

    const spyOnChange = sinon.spy();
    el.addEventListener('change', spyOnChange);

    const inputElement = el.shadowRoot?.querySelector('input');
    if (!!inputElement) inputElement.value = 'New Value';
    inputElement?.dispatchEvent(new Event('input'));

    await aTimeout(0);

    expect(spyOnChange.called).to.be.true;
  });
});
