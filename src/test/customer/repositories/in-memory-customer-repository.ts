import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepository } from "../../../domain/customer/repositories/customer.repository";

export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = [];

  async create(customer: Customer) {
    this.customers.push(customer);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.id === id);

    if (!customer) {
      return null;
    }

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.email === email
    );

    if (!customer) {
      return null;
    }

    return customer;
  }

  async findMany(): Promise<Customer[]> {
    return this.customers;
  }

  async delete({ id }: Customer): Promise<void> {
    const index = this.customers.findIndex((customer) => customer.id === id);

    this.customers.splice(index, 1);
  }
}
