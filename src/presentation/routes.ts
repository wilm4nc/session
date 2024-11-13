import { Router } from 'express';
import { Authroutes } from './auth/routes';
import { CompanyRoutes } from './company/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', Authroutes.routes );
    router.use('/api/companies', CompanyRoutes.routes );



    return router;
  }


}

