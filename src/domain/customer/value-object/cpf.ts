import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { CPFisRequired } from "../errors/cpf-is-required.error";
import { InvalidCPF } from "../errors/invalid-cpf.error";

export class CPF {
  private _cpf: string;

  constructor(cpf: string) {
    this._cpf = cpf;

    this.validate();
  }

  private validate() {
    if (!this._cpf) {
      throw new CPFisRequired();
    }

    const cpfIsValid = cpfValidator.isValid(this._cpf);

    if (!cpfIsValid) {
      throw new InvalidCPF();
    }
  }

  get value() {
    return this._cpf;
  }
}
