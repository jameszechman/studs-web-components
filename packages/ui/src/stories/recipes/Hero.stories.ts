import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta = {
  title: 'Studs/Recipes/Hero',
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<{}>;

export const Hero: Story = {
  render: () => {
    return html`
      <style>
        .hero {
          min-height: 700px;
          background-image: url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
          background-size: cover;
          background-position: center center;
          display: flex;
          align-items: flex-end;
          transition: var(--transition-s);
        }
        
        @media (max-width: 768px) {
          .hero {
            min-height: 400px;
          }
        }

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .container {
          padding: 20px;
          max-width: 800px;
          color: white;
        }
      </style>
      <section class="hero">
        <div class="wrapper">
          <div class="container">
            <h1>Welcome to Simpson Strong-Tie Customer Portal</h1>
            <p>
              The customer portal is designed to streamline placing orders for stock items, making it easy for you to
              submit an order online 24 hours a day, 7 days a week.
            </p>
            <studs-button button-type="cta">Order Now</studs-button>
          </div>
        </div>
      </section>
    `;
  }
};