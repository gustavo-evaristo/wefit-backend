import { CustomerNotFound } from "../../../domain/customer/errors/customer-not-found.error";
import { makeCustomer } from "../../../test/customer/factories/make-customer";
import { InMemoryCustomerRepository } from "../../../test/customer/repositories/in-memory-customer-repository";
import { FindCustomerUseCase } from "./find-customer";

describe("Find customer test", () => {
  let inMemoryCustomerRepository: InMemoryCustomerRepository;
  let sut: FindCustomerUseCase;

  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new FindCustomerUseCase(inMemoryCustomerRepository);
  });

  it("should not be able to find a customer because customer not found", async () => {
    expect(() =>
      sut.execute({
        id: "1",
      })
    ).rejects.toThrow(CustomerNotFound);
  });

  it("should be able to find a customer", async () => {
    const customerCreated = makeCustomer();
    inMemoryCustomerRepository.create(customerCreated);

    const { customer } = await sut.execute({ id: customerCreated.id });

    expect(customerCreated).toEqual(expect.objectContaining(customer));
  });
});
