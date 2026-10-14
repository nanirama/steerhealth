import { imagesOptions } from '../data/utils';

export default {
  name: 'aboutHeroSection',
  title: 'About Page Hero Section',
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
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
    },
    {
      name: 'imageUrl',
      title: 'Image URL',
      type: 'string',
      options: {
        list: imagesOptions,
      },
      validation: (Rule) => Rule.required(),
    }   

  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare() {
      return {
        title: 'About Page Hero Section',
      };
    },
  },
};
