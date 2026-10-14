import { defineType, defineField } from 'sanity'


export default defineType({
  name: 'solutions',
  title: 'Solutions',
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
          type: 'heroVideoSection',
        },
        {
          type: 'heroImageSection',
        },
        {
          type: 'solutionsStats',
        },
        {
          type: 'solutionsSteamline',
        },
        {
          type: 'solutionsCtaSection',
        },
        {
          type: 'howSteerProductsHelps',
        },
        {
          type: 'beforeAndAfterSection',
        },
        {
          type: 'howSteerHelps',
        },
        {
          type: 'solutionsBeingAtBeginning',
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
          type: 'solutionsheroImageSection',
        },
        {
          type: 'howSteerHelpscareProviders',
        },
        {
          type: 'fmFeatures',
        },  
        {
          type: 'whyChooseSteerHealth',
        }, 
        {
          type: 'fmStats',
        },  
        {
          type: 'fmTestimonials',
        },        
        {
          type: 'hospitalsHeroSection',
        },
        {
          type: 'operationalResults',
        },
        {
          type: 'hospitalResults',
        },
        {
          type: 'customerStories',
        },
        {
          type: 'hospitalTestimonials',
        },
        {
          type: 'howWeCreateValue',
        },
        {
          type: 'clientLogos',
        },
        {
          type: 'clientsSection',
        },
        {
          type: 'founderMessage',
        },
        {
          type: 'credibilityShowcase',
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
        subtitle: `/who-we-serve/${slug}`,
      }
    },
  },  
})