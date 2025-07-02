import type { Block, Field } from 'payload/types';
import { DefinitionList } from './DefinitionList';
import { ExampleBlock } from './ExampleBlock';
import { GuidelinesBlock } from './GuidelinesBlock';
import { CodeBlock } from './CodeBlock';
import { RichText } from './RichText';
import { CallToAction } from './CallToAction';
import { MediaBlock } from './MediaBlock';
import link from '../fields/link';

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'full',
    options: [
      {
        value: 'oneThird',
        label: 'One Third',
      },
      {
        value: 'half',
        label: 'Half',
      },
      {
        value: 'twoThirds',
        label: 'Two Thirds',
      },
      {
        value: 'full',
        label: 'Full',
      },
    ],
  },
  {
    name: 'content',
    type: 'blocks',
    minRows: 1,
    blocks: [
      CallToAction, 
      MediaBlock, 
      RichText, 
      CodeBlock,
      ExampleBlock,
      DefinitionList,
      GuidelinesBlock
    ],
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Row: Block = {
  slug: 'row',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
