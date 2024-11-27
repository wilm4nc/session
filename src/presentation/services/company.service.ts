import { CompanyModel } from "../../data";
import { CreateCompanyDTO, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CompanyService{

    constructor(){}

    async createCompany(createCompanyDTO: CreateCompanyDTO, user: UserEntity){

        const  companyExist =  await CompanyModel.findOne({name :CreateCompanyDTO.name});

        if( companyExist) throw CustomError.badRequest('Company already exists');

        try {

            const company = new CompanyModel({
                ...createCompanyDTO,
                user: user.id,
            })

            await company.save();
            return{
                id: company.id,
                name: company.name,
                isActive: company.isActive
            }
            
        } catch (error) {

            throw CustomError.internalServer(`${error}`);
            
        }

    }


    async getCompanies(paginationDto: PaginationDto){

        const {page, limit} = paginationDto;

        try {

            const [total, companies] = await Promise.all([
                CompanyModel.countDocuments(),
                CompanyModel.find().skip((page-1) * limit )
                .limit(limit)
            ]);
            return{
                page: page,
                limit: limit,
                total: total,
                next:(Math.floor(total/ limit)>page)? `/api/companies?page=${page +1}&limit=${ limit}`: null,
                prev:(page - 1> 0)? `/api/companies?page=${page -1}&limit=${ limit}`: null,
            
            data: companies.map(company=>({
                id: company.id,
                name: company.name,
                isActive: company.isActive,
                subscriptionStatus : company.subscriptionStatus,
                email : company.email,
                phone : company.phone,

            }))
        }

        } catch (error) {

            throw CustomError.internalServer(`Internal Server Error`);
            
        }
    }
}