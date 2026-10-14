
import { defineArrayMember, defineField, defineType } from 'sanity'
import CustomIcon from '../objects/CustomIcon'

export default defineType({
    name: 'p2p',
    title: 'P2P Landing Page',
    type: 'document',
    icon: CustomIcon,
    // Uncomment below to have edits publish automatically as you type
    // liveEdit: true,
    fields: [
        defineField({
            name: 'title',
            description: 'This field is the title of your personal website.',
            title: 'Title',
            type: 'string',
            validation: (rule: any) => rule.required(),
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
                subtitle: 'Home',
                title,
            }
        },
    },
})
