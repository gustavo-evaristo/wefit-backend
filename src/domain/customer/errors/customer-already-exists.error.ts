export class CustomerAlreadyExists extends Error {
  constructor() {
    super("customer already exists");
  }
}
