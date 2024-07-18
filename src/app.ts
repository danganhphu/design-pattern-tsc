import * as readline from 'readline';
import { statePattern } from '@/State';
import { singletonPattern } from '@/Singleton';
import { factoryMethodPattern } from '@/FactoryMethod';
import { abstractFactoryPattern } from '@/AbstractFactory';
import { builderPattern } from '@/Builder';
import { prototypePattern } from '@/Prototype';
import { adapterPattern } from '@/Adapter';
import { bridgePattern } from '@/Bridge';
import { compositePattern } from '@/Composite';
import { decoratorPattern } from '@/Decorator';
import { facadePattern } from '@/Facade';
import { flyweightPattern } from '@/Flyweight';
import { proxyPattern } from '@/Proxy';
import { chainOfResponsibilityPattern } from '@/ChainOfResponsibility';

function printMenu(): void {
  const menu = `= Creational Patterns == 
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
`;

  console.log('\n');
  console.log('==== Choose one pattern to demonstrate ====');
  console.log('\n');
  console.log(menu);
}

function menu(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  printMenu();
  rl.question('Which pattern would you like to check?   ', function (answer) {
    switch (+answer) {
      case 1:
        show(singletonPattern);
        break;
      case 2:
        show(abstractFactoryPattern);
        break;
      case 3:
        show(factoryMethodPattern);
        break;
      case 4:
        show(builderPattern);
        break;
      case 5:
        show(prototypePattern);
        break;
      case 6:
        show(adapterPattern);
        break;
      case 7:
        show(bridgePattern);
        break;
      case 8:
        show(compositePattern);
        break;
      case 9:
        show(decoratorPattern);
        break;
      case 10:
        show(facadePattern);
        break;
      case 11:
        show(flyweightPattern);
        break;
      case 12:
        show(proxyPattern);
        break;
      case 13:
        show(chainOfResponsibilityPattern);
        break;
      // case 14 : show(CommandPattern); break;
      // case 15 : show(InterpreterPattern); break;
      // case 16 : show(IteratorPattern); break;
      // case 17 : show(MediatorPattern); break;
      // case 18 : show(MementoPattern); break;
      // case 19 : show(ObserverPattern); break;
      case 20:
        show(statePattern);
        break;
      // case 21 : show(StrategyPattern); break;
      // case 22 : show(TemplateMethodPattern); break;
      // case 23 : show(VisitorPattern); break;
      default:
        break;
    }
    rl.close();
  });
}

function show(patternShowFunction: () => void): void {
  patternShowFunction();
}

menu();
