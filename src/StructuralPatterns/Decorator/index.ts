import { ConcreteComponent, Decorator, ConcreteDecorator } from './decorator';

function decoratorPattern(): void {
  const decorator1: Decorator = new ConcreteDecorator(1, new ConcreteComponent('Comp1'));
  decorator1.operation();
}

export default decoratorPattern;
