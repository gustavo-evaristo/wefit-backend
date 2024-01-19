import { customers as PrismaCustomer } from "@prisma/client";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { CNPJ } from "../../../../domain/customer/value-object/cnpj";
import { CPF } from "../../../../domain/customer/value-object/cpf";
import { CustomerType } from "../../../../domain/customer/value-object/customer-type";

export class PrismaFindCustomerAdapter {
  static toDomain({
    id,
    name,
    email,
    phone,
    cellPhone,
    cnpj,
    cpf,
    type,
    zipCode,
    city,
    state,
    district,
    street,
    number,
    complement,
  }: PrismaCustomer): Customer {
    return Customer.create({
      id,
      name,
      email,
      phone,
      cellPhone,
      cnpj: new CNPJ(cnpj),
      cpf: new CPF(cpf),
      type: new CustomerType(type),
      address: new Address({
        zipCode,
        city,
        state,
        district,
        street,
        number,
        complement,
      }),
    });
  }
}
