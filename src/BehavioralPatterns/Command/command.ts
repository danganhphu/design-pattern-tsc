export abstract class Command {
  public abstract execute(): void;
}

export class ConcreteCommand1 extends Command {
  constructor(private receiver: Receiver) {
    super();
  }

  public execute(): void {
    console.log('`execute` method of ConcreteCommand1 is being called!');
    this.receiver.action();
  }
}

export class ConcreteCommand2 extends Command {
  constructor(private receiver: Receiver) {
    super();
  }

  public execute(): void {
    console.log('`execute` method of ConcreteCommand2 is being called!');
    this.receiver.action();
  }
}

export class Invoker {
  private commands: Command[] = [];

  public storeAndExecute(cmd: Command): void {
    this.commands.push(cmd);
    cmd.execute();
  }
}

export class Receiver {
  public action(): void {
    console.log('action is being called!');
  }
}
