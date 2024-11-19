import express from 'express';
import cors from 'cors';
import { Dependency } from './libs/dependency.js';
import jwt from 'jsonwebtoken';

export function configureMiddlewares(app) {

  const conf = Dependency.get('conf');

  const origin = `http://localhost:${conf.clientPort}`;
  const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
  };

  app.use(cors(corsOptions));
 
  app.use('/', express.json());

   app.use(autorizationMiddleware);

  const router = express.Router();
  app.use('/api', router);

  app.use(errorHandler);

  return router;
}

function autorizationMiddleware(req, res, next){
 if(!req.headers.authorization) {
  next();
  return;
 }
 
 const auth = req.headers.authorization;
 if (auth.substr(0,7).toLowerCase() != 'bearer ') {
  throw new InvalidAuthorizationSchemaError();
 }

 const token = auth.substr(7).trim();
 if(!token){
  throw new InvalidAuthorizationTokenError();
 }

 const conf = Dependency.get('conf');
 jwt.verify(
  token,
  conf.jwtPassword,
  async (err,data) => {
    if(err){
      throw new InvalidAuthorizationTokenError();
    }

    const userService = Dependency.get('userService');
    const user = await userService.getForUsernameOrNull(data.username);

    if(!user || !user.isEnabled) {
      throw new InvalidAuthorizationTokenError();
    }

    req.user = user;

    next();
  }
 );
}

function errorHandler(err, req, res, next,) {
  if(!(err instanceof Error)){
    res.status(500).send(err);
    next();
    return;
  } 
    
  const statusCodes = {
    MissingParameterError: 400,
    ConflictError: 409,
    InvalidCredentialsError: 401,
  };

  const name = err.constructor.name;
  // eslint-disable-next-line no-constant-binary-expression
  const status = statusCodes[name] ?? 500 ?? 300;

  res.status(status).send({
    error: name,
    message: err.message,
  });
}