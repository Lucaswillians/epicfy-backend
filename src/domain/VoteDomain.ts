import { IdeaService } from "../services/IdeaService"
import { VoteService } from "../services/VoteService";
import { IdeaData } from "../types/idea"
import { voteData } from "../types/vote";
import { ValidatorUtils } from "../utils/ValidatorUtils";


export class VoteDomain {
  private voteService: VoteService

  constructor() {
    this.voteService = new VoteService()
  }

  public model(): VoteService {
    return this.voteService
  }

  /**
   * @throws Error
   */
  checkCreateData(vote: voteData) {
    const { user_id, idea_id, is_upvote } = vote

    const hasRequiredData = ValidatorUtils.hasRequiredData([
      user_id, idea_id, is_upvote
    ])
    const hasRequiredValues = ValidatorUtils.hasRequiredValues([
      user_id, idea_id, is_upvote
    ])

    if (!hasRequiredData || !hasRequiredValues) {
      throw new Error('Parâmetros [user_id, idea_id, is_upvote] são obrigatórios')
    }
  }
}
