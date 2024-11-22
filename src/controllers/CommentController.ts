import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { HttpUtils } from '../utils/HttpUtils';
import { CommentService } from '../services/CommentService';
import { ControllerUtils } from '../utils/ControllerUtils';
import { commentData } from '../types/comment';

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    let content = {}
    let code = HttpUtils.SUCCESS

    try {
      const comments = await this.commentService.getAllComment()
      content = ControllerUtils.success({ comments })
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
      const bodyData = req.body as commentData

      const commentData: commentData = {
       content: bodyData.content || '',
       user_id: bodyData.user_id,
       idea_id: bodyData.idea_id,
      }

      const id = await this.commentService.createComment(commentData)
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
      const bodyData = req.body as commentData

      const commentData: commentData = {
        content: bodyData.content || '',
        user_id: bodyData.user_id,
        idea_id: bodyData.idea_id,
      }

      const affectedRows = await this.commentService.updateComment(Number(id), commentData)
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
      const deletedRows = await this.commentService.deleteComment(Number(id))
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
