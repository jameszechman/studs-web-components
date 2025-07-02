import { Block } from 'payload/types';

export const GuidelinesBlock: Block = {
  slug: 'guidelinesBlock',
  labels: {
    singular: 'Guideline',
    plural: 'Guidelines',
  },
  fields: [{
    name: 'do',
    type: 'richText',
    required: true,
  },
  {
    name: 'dont',
    type: 'richText',
    required: true,
  }
  ]
}
