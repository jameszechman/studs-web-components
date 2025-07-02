import type { CollectionConfig } from 'payload/types'

import { adminsOrPublished } from '../../access/adminsOrPublished'
import { editors } from '../../access/editors'
import { Row } from '../../blocks/Row'
import { slugField } from '../../fields/slug'

export const Guides: CollectionConfig = {
  slug: 'guides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/guides/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    // afterChange: [revalidateGuide],
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
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [Row],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
