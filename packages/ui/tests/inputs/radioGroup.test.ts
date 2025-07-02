import { expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsRadioGroup } from '../../src/components/inputs/radio-group';

describe('StudsRadioGroup', async () => {
  it('should render', async () => {
    const el = await fixture<StudsRadioGroup>(html`
      <studs-radio-group
        name="radio"
        label="Radio Group"
        display="block"
        value="radio1"
      >
        <studs-radio value="radio1" label="Radio 1" name="radio"></studs-radio>
        <studs-radio value="radio2" label="Radio 2" name="radio"></studs-radio>
        <studs-radio value="radio3" label="Radio 3" name="radio"></studs-radio>
      </studs-radio-group>
    `);
    expect(el).to.be.instanceOf(StudsRadioGroup);
  });

  it('should render with props', async () => {
    const el = await fixture<StudsRadioGroup>(html`
      <studs-radio-group
        name="radioGroupName"
        label="Radio Group 1"
        value="radio1"
      >
        <studs-radio
          value="radio1"
          label="Radio 1"
          name="radioGroupName"
        ></studs-radio>
      </studs-radio-group>
    `);
    expect(el.getAttribute('name')).to.be.equal('radioGroupName');
    expect(el.getAttribute('label')).to.be.equal('Radio Group 1');
    expect(el.getAttribute('value')).to.be.equal('radio1');
  });
});
