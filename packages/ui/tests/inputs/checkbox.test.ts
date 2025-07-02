import { StudsCheckbox } from './../../src/components/inputs/checkbox';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

describe('StudsCheckbox', async () => {
  it('should render', async () => {
    const el = await fixture<StudsCheckbox>(html`
      <studs-checkbox></studs-checkbox>
    `);
    expect(el).to.be.instanceOf(StudsCheckbox);
  });

  it('should render with a name', async () => {
    const el = await fixture<StudsCheckbox>(html`
      <studs-checkbox name="checkbox"></studs-checkbox>
    `);
    expect(el.getAttribute('name')).to.be.equal('checkbox');
    expect(
      el.shadowRoot?.querySelector('input')?.getAttribute('name')
    ).to.be.equal('checkbox');
  });

  it('should render with checked', async () => {
    const el = await fixture<StudsCheckbox>(html`
      <studs-checkbox checked></studs-checkbox>
    `);
    expect(el.hasAttribute('checked')).to.be.true;
    expect(el.checked).to.be.true;
  });

  it('should render with disabled', async () => {
    const el = await fixture<StudsCheckbox>(html`
      <studs-checkbox disabled></studs-checkbox>
    `);
    const checkbox = el.shadowRoot?.querySelector('input[type="checkbox"]');
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(checkbox?.hasAttribute('disabled')).to.be.true;
  });

  // it('should run an onChange event', async () => {
  //   const el = await fixture<StudsCheckbox>(html`
  //     <studs-checkbox></studs-checkbox>
  //   `);
  //   const checkbox = el.shadowRoot?.querySelector('input[type="checkbox"]');
  //   const changeHandler = sinon.spy();
  //   el.addEventListener('change', changeHandler);
  //   if (checkbox) {
  //     (checkbox as HTMLInputElement).checked = true;
  //     checkbox.dispatchEvent(new Event('change'));
  //     expect(changeHandler).to.be.calledOnce;

  //     const customEvent = changeHandler.getCall(0)?.args?.[0];
  //     // expect(customEvent.detail).to.be.true;

  //     (checkbox as HTMLInputElement).checked = false;
  //     checkbox.dispatchEvent(new Event('change'));

  //     // expect(changeHandler).to.have.been.calledTwice;
  //     // expect(changeHandler.getCall(1).args[0].detail).to.be.false;
  //   }
  // });
});
