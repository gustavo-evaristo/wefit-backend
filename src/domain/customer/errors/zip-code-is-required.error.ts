export class ZipCodeIsRequired extends Error {
  constructor() {
    super("zip code is required");
  }
}
