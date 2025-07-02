import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsAvatar } from '../../components/display/avatar.ts';
import { ifDefined } from 'lit/directives/if-defined.js';
import { icon, size } from '../../utils/_argTypes';

const meta = {
  title: 'Studs/Display/Avatar',
  tags: ['autodocs'],
  render: (args) => html`<studs-avatar
    source=${ifDefined(args.source)}
    name=${ifDefined(args.name)}
    icon-fallback=${ifDefined(args.iconFallback)}
    size=${ifDefined(args.size as string === 'default' ? 'medium' : args.size)}
    variant=${ifDefined(args.variant)}
    enable-badge=${ifDefined(args.enableBadge)}
    badge-position=${ifDefined(args.badgePosition as string === 'default' ? 'bottom-right' : args.badgePosition)}
    badge-status=${ifDefined(args.badgeStatus as string === 'default' ? 'online' : args.badgeStatus)}
    ?selectable="${args.selectable}"
  ></studs-avatar>`,
  argTypes: {
    ...size,
    iconFallback: icon.icon,
    source: {
      control: {
        type: 'text',
      },
      description: `The avatar url`,
    },
    name: {
      control: {
        type: 'text',
      },
      description: `The name of avatar`,
    },
    enableBadge: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    badgePosition: {
      control: { type: 'select' },
      options: ['default', 'top-right', 'top-left', 'bottom-right', 'bottom-left'],
      defaultValue: 'bottom-right',
      description: 'The position of the badge',
      table: {
        type: {
          summary:'string',
          detail: `"top-right" | "top-left" | "bottom-right" | "bottom-left"`,
        },
        defaultValue: { summary: 'bottom-right' },
      }
    },
    badgeStatus: {
      control: { type: 'select' },
      options: ['default', 'online', 'busy', 'offline'],
      defaultValue: 'online',
      description: 'The status of the badge',
      table: {
        type: {
          summary:'string',
          detail: `"online" | "busy" | "offline"`,
        },
        defaultValue: { summary: 'online' },
      }
    },
    selectable: {
      control: {type: Boolean},
      defaultValue: false
    }
  },
} satisfies Meta<StudsAvatar>;

export default meta;
type Story = StoryObj<StudsAvatar>;

export const Default: Story = {
  args: {
    name: 'Admin',
    size: 'medium',
    source: 'https://www.thispersondoesnotexist.com/',
  },
};


export const Text: Story = {
  args: {
    name: 'Admin',
    size: 'large',
  },
  render: (args) => {
    return html`<div style="display: flex; gap: 8px; padding: 8px">
      <studs-avatar
        source=${ifDefined(args.source)}
        name=${ifDefined(args.name)}
        size="small"
      ></studs-avatar>
      <studs-avatar
        source=${ifDefined(args.source)}
        name="Editor"
        size="medium"
      ></studs-avatar>
      <studs-avatar
        source=${ifDefined(args.source)}
        name="John"
        size="large"
      ></studs-avatar>
    </div> `;
  },
};

export const Size: Story = {
  args: {
    name: 'Admin',
    size: 'large',
    source: 'https://placehold.co/40',
  },
  render: (args) => {
    return html`<div style="display: flex; gap: 8px; padding: 8px">
      <studs-avatar
        source=${ifDefined(args.source)}
        name=${ifDefined(args.name)}
        size="small"
      ></studs-avatar>
      <studs-avatar
        source=${ifDefined(args.source)}
        name=${ifDefined(args.name)}
        size="medium"
      ></studs-avatar>
      <studs-avatar
        source=${ifDefined(args.source)}
        name=${ifDefined(args.name)}
        size="large"
      ></studs-avatar>
    </div> `;
  },
};

export const IconFallback: Story = {
  args: {
    size: 'large',
    source: 'https://placehold.co/40',
  },
  render: (args) => {
    return html`
      <div style="display: flex; gap: 8px; padding: 8px">
        <studs-avatar
          icon-fallback="home"
          name=${ifDefined(args.name)}
          size="small"
        ></studs-avatar>
        <studs-avatar
          icon-fallback="book"
          name=${ifDefined(args.name)}
          size="medium"
        ></studs-avatar>
        <studs-avatar
          icon-fallback="star"
          name=${ifDefined(args.name)}
          size="large"
        ></studs-avatar>
      </div>
    `;
  },
};

export const IconFallbackNoIcon: Story = {
  args: {
    size: 'large',
  },
  render: args => html`<studs-avatar size=${args.size}></studs-avatar>`
}

export const Selectable: Story = {
  args: {
    selectable: true,
    name: "Jorge",
    source: "https://thispersondoesnotexist.com"
  }
}

export const Badge: Story = {
  args: {
    name: 'Admin',
    size: 'large',
    source: 'https://placehold.co/40',
  },
  render: (args) => {
    return html`
      <div style="display: flex; gap: 8px; padding: 8px">
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="small"
          enable-badge="true"
          badge-position="top-left"
          badge-status="online"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="medium"
          enable-badge="true"
          badge-position="top-left"
          badge-status="offline"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="large"
          enable-badge="true"
          badge-position="top-left"
          badge-status="busy"
        ></studs-avatar>
      </div>

      <div style="display: flex; gap: 8px; padding: 8px">
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="small"
          enable-badge="true"
          badge-position="top-right"
          badge-status="online"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="medium"
          enable-badge="true"
          badge-position="top-right"
          badge-status="offline"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="large"
          enable-badge="true"
          badge-position="top-right"
          badge-status="busy"
        ></studs-avatar>
      </div>

      <div style="display: flex; gap: 8px; padding: 8px">
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="small"
          enable-badge="true"
          badge-position="bottom-left"
          badge-status="online"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="medium"
          enable-badge="true"
          badge-position="bottom-left"
          badge-status="offline"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="large"
          enable-badge="true"
          badge-position="bottom-left"
          badge-status="busy"
        ></studs-avatar>
      </div>

      <div style="display: flex; gap: 8px; padding: 8px">
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="small"
          enable-badge="true"
          badge-position="bottom-right"
          badge-status="online"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="medium"
          enable-badge="true"
          badge-position="bottom-right"
          badge-status="offline"
        ></studs-avatar>
        <studs-avatar
          source=${ifDefined(args.source)}
          name=${ifDefined(args.name)}
          size="large"
          enable-badge="true"
          badge-position="bottom-right"
          badge-status="busy"
        ></studs-avatar>
      </div>
    `;
  },
};
