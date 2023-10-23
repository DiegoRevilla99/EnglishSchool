export type BlogData = {
  title: string;
  date: string;
  by: string;
  paragraphs: Array<string>;
  quote: string;
  authorQuote: string;
  authorTitle: string;
  video: string;
  comments: CommentItem[];
};

export type CommentItem = {
  author: string;
  date: string;
  image: string;
  comment: string;
  replies?: CommentItem[];
};
