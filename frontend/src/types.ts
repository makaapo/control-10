export interface News {
  id: string,
  title: string,
  image: string | null,
  date: string,
}

export interface NewsMutation {
  id: string,
  title: string,
  text: string,
  image: File | null,
  date: string,
}

export interface NewsForm {
  title: string,
  text: string
  image: File | null;
}

export interface Comment {
  id: string,
  news_id: string;
  author: string;
  text: string;
}

export interface CommentForm {
  news_id: string;
  author: string;
  text: string;
}