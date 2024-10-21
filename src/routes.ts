import { Router } from 'express';
import { commentRoutes } from './routes/commentRoutes';
import { userRoutes } from './routes/userRoutes';

const routes = Router();

routes.use('/comment', commentRoutes);
routes.use('/user', userRoutes);

export { routes };
