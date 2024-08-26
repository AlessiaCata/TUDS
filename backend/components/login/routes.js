import { asyncHandler } from '../../libs/asyncHandler.js';
import { LoginController } from './login_controller.js';

export function configureLoginRoutes(router) {
  router.post('/login', asyncHandler(LoginController, 'post'));
}