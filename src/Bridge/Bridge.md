# Bridge

## Giới thiệu

### Định nghĩa Pattern

Bridge Pattern là một mẫu thiết kế thuộc loại cấu trúc. Nó giúp tách rời abstraction (lớp trừu tượng) và implementation (lớp thực thi) ra khỏi nhau, giúp cả hai có thể thay đổi và phát triển một cách độc lập, không làm ảnh hưởng đến nhau.

### Mục đích

- Tách biệt abstraction khỏi implementation để cả hai có thể thay đổi mà không ảnh hưởng đến nhau.
- Khắc phục vấn đề kết hợp giữa lớp cha và lớp con, giúp giảm sự phức tạp trong thiết kế và giúp mở rộng mã nguồn một cách linh hoạt hơn.
- Cung cấp khả năng thay thế và tái sử dụng implementation mà không cần sửa đổi code của lớp trừu tượng.

### Ý tưởng chính của Pattern

Ý tưởng chính của Bridge Pattern là sử dụng "cầu nối" giữa abstraction và implementation. Thay vì một lớp trừu tượng kiểm soát và mở rộng từ một lớp cụ thể (lớp thực thi), mẫu thiết kế này đề xuất việc tạo ra một interface (cầu nối) giữa chúng. Khi cần mở rộng chức năng, bạn có thể thêm vào phía abstraction mà không ảnh hưởng đến phía implementation và ngược lại. Nhờ có "cầu nối" này, việc thay đổi và phát triển mã nguồn trở nên linh hoạt và ít gặp rủi ro hơn.

## Đặt vấn đề

Hãy tưởng tượng bạn có một lớp `Vehicle` với hai subclass là `BicycleBike` và `MotorBike`. Bây giờ, bạn muốn mở rộng tính năng bằng cách thêm màu sắc cho mỗi loại phương tiện, và bạn tạo ra hai thuộc tính là `Red` và `Blue`. Với cách tiếp cận này, bạn sẽ phải tạo ra tổng cộng bốn lớp con như `BlueBicycleBike` và `RedMotorBike`.

```mermaid
classDiagram
    class Vehicle {
    }

    class BicycleBike {
    }
    class MotorBike {
    }

    class Red {
    }
    class Blue {
    }

    class BlueBicycleBike {
    }
    class RedBicycleBike {
    }
    class BlueMotorBike {
    }
    class RedMotorBike {
    }

    Vehicle <|-- BicycleBike
    Vehicle <|-- MotorBike

    BicycleBike <|-- BlueBicycleBike
    BicycleBike <|-- RedBicycleBike
    MotorBike <|-- BlueMotorBike
    MotorBike <|-- RedMotorBike

    Red <--o BlueBicycleBike
    Red <--o RedBicycleBike
    Blue <--o BlueMotorBike
    Blue <--o RedMotorBike

```

Khi bạn muốn thêm một loại phương tiện hoặc một màu sắc mới, bạn sẽ cần tạo thêm nhiều lớp con, làm cho hệ thống trở nên phức tạp và khó kiểm soát.

## Giải pháp

Vấn đề ở đây là chúng ta đang cố gắng tích hợp quá nhiều tính năng vào một lớp trừu tượng, trong khi mỗi tính năng đều có tiềm năng phát triển theo hướng riêng biệt.

```mermaid
classDiagram
    class Vehicle {
      +Color color
      +void manage()
    }

    class Color {
      +void bePainted()
    }

    class BicycleBike {
      +void manage()
    }

    class MotorBike {
      +void manage()
    }

    class Red {
      +void bePainted()
    }

    class Blue {
      +void bePainted()
    }

    Vehicle <|-- BicycleBike: is a
    Vehicle <|-- MotorBike: is a
    Vehicle "1" *-- "1" Color: has a
    Color <|-- Red: is a
    Color <|-- Blue: is a
```

Bridge Pattern giải quyết vấn đề này bằng cách tách biệt lớp trừu tượng (abstraction) và các đối tượng thực thi (implementation), sau đó kết nối chúng lại với nhau thông qua một "cầu" (bridge). Trong ví dụ này, một phương tiện sẽ có một thuộc tính màu sắc, tạo ra mối quan hệ "has-a" (có một) thay vì "is-a" (là một).

## Cấu Trúc

```mermaid
classDiagram
    class Abstraction {
        +Implementor implementor
        +operation() void
    }

    class Implementor {
        +operationImpl() void
    }

    class ConcreteImplementorA {
        +operationImpl() void
    }

    class ConcreteImplementorB {
        +operationImpl() void
    }

    class RefinedAbstraction {
        +operation() void
    }

    Abstraction <|-- RefinedAbstraction: is a
    Abstraction "1" *-- "1" Implementor: has a
    Implementor <|-- ConcreteImplementorA: is a
    Implementor <|-- ConcreteImplementorB: is a
```

1. **The Abstraction** (`Abstraction`): Lớp cơ sở cung cấp mức độ trừu tượng cho việc quản lý các công việc do các đối tượng cụ thể thực hiện (Implementation).
2. **The Implementation** (`Implementor`): Giao diện định nghĩa các tác vụ cần thiết cho lớp trừu tượng. Đây thường là một giao diện xác định các tác vụ cần thiết cho lớp trừu tượng.
3. **Concrete Implementations** (`ConcreteImplementor`): Các lớp này chứa logic cụ thể và thực hiện các tác vụ được định nghĩa bởi `Implementor`.
4. **Refined Abstractions** (`RefinedAbstraction`): Các lớp con của `Abstraction` thực hiện và mở rộng các phương thức được xác định trong lớp `Abstraction`.

## Cách triển khai


### Bước 1: Xác định Abstraction và Implementation

Đầu tiên, ta cần phân biệt giữa abstractions (trừu tượng) và implementations (thực thi).

```typescript
// Abstraction
abstract class Shape {
    protected color: Color;

    constructor(color: Color) {
        this.color = color;
    }

    public abstract draw(): void;
}

// Implementation
interface Color {
    applyColor(): void;
}
```

### Bước 2: Mở rộng Abstraction

Chúng ta có thể mở rộng abstraction để tạo ra các phân lớp khác nhau.

```typescript
class Circle extends Shape {
    constructor(color: Color) {
        super(color);
    }

    public draw(): void {
        console.log("Draw Circle in ");
        this.color.applyColor();
    }
}

class Square extends Shape {
    constructor(color: Color) {
        super(color);
    }

    public draw(): void {
        console.log("Draw Square in ");
        this.color.applyColor();
    }
}
```

### Bước 3: Cung cấp các Implementations cụ thể

```typescript
class RedColor implements Color {
    public applyColor(): void {
        console.log("Red color.");
    }
}

class BlueColor implements Color {
    public applyColor(): void {
        console.log("Blue color.");
    }
}
```

### Bước 4: Sử dụng Bridge Pattern

```typescript
class BridgePatternDemo {
    public static main(): void {
        const redCircle: Shape = new Circle(new RedColor());
        const blueSquare: Shape = new Square(new BlueColor());

        redCircle.draw();
        blueSquare.draw();
    }
}

// Execute the demo
BridgePatternDemo.main();
```

Khi chạy đoạn mã trên, kết quả sẽ là:
```
Draw Circle in Red color.
Draw Square in Blue color.
```

## Ví dụ áp dụng Bridge Pattern

Để hiểu rõ hơn về cách Bridge Pattern hoạt động, hãy xem xét ví dụ về một hệ thống ngân hàng cung cấp các loại tài khoản khác nhau:

**Account.ts**
```typescript
interface Account {
    openAccount(): void;
}
```

**CheckingAccount.ts**
```typescript
class CheckingAccount implements Account {
    openAccount(): void {
        console.log("Opening a Checking Account!");
    }
}
```

**TutorialAccount.ts**
```typescript
class TutorialAccount implements Account {
    openAccount(): void {
        console.log("Please select your language");
    }
}
```

**Bank.ts**
```typescript
abstract class Bank {
    protected account: Account;

    constructor(account: Account) {
        this.account = account;
    }

    public abstract openAccount(): void;
}
```

**MBBank.ts**
```typescript
class MBBank extends Bank {
    constructor(account: Account) {
        super(account);
    }

    public openAccount(): void {
        console.log("Welcome to MBBank");
        this.account.openAccount();
    }
}
```

**TPBank.ts**
```typescript
class TPBank extends Bank {
    constructor(account: Account) {
        super(account);
    }

    public openAccount(): void {
        console.log("Welcome to TPBank");
        this.account.openAccount();
    }
}
```

**demo.ts**
```typescript
class Demo {
    public static main(): void {
        const tpBank = new TPBank(new TutorialAccount());
        tpBank.openAccount();

        console.log();

        const mmBank = new MMBank(new CheckingAccount());
        mmBank.openAccount();
    }
}

// Execute the demo
Demo.main();
```

Kết quả khi chạy chương trình:

```
Welcome to TPBank
Please select your language

Welcome to MMBank
Opening a Checking Account!
```

Như bạn thấy trong ví dụ trên, `Bank` là một lớp trừu tượng kết hợp với interface `Account`. Các lớp cụ thể như `TPBank` và `MMBank` kế thừa từ lớp `Bank` và quyết định cách họ muốn mở tài khoản dựa trên loại tài khoản cụ thể (như `CheckingAccount` hoặc `TutorialAccount`). Nhờ sử dụng Bridge Pattern, chúng ta có thể mở rộng cả hai hệ thống (loại ngân hàng và loại tài khoản) một cách độc lập mà không làm ảnh hưởng đến nhau.

## So sánh

### 1. Bridge vs Adapter:

- **Bridge**: Như chúng ta đã biết, mục tiêu chính của Bridge Pattern là tách rời abstraction (trừu tượng) ra khỏi implementation (thực thi) của nó, giúp cho cả hai có thể thay đổi độc lập.
- **Adapter**: Mẫu thiết kế này cho phép các đối tượng với interfaces không tương thích có thể làm việc cùng nhau thông qua một lớp trung gian.

### 2. Bridge vs Composite:

- **Bridge**: Tách rời abstraction và implementation để chúng phát triển độc lập.
- **Composite**: Cung cấp một cách để bạn có thể làm việc với các đối tượng đơn lẻ hoặc với nhóm các đối tượng theo cùng một cách.

### 3. Bridge vs Decorator:

- **Bridge**: Phân tách interface (trừu tượng) và thực thi, cho phép chúng thay đổi độc lập.
- **Decorator**: Thêm các trách nhiệm cho đối tượng mà không cần sửa đổi chúng, giữ nguyên interface của đối tượng và thêm chức năng mở rộng.

### 4. Bridge vs Facade:

- **Bridge**: Đảm bảo tính linh hoạt giữa abstraction và implementation bằng cách tách chúng ra.
- **Facade**: Cung cấp một giao diện đơn giản hoá cho một hệ thống con, giúp giảm sự phức tạp khi giao tiếp với các hệ thống phức tạp.

### 5. Bridge vs Proxy:

- **Bridge**: Tập trung vào việc tách rời và linh hoạt giữa abstractions và implementations.
- **Proxy**: Cung cấp một đại diện cho một đối tượng khác, kiểm soát việc truy cập đến đối tượng gốc.

## Kết luận

Bridge Pattern là một mẫu thiết kế hiệu quả giúp tách rời các khía cạnh trừu tượng và thực thi của một lớp, giúp chúng có thể thay đổi và phát triển một cách độc lập. Điều này không chỉ giúp giảm thiểu sự phức tạp khi mở rộng hệ thống mà còn cung cấp khả năng linh hoạt hơn trong việc quản lý và mở rộng code.