export interface Post {
  title?: string;
  story_title?: string;
  points: number;
  children: Comment[];
}

export interface Comment {
  author: string | null;
  children: Comment[]; 
  created_at: string;
  created_at_i: number;
  id: number;
  parent_id: number;
  points: number | null;
  story_id: number;
  text: string | null;
  title: string | null;
  type: "comment";
  url: string | null;
}

export interface SearchHit {
  author: string;
  children: number[];
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  points: number;
  story_id: number;
  title: string;
  comment_text: string;
  updated_at: string;
  url: string;
}

