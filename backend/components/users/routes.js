import { asyncHandler } from '../../libs/asyncHandler.js';
import { UserController } from './user_controller.js';

export function configureUserRoutes(router) {
  router.get('/user', asyncHandler(UserController, 'get'));       // Para obtener la lista de usuarios
  router.post('/user', asyncHandler(UserController, 'post'));     // Para crear usuario
  router.patch('/user', asyncHandler(UserController, 'patch')); // Para editar o cambiar de estado
  router.delete('/user', asyncHandler(UserController, 'delete')); // Para eliminar usuario
}
