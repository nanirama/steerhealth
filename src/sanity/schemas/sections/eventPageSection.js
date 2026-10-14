import { defineField, defineType } from 'sanity';

export default defineType({
    title: 'Event Page Section',
    name: 'eventPageSection',
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
                title: 'Event Section',
            };
        },
    },
});
