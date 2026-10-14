import { videoOptions, imagesOptions } from '../data/utils';

export default {
  name: 'heroSection',
  title: 'Hero Section',
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
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
    },
    {
      name: 'ctaButtonSecondary',
      title: 'Secondary Button',
      type: 'button',
    },
    {
      name: 'bookingsPercentage',
      title: 'Bookings increase percentage',
      type: 'number',
    },
    {
      name: 'bookingsLabel',
      title: 'Bookings Label',
      type: 'string',
    },
    {
  name: 'media',
  title: 'Media',
  type: 'object',
  validation: (Rule) =>
    Rule.custom((media) => {
      if (!media?.type) {
        return 'Please select a media type';
      }

      if (media.type === 'image' && !media.imageUrl) {
        return 'Image URL is required';
      }

      if (media.type === 'video' && !media.videoUrl) {
        return 'Video file is required';
      }

      return true;
    }),
  fields: [
    {
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image URL', value: 'image' },
          { title: 'Video URL', value: 'video' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'imageUrl',
      title: 'Image URL',
      type: 'string',
      options: {
        list: imagesOptions,
      },
      hidden: ({ parent }) => parent?.type !== 'image',
    },
    {
      name: 'videoUrl',
      title: 'Video File',
      type: 'string',
      options: {
        list: videoOptions,
      },
      hidden: ({ parent }) => parent?.type !== 'video',
    },
  ],
}

  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare() {
      return {
        title: 'Hero Section',
      };
    },
  },
};
