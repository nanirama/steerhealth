// schemas/objects/howSteerProductsHelps.js

import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'howSteerProductsHelps',
  title: 'How Steer Products Helps Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Help Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon / Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            }),
            {
              name: 'productLink',
              title: 'Product Link',
              type: 'reference',
              to: [{ type: 'products' }],
            }
          ],
        }),
      ],
      validation: Rule => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'How Steer Products Helps',
      }
    },
  },
})
