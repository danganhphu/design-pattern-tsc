import { Context, ConcreteStateA } from './state';

export const StatePattern = {
  show(): void {
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
};
