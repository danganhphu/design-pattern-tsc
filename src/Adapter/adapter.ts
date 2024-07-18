export class Adaptee {
  public method(): void {
    console.log('`method` of Adaptee is being called');
  }
}

export interface Target {
  call(): void;
}

export class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  public call(): void {
    console.log("Adapter's `call` method is being called");
    this.adaptee.method();
  }
}
