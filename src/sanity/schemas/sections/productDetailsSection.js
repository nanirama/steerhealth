export default {
  name: 'productDetailsSection',
  title: 'Product Details Section',
  type: 'object',
  fields: [
    {
      name: 'row1',
      title: 'Row 1 (2 Columns)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
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
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
          ]
        },
      ],
      validation: Rule => Rule.length(2),
    },
    {
      name: 'row2',
      title: 'Row 2 (3 Columns)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
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
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
          ]
        },
      ],
      validation: Rule => Rule.length(3),
    },
    {
      name: 'row3',
      title: 'Row 3 (1 Column)',
      type: 'object',
      fields: [
        {
              name: 'title',
              title: 'Title',
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
              validation: Rule => Rule.required(),
            },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        },
      ]
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Product Details Section',
      }
    },
  },
}
