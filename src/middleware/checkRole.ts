//src/middleware/checkRole.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check if the user has one of the required roles.
 *
 * @param roles - An array of strings representing the roles to check against.
 * @returns A middleware function that checks the user's roles.
 *
 * The middleware function retrieves the user's roles from `res.locals.jwtPayload.roles`
 * and checks if the user has at least one of the required roles. If the user does not
 * have the required roles, it responds with a 401 status and a "No autorizado" message.
 * Otherwise, it calls the `next` function to proceed to the next middleware or route handler.
 */
export const checkRole = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = res.locals.jwtPayload.roles;

    const hasRole = userRoles.some((role: string) => roles.includes(role));

    if (!hasRole) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    next();
  };
};
