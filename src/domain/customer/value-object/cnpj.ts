import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { CNPJisRequired } from "../errors/cnpj-is-required.error";
import { InvalidCNPJ } from "../errors/invalid-cnpj.error";

export class CNPJ {
  private _cnpj: string;

  constructor(cnpj: string) {
    this._cnpj = cnpj;
    this.validate();
  }

  private validate() {
    if (!this._cnpj) {
      throw new CNPJisRequired();
    }

    const cnpjIsValid = cnpjValidator.isValid(this._cnpj);

    if (!cnpjIsValid) {
      throw new InvalidCNPJ();
    }
  }

  get value() {
    return this._cnpj;
  }
}
