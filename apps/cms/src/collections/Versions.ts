import type { CollectionConfig } from 'payload/types'

const Versions: CollectionConfig = {
  slug: 'versions',
  admin: {
    useAsTitle: 'version',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'version',
      type: 'text',
    },
    {
      name: 'current',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    }
  ],
}

export default Versions
