export abstract class Handler {
  protected nextHandler?: Handler;
  private req: number;

  constructor(req: number) {
    this.req = req;
  }

  public setHandler(handler: Handler): void {
    this.nextHandler = handler;
  }

  public operation(msg: string, req: number): void {
    if (req <= this.req) {
      this.handleRequest(msg);
    } else if (this.nextHandler) {
      this.nextHandler.operation(msg, req);
    }
  }

  protected abstract handleRequest(msg: string): void;
}

export class ConcreteHandler1 extends Handler {
  constructor(req: number) {
    super(req);
  }

  protected handleRequest(msg: string): void {
    console.log(`Message (ConcreteHandler1) :: ${msg}`);
  }
}

export class ConcreteHandler2 extends Handler {
  constructor(req: number) {
    super(req);
  }

  protected handleRequest(msg: string): void {
    console.log(`Message (ConcreteHandler2) :: ${msg}`);
  }
}

export class ConcreteHandler3 extends Handler {
  constructor(req: number) {
    super(req);
  }

  protected handleRequest(msg: string): void {
    console.log(`Message (ConcreteHandler3) :: ${msg}`);
  }
}
