import type { CollectionConfig } from 'payload/types'

import { adminsOrPublished } from '../../access/adminsOrPublished'
import { editors } from '../../access/editors'
import { CodeBlock } from '../../blocks/CodeBlock'
import { RichText } from '../../blocks/RichText'
import { Row } from '../../blocks/Row'
import { slugField } from '../../fields/slug'
import components from "../../generated-elements.json"

export const Components: CollectionConfig = {
  slug: 'components',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/docs/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    // afterChange: [revalidateComponent],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: editors,
    create: editors,
    delete: editors,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'preview',
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload a preview image for the component that will show on the component's archive page.",
        position: 'sidebar',
      },
    },
    {
      name: 'version',
      type: 'relationship',
      relationTo: 'versions',
      required: true,
      defaultValue: () => {
        // Set DEFUALT VALUE to latest STUDS Version
        return {
          id: '660e3345287015bd5010b121',
        }
      },
      admin: {
        description: "On initial component creation, set the version to the latest version of STUDS. Afterwards, an automation will change the version.",
        position: 'sidebar',
      },
    },
    {
      type: 'select',
      name: 'component',
      unique: true,
      label: "Component",
      required: false,
      options: components.tags.map((component) => {
        return {
          label: component.name,
          value: component.name,
        }
      }),
      admin: {
        description: "Select the component that this document will represent.",
        position: 'sidebar',
      },
    },
    {
      type: 'select',
      name: 'component_status',
      label: "Component Status",
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Review',
          value: 'review',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      admin: {
        description: "Select the status of the component.",
        position: 'sidebar',
      },
    },
    {
      type: 'select',
      name: 'category',
      label: "Category",
      required: true,
      defaultValue: 'display',
      options: [
        {
          label: 'Display',
          value: 'display',
        },
        {
          label: 'Inputs',
          value: 'inputs',
        },
        {
          label: 'Navigation',
          value: 'navigation',
        },
        {
          label: 'Overlays',
          value: 'overlays',
        }
      ],
      admin: {
        description: "Select the category of the component. This determines where the component links to",
        position: 'sidebar',
      },
    },
    {
      type: 'text',
      name: 'figma_link',
      label: "Figma Link",
      required: false,
      admin: {
        description: "Link to the Figma file for this component.",
        position: 'sidebar',
      },
    },
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Usage',
          description: 'How to use the component',
          fields: [
            {
              name: 'usage',
              label: 'Layout',
              type: 'blocks',
              required: false,
              blocks: [Row],
            },
          ],
        },
        {
          label: 'Stories',
          description: 'Code examples and use cases for the component that will generate Playroom Snippets',
          fields: [
            {
              name: 'stories',
              label: 'Layout',
              type: 'blocks',
              required: false,
              blocks: [RichText, CodeBlock],
            },
          ],
        },
        {
          label: 'Guidelines',
          description: 'Additional Guidelines for the component',
          fields: [
            {
              name: 'guidelines',
              label: "Layout",
              type: 'blocks',
              required: false,
              blocks: [Row],
            },
          ],
        }
      ],
    },
  ],
}
