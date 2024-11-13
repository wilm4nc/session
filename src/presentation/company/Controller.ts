import { Response, Request } from "express";
import { CreateCompanyDTO, CustomError, PaginationDto } from "../../domain";
import { CompanyService } from "../services/company.service";

export class CompanyController{

constructor(
private readonly companyService : CompanyService,

){}


    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
      }

      createCompany = async(req: Request, res: Response) =>{
        const [error, createCompanyDTO] = CreateCompanyDTO.create(req.body);
        if (error)
          return res.status(400).json({error});                

          this.companyService.createCompany(createCompanyDTO!, req.body.user)
          .then( company => res.status(201).json(company))
          .catch(error=> this.handleError(error, res));
      }

      getCompanies = async(req: Request, res: Response) =>{


        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit)

        if(error) return res.status(400).json({error});


       
        this.companyService.getCompanies(paginationDto!)
        .then(companies=> res.json(companies))
        .catch(error=> this.handleError(error, res));


      }
}
