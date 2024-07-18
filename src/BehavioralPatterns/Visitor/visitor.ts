export interface Visitor {
  visitConcreteElement1(concreteElement1: ConcreteElement1): void;
  visitConcreteElement2(concreteElement2: ConcreteElement2): void;
}

export class ConcreteVisitor1 implements Visitor {
  public visitConcreteElement1(concreteElement1: ConcreteElement1): void {
    console.log(`ConcreteVisitor1 is visiting ConcreteElement1 with value: ${concreteElement1.getValue()}`);
  }

  public visitConcreteElement2(concreteElement2: ConcreteElement2): void {
    console.log(`ConcreteVisitor1 is visiting ConcreteElement2 with value: ${concreteElement2.getValue()}`);
  }
}

export class ConcreteVisitor2 implements Visitor {
  public visitConcreteElement1(concreteElement1: ConcreteElement1): void {
    console.log(`ConcreteVisitor2 is visiting ConcreteElement1 with value: ${concreteElement1.getValue()}`);
  }

  public visitConcreteElement2(concreteElement2: ConcreteElement2): void {
    console.log(`ConcreteVisitor2 is visiting ConcreteElement2 with value: ${concreteElement2.getValue()}`);
  }
}

export interface Element {
  accept(visitor: Visitor): void;
  getValue(): string;
}

export class ConcreteElement1 implements Element {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public accept(visitor: Visitor): void {
    console.log('`accept` of ConcreteElement1 is being called!');
    visitor.visitConcreteElement1(this);
  }

  public getValue(): string {
    return this.value;
  }
}

export class ConcreteElement2 implements Element {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public accept(visitor: Visitor): void {
    console.log('`accept` of ConcreteElement2 is being called!');
    visitor.visitConcreteElement2(this);
  }

  public getValue(): string {
    return this.value;
  }
}

export class ObjectStructure {
  private elements: Element[] = [];

  public attach(element: Element): void {
    this.elements.push(element);
  }

  public detach(element: Element): void {
    const index = this.elements.indexOf(element);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  }

  public accept(visitor: Visitor): void {
    for (const element of this.elements) {
      element.accept(visitor);
    }
  }
}
