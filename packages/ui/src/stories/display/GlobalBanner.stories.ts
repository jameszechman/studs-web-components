import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsGlobalBanner } from '../../components/display/global-banner';

const meta = {
  title: 'Studs/Display/GlobalBanner',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-global-banner
      type=${args.type}
      icon=${ifDefined(args.icon)}
      placement=${args.placement}
      ?open=${args.open}
      ?dismissable=${args.dismissable}
    >
      <strong class="title">${args.title}</strong>
      <div class="description">${args.description}</div>
    </studs-global-banner>
  `,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error'],
    },
    icon: { control: 'text' },
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'center'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    dismissable: { control: 'boolean' },
  },
} satisfies Meta<StudsGlobalBanner>;

export default meta;
type Story = StoryObj<StudsGlobalBanner>;

export const Default: Story = {
  args: {
    type: 'info',
    icon: 'info',
    placement: 'left',
    title: 'Title',
    description: 'Alert Description',
    open: true,
    dismissable: true,
  },
};

export const Controlled: Story = {
  render: (args: any) => html`
    <studs-global-banner
      type=${args.type}
      icon=${ifDefined(args.icon)}
      placement=${args.placement}
      ?open=${args.open}
      ?dismissable=${args.dismissable}
      id="banner-1"
    >
      <strong class="title">${args.title}</strong>
      <div class="description">${args.description}</div>
    </studs-global-banner>
    <studs-button @click=${onClick} button-type="link"
      >Close banner</studs-button
    >
  `,
  args: {
    type: 'info',
    icon: 'info',
    placement: 'left',
    title: 'Title',
    description: 'Alert Description',
    open: true,
    dismissable: true,
  },
};

const onClick = () => {
  const banner = document.querySelector(
    '#banner-1'
  ) as unknown as StudsGlobalBanner;
  if (banner) {
    banner.open = false;
  }
};
