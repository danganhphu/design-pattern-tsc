# Decorator

## Khái Niệm

Trong lập trình, việc mở rộng chức năng của một hệ thống mà không làm rối loạn cấu trúc hiện có là một thách thức đáng kể. **Decorator Pattern**, một trong những mẫu thiết kế cấu trúc quan trọng, xuất hiện như một giải pháp linh hoạt cho vấn đề này. Pattern này cho phép chúng ta "trang trí" thêm hành vi cho đối tượng mà không cần thay đổi cấu trúc nội tại của chúng, hỗ trợ mở rộng chức năng mà vẫn tuân thủ nguyên tắc đóng mở (Open/Closed Principle).

### Tổng quan

- **Định Nghĩa của Pattern**: Decorator Pattern cho phép thêm các tính năng mới cho một đối tượng thông qua một lớp trang trí, mà không cần sửa đổi lớp đó.

- **Mục Đích**: Mẫu thiết kế này hữu ích khi cần mở rộng chức năng đối tượng mà không ảnh hưởng đến các đối tượng khác.

- **Ý Tưởng Cốt Lõi**: Bằng cách sử dụng thành phần (composition), Decorator Pattern thêm "vỏ bọc" cho đối tượng cơ bản, cung cấp hành vi thêm vào và có thể thay đổi tại runtime.

## Đặt Vấn Đề

Hãy tưởng tượng bạn có một lớp Notifier, chuyên trách gửi thông báo qua email. Khi người dùng muốn thêm tính năng thông báo qua SMS, Facebook, và thậm chí là Slack, việc tiếp tục tạo thêm và kế thừa từ lớp Notifier ban đầu dường như là một giải pháp đơn giản.

```mermaid
classDiagram
    class Notifier {
        +sendMail()
    }

    class SMSNotifier {
        +sendSMS()
    }

    class FacebookNotifier {
        +sendFacebookMessage()
    }

    class SlackNotifier {
        +sendSlackMessage()
    }

    Notifier <|-- SMSNotifier
    Notifier <|-- FacebookNotifier
    Notifier <|-- SlackNotifier
```

Tuy nhiên, khi nhu cầu thông báo trở nên đa dạng và phức tạp hơn, việc quản lý số lượng lớn các lớp con trở nên khó khăn và không hiệu quả. Đặc biệt là khi người dùng cần kết hợp nhiều hình thức thông báo cùng một lúc, cấu trúc mã nguồn có thể trở nên cồng kềnh và khó bảo trì.

```mermaid
classDiagram
    class Notifier {
        +send()
    }

    class MailNotifier {
        +send()
    }

    class SMSNotifier {
        +send()
    }

    class FacebookNotifier {
        +send()
    }

    class SlackNotifier {
        +send()
    }

    class SMSFacebookNotifier {
        +send()
    }

    class SMSSlackNotifier {
        +send()
    }

    class FacebookSlackNotifier {
        +send()
    }

    class SMSFacebookSlackNotifier {
        +send()
    }

    Notifier <|-- MailNotifier
    Notifier <|-- SMSNotifier
    Notifier <|-- FacebookNotifier
    Notifier <|-- SlackNotifier
    Notifier <|-- SMSFacebookNotifier
    Notifier <|-- SMSSlackNotifier
    Notifier <|-- FacebookSlackNotifier
    Notifier <|-- SMSFacebookSlackNotifier
```

Đây là lúc mà Decorator Pattern trở nên quan trọng và thiết thực. Pattern này cho phép chúng ta "trang trí" các đối tượng với các chức năng mới mà không cần phải thay đổi cấu trúc nội tại của chúng, mang lại sự linh hoạt và dễ dàng mở rộng mà không làm ảnh hưởng đến các thành phần khác trong hệ thống.

## Giải pháp

Để giải quyết vấn đề mở rộng chức năng một cách hiệu quả, Decorator Pattern cung cấp một giải pháp linh hoạt. Thay vì tạo ra một loạt các lớp con, mỗi lớp với một chức năng cụ thể, chúng ta có thể sử dụng mô hình "trang trí" này để bổ sung chức năng mới.

Xét về trường hợp thêm chức năng SMS, Decorator Pattern cho phép chúng ta "bọc" đối tượng `Notifier` ban đầu trong một lớp `NotifierDecorator`, sau đó thêm một lớp `SMSDecorator` bổ sung chức năng gửi SMS. `SMSDecorator` sẽ không thay thế lớp `Notifier` gốc mà là mở rộng chức năng của nó. Khi phương thức `send()` được gọi trên `SMSDecorator`, nó sẽ thực hiện cả hành động gửi email thông qua `Notifier` gốc cùng với việc gửi tin nhắn SMS mới được thêm vào.

```mermaid
classDiagram
    class Notifier {
        +send()
    }

    class NotifierDecorator {
        -wrappedNotifier Notifier
        +send()
    }

    class SMSDecorator {
        -wrappedNotifier NotifierDecorator
        +send()
    }

    Notifier <|-- NotifierDecorator : Decorates
    NotifierDecorator <|-- SMSDecorator : Decorates
```

Mô hình này không chỉ đơn giản hóa quá trình quản lý mã nguồn bằng cách giảm thiểu số lượng lớp cần phải xử lý, mà còn cung cấp sự linh hoạt để dễ dàng thêm hoặc bớt các "vỏ bọc" mà không ảnh hưởng tới hệ thống hiện có.

Hãy xem xét một ví dụ cụ thể về việc áp dụng Decorator Pattern:

```typescript
// Interface chung cho tất cả các thông báo
interface Notifier {
    send(message: string): void;
}

// Lớp cơ bản thực hiện việc gửi thông báo qua email
class EmailNotifier implements Notifier {
    public send(message: string): void {
        console.log(`Sending email with message: ${message}`);
    }
}

// Decorator cơ bản
abstract class NotifierDecorator implements Notifier {
    protected wrappedNotifier: Notifier;

    constructor(notifier: Notifier) {
        this.wrappedNotifier = notifier;
    }

    public send(message: string): void {
        this.wrappedNotifier.send(message);
    }
}

// Thêm chức năng gửi SMS vào thông báo
class SMSDecorator extends NotifierDecorator {
    constructor(notifier: Notifier) {
        super(notifier);
    }

    public send(message: string): void {
        super.send(message); // Send email
        console.log(`Sending SMS with message: ${message}`);
    }
}
```

Trong ví dụ trên, chúng ta tạo ra một `SMSDecorator` mới từ `EmailNotifier` và bổ sung chức năng gửi tin nhắn SMS. Khi một thông báo cần được gửi, `SMSDecorator` sẽ gọi cả hai phương thức `send()` - từ `EmailNotifier` và từ mã SMS được thêm vào. Như vậy, Decorator Pattern không chỉ giải quyết vấn đề mở rộng mà còn giữ cho cấu trúc mã nguồn gọn gàng và dễ quản lý.

Sự linh hoạt mà Decorator Pattern cung cấp là một trong những lợi ích chính của nó. Bạn không chỉ có thể thêm các chức năng mới một cách dễ dàng mà còn có thể xóa bỏ hoặc thay thế chúng mà không cần phải sửa đổi các lớp đã tồn tại. Điều này làm giảm đáng kể nguy cơ phá vỡ hệ thống hiện tại khi mở rộng hoặc cập nhật chức năng.

Tuy nhiên, việc áp dụng Decorator Pattern cũng đòi hỏi phải cân nhắc một cách cẩn thận. Mỗi "vỏ bọc" mới thêm vào có thể làm tăng độ phức tạp của quá trình debug và theo dõi mã nguồn, đặc biệt là khi có nhiều lớp trang trí được áp dụng cùng một lúc. Đồng thời, cần phải đảm bảo rằng mọi thành viên trong đội ngũ phát triển đều hiểu rõ về pattern này để có thể sử dụng nó một cách hiệu quả.

### Cấu Trúc Decorator Pattern

```mermaid
classDiagram
  class Component {
    +operation()
  }

  class ConcreteComponent {
    +operation()
  }

  class Decorator {
    -component : Component
    +operation()
  }

  class ConcreteDecoratorA {
    +operation()
  }

  class ConcreteDecoratorB {
    +operation()
  }

  Component <|.. ConcreteComponent
  Component <|.. Decorator
  Decorator <|-- ConcreteDecoratorA
  Decorator <|-- ConcreteDecoratorB
  Decorator "1" *-- "1" Component : contains
```

1. **Component**: Đây là interface chung cho tất cả đối tượng, cả cơ bản và trang trí, trong mẫu này. Nó quy định các phương thức chung cần có.

2. **ConcreteComponent**: Đây là lớp triển khai interface `Component`. Nó định nghĩa một đối tượng cơ bản có thể có chức năng được "trang trí" bởi Decorators.

3. **Decorator**: Lớp trung gian này nắm giữ một tham chiếu đến một đối tượng `Component` và cung cấp giao diện tương tự như `Component`. Mục đích của nó là để kế thừa từ lớp `Component` và mở rộng chức năng của nó.

4. **ConcreteDecorator**: Những lớp này thực hiện việc trang trí cụ thể. Mỗi `ConcreteDecorator` thêm các chức năng hoặc trách nhiệm mới cho `Component` mà nó trang trí.

Các thành phần này tương tác với nhau như sau: `ConcreteComponent` là đối tượng cơ bản được trang trí. `Decorator` chứa một tham chiếu đến `Component` và định nghĩa giao diện phù hợp với `Component`. `ConcreteDecorator` thực hiện các phương thức của `Decorator` và thêm chức năng mới. Khi một phương thức trong `Decorator` được gọi, nó chuyển tiếp yêu cầu đến đối tượng `Component` mà nó trang trí, có thể thực hiện thêm các hành động trước hoặc sau khi chuyển tiếp yêu cầu.

Cấu trúc này giúp tạo ra các đối tượng với chức năng mở rộng một cách linh hoạt, mà không làm thay đổi cấu trúc nội tại hoặc mã nguồn của đối tượng gốc.


### Ví dụ Áp Dụng Decorator Pattern

Hãy xem xét một ví dụ khác về Decorator Pattern, lần này trong một ngữ cảnh khác: một ứng dụng quản lý cà phê. Trong ví dụ này, chúng ta có một lớp cơ bản `Coffee` cùng với một số lớp trang trí (decorators) như `MilkDecorator`, `SugarDecorator`, và `WhipDecorator` để thêm các thành phần khác nhau vào cà phê.

Cấu trúc cơ bản của `Coffee` được xác định như sau:

```typescript
interface Coffee {
    getDescription(): string;
    getCost(): number;
}

class SimpleCoffee implements Coffee {
    public getDescription(): string {
        return "Simple Coffee";
    }

    public getCost(): number {
        return 2.0;
    }
}
```

Chúng ta tiếp tục với việc tạo các lớp trang trí:

```typescript
abstract class CoffeeDecorator implements Coffee {
    protected decoratedCoffee: Coffee;

    constructor(coffee: Coffee) {
        this.decoratedCoffee = coffee;
    }

    public getDescription(): string {
        return this.decoratedCoffee.getDescription();
    }

    public getCost(): number {
        return this.decoratedCoffee.getCost();
    }
}

class MilkDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    public getDescription(): string {
        return super.getDescription() + ", Milk";
    }

    public getCost(): number {
        return super.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    public getDescription(): string {
        return super.getDescription() + ", Sugar";
    }

    public getCost(): number {
        return super.getCost() + 0.2;
    }
}
```

Cuối cùng, chúng ta sử dụng Decorator Pattern để tạo một ly cà phê theo yêu cầu:

```typescript
class CoffeeShop {
    public static main(): void {
        let myCoffee: Coffee = new SimpleCoffee();
        myCoffee = new MilkDecorator(myCoffee);
        myCoffee = new SugarDecorator(myCoffee);

        console.log("Description: " + myCoffee.getDescription());
        console.log("Cost: $" + myCoffee.getCost().toFixed(2));
    }
}

// Execute
CoffeeShop.main();
```

Kết quả:

```
Description: Simple Coffee, Milk, Sugar
Cost: $2.7
```

Trong ví dụ này, Decorator Pattern cho phép chúng ta thêm hoặc thay đổi chức năng của các đối tượng `Coffee` mà không cần thay đổi cấu trúc của lớp cơ bản. Điều này cung cấp sự linh hoạt tối đa trong việc tạo ra các biến thể của sản phẩm mà không phải viết lại mã nguồn hay tạo ra nhiều lớp con khác nhau.
## So sánh

### Điểm nổi bật và Điểm tương đồng

- Decorator Pattern nổi bật với khả năng mở rộng chức năng của một đối tượng mà không cần sửa đổi lớp gốc. Điều này tạo nên sự linh hoạt đáng kể so với các pattern cấu trúc khác như Singleton hay Factory, mà lại không làm thay đổi cấu trúc tổng thể của hệ thống. Decorator cho phép thêm tính năng mới một cách động mà không cần phụ thuộc vào sự kế thừa, giảm thiểu rủi ro phá vỡ OCP (Open-Closed Principle).

- Tương tự như Strategy Pattern, Decorator cũng cung cấp tính năng mở rộng, nhưng khác ở chỗ Strategy thay đổi hành vi thông qua việc truyền đối tượng chiến lược vào lớp context, trong khi Decorator thêm chức năng bằng cách "bọc" lớp gốc bằng lớp Decorator. Cả hai đều tuân theo nguyên tắc “composition over inheritance” nhưng với các mục tiêu khác nhau.

### Khi nào Áp dụng

- Decorator Pattern phù hợp nhất khi bạn cần thêm tính năng cho đối tượng một cách linh hoạt và có thể tháo rời. Nó thích hợp trong các trường hợp cần mở rộng chức năng của một lớp mà không muốn ảnh hưởng đến các đối tượng khác từ cùng một lớp. Nó cũng rất hữu ích trong việc áp dụng nguyên tắc Single Responsibility, khi mỗi Decorator chỉ thêm một chức năng cụ thể.

- Trong thực tế, khi bạn muốn thay đổi hành vi của một đối tượng tại runtime hoặc khi việc sử dụng kế thừa tạo ra một lượng lớn các lớp con không cần thiết và phức tạp, Decorator là một lựa chọn sáng suốt. Điều này làm cho nó trở nên lý tưởng trong các ứng dụng với yêu cầu cao về sự linh hoạt và mở rộng, như trong các ứng dụng giao diện người dùng hoặc khi xử lý các quy trình với nhiều biến thể.


### Kết luận

Decorator Pattern là một công cụ mạnh mẽ trong việc mở rộng chức năng của các đối tượng mà không cần thay đổi lớp gốc, giúp tuân thủ nguyên tắc Open-Closed. Nó phù hợp nhất khi cần thêm tính năng vào đối tượng một cách linh hoạt, đặc biệt trong các hệ thống mà sự mở rộng liên tục là cần thiết. Tuy nhiên, cần thận trọng để không làm dư thừa hoặc quá phức tạp hóa hệ thống bằng cách sử dụng quá nhiều decorators. Khi cân nhắc sử dụng Decorator Pattern, hãy xem xét mục tiêu cụ thể của dự án và so sánh với các pattern khác như Strategy hoặc Composite để chọn lựa phương án phù hợp nhất cho tình huống cụ thể của bạn.