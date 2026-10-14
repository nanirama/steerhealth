import { defineType, defineField } from 'sanity'


export default defineType({
  name: 'products',
  title: 'Products',
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
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "orderBy",
      title: "Order By",
      type: "number",
      description: "Use this field to manually control the order of solutions",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'productHeroSection',
        },
        {
          type: 'steerAdvantageSection',
        },
        {
          type: 'solutionsStats',
        },
        {
          type: 'productDetailsSection',
        },
        {
          type: 'whyEveryOneLoves',
        },
        {
          type: 'testimonialsSection',
        },
        {
          type: 'faqSection',
        },
        {
          type: 'ctaSection',
        },
        {
          type: 'fmFeatures',
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
        subtitle: `/products/${slug}`,
      }
    },
  },  
})