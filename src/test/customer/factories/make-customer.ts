import {
  Customer,
  CustomerProps,
} from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { CNPJ } from "../../../domain/customer/value-object/cnpj";
import { CPF } from "../../../domain/customer/value-object/cpf";
import { CustomerType } from "../../../domain/customer/value-object/customer-type";

export function makeCustomer(override?: Partial<CustomerProps>) {
  const customer = Customer.create({
    name: "Gustavo",
    email: "gug.henri1@gmail.com",
    cellPhone: "11970256279",
    phone: "11970256279",
    cpf: new CPF("56768654071"),
    cnpj: new CNPJ("93236453000100"),
    type: new CustomerType("NATURAL_PERSON"),
    address: new Address({
      zipCode: "05208200",
      city: "São Paulo",
      state: "SP",
      district: "Vila Perus",
      street: "Rua Xavier de Castro",
      number: "1229",
      complement: "casa",
      ...override?.address,
    }),
    ...override,
  });

  return customer;
}
