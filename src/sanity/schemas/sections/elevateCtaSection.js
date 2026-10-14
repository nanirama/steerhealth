import { defineType } from 'sanity';
import { imagesOptions } from '../data/utils';
export default defineType({
  name: 'elevateCtaSection',
  title: 'Elevate CTA Section',
  type: 'object',
  fields: [
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
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Cta Section',
      };
    },
  },
});
