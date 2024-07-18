export class State {
  constructor(private _str: string) {}

  get str(): string {
    return this._str;
  }

  set str(newStr: string) {
    this._str = newStr;
  }
}

export class Originator {
  constructor(private _state: State) {}

  get state(): State {
    return this._state;
  }

  set state(newState: State) {
    console.log('State :: ', newState);
    this._state = newState;
  }

  public createMemento(): Memento {
    console.log('Creates a memento with a given state!');
    return new Memento(this._state);
  }

  public setMemento(memento: Memento): void {
    console.log('Sets the state back');
    this.state = memento.state;
  }
}

export class Memento {
  constructor(private readonly _state: State) {}

  get state(): State {
    console.log("Get memento's state");
    return this._state;
  }
}

export class CareTaker {
  private _memento: Memento | null = null;

  get memento(): Memento | null {
    return this._memento;
  }

  set memento(newMemento: Memento | null) {
    this._memento = newMemento;
  }
}
