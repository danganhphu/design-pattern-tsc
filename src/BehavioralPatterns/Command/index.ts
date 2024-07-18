import { Receiver, Command, Invoker, ConcreteCommand1, ConcreteCommand2 } from './command';

function commandPattern(): void {
  const receiver: Receiver = new Receiver();
  const command1: Command = new ConcreteCommand1(receiver);
  const command2: Command = new ConcreteCommand2(receiver);
  const invoker: Invoker = new Invoker();

  invoker.storeAndExecute(command1);
  invoker.storeAndExecute(command2);
}

export default commandPattern;
