import { Constructor } from '../utils/types.ts';
import { LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { watch } from '../directives/watch.ts';
import { tabbable } from 'tabbable';
import { getDeepActiveElement } from '../utils/shared.ts';

export interface DialogElementInterface {
  open?: boolean;
  closeOnOverlayClick?: boolean;
  type?: 'modal' | 'popover';
  dialog: HTMLDialogElement;
  handleOpen(): void;
  toggle(): void;
  onClose(): void;
}

/**
 * A mixin to add dialog functionality to an element
 * @param superClass
 * @constructor
 */

export const DialogElement = <T extends Constructor<LitElement>>(superClass: T) => {
  // @ts-ignore
  class DialogElementClass extends superClass {
    /**
     * The dialog open state
     */
    @property({type: Boolean}) open?: boolean;
    /**
     * Enables closing the dialog on overlay click
     */
    @property({type: Boolean, attribute: "close-on-overlay-click"}) closeOnOverlayClick?: boolean = undefined;
    @property({type: String}) type?: 'modal' | 'popover';
    @query('dialog') dialog!: HTMLDialogElement;
    @state() _overlayEventListenerAdded = false;

    private handleScrollLock() {
      const body = document.querySelector('body');
      if(body) {
        if (this.open) {
          Object.assign(body.style, {
            overflow: 'hidden'
          });
        } else {
          Object.assign(body.style, {
            overflow: ''
          });
        }
      }
    }

    @watch('closeOnOverlayClick')
    handleOverlayClick() {
      this.updateComplete.then(() => {
        if(this.closeOnOverlayClick && !this._overlayEventListenerAdded) {
          this._overlayEventListenerAdded = true;
          this.dialog.addEventListener('click', this.handleOnOverlayClose);
        } else if (!this.closeOnOverlayClick && this._overlayEventListenerAdded) {
          this._overlayEventListenerAdded = false;
          this.dialog.removeEventListener('click', this.handleOnOverlayClose);
        }
      });
    }

    private handleOnOverlayClose = (e: MouseEvent) => {
      if (e.target === this.dialog) {
        this.onClose();
      }
    }

    @watch('open')
    handleOpen() {
      this.updateComplete.then(() => {
        if(this.open) {
          if(this.type === 'modal') this.dialog.showModal()
          else if(this.type === 'popover') this.dialog.showPopover()
          else this.dialog.show();
          
          document.addEventListener('keydown', this.closeOnEsc);
          this.dialog.addEventListener('keydown', this.lockFocusOnDialog);
        } else {
          this.dialog.close();

          document.removeEventListener('keydown', this.closeOnEsc);
          this.dialog.removeEventListener('keydown', this.lockFocusOnDialog);
        }

        this.handleScrollLock();
      });
    }

    private closeOnEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.onClose();
      }
    }

    private lockFocusOnDialog = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = tabbable(this.dialog, {
          includeContainer: false,
          getShadowRoot: true
        });

        const active = getDeepActiveElement();
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        if (!e.shiftKey && active === lastElement) {
          e.preventDefault();
          firstElement.focus();
        } else if (e.shiftKey && active === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      if(this._overlayEventListenerAdded) this.dialog.removeEventListener('click', this.handleOnOverlayClose);
    }

    /**
     * Show the dialog
     */
    public onOpen() {
      this.open = true;
    }

    /**
     * Toggle the dialog
     */
    public toggle() {
      if(this.open) this.onClose();
      else this.onOpen()
    }

    /**
     * Hide the dialog
     */
    public onClose() {
      this.open = false;
    }
  }

  return DialogElementClass as unknown as Constructor<DialogElementInterface> & T;
}