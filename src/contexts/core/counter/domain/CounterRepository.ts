import { Counter } from './Counter';
import {Nullable} from "../../../shared/domain/Nullable";

export interface CounterRepository {
  search(): Promise<Nullable<Counter>>;
  save(counter: Counter): Promise<void>;
}