import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';
import { fireEvent } from '@testing-library/dom';

import { StudsGrid } from '../../src/components/display/grid';
import { StudsCheckbox } from '../../src/components/inputs/checkbox';
import { StudsButton, StudsIcon, StudsPagination } from '../../src';
import { dataSource, nestedDataSource } from '../../src/utils/demo';

const columnsTemplate = [
  {
    key: 'id',
    label: 'Id',
    align: 'end',
    filterable: true,
  },
  {
    key: 'first_name',
    label: 'First Name',
    filterable: true,
    render: (value: string) => {
      return html`<studs-input .value=${value}></studs-input>`;
    },
  },
  {
    key: '_checkbox',
    label: 'Checkbox example',
    render: (v: any) => {
      const { label, value } = v;
      return html`<studs-checkbox
        .checked=${value}
        label=${label}
      ></studs-checkbox>`;
    },
  },
  {
    key: '_switch',
    label: 'Switch example',
    render: (v: any) => {
      const { label, value } = v;
      return html`<studs-switch
        .checked=${value}
        label=${label}
      ></studs-switch>`;
    },
  },
  {
    key: '_bio',
    label: 'Bio',
    filterable: true,
    minWidth: 300,
    render: (v: string) => {
      return html`<studs-textarea .value=${v}></studs-textarea>`;
    },
  },
  {
    key: 'last_name',
    label: 'Last Name',
    editable: true,
  },
  {
    key: 'email',
    label: 'Email',
    editable: true,
  },
  {
    key: 'gender',
    label: 'Gender',
    filterable: {
      type: 'dropdown',
      options: [
        {
          value: 'male',
          label: 'Male',
        },
        {
          value: 'female',
          label: 'Female',
        },
      ],
    },
    render: (v: string) => {
      const options = [
        {
          value: 'male',
          label: 'Male',
        },
        {
          value: 'female',
          label: 'Female',
        },
      ];
      return html`<studs-dropdown
        .options=${options}
        .value=${v}
      ></studs-dropdown>`;
    },
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    filterable: {
      type: 'datepicker',
    },
  },
  {
    key: 'ip',
    label: 'IP Address',
  },
];

const dataSourceTemplate = [
  {
    id: 0,
    first_name: 'Shanna',
    last_name: 'Barrows',
    email: 'Everette.Cormier64@yahoo.com',
    gender: 'female',
    dob: '10/12/2023',
    ip: '71.186.167.238',
    _checkbox: {
      label: 'First label',
      value: true,
    },
    _switch: {
      label: 'Switch A',
      value: false,
    },
    _bio: 'Deserunt aliqua sit ullamco anim ipsum proident et ullamco officia commodo anim quis id nostrud. Duis proident',
  },
  {
    id: 1,
    first_name: 'Alexys',
    last_name: 'Toy',
    email: 'Iva_Parisian@yahoo.com',
    gender: 'male',
    ip: '235.124.161.47',
    _checkbox: {
      label: 'Second label',
      value: false,
    },
    _switch: {
      label: 'Switch B',
      value: true,
    },
    _bio: 'Commodo elit qui occaecat aute deserunt ullamco sunt commodo excepteur anim. Eiusmod minim reprehenderit aliquip ex Lorem incididunt elit eiusmod. Eu nulla do ullamco magna sunt aute nulla.',
  },
  {
    id: 2,
    first_name: 'Rodrigo',
    last_name: 'Bosco',
    email: 'Jessica_Cole35@gmail.com',
    gender: 'female',
    ip: '175.73.241.77',
  },
  {
    id: 3,
    first_name: 'Alexa',
    last_name: 'Bergstrom',
    email: 'Ollie.Mante36@gmail.com',
    gender: 'female',
    ip: '134.244.232.31',
  },
  {
    id: 4,
    first_name: 'Lolita',
    last_name: 'Ferry',
    email: 'Ezequiel_Kassulke@gmail.com',
    gender: 'male',
    ip: '121.159.48.194',
  },
  {
    id: 5,
    first_name: 'Jazmin',
    last_name: 'Torp',
    email: 'Grace_Upton@yahoo.com',
    gender: 'female',
    ip: '181.161.198.211',
  },
];

const columns = [
  {
    key: 'id',
    label: 'Id',
    filterable: true,
  },
  {
    key: 'first_name',
    label: 'First Name',
    filterable: {
      type: 'dropdown',
      options: [
        {
          value: 'Christina',
          label: 'Christina',
        },
      ],
      mode: 'search',
    },
  },
  {
    key: 'last_name',
    label: 'Last Name',
    filterable: {
      type: 'dropdown',
      options: [
        {
          value: 'Christina',
          label: 'Christina',
        },
      ],
      mode: 'search',
    },
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'gender',
    label: 'Gender',
  },
  {
    key: 'ip',
    label: 'IP Address',
  },
];

const nestedColumns = [
  {
    key: 'id',
    label: 'Id',
    filterable: true,
  },
  {
    key: 'first_name',
    label: 'First Name',
    filterable: true,
  },
  {
    key: 'last_name',
    label: 'Last Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'gender',
    label: 'Gender',
  },
  {
    key: 'ip',
    label: 'IP Address',
  },
];

describe('StudsGrid', async () => {
  it('should render', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        page-size="25"
        show-borders=""
        enable-filtering=""
        enable-column-resizing=""
        enable-column-reordering=""
        enable-pagination=""
        enable-global-search=""
        enable-sticky-header=""
        enable-sorting=""
        enable-fit-width-column=""
        enable-selection-rows=""
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
  });

  it('should render with column/row template', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        page-size="25"
        show-borders=""
        enable-filtering=""
        enable-column-resizing=""
        enable-column-reordering=""
        enable-pagination=""
        enable-global-search=""
        enable-sticky-header=""
        enable-sorting=""
        enable-fit-width-column=""
        enable-selection-rows=""
        column="${JSON.stringify(columnsTemplate)}"
        dataSource="${JSON.stringify(dataSourceTemplate)}"
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
  });

  it('should render with limit page size', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        page-size="50"
        show-borders=""
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
    const trs = el?.shadowRoot?.querySelectorAll('tbody tr');
    expect(trs?.length).to.be.eq(50);
  });

  it('should render nested table', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        page-size="50"
        show-borders
        enable-filtering
        enable-column-resizing
        enable-column-reordering
        enableSelectionRows
        enable-fit-width-column
        enable-pagination
        enable-global-search
        enable-sticky-header
        enable-sorting
        columns=${JSON.stringify(nestedColumns)}
        dataSource=${JSON.stringify(nestedDataSource(100))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
    const trs = el?.shadowRoot?.querySelectorAll('tbody tr');
    const firstRow = trs?.[1];

    const toggleStudsButton = firstRow?.querySelector(
      'studs-button#nested_1_1_toggleRow'
    );
    expect(toggleStudsButton).to.be.instanceOf(StudsButton);
    const btn = toggleStudsButton?.shadowRoot?.querySelector('button');
    btn?.click();
    await aTimeout(0);
    expect(
      el?.shadowRoot?.querySelectorAll(
        'tbody tr.nested-row[aria-expanded="true"]'
      )
    ).be.exist;
  });

  it('should render with enable-filtering', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-filtering
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
    expect(el.hasAttribute('enable-filtering')).to.be.true;

    const filterCount = columns?.filter((x) => x.filterable)?.length;
    const founds = el?.shadowRoot?.querySelectorAll('studs-button.filter');
    expect(founds?.length).to.be.eq(filterCount);
  });

  it('should render with enable-column-resizing', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    expect(el.hasAttribute('enable-column-resizing')).to.be.false;

    el.setAttribute('enable-column-resizing', 'true');
    await elementUpdated(el);

    expect(el.hasAttribute('enable-column-resizing')).to.be.true;

    const founds = el?.shadowRoot?.querySelectorAll('.resize-handle');
    expect(columns.length - 1).to.be.eq(founds?.length);

    // test resize column
    const initialTemplateColumn = getComputedStyle(el).getPropertyValue(
      '--grid-template-columns'
    );
    const resizeHandle = founds?.[1] as HTMLDivElement;
    fireEvent.mouseDown(resizeHandle, {
      target: resizeHandle,
      clientX: 117,
    });
    fireEvent.mouseMove(document, {
      clientX: 128,
    });
    fireEvent.mouseUp(document, {});

    await aTimeout(0);
    expect(initialTemplateColumn).be.not.eq(
      getComputedStyle(el).getPropertyValue('--grid-template-columns')
    );
  });

  it('should render with enable-column-reordering', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(10))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    expect(el.hasAttribute('enable-column-reordering')).to.be.false;

    el.setAttribute('enable-column-reordering', 'true');
    await elementUpdated(el);

    expect(el.hasAttribute('enable-column-reordering')).to.be.true;

    const founds = el?.shadowRoot?.querySelectorAll('.reorder-handle');
    expect(columns.length).to.be.eq(founds?.length);

    // test reorder columns (between 1 and 0) <=> (change between first_name and id)
    const tableEl = el.shadowRoot?.querySelector('table');
    const columnEls = tableEl?.querySelectorAll('th');
    const firstColumnEl = columnEls?.[0];
    const secondColumnEl = columnEls?.[1];
    expect(firstColumnEl?.id).eq('id');
    expect(secondColumnEl?.id).eq('first_name');

    // TODO: testing drag and drop not working here
    // fireEvent.dragStart(firstColumnEl as HTMLElement, {
    //   dataTransfer: {
    //     setData: () => {},
    //   },
    // });
    // fireEvent.dragOver(firstColumnEl as HTMLElement, {
    //   dataTransfer: {
    //     setData: () => {},
    //   },
    // });
    // fireEvent.drop(firstColumnEl as HTMLElement, {
    //   dataTransfer: {
    //     getData: (k) => {
    //       if (k === 'data') return 1;
    //       if (k === 'type') return 'column';
    //     },
    //   },
    // });
    // fireEvent.dragEnd(firstColumnEl as HTMLElement, {
    //   dataTransfer: {
    //     setData: () => {},
    //   },
    // });
    // await aTimeout(0);
    // expect(columnEls?.[0]?.id).eq('first_name');
    // expect(columnEls?.[1]?.id).eq('id');
  });

  it('should change row order', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(10))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    // test reorder rows (the first and second)
    const tableEl = el.shadowRoot?.querySelector('table');
    let rowEls = tableEl?.querySelectorAll('tbody tr');
    const firstTdEl = rowEls?.[0]?.querySelector('td');
    const secondTdEl = rowEls?.[1]?.querySelector('td');

    expect(firstTdEl?.textContent?.trim()).be.eq('0');
    expect(secondTdEl?.textContent?.trim()).be.eq('1');

    // TODO: testing drag and drop not working here
    //     fireEvent.dragStart(firstTdEl as HTMLElement, {
    //       dataTransfer: {
    //         setData: () => {},
    //         setDragImage: () => {},
    //       },
    //     });
    //     fireEvent.dragOver(firstTdEl as HTMLElement, {
    //       dataTransfer: {
    //         setData: () => {},
    //         setDragImage: () => {},
    //       },
    //     });
    //
    //     fireEvent.drop(firstTdEl as HTMLElement, {
    //       dataTransfer: {
    //         getData: (k) => {
    //           if (k === 'data') return 1;
    //           if (k === 'type') return 'row';
    //         },
    //       },
    //     });
    //     fireEvent.dragEnd(firstTdEl as HTMLElement, {
    //       dataTransfer: {
    //         setData: () => {},
    //       },
    //     });
    //     await aTimeout(0);
    //     rowEls = tableEl?.querySelectorAll('tbody tr');
    //     expect(rowEls?.[0]?.querySelector('td')?.textContent?.trim()).be.eq('1');
    //     expect(rowEls?.[1]?.querySelector('td')?.textContent?.trim()).be.eq('0');
  });

  it('should render with enableLockedColumns', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-locked-columns
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    const manageColumnBtn = el.shadowRoot?.querySelector('#manageColumn');
    expect(manageColumnBtn).be.instanceOf(StudsButton);
    expect(manageColumnBtn?.textContent?.trim()).be.eq('Manage Columns');

    const lockColumnItems = el.shadowRoot?.querySelectorAll(
      'studs-popover .lockColumnItem'
    );
    expect(columns.length).be.eq(lockColumnItems?.length);
  });

  it('should default locked two columns', async () => {
    const lockedColumns = [columns[0].key, columns[1].key];
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-locked-columns
        locked-columns=${JSON.stringify(lockedColumns)}
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
    const lockIcons = el.shadowRoot?.querySelectorAll(
      'thead studs-icon.lockIcon'
    );
    expect(lockIcons?.length).be.eq(lockedColumns.length);
    expect(lockIcons?.[0]).be.instanceOf(StudsIcon);

    // test sticky 2 left columns
    await aTimeout(0);
    const ths = el.shadowRoot?.querySelectorAll<HTMLElement>('thead tr th');
    expect(ths?.[0]?.style.position).be.eq('sticky');
    expect(ths?.[1]?.style.position).be.eq('sticky');
    expect(ths?.[2]?.style.position).be.not.eq('sticky');

    // test change locked-columns attribute
    lockedColumns.push(columns[2].key);
    el.setAttribute('locked-columns', JSON.stringify(lockedColumns));
    await aTimeout(0);
    expect(
      el.shadowRoot?.querySelectorAll('thead studs-icon.lockIcon').length
    ).be.eq(3);
  });

  it('should locked columns with enable enableSelectionRows (+1 locked column)', async () => {
    const lockedColumns = [columns[0].key, columns[1].key];
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-selection-rows
        enable-locked-columns
        locked-columns=${JSON.stringify(lockedColumns)}
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    await aTimeout(0);

    // test sticky 3 left columns header
    const ths = el.shadowRoot?.querySelectorAll<HTMLElement>('thead tr th');
    expect(ths?.[0]?.style.position).be.eq('sticky');
    expect(ths?.[1]?.style.position).be.eq('sticky');
    expect(ths?.[2]?.style.position).be.eq('sticky');
    expect(ths?.[3]?.style.position).be.not.eq('sticky');

    // test sticky 3 left columns body
    const tds = el.shadowRoot?.querySelectorAll<HTMLElement>('tbody tr td');
    expect(tds?.[0]?.style.position).be.eq('sticky');
    expect(tds?.[1]?.style.position).be.eq('sticky');
    expect(tds?.[2]?.style.position).be.eq('sticky');
    expect(tds?.[3]?.style.position).be.not.eq('sticky');
  });

  it('should lock a column', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-locked-columns
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    await aTimeout(0);
    let ths = el.shadowRoot?.querySelectorAll<HTMLElement>('thead tr th');
    expect(ths?.[0]?.style.position).be.not.eq('sticky');

    const lockColumnItems = el.shadowRoot?.querySelectorAll(
      'studs-popover .lockColumnItem studs-icon'
    );
    lockColumnItems?.[0].dispatchEvent(new Event('click'));
    await aTimeout(10);
    ths = el.shadowRoot?.querySelectorAll<HTMLElement>('thead tr th');
    expect(ths?.[0]?.style.position).be.eq('sticky');
  });

  it('should unlock a column', async () => {
    const lockedColumns = [columns[0].key, columns[1].key];
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-locked-columns
        locked-columns=${JSON.stringify(lockedColumns)}
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    await aTimeout(0);

    // test sticky 1 left columns header
    let ths = el.shadowRoot?.querySelectorAll<HTMLElement>('thead tr th');
    expect(ths?.[1]?.style.position).be.eq('sticky');
    // test sticky 1 left columns body
    let tds = el.shadowRoot?.querySelectorAll<HTMLElement>('tbody tr td');
    expect(tds?.[1]?.style.position).be.eq('sticky');

    // after unlock a column
    const lockIcon = el.shadowRoot?.querySelector('thead studs-icon.lockIcon');
    expect(lockIcon).be.instanceOf(StudsIcon);
    lockIcon?.dispatchEvent(new Event('click'));
    await aTimeout(0);
    // test sticky 1 left columns header
    ths = el.shadowRoot?.querySelectorAll<HTMLElement>('thead tr th');
    expect(ths?.[1]?.style.position).be.not.eq('sticky');
    // test sticky 1 left columns body
    tds = el.shadowRoot?.querySelectorAll<HTMLElement>('tbody tr td');
    expect(tds?.[1]?.style.position).be.not.eq('sticky');
  });

  it('should render with enableSelectionRows', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    expect(el.hasAttribute('enable-selection-rows')).to.be.false;

    el.setAttribute('enable-selection-rows', 'true');
    await elementUpdated(el);

    expect(el.hasAttribute('enable-selection-rows')).to.be.true;

    const selectAllEl = el?.shadowRoot?.querySelector(
      'studs-checkbox#select-all'
    );
    const selectionTdEl = el?.shadowRoot?.querySelector(
      'td[data-column="selection_all"]'
    );
    expect(selectAllEl).to.be.exist;
    expect(selectionTdEl).to.be.exist;

    const checkboxInput = selectAllEl?.shadowRoot?.querySelector('input');
    expect(!!checkboxInput?.checked).to.be.eq(false);
    checkboxInput?.click();
    await elementUpdated(el);
    expect(checkboxInput?.checked).to.be.eq(true);
  });

  it('should render with enable-pagination', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    expect(el.hasAttribute('enable-pagination')).to.be.false;

    el.setAttribute('enable-pagination', 'true');
    await elementUpdated(el);

    expect(el.hasAttribute('enable-pagination')).to.be.true;

    const found = el?.shadowRoot?.querySelector('studs-pagination');
    expect(found).to.be.exist;
  });

  it('should render with enable-sorting', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    expect(el.hasAttribute('enable-sorting')).to.be.false;

    el.setAttribute('enable-sorting', 'true');
    await elementUpdated(el);

    expect(el.hasAttribute('enable-sorting')).to.be.true;

    let sortingIcon = el?.shadowRoot?.querySelector('th#first_name .sorting');
    expect(sortingIcon).to.be.not.exist;

    const thContent = el?.shadowRoot?.querySelector(
      'th#first_name p'
    ) as HTMLParagraphElement;
    thContent?.click();
    await elementUpdated(el);

    sortingIcon = el?.shadowRoot?.querySelector('th#first_name .-sorting');
    expect(sortingIcon).to.be.exist;
  });

  it('should render with disableColumnFilter', async () => {
    const disabledColumnFilterArray = ['Id', 'First Name'];
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-filtering
        disableColumnFilter=${JSON.stringify(disabledColumnFilterArray)}
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    expect(el.hasAttribute('disableColumnFilter')).to.be.true;

    const idEl = el?.shadowRoot?.querySelector('th#id studs-button.filter');
    const firstNameEl = el?.shadowRoot?.querySelector(
      'th#first_name studs-button.filter'
    );
    const lastNameEl = el?.shadowRoot?.querySelector(
      'th#last_name studs-button.filter'
    );
    expect(idEl?.hasAttribute('disabled')).to.be.true;
    expect(firstNameEl?.hasAttribute('disabled')).to.be.true;
    expect(lastNameEl?.hasAttribute('disabled')).to.be.false;
  });

  it('should run select all', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-selection-rows="true"
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    const selectAllEl = el?.shadowRoot?.querySelector(
      'studs-checkbox#select-all'
    ) as HTMLElement;

    expect(selectAllEl).to.be.instanceOf(StudsCheckbox);

    const selectAllInput = selectAllEl?.shadowRoot?.querySelector('input');
    expect(selectAllInput?.getAttribute('aria-checked')).to.be.eq('false');

    selectAllInput?.click();
    if (selectAllInput) {
      selectAllInput.checked = true;
      selectAllInput.dispatchEvent(new Event('change'));
    }

    await elementUpdated(el);
    await aTimeout(0);

    expect(selectAllInput?.getAttribute('aria-checked')).to.be.eq('true');

    const firstSelectedTdEl = el?.shadowRoot?.querySelector(
      'td[data-column="selection_all"] studs-checkbox'
    );
    expect(firstSelectedTdEl).to.be.instanceOf(StudsCheckbox);
    const firstSelectedTdInput =
      firstSelectedTdEl?.shadowRoot?.querySelector('input');
    expect(firstSelectedTdInput?.getAttribute('aria-checked')).to.be.eq('true');
  });

  it('should run event double click to fit column', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-fit-width-column
        enable-column-resizing
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    const initialTemplateColumn = getComputedStyle(el).getPropertyValue(
      '--grid-template-columns'
    );

    const resizeFirstName = el?.shadowRoot?.querySelector(
      '#first_name .resize-handle'
    );

    resizeFirstName?.dispatchEvent(new MouseEvent('dblclick'));
    await elementUpdated(el);

    expect(initialTemplateColumn).to.be.not.eq(
      getComputedStyle(el).getPropertyValue('--grid-template-columns')
    );
  });

  it('should switch to second page', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-pagination
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    let firstRowFirstName = el?.shadowRoot?.querySelector(
      'td[data-column="first_name"]'
    );
    expect(firstRowFirstName?.textContent?.trim()).to.be.eq('Ulices');

    const found = el?.shadowRoot?.querySelector('studs-pagination');
    expect(found).to.be.instanceOf(StudsPagination);
    expect(found?.getAttribute('current-page')).to.be.eq('1');

    const page2StudsButton = found?.shadowRoot?.querySelector(
      'studs-button[label="Page 2"]'
    );
    const page2Button = page2StudsButton?.shadowRoot?.querySelector('button');
    page2Button?.click();

    await elementUpdated(el);

    firstRowFirstName = el?.shadowRoot?.querySelector(
      'td[data-column="first_name"]'
    );
    expect(firstRowFirstName?.textContent?.trim()).to.be.eq('Kellie');
    expect(found?.getAttribute('current-page')).to.be.eq('2');
  });

  it('should change the sorting direction', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        enable-sorting
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);

    let firstRowFirstName = el?.shadowRoot?.querySelector(
      'td[data-column="first_name"]'
    );
    expect(firstRowFirstName?.textContent?.trim()).to.be.eq('Ulices');

    let sortingIcon = el?.shadowRoot?.querySelector('th#first_name .sorting');
    expect(sortingIcon).to.be.not.exist;

    const thContent = el?.shadowRoot?.querySelector(
      'th#first_name p'
    ) as HTMLParagraphElement;
    thContent?.click();
    await elementUpdated(el);

    sortingIcon = el?.shadowRoot?.querySelector('th#first_name .-sorting');
    expect(sortingIcon).to.be.exist;

    firstRowFirstName = el?.shadowRoot?.querySelector(
      'td[data-column="first_name"]'
    );
    expect(firstRowFirstName?.textContent?.trim()).to.be.eq('Abbie');

    thContent?.click();
    await elementUpdated(el);

    firstRowFirstName = el?.shadowRoot?.querySelector(
      'td[data-column="first_name"]'
    );
    expect(firstRowFirstName?.textContent?.trim()).to.be.eq('Zula');

    thContent?.click();
    await elementUpdated(el);

    firstRowFirstName = el?.shadowRoot?.querySelector(
      'td[data-column="first_name"]'
    );
    expect(firstRowFirstName?.textContent?.trim()).to.be.eq('Ulices');
  });

  it('should apply the global search', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        page-size="25"
        show-borders=""
        enable-filtering=""
        enable-column-resizing=""
        enable-column-reordering=""
        enable-pagination=""
        enable-global-search=""
        enable-sticky-header=""
        enable-sorting=""
        enable-fit-width-column=""
        enable-selection-rows=""
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
    let trs = el?.shadowRoot?.querySelectorAll('tr');
    expect(trs?.length).to.be.eq(26);

    const searchStudsInput = el?.shadowRoot?.querySelector(
      'studs-input[type="search"]'
    );
    const searchInput = searchStudsInput?.shadowRoot?.querySelector('input');
    if (searchInput) {
      searchInput.value = 'Georgette';
      searchInput.dispatchEvent(new Event('input'));
    }

    await elementUpdated(el);
    trs = el?.shadowRoot?.querySelectorAll('tr');
    expect(trs?.length).to.be.eq(1);
  });

  it('should render with enable-infinite-scroll', async () => {
    const el = await fixture<StudsGrid>(html`
      <studs-grid
        page-size="25"
        show-borders=""
        enable-infinite-scroll
        columns=${JSON.stringify(columns)}
        dataSource=${JSON.stringify(dataSource(250))}
      ></studs-grid>
    `);
    expect(el).to.be.instanceOf(StudsGrid);
    expect(el.shadowRoot?.querySelector('div[data-scroller]')).be.exist;
  });
});
