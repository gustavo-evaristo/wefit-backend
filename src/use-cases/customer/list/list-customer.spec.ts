import { makeCustomer } from "../../../test/customer/factories/make-customer";
import { InMemoryCustomerRepository } from "../../../test/customer/repositories/in-memory-customer-repository";
import { ListCustomerUseCase } from "./list-customers";

describe("List customers test", () => {
  let inMemoryCustomerRepository: InMemoryCustomerRepository;
  let sut: ListCustomerUseCase;

  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new ListCustomerUseCase(inMemoryCustomerRepository);
  });

  it("should be able to list a customers", async () => {
    inMemoryCustomerRepository.customers.push(
      makeCustomer(),
      makeCustomer(),
      makeCustomer()
    );

    const { customers } = await sut.execute();

    expect(customers).toHaveLength(3);
  });
});
