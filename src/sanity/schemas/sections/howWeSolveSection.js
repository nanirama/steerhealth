// schemas/sections/howWeSolveSection.ts
import { defineType, defineField } from 'sanity'

export default {
  name: 'howWeSolveSection',
  title: 'How We Solve Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'How we’re trying to solve it',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Intro Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        defineType({
          name: 'valueItem',
          title: 'Value Item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG or Image)',
              type: 'image', // or 'file' if SVG
              options: { hotspot: true },
            }),
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
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ]
}
