import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsDropdown } from '../../components/inputs/dropdown';
import { formArgs } from '../../utils/_argTypes';

const meta = {
  title: 'Studs/Inputs/Dropdown',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-dropdown
    name=${ifDefined(args.name)}
    placeholder=${ifDefined(args.placeholder)}
    status=${ifDefined(args.status)}
    icon=${ifDefined(args.icon)}
    size=${ifDefined(args.size)}
    type=${ifDefined(args.type)}
    ?disabled=${args.disabled}
    ?required=${args.required}
    options=${JSON.stringify(args.options)}
    value=${JSON.stringify(args.value)}
    @change=${(e: Event) => console.log((e.target as HTMLInputElement).value)}
  ></studs-dropdown>
  `,
  argTypes: {
    ...formArgs,
    icon: {
      control: {
        type: 'text'
      }
    },
    type: {
      control: {
        type: 'select'
      },
      options: ['default', 'search', 'multi'],
      description: 'The type of the dropdown',
      table: {
        type: {
          summary: 'string',
          detail: `"default" | "search" | "multi"`
        },
        defaultValue: { summary: 'default' }
      }
    },
    options: {
      control: {
        type: 'object'
      },
      table: {
        type: {
          summary: 'Option[]',
          detail: `interface Option {
            label: string;
            value: string;
            icon?: Icon;
          }`
        }
      }
    },
    value: {
      control: {
        type: 'object'
      },
      table: {
        type: {
          summary: 'string | string[]',
        }
      }
    },
    size: {
      control: {
        type: 'select'
      },
      options: ['small', 'medium'],
      description: 'The size of the dropdown',
      table: {
        type: {
          detail: `"small" | "medium"`
        },
        defaultValue: { summary: 'medium' }
      }
    }
  }
} satisfies Meta<StudsDropdown>;

export default meta;

type Story = StoryObj<StudsDropdown>;

export const Default: Story = {
  args: {
    options: [
      { value: '1', label: 'Cat' },
      { value: '2', label: 'Dog' },
      { value: '3', label: 'Bird' },
      { value: '4', label: 'Tiger' },
      {
        value: '5',
        label: 'The Itsy Bitsy Spider (also known as The Incy Wincy Spider in Australia, Great Britain, and other anglophone countries) is a popular nursery rhyme, folksong, and fingerplay '
      }
    ],
    value: '2',
    size: 'medium'
  }
};

export const WithErrorState: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ],
    value: '2',
    size: 'medium',
    status: 'error'
  }
};

export const WithWarningState: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ],
    value: '2',
    size: 'medium',
    status: 'warning'
  }
};

export const WithErrorTexts: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ],
    value: '2',
    size: 'medium',
    status: 'error'
  }
};

export const WithWarningTexts: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ],
    value: '2',
    size: 'medium',
    status: 'warning'
  }
};

export const WithASuccessText: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ],
    value: '2',
    size: 'medium',
    status: 'success'
  }
};

export const Groups: Story = {
  args: {
    options: [
      {
        name: 'Group 1',
        options: [
          { value: '1', label: 'Cat' },
          { value: '2', label: 'Dog' }
        ]
      },
      {
        name: 'Group 2',
        options: [
          { value: '5', label: 'Lion' },
          { value: '9', label: 'Dog' }
        ]
      }
    ]
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ],
    value: '3'
  }
};

export const WithoutValue: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ]
  }
};

export const Searchable: Story = {
  args: {
    type: 'search',
    options: [
      { value: '1', label: 'Cat' },
      { value: '2', label: 'Dog' },
      { value: '3', label: 'Rat' },
      { value: '4', label: 'Monkey' }
    ],
    value: '2'
  }
};

export const MultiSelect: Story = {
  args: {
    type: 'multi',
    options: [
      { value: '1', label: 'Cat' },
      { value: '2', label: 'Dog' },
      { value: '3', label: 'Rat' },
      { value: '4', label: 'Monkey' },
      { value: '5', label: 'Lion' },
      { value: '6', label: 'Tiger' },
      { value: '7', label: 'Bear' },
      { value: '8', label: 'Elephant' },
      { value: '9', label: 'Giraffe' },
      { value: '10', label: 'Penguin' },
      { value: '11', label: 'Panda' },
      { value: '12', label: 'Pig' },
      { value: '13', label: 'Horse' },
      { value: '14', label: 'Cow' },
      { value: '15', label: 'Sheep' },
      { value: '16', label: 'Goat' },
      { value: '17', label: 'Chicken' },
      { value: '18', label: 'Duck' },
      { value: '19', label: 'Goose' },
      { value: '20', label: 'Turkey' },
      { value: '21', label: 'Dove' },
      { value: '22', label: 'Owl' },
      { value: '23', label: 'Parrot' },
      { value: '24', label: 'Eagle' },
      { value: '25', label: 'Falcon' },
      { value: '26', label: 'Hawk' },
      { value: '27', label: 'Pigeon' },
      { value: '28', label: 'Raven' },
      { value: '29', label: 'Robin' },
      { value: '30', label: 'Sparrow' }
    ],
    value: [
      '2', '3', '4', '5'
    ]
  }
};

export const MultiSelectGroup: Story = {
  args: {
    type: 'multi',
    options: [
      {
        name: 'Group 1',
        options: [
          { value: '1', label: 'Cat' },
          { value: '2', label: 'Dog' },
          { value: '3', label: 'Rat' },
          { value: '4', label: 'Monkey' }
        ]
      },
      {
        name: 'Group 2',
        options: [
          { value: '5', label: 'Lion' },
          { value: '6', label: 'Tiger' },
          { value: '7', label: 'Bear' },
          { value: '8', label: 'Elephant' },
          { value: '9', label: 'Dog' }
        ]
      }
    ]
  }
};

export const DropdownWithIcon: Story = {
  args: {
    icon: 'search',
    options: [
      { value: '1', label: 'Cat' },
      { value: '2', label: 'Dog' },
      { value: '3', label: 'Rat' },
      { value: '4', label: 'Monkey' }
    ],
    value: '2'
  }
};

export const OptionsWithIcon: Story = {
  args: {
    options: [
      { value: '1', label: 'Cat', icon: 'apps' },
      { value: '2', label: 'Dog', icon: 'arrow_circle_right' },
      { value: '3', label: 'Rat', icon: 'terminal' },
      { value: '4', label: 'Monkey', icon: '123' }
    ],
    value: '2'
  }
};

export const OptionsWithImage: Story = {
  args: {
    options: [
      { value: '1', label: 'Cat', image: 'https://picsum.photos/200' },
      { value: '2', label: 'Dog', image: 'https://picsum.photos/200' },
      { value: '3', label: 'Rat', image: 'https://picsum.photos/200' },
      { value: '4', label: 'Monkey', image: 'https://picsum.photos/200' }
    ],
    value: '2'
  }
};
