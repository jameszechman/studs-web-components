import { StudsAvatarGroup } from '../../components/display/avatar-group.ts';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { size } from '../../utils/_argTypes.ts';
import { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: "Studs/Display/AvatarGroup",
  tags: ['autodocs'],
  render: (args: StudsAvatarGroup) => html`
    <studs-avatar-group 
      size=${ifDefined(args.size as string === 'default' ? 'medium' : args.size)} 
      max=${ifDefined(args.max)}
    >
      <studs-avatar name="Jennifer"></studs-avatar>
      <studs-avatar></studs-avatar>
      <studs-avatar name="NaN" source="https://thispersondoesnotexist.com"></studs-avatar>
      <studs-avatar name="Muse"></studs-avatar>
      <studs-avatar></studs-avatar>
      <studs-avatar name="Kandace" source="https://thispersondoesnotexist.com"></studs-avatar>
      <studs-avatar name="John Doe" source="https://thispersondoesnotexist.com"></studs-avatar>
      <studs-avatar name="Jolene"></studs-avatar>
    </studs-avatar-group>
  `,
  argTypes: {
    ...size,
    max: {
      control: {
        type: 'number'
      },
      description: "The maximum amount of avatars to show"
    }
  }
} satisfies Meta<StudsAvatarGroup>

export default meta;
type Story = StoryObj<StudsAvatarGroup>

export const Default: Story = {
  args: {
    size: 'medium',
    max: 6
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    max: 6
  }
}

export const Medium: Story = {
  args: {
    size: "medium",
    max: 6
  }
}

export const Large: Story = {
  args: {
    size: "large",
    max: 6
  }
}
