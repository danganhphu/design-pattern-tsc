import { Proxy } from './proxy';

function proxyPattern(): void {
  const proxy1 = new Proxy('proxy1');
  const proxy2 = new Proxy('proxy2');

  proxy1.doAction();
  proxy1.doAction();
  proxy2.doAction();
  proxy2.doAction();
  proxy1.doAction();
}

export default proxyPattern;
