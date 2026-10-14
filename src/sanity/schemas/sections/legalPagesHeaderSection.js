// schemas/sections/legalPagesHeaderSection.ts
import { defineField } from 'sanity'

export default {
    name: 'legalPagesHeaderSection',
    title: 'Pages Header Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'lastRevised',
            title: 'Sub Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        })        
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare: (selection) => ({
            title: `${selection.title}`
        }),
    },
}
