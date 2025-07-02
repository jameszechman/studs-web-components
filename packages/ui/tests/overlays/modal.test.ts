import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { beforeAll, describe, it, vi } from 'vitest';
import { StudsModal } from '../../src/components/overlays/modal';

// we dont have Dialog elemnt in js dom
// ref: issues with HTML Dialog Element: https://github.com/jsdom/jsdom/issues/3294
beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  // HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('StudsModal', async () => {
  it('should render', async () => {
    const el = await fixture<StudsModal>(html`
      <studs-modal>
        <studs-button slot="toggle">Open</studs-button>
        <h2 slot="header">Modal</h2>
        <p>
          Try hitting the <code>tab</code> key and notice how the focus stays
          within the modal itself.
        </p>
        <div slot="footer">
          <studs-button size="small" button-type="primary">Action</studs-button>
        </div>
      </studs-modal>
    `);
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsModal);
  });

  it('should open modal', async () => {
    const el = await fixture<StudsModal>(html`
      <studs-modal>
        <studs-button slot="toggle">Open</studs-button>
        <h2 slot="header">Modal</h2>
        <p>
          Try hitting the <code>tab</code> key and notice how the focus stays
          within the modal itself.
        </p>
        <div slot="footer">
          <studs-button size="small" button-type="primary">Action</studs-button>
        </div>
      </studs-modal>
    `);
    expect(el).to.be.instanceOf(StudsModal);
    const dialogEl = el.shadowRoot?.querySelector('dialog');
    expect(dialogEl?.hasAttribute('open')).be.false;

    el.setAttribute('open', 'true');
    await aTimeout(0);
    expect(dialogEl?.hasAttribute('open')).be.true;
  });
});
