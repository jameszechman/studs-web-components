import type { GlobalConfig } from 'payload/types'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'storybookUrl',
      label: 'Storybook URL',
      type: 'text'
    },
    {
      name: 'githubUrl',
      label: 'GitHub URL',
      type: 'text'
    },
    {
      name: 'bitbucketUrl',
      label: 'Bitbucket URL',
      type: 'text'
    },
    {
      name: 'figmaUrl',
      label: 'Figma URL',
      type: 'text'
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    }
  ],
}
