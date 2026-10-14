export default {
  name: 'fmFeatures',
  title: 'Features Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    {
      name: 'subHeading',
      type: 'string',
      title: 'Sub Heading',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
};
