// schemas/objects/beforeAndAfterSection.js
import { imagesOptions } from '../data/utils';
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'beforeAndAfterSection',
    title: 'Before and After Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Section Description',
            type: 'text',
        }),
        {
            name: 'ImageUrl',
            title: 'Image URL',
            type: 'string',
            options: {
                list: imagesOptions,
            },
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'beforeAfterItems',
            title: 'Before / After Items',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'beforeAfterItem',
                    title: 'Before / After Item',
                    type: 'object',
                    fields: [
                        {
                            name: 'ImageUrl',
                            title: 'Image URL',
                            type: 'string',
                            options: {
                                list: imagesOptions,
                            },
                            validation: (Rule) => Rule.required(),
                        },
                        // defineField({
                        //     name: 'beforeTitle',
                        //     title: 'Before Title',
                        //     type: 'string',
                        //     initialValue: 'Before',
                        // }),
                        // defineField({
                        //     name: 'beforeDescription',
                        //     title: 'Before Description',
                        //     type: 'text',
                        // }),
                        {
                            name: 'beforeDescription',
                            title: 'Before Text',
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
                        // defineField({
                        //     name: 'afterTitle',
                        //     title: 'After Title',
                        //     type: 'string',
                        //     initialValue: 'After',
                        // }),
                        {
                            name: 'afterDescription',
                            title: 'After Text',
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
                }),
            ],
            validation: Rule => Rule.required().min(1).max(10),
        }),
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
