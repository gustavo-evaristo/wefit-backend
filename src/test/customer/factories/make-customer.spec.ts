import { makeCustomer } from "./make-customer";

describe("Make customer test", () => {
  it("should be able to make a customer", () => {
    const customer = makeCustomer();

    expect(customer.id).toBeDefined();
  });
});
