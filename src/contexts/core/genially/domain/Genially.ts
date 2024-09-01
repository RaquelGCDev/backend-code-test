import GeniallyId from "./value-object/GeniallyId";
import GeniallyName from "./value-object/GeniallyName";
import GeniallyDescription from "./value-object/GeniallyDescription";
import GeniallyCreatedAt from "./value-object/GeniallyCreatedAt";
import GeniallyModifiedAt from "./value-object/GeniallyModifiedAt";
import GeniallyDeletedAt from "./value-object/GeniallyDeletedAt";

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
  private _createdAt: GeniallyCreatedAt;
  private _modifiedAt: GeniallyModifiedAt;
  private _deletedAt: GeniallyDeletedAt;

  constructor(id: GeniallyId, name: GeniallyName, description?: GeniallyDescription, createdAt?: GeniallyCreatedAt, modifiedAt?: GeniallyModifiedAt, deletedAt?: GeniallyDeletedAt) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
    this._deletedAt = deletedAt;
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

  get createdAt(): GeniallyCreatedAt {
    return this._createdAt;
  }

  get modifiedAt(): GeniallyModifiedAt {
    return this._modifiedAt;
  }

  get deletedAt(): GeniallyDeletedAt {
    return this._deletedAt;
  }

  delete(): void {
    this._deletedAt = new GeniallyDeletedAt(new Date());
  }

  update(): void {
    this._modifiedAt = new GeniallyModifiedAt(new Date());
  }

  static fromPrimitives(data: { id: string, name: string, description: string, createdAt: Date, modifiedAt: Date, deletedAt: Date }): Genially {
    return new Genially(
        new GeniallyId(data.id),
        new GeniallyName(data.name),
        data.description !== null ? new GeniallyDescription(data.description) : undefined,
        new GeniallyCreatedAt(data.createdAt),
        data.modifiedAt !== null ? new GeniallyModifiedAt(data.modifiedAt) : undefined,
        data.deletedAt !== null ? new GeniallyDeletedAt(data.deletedAt) : undefined);
  }

  toPrimitives(): GeniallyPrimitives {
    return {
      id: this._id.value,
      name: this._name.value,
      description: this._description?.value,
      createdAt: this._createdAt?.value,
      modifiedAt: this._modifiedAt?.value,
      deletedAt: this._deletedAt?.value
    };
  }
}
