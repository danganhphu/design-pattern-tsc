export interface AbstractProduct {
  method(): string;
}
export class ConcreteProductA implements AbstractProduct {
  method = () => {
    return 'Method of ConcreteProductA';
  };
}

export class ConcreteProductB implements AbstractProduct {
  method = () => {
    return 'Method of ConcreteProductB';
  };
}

export function createProduct(type: string): AbstractProduct | null {
  if (type === 'A') {
    return new ConcreteProductA();
  } else if (type === 'B') {
    return new ConcreteProductB();
  }

  return null;
}
