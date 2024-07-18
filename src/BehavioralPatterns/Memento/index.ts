import { State, Originator, CareTaker } from './memento';

function mementoPattern(): void {
  const state: State = new State('... State ');
  const originator: Originator = new Originator(state);
  const careTaker: CareTaker = new CareTaker();

  careTaker.memento = originator.createMemento();
  originator.state = new State('something else...');

  originator.setMemento(careTaker.memento!);
}

export default mementoPattern;
