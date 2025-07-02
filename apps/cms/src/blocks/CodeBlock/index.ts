import { Block } from 'payload/types';

export const CodeBlock: Block = {
  slug: 'codeBlock',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  fields: [
    {
      name: 'code',
      type: 'code',
      required: true,
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      required: true,
      options: [
        {
          label: 'TypeScript',
          value: 'typescript',
        },
        {
          label: 'JavaScript',
          value: 'javascript',
        },
        {
          label: 'JSON',
          value: 'json',
        },
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'CSS',
          value: 'css',
        },
      ],
    },
  ],
}
