export interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

export interface Aggregator<T> {
  createIterator(): Iterator<T>;
}

export class ConcreteIterator<T> implements Iterator<T> {
  private position: number = 0;

  constructor(private collection: T[]) {}

  public next(): T | null {
    if (this.hasNext()) {
      return this.collection[this.position++];
    }
    return null;
  }

  public hasNext(): boolean {
    return this.position < this.collection.length;
  }
}

export class Numbers implements Aggregator<number> {
  constructor(private collection: number[]) {}

  public createIterator(): Iterator<number> {
    return new ConcreteIterator(this.collection);
  }
}

// Example usage
const numbers = new Numbers([1, 2, 3, 4, 5]);
const iterator = numbers.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
