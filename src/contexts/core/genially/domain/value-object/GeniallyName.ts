import { StringValueObject } from "../../../../shared/domain/StringValueObject"
import { NameLengthNotValid } from "../NameLengthNotValid";

export default class GeniallyName extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsValid(value);
    }

    private ensureLengthIsValid(value: string): void {
        if (value.length > 20 || value.length < 3) {
            throw new NameLengthNotValid(`The Genially Name <${value}> has less than 3 characters or more than 20`);
        }
    }

}