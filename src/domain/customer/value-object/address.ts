import { CityIsRequired } from "../errors/city-is-required.error";
import { DistrictIsRequired } from "../errors/district-is-required.error";
import { NumberIsRequired } from "../errors/number-is-required.error";
import { StateIsRequired } from "../errors/state-is-required.error";
import { StreetIsRequired } from "../errors/street-is-required.error";
import { ZipCodeIsRequired } from "../errors/zip-code-is-required.error";

interface AddressProps {
  zipCode: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number: string;
  complement?: string | null;
}

export class Address {
  private _address: AddressProps;

  constructor(address: AddressProps) {
    this._address = address;

    this.validate();
  }

  private validate() {
    if (!this._address.zipCode) {
      throw new ZipCodeIsRequired();
    }

    if (!this._address.city) {
      throw new CityIsRequired();
    }

    if (!this._address.state) {
      throw new StateIsRequired();
    }

    if (!this._address.district) {
      throw new DistrictIsRequired();
    }

    if (!this._address.street) {
      throw new StreetIsRequired();
    }

    if (!this._address.number) {
      throw new NumberIsRequired();
    }
  }

  get value() {
    return this._address;
  }
}
