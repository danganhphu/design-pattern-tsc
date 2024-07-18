export interface Component {
  operation(): void;
}

export class Composite implements Component {
  private list: Component[];
  private s: string;

  constructor(s: string) {
    this.list = [];
    this.s = s;
  }

  public operation(): void {
    console.log(`operation of ${this.s}`);
    this.list.forEach((component) => component.operation());
  }

  public add(component: Component): void {
    this.list.push(component);
  }

  public remove(index: number): void {
    if (index < 0 || index >= this.list.length) {
      throw new Error('Index out of bounds!');
    }
    this.list.splice(index, 1);
  }
}

export class Leaf implements Component {
  private s: string;

  constructor(s: string) {
    this.s = s;
  }

  public operation(): void {
    console.log(`operation of Leaf ${this.s} is called.`);
  }
}
