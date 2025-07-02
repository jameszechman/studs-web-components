import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { beforeEach, describe, it } from 'vitest';

import { StudsFileUpload } from '../../src/components/inputs/file-upload';
import { StudsButton } from '../../src/components/display/button';
import { formatTimeBySecond } from '../../src/utils/shared';

const mockFileTxt = new File(['content of the file'], 'filename.txt', {
  type: 'text/plain',
});
const mockFilePng = new File(['content of the file'], 'filename.png', {
  type: 'image/png',
});

class DataTransfer {
  items = new Set();
  get files() {
    return Array.from(this.items);
  }
}

describe('StudsFileUpload', async () => {
  beforeEach(() => {
    // simulate Data transfer object for jsDOM
    window.DataTransfer = DataTransfer as any;
  });
  it('should render', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        multiple=""
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);
    const input = el.shadowRoot?.querySelector('input[type="file"]');
    expect(input).be.exist;

    const uploadButton = el.shadowRoot?.querySelector('studs-button');
    expect(uploadButton?.textContent?.trim()).be.eq('Select files');

    const draggableZone = el.shadowRoot?.querySelector('.drop-message-default');
    expect(draggableZone?.textContent?.trim()).be.eq('Or Drop files here');
  });

  it('should accept upload a single file', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).be.exist;
    expect(input?.hasAttribute('multiple')).be.false;
  });

  it('should accept upload multiple files', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        multiple
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).be.exist;
    expect(input?.hasAttribute('multiple')).be.true;
  });

  it('should accept some file exts only', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        multiple
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).be.exist;
    expect(input?.getAttribute('accept')).be.eq('.jpg,.png');

    const fileTypeEl = el.shadowRoot?.querySelector('.file-type');
    const acceptFileTypeConverted = '.jpg,.png'
      .toUpperCase()
      .replace(/\./g, '')
      .split(',')
      .join(', ');
    expect(fileTypeEl?.textContent?.trim()).include(acceptFileTypeConverted);
  });

  it('should limit the file size', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        multiple
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).be.exist;
    expect(input?.getAttribute('accept')).be.eq('.jpg,.png');

    const maxFileSizeEl = el.shadowRoot?.querySelector('.max-file-size');
    expect(maxFileSizeEl?.textContent?.trim()).include('1 MB');

    el.setAttribute('max-file-size', '1024');
    await elementUpdated(el);
    expect(maxFileSizeEl?.textContent?.trim()).include('1.00 KB');

    el.setAttribute('max-file-size', '500');
    await elementUpdated(el);
    expect(maxFileSizeEl?.textContent?.trim()).include('500 bytes');
  });

  it('should render with upload mode', async () => {
    const uploadModes = ['immediate', 'deferred'];
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        multiple
        max-file-size="1048576"
        max-files="2"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);
    uploadModes.forEach(async (mode) => {
      await aTimeout(1);
      el.setAttribute('upload-mode', mode);
    });
  });

  it('should fire event onchange file select', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).be.exist;
    expect(input?.getAttribute('type')).be.eq('file');

    // test event onchange was called
    if (input) {
      const spyOnChange = sinon.spy();
      input?.addEventListener('change', spyOnChange);
      input.dispatchEvent(
        new Event('change', {
          bubbles: true,
          // target: { files: [mockFilePng] },
        } as any)
      );
      expect(spyOnChange).be.calledOnce;
    }
  });

  it('should not upload unaccepted files', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).be.exist;
    expect(input?.getAttribute('type')).be.eq('file');

    // simulate event onchange with files
    const files = [mockFileTxt];
    (el as any).handleFileSelect({ target: { files } });

    await aTimeout(0);

    // test uploading progress
    const progressArea = el.shadowRoot?.querySelector('.progress-area');
    const fileNameEl = progressArea?.querySelector('.details .name');
    expect(fileNameEl?.textContent?.trim()).be.eq(mockFileTxt.name);

    const errorEl = progressArea?.querySelector('.error');
    expect(errorEl?.textContent?.trim()).be.eq('File type not accepted.');
  });

  it('should render with case successfully upload a file', async () => {
    const uploadedPercent = 70;
    const remainingTime = 2000;
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    // simulate select a file
    const files = [mockFilePng];
    (el as any).handleFileSelect({ target: { files } });
    await aTimeout(0);

    // simulate upload-progress
    el.dispatchEvent(
      new CustomEvent('upload-progress', {
        detail: {
          fileName: mockFilePng.name,
          percentCompleted: uploadedPercent,
          remainingTime: remainingTime,
        },
      })
    );
    await elementUpdated(el);
    const progressArea = el.shadowRoot?.querySelector('.progress-area');
    const fileNameEl = progressArea?.querySelector('.details .name');
    expect(fileNameEl?.textContent?.trim()).be.eq(mockFilePng.name);

    const remainingEl = progressArea?.querySelector('.details .size');
    // remaining percent text
    expect(remainingEl?.textContent?.includes(`${100 - uploadedPercent}%`)).be
      .true;
    // remaining time text
    expect(
      remainingEl?.textContent?.includes(formatTimeBySecond(remainingTime))
    ).be.true;
    // current percent text
    const currentPercentEl = progressArea?.querySelector('.details .percent');
    expect(currentPercentEl?.textContent?.trim()).be.eq(`${uploadedPercent}%`);
    // progress bar style
    const progressBarEl = progressArea?.querySelector<HTMLDivElement>(
      '.details .progress-bar .progress'
    );
    expect(progressBarEl?.style.width).be.eq(`${uploadedPercent}%`);

    // simulate upload-success
    el.dispatchEvent(
      new CustomEvent('upload-success', {
        detail: {
          fileName: mockFilePng.name,
        },
      })
    );
    await elementUpdated(el);
    const uploadedArea = el.shadowRoot?.querySelector('.uploaded-area');
    const uploadedFileNameEl = uploadedArea?.querySelector(
      '.content .details .name'
    );
    expect(uploadedFileNameEl?.textContent?.trim()).be.eq(mockFilePng.name);
  });

  it('should render with case successfully upload a file and upload-mode=deferred', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    // simulate select a file
    const files = [mockFilePng];
    (el as any).handleFileSelect({ target: { files } });
    await aTimeout(0);

    // simulate upload-progress
    el.dispatchEvent(
      new CustomEvent('upload-progress', {
        detail: {
          fileName: mockFilePng.name,
          percentCompleted: 70,
          remainingTime: 2000,
        },
      })
    );
    await elementUpdated(el);
    const progressArea = el.shadowRoot?.querySelector('.progress-area');
    const fileNameEl = progressArea?.querySelector('.details .name');
    expect(fileNameEl?.textContent?.trim()).be.eq(mockFilePng.name);

    // simulate upload-success
    el.dispatchEvent(
      new CustomEvent('upload-success', {
        detail: {
          fileName: mockFilePng.name,
        },
      })
    );
    await elementUpdated(el);
    const uploadedArea = el.shadowRoot?.querySelector('.uploaded-area');
    const uploadedFileNameEl = uploadedArea?.querySelector(
      '.content .details .name'
    );
    expect(uploadedFileNameEl?.textContent?.trim()).be.eq(mockFilePng.name);
  });

  it('should render with case uploading fail', async () => {
    const mockError = 'A random error: ' + Date.now();
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    // simulate select a file
    const files = [mockFilePng];
    (el as any).handleFileSelect({ target: { files } });
    await aTimeout(0);

    // simulate upload-progress
    el.dispatchEvent(
      new CustomEvent('upload-progress', {
        detail: {
          fileName: mockFilePng.name,
          percentCompleted: 70,
          remainingTime: 2000,
        },
      })
    );
    await elementUpdated(el);
    const progressArea = el.shadowRoot?.querySelector('.progress-area');
    const fileNameEl = progressArea?.querySelector('.details .name');
    expect(fileNameEl?.textContent?.trim()).be.eq(mockFilePng.name);

    // simulate upload-failure
    el.dispatchEvent(
      new CustomEvent('upload-failure', {
        detail: {
          fileName: mockFilePng.name,
          error: mockError,
        },
      })
    );
    await elementUpdated(el);
    const errorEl = progressArea?.querySelector('.content .error');
    expect(errorEl?.textContent?.trim()).be.eq(mockError);
  });

  it('Be able to remove the uploaded file', async () => {
    const el = await fixture<StudsFileUpload>(html`
      <studs-file-upload
        name="file-upload"
        accept=".jpg,.png"
        max-file-size="1048576"
        max-files="2"
        upload-mode="deferred"
      ></studs-file-upload>
    `);
    expect(el).to.be.instanceOf(StudsFileUpload);

    // simulate select a file
    const files = [mockFilePng];
    (el as any).handleFileSelect({ target: { files } });
    await aTimeout(0);

    // simulate upload-progress
    el.dispatchEvent(
      new CustomEvent('upload-progress', {
        detail: {
          fileName: mockFilePng.name,
          percentCompleted: 70,
          remainingTime: 2000,
        },
      })
    );
    await elementUpdated(el);
    const progressArea = el.shadowRoot?.querySelector('.progress-area');
    const fileNameEl = progressArea?.querySelector('.details .name');
    expect(fileNameEl?.textContent?.trim()).be.eq(mockFilePng.name);

    // simulate upload-success
    el.dispatchEvent(
      new CustomEvent('upload-success', {
        detail: {
          fileName: mockFilePng.name,
        },
      })
    );
    await elementUpdated(el);
    const uploadedArea = el.shadowRoot?.querySelector('.uploaded-area');
    const uploadedFileNameEl = uploadedArea?.querySelector(
      '.content .details .name'
    );
    expect(uploadedFileNameEl?.textContent?.trim()).be.eq(mockFilePng.name);

    // remove the uploaded file
    const deleteBtn = uploadedArea?.querySelector(
      'studs-button[icon="delete"]'
    );
    expect(deleteBtn).be.instanceOf(StudsButton);
    deleteBtn?.dispatchEvent(new Event('click'));
    await elementUpdated(el);
    const nextUploadedFileNameEl = uploadedArea?.querySelector(
      '.content .details .name'
    );
    expect(nextUploadedFileNameEl?.textContent?.trim()).be.oneOf([
      null,
      undefined,
    ]);
  });
});
