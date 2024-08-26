import { asyncHandler } from '../../libs/asyncHandler.js';
import { UserController } from './user_controller.js';

export function configureUserRoutes(router) {
  router.get('/user', asyncHandler(UserController, 'get'));
  router.post('/user', asyncHandler(UserController, 'post'));
}