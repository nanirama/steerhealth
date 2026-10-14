import { Image } from 'phosphor-react';
import { defineField, defineType, defineArrayMember } from 'sanity';

export default defineType({
    title: 'Content Section',
    name: 'contentSection',
    type: 'object',
    icon: Image,
    options: {
        collapsible: true,
    },
    fields: [
        defineField({
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
                defineArrayMember({
                    type: 'block'
                }),
            ]
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Content Section',
            };
        },
    },
});
