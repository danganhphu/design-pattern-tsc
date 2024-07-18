import { Numbers, ConcreteIterator } from './iterator';

function iteratorPattern(): void {
  const nArray: number[] = [1, 7, 21, 657, 3, 2, 765, 13, 65];
  const numbers: Numbers = new Numbers(nArray);
  const it: ConcreteIterator<number> = numbers.createIterator() as ConcreteIterator<number>;

  while (it.hasNext()) {
    console.log(it.next());
  }
}

export default iteratorPattern;
