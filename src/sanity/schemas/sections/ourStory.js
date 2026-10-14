// /schemas/ourStory.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ourStory',
  title: 'Our Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Timeline Items',
      type: 'array',
      of: [
        defineField({
          name: 'timelineItem',
          title: 'Timeline Item',
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'string',
            },
            {
              name: 'headline',
              title: 'Headline',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  marks: {
                    decorators: [
                      {title: 'Bold', value: 'strong'},
                      {title: 'Italic', value: 'em'}
                    ]
                  }
                }
              ]
            },
          ],
          preview: {
            select: {
              title: 'headline',
              subtitle: 'year',
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Our Story Section',
      }
    },
  },
})
