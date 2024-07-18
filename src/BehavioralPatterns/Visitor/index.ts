import { ObjectStructure, ConcreteElement1, ConcreteElement2, ConcreteVisitor1, ConcreteVisitor2 } from './visitor';

function visitorPattern(): void {
  const objStructure: ObjectStructure = new ObjectStructure();
  const element1: ConcreteElement1 = new ConcreteElement1('Element1');
  const element2: ConcreteElement2 = new ConcreteElement2('Element2');

  objStructure.attach(element1);
  objStructure.attach(element2);

  const visitor1: ConcreteVisitor1 = new ConcreteVisitor1();
  const visitor2: ConcreteVisitor2 = new ConcreteVisitor2();

  objStructure.accept(visitor1);
  objStructure.accept(visitor2);
}

export default visitorPattern;
