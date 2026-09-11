import crypto from 'crypto';
import AbstractClassCreationError from '#models/base/errors/abstractClassCreationError.ts';

class BaseModel {
  protected _id: string;

  constructor() {
    if (this.constructor === BaseModel) throw new AbstractClassCreationError();

    this._id = crypto.randomUUID();
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

}

export default BaseModel;
