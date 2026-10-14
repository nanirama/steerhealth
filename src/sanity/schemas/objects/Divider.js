// ./src/sanity/schemas/objects/divider.js
import { defineType } from 'sanity'
import { SplitHorizontalIcon } from '@sanity/icons'

export default defineType({
  name: 'divider',
  type: 'object',
  title: 'Divider',
  icon: SplitHorizontalIcon,
  fields: [
    {
      name: 'enabled',
      type: 'boolean',
      title: 'Show Divider',
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Divider',
        media: SplitHorizontalIcon,
      }
    },
  },
})
