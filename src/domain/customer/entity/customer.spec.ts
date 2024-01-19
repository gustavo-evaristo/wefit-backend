import { InvalidCNPJ } from "../errors/invalid-cnpj.error";
import { InvalidCPF } from "../errors/invalid-cpf.error";
import { InvalidCustomerType } from "../errors/invalid-customer-type.error";
import { StreetIsRequired } from "../errors/street-is-required.error";
import { Address } from "../value-object/address";
import { CNPJ } from "../value-object/cnpj";
import { CPF } from "../value-object/cpf";
import { CustomerType } from "../value-object/customer-type";
import { Customer } from "./customer";

const data = {
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
  }),
};

describe("Customer test", () => {
  it("should be able to make a customer", () => {
    const customer = Customer.create(data);

    expect(customer.id).toBeDefined();
  });

  it("should not be able to make a customer because CPF is invalid", () => {
    expect(() =>
      Customer.create({
        ...data,
        cpf: new CPF("123456789"),
      })
    ).toThrow(InvalidCPF);
  });

  it("should not be able to make a customer because CNPJ is invalid", () => {
    expect(() =>
      Customer.create({
        ...data,
        cnpj: new CNPJ("123456789"),
      })
    ).toThrow(InvalidCNPJ);
  });

  it("should not be able to make a customer because street address is required", () => {
    expect(() =>
      Customer.create({
        ...data,
        address: new Address({
          ...data.address.value,
          street: "",
        }),
      })
    ).toThrow(StreetIsRequired);
  });

  it("should not be able to make a customer because type is invalid", () => {
    expect(() =>
      Customer.create({
        ...data,
        type: new CustomerType("PERSON"),
      })
    ).toThrow(InvalidCustomerType);
  });
});
