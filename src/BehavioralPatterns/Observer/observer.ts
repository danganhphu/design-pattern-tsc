export interface IObserver {
  notify(): void;
}

export class Subject {
  private observers: IObserver[] = [];

  public register(observer: IObserver): void {
    console.log(observer, 'is registered!');
    this.observers.push(observer);
  }

  public unregister(observer: IObserver): void {
    const index: number = this.observers.indexOf(observer);
    if (index > -1) {
      console.log(observer, 'is unregistered');
      this.observers.splice(index, 1);
    }
  }

  public notify(): void {
    console.log('notify all the observers', this.observers);
    this.observers.forEach((observer) => observer.notify());
  }
}

export class ConcreteSubject extends Subject {
  private _subjectState: number = 0;

  get subjectState(): number {
    return this._subjectState;
  }

  set subjectState(state: number) {
    this._subjectState = state;
  }
}

export abstract class Observer implements IObserver {
  abstract notify(): void;
}

export class ConcreteObserver extends Observer {
  private _name: string;
  private _state: number = 0;
  private _subject: ConcreteSubject;

  constructor(subject: ConcreteSubject, name: string) {
    super();
    console.log('ConcreteObserver', name, 'is created!');
    this._subject = subject;
    this._name = name;
  }

  public notify(): void {
    console.log("ConcreteObserver's notify method");
    this._state = this._subject.subjectState;
    console.log(this._name, this._state);
  }

  get subject(): ConcreteSubject {
    return this._subject;
  }

  set subject(newSubject: ConcreteSubject) {
    this._subject = newSubject;
  }
}
