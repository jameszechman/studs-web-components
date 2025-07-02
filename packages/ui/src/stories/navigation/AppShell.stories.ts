import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsAppShell } from '../../components/navigation/app-shell.ts';
import { repeat } from 'lit/directives/repeat.js';
import { sstLogo } from '../assets/sstLogo.ts';

const waffleMenu = html` <div>
  <studs-menu cols="3" position="bottom">
    <button slot="trigger"><studs-icon slot="trigger" icon="apps"></studs-icon></button>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
    <studs-icon icon="info" onclick="alert('clicked')"></studs-icon>
</studs-menu>
</div>`;

const navbar = html`
  <studs-navbar>

    <studs-menu on="hover-interactive" position="bottom-right" type="dropdown" cols="0">
      <studs-button slot="trigger" button-type="link">
        Products
      </studs-button>
      <studs-list size="small">
        <studs-list-item>
          <studs-icon slot="prefix" size="medium" icon="home"></studs-icon>
          <span>Example navigation 1</span>
        </studs-list-item>
        <studs-list-item>
          <studs-icon slot="prefix" icon="tune"></studs-icon>
          <div>Label 1</div>
        </studs-list-item>
        <studs-list-item>
          <studs-icon slot="prefix" icon="favorite"></studs-icon>
          <div>Label 2</div>
        </studs-list-item>
      </studs-list>
    </studs-menu>

    <studs-menu on="hover-interactive" position="bottom-right" type="dropdown" cols="0">
      <studs-button slot="trigger" button-type="link">
        Solutions
      </studs-button>
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
      <studs-menu-item><studs-icon slot="prefix" icon="search"></studs-icon>Product Label</studs-menu-item>
    </studs-menu>

    <studs-menu on="hover-interactive" position="bottom" type="mega" cols="3">
      <studs-button slot="trigger" button-type="link">
        Resource Center
      </studs-button>
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
    </studs-menu>

    <studs-menu on="hover-interactive" position="bottom-right" type="dropdown" cols="0">
      <studs-button slot="trigger" button-type="link">
        Training &amp; Education
      </studs-button>
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
                <studs-list-item>Product Label<p></p></studs-list-item>
              </studs-list>
            </studs-list-item>
          </studs-list>
        </studs-list-item>
      </studs-list>

    </studs-menu>
    <studs-button href="#" button-type="link">
      Customer Service
    </studs-button>
  </studs-navbar>
`

const meta = {
  title: 'Studs/Navigation/AppShell',
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<StudsAppShell>;

export default meta;
type Story = StoryObj<StudsAppShell>;

export const Default: Story = {
  render: () => html`
    <studs-app-shell>
      <header slot="header">
        <div
          class="navWrapper"
        >
          ${sstLogo}
          <strong>Product Name</strong>
          ${navbar}
        </div>
        
        <div class="actions">
          <studs-icon icon="notifications"></studs-icon>
          ${waffleMenu}
          <studs-icon icon="settings"></studs-icon>
          <studs-icon icon="account_circle"></studs-icon>
        </div>
      </header>
      <studs-list as="nav" direction="end" icon="chevron_right" size="small" slot="sidebar" style="width: 200px">
        <studs-list-item>
          Product Name
        </studs-list-item>
        <studs-list-item>
          Product Name
        </studs-list-item>
        <studs-list-item>
          Product Name
          <studs-list slot="list">
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name
              <studs-list slot="list">
                <studs-list-item>Product Name</studs-list-item>
              </studs-list>
            </studs-list-item>
          </studs-list>
        </studs-list-item>
        <studs-list-item>
          Product Name
          <studs-list slot="list">
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name
              <studs-list slot="list">
                <studs-list-item>Product Name</studs-list-item>
              </studs-list>
            </studs-list-item>
          </studs-list>
        </studs-list-item>
        <studs-list-item>
          Product Name
          <studs-list slot="list">
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name
              <studs-list slot="list">
                <studs-list-item>Product Name</studs-list-item>
              </studs-list>
            </studs-list-item>
          </studs-list>
        </studs-list-item>
        <studs-list-item>
          Product Name
          <studs-list slot="list">
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name
              <studs-list slot="list">
                <studs-list-item>Product Name</studs-list-item>
              </studs-list>
            </studs-list-item>
          </studs-list>
        </studs-list-item>
        <studs-list-item>
          Product Name
          <studs-list slot="list">
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name</studs-list-item>
            <studs-list-item>Product Name
              <studs-list slot="list">
                <studs-list-item>Product Name</studs-list-item>
              </studs-list>
            </studs-list-item>
          </studs-list>
        </studs-list-item>
      </studs-list>
      <main>
        ${repeat(
          new Array(5).fill(1),
          (_, index) => html`<div style="padding: 1rem">
              ${index} - Labore culpa aliqua cillum occaecat velit non nostrud sunt. Magna
              velit dolor ea irure. Sint proident ea magna Lorem nisi.
              Adipisicing commodo laboris Lorem sunt ad proident nostrud
              incididunt.
            </div>`
        )}
      </main>
      <footer slot="footer" style="display: flex; align-items: center; justify-content: center; flex: 1; padding: 1rem;">
        <strong>Footer section</strong>
      </footer>
    </studs-app-shell>
  `
};

