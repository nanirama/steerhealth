import { defineField, defineType, defineArrayMember } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export default defineType({
    name: 'faqs',
    title: 'Faqs',
    type: 'document',
    icon: HelpCircleIcon,
    fields: [
        defineField({
            title: 'Question',
            name: 'question',
            type: 'string',
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'faqCategory' }],
                },
            ]
        }),
        defineField({
            type: 'array',
            name: 'answer',
            title: 'Answer',
            validation: (rule: any) => rule.required(),
            description:
                "Only paragraph (normal), bold, and italic are allowed in this rich text field.",
            of: [
                defineArrayMember({
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' }, // Only paragraph allowed
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                        annotations: [], // No links, emails, etc.
                    },
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'question',
        },
        prepare({ title }) {
            return {
                title,
            };
        },
    },
})
