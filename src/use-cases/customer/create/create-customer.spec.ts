import { CustomerAlreadyExists } from "../../../domain/customer/errors/customer-already-exists.error";
import { makeCustomer } from "../../../test/customer/factories/make-customer";
import { InMemoryCustomerRepository } from "../../../test/customer/repositories/in-memory-customer-repository";
import { CreateCustomerUseCase } from "./create-customer";

describe("Create customer test", () => {
  let inMemoryCustomerRepository: InMemoryCustomerRepository;
  let sut: CreateCustomerUseCase;

  const data = {
    name: "Gustavo",
    email: "gug.henri1@gmail.com",
    cellPhone: "11970256279",
    phone: "11970256279",
    cpf: "56768654071",
    cnpj: "93236453000100",
    type: "NATURAL_PERSON",
    zipCode: "05208200",
    city: "São Paulo",
    state: "SP",
    district: "Vila Perus",
    street: "Rua Xavier de Castro",
    number: "1229",
    complement: "casa",
  };

  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new CreateCustomerUseCase(inMemoryCustomerRepository);
  });

  it("should be able to create a customer", async () => {
    const { customer } = await sut.execute(data);

    expect(customer.id).toBeDefined();

    expect(inMemoryCustomerRepository.customers[0]).toEqual(
      expect.objectContaining(customer)
    );
  });

  it("should not be able to create a customer because customer already exists", async () => {
    const customer = makeCustomer();
    inMemoryCustomerRepository.create(customer);

    expect(() =>
      sut.execute({
        ...data,
        email: customer.email,
      })
    ).rejects.toThrow(CustomerAlreadyExists);
  });
});
