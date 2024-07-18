import { Adaptee, Adapter } from './adapter';

function adapterPattern(): void {
  const adaptee = new Adaptee();
  const adapter: Adapter = new Adapter(adaptee);
  adapter.call();
}

export { adapterPattern };
