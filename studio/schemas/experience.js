export default {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "company",
      title: "Company",
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
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
    },
    {
      name: "companyUrl",
      title: "Company URL",
      type: "url",
    },
  ],
};
