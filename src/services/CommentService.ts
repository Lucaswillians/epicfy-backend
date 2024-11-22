import { Knex } from "knex"
import { db } from "../config/db"
import { commentData, commentEntity } from "../types/comment"

export class CommentService {
  private db: Knex

  constructor() {
    this.db = db
  }

  async getAllComment(): Promise<commentEntity[]> {
    return this.db<commentEntity>('comment')
      .join('user', 'comment.user_id', 'user.id')  
      .join('idea', 'comment.idea_id', 'idea.id')  
      .select(
        'comment.id as commentId',            
        'comment.content',                    
        'comment.created_at',                 
        'user.id as user_id',                 
        'idea.id as idea_id',                 
        'idea.title as ideaTitle',             
        'user.username as username'
      )
  }


  async createComment(comment: commentData): Promise<any> {
    const [newCommentId] = await this.db<commentData>('comment').insert(comment)

    return this.db('comment')
      .join('user', 'comment.user_id', 'user.id')
      .join('idea', 'comment.idea_id', 'idea.id')
      .select(
        'comment.id as commentId',
        'comment.content',
        'comment.created_at',
        'user.id as user_id',    
        'idea.id as idea_id'     
      )
      .where('comment.id', newCommentId)
      .first()
  }
  
  async updateComment(id: number, comment: Partial<commentData>): Promise<any> {
    await this.db<commentData>('comment').where('id', id).update(comment)

    return this.db('comment')
      .join('user', 'comment.user_id', 'user.id')
      .join('idea', 'comment.idea_id', 'idea.id')
      .select(
        'comment.id as commentId',
        'comment.content',
        'comment.created_at',
        'user.id as user_id',    
        'idea.id as idea_id'     
      )
      .where('comment.id', id)
      .first()
  }

  async deleteComment(id: number): Promise<any> {
    const commentToDelete = await this.db('comment')
      .join('user', 'comment.user_id', 'user.id')
      .join('idea', 'comment.idea_id', 'idea.id')
      .select(
        'comment.id as commentd',
        'comment.content',
        'comment.created_at',
        'user.id as user_id',    
        'idea.id as idea_id'     
      )
      .where('comment.id', id)
      .first()

    if (commentToDelete) {
      await this.db('comment').where('id', id).del()
    }

    return commentToDelete
  }
}
