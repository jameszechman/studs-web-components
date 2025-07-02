import type { Meta, StoryObj } from '@storybook/web-components';
import { html, render } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsGrid } from '../../components/display/grid';
import { dataSource, nestedDataSource } from '../../utils/demo';
import { StudsCheckbox, StudsDropdown, StudsSwitch } from '../../../storybook-static';

const meta = {
  title: 'Studs/Display/DataGrid',
  tags: ['autodocs'],
  render: (args) =>
    html`
      <studs-grid
        caption=${ifDefined(args.caption)}
        page-size=${ifDefined(args.pageSize)}
        itemsperpageselector=${ifDefined(args.itemsPerPageSelector)}
        ?show-borders=${args.showBorders}
        ?enable-locked-columns=${args.enableLockedColumns}
        .lockedColumns=${args.lockedColumns}
        ?enable-filtering=${args.enableFiltering}
        ?enable-column-resizing=${args.enableColumnResizing}
        ?enable-column-reordering=${args.enableColumnReordering}
        ?enable-row-reordering=${args.enableRowReordering}
        ?enable-infinite-scroll=${args.enableInfiniteScroll}
        ?enable-pagination=${args.enablePagination}
        ?enable-global-search=${args.enableGlobalSearch}
        ?enable-sticky-header=${args.enableStickyHeader}
        ?enable-sorting=${args.enableSorting}
        ?enable-fit-width-column=${args.enableFitWidthColumn}
        ?enable-selection-rows=${args.enableSelectionRows}
        disable-column-filter=${JSON.stringify(args.disableColumnFilter)}
        .columns=${args.columns}
        dataSource=${JSON.stringify(args.dataSource)}
        height=${ifDefined(JSON.stringify(args.height))}
        @onSelectedRows=${(e: CustomEvent) => console.log('row', e.detail.rowItem)}
        @onChangeRowData=${(e: CustomEvent) => console.log('Storybook: Changed row data:', e.detail)}
      ></studs-grid>`,
  argTypes: {
    caption: {
      control: {
        type: 'text'
      }
    },
    pageSize: {
      control: {
        type: 'number'
      }
    },
    itemsPerPageSelector: {
      control: {
        type: 'array'
      }
    },
    showBorders: {
      control: {
        type: 'boolean'
      }
    },
    enableFiltering: {
      control: {
        type: 'boolean'
      }
    },
    enableColumnResizing: {
      control: {
        type: 'boolean'
      }
    },
    enableColumnReordering: {
      control: {
        type: 'boolean'
      }
    },
    enableRowReordering: {
      control: {
        type: 'boolean'
      }
    },
    enableInfiniteScroll: {
      control: {
        type: 'boolean'
      }
    },
    enablePagination: {
      control: {
        type: 'boolean'
      }
    },
    enableGlobalSearch: {
      control: {
        type: 'boolean'
      }
    },
    enableStickyHeader: {
      control: {
        type: 'boolean'
      }
    },
    enableSorting: {
      control: {
        type: 'boolean'
      }
    },
    enableFitWidthColumn: {
      control: {
        type: 'boolean'
      }
    },
    enableSelectionRows: {
      control: {
        type: 'boolean'
      }
    },
    disableColumnFilter: {
      control: {
        type: 'array'
      }
    },
    columns: {
      control: {
        type: 'array'
      }
    },
    dataSource: {
      control: {
        type: 'array'
      }
    },
    height: {
      control: {
        type: 'number'
      }
    }
  }
} satisfies Meta<StudsGrid>;

export default meta;
type Story = StoryObj<StudsGrid>;

export const Default: Story = {
  args: {
    caption: "Default",
    pageSize: 25,
    // itemsPerPageSelector: [10, 25, 50, 100],
    showBorders: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableRowReordering: true,
    enableInfiniteScroll: false,
    enableSelectionRows: true,
    enableFitWidthColumn: true,
    enablePagination: true,
    enableGlobalSearch: true,
    enableStickyHeader: true,
    enableSorting: true,
    disableColumnFilter: ['Id', 'First Name'],
    columns: [
      {
        key: 'id',
        label: 'Id',
        align: 'end',
      },
      {
        key: 'first_name',
        label: 'First Name'
      },
      {
        key: 'last_name',
        label: 'Last Name',
        filterable: true,
      },
      {
        key: 'email',
        label: 'Email',
        filterable: {
          type: 'dropdown',
          mode: 'multi',
          options: [
            { value: 'Noelia14@yahoo.com', label: 'Noelia14@yahoo.com' },
            { value: 'Athena_Weber@hotmail.com', label: 'Athena_Weber@hotmail.com' },
            { value: 'Dolores48@gmail.com', label: 'Dolores48@gmail.com' }
          ]
        }
      },
      {
        key: 'gender',
        label: 'Gender',
        filterable: {
          type: 'dropdown',
          options: [
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            }
          ]
        }
      },
      {
        key: 'ip',
        label: 'IP Address'
      }
    ],
    dataSource: dataSource(250)
  }
};

export const LockedColumns: Story = {
  args: {
    caption: "Locked Columns",
    pageSize: 25,
    // itemsPerPageSelector: [10, 25, 50, 100],
    showBorders: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableRowReordering: true,
    enableInfiniteScroll: false,
    enableSelectionRows: true,
    enableFitWidthColumn: true,
    enablePagination: true,
    enableGlobalSearch: true,
    enableStickyHeader: true,
    enableSorting: true,
    enableLockedColumns: true,
    lockedColumns: ['id', 'first_name'],
    disableColumnFilter: [],
    columns: [
      {
        key: 'id',
        label: 'Id',
        align: 'end',
      },
      {
        key: 'first_name',
        label: 'First Name',
        filterable: true,
        minWidth: 150,
      },
      {
        key: 'last_name',
        label: 'Last Name',
        filterable: true,
        minWidth: 150,
      },
      {
        key: 'email',
        label: 'Email',
        minWidth: 400,
        filterable: {
          type: 'dropdown',
          mode: 'multi',
          options: [
            { value: 'Noelia14@yahoo.com', label: 'Noelia14@yahoo.com' },
            { value: 'Athena_Weber@hotmail.com', label: 'Athena_Weber@hotmail.com' },
            { value: 'Dolores48@gmail.com', label: 'Dolores48@gmail.com' }
          ]
        }
      },
      {
        key: 'gender',
        label: 'Gender',
        minWidth: 400,
        filterable: {
          type: 'dropdown',
          options: [
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            }
          ]
        }
      },
      {
        key: 'ip',
        label: 'IP Address'
      }
    ],
    dataSource: dataSource(250)
  }
};

export const ColumnWithMinWidth: Story = {
  args: {
    pageSize: 25,
    showBorders: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableInfiniteScroll: false,
    enableSelectionRows: true,
    enableFitWidthColumn: true,
    enablePagination: true,
    enableGlobalSearch: true,
    enableStickyHeader: true,
    enableSorting: true,
    disableColumnFilter: ['Id', 'First Name'],
    columns: [
      {
        key: 'id',
        label: 'Id',
        align: 'end',
      },
      {
        key: 'first_name',
        label: 'First Name',
        minWidth: 100
      },
      {
        key: 'last_name',
        label: 'Last Name',
        minWidth: 150
      },
      {
        key: 'email',
        label: 'Email',
        minWidth: 250
      },
      {
        key: 'gender',
        label: 'Gender',
        minWidth: 130
      },
      {
        key: 'ip',
        label: 'IP Address',
        minWidth: 300
      }
    ],
    dataSource: dataSource(25)
  }
};

export const Editable: Story = {
  args: {
    pageSize: 25,
    showBorders: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableInfiniteScroll: false,
    enableSelectionRows: true,
    enableFitWidthColumn: true,
    enablePagination: true,
    enableGlobalSearch: true,
    enableStickyHeader: true,
    enableSorting: true,
    disableColumnFilter: ['Id', 'First Name'],
    columns: [
      {
        key: 'id',
        label: 'Id',
        align: 'end',
      },
      {
        key: 'first_name',
        label: 'First Name',
        editable: true
      },
      {
        key: 'last_name',
        label: 'Last Name',
        editable: true
      },
      {
        key: 'email',
        label: 'Email',
        editable: true
      },
      {
        key: 'gender',
        label: 'Gender',
        editable: true
      },
      {
        key: 'ip',
        label: 'IP Address'
      }
    ],
    dataSource: dataSource(100)
  }
};

export const TemplateAndEditable: Story = {
  args: {
    pageSize: 25,
    showBorders: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableInfiniteScroll: false,
    enableSelectionRows: true,
    enableFitWidthColumn: true,
    enablePagination: true,
    enableGlobalSearch: true,
    enableStickyHeader: true,
    enableSorting: true,
    disableColumnFilter: ['Id', 'First Name'],
    columns: [
      {
        key: 'id',
        label: 'Id',
        align: 'end',
        filterable: true,
        render: (value) => {
          const div = document.createElement('div');
          div.classList.add('template');
          div.textContent = value.toString();
          return div;
        }
      },
      {
        key: 'first_name',
        label: 'First Name',
        filterable: true,
        render: (value: string, {
          row,
          key,
        }) => {
          return html`<studs-input .value=${value} @blur=${(e: FocusEvent) => {
            const newRow = {
              ...row,
              [key]: (e.target as HTMLInputElement)['value'],
            }
            console.log(newRow)
            // host.dataSource[idx] = newRow;
            // host.requestUpdate();
          }}></studs-input>`;
        }
      },
      {
        key: '_checkbox',
        label: 'Checkbox example',
        render: (v: any, {
          row,
          key,
        }) => {
          const {label, value} = v;
          return html`<studs-checkbox .checked=${value} label=${label} @input=${
            (e: CustomEvent) => {
              const newRow = {
                ...row,
                [key]: {
                  label,
                  value: (e.target as StudsCheckbox).checked
                }
              }
              console.log(newRow)
              // host.dataSource[idx] = newRow;
              // host.requestUpdate();
            }
          }></studs-checkbox>`
        }
      },
      {
        key: '_switch',
        label: 'Switch example',
        render: (v: any, {
          row,
          key,
        }) =>
        {
          const {label, value} = v;
          return html`<studs-switch .checked=${value} label=${label} @change=${
            (e: CustomEvent) => {
              const newRow = {
                ...row,
                [key]: {
                  label,
                  value: (e.target as StudsSwitch).checked
                }
              }
              console.log(newRow)
              // host.dataSource[idx] = newRow;
              // host.requestUpdate();
            }
          
          }></studs-switch>`;
        }
      },
      {
        key: '_bio',
        label: 'Bio',
        filterable: true,
        minWidth: 300,
        render: (v: string, {
          row,
          key
        }) => {
          return html`<studs-textarea .value=${v} @blur=${
            (e: FocusEvent) => {
              const newRow = {
                ...row,
                [key]: (e.target as HTMLTextAreaElement)['value']
              }
              console.log(newRow)
              // host.dataSource[idx] = newRow;
              // host.requestUpdate();
            }
          
          }></studs-textarea>`;
        }
      },
      {
        key: 'last_name',
        label: 'Last Name',
        editable: true
      },
      {
        key: 'email',
        label: 'Email',
        editable: true
      },
      {
        key: 'gender',
        label: 'Gender',
        filterable: {
          type: 'dropdown',
          options: [
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            }
          ]
        },
        render: (v: string, {
          row,
          key,
          idx,
          host
        }) => {
          const options = [
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            }
          ]
          return html`<studs-dropdown .options=${options} .value=${v} @change=${(e: CustomEvent) => {
            const newRow = {
              ...row,
              [key]: ((e.target as StudsDropdown).value as string)
            }
            console.log(newRow);
            // host.dataSource[idx] = newRow;
            // host.requestUpdate();
          }
          }></studs-dropdown>`
        }
      },
      {
        key: 'dob',
        label: 'Date of Birth',
        filterable: {
          type: 'datepicker'
        }
      },
      {
        key: 'ip',
        label: 'IP Address'
      }
    ],
    dataSource: [
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
          value: true
        },
        _switch: {
          label: 'Switch A',
          value: false
        },
        _bio: 'Deserunt aliqua sit ullamco anim ipsum proident et ullamco officia commodo anim quis id nostrud. Duis proident'
      },
      {
        id: 1,
        first_name: 'Alexys',
        last_name: 'Toy',
        email: 'Iva_Parisian@yahoo.com',
        dob: '02/2/2023',
        gender: 'male',
        ip: '235.124.161.47',
        _checkbox: {
          label: 'Second label',
          value: false
        },
        _switch: {
          label: 'Switch B',
          value: true
        },
        _bio: 'Commodo elit qui occaecat aute deserunt ullamco sunt commodo excepteur anim. Eiusmod minim reprehenderit aliquip ex Lorem incididunt elit eiusmod. Eu nulla do ullamco magna sunt aute nulla.'
      },
      {
        id: 2,
        first_name: 'Rodrigo',
        last_name: 'Bosco',
        dob: '09/24/2023',
        email: 'Jessica_Cole35@gmail.com',
        gender: 'female',
        ip: '175.73.241.77'
      },
      {
        id: 3,
        first_name: 'Alexa',
        last_name: 'Bergstrom',
        dob: '04/11/1985',
        email: 'Ollie.Mante36@gmail.com',
        gender: 'female',
        ip: '134.244.232.31'
      },
      {
        id: 4,
        first_name: 'Lolita',
        last_name: 'Ferry',
        email: 'Ezequiel_Kassulke@gmail.com',
        gender: 'male',
        ip: '121.159.48.194'
      },
      {
        id: 5,
        first_name: 'Jazmin',
        last_name: 'Torp',
        email: 'Grace_Upton@yahoo.com',
        gender: 'female',
        ip: '181.161.198.211'
      }
    ]
  }
};

export const Nested: Story = {
  args: {
    pageSize: 25,
    // itemsPerPageSelector: [10, 25, 50, 100],
    showBorders: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableInfiniteScroll: false,
    enableSelectionRows: true,
    enableFitWidthColumn: true,
    enablePagination: true,
    enableGlobalSearch: true,
    enableStickyHeader: true,
    enableSorting: true,
    disableColumnFilter: ['Id', 'First Name'],
    columns: [
      {
        key: 'id',
        label: 'Id',
        align: 'end',
        filterable: true,
      },
      {
        key: 'first_name',
        label: 'First Name',
        filterable: true
      },
      {
        key: 'last_name',
        label: 'Last Name'
      },
      {
        key: 'email',
        label: 'Email'
      },
      {
        key: 'gender',
        label: 'Gender'
      },
      {
        key: 'ip',
        label: 'IP Address'
      }
    ],
    dataSource: nestedDataSource(250)
  }
};

export const Infinite: Story = {
  args: {
    caption: 'Data Grid',
    pageSize: 10,
    // itemsPerPageSelector: [10, 25, 50, 100],
    showBorders: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableInfiniteScroll: true,
    enableSelectionRows: true,
    enableFitWidthColumn: true,
    enablePagination: true,
    enableGlobalSearch: true,
    enableStickyHeader: true,
    enableSorting: true,
    columns: [
      {
        key: 'id',
        label: 'Id',
        align: 'end',
        filterable: true,
      },
      {
        key: 'first_name',
        label: 'First Name',
      },
      {
        key: 'last_name',
        label: 'Last Name'
      },
      {
        key: 'email',
        label: 'Email'
      },
      {
        key: 'gender',
        label: 'Gender'
      },
      {
        key: 'ip',
        label: 'IP Address'
      }
    ],
    dataSource: dataSource(1000)
  }
};