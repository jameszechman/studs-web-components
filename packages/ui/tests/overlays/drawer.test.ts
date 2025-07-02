import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { fireEvent } from '@testing-library/dom'; // Add this line
import { describe, it } from 'vitest';
import { StudsDrawer } from '../../src/components/overlays/drawer';

describe('StudsDrawer', async () => {
  it('should render', async () => {
    const el = await fixture<StudsDrawer>(html`
      <studs-drawer
        position="right"
        size="medium"
        open="false"
        close-on-esc="true"
      >
        <studs-button slot="toggle">Open</studs-button>
        <p>Drawer content</p>
      </studs-drawer>
    `);
    expect(el).to.be.instanceOf(StudsDrawer);
  });

  it('should render with positions', async () => {
    const positions = ['left', 'right', 'center'];

    const el = await fixture<StudsDrawer>(html`
      <studs-drawer
        position="right"
        size="medium"
        open="false"
        close-on-esc="true"
      >
        <studs-button slot="toggle">Open</studs-button>
        <p>Drawer content</p>
      </studs-drawer>
    `);
    expect(el).to.be.instanceOf(StudsDrawer);

    positions.forEach(async (p) => {
      await aTimeout(0);
      el.setAttribute('position', p);
      await elementUpdated(el);
      const wrapperEl = el?.shadowRoot?.querySelector('aside.drawer');
      expect(wrapperEl?.classList.contains(`-${p}`)).be.true;
    });
  });

  it('should render with sizes', async () => {
    const sizes = ['left', 'right', 'center'];

    const el = await fixture<StudsDrawer>(html`
      <studs-drawer
        position="right"
        size="medium"
        open="false"
        close-on-esc="true"
      >
        <studs-button slot="toggle">Open</studs-button>
        <p>Drawer content</p>
      </studs-drawer>
    `);
    expect(el).to.be.instanceOf(StudsDrawer);

    sizes.forEach(async (s) => {
      await aTimeout(0);
      el.setAttribute('size', s);
      await elementUpdated(el);
      const wrapperEl = el?.shadowRoot?.querySelector('aside.drawer');
      expect(wrapperEl?.classList.contains(`-${s}`)).be.true;
    });
  });

  it('should open drawer', async () => {
    const el = await fixture<StudsDrawer>(html`
      <studs-drawer position="right" size="medium">
        <studs-button slot="toggle">Open</studs-button>
        <p>Drawer content</p>
      </studs-drawer>
    `);
    expect(el).to.be.instanceOf(StudsDrawer);

    const wrapperEl = el?.shadowRoot?.querySelector('aside.drawer');
    expect(wrapperEl?.getAttribute('aria-hidden')).be.eq('true');

    el.setAttribute('open', 'true');
    await aTimeout(0);

    expect(wrapperEl?.getAttribute('aria-hidden')).be.eq('false');
  });

  it('should trigger closed drawer by Esc key', async () => {
    const el = await fixture<StudsDrawer>(html`
      <studs-drawer position="right" size="medium" close-on-esc>
        <studs-button slot="toggle">Open</studs-button>
        <p>Drawer content</p>
      </studs-drawer>
    `);
    expect(el).to.be.instanceOf(StudsDrawer);

    el.setAttribute('open', 'true');
    await aTimeout(0);

    const wrapperEl = el?.shadowRoot?.querySelector('aside.drawer');
    expect(wrapperEl?.getAttribute('aria-hidden')).be.eq('false');

    fireEvent.keyDown(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    await aTimeout(500);
    wrapperEl?.dispatchEvent(new Event('animationend'));
    await aTimeout(0);
    expect(wrapperEl?.getAttribute('aria-hidden')).be.eq('true');
  });

  it('should trigger closed drawer by Esc key', async () => {
    const el = await fixture<StudsDrawer>(html`
      <studs-drawer position="right" size="medium" close-on-esc>
        <studs-button slot="toggle">Open</studs-button>
        <p>Drawer content</p>
      </studs-drawer>
    `);
    expect(el).to.be.instanceOf(StudsDrawer);

    el.setAttribute('open', 'true');
    await aTimeout(0);

    const wrapperEl = el?.shadowRoot?.querySelector('aside.drawer');
    expect(wrapperEl?.getAttribute('aria-hidden')).be.eq('false');

    fireEvent.keyDown(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    await aTimeout(100);
    wrapperEl?.dispatchEvent(new Event('animationend'));
    await aTimeout(0);
    expect(wrapperEl?.getAttribute('aria-hidden')).be.eq('true');
  });

  it('should trigger closed drawer by Esc key', async () => {
    const el = await fixture<StudsDrawer>(html`
      <studs-drawer position="right" size="medium" close-on-esc>
        <studs-button slot="toggle">Open</studs-button>
        <p>Drawer content</p>
      </studs-drawer>
    `);
    expect(el).to.be.instanceOf(StudsDrawer);

    const slotToggle = el.shadowRoot?.querySelector('slot[name="toggle"]');
    expect(slotToggle).be.exist;

    const slots = el.shadowRoot?.querySelectorAll('slot');
    let hasSlotHasNoAttr = false;
    slots?.forEach(async (s) => {
      await aTimeout(0);
      if (s.attributes.length === 0) hasSlotHasNoAttr = true;
    });
    await aTimeout(0);
    expect(hasSlotHasNoAttr).be.true;
  });
});
