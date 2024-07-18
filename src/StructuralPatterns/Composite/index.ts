import { Composite, Leaf } from './composite';

function compositePattern(): void {
  const leaf1 = new Leaf('1');
  const leaf2 = new Leaf('2');
  const leaf3 = new Leaf('3');

  const composite1 = new Composite('Comp1');
  const composite2 = new Composite('Comp2');

  composite1.add(leaf1);
  composite1.add(leaf2);
  composite1.add(leaf3);

  composite1.remove(2);

  composite2.add(leaf1);
  composite2.add(leaf3);

  console.log('Composite1 operation:');
  composite1.operation();

  console.log('Composite2 operation:');
  composite2.operation();
}

export default compositePattern;
