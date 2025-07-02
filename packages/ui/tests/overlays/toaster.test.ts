import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';
import { StudsToast } from '../../src/components/overlays/toast';
import { StudsToaster } from '../../src/components/overlays/toaster';

describe('StudsToaster', async () => {
  it('should render', async () => {
    const el = await fixture<StudsToaster>(
      html` <studs-toaster></studs-toaster> `
    );
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsToaster);
  });

  it('should create toast', async () => {
    const el = await fixture<StudsToaster>(
      html` <studs-toaster position="top-right"></studs-toaster> `
    );
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsToaster);

    el.createToast({
      closeable: true,
      position: 'top-right',
      type: 'success',
      duration: 3000,
      message: 'Test message',
      heading: 'Test heading',
    } as StudsToast);
    await elementUpdated(el);

    const toastInstance = el.shadowRoot?.querySelector('studs-toast');
    expect(toastInstance).be.instanceOf(StudsToast);
    expect(
      el?.shadowRoot
        ?.querySelector('.toaster')
        ?.classList.contains('-top-right')
    ).be.true;
    expect(toastInstance?.getAttribute('type')).be.eq('success');
    expect(toastInstance?.getAttribute('duration')).be.eq('3000');
    expect(toastInstance?.getAttribute('message')).be.eq('Test message');
    expect(toastInstance?.getAttribute('heading')).be.eq('Test heading');
  });

  it('should create standard toast', async () => {
    const el = await fixture<StudsToaster>(
      html` <studs-toaster position="top-right"></studs-toaster> `
    );
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsToaster);

    el.createStandardToast({
      closeable: true,
      position: 'top-right',
      message: 'Test message',
      heading: 'Test heading',
    } as StudsToast);
    await elementUpdated(el);

    const toastInstance = el.shadowRoot?.querySelector('studs-toast');
    expect(toastInstance).be.instanceOf(StudsToast);
    expect(
      el?.shadowRoot
        ?.querySelector('.toaster')
        ?.classList.contains('-top-right')
    ).be.true;
    expect(toastInstance?.getAttribute('type')).be.eq('info');
    expect(toastInstance?.getAttribute('message')).be.eq('Test message');
    expect(toastInstance?.getAttribute('heading')).be.eq('Test heading');
  });

  it('should create error toast', async () => {
    const el = await fixture<StudsToaster>(
      html` <studs-toaster position="top-right"></studs-toaster> `
    );
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsToaster);

    el.createErrorToast({
      closeable: true,
      position: 'top-right',
      message: 'Test message',
      heading: 'Test heading',
    } as StudsToast);
    await elementUpdated(el);

    const toastInstance = el.shadowRoot?.querySelector('studs-toast');
    expect(toastInstance).be.instanceOf(StudsToast);

    expect(toastInstance?.getAttribute('type')).be.eq('error');
  });

  it('should create warning toast', async () => {
    const el = await fixture<StudsToaster>(
      html` <studs-toaster position="top-right"></studs-toaster> `
    );
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsToaster);

    el.createWarningToast({
      closeable: true,
      position: 'top-right',
      message: 'Test message',
      heading: 'Test heading',
    } as StudsToast);
    await elementUpdated(el);

    const toastInstance = el.shadowRoot?.querySelector('studs-toast');
    expect(toastInstance).be.instanceOf(StudsToast);

    expect(toastInstance?.getAttribute('type')).be.eq('warning');
  });

  it('should create success toast', async () => {
    const el = await fixture<StudsToaster>(
      html` <studs-toaster position="top-right"></studs-toaster> `
    );
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsToaster);

    el.createSuccessToast({
      closeable: true,
      position: 'top-right',
      message: 'Test message',
      heading: 'Test heading',
    } as StudsToast);
    await elementUpdated(el);

    const toastInstance = el.shadowRoot?.querySelector('studs-toast');
    expect(toastInstance).be.instanceOf(StudsToast);

    expect(toastInstance?.getAttribute('type')).be.eq('success');
  });
});
