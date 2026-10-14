
import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons' // you can change this icon

export default defineType({
    name: 'landingPages',
    title: 'Landing Pages',
    type: 'document',
    icon: DocumentsIcon, // 👈 Choose a Sanity icon here
    fields: [
        defineField({
            name: 'title',
            description: 'This field is the title of your personal website.',
            title: 'Title',
            type: 'string',
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'seo',
            title: 'SEO Meta Data',
            type: 'seo', // This calls your SEO object defined elsewhere
        }),
        {
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'homeHeroSection',
                },
                {
                    type: 'homeStats',
                },
                {
                    type: 'testimonialsSection',
                },
                {
                    type: 'steerHealthPartnershipOutcomes',
                },
                {
                    type: 'steerEffortlessIntegration',
                },
                {
                    type: 'solutionsForEverySystems',
                },
                {
                    type: 'homeSteerSolutionsSection',
                },   
                {
                    type: 'solutionsheroImageSection',
                },
                {
                    type: 'clientLogos',
                },
                {
                    type: 'fmFeatures',
                },
                {
                    type: 'solutionsCtaSection',
                },
                {
                    type: 'whyChooseSteerHealth',
                },
                {
                    type: 'howSteerHelpscareProviders',
                },
                {
                    type: 'fmStats',
                },
                {
                    type: 'fmTestimonials',
                },
                {
                    type: 'ctaSection',
                },
                {
                    type: 'p2pHdrLogosSection',
                }
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                subtitle: 'Landing Page',
                title,
            }
        },
    },
})
