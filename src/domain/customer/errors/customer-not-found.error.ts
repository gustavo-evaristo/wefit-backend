export class CustomerNotFound extends Error {
  constructor() {
    super("customer not found");
  }
}
