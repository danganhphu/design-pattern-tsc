import { Context, ConcreteStateA } from './state';

function statePattern(): void {
  var context: Context = new Context(new ConcreteStateA());
  context.request();
  context.request();
  context.request();
  context.request();
  context.request();
  context.request();
  context.request();
  context.request();
}

export { statePattern };
