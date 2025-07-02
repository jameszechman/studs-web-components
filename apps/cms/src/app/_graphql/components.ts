import { CALL_TO_ACTION, CODE_BLOCK, CONTENT, MEDIA_BLOCK } from './blocks';
import { MEDIA_FIELDS } from './media';
import { META } from './meta'
import { VERSION, VERSIONS } from './versions';

export const COMPONENTS = `
  query Components {
    Components(limit: 300)  {
      docs {
        slug
      }
    }
  }
`

export const COMPONENT = `
  query Component($slug: String, $draft: Boolean) {
    Component(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        version {
          ${VERSION}
        }
        preview {
          ${MEDIA_FIELDS}
        }
        componentMetadata {
          tag
          status
          category
          version
        }
        usageGuidelinesLayout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${MEDIA_BLOCK}
          ${CODE_BLOCK}
        }
        componentStories {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${MEDIA_BLOCK}
          ${CODE_BLOCK}
        }
        additionalGuidanceLayout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${MEDIA_BLOCK}
          ${CODE_BLOCK}
        }
        ${META}
      }
    }
  }
`
