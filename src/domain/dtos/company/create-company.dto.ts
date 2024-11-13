import { regularExps } from '../../../config';

export class CreateCompanyDTO {
  private constructor(
    public nit: string,
    public name: string,
    public email: string,
    public address: string,
    public subscriptionPlan: string,
    public subscriptionStatus: 'ACTIVE' | 'EXPIRED' | 'PENDING',
    public phone?: number,
    public website?: string,
    public subscriptionPaymentDate?: Date,
    public subscriptionExpiresAt?: Date,
    public isActive?: boolean,
  ) {}

 
  static create(object: { [key: string]: any }): [string?, CreateCompanyDTO?] {
    const {
      nit,
      name,
      email,
      address,
      subscriptionPlan,      
      subscriptionStatus,
      phone,
      website,
      subscriptionPaymentDate,
      subscriptionExpiresAt,
      isActive,
    } = object;

    // Validación de los campos obligatorios
    if (!nit) return ['Missing NIT'];
    if (!regularExps.nit.test(nit)) return ['NIT is not valid']; // Validación de formato de NIT
    if (!nit) return ['Missing name'];
    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!address) return ['Missing address'];
    if (!subscriptionPlan) return ['Missing subscription plan'];
    if (!subscriptionStatus) return ['Missing subscription status'];

    // Validación del campo de estado de suscripción
    const validStatuses = ['ACTIVE', 'EXPIRED', 'PENDING'];
    if (!validStatuses.includes(subscriptionStatus)) {
      return ['Subscription status is not valid'];
    }
    const cleanedPhone = phone ? phone.replace(/\s+/g, '') : '';
    if (cleanedPhone && !regularExps.phone.test(cleanedPhone)) return ['Phone is not valid'];

    // Validación de fechas si están presentes
    if (subscriptionPaymentDate && isNaN(new Date(subscriptionPaymentDate).getTime())) {
      return ['Subscription payment date is not a valid date'];
    }
    if (subscriptionExpiresAt && isNaN(new Date(subscriptionExpiresAt).getTime())) {
      return ['Subscription expiration date is not a valid date'];
    }

    // Si todas las validaciones pasan, retorna la instancia de CompanyDTO
    return [
      undefined,
      new CreateCompanyDTO(
        nit,
        name,
        email,
        address,
        subscriptionPlan,
        subscriptionStatus,
        cleanedPhone,
        website,
        subscriptionPaymentDate,
        subscriptionExpiresAt,
        isActive
      ),
    ];
  }
}