import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ourHiringProcess',
  title: 'Our Hiring Process',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          title: 'Step',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            },
            prepare({ title, subtitle }) {
              return {
                title: `Step : ${title}`,
                subtitle,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      items: 'items',
    },
    prepare({ title, subtitle, items }) {
      return {
        title: title || 'Our Hiring Process',
        subtitle: `${subtitle ? subtitle + ' – ' : ''}${items?.length || 0} step(s)`,
      }
    },
  },
})
