import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsList } from '../../components/display/list';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsListItem } from '../../components/display/list-item';

const meta = {
  title: 'Studs/Display/List',
  tags: ['autodocs'],
  render: (args) => html`
    <studs-list 
    size=${ifDefined(args.size as string === 'default' ? 'medium' : args.size)} 
    selected=${ifDefined(args.selected)} 
    as=${ifDefined(args.as)}
    direction=${ifDefined(args.direction)}
    icon=${ifDefined(args.icon)}
    >
        ${args.children}
    </studs-list>`,
  argTypes: {
    as: {
      name: 'as',
      type: { name: 'string', required: false },
      description: 'Type of the list',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' }
      },
      control: {
        type: 'select'
      },
      options: ['div', 'nav']
    },
    size: {
      name: 'size',
      type: { name: 'string', required: false },
      description: 'Size of the list',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      },
      control: {
        type: 'select'
      },
      options: ['default', 'small', 'medium', 'large']
    },
    selected: {
      name: 'selected',
      type: { name: 'number', required: false },
      description: 'Index of the selected item',
      table: {
        type: { summary: 'number' }
      }
    },
    direction: {
      name: 'direction',
      type: {name: 'string', required: false},
      description: 'If expandable, determines the placement of the icon',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'start'}
      },
      control: {
        type: 'select'
      },
      options: ['default', 'start', 'end']
    },
    icon: {
      name: 'icon',
      type: {name: 'string', required: false},
      description: 'If expandable, determines the icon',
      table: {
        type: {summary: 'string'},
        defaultValue: {summary: 'arrow_right'},
      },
      control: {
        type: 'select'
      },
      options: ['default', 'arrow_right', 'chevron_right']
    },
    children: {
      name: 'children',
      type: { name: 'string', required: false },
      description: 'List of items',
      table: {
        type: { summary: 'string' }
      }
    }
  }
} satisfies Meta<StudsList>;

export default meta;
type Story = StoryObj<StudsList & { children: any }>;

export const Default: Story = {
  args: {
    children: html`
        <studs-list-item>
            <span slot='prefix'>🍎</span>
            <span>Apple</span>
            <span slot='secondary'>Best Seller!</span>
            <span slot='suffix'>$1.00</span>
            <span slot='action'>🛒</span>
        </studs-list-item>
        <studs-list-item>
            <span slot='prefix'>🍊</span>
            <span>Orange</span>
            <span slot='suffix'>$1.00</span>
            <span slot='action'>🛒</span>
        </studs-list-item>
        <studs-list-item>
            <span slot='prefix'>🍇</span>
            <span>Grape</span>
            <span slot='suffix'>$1.00</span>
            <span slot='action'>🛒</span>
        </studs-list-item>
        <studs-list-item>
            <span slot='prefix'>🍌</span>
            <span>Banana</span>
            <span slot='suffix'>$1.00</span>
            <span slot='action'>🛒</span>
        </studs-list-item>
      `
  }
};

export const Nested: Story = {
  args: {
    children: html`
            <studs-list-item>
                <img style="border-radius: 100%; width: 20px; height: 20px;" src="https://www.thispersondoesnotexist.com" slot='prefix' />
                Jane Doe
                <studs-icon icon='delete' slot='action'></studs-icon>
                <studs-icon icon='save' slot='action'></studs-icon>
            </studs-list-item>
            <studs-list-item>
                <img style="border-radius: 100%; width: 20px; height: 20px;" src="https://www.thispersondoesnotexist.com" slot='prefix' />
                Jane Doe
                <studs-icon icon='delete' slot='action'></studs-icon>
                <studs-icon icon='save' slot='action'></studs-icon>
            </studs-list-item>
            <studs-list-item>
                <img style="border-radius: 100%; width: 20px; height: 20px;" src="https://www.thispersondoesnotexist.com" slot='prefix' />
                Jane Doe
                <studs-icon icon='delete' slot='action'></studs-icon>
                <studs-icon icon='save' slot='action'></studs-icon>
                <studs-list slot='list'>
                    <studs-list-item>Last Edited <p slot='suffix'>Today</p></studs-list-item>
                    <studs-list-item>Created <p slot='suffix'>12/01/23</p></studs-list-item>
                    <studs-list-item>Due by <p slot='suffix'>12/01/24</p>
                    <studs-list slot='list'>
                    <studs-list-item>Status<p slot='suffix'>Valid</p>
                    </studs-list>
                    </studs-list-item>
                </studs-list>
            </studs-list-item>
        `
  }
};

export const Selected: Story = {
  render: (args) => {
    return html`<studs-list 
            size=${ifDefined(args.size)} 
            selected=${ifDefined(args.selected)} 
            as=${ifDefined(args.as)}
            >
                <studs-list-item>
                    Item 1
                    <studs-icon icon='delete' slot='action'></studs-icon>
                    <studs-icon icon='save' slot='action'></studs-icon>
                </studs-list-item>
                <studs-list-item>
                    Item 2
                    <studs-icon icon='delete' slot='action'></studs-icon>
                    <studs-icon icon='save' slot='action'></studs-icon>
                </studs-list-item>
                <studs-list-item selected>
                    Item 3
                    <studs-icon icon='delete' slot='action'></studs-icon>
                    <studs-icon icon='save' slot='action'></studs-icon>
                </studs-list-item>
            </studs-list>`;
  },
  args: {
    selected: true,
  }
};

export const Disabled: Story = {
  args: {
    children: html`
            <studs-list-item>
                Item 1
                <studs-icon icon='delete' slot='action'></studs-icon>
                <studs-icon icon='save' slot='action'></studs-icon>
            </studs-list-item>
            <studs-list-item disabled>
                Item 2
                <studs-icon icon='delete' slot='action'></studs-icon>
                <studs-icon icon='save' slot='action'></studs-icon>
            </studs-list-item>
            <studs-list-item>
                Item 3
                <studs-icon icon='delete' slot='action'></studs-icon>
                <studs-icon icon='save' slot='action'></studs-icon>
            </studs-list-item>
        `
  }
};

export const WithCheckboxes: Story = {
  args: {
    as: 'div',
    size: 'small',
    children: html`
            <studs-list-item>
                <studs-checkbox slot='prefix'></studs-checkbox>
                Item 1
            </studs-list-item>
            <studs-list-item>
                <studs-checkbox slot='prefix'></studs-checkbox>
                Item 2
            </studs-list-item>
            <studs-list-item>
                <studs-checkbox slot='prefix'></studs-checkbox>
                Item 3
            </studs-list-item>
        `
  }
};

export const CollapsableNav: Story = {
  args: {
    as: 'nav',
    direction: 'end',
    icon: 'chevron_right',
    children: html`
      <studs-list-item>
        Product Name
      </studs-list-item>
      <studs-list-item>
        Product Name
      </studs-list-item>
      <studs-list-item>
        Product Name
        <studs-list slot='list'>
          <studs-list-item>Product Name</studs-list-item>
          <studs-list-item>Product Name</studs-list-item>
          <studs-list-item>Product Name
            <studs-list slot='list'>
              <studs-list-item>Product Name</studs-list-item>
            </studs-list>
          </studs-list-item>
        </studs-list>
      </studs-list-item>
    `
  }
}