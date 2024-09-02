import {AggregateRoot} from "../../../shared/domain/AggregateRoot";
import { CounterTotal } from './CounterTotal';
import CounterModifiedAt from "./CounterModifiedAt";

type CounterPrimitives = {
    total: number,
    modifiedAt: Date
}

export class Counter extends AggregateRoot {
    private _total: CounterTotal;
    private _modifiedAt: CounterModifiedAt;

    public constructor(total: CounterTotal, modifiedAt: CounterModifiedAt){
        super();
        this._total = total;
        this._modifiedAt = modifiedAt;
    }

    static fromPrimitives(data: { total: number, modifiedAt: Date }): Counter {
        return new Counter(
            new CounterTotal(data.total),
            new CounterModifiedAt(data.modifiedAt));
    }

    toPrimitives(): CounterPrimitives {
        return {
            total: this._total.value,
            modifiedAt: this._modifiedAt?.value
        };
    }

    public get total(): number {
        return this._total.value;
    }

    public get modifiedAt(): Date {
        return this._modifiedAt.value;
    }

    public increase(): void {
        this._modifiedAt = new CounterModifiedAt(new Date());
        this._total = new CounterTotal(this._total.value + 1)
    }
}