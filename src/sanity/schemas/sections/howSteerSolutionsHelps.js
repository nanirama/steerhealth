import { videoOptions } from '../data/utils';
// schemas/objects/howSteerHelpsAcquire.js
export default {
    name: 'howSteerSolutionsHelps',
    title: 'How Steer Helps Section',
    type: 'object',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Section Title',
        },
        {
            name: 'subtitle',
            type: 'string',
            title: 'Section Subtitle',
        },
        {
            name: 'items',
            title: 'Content Blocks',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Block',
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Block Title',
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' }
                                    ],
                                    lists: [
                                        { title: 'Bullet', value: 'bullet' }
                                    ],
                                    marks: {
                                        decorators: [], // No bold/italic/etc.
                                        annotations: [] // No links/images
                                    }
                                }
                            ],
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'ctaButtonPrimary',
                            title: 'Primary Button',
                            type: 'button',
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
                    ]
                }
            ]
        }
    ]
}
