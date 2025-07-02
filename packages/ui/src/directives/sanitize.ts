import { unsafeHTML } from 'lit/directives/unsafe-html.js';

function sanitizeHTML(string?: string, allowedTags: string[] = []) {
  if (string) {
    const regex = new RegExp(`<(?!\/?(${allowedTags.join('|')})\b)[^>]*>`, 'gi');
    return string.replace(regex, '');
  }
}

export const sanitize = (string?: string, allowedTags?: string[]) => {
  if (string) return unsafeHTML(sanitizeHTML(string, allowedTags));
};