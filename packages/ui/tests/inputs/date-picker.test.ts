import { StudsDatePicker } from './../../src/components/inputs/date-picker';
import { expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';
import { StudsInput } from '../../src/components/inputs/input';

describe('StudsDatePicker', async () => {
  it('should render', async () => {
    const el = await fixture<StudsDatePicker>(html`
      <studs-date-picker></studs-date-picker>
    `);
    expect(el).to.be.instanceOf(StudsDatePicker);
  });
  it('should render with placeholder', async () => {
    const format = "MM/DD/YYYY"
    const el = await fixture<StudsDatePicker>(html`
      <studs-date-picker placeholder=${format}></studs-date-picker>
    `);
    expect(el.placeholder).to.be.eql(format);
    const studsInput = el.shadowRoot?.querySelector("studs-input");
    expect(studsInput).to.be.instanceOf(StudsInput);
    expect(studsInput?.getAttribute("placeholder")).to.be.eql(format);
    const input = studsInput?.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("placeholder")).to.be.eql(format);
  });
});
