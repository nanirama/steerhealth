import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'workingAtSteer',
  title: 'Working at Steer',
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
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'item',
          title: 'Item',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
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
              media: 'image',
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
      media: 'items.0.image', // first item image as preview
      items: 'items',
    },
    prepare({ title, subtitle, media, items }) {
      return {
        title: title || 'Working at Steer',
        subtitle: `${subtitle ? subtitle + ' – ' : ''}${items?.length || 0} item(s)`,
        media,
      }
    },
  },
})
