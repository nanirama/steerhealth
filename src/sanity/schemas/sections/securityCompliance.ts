import { defineField } from 'sanity'

export default {
    name: 'securityCompliance',
    title: 'Security & Compliance',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            title: 'Section Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subHeading',
            title: 'Sub Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        {
            name: 'image',
            type: 'image',
            title: 'Upload Image 1',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'image2',
            type: 'image',
            title: 'Upload Image 2',
            options: {
                hotspot: true,
            },
        },

    ],
}
