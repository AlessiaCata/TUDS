import { configureUserRoutes } from './components/users/routes.js';
import { configureLoginRoutes } from './components/login/routes.js';
import { configurePetRoutes } from './components/pet/routes.js';


export function configureRoutes(router) {
  configureUserRoutes(router);
  configureLoginRoutes(router);
  configurePetRoutes(router);
  
}
