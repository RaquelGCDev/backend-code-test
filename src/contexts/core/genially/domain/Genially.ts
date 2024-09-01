import GeniallyId from "./value-object/GeniallyId";
import GeniallyName from "./value-object/GeniallyName";
import GeniallyDescription from "./value-object/GeniallyDescription";

export type GeniallyPrimitives = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt?: Date;
};

export default class Genially {
  private _id: GeniallyId;
  private _name: GeniallyName;
  private _description: GeniallyDescription;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(id: GeniallyId, name: GeniallyName, description?: GeniallyDescription) {
    this._id = id;
    this._name = name;
    this._description = description;
  }


  public static create(
      id: GeniallyId,
      name: GeniallyName,
      description: GeniallyDescription
  ): Genially {
    return new Genially(id, name, description);
  }

  get id(): GeniallyId {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  delete(): void {
    this._deletedAt = new Date();
  }

  update(): void {
    this._modifiedAt = new Date();
  }
}
