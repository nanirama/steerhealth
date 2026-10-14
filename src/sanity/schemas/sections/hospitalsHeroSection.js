export default {
    name: 'hospitalsHeroSection',
    title: 'Hospitals Hero Section',
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
                        decorators: [
                            { title: 'Italic', value: 'em' }, // 👈 added italic
                        ],
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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        },
        {
            name: 'mobileimage',
            title: 'Mobile Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'videoFile',
            title: 'Video File',
            type: 'file',
            options: {
                accept: 'video/webm', // only allow .webm
            },
            validation: (Rule) => Rule.required(), // optional
        },
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare() {
            return {
                title: 'Hospitals Hero Section',
            };
        },
    },
};
