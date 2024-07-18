import { Builder } from './prototype';

function prototypePattern(): void {
  const builder: Builder = new Builder();
  for (let i = 1; i <= 3; i++) {
    console.log(builder.createOne(`c${i}`).toString());
  }
}

export { prototypePattern };
