import {defineField, defineType} from 'sanity';

export default defineType({
  title: 'SEO / Share Settings',
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: (Rule) =>
        Rule.required().warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: (Rule) =>
        Rule.required().max(150).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      title: 'Social Share Image',
      name: 'shareImage',
      type: 'image',
      description: 'Recommended size: 1200x630 (PNG or JPG)',
    }),
  ],
});
