import { CustomerTypeIsRequired } from "../errors/customer-type-is-required.error";
import { InvalidCustomerType } from "../errors/invalid-customer-type.error";

enum CUSTOMER_TYPE_ENUM {
  NATURAL_PERSON = "NATURAL_PERSON",
  LEGAL_PERSON = "LEGAL_PERSON",
}

export class CustomerType {
  private _type: string;

  constructor(type: string) {
    this._type = type;

    this.validate();
  }

  private validate() {
    if (!this._type) {
      throw new CustomerTypeIsRequired();
    }

    if (
      this._type !== CUSTOMER_TYPE_ENUM.NATURAL_PERSON &&
      this._type !== CUSTOMER_TYPE_ENUM.LEGAL_PERSON
    ) {
      throw new InvalidCustomerType();
    }
  }

  get value() {
    return this._type;
  }
}
