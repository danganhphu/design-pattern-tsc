export interface Flyweight {
  operation(s: string): void;
}

export class ConcreteFlyweight implements Flyweight {
  private intrinsicState: string;

  constructor(intrinsicState: string) {
    this.intrinsicState = intrinsicState;
  }

  public operation(s: string): void {
    console.log(`\`operation\` of ConcreteFlyweight with state: ${s} is being called!`);
  }
}

export class UnsharedConcreteFlyweight implements Flyweight {
  private allState: number;

  constructor(allState: number) {
    this.allState = allState;
  }

  public operation(s: string): void {
    console.log(`\`operation\` of UnsharedConcreteFlyweight with state: ${s} is being called!`);
  }
}

export class FlyweightFactory {
  private fliesMap: { [key: string]: Flyweight } = {};

  constructor() {}

  public getFlyweight(key: string): Flyweight {
    if (!this.fliesMap[key]) {
      this.fliesMap[key] = new ConcreteFlyweight(key);
    }
    return this.fliesMap[key];
  }
}
