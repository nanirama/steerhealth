import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'costOfDisconnectedSystems',
  title: 'Cost of Disconnected Systems Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
          lists: [],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Problem Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Paragraph', value: 'normal' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [],
                  },
                  lists: [],
                },
              ],
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare() {
      return {
        title: 'Cost of Disconnected Systems Section',
      }
    },
  },
})
