// schemas/objects/howSteerProductsHelps.js

import { defineType, defineField, defineArrayMember } from 'sanity'
export default defineType({
    name: 'solutionsSteamline',
    title: 'Solutions Steamline Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
        {
            name: 'ctaButtonPrimary',
            title: 'Primary Button',
            type: 'button',
        },
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
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            validation: Rule => Rule.required(),
                        }),
                        {
                            name: 'icon',
                            type: 'image', // or 'string' if using emoji
                            title: 'Icon',
                            options: {
                                hotspot: true,
                            },
                        },
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
                title: title || 'Solutions Streamline Section',
            }
        },
    },
})
