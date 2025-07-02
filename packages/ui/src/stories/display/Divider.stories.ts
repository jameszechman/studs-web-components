import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsDivider } from '../../components/display/divider';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
  title: 'Studs/Display/Divider',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-divider
      size=${ifDefined(args.size as string === 'default' ? 'small' : args.size)}
      orientation=${ifDefined(args.orientation as string === 'default' ? 'inline' : args.orientation)}
      align=${ifDefined(args.align as string === 'default' ? 'center' : args.align)}
      variant=${ifDefined(args.variant as string === 'default' ? 'solid' : args.variant)}
    >${args.children}
    </studs-divider>`,
  argTypes: {
    size: {
      options: ['default', 'small', 'medium', 'large', 'extraLarge'],
      control: { type: 'select' },
      defaultValue: 'small',
      table: {
        defaultValue: { summary: 'small' },
        type: { summary: 'string' }
      },
      description: 'Define the size of Divider'
    },
    align: {
      options: ['default', 'start', 'center', 'end'],
      control: { type: 'select' },
      defaultValue: 'center',
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: 'string' }
      },
      description: 'Define position content of Divider'
    },
    orientation: {
      options: ['default', 'inline', 'block'],
      control: { type: 'select' },
      defaultValue: 'inline',
      table: {
        defaultValue: { summary: 'inline' },
        type: { summary: 'string' }
      },
      description: 'Define the position of a Divider'
    },
    variant: {
      options: ['default', 'solid', 'dashed'],
      control: {type: 'select'},
      defaultValue: 'solid',
      table: {
        defaultValue: {summary: 'solid'},
        type: {summary: 'solid | dashed'}
      },
      description: 'Define the variant of a Divider'
    }

  }
} satisfies Meta<StudsDivider>;

export default meta;
type Story = StoryObj<StudsDivider>;

export const Default: Story = {
  args: {
    size: 'small',
    orientation: 'inline',
    children: 'Lorem ipsum',
  }
};
