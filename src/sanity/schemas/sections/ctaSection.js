import { defineType, defineField } from 'sanity';
import { imagesOptions } from '../data/utils';
export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'kickerText',
      type: 'string',
      title: 'Kicker Text',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
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
      name: 'imageUrl',
      title: 'Image URL',
      type: 'string',
      options: {
        list: imagesOptions,
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    defineField({
      name: 'stats',
      title: 'Join & Grow Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Stat Number (e.g., 19.8)',
              validation: Rule => Rule.required(),
            },
            {
              name: 'suffix',
              type: 'string',
              title: 'Suffix (e.g., M, K+, %)',
              description: 'Optional. Appended to the stat value.',
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label (e.g., Patients Engaged)',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
