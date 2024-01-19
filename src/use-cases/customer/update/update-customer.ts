import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerNotFound } from "../../../domain/customer/errors/customer-not-found.error";
import { EmailAlreadyRegistered } from "../../../domain/customer/errors/email-already-registered.error";
import { CustomerRepository } from "../../../domain/customer/repositories/customer.repository";
import { Address } from "../../../domain/customer/value-object/address";
import { CNPJ } from "../../../domain/customer/value-object/cnpj";
import { CPF } from "../../../domain/customer/value-object/cpf";
import { CustomerType } from "../../../domain/customer/value-object/customer-type";

interface Input {
  id: string;
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
  complement: string;
}

interface Output {
  customer: Customer;
}

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({
    id,
    name,
    email,
    phone,
    cellPhone,
    cpf,
    cnpj,
    zipCode,
    city,
    state,
    district,
    street,
    number,
    complement,
    type,
  }: Input): Promise<Output> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new CustomerNotFound();
    }

    if (customer.email !== email) {
      const emailAlreadyRegistered = await this.customerRepository.findByEmail(
        email
      );

      if (emailAlreadyRegistered) {
        throw new EmailAlreadyRegistered();
      }

      customer.changeEmail(email);
    }

    customer.update({ name, phone, cellPhone });

    const newAddress = new Address({
      zipCode,
      city,
      state,
      district,
      street,
      number,
      complement,
    });
    customer.changeAddress(newAddress);

    const newCPF = new CPF(cpf);
    customer.changeCPF(newCPF);

    const newCNPJ = new CNPJ(cnpj);
    customer.changeCNPJ(newCNPJ);

    const newType = new CustomerType(type);
    customer.changeType(newType);

    return { customer };
  }
}
