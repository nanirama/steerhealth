import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'steerHealthBenefits',
  title: 'Steer Health Benefits Section',
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
    }),
    defineField({
      name: 'benefitCards',
      title: 'Benefit Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Card Title',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Paragraph', value: 'normal' }],
                  lists: [],
                  marks: {
                    decorators: [],
                    annotations: [],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Card Description',
              type: 'string',
            },
            {
              name: 'statNote',
              title: 'Stat Note (e.g., 60% of calls deflected)',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'comparisonTable',
      title: 'Feature Comparison Table',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Feature Name',
              type: 'string',
            },
            {
              name: 'discount',
              title: 'Discount',
              type: 'string',
            },
            {
              name: 'othersAvailable',
              title: 'Available for Others',
              type: 'boolean',
            },
            {
              name: 'steerAvailable',
              title: 'Available for SteerHealth Users',
              type: 'boolean',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
