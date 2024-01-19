import { CustomerNotFound } from "../../../domain/customer/errors/customer-not-found.error";
import { CustomerRepository } from "../../../domain/customer/repositories/customer.repository";

interface Input {
  id: string;
}

interface Output {
  status: string;
}

export class DeleteCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new CustomerNotFound();
    }

    await this.customerRepository.delete(customer);

    return { status: "ok" };
  }
}
