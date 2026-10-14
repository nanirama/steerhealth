import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigateCapabilitiesBeingBeginning',
  title: 'Navigate Capabilities Being Beginning Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
