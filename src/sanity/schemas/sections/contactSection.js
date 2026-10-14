import { Image } from 'phosphor-react';
import { defineField, defineType } from 'sanity';

export default defineType({
    title: 'Contact Us Section',
    name: 'contactSection',
    type: 'object',
    icon: Image,
    options: {
        collapsible: true,
    },
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [{ title: 'Paragraph', value: 'normal' }],
                    lists: [],
                    marks: {
                        decorators: [],
                        annotations: [
                            {
                                type: 'textColor',
                            },
                        ],
                    },
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        defineField({
            name: 'hubspotFormId',
            title: 'Hubspot Form Id',
            type: 'string',
        }),
        defineField({
            title: 'PrefertoTalk Label',
            name: 'preferToTalk',
            type: 'string',
        }),
        defineField({
            title: 'Phone Number',
            name: 'phoneNumber',
            type: 'string',
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string', // use string to allow things like "$3.2"
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: 'prefix',
                            title: 'Prefix (Optional)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'suffix',
                            title: 'Suffix (Optional)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'value',
                        },
                    },
                },
            ],
        }),
        defineField({
            title: 'General Enquiry Heading',
            name: 'generalEnquiryHeading',
            type: 'string',
        }),
        defineField({
            name: 'items',
            title: 'Inquiry Items',
            type: 'array',
            validation: Rule => Rule.min(1).max(6),
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'image', // or "string" if using an icon name or emoji
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            media: 'icon',
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Contact us Section',
            };
        },
    },
});
