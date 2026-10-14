import { defineType, defineField } from 'sanity';
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'topBanner', title: 'TopBanner' },
  ],
  fields: [
    defineField({
      name: 'enableTopbanner',
      title: 'Do you want topBanner',
      type: 'boolean',
      group: 'topBanner',
      initialValue: true,
    }),
    defineField({
      name: 'bannerText',
      title: 'Banner Text',
      type: 'string',
      group: 'topBanner',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      group: 'topBanner',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      group: 'topBanner',
    }),
  ],
});
