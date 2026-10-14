export default {
    name: 'clientLogosSlider',
    title: 'Client Logos Slider',
    type: 'object',
    preview: {
        select: {
            heading: 'heading',
        },
        prepare({ heading }) {
            return {
                title: 'Logos Slider',
                subtitle: heading,
            };
        },
    },
    fields: [
        {
            name: 'heading',
            type: 'string',
            title: 'Main Heading',
        },
        {
            name: 'clientLogos',
            title: 'Client Logos',
            type: 'array',
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
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                            description: 'Enter the URL to the client website',
                        },
                    ],
                },
            ],
        },

    ],
};
