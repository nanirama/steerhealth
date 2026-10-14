export default {
    name: 'p2pHdrLogosSection',
    title: 'p2p Header Logos Section',
    type: 'object',
    fields: [
        {
            name: 'heading',
            type: 'string',
            title: 'Main Heading',
        },
        {
            name: 'logos',
            title: 'Logos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'LogoItem',
                    title: 'Logo',
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
