# Memento

## Khái Niệm

**Memento Pattern**, trong lĩnh vực phát triển phần mềm, là một mẫu thiết kế hành vi. Nó được sử dụng để lưu trữ trạng thái của một đối tượng (được gọi là 'memento') mà không vi phạm tính đóng gói, cho phép đối tượng quay lại trạng thái trước đó mà không cần phụ thuộc vào các lớp khác. Memento Pattern cung cấp khả năng 'undo' hoặc 'rollback' trong các ứng dụng, mà không làm lộ chi tiết triển khai nội bộ của đối tượng.

### Tổng quan

- **Định Nghĩa của Pattern:** Memento Pattern bao gồm việc lưu trữ bản sao của trạng thái nội bộ của một đối tượng vào một đối tượng khác mà không làm lộ thông tin nội bộ. Điều này cho phép khôi phục trạng thái trước đó của đối tượng mà không vi phạm nguyên tắc đóng gói.

- **Mục Đích:** Mục đích chính của Memento Pattern là cho phép đối tượng quay lại trạng thái trước đó mà không cần phải lưu trữ thông tin nội bộ của đối tượng ra bên ngoài. Điều này giúp tăng tính bảo mật và độc lập của đối tượng, đồng thời cung cấp chức năng 'undo' mà không làm ảnh hưởng tới kiến trúc tổng thể của hệ thống.

- **Ý Tưởng Cốt Lõi:** Trong Memento Pattern, có ba thành phần chính: 'Originator' (tạo ra trạng thái để lưu), 'Memento' (lưu trữ trạng thái của 'Originator'), và 'Caretaker' (quản lý 'Memento' mà không cần biết chi tiết bên trong). 'Caretaker' yêu cầu lưu trạng thái từ 'Originator' và có thể yêu cầu 'Originator' quay lại trạng thái đã lưu trước đó, nhờ vào 'Memento'.

### Đặt vấn đề

Trong phát triển phần mềm, một vấn đề phổ biến đối với các ứng dụng cần quản lý trạng thái của đối tượng là việc lưu giữ và khôi phục các trạng thái trước đó. Xét tình huống của một trình soạn thảo văn bản: người dùng muốn có khả năng quay lại các phiên bản trước đó của tài liệu sau khi thực hiện một loạt thay đổi. Một cách tiếp cận đơn giản là lưu trữ mỗi trạng thái của tài liệu trong một cấu trúc dữ liệu riêng biệt. Tuy nhiên, cách tiếp cận này không hiệu quả về mặt bộ nhớ và có thể dẫn đến vi phạm nguyên tắc đóng gói, vì nó yêu cầu tiết lộ chi tiết nội bộ của tài liệu.

```mermaid
classDiagram
    class TextEditor {
      -currentDocumentState: DocumentState
      -previousStates: list
      +editDocument(newContent: String): void
      +undoEdit(): void
    }
    class DocumentState {
      -content: String
    }

    TextEditor "1" --o DocumentState : current state >
    TextEditor "1" -- "*" DocumentState : stores previous states >
```

### Giải quyết

Memento Pattern đưa ra một giải pháp hiệu quả cho vấn đề này. Pattern cho phép lưu giữ trạng thái của một đối tượng (còn gọi là "Originator") mà không vi phạm nguyên tắc đóng gói của nó. Điều này được thực hiện thông qua việc tạo ra một đối tượng "Memento", chứa trạng thái lưu trữ của "Originator". "Caretaker", một đối tượng khác, quản lý và lưu trữ các "Memento" mà không cần biết đến chi tiết bên trong của chúng. Khi cần khôi phục trạng thái cũ, "Originator" sẽ sử dụng đối tượng "Memento" tương ứng.

```mermaid
classDiagram
    class TextEditor {
      -documentState: String
      +setDocumentState(state: String): void
      +getDocumentState(): String
      +saveToMemento(): DocumentMemento
      +restoreFromMemento(memento: DocumentMemento): void
    }
    class DocumentMemento {
      -documentState: String
      +getDocumentState(): String
    }
    class History {
      -mementos: list
      +addMemento(memento: DocumentMemento): void
      +getMemento(index: int): DocumentMemento
    }

    TextEditor --o DocumentMemento : creates >
    History "1" -- "*" DocumentMemento : stores
```

Sử dụng Memento Pattern mang lại nhiều lợi ích. Nó giúp duy trì nguyên tắc đóng gói, vì trạng thái nội bộ của đối tượng được lưu trữ mà không cần tiết lộ thông qua giao diện công khai. Điều này cũng giúp tăng cường tính modular của ứng dụng, vì "Caretaker" có thể lưu trữ và quản lý nhiều "Memento" mà không cần biết đến logic nội bộ của "Originator". Hơn nữa, pattern này cung cấp một cách linh hoạt để lưu trữ lịch sử trạng thái của đối tượng mà không cần sao chép toàn bộ trạng thái mỗi lần.

Tuy nhiên, việc sử dụng Memento Pattern không phải không có nhược điểm. Việc lưu trữ nhiều bản sao của trạng thái đối tượng có thể chiếm dụng một lượng lớn bộ nhớ, đặc biệt là đối với các ứng dụng với trạng thái đối tượng phức tạp và lớn. Ngoài ra, việc quản lý các "Memento" có thể trở nên phức tạp, đặc biệt nếu cần hỗ trợ các hoạt động như undo/redo với nhiều cấp độ.

## Cấu trúc

```mermaid
classDiagram
    class Originator {
      -state: String
      +setState(state: String): void
      +getState(): String
      +saveToMemento(): Memento
      +restoreFromMemento(memento: Memento): void
    }
    class Memento {
      -state: String
      +getState(): String
    }
    class Caretaker {
      -mementos: list
      +addMemento(memento: Memento): void
      +getMemento(index: int): Memento
    }

    Originator --o Memento : creates >
    Caretaker "1" -- "*" Memento : stores
```


1. **Originator**: Lớp này chứa trạng thái cần được lưu trữ. Nó tạo ra một memento chứa một bản sao của trạng thái hiện tại và cũng có thể sử dụng memento để khôi phục trạng thái trước đó.

2. **Memento**: Lớp này chứa trạng thái của Originator. Nó bảo vệ thông tin trạng thái khỏi sự truy cập từ các đối tượng khác ngoại trừ Originator.

3. **Caretaker**: Lớp này quản lý memento nhưng không sửa đổi hoặc kiểm tra nội dung của memento.


## Cách triển khai

1. **Tạo Memento Class:** Đây là class sẽ chứa trạng thái của đối tượng.

```typescript
class Memento {
    private state: string;

    constructor(state: string) {
        this.state = state;
    }

    getState(): string {
        return this.state;
    }
}
```

2. **Tạo Originator Class:** Đây là class mà trạng thái của nó sẽ được lưu và khôi phục.

```typescript
class Originator {
    private state: string;

    setState(state: string): void {
        this.state = state;
    }

    getState(): string {
        return this.state;
    }

    saveStateToMemento(): Memento {
        return new Memento(this.state);
    }

    getStateFromMemento(memento: Memento): void {
        this.state = memento.getState();
    }
}
```

3. **Tạo Caretaker Class:** Đây là class sẽ chứa và quản lý Memento, nhưng không thay đổi hoặc truy cập trực tiếp vào trạng thái lưu trữ.

```typescript
class Caretaker {
    private mementoList: Memento[] = [];

    add(memento: Memento): void {
        this.mementoList.push(memento);
    }

    get(index: number): Memento {
        return this.mementoList[index];
    }
}
```

4. **Sử dụng Pattern:** Tạo các đối tượng và sử dụng Memento Pattern để lưu và khôi phục trạng thái.

```typescript
const originator: Originator = new Originator();
const caretaker: Caretaker = new Caretaker();

originator.setState('State #1');
originator.setState('State #2');
caretaker.add(originator.saveStateToMemento());

originator.setState('State #3');
caretaker.add(originator.saveStateToMemento());

originator.setState('State #4');
console.log(`Current State: ${originator.getState()}`);

originator.getStateFromMemento(caretaker.get(0));
console.log(`First saved State: ${originator.getState()}`);
originator.getStateFromMemento(caretaker.get(1));
console.log(`Second saved State: ${originator.getState()}`);
```

Trong đoạn code trên, bạn có thể thấy cách Memento Pattern được sử dụng để lưu và phục hồi trạng thái của `Originator`. `Caretaker` quản lý các trạng thái này thông qua một danh sách các `Memento`, nhưng không bao giờ tương tác trực tiếp với nội dung bên trong của chúng.

## Ví dụ

Chúng ta sẽ xem xét một ví dụ cụ thể hơn với Memento Pattern: một ứng dụng chơi game đơn giản, nơi người chơi có thể lưu và tải lại trạng thái của trò chơi.

Trong trò chơi này, người chơi có thể thám hiểm một thế giới ảo, tương tác với các đối tượng và thay đổi trạng thái của trò chơi (ví dụ: điểm số, vị trí người chơi, vật phẩm sở hữu). Người chơi có thể lưu trạng thái trò chơi vào bất kỳ thời điểm nào và sau đó tải lại trạng thái đó nếu họ muốn.

1. **Game**: Lớp đại diện cho trò chơi, lưu trữ trạng thái hiện tại như điểm số, vị trí, v.v.
2. **GameMemento**: Lưu trữ trạng thái của trò chơi. Nó không cho phép truy cập trực tiếp vào trạng thái lưu trữ.
3. **GameCaretaker**: Quản lý lịch sử các GameMemento.

```mermaid
classDiagram
    class Game {
        +String position
        +int score
        +List items
        +save() GameMemento
        +restore(memento GameMemento)
    }
    class GameMemento {
        -String position
        -int score
        -List items
        +getState() String
    }
    class GameCaretaker {
        -List history
        +add(memento GameMemento)
        +get(index int) GameMemento
    }

    Game "1" -- "1" GameMemento : creates >
    GameCaretaker "1" -- "*" GameMemento : manages >
```

#### Implement bằng Java:

```typescript
// GameMemento.ts
class GameMemento {
    private readonly position: string;
    private readonly score: number;
    private readonly items: string[];

    constructor(position: string, score: number, items: string[]) {
        this.position = position;
        this.score = score;
        this.items = [...items]; // Clone the items array
    }

    // Getters
    getPosition(): string {
        return this.position;
    }

    getScore(): number {
        return this.score;
    }

    getItems(): string[] {
        return [...this.items]; // Return a clone of the items array
    }
}

// Game
class Game {
    private position: string;
    private score: number;
    private items: string[];

    constructor() {
        this.position = '';
        this.score = 0;
        this.items = [];
    }

    setPosition(position: string): void {
        this.position = position;
    }

    setScore(score: number): void {
        this.score = score;
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    save(): GameMemento {
        return new GameMemento(this.position, this.score, this.items);
    }

    restore(memento: GameMemento): void {
        this.position = memento.getPosition();
        this.score = memento.getScore();
        this.items = memento.getItems();
    }
}

// GameCaretaker
class GameCaretaker {
    private history: GameMemento[] = [];

    add(memento: GameMemento): void {
        this.history.push(memento);
    }

    get(index: number): GameMemento {
        return this.history[index];
    }
}

// Main class to demonstrate Memento Pattern
const game = new Game();
const caretaker = new GameCaretaker();

game.setPosition('Start');
game.setScore(10);
game.addItem('Sword');
caretaker.add(game.save());

game.setPosition('Castle');
game.setScore(50);
game.addItem('Shield');

// Restore to previous saved state
game.restore(caretaker.get(0));
console.log(`Current Position: ${game.save().getPosition()}`);
console.log(`Current Score: ${game.save().getScore()}`);
```

## Khi nào nên sử dụng

1. **Khôi phục Trạng thái Trước Đó**: Khi bạn cần lưu trữ trạng thái của một đối tượng để có thể khôi phục lại trạng thái đó sau này, mà không làm lộ chi tiết triển khai bên trong của đối tượng đó.

2. **Ghi Nhật ký Thay đổi**: Trong các ứng dụng cần theo dõi lịch sử thay đổi, Memento Pattern cho phép lưu trữ trạng thái của đối tượng tại các thời điểm khác nhau.

3. **Hoàn tác/Redo Thao tác**: Được sử dụng trong các ứng dụng chỉnh sửa như trình soạn thảo văn bản, phần mềm đồ họa, nơi người dùng có thể muốn hoàn tác hoặc thực hiện lại thao tác trước đó.

4. **Snapshot của Trạng thái**: Khi cần lưu trữ bản snapshot của trạng thái hiện tại của đối tượng để so sánh hoặc phục hồi sau này mà không cần lưu trữ toàn bộ dữ liệu.

5. **Transaction-like Behavior**: Trong các hệ thống cần transaction, nơi bạn muốn thực hiện một loạt thay đổi và sau đó có khả năng commit hoặc rollback (ví dụ: cơ sở dữ liệu).

6. **Giảm Thiểu Sự Phụ thuộc**: Giúp giảm thiểu sự phụ thuộc giữa các lớp bằng cách cách ly trạng thái nội bộ của đối tượng khỏi các đối tượng khác.

7. **Tối ưu Hóa Hiệu suất**: Khi việc tính toán lại trạng thái của đối tượng là tốn kém, việc lưu các trạng thái trước đó có thể giúp tối ưu hóa hiệu suất bằng cách tái sử dụng dữ liệu đã tính toán.

8. **Bảo mật Dữ liệu**: Memento Pattern cũng có thể giúp bảo mật dữ liệu bằng cách giữ cho trạng thái nội bộ của đối tượng không bị tiếp xúc trực tiếp với các đối tượng khác.
