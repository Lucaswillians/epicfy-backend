import { ValidatorUtils } from './../utils/ValidatorUtils';
import { Knex } from "knex"
import { db } from "../config/db"
import { voteData } from "../types/vote"

export class VoteService {
  private db: Knex
  private validatorUtils: ValidatorUtils

  constructor() {
    this.db = db
    this.validatorUtils = new ValidatorUtils(this.db)
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
      .where('vote.is_upvote', true) 
      .groupBy('idea.id', 'idea.title')
  }

  async vote(vote: voteData) {
    await this.validatorUtils.validateUserAndIdeaExist(vote.user_id, vote.idea_id);

    const existingVote = await this.db<voteData>('vote')
      .where('user_id', vote.user_id)
      .andWhere('idea_id', vote.idea_id)
      .first();

    if (existingVote) {
      await this.db<voteData>('vote')
        .where('id', existingVote.id)
        .update({ is_upvote: vote.is_upvote });

      return { success: true, message: `Vote updated successfully to ${vote.is_upvote ? 'like' : 'dislike'}.` };
    }

    const [newVote] = await this.db<voteData>('vote')
      .insert({ ...vote, is_upvote: vote.is_upvote })
      .returning('*');

    return { success: true, message: `Vote created successfully as ${vote.is_upvote ? 'like' : 'dislike'}.`, vote: newVote };
  }
}
