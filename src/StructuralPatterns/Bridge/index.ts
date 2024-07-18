import {
  Implementor,
  Abstraction,
  ConcreteImplementorA,
  ConcreteImplementorB,
  RefinedAbstractionA,
  RefinedAbstractionB
} from './bridge';

function bridgePattern(): void {
  const implementorA: Implementor = new ConcreteImplementorA();
  const implementorB: Implementor = new ConcreteImplementorB();

  const abstractionA: Abstraction = new RefinedAbstractionA(implementorA);
  const abstractionB: Abstraction = new RefinedAbstractionB(implementorB);
  abstractionA.callIt('abstractionA');
  abstractionB.callIt('abstractionB');
}

export default bridgePattern;
