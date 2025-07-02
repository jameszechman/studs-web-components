import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { StudsResizer } from '../../components/display/resizer';

const meta = {
  title: 'Studs/Display/Resizer',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-resizer
      style="height: 300px; display: block;"
      position=${ifDefined(args.position)}
      ?disabled=${args.disabled}
      direction="${ifDefined(args.direction) === 'default' ? 'inline' : args.direction}"
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      ?default-cursor=${args.defaultCursor}
      divider-width=${ifDefined(args.dividerWidth)}
      @resize-start=${e => console.log('resize-start', e.detail)}
      @resize=${e => console.log('resize', e.detail)}
      @resize-end=${e => console.log('resize-end', e.detail)}
    >${unsafeHTML(args.children)}
    </studs-resizer
    >`,
  argTypes: {
    direction: {
      control: {
        type: 'select'
      },
      options: ['default', 'inline', 'block'],
      description: 'The direction of the resizer.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'inline' }
      }
    },
    position: {
      control: {
        type: 'number'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    min: {
      control: {
        type: 'number'
      }
    },
    max: {
      control: {
        type: 'number'
      }
    },
    defaultCursor: {
      control: {
        type: 'boolean'
      }
    },
    dividerWidth: {
      control: {
        type: 'number'
      }
    }
  }
} satisfies Meta<StudsResizer & { children: string }>;

export default meta;

type Story = StoryObj<StudsResizer & { children: string }>;

export const inline: Story = {
  args: {
    direction: 'inline',
    position: 25,
    disabled: false,
    children: `
      <div><h3>Panel One</h3><div>Padded Content</div></div>
      <div>
      <h1>This is a Heading</h1>
      <p>This is a paragraph.</p>
      <p>This is another paragraph.</p>
      <img src="https://placehold.co/400" alt="Image 1">

      <h1>This is another Heading</h1>
      <p>This is a paragraph under the second heading.</p>
      <img src="https://placehold.co/400" alt="Image 2">

      <h1>Yet another Heading</h1>
      <p>This is a paragraph under the third heading.</p>
      <img src="https://placehold.co/400" alt="Image 3">
      </div>
    `
  }
};

export const block: Story = {
  args: {
    direction: 'block',
    children: `
      <div size="50">Panel One</div>
      <div>
      <h1>This is a Heading</h1>
      <p>This is a paragraph.</p>
      <p>This is another paragraph.</p>
      <img src="https://placehold.co/400" alt="Image 1">

      <h1>This is another Heading</h1>
      <p>This is a paragraph under the second heading.</p>
      <img src="https://placehold.co/400" alt="Image 2">

      <h1>Yet another Heading</h1>
      <p>This is a paragraph under the third heading.</p>
      <img src="https://placehold.co/400" alt="Image 3">
      </div>
    `
  }
};

export const DefaultCursor: Story = {
  render: () => html`<div style="height: 400px; display: block">
    <studs-resizer default-cursor direction="inline" @resize=${(e: CustomEvent) => console.log(e.detail)}>
      <div>Panel One</div>
      <studs-resizer default-cursor direction="block" style="height: 100%">
        <div>Panel One</div>
        <div>
          Panel Two
        </div>
      </studs-resizer>
    </studs-resizer>
  </div>`
};

export const Single: Story = {
  args: {
    direction: 'inline',
    position: 100,
    dividerWidth: 12,
    children: `
      <div>
      <h1>This is a Heading</h1>
      <p>This is a paragraph.</p>
      <p>This is another paragraph.</p>
      <img src="https://placehold.co/400" alt="Image 1">

      <h1>This is another Heading</h1>
      <p>This is a paragraph under the second heading.</p>
      <img src="https://placehold.co/400" alt="Image 2">

      <h1>Yet another Heading</h1>
      <p>This is a paragraph under the third heading.</p>
      <img src="https://placehold.co/400" alt="Image 3">
      </div>
      <span
      slot="divider-0"
      style="background: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-grip-block' viewBox='0 0 16 16' part='svg'%3E%3Cpath d='M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'%3E%3C/path%3E%3C/svg%3E&quot;) 45% 50% no-repeat white; width: 0.725rem; height: 100%; border-inline: 1px solid rgb(228, 228, 231); z-index: 1; pointer-events: none; display: block;"
    ></span>
    `
  }
};

export const TwoPanel: Story = {
  render: () => html`<div style="height: 400px; display: block">
    <studs-resizer direction="inline" @resize=${(e: CustomEvent) => console.log(e.detail)}>
      <div>Panel One</div>
      <studs-resizer direction="block" style="height: 100%">
        <div>Panel One</div>
        <div>
          Panel Two
        </div>
      </studs-resizer>
    </studs-resizer>
  </div>`
};

export const ThreePanel: Story = {
  args: {
    children: `
      <div data-size="30">Column One</div>
      <div data-size="30">
        <studs-resizer direction="block">
          <div data-size="50">Panel One</div>
          <div>Panel Two</div>
        </studs-resizer>
      </div>
      <div data-size="40">
        <studs-resizer direction="block">
          <div data-size="30">
            <studs-resizer direction="inline">
              <div size="50">Panel One</div>
              <div>Panel Two</div>
            </studs-resizer>
          </div>
          <div data-size="70">
            <h3>Row Two</h3>
          <p>Lorem ipsum dolor sit amet cras et nisl quisque iaculis augue cursus hac adipiscing. Sagittis pretium nulla malesuada orci purus tellus turpis nunc eget auctor est interdum. Dictum eleifend eiusmod do auctor odio volutpat donec nec odio. Nulla quis pulvinar velit nisi viverra tortor nec ultrices elit hac sagittis hac. Mollis libero luctus fermentum justo nibh est integer eget pellentesque quam iaculis pretium nulla.</p>

          </div>
        </studs-resizer>
      </div>
    `
  }
};
