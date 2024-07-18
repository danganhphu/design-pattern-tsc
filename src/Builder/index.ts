import { User, UserBuilder } from './builder';

function builderPattern(): void {
  var u: User = new UserBuilder('Jancsi').setAge(12).setPhone('0123456789').setAddress('asdf').build();
  console.log(u.Name + ' ' + u.Age + ' ' + u.Phone + ' ' + u.Address);
}

export { builderPattern };
