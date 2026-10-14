import { defineType, defineField } from 'sanity'

const isUniquePerCategory = async (slug, context) => {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2023-01-01' })

  const categoryRef = document?.category?._ref
  const currentDocId = document?._id?.replace(/^drafts\./, '')

  if (!slug?.current || !categoryRef) return true

  const query = `
    *[_type == "platforms" && slug.current == $slug && category._ref == $categoryRef && _id != $docId][0] {
      _id
    }
  `

  const params = {
    slug: slug?.current,
    categoryRef,
    docId: currentDocId,
  }

  const existing = await client.fetch(query, params)
  return !existing
}

export default defineType({
  name: 'platforms',
  title: 'Platforms',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'platformCategory' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniquePerCategory,
      },
      validation: Rule => Rule.required(),
    },
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo',
      validation: Rule => Rule.required(),
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
          type: 'steerAdvantageSection',
        },
        {
          type: 'clientsSection',
        },
        {
          type: 'steerHealthBenefits',
        },
        {
          type: 'workWithYourEcoSystem',
        },
        {
          type: 'acquireCapabilitiesBeingBeginning',
        },
        {
          type: 'automateCapabilitiesBeingBeginning',
        },
        {
          type: 'howSteerSolutionsHelps',
        },
        {
          type: 'navigateCapabilitiesBeingBeginning',
        },
        {
          type: 'solutionsForEverySystems',
        },
        {
          type: 'steerEffortlessIntegration',
        },
        {
          type: 'patientAcquisitionBenefits',
        },
        {
          type: 'testimonialsSection',
        },
        {
          type: 'moreThingsToExplore',
        },
        {
          type: 'faqSection',
        }, 
        {
          type: 'ctaSection',
        }, 
        {
          type: 'steerHealthPartnershipOutcomes',
        },  
          {
          type: 'seamlessIntakes',
        },
        {
          type: 'solutionsBeingAtBeginning',
        },  
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      category: 'category.title',
      categorySlug: 'category.slug.current',
    },
    prepare({ title, slug, category, categorySlug }) {
      return {
        title: `${category} - ${title}`,
        subtitle: slug==='overview' ? `${categorySlug}` :  `${categorySlug}/${slug}`,
      }
    },
  },
  orderings: [
    {
      title: 'Category A–Z',
      name: 'categoryAsc',
      by: [
        { field: 'category.title', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
    {
      title: 'Category Z–A',
      name: 'categoryDesc',
      by: [
        { field: 'category.title', direction: 'desc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
})
