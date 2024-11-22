export interface commentEntity {
 id: number,
 user_id: number,
 idea_id: number,
 content: string,
 created_at: string,
}

export interface commentData {
  content: string,
  user_id: number,
  idea_id: number,
} 