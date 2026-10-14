export default {
    name: 'clientLogos',
    title: 'Client Logos',
    type: 'object',
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
                    name: 'image',
                    type: 'image',
                    title: 'Upload Image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        },

    ],
};
