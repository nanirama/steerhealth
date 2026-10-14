import React, { useState, useEffect, forwardRef } from "react";
import { defineType, defineField, set, unset, defineArrayMember } from "sanity";
import { FormField } from "sanity";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarIcon,
  ImageIcon,
  LinkIcon,
} from '@sanity/icons'

// Custom styled input with 📅 icon
const CustomInput = forwardRef(({ value, onClick, placeholder, id }, ref) => (
  <button
    id={id}
    type="button"
    onClick={onClick}
    ref={ref}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      background: "#fff",
      fontSize: "14px",
      cursor: "pointer",
    }}
  >
    <span>{value || placeholder || "Select date & time"}</span>
    <span style={{ marginLeft: "8px", color: "#666" }}>📅</span>
  </button>
));


CustomInput.displayName = "CustomInput";

// Sanity custom input component
const DateTimeInput = (props) => {
  const { value, onChange, id, validationError, readOnly } = props;
  const [selected, setSelected] = useState(value ? new Date(value) : null);

  useEffect(() => {
    setSelected(value ? new Date(value) : null);
  }, [value]);

  return (
    <FormField
      __unstable_markers={validationError ? [{ level: "error", item: validationError }] : []}
      __unstable_presence={props.presence}
      inputId={id}
    >
      <DatePicker
        id={id}
        selected={selected}
        onChange={(date) => {
          setSelected(date);
          onChange(date ? set(date.toISOString()) : unset()); // ✅ now Sanity sees the change
        }}
        showTimeSelect
        timeIntervals={5}
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select date & time"
        customInput={<CustomInput />}
        disabled={readOnly}
      />
    </FormField>
  );
};

export default defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,

  fieldsets: [
    {
      name: 'formSettings',
      title: 'Header Form Content',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'eventDetails',
      title: 'Event Details',
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Event Name',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'Hubspot Form Id',
      type: 'string',
    }),
    defineField({
      name: 'isLandingPage',
      title: 'Show on Landing Page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showHeaderForm',
      title: 'Show Form in Header',
      type: 'boolean',
      description: 'Enable this to display the form in the website header.',
      initialValue: false,
    }),

    // 🧾 Group 1: Header Form Fields (visible only when showHeaderForm === true)
    defineField({
      name: 'formContent',
      title: 'Form Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
          ],
        },
      ],
      fieldset: 'formSettings',
      hidden: ({ parent }) => !parent?.showHeaderForm,
    }),
    defineField({
      title: 'Form below Content',
      name: 'formblowContent',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Paragraph', value: 'normal' }],
        },
      ],
      fieldset: 'formSettings',
      hidden: ({ parent }) => !parent?.showHeaderForm,
    }),

    // 📅 Group 2: Event Details (default visible)
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'eventCategory' }] }],
      fieldset: 'eventDetails',
      hidden: ({ parent }) => parent?.showHeaderForm,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().min(20).max(240),
      fieldset: 'eventDetails',
      hidden: ({ parent }) => parent?.showHeaderForm,
    }),
    defineField({
      name: "startDate",
      title: "Start Date & Time",
      type: "string",
      components: { input: DateTimeInput },
      fieldset: 'eventDetails',
      hidden: ({ parent }) => parent?.showHeaderForm,
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: "string",
      components: { input: DateTimeInput },
      fieldset: 'eventDetails',
      hidden: ({ parent }) => parent?.showHeaderForm,
    }),
    defineField({
      name: 'address',
      title: 'Venue Address',
      type: 'string',
      fieldset: 'eventDetails',
      hidden: ({ parent }) => parent?.showHeaderForm,
    }),
    defineField({
      name: 'registrationLinkText',
      title: 'Registration Link Text',
      type: 'string',
      fieldset: 'eventDetails',
      hidden: ({ parent }) => parent?.showHeaderForm,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      icon: LinkIcon,
      fieldset: 'eventDetails',
      hidden: ({ parent }) => parent?.showHeaderForm,
    }),

    // 🖼 Cover Image
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
      icon: ImageIcon,
    }),

    // 📝 Content Builder
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              // 🔗 Link Annotation
              defineArrayMember({
                type: 'object',
                name: 'link',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              }),
            ],
          },
        },
        { type: 'button' },
        { type: 'divider' },
        { type: 'speakersSection' },
        defineArrayMember({
          type: 'image',
          name: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Important for SEO and accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }),
      ],
      description: 'Detailed event description, agenda, speakers, etc.',
    }),
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'p2pHdrLogosSection',
        },
        {
          type: 'eventHeroSection',
        },
        {
          type: 'whyAscsChooseSteer',
        },
        {
          type: 'intelligentAdaptiveLayer',
        },
        {
          type: 'surgeryTimeline',
        },
        {
          type: 'whatIncluded',
        },
        {
          type: 'securityCompliance',
        },
        {
          type: 'outcomesThatMatter',
        },
        {
          type: 'customerStories',
        },
        {
          type: 'implementation',
        },
        {
          type: 'faqSection',
        },
        {
          type: 'ctaSection',
        },

      ],
    },

    // CTA Object
    defineField({
      name: 'eventCta',
      title: 'Event CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'ctaHeading',
          title: 'CTA Heading',
          type: 'string'
        }),
        defineField({
          name: 'ctaSubHeading',
          title: 'CTA Sub Heading',
          type: 'string'
        }),
        defineField({
          name: 'button',
          title: 'Button',
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            {
              name: 'link',
              title: 'CTA Link',
              type: 'reference',
              to: [{ type: 'page' }, { type: 'solutions' }, { type: 'integrations' }],
            }
          ]
        })
      ],
      options: { collapsible: true, collapsed: false }
    }),
  ],

  orderings: [
    {
      title: 'Date (Newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (Oldest first)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'image',
      startDate: 'startDate',
      address: 'address',
    },
    prepare({ title, subtitle, media, startDate, address }) {
      const when = startDate ? new Date(startDate).toLocaleString() : 'TBA'
      const where = address ? address : ''
      return {
        title,
        subtitle: `${when} ${where} ${subtitle ? ` • ${subtitle}` : ''}`,
        media,
      }
    },
  },
});
