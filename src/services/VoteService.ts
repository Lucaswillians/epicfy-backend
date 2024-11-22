import { Knex } from "knex"
import { db } from "../config/db"
import { voteData } from "../types/vote"

export class VoteService {
  private db: Knex

  constructor() {
    this.db = db
  }

  async createVote (vote: voteData) {
    const isVote = await this.db<voteData>('vote').where('user_id', vote.user_id).andWhere('idea_id', vote.idea_id).first()

    if (!isVote) {
      const [newVote] = await this.db<voteData>('vote')
        .insert({ ...vote, is_upvote: true }) 
        .returning('*');
      return newVote
    }

    return await this.db<voteData>('vote')
      .where('user_id', vote.user_id)
      .andWhere('idea_id', vote.idea_id)
      .update({ is_upvote: true })
  }
  
  async removeVote(user_id: number, idea_id: number): Promise<number> {
    const affectedRows = await this.db<voteData>('vote')
      .where('user_id', user_id)
      .andWhere('idea_id', idea_id)
      .update({ is_upvote: false })

    return affectedRows
  }

  async getVotesWithCount(): Promise<any[]> {
    return this.db('vote')
      .join('idea', 'vote.idea_id', 'idea.id') 
      .join('user', 'vote.user_id', 'user.id') 
      .select(
        'idea.id as idea_id',        
        'idea.title as idea_title',  
        this.db.raw('COUNT(CASE WHEN vote.is_upvote = true THEN 1 END) as likeCount') 
      )
      .groupBy('idea.id', 'idea.title')
  }
}
