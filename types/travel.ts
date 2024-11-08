export interface Travel {
  _id: string;
  title: string;
  gallery: string[];
  isSpecial: boolean;
  category: Category;
  duration: string;
  price: string;
  description: string;
  coverPhoto: string;
  createdAt: string;
  language: "en" | "mn" | "kr";
  days: any;
  pax: any;
  date: any;
}
