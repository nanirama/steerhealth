// schemas/objects/beforeAndAfterSection.js
import { imagesOptions } from '../data/utils';
import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'howSteerHelps',
    title: 'How Steer Helps Section',
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
            name: 'imageUrl',
            title: 'Image URL',
            type: 'string',
            options: {
                list: imagesOptions,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [{ title: 'Paragraph', value: 'normal' }],
                    lists: [],
                    marks: {
                        decorators: [],
                        annotations: [],
                    },
                },
            ],
            validation: (Rule) => Rule.required(),
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Before and After Section',
            }
        },
    },
})
