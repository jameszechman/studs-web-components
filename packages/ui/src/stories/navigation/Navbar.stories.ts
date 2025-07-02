import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsNavbar } from '../../components/navigation/navbar';

const meta = {
  title: 'Studs/Navigation/Navbar',
  tags: ['autodocs'],
  render: (args) => html`<div style="height: 250px">
    <studs-navbar>
      ${mockdata.map(item => {
        if(item.children) return html`
          <studs-menu on="hover-interactive" position=${item?.args?.position || 'bottom-right'} type=${item?.args?.type || 'dropdown'} cols=${item?.args?.cols || 0}>
            <studs-button slot="trigger" button-type="tertiary">
              ${item.label}
            </studs-button>
            ${item.children}
          </studs-menu>
        ` 
        else return html`<studs-button button-type="tertiary" href="#">
          ${item.label}
        </studs-button>`
      })}
    </studs-navbar>
  </div>`,
  argTypes: {},
} satisfies Meta<StudsNavbar>;

export default meta;

type Story = StoryObj<StudsNavbar>;

export const Default: Story = {
  args: {},
};

const mockdata = [
  {
    label: 'Products',
    children: html`
      <studs-list size="small">
        <studs-list-item>
            <studs-icon slot='prefix' size="medium" icon="home"></studs-icon>
            <span>Example navigation 1</span>
        </studs-list-item>
        <studs-list-item>
          <studs-icon slot='prefix' icon="tune"></studs-icon>
          <div>Label 1</div>
        </studs-list-item>
        <studs-list-item>
          <studs-icon slot='prefix' icon="favorite"></studs-icon>
          <div>Label 2</div>
        </studs-list-item>
      </studs-list>
    `,
  },
  {
    label: 'Solutions',
    children: html`
      <studs-menu-title slot="title">Menu <studs-button button-type="close" icon="close" slot="actions"></studs-button></studs-menu-title>
      <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
      <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
      <studs-menu on="hover-interactive">
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
      <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>`,
  },
  {
    label: 'Resource Center',
    args: {
      position: 'bottom',
      cols: 3,
      type: 'mega'
    },
    children: html`
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
    </div>`,
  },
  {
    label: 'Training & Education',
    children: html`
      <studs-list size="small">
        <studs-list-item>
          Product Label
        </studs-list-item>
        <studs-list-item>
          Product Label
        </studs-list-item>
        <studs-list-item>
          Product Label
          <studs-list slot="list">
            <studs-list-item>Product Label</studs-list-item>
            <studs-list-item>Product Label</studs-list-item>
            <studs-list-item>Product Label
              <studs-list slot="list">
                <studs-list-item>Product Label</p></studs-list-item>
              </studs-list>
            </studs-list-item>
          </studs-list>
        </studs-list-item>
      </studs-list>
    `
  },
  {
    label: 'Customer Service',
  },
];
