export default {
    name: 'whatWeDo',
    title: 'What We Do',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
        },
        {
            name: 'subheading',
            title: 'Subheading',
            type: 'text',
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'item',
                    fields: [
                        { name: 'title', title: 'Feature Title', type: 'string' },
                        { name: 'description', title: 'Feature Description', type: 'text' },
                        { name: 'image', title: 'Image', type: 'image' }
                    ]
                }
            ]
        }
    ]
}
