import { Request, Response } from 'express';
import { ControllerUtils } from "../utils/ControllerUtils";
import { HttpUtils } from "../utils/HttpUtils";
import { IdeaData } from '../types/idea';
import { IdeaService } from '../services/IdeaService';

export class IdeaController {
  private ideaService: IdeaService

  constructor() {
    this.ideaService = new IdeaService()
  }

  async getAll(req: Request, res: Response): Promise<void> {
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const ideas = await this.ideaService.getAllIdeas()
      content = ControllerUtils.success({ ideas })
    }
     catch (exception) {
      code = HttpUtils.ERROR
      content = ControllerUtils.error(exception instanceof Error ? exception.message : `${exception}`)
    } 
    finally {
      res.status(code).send(content)
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const idea = await this.ideaService.getOneIdea(Number(id))
      content = ControllerUtils.success({ idea })
    }
    catch (exception) {
      code = HttpUtils.ERROR
      content = ControllerUtils.error(exception instanceof Error ? exception.message : `${exception}`)
    } 
    finally {
      res.status(code).send(content)
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const bodyData = req.body as IdeaData

      const ideaData: IdeaData = {
        title: bodyData.title || '',
        description: bodyData.description || '',
        status: bodyData.status || '',
        is_pinned: bodyData.is_pinned || false,
      }

      const id = await this.ideaService.createIdea(ideaData)
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

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const bodyData = req.body as IdeaData

      const ideaData: IdeaData = {
        title: bodyData.title || '',
        description: bodyData.description || '',
        status: bodyData.status || '',
        is_pinned: bodyData.is_pinned || false,
      }

      const affectedRows = await this.ideaService.updateIdea(Number(id), ideaData)
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

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const deletedRows = await this.ideaService.deleteIdea(Number(id))
      content = ControllerUtils.success({ deletedRows })
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
