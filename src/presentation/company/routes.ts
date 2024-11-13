import { Router } from 'express';
import { CompanyController } from './Controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CompanyService } from '../services/company.service';




export class CompanyRoutes {


  static get routes(): Router {

    const router = Router();
    const companyService = new CompanyService();
    const controller = new CompanyController(companyService);
    
    // Definir las rutas
    router.get('/', [AuthMiddleware.validateJWT], controller.getCompanies  );
    router.post('/', [AuthMiddleware.validateJWT], controller.createCompany  );
    



    return router;
  }


}

