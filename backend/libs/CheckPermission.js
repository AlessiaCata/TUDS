import { ForbiddenError } from "./ForbiddenError.js";


export function checkPermission(req, requiredRoles) {
  const roles = req.user?.roles?.split(',').map(i => i.trim());
  console.log("Checking permissions for user:", req.user?.userName);


  // Check if any of the user's roles match any of the required roles
  if (!roles || !requiredRoles.some(role => roles.includes(role))) {
    console.log("Permission denied. Required roles:", requiredRoles);
    throw new ForbiddenError();
  }
}
