import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsSlider } from '../../src/components/inputs/slider';
import { StudsTooltip } from '../../src/components/overlays/tooltip';
import { StudsInput } from '../../src/components/inputs/input';
describe('StudsSlider', async () => {
  it('should render', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider></studs-slider>
    `);
    expect(el).to.be.instanceOf(StudsSlider);
  });

  it('should render with a labels', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-label
      ></studs-slider>
    `);
    const leftTxt = el.shadowRoot?.querySelector('.leftTxt');
    expect(leftTxt?.textContent?.trim()).to.be.eq('Peanut Butter');

    const rightTxt = el.shadowRoot?.querySelector('.rightTxt');
    expect(rightTxt?.textContent?.trim()).to.be.eq('Jelly');
  });

  it('should render with enable-tooltip', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-tooltip
        enable-label
      ></studs-slider>
    `);

    expect(el.hasAttribute('enable-tooltip')).to.be.true;
    const studsTooltip = el.shadowRoot?.querySelector('studs-tooltip')
    if (studsTooltip) {
      expect(studsTooltip).to.be.instanceOf(StudsTooltip);
    }
  });

  it('should render with enable-input', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-input
        enable-label
      ></studs-slider>
    `);

    expect(el.hasAttribute('enable-input')).to.be.true;

    const inputs = el.shadowRoot?.querySelectorAll('.inputNumber');
    // eq 2 for start/end input
    expect(inputs?.length).to.be.eq(2);
  });

  it('should render with step', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-input
        step="5"
        enable-label
      ></studs-slider>
    `);

    expect(el.getAttribute('step')).to.be.eq('5');

    const inputs = el.shadowRoot?.querySelectorAll('input.inputNumber');
    inputs?.forEach(async (input: any) => {
      expect(input.getAttribute('step')).to.be.eq('5');
    });
  });

  it('should render with min/max', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-input
        enable-label
        min="5"
        max="100"
      ></studs-slider>
    `);
    expect(el.getAttribute('min')).to.be.eq('5');
    expect(el.getAttribute('max')).to.be.eq('100');

    const inputs = el.shadowRoot?.querySelectorAll('input.inputNumber');
    inputs?.forEach(async (input: any) => {
      expect(input.getAttribute('min')).to.be.eq('5');
      expect(input.getAttribute('max')).to.be.eq('100');
    });
  });

  it('should render with marks', async () => {
    const marks = [
      { value: 0, label: '0°' },
      { value: 75, label: '75°' },
      { value: 100, label: '100°' },
    ];
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        min="0"
        max="100"
        step="1"
        enable-input="true"
        marks="${JSON.stringify(marks)}"
      ></studs-slider>
    `);

    const sliderMarkValues =
      el.shadowRoot?.querySelectorAll('.sliderMarkValue');
    const sliderMarksLabels =
      el.shadowRoot?.querySelectorAll('.sliderMarkLabel') || [];

    expect(sliderMarkValues?.length).to.be.eq(marks.length);

    sliderMarkValues?.forEach((e, index) => {
      const mark = e as HTMLSpanElement;
      const label = sliderMarksLabels[index] as HTMLLabelElement;
      expect(mark).have.style('left', `${marks[index].value}%`);
      expect(label?.textContent).to.be.eq(marks[index].label);
    });
  });

  it('should render with range slider', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-input
        enable-label
        defaultValue="[0, 50]"
      ></studs-slider>
    `);
    expect(el.getAttribute('defaultValue')).to.be.eq('[0, 50]');

    const thumbLeft = el.shadowRoot?.querySelector('input.thumbLeft');
    expect(thumbLeft).to.not.be.undefined;

    const thumbRight = el.shadowRoot?.querySelector('input.thumbRight');
    expect(thumbRight).to.not.be.undefined;
  });

  it('should render with single slider', async () => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-input
        enable-label
      ></studs-slider>
    `);

    const thumbLeft = el.shadowRoot?.querySelector('input.thumbLeft');
    expect(thumbLeft).to.not.be.undefined;

    const thumbRight = el.shadowRoot?.querySelector('input.thumbRight');
    expect(thumbRight).to.be.null;
  });

  it('Should run change the slider value tooltip', async (done) => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        label="Peanut Butter"
        end-label="Jelly"
        enable-input
        enable-label
        enable-tooltip
        min="5"
        max="100"
        defaultValue="10"
      ></studs-slider>
    `);

    const spyOnChange = sinon.spy();
    el.addEventListener('change', spyOnChange);

    const sliderVal = 34;

    const thumbInput = el?.shadowRoot?.querySelector('input');
    if (thumbInput) {
      thumbInput.value = sliderVal.toString();
      thumbInput.dispatchEvent(new Event('input'));
    }

    await aTimeout(0);
    expect(spyOnChange.called).to.be.true;

    const studsTooltip = el.shadowRoot?.querySelector('studs-tooltip');
    expect(studsTooltip).to.be.instanceOf(StudsTooltip);
    expect(studsTooltip?.textContent?.trim()).to.be.eq(`${sliderVal}°`);
  });

  it('Should run change the range slider', async (done) => {
    const el = await fixture<StudsSlider>(html`
      <studs-slider
        defaultValue="[0, 50]"
        enable-input="true"
        min="0"
        max="50"
        step="1"
      ></studs-slider>
    `);

    expect(el).be.instanceOf(StudsSlider);
    const spyOnChange = sinon.spy();
    el.addEventListener('change', spyOnChange);

    // for the right thumb
    const sliderVal = 34;
    const rightInput = el?.shadowRoot?.querySelector<StudsInput>(
      'studs-input[aria-label="Maximum Value"]'
    );
    expect(rightInput).be.instanceOf(StudsInput);
    if (rightInput) {
      rightInput.value = sliderVal.toString();
      rightInput.dispatchEvent(new Event('input'));
    }
    await aTimeout(0);
    expect(spyOnChange.called).to.be.true;
    const rightThumbInput = el?.shadowRoot?.querySelector<StudsInput>(
      '.sliderWrapper input.thumb.thumbRight'
    );
    expect(rightThumbInput?.value).be.eq(sliderVal?.toString());

    // for the left thumb
    const leftSliderVal = 5;
    const leftInput = el?.shadowRoot?.querySelector<StudsInput>(
      'studs-input[aria-label="Minimum value"]'
    );
    expect(leftInput).be.instanceOf(StudsInput);
    if (leftInput) {
      leftInput.value = leftSliderVal.toString();
      leftInput.dispatchEvent(new Event('input'));
    }
    await aTimeout(0);
    expect(spyOnChange.called).to.be.true;
    const leftThumbInput = el?.shadowRoot?.querySelector<StudsInput>(
      '.sliderWrapper input.thumb.thumbLeft'
    );
    expect(leftThumbInput?.value).be.eq(leftSliderVal?.toString());
  });
});
