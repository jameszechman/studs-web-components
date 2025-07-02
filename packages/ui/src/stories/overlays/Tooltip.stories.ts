import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsTooltip } from '../../components/overlays/tooltip';
import { position } from '../../utils/_argTypes';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta = {
  title: 'Studs/Overlays/Tooltip',
  tags: ['autodocs'],
  render: (args) => html`
    <studs-button button-type="primary">
      Button
      <studs-tooltip
        position=${ifDefined((args.position as string) === 'default' ? 'bottom' : args.position)}
        ?disabled=${args.disabled}
        query=${ifDefined(args.query)}
      >${unsafeHTML(args.children)}
      </studs-tooltip
      >
    </studs-button>`,
  argTypes: {
    ...position
  }
} as Meta<StudsTooltip>;

export default meta;
type Story = StoryObj<StudsTooltip & { children: any }>;

export const Default: Story = {
  args: {
    position: 'bottom',
    disabled: false,
    children: `
      Hello!
    `
  }
};

export const Disabled: Story = {
  args: {
    position: 'bottom',
    children: `
      Hello!
    `,
    disabled: true
  }
};

export const Standalone: Story = {
  render: () =>
    html`<div style="display: inline-block">
      <p id="attach_here">Hover over me</p>
      <studs-tooltip query="#attach_here" position="right"
        >Standalone</studs-tooltip
      >
    </div>`
};

export const Containered: Story = {
  render: (args) => html`
    <studs-resizer style="height: 300px; display: block;" direction="inline">
      <studs-resizer-pane fullwidth size="200">
        <studs-accordion size="medium" variant="borderless" direction="end">
          <studs-accordion-item>
            <div slot="toggle">Accordion One</div>
            <div>
              <studs-button button-type="primary">
                Button
                <studs-tooltip
                  position=${ifDefined(args.position)}
                  ?disabled=${args.disabled}
                  query=${ifDefined(args.query)}
                >${args.children}
                </studs-tooltip
                >
              </studs-button>
              <studs-button button-type="primary">
                Button
                <studs-tooltip
                  position=${ifDefined(args.position)}
                  ?disabled=${args.disabled}
                  query=${ifDefined(args.query)}
                >${args.children}
                </studs-tooltip
                >
              </studs-button>
            </div>
          </studs-accordion-item>
        </studs-accordion>
      </studs-resizer-pane>
    </studs-resizer>`,
  args: {
    position: 'bottom',
    disabled: false,
    children: `
      Hello!
    `
  }
};
