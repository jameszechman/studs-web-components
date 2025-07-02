import { describe, it } from 'vitest';
import { fixture, html, waitUntil, expect, elementUpdated, aTimeout } from '@open-wc/testing';
import sinon from "sinon";

import { StudsButton } from '../src/components/display/button';

describe('StudsButton', async () => {
  it('should render', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button></studs-button>
    `);
    expect(el).to.be.instanceOf(StudsButton);
  });

  it('should render children', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button>Test</studs-button>
    `);
    expect(el.innerHTML).to.equal('Test');
  });

  it('should render with a type', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button type="button">Test</studs-button>
    `);
    expect(el.getAttribute('type')).to.eq('button');
  });

  it('should render shadow root', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button></studs-button>
    `);
    await waitUntil(
      () => el.shadowRoot?.querySelector('button'),
      'Element did not render children',
    );
  });

  it('should render with a disabled attribute', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button disabled>Test</studs-button>
    `);
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.shadowRoot?.querySelector('button')?.hasAttribute('disabled')).to.be.true;
  });

  it('should render with button-type', async () => {
    const buttontypes = ['cta', 'primary', 'secondary', 'tertiary', 'link', 'close', 'icon'];
    const el = await fixture<StudsButton>(html`
      <studs-button></studs-button>
    `);
    buttontypes.forEach(async (type) => {
      await aTimeout(1);
      el.setAttribute('button-type', type);
      await elementUpdated(el);
      expect(el.getAttribute('button-type')).to.eq(type);
      expect(el.shadowRoot?.querySelector('button')?.classList.contains(`-${type}`)).to.be.true;
    });
  });

  it('should render with size', async () => {
    const sizes = ['small', 'medium', 'large'];
    const el = await fixture<StudsButton>(html`
      <studs-button></studs-button>
    `);
    sizes.forEach(async (size) => {
      await aTimeout(1);
      el.setAttribute('size', size);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.eq(size);
      expect(el.shadowRoot?.querySelector('button')?.classList.contains(`-${size}`)).to.be.true;
    });
  });

  it('should render with variant', async () => {
    const variants = ['outline'];
    const el = await fixture<StudsButton>(html`
      <studs-button></studs-button>
    `);
    variants.forEach(async (variant) => {
      await aTimeout(1);
      el.setAttribute('variant', variant);
      await elementUpdated(el);
      expect(el.getAttribute('variant')).to.eq(variant);
      expect(el.shadowRoot?.querySelector('button')?.classList.contains(`-${variant}`)).to.be.true;
    });
  });

  it('should render an icon', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button icon="close"></studs-button>
    `);
    expect(el.getAttribute('icon')).to.eq('close');
    expect(el.shadowRoot?.querySelector('button')?.querySelector('.studs-icon')).to.exist;
  });

  it('should run an onClick event', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button></studs-button>
    `);
    const spy = sinon.spy();
    el.addEventListener('click', spy);
    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    expect(spy).to.have.been.calledOnce;
  });

  it('should not run an onClick event with a disabled attribute', async () => {
    const el = await fixture<StudsButton>(html`
      <studs-button disabled></studs-button>
    `);
    const spy = sinon.spy();
    el.addEventListener('click', spy);
    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    expect(spy).to.not.have.been.called;
  });

});

