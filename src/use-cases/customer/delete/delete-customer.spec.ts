import { CustomerNotFound } from "../../../domain/customer/errors/customer-not-found.error";
import { makeCustomer } from "../../../test/customer/factories/make-customer";
import { InMemoryCustomerRepository } from "../../../test/customer/repositories/in-memory-customer-repository";
import { DeleteCustomerUseCase } from "./delete-customer";

describe("Delete customer test", () => {
  let inMemoryCustomerRepository: InMemoryCustomerRepository;
  let sut: DeleteCustomerUseCase;

  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new DeleteCustomerUseCase(inMemoryCustomerRepository);
  });

  it("should not be able to delete a customer because customer not found", async () => {
    expect(() =>
      sut.execute({
        id: "1",
      })
    ).rejects.toThrow(CustomerNotFound);
  });

  it("should be able to delete a customer", async () => {
    const customer = makeCustomer();
    inMemoryCustomerRepository.create(customer);

    const { status } = await sut.execute({ id: customer.id });

    expect(status).toBe("ok");
  });
});
