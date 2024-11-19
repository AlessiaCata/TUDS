import { asyncHandler } from '../../libs/asyncHandler.js';
import { petController } from './pet_controller.js';

export function configurePetRoutes(router) {
  router.get('/pet', asyncHandler(petController, 'get'));       // Para obtener la lista de usuarios
  router.get('/pet/:uuid', asyncHandler(petController, 'get'));       // Para obtener la lista de usuarios
  router.post('/pet', asyncHandler(petController, 'post'));     // Para crear usuario
  router.patch('/pet/:uuid', asyncHandler(petController, 'patch')); // Para editar o cambiar de estado
  router.delete('/pet/:uuid', asyncHandler(petController, 'delete')); // Para eliminar usuario por UUID
}
