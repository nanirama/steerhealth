export default {
    name: 'steerNotesHeroSection',
    title: 'Steer Notes Hero Section',
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
                            { title: 'Italic', value: 'em' },
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
            type: 'image',
            title: 'Icon',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'iconLabel',
            type: 'string',
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
            name: 'securityBadges',
            title: 'Security Badges',
            type: 'array',
            description: 'Add up to 3 security/compliance badges (e.g., Enterprise Grade Security, HIPAA Compliant, SOC-2 Certified)',
            validation: (Rule) => Rule.max(3),
            of: [
                {
                    type: 'object',
                    name: 'securityBadge',
                    title: 'Security Badge',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'text',
                            title: 'Text',
                            type: 'string',
                            description: 'e.g., "ENTERPRISE GRADE SECURITY", "HIPAA COMPLIANT", "SOC-2 CERTIFIED"',
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'text',
                            media: 'icon',
                        },
                    },
                },
            ],
        },
        {
            name: 'trustedByText',
            title: 'Trusted By Text',
            type: 'string',
            description: 'e.g., "TRUSTED BY LEADING HEALTH SYSTEMS AND SPECIALTY PRACTICES"',
        },
        {
            name: 'clientLogos',
            title: 'Client Logos',
            type: 'array',
            description: 'Add client/partner logos',
            of: [
                {
                    type: 'object',
                    name: 'clientLogoItem',
                    title: 'Client Logo',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                            description: 'Enter the URL to the client website (optional)',
                        },
                    ],
                    preview: {
                        select: {
                            media: 'image',
                        },
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare() {
            return {
                title: 'Steer Notes Hero Section',
            };
        },
    },
};
