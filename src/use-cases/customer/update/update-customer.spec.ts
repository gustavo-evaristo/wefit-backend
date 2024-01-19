import { CustomerNotFound } from "../../../domain/customer/errors/customer-not-found.error";
import { EmailAlreadyRegistered } from "../../../domain/customer/errors/email-already-registered.error";
import { makeCustomer } from "../../../test/customer/factories/make-customer";
import { InMemoryCustomerRepository } from "../../../test/customer/repositories/in-memory-customer-repository";
import { UpdateCustomerUseCase } from "./update-customer";

describe("Update customer test", () => {
  let inMemoryCustomerRepository: InMemoryCustomerRepository;
  let sut: UpdateCustomerUseCase;

  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new UpdateCustomerUseCase(inMemoryCustomerRepository);
  });

  it("should be able to update a customer", async () => {
    const customerToCreate = makeCustomer();
    inMemoryCustomerRepository.create(customerToCreate);

    const { customer } = await sut.execute({
      id: customerToCreate.id,
      email: "gustavo2@gmail.com",
      cellPhone: "5511970256277",
      phone: "5511970256277",
      name: "Gustavo Updated",
      cpf: "40856565032",
      cnpj: "20957506000109",
      type: "LEGAL_PERSON",
      zipCode: "05208200",
      city: "São Paulo",
      state: "SP",
      district: "Vila Perus",
      street: "Rua 24 de maio",
      number: "1229",
      complement: "casa",
    });

    expect(customer.email).toBe("gustavo2@gmail.com");
    expect(customer.name).toBe("Gustavo Updated");
    expect(customer.cpf.value).toBe("40856565032");
    expect(customer.cnpj.value).toBe("20957506000109");
    expect(customer.type.value).toBe("LEGAL_PERSON");
    expect(customer.address.value.street).toBe("Rua 24 de maio");
  });

  it("should not be able to update a customer because not found", async () => {
    const customer = makeCustomer();

    expect(() =>
      sut.execute({
        id: customer.id,
        email: "gustavo2@gmail.com",
        cellPhone: "5511970256277",
        phone: "5511970256277",
        name: "Gustavo Updated",
        cpf: "40856565032",
        cnpj: "20957506000109",
        type: "LEGAL_PERSON",
        zipCode: "05208200",
        city: "São Paulo",
        state: "SP",
        district: "Vila Perus",
        street: "Rua Xavier de Castro",
        number: "1229",
        complement: "casa",
      })
    ).rejects.toThrow(CustomerNotFound);
  });

  it("should not be able to update a customer because email already registered", async () => {
    const customer = makeCustomer();
    const customer2 = makeCustomer({ email: "gustavo2@gmail.com" });

    inMemoryCustomerRepository.create(customer);
    inMemoryCustomerRepository.create(customer2);

    expect(() =>
      sut.execute({
        id: customer.id,
        email: customer2.email,
        cellPhone: "5511970256277",
        phone: "5511970256277",
        name: "Gustavo Updated",
        cpf: "40856565032",
        cnpj: "20957506000109",
        type: "LEGAL_PERSON",
        zipCode: "05208200",
        city: "São Paulo",
        state: "SP",
        district: "Vila Perus",
        street: "Rua Xavier de Castro",
        number: "1229",
        complement: "casa",
      })
    ).rejects.toThrow(EmailAlreadyRegistered);
  });
});
