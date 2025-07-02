import { expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsMenu } from '../../src/components/navigation/menu';
import { StudsMenuItem } from '../../src/components/navigation/menu-item';
import { StudsMenuLabel } from '../../src/components/navigation/menu-label';
import { StudsMenuTitle } from '../../src/components/navigation/menu-title';

describe('StudsMenu', async () => {
  it('should render', async () => {
    const el = await fixture<StudsMenu>(html`
      <studs-menu>
        <button slot="trigger">Menu</button>
        <a href="#">Long Item 1</a>
        <a href="#">Item 2</a>
        <hr />
        <a href="#">Item 3</a>
      </studs-menu>
    `);
    expect(el).to.be.instanceOf(StudsMenu);
  });

  it('should render with StudsMenuItem', async () => {
    const el = await fixture<StudsMenu>(html`
      <studs-menu type="dropdown">
        <studs-button
          variant="outline"
          slot="trigger"
          icon="expand_more"
          icon-position="end"
          >Menu</studs-button
        >
        <studs-menu-title slot="title">Menu</studs-menu-title>
        <studs-menu-label>Buttons</studs-menu-label>
        <studs-menu-item @click="${(e: Event) => console.log(e)}"
          ><studs-icon slot="prefix" icon="search"></studs-icon>Item
          1</studs-menu-item
        >
      </studs-menu>
    `);
    expect(el).to.be.instanceOf(StudsMenu);

    // test menu title
    const studsMenuTitle = el.querySelector('studs-menu-title');
    expect(studsMenuTitle).be.instanceOf(StudsMenuTitle);

    // test menu label
    const studsMenuLabel = el.querySelector('studs-menu-label');
    expect(studsMenuLabel).be.instanceOf(StudsMenuLabel);

    // test menu types
    const studsMenuItem = el.querySelector('studs-menu-item');
    expect(studsMenuItem).be.instanceOf(StudsMenuItem);

    const itemEl = studsMenuItem?.shadowRoot?.querySelector('.item');
    expect(itemEl?.classList.contains(`-dropdown`)).be.true;
  });

  it('should render with type=drawer and StudsMenuItem', async () => {
    const el = await fixture<StudsMenu>(html`
      <studs-menu type="drawer">
        <studs-button
          variant="outline"
          slot="trigger"
          icon="expand_more"
          icon-position="end"
          >Menu</studs-button
        >
        <studs-menu-title slot="title">Menu</studs-menu-title>
        <studs-menu-label>Buttons</studs-menu-label>
        <studs-menu-item @click="${(e: Event) => console.log(e)}"
          ><studs-icon slot="prefix" icon="search"></studs-icon>Item
          1</studs-menu-item
        >
      </studs-menu>
    `);
    expect(el).to.be.instanceOf(StudsMenu);

    // test menu types
    const studsMenuItem = el.querySelector('studs-menu-item');
    expect(studsMenuItem).be.instanceOf(StudsMenuItem);

    const itemEl = studsMenuItem?.shadowRoot?.querySelector('.item');
    expect(itemEl?.classList.contains(`-drawer`)).be.true;
  });

  it('should render with type=mega and StudsMenuItem', async () => {
    const el = await fixture<StudsMenu>(html`
      <studs-menu type="mega">
        <studs-button
          variant="outline"
          slot="trigger"
          icon="expand_more"
          icon-position="end"
          >Menu</studs-button
        >
        <studs-menu-title slot="title">Menu</studs-menu-title>
        <studs-menu-label>Buttons</studs-menu-label>
        <studs-menu-item @click="${(e: Event) => console.log(e)}"
          ><studs-icon slot="prefix" icon="search"></studs-icon>Item
          1</studs-menu-item
        >
      </studs-menu>
    `);
    expect(el).to.be.instanceOf(StudsMenu);

    // test menu types
    const studsMenuItem = el.querySelector('studs-menu-item');
    expect(studsMenuItem).be.instanceOf(StudsMenuItem);

    const itemEl = studsMenuItem?.shadowRoot?.querySelector('.item');
    expect(itemEl?.classList.contains(`-mega`)).be.true;
  });
});
