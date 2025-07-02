import { CSSResult, LitElement, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/fileUpload';
import { studsElement } from '../../decorators/studs-element';
import { watch } from '../../directives/watch.ts';
import { FormElement } from '../../mixins/formElement.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { formatTimeBySecond } from '../../utils/shared.ts';

/**
 * @element studs-file-upload
 *
 * @fires change - Fired when the value of the input changes.
 * @fires files-selected - Fired when files are selected for upload.
 * @fires file-removed - Fired when a file is removed from the list of uploaded files.
 * @fires file-removed-from-deferred - Fired when a file is removed from the deferred upload queue.
 * @fires cancel-upload - Fired when an upload is cancelled.
 * @fires upload-progress - Fired when an upload is in progress.
 * @fires upload-success - Fired when an upload completes successfully.
 * @fires upload-failure - Fired when an upload fails.
 */

@studsElement('studs-file-upload')
export class StudsFileUpload extends StudsElement(FormElement(LitElement)) {
  constructor() {
    super();
    this.addEventListener('upload-progress', (event) =>
      this.handleUploadProgress(event as CustomEvent)
    );
    this.addEventListener('upload-success', (event) =>
      this.handleUploadSuccess(event as CustomEvent)
    );
    this.addEventListener('upload-failure', (event) =>
      this.handleUploadFailure(event as CustomEvent)
    );
  }
  /**
   * Reference to the file input element.
   */
  @query('.file-input') fileInput!: HTMLInputElement;
  /**
   * The list of selected files.
   */
  @state() files?: FileList;
  /**
   * Queue of files being uploaded, including their name, loading progress, size, remaining time, and any error message.
   */
  @state() fileQueue: {
    name: string;
    loading: number;
    size: string;
    remainingTime?: number;
    error?: string;
  }[] = [];
  /**
   * List of files that have been successfully uploaded, including their name and size.
   */
  @state() uploadFiles: { name: string; size: string }[] = [];
  /**
   * Indicates whether the upload progress should be shown.
   */
  @state() showProgress = false;
  /**
   * Indicates whether a drag operation is in progress.
   */
  @state() isDragging = false;
  /**
   * Counter for drag operations to manage drag leave and enter events.
   */
  @state() dragCounter = 0;
  /**
   * Number of active uploads.
   */
  @state() activeUploads = 0;
  /**
   * Error message to display when an upload fails.
   */
  @state() errorMessage: string = '';
  /**
   * Indicates whether multiple files can be selected for upload.
   */
  @property({ type: Boolean }) multiple?: boolean = undefined;
  /**
   * Specifies the types of files that the server accepts.
   */
  @property() accept: string = '';
  /**
   * Maximum file size allowed for upload.
   */
  @property({ type: Number, attribute: 'max-file-size' })
  maxFileSize?: number = 0;
  /**
   * Maximum number of files allowed for upload.
   */
  @property({ type: Number, attribute: 'max-files' })
  maxFiles?: number;
  /**
   * Mode of file upload, either immediate upon selection or deferred.
   */
  @property({ type: String, attribute: 'upload-mode', reflect: true })
  uploadMode: 'immediate' | 'deferred' = 'immediate';

  static styles = style as CSSResult;

  @watch('files')
  handleFilesUpdate() {
    if(!this.hasUpdated) {
      /**
       * Runs before the first update
       */
      if(this.files) this.setFormValue(this.files[0]);
    } else {
      if(this.files && this.files?.length > 0) {
        if(this._internals) {
          // FormData only sends first file by default.
          this.setFormValue(this.files[0]);
        }
      }
  }
}

  private handleUploadProgress(event: CustomEvent) {
    const { fileName, percentCompleted, remainingTime } = event.detail;
    this.fileQueue = this.fileQueue.map((file) => {
      if (file.name === fileName) {
        return { ...file, loading: percentCompleted, remainingTime };
      }
      return file;
    });
  }

  private handleUploadSuccess(event: CustomEvent) {
    const { fileName } = event.detail;
    this.fileQueue = this.fileQueue.filter((file) => file.name !== fileName);
    this.uploadFiles.push({
      name: fileName,
      size: this.fileQueue.find((file) => file.name === fileName)?.size || '',
    });
  }

  private handleUploadFailure(event: CustomEvent) {
    const { fileName, error } = event.detail;
    this.fileQueue = this.fileQueue.map((file) => {
      if (file.name === fileName) {
        return { ...file, error: error };
      }
      return file;
    });
  }

  private validateMaxFileSize(file: File): boolean {
    if (file.size > this.maxFileSize!) {
      this.requestUpdate();
      return false;
    }
    return true;
  }

  private isDuplicateFile(file: File): boolean {
    const existingFile = this.fileQueue.find(
      (f) => f.name === file.name && f.size === this.formatFileSize(file.size)
    );
    return !!existingFile;
  }

  private validateAndProcessFile(files: FileList | Array<File>) {
    if (files.length > 0) {
      // Check against maxFiles constraint
      if (this.maxFiles && (this.fileQueue.length + files.length) > this.maxFiles) {
        this.errorMessage = `Only ${this.maxFiles} files can be uploaded at a time. Please try again.`;
        this.requestUpdate();
        return;
      } else {
        this.errorMessage = '';
      }

      const fileObjects: any[] = [];
      const validFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const fileSize = this.formatFileSize(files[i].size);
        const isAccepted = this.isFileAccepted(files[i]);
        const isValid = isAccepted && this.validateMaxFileSize(files[i]);
        const isDuplicate = this.isDuplicateFile(files[i]);

        // Construct the base file object
        const fileObject = {
          name: files[i].name,
          loading: 0,
          size: fileSize,
          remainingTime: 0,
        };

        if (isValid && !isDuplicate) {
          validFiles.push(files[i]);
        } else {
          // If not valid or duplicate, add the error property to the file object
          Object.assign(fileObject, {
            error: !isAccepted
              ? 'File type not accepted.'
              : isDuplicate
              ? 'File already added. Please choose a different file.'
              : `Exceeds ${this.formatFileSize(this.maxFileSize || 0)} limit.`,
          });
        }

        // isDuplicate && console.warn(`Duplicate file detected: ${files[i].name}`);

        fileObjects.push(fileObject);
      }

      // Update the state with new file objects
      this.fileQueue = [...this.fileQueue, ...fileObjects];
      if (validFiles.length > 0) {
        // Dispatch Change Event
        this.dispatch();
        // Dispatch event with valid files
        this.dispatchEvent(
          new CustomEvent('files-selected', {
            detail: { files: validFiles },
            bubbles: true,
            composed: true,
          })
        );
        const dataTransfer = new DataTransfer();
        validFiles.forEach(file => {
          dataTransfer.items.add(file);
        });
        this.files = dataTransfer.files;
      }
    }
  }

  private handleFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.showProgress = files.length > 0;
      this.validateAndProcessFile(files);
    }
  }

  public clickFileInput() {
    this.fileInput.click();
  }

  public removeFile(fileName: string) {
    // Find the index of the file to be removed
    const index = this.uploadFiles.findIndex((file) => file.name === fileName);
    if (index > -1) {
      const fileToRemove = this.uploadFiles[index];
      this.uploadFiles.splice(index, 1);
      this.requestUpdate('uploadFiles');
      // Dispatch Change Event
      this.dispatch();
      // Dispatch the custom event with the file to remove
      this.dispatchEvent(
        new CustomEvent('file-removed', { detail: { file: fileToRemove } })
      );
    }
  }

  public removeFileInProgress(fileName: string) {
    this.fileQueue = this.fileQueue.filter((file) => file.name !== fileName);

    const eventType = this.uploadMode === 'immediate' ? 'cancel-upload' : 'file-removed-from-deferred';
    this.dispatchEvent(new CustomEvent(eventType, {
      detail: { fileName },
      bubbles: true,
      composed: true
    }));
  }

  private formatFileSize(total: number) {
    if (total < 1024) {
      return total + ' bytes';
    } else if (total < 1024 * 1024) {
      return (total / 1024).toFixed(2) + ' KB';
    } else {
      const megabytes = total / (1024 * 1024);
      if (Math.floor(megabytes) === megabytes) {
        return megabytes + ' MB';
      } else {
        return megabytes.toFixed(2) + ' MB';
      }
    }
  }

  private isFileAccepted(file: File): boolean {
    if (!this.accept) return true;

    const acceptTypes = this.accept
      .split(',')
      .map((type) => type.trim().toLowerCase());
    const mimeType = file.type;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    return acceptTypes.some((type) => {
      if (type.startsWith('.')) {
        return type === `.${fileExtension}`;
      } else {
        if (type.endsWith('/*')) {
          const baseType = type.replace('/*', '');
          return mimeType.startsWith(baseType);
        }
        return mimeType === type;
      }
    });
  }


  render() {
    return html`
      <div class=${classMap({ fileupload: true })}>
        <div
          class=${classMap({
            'form-container': true,
            dragging: this.isDragging,
          })}
          @dragover="${this.handleDragOver}"
          @dragenter="${this.handleDragEnter}"
          @dragleave="${this.handleDragLeave}"
          @drop="${this.handleDrop}"
        >
          <input
            class="file-input"
            type="file"
            name="file"
            .multiple=${this.multiple}
            accept=${this.accept}
            hidden
            @change="${this.handleFileSelect}"
          />
          <studs-button button-type="link" @click="${this.clickFileInput}"
            >Select files</studs-button
          >
          <p
            class=${classMap({
              'drop-message-default': true,
              dragging: this.isDragging,
            })}
          >
            Or Drop files here
          </p>
          <p
            class=${classMap({
              'drop-message-dragging': true,
              dragging: this.isDragging,
            })}
          >
            Drop files here
          </p>
          <p class="file-type">
            File Types:
            ${this.accept
              ? this.accept
                  .toUpperCase()
                  .replace(/\./g, '')
                  .split(',')
                  .join(', ')
              : 'Not specified'}
          </p>
          ${this.maxFileSize
            ? html`
                <p class="max-file-size">
                  File size limit: ${this.formatFileSize(this.maxFileSize)}
                </p>
              `
            : ''}
        </div>
        ${this.errorMessage
          ? html`<div class="error-message">${this.errorMessage}</div>`
          : ''}
        ${this.showProgress
          ? html`
              <section class="progress-area">
                ${this.fileQueue.map(
                  (file) => html`
                    <li class="row">
                      <div class="content">
                        <div class="details">
                          <span class="name">${file.name}</span>
                          <studs-button
                            @click="${() =>
                              this.removeFileInProgress(file.name)}"
                            button-type="close"
                            icon="close"
                            ><studs-tooltip position="right"
                              >Cancel Upload</studs-tooltip
                            ></studs-button
                          >
                        </div>
                        ${(this.uploadMode === 'deferred' &&
                          this.activeUploads > 0) ||
                        this.uploadMode !== 'deferred'
                          ? html`
                              <div class="details">
                                <span class="size"
                                  >${file.size}: ${100 - file.loading}%
                                  (remaining time:
                                  ${file.remainingTime
                                    ? formatTimeBySecond(file.remainingTime)
                                    : 'N/A'})</span
                                >
                              </div>
                              <div class="details">
                                <div class="progress-bar">
                                  <div
                                    class="progress"
                                    style="width: ${file.loading}%"
                                  ></div>
                                </div>
                                <span class="percent">${file.loading}%</span>
                              </div>
                            `
                          : ''}
                        <div class="details">
                          ${file.error
                            ? html`<div class="error">${file.error}</div>`
                            : ''}
                        </div>
                      </div>
                    </li>
                  `
                )}
              </section>
            `
          : ''}
        <section class="uploaded-area">
          ${this.uploadFiles.map(
            (file) => html`
              <li class="row">
                <div class="content upload">
                  <studs-icon icon="done" class="done"></studs-icon>
                  <div class="details">
                    <span class="name">${file.name}</span>
                  </div>
                </div>
                <studs-button
                  @click="${() => this.removeFile(file.name)}"
                  button-type="close"
                  icon="delete"
                  ><studs-tooltip position="right"
                    >Remove Upload</studs-tooltip
                  ></studs-button
                >
              </li>
            `
          )}
        </section>
      </div>
    `;
  }

  private handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private handleDragEnter(event: DragEvent) {
    event.preventDefault();
    this.dragCounter++;
    this.isDragging = this.dragCounter > 0;
  }

  private handleDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragCounter--;
    this.isDragging = this.dragCounter > 0;
  }

  private handleDrop(event: DragEvent) {
    event.preventDefault();
    this.dragCounter = 0;
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.showProgress = files.length > 0;
      this.validateAndProcessFile(files);
    }
  }

  protected reset = () => {
    this.files = undefined;
    this.fileQueue = [];
    this.uploadFiles = [];
    this.showProgress = false;
    this.errorMessage = '';
  };
}
