// schemas/sections/realImpactSection.ts

export default {
  name: 'realImpactSection',
  title: 'Real Impact Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Paragraph', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                type: 'textColor',
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metrics',
      title: 'Impact Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'Numeric part of the value (e.g., "30", "18")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Optional suffix (e.g., "%", "X")',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Short description below the value',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              value: 'value',
              suffix: 'suffix',
              description: 'description',
            },
            prepare({ value, suffix, description }) {
              return {
                title: `${value}${suffix || ''}`,
                subtitle: description,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Real Impact Section',
      };
    },
  },
};
