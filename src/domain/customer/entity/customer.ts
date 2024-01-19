import { randomUUID } from "node:crypto";
import { Entity } from "../../../core/entities/entity";
import { Optional } from "../../../core/types/optional";
import { Address } from "../value-object/address";
import { CNPJ } from "../value-object/cnpj";
import { CPF } from "../value-object/cpf";
import { CustomerType } from "../value-object/customer-type";

export interface CustomerProps {
  id: string;
  type: CustomerType;
  name: string;
  email: string;
  phone: string;
  cellPhone: string;
  cpf: CPF;
  cnpj: CNPJ;
  address: Address;
  createdAt: Date;
  updatedAt?: Date;
}

interface UpdateCustomerProps {
  name: string;
  phone: string;
  cellPhone: string;
}

export class Customer extends Entity<CustomerProps> {
  static create(props: Optional<CustomerProps, "id" | "createdAt">) {
    const customer = new Customer({
      ...props,
      id: props.id || randomUUID(),
      createdAt: props.createdAt || new Date(),
    });

    return customer;
  }

  get id() {
    return this.props.id;
  }

  get type() {
    return this.props.type;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get cellPhone() {
    return this.props.cellPhone;
  }

  get cpf() {
    return this.props.cpf;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get address() {
    return this.props.address;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  public update({ name, phone, cellPhone }: UpdateCustomerProps) {
    this.props.name = name;
    this.props.phone = phone;
    this.props.cellPhone = cellPhone;
    this.touch();
  }

  public changeEmail(email: string) {
    this.props.email = email;
    this.touch();
  }

  public changeAddress(address: Address) {
    this.props.address = address;
    this.touch();
  }

  public changeCPF(cpf: CPF) {
    this.props.cpf = cpf;
    this.touch();
  }

  public changeCNPJ(cnpj: CNPJ) {
    this.props.cnpj = cnpj;
    this.touch();
  }

  public changeType(type: CustomerType) {
    this.props.type = type;
    this.touch();
  }
}
