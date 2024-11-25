import { Request, Response } from "express";
import { VoteService } from "../services/VoteService";
import { HttpUtils } from "../utils/HttpUtils";
import { ControllerUtils } from "../utils/ControllerUtils";
import { voteData } from "../types/vote";
import { VoteDomain } from "../domain/VoteDomain";


export class VoteController {
  private voteService: VoteService
  private voteDomain: VoteDomain

  constructor() {
    this.voteService = new VoteService()
    this.voteDomain= new VoteDomain()
  }

  async getAllWithCount(req: Request, res: Response): Promise<void> {
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const votes = await this.voteService.getVotesWithCount()
      content = ControllerUtils.success({ votes })
    }
    catch (exception) {
      code = HttpUtils.ERROR
      content = ControllerUtils.error(exception instanceof Error ? exception.message : `${exception}`)
    } 
    finally {
      res.status(code).send(content)
    }
  }

  async vote(req: Request, res: Response): Promise<void> {

    const bodyData = req.body as voteData
    let content = {}
    let code = 200

    try {
      this.voteDomain.checkCreateData(bodyData)

      const voteData: voteData = {
        user_id: bodyData.user_id,
        idea_id: bodyData.idea_id,
        is_upvote: bodyData.is_upvote,
      };

      const id = await this.voteService.vote(voteData)
      content = ControllerUtils.success({ id })
    } 
    catch (exception) {
      code = HttpUtils.ERROR
      content = ControllerUtils.error(exception instanceof Error ? exception.message : `${exception}`)
    } 
    finally {
      res.status(code).send(content)
    }
  }
}