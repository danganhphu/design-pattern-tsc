import { Context, AbstractExpression, TerminalExpression, NonterminalExpression } from './interpreter';

function interpreterPattern(): void {
  const context: Context = new Context();
  const expressions: AbstractExpression[] = [
    new NonterminalExpression(),
    new NonterminalExpression(),
    new NonterminalExpression(),
    new TerminalExpression(),
    new NonterminalExpression(),
    new NonterminalExpression(),
    new TerminalExpression(),
    new TerminalExpression()
  ];

  expressions.forEach((expression) => expression.interpret(context));
}

export default interpreterPattern;
