import { ConcreteSubject, ConcreteObserver } from './observer';

function observerPattern(): void {
  const sub: ConcreteSubject = new ConcreteSubject();

  const observer1: ConcreteObserver = new ConcreteObserver(sub, 'Jancsi');
  const observer2: ConcreteObserver = new ConcreteObserver(sub, 'Julcsa');
  const observer3: ConcreteObserver = new ConcreteObserver(sub, 'Marcsa');

  sub.register(observer1);
  sub.register(observer2);
  sub.register(observer3);

  sub.subjectState = 123;
  sub.notify();
}

export default observerPattern;
