import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsAccordion } from '../../src/components/display/accordion';
import { StudsButton } from '../../src/components/display/button';
import { StudsAccordionItem } from '../../src/components/display/accordion-item';
import { StudsInput } from '../../src/components/inputs/input';

describe('StudsAccordion', async () => {
  it('should render', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion enable-header="" enable-search="" size="medium" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    expect(el).to.be.instanceOf(StudsAccordion);
    expect(el?.querySelector('studs-accordion-item')).to.be.instanceOf(StudsAccordionItem)
  });

  it('should render with enable-header', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion enable-header="true" enable-search="" size="medium" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    expect(el.hasAttribute('enable-header')).to.be.true;
    const test = el.shadowRoot?.querySelector('studs-button');
    expect(test).to.be.instanceOf(StudsButton)
    const spy = sinon.spy();
    test?.addEventListener('click', spy);
    const button = test?.shadowRoot?.querySelector('button');
    button?.click();
    expect(spy).to.have.been.calledOnce;
  });

  it('should render with enable-search', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion enable-header="" enable-search="" size="medium" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    expect(el.hasAttribute('enable-search')).to.be.true;

    // expect search event called
    const studsInputEl = el?.shadowRoot?.querySelector('studs-input');
    expect(studsInputEl).to.be.instanceOf(StudsInput);
    const spyOnChange = sinon.spy();
    studsInputEl?.addEventListener('change', spyOnChange);
    const searchInputElement = studsInputEl?.shadowRoot?.querySelector('input');
    if (!!searchInputElement) {
      // first call with empty data
      searchInputElement.value = '';
      searchInputElement.dispatchEvent(new Event('input'));
      await aTimeout(0);
      expect(spyOnChange).to.be.calledOnce;
      // second call with value
      searchInputElement.value = 'New Value';
      searchInputElement.dispatchEvent(new Event('input'));
      await aTimeout(0);
      expect(spyOnChange).to.have.been.calledTwice;
    }

  });

  it('should render with default-open', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion default-open="true" enable-header="" enable-search="" size="medium" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    expect(el.hasAttribute('default-open')).to.be.true;
  });

  it('should render with size', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion enable-header="" enable-search="" size="medium" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    const sizes = ['small', 'medium', 'large'];
    sizes.forEach(async (size) => {
      await aTimeout(1);
      el.setAttribute('size', size);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.eq(size);
      expect(el.shadowRoot?.querySelector('div')?.classList.contains(`-${size}`)).to.be.true;
    });
  });

  it('should render with variant', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion enable-header="" enable-search="" size="medium" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    const variants = ['border', 'borderless']
    variants.forEach(async (variant) => {
      await aTimeout(1);
      el.setAttribute('variant', variant);
      await elementUpdated(el);
      expect(el.getAttribute('variant')).to.eq(variant);
      expect(
        el.shadowRoot?.querySelector('div')?.classList.contains(`-${variant}`)
      ).to.be.true;
    });
  });

  it('should render with disabled', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion enable-header="" enable-search="" size="medium" disabled="true" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('should render with direction', async () => {
    const el = await fixture<StudsAccordion>(html`
    <studs-accordion enable-header="" enable-search="" size="medium" disabled="true" variant="borderless" direction="end">
      <studs-accordion-item><div slot="toggle">Accordion Two</div>
      The old man sat on the porch, watching the world go by.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Three</div>
      The smell of fresh coffee filled the air.
      </studs-accordion-item>
      <studs-accordion-item><div slot="toggle">Accordion Four</div>
        She closed her eyes and took a deep breath, trying to calm herself.
      </studs-accordion-item>
    </studs-accordion>
    `);
    const directions = ['start', 'end']
    directions.forEach(async (direction) => {
      await aTimeout(1);
      el.setAttribute('direction', direction);
      await elementUpdated(el);
      expect(el.getAttribute('direction')).to.eq(direction);
      expect(
        el.shadowRoot?.querySelector('div')?.classList.contains(`-${direction}`)
      ).to.be.true;
    });
  });
});