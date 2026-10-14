import { defineType } from 'sanity'
export default defineType({
    name: 'testimonialsSection',
    title: 'Testimonials Section',
    type: 'object',
    fields: [
        {
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'testimonials' }],
                    options: {
                        disableNew: true, // 👈 This disables creating new testimonials inline
                    },
                },
            ],
        },
    ],
    preview: {
        select: {},
        prepare() {
            return {
                title: 'Testimonials Section',
            };
        },
    },
})
