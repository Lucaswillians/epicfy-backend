import { Request, Response } from "express";
import { VoteService } from "../services/VoteService";
import { HttpUtils } from "../utils/HttpUtils";
import { ControllerUtils } from "../utils/ControllerUtils";
import { voteData } from "../types/vote";


export class VoteController {
  private voteService: VoteService

  constructor() {
    this.voteService = new VoteService()
  }

  async create(req: Request, res: Response): Promise<void> {
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const bodyData = req.body as voteData

      const voteData: voteData = {
        user_id: bodyData.user_id,
        idea_id: bodyData.idea_id,
      }

      if (!voteData.user_id || !voteData.idea_id) res.status(400).json(HttpUtils.ERROR)

      const id = await this.voteService.createVote(voteData)
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

  async remove(req: Request, res: Response): Promise<void> {
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const { user_id, idea_id } = req.body as voteData
      const affectedRows = await this.voteService.removeVote(user_id, idea_id)

      content = ControllerUtils.success({ affectedRows })
    } 
    catch (exception) {
      code = HttpUtils.ERROR
      content = ControllerUtils.error(exception instanceof Error ? exception.message : `${exception}`)
    } 
    finally {
      res.status(code).send(content)
    }
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
}
