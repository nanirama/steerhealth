export default {
    name: 'howSteerSolves',
    title: 'How Steer Solves',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'subheading',
            title: 'Subheading',
            type: 'text',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' }
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' } // ✅ Enables <strong>
                        ],
                        annotations: [] // disables links or custom annotations
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'heading'
        }
    }
}
