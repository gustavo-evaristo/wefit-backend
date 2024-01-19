import { PrismaClient } from "@prisma/client";
import { Customer } from "../../../../../domain/customer/entity/customer";
import { CustomerRepository } from "../../../../../domain/customer/repositories/customer.repository";
import { PrismaCreateCustomerAdapter } from "../../adapters/prisma/prisma-create-customer.adapter";
import { PrismaFindCustomerAdapter } from "../../adapters/prisma/prisma-find-customer.adapter";

export class PrismaCustomerRepository implements CustomerRepository {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prismaClient.customers.findUnique({
      where: { id },
    });

    if (!customer) {
      return null;
    }

    return PrismaFindCustomerAdapter.toDomain(customer);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prismaClient.customers.findUnique({
      where: { email },
    });

    if (!customer) {
      return null;
    }

    return PrismaFindCustomerAdapter.toDomain(customer);
  }

  async findMany() {
    const customers = await this.prismaClient.customers.findMany();

    return customers.map(PrismaFindCustomerAdapter.toDomain);
  }

  async create(customer: Customer): Promise<void> {
    const data = PrismaCreateCustomerAdapter.toPrisma(customer);

    await this.prismaClient.customers.create({ data });
  }

  async delete({ id }: Customer): Promise<void> {
    await this.prismaClient.customers.delete({ where: { id } });
  }
}
