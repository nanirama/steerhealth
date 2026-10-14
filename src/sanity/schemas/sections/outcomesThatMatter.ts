import { defineType, defineField } from 'sanity'

export default {
  name: 'outcomesThatMatter',
  title: 'Outcomes That Matter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule:any) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Outcome Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (optional)',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',              
              validation: (Rule:any) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
}
