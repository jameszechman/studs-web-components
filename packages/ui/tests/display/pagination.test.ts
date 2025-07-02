import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsPagination } from '../../src/components/display/pagination';
import { StudsButton } from '../../src/components/display/button';
import { StudsDropdown } from '../../src/components/inputs/dropdown';
import { StudsInput } from '../../src/components/inputs/input';
import sinon from 'sinon';

describe('StudsPagination', async () => {
  it('should render', async () => {
    const el = await fixture<StudsPagination>(html`
      <studs-pagination></studs-pagination>
    `);
    expect(el).to.be.instanceOf(StudsPagination);

    const btn = el?.shadowRoot?.querySelector('studs-button');
    expect(btn).to.be.instanceOf(StudsButton);
  });

  it('should render with default page ', async () => {
    const el = await fixture<StudsPagination>(html`
      <studs-pagination
        total-items="1500"
        items-per-page="10"
        current-page="3"
      ></studs-pagination>
    `);
    expect(el).to.be.instanceOf(StudsPagination);
    expect(el.getAttribute('current-page')).to.be.eq('3');

    const buttonEls = el?.shadowRoot?.querySelectorAll('li studs-button');
    expect(buttonEls?.[2]).to.be.exist;
    expect(buttonEls?.[2]?.getAttribute('aria-current')).to.be.eq('page');
    expect(buttonEls?.[1]?.getAttribute('aria-current')).to.not.be.eq('page');
  });

  it('should have the right page quantity based on totalItems and itemsPerPage', async () => {
    const el = await fixture<StudsPagination>(html`
      <studs-pagination
        total-items="1500"
        items-per-page="100"
      ></studs-pagination>
    `);
    expect(el).to.be.instanceOf(StudsPagination);

    const buttonEls: Array<HTMLElement> = el?.shadowRoot?.querySelectorAll(
      'li studs-button'
    ) as any;
    const lastButtonEl = buttonEls?.[buttonEls?.length - 1];
    expect(lastButtonEl?.textContent?.trim()).to.be.eq('15');
  });

  it('should have jumper and its label', async () => {
    const el = await fixture<StudsPagination>(html`
      <studs-pagination
        total-items="1500"
        items-per-page="100"
        has-jumper
        jumper-label="A label for jumper"
      ></studs-pagination>
    `);
    expect(el).to.be.instanceOf(StudsPagination);

    const jumperWrapperEl: HTMLDivElement = el?.shadowRoot?.querySelector(
      '.jumper'
    ) as any;
    const jumperLabelEl = jumperWrapperEl?.querySelector('label');
    const jumperInputEl = jumperWrapperEl?.querySelector('studs-input');
    expect(jumperLabelEl?.textContent?.trim()).to.be.eq('A label for jumper');
    expect(jumperInputEl).to.be.exist;
    expect(jumperInputEl).to.be.instanceOf(StudsInput);
  });

  it('should have select and its label', async () => {
    const el = await fixture<StudsPagination>(html`
      <studs-pagination
        total-items="1500"
        items-per-page="100"
        has-select
        select-label="A label for select"
      ></studs-pagination>
    `);
    expect(el).to.be.instanceOf(StudsPagination);

    const jumperWrapperEl: HTMLDivElement = el?.shadowRoot?.querySelector(
      '.select'
    ) as any;
    const selectLabelEl = jumperWrapperEl?.querySelector('label');
    const selectDropdownEl = jumperWrapperEl?.querySelector('studs-dropdown');
    expect(selectLabelEl?.textContent?.trim()).to.be.eq('A label for select');
    expect(selectDropdownEl).to.be.exist;
    expect(selectDropdownEl).to.be.instanceOf(StudsDropdown);
  });

  it('should render with button types', async () => {
    const el = await fixture<StudsPagination>(html`
      <studs-pagination
        total-items="1500"
        items-per-page="100"
        current-page="3"
      ></studs-pagination>
    `);
    expect(el).to.be.instanceOf(StudsPagination);

    const type = 'tertiary';
    el.setAttribute('button-type', type);
    await elementUpdated(el);
    expect(el.getAttribute('button-type')).to.eq(type);

    const buttonEl = el.shadowRoot?.querySelector('ul li studs-button');
    expect(buttonEl?.getAttribute('button-type')).to.be.eq(type);
    expect(
      buttonEl?.shadowRoot
        ?.querySelector('button')
        ?.classList.contains(`-${type}`)
    ).to.be.true;
  });

  it('Should run event changePage', async (done) => {
    const el = await fixture<StudsPagination>(html`
      <studs-pagination
        total-items="1500"
        items-per-page="100"
        current-page="2"
      ></studs-pagination>
    `);

    const spyOnChange = sinon.spy();
    el.addEventListener('changePage', spyOnChange);

    const firstButtonEl = el.shadowRoot?.querySelector(
      'ul li studs-button'
    ) as HTMLDivElement;
    firstButtonEl?.shadowRoot?.querySelector('button')?.click();
    expect(firstButtonEl?.textContent?.trim()).to.be.eq('1');

    await aTimeout(0);

    expect(spyOnChange.called).to.be.true;
    expect(firstButtonEl?.getAttribute('aria-current')).to.be.eq('page');
  });
});
