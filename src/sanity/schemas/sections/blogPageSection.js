import { defineField, defineType } from 'sanity';

export default defineType({
    title: 'Blog Page Section',
    name: 'blogPageSection',
    type: 'object',
    options: {
        collapsible: true,
    },
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
        }) 
    ],
    preview: {
        prepare() {
            return {
                title: 'Blog Section',
            };
        },
    },
});
