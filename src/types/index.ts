export type Post = {
  _id: string;
  slug: {
    current: string;
  };
  title: string;
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
  symbol: string | null;
};

export type Skill = {
  _id: string;
  title: string;
  level: number;
};
