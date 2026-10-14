import { defineField } from 'sanity'

export default {
    name: 'workBuddiesSection',
    title: 'Work Buddies Section',
    type: 'object',
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
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true, // enables image cropping
                    },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Alternative text for screen readers and SEO.',
                        }
                    ]
                }
            ]
        }
    ]
}
