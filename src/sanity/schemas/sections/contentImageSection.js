// schemas/sections/contentImageSection.js
export default {
    name: 'contentImageSection',
    title: 'Content Image Section',
    type: 'object',
    fields: [
        // {
        //     name: 'title',
        //     title: 'Title',
        //     type: 'array',
        //     of: [
        //         {
        //             type: 'block',
        //             styles: [
        //                 { title: 'Heading', value: 'h2' },
        //             ],
        //             lists: [],
        //             marks: {
        //                 decorators: [
        //                     { title: 'Bold', value: 'strong' },
        //                     { title: 'Italic', value: 'em' },
        //                 ],
        //                 annotations: [],
        //             },
        //         },
        //     ],
        // },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Paragraph', value: 'normal' },
                        { title: 'H3', value: 'h3' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                        annotations: [],
                    },
                },
            ],
        },
        {
            name: 'ctaButtonPrimary',
            title: 'Primary Button',
            type: 'button',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'imagePosition',
            type: 'string',
            title: 'Image Position',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
            },
            initialValue: 'right',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Content Image Section',
            };
        },
    },
}
