import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'blogImageSection',
    title: 'Blog Image Section',
    type: 'object',
    options: {
        collapsible: true,
    },
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true, // enables cropping in studio
            },
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Blog Image Section',
            };
        },
    },
});

