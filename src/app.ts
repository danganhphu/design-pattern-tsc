import prompts from 'prompts';
import {
  ChainOfResponsibilityPattern,
  CommandPattern,
  InterpreterPattern,
  IteratorPattern,
  MediatorPattern,
  MementoPattern,
  ObserverPattern,
  StatePattern,
  StrategyPattern,
  TemplateMethodPattern,
  VisitorPattern
} from '@/BehavioralPatterns';
import {
  AbstractFactoryPattern,
  BuilderPattern,
  FactoryMethodPattern,
  PrototypePattern,
  SingletonPattern
} from '@/CreationalPatterns';
import {
  AdapterPattern,
  BridgePattern,
  CompositePattern,
  DecoratorPattern,
  FacadePattern,
  FlyweightPattern,
  ProxyPattern
} from '@/StructuralPatterns';

type PatternFunction = () => void;

const patterns: Record<number, PatternFunction> = {
  1: SingletonPattern,
  2: AbstractFactoryPattern,
  3: FactoryMethodPattern,
  4: BuilderPattern,
  5: PrototypePattern,
  6: AdapterPattern,
  7: BridgePattern,
  8: CompositePattern,
  9: DecoratorPattern,
  10: FacadePattern,
  11: FlyweightPattern,
  12: ProxyPattern,
  13: ChainOfResponsibilityPattern,
  14: CommandPattern,
  15: InterpreterPattern,
  16: IteratorPattern,
  17: MediatorPattern,
  18: MementoPattern,
  19: ObserverPattern,
  20: StatePattern,
  21: StrategyPattern,
  22: TemplateMethodPattern,
  23: VisitorPattern
};

async function mainMenu() {
  const menu = `
= Creational Patterns == 
  1: Singleton 
  2: Abstract factory 
  3: Factory method 
  4: Builder 
  5: Prototype 

= Structural Patterns == 
  6: Adapter 
  7: Bridge 
  8: Composite 
  9: Decorator 
 10: Facade 
 11: Flyweight 
 12: Proxy 

= Behavioral Patterns == 
 13: Chain of responsibility 
 14: Command 
 15: Interpreter 
 16: Iterator 
 17: Mediator 
 18: Memento 
 19: Observer 
 20: State 
 21: Strategy 
 22: Template method 
 23: Visitor 

Press 'q' to exit.
`;

  console.log('\n==== Choose one pattern to demonstrate ====\n');
  console.log(menu);

  while (true) {
    const response: { choice: string } = await prompts({
      type: 'text',
      name: 'choice',
      message: "Which pattern would you like to check? (or press 'q' to exit)"
    });

    const choice = response.choice.trim().toLowerCase();
    if (choice === 'q') {
      console.log('Exiting...');
      process.exit(0);
    }

    const patternNumber = parseInt(choice, 10);
    if (patterns[patternNumber]) {
      patterns[patternNumber]();
      console.log();
      const continueResponse: { continue: string } = await prompts({
        type: 'text',
        name: 'continue',
        message: 'Press Y (yes) to continue or any other key to exit'
      });

      if (continueResponse.continue.trim().toLowerCase() !== 'y') {
        console.log('Exiting...');
        process.exit(0);
      }
    } else {
      console.log('Invalid choice, please select a valid pattern number.');
      console.log(menu);
    }
  }
}

mainMenu();
