import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "Order",
      title: "orderby",
      type: "number",
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "xUrl",
      title: "X (Twitter) URL",
      type: "url",
    }),
    {
      name: 'skillBadge',
      title: 'Skill / Domain Badge',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Icon',
          type: 'image',
          description: 'Primary icon shown normally. SVGs recommended (upload as image asset).',
          options: {
            hotspot: true,
          }
        },
        {
          name: 'hoverIcon',
          title: 'Hover Icon',
          type: 'image',
          description: 'Icon shown on hover (optional). If empty, you can fallback to `icon` in UI code.',
          options: {
            hotspot: true,
          }
        },
      ],
    },
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bioDetails",
      title: "Bio Details",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "jobTitle",
      media: "profileImage",
    },
  },
});
