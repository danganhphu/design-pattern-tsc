export class Context {
  private data: string;

  constructor(data: string = 'Default Context Data') {
    this.data = data;
  }

  public getData(): string {
    return this.data;
  }
}

export interface AbstractExpression {
  interpret(context: Context): void;
}

export class TerminalExpression implements AbstractExpression {
  public interpret(context: Context): void {
    console.log(`interpret method of TerminalExpression is being called with context: ${context.getData()}`);
  }
}

export class NonterminalExpression implements AbstractExpression {
  public interpret(context: Context): void {
    console.log(`interpret method of NonterminalExpression is being called with context: ${context.getData()}`);
  }
}
