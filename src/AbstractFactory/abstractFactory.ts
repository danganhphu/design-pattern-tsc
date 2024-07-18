export interface AbstractProductA {
  methodA: () => string;
}

export interface AbstractProductB {
  methodB: () => number;
}

export interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

export class ProductA1 implements AbstractProductA {
  methodA = (): string => 'This is methodA of ProductA1';
}

export class ProductB1 implements AbstractProductB {
  methodB = (): number => 1;
}

export class ProductA2 implements AbstractProductA {
  methodA = (): string => 'This is methodA of ProductA2';
}

export class ProductB2 implements AbstractProductB {
  methodB = (): number => 2;
}

export class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ProductA1();
  }

  createProductB(): AbstractProductB {
    return new ProductB1();
  }
}

export class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ProductA2();
  }

  createProductB(): AbstractProductB {
    return new ProductB2();
  }
}

export class Tester {
  private abstractProductA: AbstractProductA;
  private abstractProductB: AbstractProductB;

  constructor(factory: AbstractFactory) {
    this.abstractProductA = factory.createProductA();
    this.abstractProductB = factory.createProductB();
  }

  public test(): void {
    console.log(this.abstractProductA.methodA());
    console.log(this.abstractProductB.methodB());
  }
}
