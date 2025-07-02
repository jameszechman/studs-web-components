import { StudsDropdown } from '../../src/components/inputs/dropdown';
import { StudsBadge } from '../../src/components/display/badge';
import { StudsButton } from '../../src/components/display/button';
import { StudsChip } from '../../src/components/display/chip';
import { StudsImage } from '../../src/components/display/image';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';
import { StudsCheckbox } from '../../src/components/inputs/checkbox';
import { fireEvent } from '@testing-library/dom';

describe('StudsDropdown', async () => {
  it('should render', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown></studs-dropdown>
    `);
    expect(el).to.be.instanceOf(StudsDropdown);
  });

  it('should render with size', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown size="medium"></studs-dropdown>
    `);
    const size = ['medium', 'small'];
    const divElm = el.shadowRoot?.querySelector('div') as HTMLDivElement;
    size.map(async (sz) => {
      await aTimeout(1);
      el.setAttribute('size', sz);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.equal(sz);
      expect(divElm?.classList.contains(`-${sz}`)).to.be.true;
    });
  });

  it('should render with disabled', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown disabled></studs-dropdown>
    `);
    const divElm = el.shadowRoot?.querySelector('div') as HTMLDivElement;
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(divElm.hasAttribute('disabled')).to.be.true;
  });

  it('should render with name', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        name="dropdown"
        options='[{"label": "Option 1","value":"1"}, {"label":"Option 2","value":"2"}, {"label":"Option 3","value":"3"}]'
      ></studs-dropdown>
    `);
    const inputElm = el.shadowRoot?.querySelector('input');
    expect(el.getAttribute('name')).to.be.equal('dropdown');
    expect(inputElm?.getAttribute('name')).to.be.equal('dropdown');
  });

  it('should render with placeholder', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        type="search"
        placeholder="dropdown"
        options='[{"label": "Option 1","value":"1"}, {"label":"Option 2","value":"2"}, {"label":"Option 3","value":"3"}]'
      ></studs-dropdown>
    `);
    const inputElm = el.shadowRoot?.querySelector("input[type='search']");
    expect(el.getAttribute('placeholder')).to.be.equal('dropdown');
    expect(inputElm?.getAttribute('placeholder')).to.be.equal('dropdown');
  });

  it('should searchable and change the options', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        type="search"
        options='[{"label": "Option 1","value":"1"}, {"label":"Option 2","value":"2"}, {"label":"Option 3","value":"3"}]'
      ></studs-dropdown>
    `);

    expect(el).be.instanceOf(StudsDropdown);
    expect(
      el.shadowRoot?.querySelectorAll(
        'ul.popper[role="listbox"] li[role="option"]'
      ).length
    ).be.eq(3);

    const inputElm = el.shadowRoot?.querySelector<HTMLInputElement>(
      "input[type='search']"
    );
    expect(inputElm).be.instanceOf(HTMLInputElement);

    if (inputElm) {
      inputElm.value = 'Option 1';
      inputElm.dispatchEvent(new Event('input'));
    }
    await elementUpdated(el);
    expect(
      el.shadowRoot?.querySelectorAll(
        'ul.popper[role="listbox"] li[role="option"]'
      ).length
    ).be.eq(1);
  });

  it('should select an option', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        type="search"
        options='[{"label": "Option 1","value":"1"}, {"label":"Option 2","value":"2"}, {"label":"Option 3","value":"3"}]'
      ></studs-dropdown>
    `);

    expect(el).be.instanceOf(StudsDropdown);

    const firstOpt = el.shadowRoot?.querySelector<HTMLLIElement>('li[id="1"]');
    firstOpt?.click();
    await elementUpdated(el);
    expect(el.value).eq('1');

    const secondOpt = el.shadowRoot?.querySelector<HTMLLIElement>('li[id="2"]');
    secondOpt?.click();
    await elementUpdated(el);
    expect(el.value).eq('2');
  });

  it('should select/deselect all options', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        type="multi"
        value=""
        options=${JSON.stringify([
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
          { label: 'Option 4', value: '4' },
          { label: 'Option 5', value: '5' },
          { label: 'Option 6', value: '6' },
        ])}
      ></studs-dropdown>
    `);

    expect(el).be.instanceOf(StudsDropdown);

    expect(el.value).eq('');

    const firstOpt =
      el.shadowRoot?.querySelector<HTMLLIElement>('li:nth-child(1)');
    firstOpt?.click();
    await elementUpdated(el);

    expect(JSON.stringify(el.value)).eq(
      JSON.stringify(['1', '2', '3', '4', '5', '6'])
    );
  });

  it('should render adornment (icon and image)', async () => {
    const imgSrc = 'https://picsum.photos/200';
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        type="search"
        value=""
        options=${JSON.stringify([
          { label: 'Option 1', value: '1', image: imgSrc },
          { label: 'Option 2', value: '2', icon: 'home' },
          { label: 'Option 3', value: '3' },
        ])}
      ></studs-dropdown>
    `);

    expect(el).be.instanceOf(StudsDropdown);

    // test images
    const firstOpt =
      el.shadowRoot?.querySelector<HTMLLIElement>('li:nth-child(1)');
    const studsImage = firstOpt?.querySelector('studs-image');
    expect(studsImage).be.instanceOf(StudsImage);
    expect(studsImage?.getAttribute('src')).eq(imgSrc);

    // test icon
    const secondOpt =
      el.shadowRoot?.querySelector<HTMLLIElement>('li:nth-child(2)');
    const iconEl = secondOpt?.querySelector('i.studs-icon');
    expect(iconEl?.textContent?.trim()).eq('home');
  });

  it('should reset the dropdown', async () => {
    const imgSrc = 'https://picsum.photos/200';
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        type="search"
        value="1"
        options=${JSON.stringify([
          { label: 'Option 1', value: '1', image: imgSrc },
          { label: 'Option 2', value: '2', icon: 'home' },
          { label: 'Option 3', value: '3' },
        ])}
      ></studs-dropdown>
    `);
    expect(el).be.instanceOf(StudsDropdown);
    expect(el?.value).eq(1);

    (el as any)?.reset();

    await aTimeout(0);
    expect(el?.value).eq('');
  });

  it('should render with status', async () => {
    const statuses = ['error', 'success', 'warning'];
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        placeholder="dropdown"
        options='[{"label": "Option 1","value":"1"}, {"label":"Option 2","value":"2"}, {"label":"Option 3","value":"3"}]'
      ></studs-dropdown>
    `);
    statuses.map(async (stt) => {
      await aTimeout(1);
      el.setAttribute('status', stt);
      await elementUpdated(el);
      const divElm = el.shadowRoot?.querySelector(
        `div.-wrapper.-${stt}`
      ) as HTMLDivElement;
      expect(el.getAttribute('status')).to.equal(stt);
      expect(divElm).to.be.exist;
    });
  });

  it('should render with icon', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        icon="home"
        options='[{"label": "Option 1","value":"1"}, {"label":"Option 2","value":"2"}, {"label":"Option 3","value":"3"}]'
      ></studs-dropdown>
    `);
    const iconEl = el.shadowRoot?.querySelector(`.toggle studs-button`);
    expect(iconEl).be.instanceOf(StudsButton);
    expect(iconEl?.getAttribute('icon')).be.eq('home');
  });

  it('should render with multiple selection type', async () => {
    const el = await fixture<StudsDropdown>(html`
      <studs-dropdown
        icon="home"
        type="multi"
        options='[{"label": "Option 1","value":"1"}, {"label":"Option 2","value":"2"}, {"label":"Option 3","value":"3"}]'
      ></studs-dropdown>
    `);
    expect(el).be.instanceOf(StudsDropdown);

    expect(el.getAttribute('type')).be.eq('multi');

    const selectionEls = el.shadowRoot?.querySelectorAll('ul li');
    const selectAllLiEl = selectionEls?.[0] as HTMLLIElement;
    const selectAllCheckboxEl = selectAllLiEl?.querySelector(
      'studs-checkbox'
    ) as StudsCheckbox;

    // test select all option
    expect(selectAllCheckboxEl).be.instanceOf(StudsCheckbox);
    // fireEvent.click(selectAllLiEl, { target: selectAllLiEl });
    selectAllLiEl?.click();
    await aTimeout(1);
    const countingBadge = el.shadowRoot?.querySelector('studs-badge');
    expect(countingBadge).be.instanceOf(StudsBadge);
    expect(countingBadge?.getAttribute('count')).be.not.eq('0');
    selectAllLiEl?.click();
    await aTimeout(1);
    expect(countingBadge?.getAttribute('count')).be.eq('0');

    // test select items
    const firstSelEl = selectionEls?.[1] as HTMLLIElement;
    const secondSelEl = selectionEls?.[2] as HTMLLIElement;
    firstSelEl?.click();
    secondSelEl?.click();

    await aTimeout(0);

    expect(countingBadge?.getAttribute('count')).be.eq('2');

    // test remove item
    const firstSelectedItemEl = el.shadowRoot?.querySelector('studs-chip');
    expect(firstSelectedItemEl).be.instanceOf(StudsChip);
    const btnInsideChipEl =
      firstSelectedItemEl?.shadowRoot?.querySelector('studs-button');
    expect(btnInsideChipEl).be.instanceOf(StudsButton);
    btnInsideChipEl?.shadowRoot?.querySelector('button')?.click();

    await aTimeout(0);
    expect(countingBadge?.getAttribute('count')).be.eq('1');
  });
});
