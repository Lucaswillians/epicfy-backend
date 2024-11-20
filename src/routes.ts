import { Router } from 'express';
import { commentRoutes } from './routes/commentRoutes';
import { userRoutes } from './routes/userRoutes';
import { ideaRoutes } from './routes/ideaRoutes';

const routes = Router();

routes.use('/comment', commentRoutes);
routes.use('/user', userRoutes);
routes.use('/idea', ideaRoutes)

export { routes };
