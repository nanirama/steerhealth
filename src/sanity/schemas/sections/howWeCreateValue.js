export default {
  name: 'howWeCreateValue',
  title: 'How We Create Value Section',
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
            {
              name: 'ctaButtonPrimary',
              title: 'Primary Button',
              type: 'button',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'How We Create Value',
        subtitle: subtitle || 'No subheading',
      }
    },
  },
}