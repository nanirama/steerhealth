// schemas/objects/howSteerProductsHelps.js

import { defineType, defineField, defineArrayMember } from 'sanity'
import { imagesOptions } from '../data/utils';
export default defineType({
    name: 'solutionsBeingAtBeginning',
    title: 'Solutions Being At Beginning Section',
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
        defineField({
            name: 'items',
            title: 'List Items',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        }),
                        {
                            name: 'imageUrl',
                            title: 'Image URL',
                            type: 'string',
                            options: {
                                list: imagesOptions,
                            }
                        },
                        {
                            name: 'productLink',
                            title: 'Product Link',
                            type: 'reference',
                            to: [{ type: 'products' }],
                        }
                    ],
                }),
            ],
            validation: Rule => Rule.required().min(1).max(6),
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare({ title }) {
            return {
                title: title || 'Solutions Being At Beginning Section',
            }
        },
    },
})
