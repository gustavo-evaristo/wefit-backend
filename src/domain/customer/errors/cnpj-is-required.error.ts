export class CNPJisRequired extends Error {
  constructor() {
    super("cnpj is required");
  }
}
