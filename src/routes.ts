import { Router } from 'express';
import { commentRoutes } from './routes/commentRoutes';
import { userRoutes } from './routes/userRoutes';
import { ideaRoutes } from './routes/ideaRoutes';
import { voteRoutes } from './routes/voteRoutes';

const routes = Router();

routes.use('/comment', commentRoutes);
routes.use('/user', userRoutes);
routes.use('/idea', ideaRoutes)
routes.use('/vote', voteRoutes)

export { routes };
