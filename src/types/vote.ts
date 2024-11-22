export interface voteEntity {
  id: number,
  user_id: number,
  idea_id: number,
  isUpVote: boolean,
  created_at: string,
}

export interface voteData {
  user_id: number,
  idea_id: number,
  is_upvote?: boolean,
}