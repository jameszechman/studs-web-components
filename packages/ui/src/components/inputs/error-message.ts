import { studsElement } from '../../decorators/studs-element';
import { StudsHelperText } from './helper-text';

/**
 * @element studs-error-message
 *
 * @slot - The default slot for the ErrorMessage's content
 */
@studsElement('studs-error-message')
export class StudsErrorMessage extends StudsHelperText {
  constructor() {
    super();
    this.status = 'error';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-error-message': StudsErrorMessage;
  }
}