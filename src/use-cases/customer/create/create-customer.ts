import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerAlreadyExists } from "../../../domain/customer/errors/customer-already-exists.error";
import { CustomerRepository } from "../../../domain/customer/repositories/customer.repository";
import { Address } from "../../../domain/customer/value-object/address";
import { CNPJ } from "../../../domain/customer/value-object/cnpj";
import { CPF } from "../../../domain/customer/value-object/cpf";
import { CustomerType } from "../../../domain/customer/value-object/customer-type";

interface Input {
  type: string;
  name: string;
  email: string;
  phone: string;
  cellPhone: string;
  cpf: string;
  cnpj: string;
  zipCode: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number: string;
  complement?: string;
}

interface Output {
  customer: Customer;
}

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({
    name,
    email,
    phone,
    cellPhone,
    cpf,
    cnpj,
    type,
    zipCode,
    city,
    state,
    district,
    street,
    number,
    complement,
  }: Input): Promise<Output> {
    const customerAlreadyExists = await this.customerRepository.findByEmail(
      email
    );

    if (customerAlreadyExists) {
      throw new CustomerAlreadyExists();
    }

    const customer = Customer.create({
      name,
      email,
      phone,
      cellPhone,
      cpf: new CPF(cpf),
      cnpj: new CNPJ(cnpj),
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

    await this.customerRepository.create(customer);

    return { customer };
  }
}
