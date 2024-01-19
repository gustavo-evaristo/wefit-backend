import { Customer } from "../entity/customer";

export abstract class CustomerRepository {
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract create(customer: Customer): Promise<void>;
  abstract findById(id: string): Promise<Customer | null>;
  abstract findMany(): Promise<Customer[]>;
  abstract delete(customer: Customer): Promise<void>;
}
