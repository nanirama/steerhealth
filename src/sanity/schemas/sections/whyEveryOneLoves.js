import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'whyEveryOneLoves',
    title: 'Why Every One Loves Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'benefitCards',
            title: 'Benefit Cards',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Card Title',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [{ title: 'Paragraph', value: 'normal' }],
                                    lists: [],
                                    marks: {
                                        decorators: [],
                                        annotations: [],
                                    },
                                },
                            ],
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'description',
                            title: 'Card Description',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Paragraph', value: 'normal' },
                                        { title: 'Heading 3', value: 'h3' } // ✅ Added H3 option
                                    ],
                                    lists: [],
                                    marks: {
                                        decorators: [],
                                        annotations: [],
                                    },
                                },
                            ],
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        },
                    ],
                },
            ],
        }),
        {
            name: 'compareFeature',
            title: 'Compare Feature',
            type: 'string',
        },
        {
            name: 'steerLabel',
            title: 'Compare Steer Label',
            type: 'string',
        },
        {
            name: 'otherLabel',
            title: 'Compare Other Label',
            type: 'string',
        },
        defineField({
            name: 'comparisonTable',
            title: 'Feature Comparison Table',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'othersAvailable',
                            title: 'Available for Others',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' } // only allow paragraphs
                                    ],
                                    lists: [], // no bullet/numbered lists
                                    marks: {
                                        decorators: [
                                            { title: 'Bold', value: 'strong' },
                                        ],
                                        annotations: [] // no links or custom annotations
                                    }
                                }
                            ]
                        },
                        {
                            name: 'steerAvailable',
                            title: 'Available for SteerHealth Users',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' } // only allow paragraphs
                                    ],
                                    lists: [], // no bullet/numbered lists
                                    marks: {
                                        decorators: [
                                            { title: 'Bold', value: 'strong' },
                                        ],
                                        annotations: [] // no links or custom annotations
                                    }
                                }
                            ]
                        },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})
