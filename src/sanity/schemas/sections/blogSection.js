import { defineField, defineType } from 'sanity';

export default defineType({
    title: 'Blog Section',
    name: 'blogSection',
    type: 'object',
    options: {
        collapsible: true,
    },
    fields: [
        defineField({
            title: 'Heading',
            name: 'heading',
            type: 'string',
        }),
        defineField({
            title: 'Sub Heading',
            name: 'subheading',
            type: 'string',
        }),
        {
            name: 'ctaButtonPrimary',
            title: 'Primary Button',
            type: 'button',
        },       
        defineField({
            name: 'blogPosts',
            title: 'Blog Posts',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'post' }],
                },
            ],
            validation: (Rule) => Rule.required().min(1).max(3),
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Blog Section',
            };
        },
    },
});
