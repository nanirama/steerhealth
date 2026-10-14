import { defineField } from 'sanity'

export default {
    name: 'ourTeamSection',
    title: 'Our Team Section',
    type: 'object',
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
        }),
    ]
}
