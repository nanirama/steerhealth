export default {
  name: 'homeSteerSolutionsSection',
  title: 'Home Steer Solutions Section',
  type: 'object',
  fields: [
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'platforms',
      title: 'Platforms',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Platform',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' }
                  ],
                  marks: {
                    decorators: [],
                    annotations: []
                  },
                  lists: []
                }
              ],
              description: 'The main testimonial text (supports bold & italic)'
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' }
                  ],
                  marks: {
                    decorators: [],
                    annotations: []
                  },
                  lists: []
                }
              ],
              description: 'Optional subtitle text (supports bold & italic)',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
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
              description: 'Platform description (supports bold & italic)',
            },

            {
              name: 'image',
              type: 'image',
              title: 'Upload Image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'secondimage',
              type: 'image',
              title: 'Upload Rotate Image',
              options: {
                hotspot: true,
              },
            },
            // {
            //   name: 'imageUrl',
            //   title: 'Image URL',
            //   type: 'string',
            //   options: {
            //     list: imagesOptions,
            //   },
            //   validation: (Rule) => Rule.required(),
            // },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'iconLabel',
              title: 'label',
              type: 'string',
            },
            {
              name: 'ctaButtonPrimary',
              title: 'Primary Button',
              type: 'button',
            },
            {
              name: 'stats',
              title: 'Stats',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                    },
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'array',
                      of: [
                        {
                          type: 'block',
                          styles: [
                            { title: 'Normal', value: 'normal' }
                          ],
                          marks: {
                            decorators: [],
                            annotations: []
                          },
                          lists: []
                        }
                      ]
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
