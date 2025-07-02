import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsStepper } from '../../src/components/display/stepper';

const stepData = [
  {
    label: 'Step 1',
    description: 'This is step 1',
  },
  {
    label: 'Step 2',
    description: 'This is step 2',
  },
  {
    label: 'Step 3',
    description: 'This is step 3',
  },
];
describe('StudsStepper', async () => {
  it('should render', async () => {
    const el = await fixture<StudsStepper>(html`
      <studs-stepper></studs-stepper>
    `);
    expect(el).to.be.instanceOf(StudsStepper);
  });

  it('should render with default step', async () => {
    const el = await fixture<StudsStepper>(html`
      <studs-stepper
        steps="${JSON.stringify(stepData)}"
        step="1"
      ></studs-stepper>
    `);
    expect(el).to.be.instanceOf(StudsStepper);

    const stepElements = el?.shadowRoot?.querySelectorAll('div.step.-wrapper');
    expect(stepElements?.length).to.be.equal(3);

    const activeStep = stepElements?.[1];
    expect(activeStep?.classList.contains('-active')).to.be.true;
    expect(activeStep?.querySelector('.step.-label p')?.textContent).to.be.eq(
      'Step 2'
    );
    expect(
      activeStep?.querySelector('.step.-description')?.textContent
    ).to.be.eq('This is step 2');
  });

  it('should render with colors', async () => {
    const buttonTypes = ['primary', 'secondary', 'initial'];
    const el = await fixture<StudsStepper>(html`
      <studs-stepper></studs-stepper>
    `);
    buttonTypes.forEach(async (c) => {
      await aTimeout(1);
      el.setAttribute('color', c);
      await elementUpdated(el);
      expect(el.getAttribute('color')).to.eq(c);
      expect(
        el.shadowRoot?.querySelector(`.stepper`)?.classList.contains(`-${c}`)
      ).to.be.true;
    });
  });

  it('should render with directions', async () => {
    const buttonTypes = ['vertical', 'horizontal'];
    const el = await fixture<StudsStepper>(html`
      <studs-stepper></studs-stepper>
    `);
    buttonTypes.forEach(async (c) => {
      await aTimeout(1);
      el.setAttribute('direction', c);
      await elementUpdated(el);
      expect(el.getAttribute('direction')).to.eq(c);
      expect(
        el.shadowRoot?.querySelector(`.stepper`)?.classList.contains(`-${c}`)
      ).to.be.true;
    });
  });
});
