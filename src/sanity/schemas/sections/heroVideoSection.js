import { videoOptions } from '../data/utils';

export default {
    name: 'heroVideoSection',
    title: 'Hero Video Section',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [{ title: 'Paragraph', value: 'normal' }],
                    lists: [],
                    marks: {
                        decorators: [],
                        annotations: [
                            {
                                type: 'textColor',
                            },
                        ],
                    },
                },
            ],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'icon',
            type: 'image', // or 'string' if using emoji
            title: 'Icon',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'iconLabel',
            type: 'string', // or 'string' if using emoji
            title: 'Icon Label'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'ctaButtonPrimary',
            title: 'Primary Button',
            type: 'button',
        },
        {
            name: 'ctaButtonSecondary',
            title: 'Secondary Button',
            type: 'button',
        },
        {
            name: 'bookingsPercentage',
            title: 'Bookings increase percentage',
            type: 'number',
        },
        {
            name: 'bookingsLabel',
            title: 'Bookings Label',
            type: 'string',
        },
        {
            name: 'videoUrl',
            title: 'Video File',
            type: 'string',
            options: {
                list: videoOptions,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'mobileHeroImage',
            type: 'image', // or 'string' if using emoji
            title: 'Mobile Hero Image',
            options: {
                hotspot: true,
            },
        },
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare() {
            return {
                title: 'Hero Video Section',
            };
        },
    },
};
