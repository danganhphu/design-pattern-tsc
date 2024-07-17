import { createProduct, AbstractProduct } from './factoryMethod';

export const FactoryMethodPattern = {
  show(): void {
    const a: AbstractProduct | null = createProduct('A');
    const b: AbstractProduct | null = createProduct('B');

    console.log(a?.method() ?? 'Product A creation failed');
    console.log(b?.method() ?? 'Product B creation failed');
  }
};
