import { StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { sstLogo } from '../assets/sstLogo.ts';

const meta = {
  title: 'Studs/Recipes/Cart',
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => {
    return html`
      <style>
        header {
          padding-inline: 20px;
          .container {
            margin: 0 auto;
            max-width: 1440px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        .cart {
          display: flex;
          align-items: center;
        }
      </style>
      ${args.styles}
      <studs-app-shell>
        <header slot="header">
          <div class="container">
            ${sstLogo}
            <div class="cart">
              ${args.children}
            </div>
          </div>
        </header>
      </studs-app-shell>
      ${args.script}
    `
  }
} satisfies {
  styles: TemplateResult;
  children: TemplateResult;
  script: TemplateResult;
}

export default meta;

type Story = StoryObj<{
  styles: TemplateResult;
  children: TemplateResult;
  script: TemplateResult;
}>;

export const MenuCart: Story = {
  args: {
    styles: html`
      <style>
        .cart {
          studs-menu::part(menu) {
            min-width: 400px;
          }
          studs-menu-item {
            > div {
              display: flex;
              gap: 0.15rem;
              flex-direction: column;
            }
            p,
            strong {
              margin: 0;
              font-size: 14px;
            }
            span {
              font-size: 12px;
            }
            .actions {
              display: flex;
              align-items: center;
              flex-direction: row;
              flex-wrap: nowrap;
              gap: 0.5rem;
              margin: 0 0 0 auto;
              studs-input {
                display: inline-block;
              }
            }
          }
          .total::part(wrapper) {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      </style>
    `,
    children: html`
      <studs-menu>
        <studs-button slot="trigger" button-type="tertiary"><studs-badge icon="shopping_cart"></studs-badge></studs-button>
        <studs-menu-title slot="title">Items In Cart</studs-menu-title>
      </studs-menu>
    `,
    script: html`
      <script type="text/javascript">
        const menu = document.querySelector('studs-menu');
        const badge = document.querySelector('studs-badge');
        document.addEventListener('DOMContentLoaded', () => {
          const totalPrice = document.createElement('p');
          const items = [
            {
              label: 'Item 1',
              description: 'Description of item 1',
              price: '50',
              qty: 1
            },
            {
              label: 'Item 2',
              description: 'Description of item 2',
              price: '100',
              qty: 2
            },
            {
              label: 'Item 3',
              description: 'Description of item 3',
              price: '150',
              qty: 1
            }
          ]
          badge.count = items.length;
          items.forEach(item => {
            const menuItem = document.createElement('studs-menu-item');
            const content = document.createElement('div');
            const title = document.createElement('strong');
            const description = document.createElement('span');
            const actions = document.createElement('div');
            const price = document.createElement('p');
            const input = document.createElement('studs-input');

            title.textContent = item.label;
            description.textContent = item.description;
            content.appendChild(title);
            content.appendChild(description);
            menuItem.appendChild(content);

            actions.classList.add('actions');

            price.classList.add('price');
            price.textContent = "$" + item.qty * item.price
            actions.appendChild(price);

            input.setAttribute('type', 'number');
            input.setAttribute('value', item.qty);
            input.setAttribute('size', 'small');
            input.setAttribute('min', 0);
            input.setAttribute('max', 10);
            input.setAttribute('step', 1);
            input.addEventListener('change', (e) => {
              item.qty = e.target.value;
              price.textContent = "$" + item.qty * item.price;
              totalPrice.textContent = '$' + items.reduce((acc, item) => acc + item.qty * item.price, 0);
            });

            actions.appendChild(input);
            menuItem.appendChild(actions);

            menu.appendChild(menuItem);
          });

          const total = document.createElement('studs-menu-item');
          total.classList.add('total');
          const totalContent = document.createElement('div');
          const totalTitle = document.createElement('strong');

          const btn = document.createElement('studs-button');
          btn.textContent = 'Checkout';
          btn.setAttribute('button-type', 'secondary');

          totalTitle.textContent = 'Total';
          totalPrice.textContent = '$' + items.reduce((acc, item) => acc + item.qty * item.price, 0);
          totalContent.appendChild(totalTitle);
          totalContent.appendChild(totalPrice);
          total.appendChild(btn);
          total.appendChild(totalContent);
          menu.appendChild(total);
        })
      </script>
    `
  }
}

export const PopoverCart: Story = {
  args: {
    styles: html`
      <style>
        div[slot="footer"] {
          margin: 0;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        }
        studs-popover::part(popover) {
          min-width: 400px;
        }
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          > div {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            
            span {
              font-size: 12px;
            }
          }
          .actions {
            display: flex;
            flex-direction: row;
            gap: 0.25rem;
            align-items: center;
          }
        }
        .item:not(:last-child) {
          border-bottom: 1px solid var(--border-color);
        }
      </style>
    `,
    children: html`
      <studs-button slot="trigger" button-type="tertiary">
        <studs-badge icon="shopping_cart"></studs-badge>
        <studs-popover>
          <strong slot="title">Items In Cart</strong>
          <div class="items">
            
          </div>
          <div slot="footer">
            <p class="total">$0</p>
            <studs-button button-type="secondary">Checkout</studs-button>
          </div>
        </studs-popover>
      </studs-button>
    `,
    script: html`
      <script type="text/javascript">
        const itemsContainer = document.querySelector('studs-popover .items');
        const badge = document.querySelector('studs-badge');
        const total = document.querySelector('studs-popover .total');
        const items = [
          {
            label: 'Item 1',
            description: 'Description of item 1',
            price: '50',
            qty: 1
          },
          {
            label: 'Item 2',
            description: 'Description of item 2',
            price: '100',
            qty: 2
          },
          {
            label: 'Item 3',
            description: 'Description of item 3',
            price: '150',
            qty: 1
          }
        ]
        badge.count = items.length;
        document.addEventListener('DOMContentLoaded', () => {
          items.forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item');
            
            // Create Meta
            const meta = document.createElement('div');
            const title = document.createElement('strong');
            const description = document.createElement('span');
            title.textContent = item.label;
            description.textContent = item.description;
            meta.appendChild(title);
            meta.appendChild(description);
            itemWrapper.appendChild(meta);
            
            // Create Actions
            const actions = document.createElement('div');
            const price = document.createElement('p');
            const input = document.createElement('studs-input');
            actions.classList.add('actions');
            price.classList.add('price');
            price.textContent = "$" + item.qty * item.price
            actions.appendChild(price);
            input.setAttribute('type', 'number');
            input.setAttribute('value', item.qty);
            input.setAttribute('size', 'small');
            input.setAttribute('min', 0);
            input.setAttribute('max', 10);
            input.setAttribute('step', 1);
            input.addEventListener('change', (e) => {
              item.qty = e.target.value;
              price.textContent = "$" + item.qty * item.price;
              total.textContent = '$' + items.reduce((acc, item) => acc + item.qty * item.price, 0);
            });
            actions.appendChild(input);
            itemWrapper.appendChild(actions);
            
            itemsContainer.appendChild(itemWrapper);
          });
          
          total.textContent = '$' + items.reduce((acc, item) => acc + item.qty * item.price, 0);
        });
      </script>
    `
  }
}

export const DrawerCart: Story = {
  args: {
    styles: html`
      <style>
        .wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
          
          header {
            padding: 1rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          main {
            flex: 1;
            overflow-y: auto;
          }
          footer {
            padding: 1rem;
            border-top: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .items {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div {
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
              
              span {
                font-size: 12px;
              }
            }
            .actions {
              display: flex;
              flex-direction: row;
              gap: 0.25rem;
              align-items: center;
            }
          }
        }
      </style>
    `,
    children: html`
      <studs-drawer position="right" size="medium" close-on-esc="">
        <studs-button slot="toggle" button-type="tertiary">
          <studs-badge icon="shopping_cart"></studs-badge></studs-button>
          <div class="wrapper">
          <header>
            <strong>Items In Cart</strong>
            <studs-button button-type="close" icon="close"></studs-button>
          </header>
          <main>
            <div class="items">
              
            </div>
          </main>
          <footer>
            <p class="total">$0</p>
            <studs-button button-type="secondary">Checkout</studs-button>
          </footer>
          </div>
      </studs-drawer>
    `,
    script: html`
      <script type="text/javascript">
        const itemsContainer = document.querySelector('studs-drawer .items');
        const badge = document.querySelector('studs-badge');
        const total = document.querySelector('studs-drawer .total');
        const closeBtn = document.querySelector('studs-drawer studs-button[button-type="close"]');
        closeBtn.addEventListener('click', () => {
          document.querySelector('studs-drawer').toggle();
        });
        const items = [
          {
            label: 'Item 1',
            description: 'Description of item 1',
            price: '50',
            qty: 1
          },
          {
            label: 'Item 2',
            description: 'Description of item 2',
            price: '100',
            qty: 2
          },
          {
            label: 'Item 3',
            description: 'Description of item 3',
            price: '150',
            qty: 1
          }
        ]
        badge.count = items.length;
        document.addEventListener('DOMContentLoaded', () => {
          items.forEach(item => {
            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item');
            
            // Create Meta
            const meta = document.createElement('div');
            const title = document.createElement('strong');
            const description = document.createElement('span');
            title.textContent = item.label;
            description.textContent = item.description;
            meta.appendChild(title);
            meta.appendChild(description);
            itemWrapper.appendChild(meta);
            
            // Create Actions
            const actions = document.createElement('div');
            const price = document.createElement('p');
            const input = document.createElement('studs-input');
            actions.classList.add('actions');
            price.classList.add('price');
            price.textContent = "$" + item.qty * item.price
            actions.appendChild(price);
            input.setAttribute('type', 'number');
            input.setAttribute('value', item.qty);
            input.setAttribute('size', 'small');
            input.setAttribute('min', 0);
            input.setAttribute('max', 10);
            input.setAttribute('step', 1);
            input.addEventListener('change', (e) => {
              item.qty = e.target.value;
              price.textContent = "$" + item.qty * item.price;
              total.textContent = '$' + items.reduce((acc, item) => acc + item.qty * item.price, 0);
            });
            actions.appendChild(input);
            itemWrapper.appendChild(actions);
            
            itemsContainer.appendChild(itemWrapper);
          });
          
          total.textContent = '$' + items.reduce((acc, item) => acc + item.qty * item.price, 0);
        });
      </script>
    `
  }
}