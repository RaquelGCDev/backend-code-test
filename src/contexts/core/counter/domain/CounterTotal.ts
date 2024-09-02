import {NumberValueObject} from "../../../shared/domain/NumberValueObject";

export class CounterTotal extends NumberValueObject {
  increment(): CounterTotal {
    return new CounterTotal(this.value + 1);
  }

  static initialize(): CounterTotal {
    return new CounterTotal(0);
  }
}
