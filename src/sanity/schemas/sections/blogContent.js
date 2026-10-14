import { Image } from 'phosphor-react';
import { defineField, defineType, defineArrayMember } from 'sanity';

export default defineType({
    title: 'Blog Content Section',
    name: 'blogContent',
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
                    type: 'block',
                    styles: [
                        { title: 'Paragraph', value: 'normal' },
                        { title: 'Heading 2', value: 'h2' },
                        { title: 'Heading 3', value: 'h3' },
                        { title: 'Heading 4', value: 'h4' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                        annotations: [],
                    },
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Blog Content Section',
            };
        },
    },
});
