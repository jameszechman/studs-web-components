import { ARCHIVE_BLOCK, CALL_TO_ACTION, CODE_BLOCK, ROW, MEDIA_BLOCK } from './blocks';
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'
import { CATEGORIES } from './categories';

export const GUIDES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
        slug
      }
    }
  }
`

export const GUIDE = `
  query Guide($slug: String, $draft: Boolean) {
    Guide(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        ${CATEGORIES}
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${ROW}
          ${CALL_TO_ACTION}
          ${ROW}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
          ${CODE_BLOCK}
        }
        ${META}
      }
    }
  }
`
