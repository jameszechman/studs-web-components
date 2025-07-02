import { CODE_BLOCK, RICH_TEXT, ROW } from './blocks';
import { MEDIA_FIELDS } from './media';
import { VERSION } from './versions';

const COMPONENTINNER = `
  id
  title
  description
  preview {
    ${MEDIA_FIELDS}
  }
  version {
    ${VERSION}
  }
  component
  component_status
  category
  figma_link
  slug
  usage {
    ${ROW}
  }
  stories {
    ${RICH_TEXT}
    ${CODE_BLOCK}
  }
  guidelines {
    ${ROW}
  }
`

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
    Components(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
				${COMPONENTINNER}
			}
    }
  }
`
