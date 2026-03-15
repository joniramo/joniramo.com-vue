export default {
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "level",
      title: "Level (10–100)",
      type: "number",
      validation: (Rule) => Rule.required().min(10).max(100),
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "level",
    },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Level: ${subtitle}` };
    },
  },
};
