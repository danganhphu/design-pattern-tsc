import { ConcreteClass1, ConcreteClass2 } from './templateMethod';

function templateMethodPattern(): void {
  const concreteClass1: ConcreteClass1 = new ConcreteClass1();
  concreteClass1.templateMethod();

  const concreteClass2: ConcreteClass1 = new ConcreteClass2();
  concreteClass2.templateMethod();
}

export default templateMethodPattern;
