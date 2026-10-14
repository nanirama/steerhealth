// schemas/objects/solutionsStats.js

import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'solutionsStats',
  title: 'Solutions Stats Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',      
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',      
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'prefix',
              title: 'Prefix',
              type: 'string',
              description: 'E.g., $, ₹, etc.',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'E.g., %, M, K, etc.',
            }),
          ],
        }),
      ],
      validation: Rule => Rule.min(1).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Solutions Stats Section',
      }
    },
  },
})
