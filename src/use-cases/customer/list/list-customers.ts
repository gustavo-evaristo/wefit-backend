import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepository } from "../../../domain/customer/repositories/customer.repository";

interface Output {
  customers: Customer[];
}

export class ListCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Output> {
    const customers = await this.customerRepository.findMany();

    return { customers };
  }
}
