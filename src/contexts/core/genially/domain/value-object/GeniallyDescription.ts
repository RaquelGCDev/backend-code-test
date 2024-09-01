import { StringValueObject } from "../../../../shared/domain/StringValueObject"
import { DescriptionLengthExceeded } from '../DescriptionLengthExceeded';

const MAX_VALUE = 125;
export default class GeniallyDescription extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan125Characters(value);
    }

    private ensureLengthIsLessThan125Characters(value: string): void {
        if (value.length > MAX_VALUE) {
            throw new DescriptionLengthExceeded(`The description <${value}> has more than 125 characters`);
        }
    }
}