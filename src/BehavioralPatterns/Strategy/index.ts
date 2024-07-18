import { Context, ConcreteStrategy1, ConcreteStrategy2, ConcreteStrategy3 } from './strategy';

function strategyPattern(): void {
  const context = new Context(new ConcreteStrategy1());
  context.executeStrategy(); // Output: `execute` method of ConcreteStrategy1 is being called

  context.setStrategy(new ConcreteStrategy2());
  context.executeStrategy(); // Output: `execute` method of ConcreteStrategy2 is being called

  context.setStrategy(new ConcreteStrategy3());
  context.executeStrategy(); // Output: `execute` method of ConcreteStrategy3 is being called
}

export default strategyPattern;
