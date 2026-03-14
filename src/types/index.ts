export type Category = {
  _id: string;
  title: string;
};

export type Post = {
  _id: string;
  slug: {
    current: string;
  };
  title: string;
  categories: Category[];
  publishedAt: string;
  body: any;
  image: any;
};

export type Project = {
  _id: string;
  title: string;
  dateFrom: string;
  dateTo: string | null;
  company: string | null;
  description: string;
};
