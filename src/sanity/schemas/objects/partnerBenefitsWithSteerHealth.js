import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'partnerBenefitsWithSteerHealth',
    title: 'Partner With SteerHealth',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'Partner with SteerHealth to get the right care',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'items',
            title: 'Feature Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'text',
                            title: 'Button Text',
                            type: 'string',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            options: {
                                hotspot: true
                            }
                        }
                    ],
                    preview: {
                        select: {
                            title: 'text',
                            media: 'icon'
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1)
        })
    ],
    preview: {
        prepare() {
            return {
                title: 'Partner Benefits With SteerHealth Section'
            }
        }
    }
})
