import { defineType, defineField } from 'sanity'
import { imagesOptions } from '../data/utils';

export default defineType({
    name: 'moreThingsToExplore',
    title: 'More Things To Explore Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
        }),
        defineField({
            name: 'cards',
            title: 'Explore Cards',
            type: 'array',
            validation: Rule => Rule.max(2).error('Only 2 explore cards are allowed.'),
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: 'title',
                            title: 'Card Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Card Description',
                            type: 'string',
                        }),
                        {
                            name: 'imageUrl',
                            title: 'image URL',
                            type: 'string',
                            options: {
                                list: imagesOptions,
                            }
                        },
                        defineField({
                            name: 'link',
                            title: 'Link to Platform',
                            type: 'reference',
                            to: [{ type: 'platforms' }], // Replace 'platforms' with the actual schema name if different
                        }),
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})
