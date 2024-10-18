import { Request, Response } from 'express';
import { Comment } from '../models/Comment';

export class CommentController {
  private comment: Comment;

  constructor() {
    this.comment = new Comment();
  }

  async add(req: Request, res: Response): Promise<void> {
    res.status(200).send({
      success: true
    });
  }
}
