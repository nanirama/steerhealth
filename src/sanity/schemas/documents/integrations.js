import { defineType, defineField } from 'sanity'


export default defineType({
  name: 'integrations',
  title: 'Integrations',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'shortdescription',
      title: 'Short Description',
      type: 'string',
      rows: 2
    },
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),   
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
            type: 'solutionsheroImageSection',
        },
        {
          type: 'contentHighlightSection',
        },
        {
          type: 'howItWorks',
        },
        {
          type: 'checkoutOurIntegrations',
        },
        {
          type: 'faqSection',
        },
        {
          type: 'ctaSection',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare({ title, slug }) {
      return {
        title: `${title}`,
        subtitle: `/integrations/${slug}`,
      }
    },
  },
  
})
