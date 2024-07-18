import { Handler, ConcreteHandler1, ConcreteHandler2, ConcreteHandler3 } from './chainOfResponsibility';

function chainOfResponsibilityPattern(): void {
  const reqs: number[] = [2, 7, 23, 34, 4, 5, 8, 3];

  const h1: Handler = new ConcreteHandler1(3);
  const h2: Handler = new ConcreteHandler2(7);
  const h3: Handler = new ConcreteHandler3(20);

  h1.setHandler(h2);
  h2.setHandler(h3);

  for (const req of reqs) {
    h1.operation('operation is fired!', req);
  }
}

export { chainOfResponsibilityPattern };
