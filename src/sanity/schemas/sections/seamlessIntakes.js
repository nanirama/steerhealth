import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seamlessIntakes',
  title: 'Seamless Intakes Section',
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
