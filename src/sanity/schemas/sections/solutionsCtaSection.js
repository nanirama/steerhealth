
import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'solutionsCtaSection',
    title: 'Solutions Cta Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subheading',
            title: 'Sub Heading',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        {
            name: 'ctaButtonPrimary',
            title: 'Primary Button',
            type: 'button',
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Solutions Cta Section',
            }
        },
    },
})
