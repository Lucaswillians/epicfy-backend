import { Router } from 'express';
import { VoteController } from '../controllers/VoteController';

const voteRoutes = Router()
const voteController = new VoteController();

voteRoutes.post('/', voteController.vote.bind(voteController))
voteRoutes.get('/todos', voteController.getAllWithCount.bind(voteController))
// voteRoutes.put('/dislike', voteController.remove.bind(voteController))

export { voteRoutes };
