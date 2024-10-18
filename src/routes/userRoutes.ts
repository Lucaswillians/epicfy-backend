import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.add.bind(userController));
userRoutes.get('/:id', userController.show.bind(userController));
userRoutes.put('/:id', userController.update.bind(userController));
userRoutes.delete('/:id', userController.delete.bind(userController));

export { userRoutes };
