import { CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'
import { VERSION } from './versions';

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CODE_BLOCK = `
...on CodeBlock {
  blockType
  code
  language
}
`

export const RICH_TEXT = `
...on RichTextBlock {
  blockType
  richText
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  position
  ${MEDIA}
}
`

export const GUIDELINES_BLOCK = `
...on GuidelinesBlock {
  blockType
  do
  dont
}
`

export const DEFINITION_LIST = `
...on DefinitionList {
  blockType
  title
  items {
    term
    definition
  }
}
    `

export const EXAMPLE_BLOCK = `
...on ExampleBlock {
  blockType
  title
  color
  richText
}
`

export const ROW = `
...on Row {
  blockType
  columns {
    size
    content {
      ...on Cta {
        ${CALL_TO_ACTION}
      }
      ...on MediaBlock {
        ${MEDIA}
      }
      ...on RichTextBlock {
        ${RICH_TEXT}
      }
      ...on CodeBlock {
        ${CODE_BLOCK}
      }
      ...on ExampleBlock {
        ${EXAMPLE_BLOCK}
      }
      ...on DefinitionList {
        ${DEFINITION_LIST}
      }
      ...on GuidelinesBlock {
        ${GUIDELINES_BLOCK}
      }
    }
    enableLink
    link ${LINK_FIELDS()}
  }
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

