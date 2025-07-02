import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { StudsToaster } from '../../components/overlays/toaster';
import { StudsToast } from '../../components/overlays/toast';

const meta = {
  title: 'Studs/Overlays/Toasts',
  tags: ['autodocs'],
  render: (args) => {
    const toasterRef:Ref<StudsToaster> = createRef();
    return html`
      <studs-toaster ${ref(toasterRef)}></studs-toaster>
      <studs-button @click=${() => toasterRef?.value?.createToast(args)}>Create Toast</studs-button>
    `
  },
  argTypes: {
    heading: {
      control: {
        type: 'text'
      }
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['info', 'success', 'warning', 'error']
    },
    message: {
      control: {
        type: 'text'
      }
    },
    closeable: {
      control: {
        type: 'boolean'
      }
    }
  }
} as Meta<StudsToast>;

export default meta;
type Story = StoryObj<StudsToast>;

export const Info: Story = {
  args: {
    type: 'info',
    message: 'This is an info toast',
  }
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'This is a success toast',
  }
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'This is a warning toast',
  }
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'This is an error toast',
  }
};
export const WithHeading: Story = {
  args: {
    type: 'info',
    heading: 'Heading',
    message: 'This is an info toast',
  }
};
