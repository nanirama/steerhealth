// schemas/objects/steerAdvantageSection.js
export default {
  name: 'steerAdvantageSection',
  title: 'Steer Advantage Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    {
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
    },
    {
      name: 'features',
      type: 'array',
      title: 'Advantage Features',
      of: [
        {
          type: 'object',
          title: 'Feature Item',
          fields: [
            {
              name: 'icon',
              type: 'image', // or 'string' if using emoji
              title: 'Icon',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Steer Advantage Section',
      }
    },
  },
};
