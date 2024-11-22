import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';

const commentRoutes = Router();
const commentController = new CommentController();

commentRoutes.post('/', commentController.create.bind(commentController))
commentRoutes.get('/todos', commentController.getAll.bind(commentController))
commentRoutes.put('/:id', commentController.update.bind(commentController))
commentRoutes.delete('/:id', commentController.delete.bind(commentController))

export { commentRoutes };
