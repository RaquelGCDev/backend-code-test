import {CounterRepository} from "../../domain/CounterRepository";


export class CounterIncrementer {
  constructor(private readonly repository: CounterRepository){}

  public async execute() {
    const actualCounter = await this.repository.search();

    actualCounter.increase();

    await this.repository.save(actualCounter);
  }
}
