export abstract class AbstractClass {
  public abstract method1(): void;
  public abstract method2(): void;
  public abstract method3(): void;

  public templateMethod(): void {
    console.log('templateMethod is being called');
    this.method1();
    this.method2();
    this.method3();
  }
}

export class ConcreteClass1 extends AbstractClass {
  public method1(): void {
    console.log('method1 of ConcreteClass1');
  }

  public method2(): void {
    console.log('method2 of ConcreteClass1');
  }

  public method3(): void {
    console.log('method3 of ConcreteClass1');
  }
}

export class ConcreteClass2 extends AbstractClass {
  public method1(): void {
    console.log('method1 of ConcreteClass2');
  }

  public method2(): void {
    console.log('method2 of ConcreteClass2');
  }

  public method3(): void {
    console.log('method3 of ConcreteClass2');
  }
}
