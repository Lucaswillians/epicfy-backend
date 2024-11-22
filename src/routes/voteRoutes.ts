import { Router } from 'express';
import { VoteController } from '../controllers/VoteController';

const voteRoutes = Router()
const voteController = new VoteController();

voteRoutes.post('/', voteController.create.bind(voteController))
voteRoutes.put('/:id', voteController.remove.bind(voteController))
voteRoutes.get('/todos', voteController.getAllWithCount.bind(voteController))

export { voteRoutes };
