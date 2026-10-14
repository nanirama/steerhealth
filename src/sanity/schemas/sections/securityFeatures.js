import { videoOptions } from '../data/utils';
export default {
    name: 'securityFeatures',
    title: 'Security Features',
    type: 'object',
    fields: [
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'tabline',
                            title: 'Eyebrow / Tagline',
                            type: 'string',
                        },
                        {
                            name: 'title',
                            title: 'Title',
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
                            title: 'Description',
                            type: 'text',
                            rows: 4,
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'videoUrl',
                            title: 'Video File',
                            type: 'string',
                            options: {
                                list: videoOptions,
                            }
                        },
                        {
                            name: 'videoPosition',
                            type: 'string',
                            title: 'Video Position',
                            options: {
                                list: [
                                    { title: 'Left', value: 'left' },
                                    { title: 'Right', value: 'right' }
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'right'
                        }
                    ],
                },
            ],
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Security Features Section',
            };
        },
    },
};
