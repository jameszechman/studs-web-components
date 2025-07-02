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

import { StudsTextarea } from '../src/components/inputs/textarea';

describe('StudsTextarea', async () => {
  it('should render', async () => {
    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);
    expect(el).to.be.instanceOf(StudsTextarea);
  });

  it('should render shadow root', async () => {
    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);
    await waitUntil(
      () => el.shadowRoot?.querySelector('textarea'),
      'Element did not render children'
    );
  });

  it('should render with a disabled attribute', async () => {
    const el = await fixture<StudsTextarea>(html`
      <studs-textarea disabled></studs-textarea>
    `);
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.shadowRoot?.querySelector('textarea')?.hasAttribute('disabled'))
      .to.be.true;
  });

  it('should render with a rows attribute', async () => {
    const rows = '5';

    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);

    await aTimeout(1);
    el.setAttribute('rows', rows);
    await elementUpdated(el);

    expect(el.hasAttribute('rows')).to.be.true;
    expect(
      el.shadowRoot?.querySelector('textarea')?.getAttribute('rows')
    ).to.eq(rows);
  });

  it('should render with a cols attribute', async () => {
    const cols = '5';

    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);

    await aTimeout(1);
    el.setAttribute('cols', cols);
    await elementUpdated(el);

    expect(el.hasAttribute('cols')).to.be.true;
    expect(
      el.shadowRoot?.querySelector('textarea')?.getAttribute('cols')
    ).to.eq(cols);
  });

  it('should render with a maxLength attribute', async () => {
    const maxLength = '255';

    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);

    await aTimeout(1);
    el.setAttribute('maxlength', maxLength);
    await elementUpdated(el);

    expect(el.hasAttribute('maxlength')).to.be.true;
    expect(
      el.shadowRoot?.querySelector('textarea')?.getAttribute('maxlength')
    ).to.eq(maxLength);
  });

  it('should render with a placeholder attribute', async () => {
    const placeholder = 'Textarea Placeholder';

    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);

    await aTimeout(1);
    el.setAttribute('placeholder', placeholder);
    el.setAttribute('value', '');
    await elementUpdated(el);

    expect(el.hasAttribute('placeholder')).to.be.true;
    expect(
      el.shadowRoot?.querySelector('textarea')?.getAttribute('placeholder')
    ).to.eq(placeholder);
  });

  it('should render with size', async () => {
    const sizes = ['small', 'medium', 'large'];
    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
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

  it('should render with statuses', async () => {
    const statuses = ['error', 'success', 'warning'];
    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);
    statuses.forEach(async (mType) => {
      await aTimeout(1);
      el.setAttribute('status', mType);
      await elementUpdated(el);
      expect(el.getAttribute('status')).to.eq(mType);
      expect(
        el.shadowRoot?.querySelector('div')?.classList.contains(`-${mType}`)
      ).to.be.true;
    });
  });

  it('should render with a characterCounter attribute', async () => {
    const characterCounter = 'true';
    const maxLength = '200';
    const label = 'Textarea with Character Counter';

    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);

    await aTimeout(1);
    el.setAttribute('character-counter', characterCounter);
    el.setAttribute('maxLength', maxLength);
    el.setAttribute('label', label);
    await elementUpdated(el);

    expect(el.shadowRoot?.querySelector('.counter')).to.exist;
  });

  it('should render with a required attribute', async () => {
    const required = 'true';

    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);

    await aTimeout(1);
    el.setAttribute('required', required);
    await elementUpdated(el);

    expect(el.hasAttribute('required')).to.be.true;
    expect(el.shadowRoot?.querySelector('div')?.classList.contains(`-required`))
      .to.be.true;
  });

  it('should render with a required attribute', async () => {
    const messageType = 'error';
    const error = 'true';

    const el = await fixture<StudsTextarea>(html`
      <studs-textarea></studs-textarea>
    `);

    await aTimeout(1);
    el.setAttribute('status', messageType);
    el.setAttribute('error', error);
    await elementUpdated(el);

    expect(el.hasAttribute('error')).to.be.true;
    expect(
      el.shadowRoot?.querySelector('div')?.classList.contains(`-${messageType}`)
    ).to.be.true;
  });
});
