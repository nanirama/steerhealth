export default {
    name: 'howSteerHelpscareProviders',
    title: 'How Steer Helps Care Providers',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
            initialValue: 'How Steer Helps Care Providers'
        },
        {
            name: 'subheading',
            title: 'Subheading',
            type: 'text',
            initialValue: 'Every behind-the-scenes task—engineered for speed, accuracy, and zero drop-offs.'
        },
        {
            name: 'careItems',
            title: 'Care Provider Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Care Provider Details',
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
