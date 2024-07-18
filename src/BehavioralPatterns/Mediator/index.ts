import { ConcreteMediator, ConcreteColleagueA, ConcreteColleagueB } from './mediator';

function mediatorPattern(): void {
  const cm: ConcreteMediator = new ConcreteMediator();
  const colleagueA: ConcreteColleagueA = new ConcreteColleagueA(cm);
  const colleagueB: ConcreteColleagueB = new ConcreteColleagueB(cm);

  cm.concreteColleagueA = colleagueA;
  cm.concreteColleagueB = colleagueB;

  colleagueA.send('`send` of ConcreteColleagueA is being called!');
  colleagueB.send('`send` of ConcreteColleagueB is being called!');
}

export default mediatorPattern;
