import { Customer } from "../../../../../domain/customer/entity/customer";

export class PrismaCreateCustomerAdapter {
  static toPrisma({
    id,
    name,
    email,
    phone,
    cellPhone,
    address,
    cnpj,
    cpf,
    type,
  }: Customer) {
    const { zipCode, city, state, district, street, number, complement } =
      address.value;

    return {
      id,
      name,
      email,
      phone,
      cellPhone,
      cnpj: cnpj.value,
      cpf: cpf.value,
      type: type.value,
      zipCode,
      city,
      state,
      district,
      street,
      number,
      complement,
    };
  }
}
