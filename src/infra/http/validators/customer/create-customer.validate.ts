import { z } from "zod";
import { Customer } from "../../../../domain/customer/entity/customer";

export class CreateCustomerValidator {
  static validate(props: Customer) {
    const createCustomerSchem = z.object({
      name: z.string().min(1),
      email: z.string().min(1),
      phone: z.string().min(1),
      cellPhone: z.string().min(1),
      cpf: z.string().min(1),
      cnpj: z.string().min(1),
      type: z.string().min(1),
      zipCode: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      district: z.string().min(1),
      street: z.string().min(1),
      number: z.string().min(1),
      complement: z.string().optional(),
    });

    return createCustomerSchem.parse(props);
  }
}
