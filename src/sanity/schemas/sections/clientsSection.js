import { imagesOptions } from '../data/utils';
// schemas/objects/steerAdvantageSection.js
export default {
    name: 'clientsSection',
    title: 'Client Section',
    type: 'object',
    fields: [
        {
            name: 'heading',
            type: 'string',
            title: 'Main Heading',
        },
        {
            name: 'clientlogos',
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
        {
            name: 'clientLogos',
            title: 'Client Logos',
            type: 'array',
            of: [
                {
                    name: 'imageUrl',
                    title: 'Image URL',
                    type: 'string',
                    options: {
                        list: imagesOptions,
                    }
                },
            ],
        },

    ],
};
