// schemas/sections/whatWeSolveSection.ts
import { defineField, defineType } from 'sanity'

export default {
  name: 'whatWeSolveSection',
  title: 'What We Solve Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What We’re trying to solve',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Challenges',
      type: 'array',
      of: [
        defineType({
          name: 'challengeItem',
          title: 'Challenge Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ]
}
