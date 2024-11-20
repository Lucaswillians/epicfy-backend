import { Router } from 'express';
import { IdeaController } from '../controllers/IdeaController';

const ideaRoutes = Router();
const ideaController = new IdeaController()

ideaRoutes.post('/', ideaController.create.bind(ideaController))
ideaRoutes.get('/todos', ideaController.getAll.bind(ideaController))
ideaRoutes.get('/:id', ideaController.getOne.bind(ideaController))
ideaRoutes.put('/:id', ideaController.update.bind(ideaController))
ideaRoutes.delete('/:id', ideaController.delete.bind(ideaController))

export { ideaRoutes }
