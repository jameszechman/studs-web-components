import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsMenu } from '../../components/navigation/menu.ts';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
  title: 'Studs/Navigation/Menu',
  tags: ['autodocs'],
  // @ts-ignore
  render: (args) => html`
    <studs-menu cols=${ifDefined(args.cols)} type=${ifDefined(args.type)} position="${ifDefined(args.position)}">${unsafeHTML(args.children)}</studs-menu>`
} satisfies Meta<StudsMenu>;

export default meta;

type Story = StoryObj<StudsMenu>;

export const Basic: Story = {
  args: {
    children: `<button slot="trigger">Menu</button>
            <a href="#">Long Item 1</a>
            <a href="#">Item 2</a>
            <studs-divider></studs-divider>
            <a href="#">Item 3</a>`

  }
};

export const UsingMenuComponents: Story = {
    args: {
        children: `
            <studs-button slot="trigger" icon="expand_more" icon-position="end" >Menu</studs-button>
            <studs-menu-title slot="title">Menu</studs-menu-title>
            <studs-menu-label>Buttons</studs-menu-label>
            <studs-menu-item @click="${(e: Event) => console.log(e)}"><studs-icon slot="prefix" icon="search"></studs-icon>Item 1</studs-menu-item>
            <studs-menu-item @click="${() => alert('clicked')}"><studs-icon slot="prefix" icon="search"></studs-icon>Item 2</studs-menu-item>
            <studs-menu-label>Links</studs-menu-label>
            <studs-menu-item href="https://www.strongtie.com">Item 3</studs-menu-item>
            <studs-menu-item href="https://www.strongtie.com"><studs-icon slot="prefix" icon="search"></studs-icon>Item 4</studs-menu-item>
        `
    }
};

export const MenuWithToolTips: Story = {
  args: {
    children: `
      <studs-button slot="trigger" icon="expand_more" icon-position="end" >Menu</studs-button>
            <studs-menu-title slot="title">Menu<studs-tooltip position="right">Title</studs-tooltip></studs-menu-title>
            <studs-menu-label>Buttons<studs-tooltip position="right">Action Menu Items</studs-tooltip></studs-menu-label>
            <studs-menu-item @click="${(e: Event) => console.log(e)}"><studs-icon slot="prefix" icon="search"></studs-icon>Item 1<studs-tooltip position="right">Item</studs-tooltip></studs-menu-item>
            <studs-menu-item @click="${() => alert('clicked')}"><studs-icon slot="prefix" icon="info"></studs-icon>Item 2<studs-tooltip position="right">Item</studs-tooltip></studs-menu-item>
            <studs-menu-label>Links<studs-tooltip position="right">Link Menu Items</studs-tooltip></studs-menu-label>
            <studs-menu-item href="https://www.strongtie.com"><studs-icon slot="prefix" icon="home"></studs-icon><div>Inline Tooltip Item<studs-tooltip position="right">Inline Tooltip Item</studs-tooltip></div></studs-menu-item>
            <studs-menu-item href="https://www.strongtie.com"><studs-icon slot="prefix" icon="search"></studs-icon>Item 4<studs-tooltip position="right">Item</studs-tooltip></studs-menu-item>
    `
  }
}

export const Grid: Story = {
  args: {
    cols: 2,
    position: 'right',
    children: `
            <studs-button button-type="icon" slot="trigger" icon="menu"></studs-button>
            <studs-menu-title slot="title">Menu <studs-button button-type="close" icon="close" slot="actions"></studs-button></studs-menu-title>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
    `
  }
}

export const Waffle: Story = {
  args: {
    cols: 3,
    children: `
      <studs-button button-type="icon" slot="trigger" icon="apps"></studs-button>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
      <studs-icon icon="apps" size="large"></studs-icon>
`
  }

}

export const AccordionMenu: Story = {
  args: {
    children: `
      <studs-button  slot="trigger" icon="expand_more" icon-position="end" >Menu</studs-button>
      <studs-accordion>
        <studs-accordion-item>
          <div slot="toggle"><studs-icon icon="search"></studs-icon>Accordion One</div>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
          <studs-divider></studs-divider>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
          <studs-divider></studs-divider>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
        </studs-accordion-item>
        <studs-accordion-item>
          <div slot="toggle">Accordion Two</div>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
          <studs-divider></studs-divider>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
          <studs-divider></studs-divider>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
        </studs-accordion-item>
        <studs-accordion-item>
          <div slot="toggle">Accordion Three</div>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
          <studs-divider></studs-divider>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
          <studs-divider></studs-divider>
          <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
        </studs-accordion-item>
      </studs-accordion>
    `
  }
}

export const ListMenu: Story = {
  args: {
    children: `
         <studs-button slot="trigger" icon="expand_more" icon-position="end" >Menu</studs-button>
         <studs-list size="small">
            <studs-list-item>Product Label</studs-list-item>
            <studs-list-item>Product Label</studs-list-item>
            <studs-list-item>Product Label
                <studs-list slot="list">
                    <studs-list-item>Product Label</studs-list-item>
                    <studs-list-item>Product Label</studs-list-item>
                    <studs-list-item>Product Label
                      <studs-list slot="list">
                        <studs-list-item>Product Label</studs-list-item>
                      </studs-list>
                    </studs-list-item>
                </studs-list>
            </studs-list-item>
      </studs-list>
    `
  }
}

export const FlyoutMenu: Story = {
  args: {
    children: `
            <studs-button button-type="icon" slot="trigger" icon="menu"></studs-button>
            <studs-menu-title slot="title">Menu <studs-button button-type="close" icon="close" slot="actions"></studs-button></studs-menu-title>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu>
              <studs-menu-item slot="trigger"><studs-icon slot="prefix" icon="search"></studs-icon>Product Label<studs-icon icon="chevron_right" slot="suffix"></studs-icon></studs-menu-item>
              <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
              <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
              <studs-menu>
                <studs-menu-item slot="trigger"><studs-icon slot="prefix" icon="search"></studs-icon>Product Label<studs-icon icon="chevron_right" slot="suffix"></studs-icon></studs-menu-item>
                <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                <studs-menu>
                  <studs-menu-item slot="trigger"><studs-icon slot="prefix" icon="search"></studs-icon>Product Label<studs-icon icon="chevron_right" slot="suffix"></studs-icon></studs-menu-item>
                  <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                  <studs-menu>
                    <studs-menu-item slot="trigger"><studs-icon slot="prefix" icon="search"></studs-icon>Product Label<studs-icon icon="chevron_right" slot="suffix"></studs-icon></studs-menu-item>
                    <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                    <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                    <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                    <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                  </studs-menu>
                  <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                  <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
                </studs-menu>
                <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
              </studs-menu>
              <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            </studs-menu>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
            <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
    `
  }
}

export const Mega: Story = {
  args: {
    cols: 3,
    position: 'bottom',
    type: 'mega',
    children: `
            <studs-button button-type="icon" slot="trigger" icon="menu"></studs-button>
            <div>
              <studs-menu-label>Products Category</studs-menu-label>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
            </div>
            <div>
              <studs-menu-label>Products Category</studs-menu-label>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
            </div>
            <div>
              <studs-menu-label>Products Category</studs-menu-label>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
            </div>
            <div>
              <studs-menu-label>Products Category</studs-menu-label>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
            </div>
            <div>
              <studs-menu-label>Products Category</studs-menu-label>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
            </div>
            <div>
              <studs-menu-label>Products Category</studs-menu-label>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
              <studs-menu-item>Product Label</studs-menu-item>
            </div>
    `
  }
}