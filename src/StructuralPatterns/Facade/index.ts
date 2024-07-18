import { Facade } from './facade';

function facadePattern(): void {
  const facade = new Facade();

  facade.operation1();

  facade.operation2();
}

export default facadePattern;
