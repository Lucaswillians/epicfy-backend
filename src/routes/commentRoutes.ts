import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';

const commentRoutes = Router();
const commentController = new CommentController();

commentRoutes.post('/', commentController.add.bind(commentController));

export { commentRoutes };
