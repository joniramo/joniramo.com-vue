export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dateFrom",
      title: "Date From",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dateTo",
      title: "Date To",
      type: "date",
    },
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "symbol",
      title: "Symbol",
      type: "string",
      description: "A single emoji or character shown as the timeline marker.",
    },
  ],
};
