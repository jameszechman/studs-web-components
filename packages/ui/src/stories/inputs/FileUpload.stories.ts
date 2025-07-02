import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsFileUpload } from '../../components/inputs/file-upload';

const meta = {
  title: 'Studs/Inputs/FileUpload',
  tags: ['autodocs'],
  render: (args) => {
    return html`
      <studs-file-upload
        name="file-upload"
        ?multiple=${args.multiple}
        accept=${ifDefined(args.accept)}
        max-file-size=${args.maxFileSize}
        max-files=${args.maxFiles}
        upload-mode=${args.uploadMode}
        @files-selected=${handleFilesSelected}
        @file-removed=${handleFileRemoved}
        @cancel-upload=${handleCancelUpload}
        @change=${(e: Event) => {
          const target = e.currentTarget;
          const files = (target as StudsFileUpload).files;
          console.log('Change event:', e);
          console.log('Files:', files);
        }}
      ></studs-file-upload>
      ${args.uploadMode === 'deferred'
        ? html`<studs-button
            id="uploadButton"
            button-type="primary"
            style="margin-top: 1rem;"
            @click=${() => triggerDeferredUpload()}
            >Upload Files</studs-button
          >`
        : ''}
    `
  },
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    maxFileSize: { control: 'number' },
    maxFiles: { control: 'number' },
    uploadMode: {
      control: { type: 'select' },
      options: ['immediate', 'deferred'],
    },
  },
} satisfies Meta<StudsFileUpload>;

export default meta;
type Story = StoryObj<StudsFileUpload>;

export const Default: Story = {
  args: {
    multiple: true,
    accept: '.jpg,.png',
    maxFileSize: 1 * 1024 * 1024,
    maxFiles: 2,
    uploadMode: 'immediate',
  },
};

// Utility functions for file upload
import axios, { CancelTokenSource } from 'axios';

const fileKeys = new Map<string, string>();
const uploadCancelSources = new Map<string, CancelTokenSource>();
let deferredFiles: File[] = [];
let listenerAdded = false;

if (!listenerAdded) {
  document.addEventListener('file-removed-from-deferred', (event) => {
    const customEvent = event as CustomEvent;
    const { fileName } = customEvent.detail;

    deferredFiles = deferredFiles.filter(file => file.name !== fileName);
  });
  listenerAdded = true;
}

const handleFilesSelected = async (event: CustomEvent) => {
  const files: File[] = event.detail.files;
  // console.log('Files selected:', files);

  const fileUploadComponent = document.querySelector('studs-file-upload');
  if (!fileUploadComponent) {
    return;
  }

  const uploadMode = fileUploadComponent.getAttribute('upload-mode');
  if (uploadMode === 'immediate') {
    for (const file of files) {
      await uploadFile(file, 'https://file.io', fileUploadComponent);
    }
  } else if (uploadMode === 'deferred') {
    deferredFiles = files;
  }
};

const triggerDeferredUpload = async () => {
  const fileUploadComponent = document.querySelector('studs-file-upload');
  if (!fileUploadComponent || deferredFiles.length === 0) {
    return;
  }
  const fileUploadComponentInstance = fileUploadComponent as any;
  for (const file of deferredFiles) {
    fileUploadComponentInstance.activeUploads++;
    await uploadFile(file, 'https://file.io', fileUploadComponent);
    fileUploadComponentInstance.activeUploads--;
  }
  deferredFiles = [];
};

const handleFileRemoved = async (event: CustomEvent) => {
  const fileName = event.detail.file ? event.detail.file.name : undefined;
  const fileKey = fileKeys.get(fileName);
  if (!fileKey) {
    return;
  }
  const deleteUrl = `https://file.io/${encodeURIComponent(fileKey)}`;
  try {
    const response = await axios.delete(deleteUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer I6MCBSH.XC5VSNJ-WV54T32-G93T34G-3JTRCHB`,
      },
    });
    if (response.status === 200) {
      // console.log('File removed successfully from the server:', fileKey);
    } else {
      throw new Error(
        `Failed to delete the file. Server responded with status: ${response.status}`
      );
    }
  } catch (error) {
    // console.error('Error removing file from server:', error);
  }
};

const handleCancelUpload = (event: Event) => {
  const customEvent = event as CustomEvent<{ fileName: string }>;
  const { fileName } = customEvent.detail;
  const cancelTokenSource = uploadCancelSources.get(fileName);
  if (cancelTokenSource) {
    cancelTokenSource.cancel(`Cancellation requested for: ${fileName}`);
    uploadCancelSources.delete(fileName);
    // console.log(`Upload cancelled for: ${fileName}`);
  }
};

const uploadFile = async (
  file: File,
  uploadUrl: string,
  fileUploadComponent: Element
) => {
  if (!file || !fileUploadComponent) return;

  const formData = new FormData();
  formData.append('file', file);

  const startTime = Date.now();

  const cancelSource = axios.CancelToken.source();
  uploadCancelSources.set(file.name, cancelSource);

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer I6MCBSH.XC5VSNJ-WV54T32-G93T34G-3JTRCHB`,
      },
      cancelToken: cancelSource.token,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );

        const elapsedTime = (Date.now() - startTime) / 1000;
        const uploadSpeed = progressEvent.loaded / elapsedTime;
        const remainingData =
          (progressEvent.total || progressEvent.loaded) - progressEvent.loaded;
        const remainingTime = remainingData / uploadSpeed;

        fileUploadComponent.dispatchEvent(
          new CustomEvent('upload-progress', {
            detail: { fileName: file.name, percentCompleted, remainingTime },
          })
        );
      },
    });

    fileKeys.set(file.name, response.data.key);

    fileUploadComponent.dispatchEvent(
      new CustomEvent('upload-success', {
        detail: { fileName: file.name, response: response.data },
      })
    );
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log('Upload cancelled:', file.name);
    } else {
      // console.error('Upload failed for file:', file.name, error);
      fileUploadComponent.dispatchEvent(
        new CustomEvent('upload-failure', {
          detail: { fileName: file.name, error },
        })
      );
    }
  } finally {
    uploadCancelSources.delete(file.name);
  }
};
