import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsCard } from '../../components/display/card';

const meta: Meta = {
  title: 'Studs/Surfaces/Card',
  tags: ['autodocs'],
  render: (args: any) => html` <studs-card
    type=${args.type}
    placement=${args.placement}
  >
    <img
      slot="media"
      src="https://via.placeholder.com/600x600"
    />
    <header slot="title">
      <h2>Title</h2>
      This is additional title content
    </header>

    <div slot="content">
        This is my custom body content. Lorem ipsum dolor sit amet nullam dolore vel velit facilisi aliqua mattis.
    </div>

    <div slot="footer">
      <studs-button>Button</studs-button>
      <studs-button button-type="secondary">Button</studs-button>
    </div>
  </studs-card>`,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'compact'],
      defaultValue: 'vertical',
    },
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'middle', 'none'],
      defaultValue: 'top',
    },
  },
  decorators: [
    (story, context) => {
      const { type } = context.args;
      if (type === 'vertical') {
        context.args.placement = ['top', 'middle', 'none'].includes(context.args.placement) ? context.args.placement : 'top';
      } else if (type === 'horizontal') {
        context.args.placement = ['left', 'right', 'none'].includes(context.args.placement) ? context.args.placement : 'left';
      }
      return story();
    },
  ],
} satisfies Meta<StudsCard>;

export default meta;

type Story = StoryObj<StudsCard>;

export const Default: Story = {
  args: {
    type: 'vertical',
    placement: 'top',
  },
};

export const Vertical: Story = {
  args: {
    type: 'vertical',
    placement: 'middle',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['vertical'],
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'middle'],
    },
  },
};

export const Horizontal: Story = {
  args: {
    type: 'horizontal',
    placement: 'left',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal'],
    },
    placement: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
};

export const Compact: Story = {
  args: {
    type: 'compact',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['compact'],
    },
    placement: {
      control: { type: 'select' },
      options: [''],
    },
  },
};

export const NoMedia: Story = {
  args: {
    type: 'horizontal',
    placement: 'none',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'compact'],
    },
    placement: {
      control: { type: 'select' },
      options: ['none'],
    },
  },
};
