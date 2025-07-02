import { CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'
import { VERSION } from './versions';

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  invertBackground
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `
...on Content {
  blockType
  invertBackground
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  introContent
  populateBy
  relationTo
  ${CATEGORIES}
  limit
  selectedDocs {
    relationTo
    value {
      ...on Guide {
        id
        slug
        title
        ${META}
      }
      ...on Component {
        id
        slug
        title
        ${META}
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Guide {
        id
        slug
        title
        ${CATEGORIES}
        ${META}
      }
      ...on Component {
        id
        slug
        title
        version {
          ${VERSION}
        }
        ${META}
      }
    }
  }
  populatedDocsTotal
}
`

export const CODE_BLOCK = `
...on CodeBlock {
  blockType
  code
  language
}
`
