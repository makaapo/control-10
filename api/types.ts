export interface News {
  id: string,
  title: string,
  text: string
  image: string | null,
  date: string,
}

export interface NewsMutation {
  title: string,
  text: string
  image: string | null,
}


export interface Comment {
  id: string,
  news_id: string;
  author: string;
  text: string;
}

export interface CommentMutation {
  news_id: string;
  author: string;
  text: string;
}