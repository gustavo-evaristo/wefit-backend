export class EmailAlreadyRegistered extends Error {
  constructor() {
    super("email already registered");
  }
}
