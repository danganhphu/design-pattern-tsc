# Iterator

## Khái Niệm

**Iterator**, trong lĩnh vực phát triển phần mềm, là một mẫu thiết kế hành vi. Nó cho phép bạn duyệt qua các phần tử của một bộ sưu tập (collection) mà không cần quan tâm tới cấu trúc cụ thể của nó, như danh sách (list), ngăn xếp (stack), cây (tree), v.v. Iterator tạo ra một giao diện thống nhất cho việc truy cập và duyệt qua các phần tử, giúp tách rời cách các bộ sưu tập được cấu trúc từ logic duyệt qua chúng.

### Tổng quan

- **Định Nghĩa của Pattern:** Iterator Pattern cung cấp một cách để truy cập tuần tự các phần tử của một bộ sưu tập mà không cần phải hiểu rõ về cấu trúc nội bộ của nó. Điều này được thực hiện thông qua việc sử dụng một đối tượng gọi là 'Iterator' có chức năng duyệt qua và truy cập các phần tử.

- **Mục Đích:** Mục đích chính của Iterator Pattern là giảm sự phụ thuộc trực tiếp giữa các algorithim duyệt và cấu trúc dữ liệu của các bộ sưu tập. Điều này giúp tăng tính mô-đun và khả năng tái sử dụng code, đồng thời cung cấp một cách tiếp cận thống nhất cho việc duyệt dữ liệu.

- **Ý Tưởng Cốt Lõi:** Trong Iterator Pattern, 'Iterator' là trung tâm, nó cung cấp một interface cho việc duyệt qua một bộ sưu tập. Điều này bao gồm khả năng truy cập tuần tự từ phần tử này sang phần tử khác mà không cần can thiệp vào cấu trúc nội bộ hoặc loại bỏ sự phức tạp trong việc duyệt qua các cấu trúc dữ liệu khác nhau.

## Đặt vấn đề

```mermaid
graph TD
    A[Collections] -->|Dạng Đơn Giản| B[List]
    A -->|Dạng Phức Tạp| C[Phức Tạp]
    C -->|Stacks| D[Stack]
    C -->|Trees| E[Tree]
    C -->|Graphs| F[Graph]
    E -->|Duyệt Chiều Sâu| G[Depth-First]
```

`Collections` là một kiểu dữ liệu phổ biến nhất trong lập trình. Tuy nhiên, `Collection` chỉ là một cấu trúc dữ liệu nhóm các đối tượng lại với nhau.

Hầu hết `collections` lưu trữ các phần tử của chúng một cách đơn giản. Tuy nhiên, có một số `collection` có cách lưu trữ phức tạp như stacks, trees, graphs và các cấu trúc dữ liệu khác.

Dù thế nào, `collections` cần cung cấp các phương thức để truy vấn đến các phần tử mà chúng lưu trữ. Phải có cách nào đó để duyệt qua các phần tử mà không cần phải truy cập lại các phần tử đã truy cập.

Có vẻ đơn giản nếu `collection` là dạng list. Việc duyệt qua các phần tử dễ dàng, chỉ cần sử dụng một vòng lặp for. Nhưng nếu là `collection` dạng phức tạp hơn thì sao? Chẳng hạn như dạng cây, ban đầu bạn phải duyệt theo chiều sâu (depth-first), nhưng sau đó có thể cần duyệt theo chiều rộng (breadth-first). Và một tháng sau, bạn có thể cần truy vấn đến phần tử ngẫu nhiên. Điều này không hề đơn giản chút nào.

## Giải pháp

```mermaid
classDiagram
    class Iterator {
        <<interface>>
        +next() item
        +hasNext() bool
        +currentItem() item
    }

    class Collection {
        <<interface>>
        +createIterator() Iterator
    }

    class ConcreteCollection {
        -items[]
        +createIterator() Iterator
    }

    class ConcreteIterator {
        -collection
        -currentIndex
        +next() item
        +hasNext() bool
        +currentItem() item
    }

    Collection <|-- ConcreteCollection
    Iterator <|-- ConcreteIterator
    ConcreteIterator "1" -- "*" ConcreteCollection: navigates > 
```

Giải pháp cho thách thức này chính là áp dụng mẫu thiết kế `Iterator`. Mẫu thiết kế này giúp tách biệt hoàn toàn hành vi duyệt qua các phần tử của `collection` ra khỏi cấu trúc của `collection` đó. Điều này được thực hiện thông qua việc tạo ra một đối tượng riêng biệt, gọi là `iterator`.

Một `iterator` không chỉ thực thi thuật toán duyệt qua các phần tử, mà còn đóng gói chi tiết về quá trình duyệt. Điều này bao gồm việc theo dõi vị trí hiện tại trong `collection` và xác định xem còn bao nhiêu phần tử nữa trước khi hoàn thành quá trình duyệt.

Ngoài ra, việc sử dụng `iterator` cung cấp một giao diện thống nhất cho việc duyệt qua các loại `collections` khác nhau, dù đó là list đơn giản hay cấu trúc phức tạp hơn như trees hay graphs. Điều này đồng nghĩa với việc code của chúng ta trở nên linh hoạt hơn, dễ dàng thích ứng với nhu cầu thay đổi của việc duyệt và truy cập các phần tử trong `collections`.

Một lợi ích khác của việc sử dụng mẫu thiết kế `Iterator` là nó giúp giảm thiểu sự phụ thuộc giữa các `collections` và thuật toán sử dụng để duyệt chúng. Điều này không chỉ giúp code trở nên sạch sẽ hơn mà còn dễ dàng bảo trì và mở rộng trong tương lai.

## Cấu Trúc

```mermaid
classDiagram
    class Iterator {
        <<interface>>
        +next() : Element
        +hasNext() : boolean
    }

    class ConcreteIteratorA {
        -currentIndex : int
        +next() : Element
        +hasNext() : boolean
    }
    
    class ConcreteIteratorB {
        -currentIndex : int
        +next() : Element
        +hasNext() : boolean
    }

    class IterableCollection {
        <<interface>>
        +createIterator() : Iterator
    }

    class ConcreteCollectionA {
        +createIterator() : Iterator
    }

    class ConcreteCollectionB {
        +createIterator() : Iterator
    }

    class Client {
        -iterator : Iterator
    }

    Iterator <|.. ConcreteIteratorA
    Iterator <|.. ConcreteIteratorB
    IterableCollection <|.. ConcreteCollectionA
    IterableCollection <|.. ConcreteCollectionB
    ConcreteCollectionA ..> ConcreteIteratorA : creates
    ConcreteCollectionB ..> ConcreteIteratorB : creates
    Client --> Iterator : uses
```

- **Iterator** : là một interface hoặc abstract class khai báo các hoạt động cần thiết để duyệt qua các phần tử.
- **Concrete Iterators** : cài đặt các phương thức của Iterator, giữ index khi duyệt qua các phần tử.
- **Iterable Collection** : là một interface tạo ra một hoặc nhiều phương thức cho để lấy `interators` tương thích với `Collection`.
- **Concrete Collections** : cài đặt các phương thức Iterable Collection, nó cái đặt interface tạo Iterator trả về một Concrete Iterators thích hợp.
- **Client** : Đối tượng sử dụng Iterator Pattern.

## Ví dụ áp dụng Iterator Collection

Ví dụ này minh họa một mô hình thiết kế Iterator được áp dụng trong một bộ sưu tập các đối tượng `Item`. Mô hình này bao gồm các lớp và giao diện sau:

1. **Item**: Lớp này định nghĩa đối tượng `Item` với hai thuộc tính: `name` và `age`. Phương thức `toString()` được ghi đè để trả về thông tin của đối tượng `Item`.

2. **ItemIterator**: Đây là một giao diện định nghĩa hai phương thức cơ bản của iterator: `hasNext()` (kiểm tra xem còn phần tử tiếp theo hay không) và `next()` (trả về phần tử tiếp theo).

3. **IterableCollection**: Đây là một giao diện định nghĩa các phương thức cho một bộ sưu tập có thể duyệt. Nó bao gồm phương thức `addItem()` để thêm một phần tử vào bộ sưu tập và `iterator()` để trả về một iterator cho bộ sưu tập.

4. **MenuCollection**: Lớp này triển khai giao diện `IterableCollection`. Nó sử dụng một `List` để lưu trữ các phần tử và triển khai một lớp nội bộ `MenuItemIterator` để cung cấp chức năng iterator.

5. **demo**: Lớp này chứa phương thức `main`, nơi tạo một thực thể của `MenuCollection`, thêm các phần tử vào nó, và sau đó sử dụng iterator để duyệt qua các phần tử.

### Sơ đồ Mermaid

```mermaid
classDiagram
    class Item {
      -String name
      -int age
      +toString() String
    }

    class ItemIterator~T~ {
      +hasNext() Boolean
      +next() T
    }

    class IterableCollection~T~ {
      +addItem(T)
      +iterator() ItemIterator
    }

    class MenuCollection~T~ {
      -List menuItem
      +addItem(Object)
      +iterator() ItemIterator
    }

    class MenuItemIterator {
        -int currentIndex
        +hasNext() Boolean
        +next() T
    }

    class demo {
      +main(args String[])
    }

    ItemIterator <|-- MenuItemIterator
    IterableCollection <|-- MenuCollection
    ItemIterator <|.. MenuCollection
    demo -- MenuCollection
    MenuCollection "1" *-- "many" Item : contains
```

Item.ts

```typescript
class Item {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    toString(): string {
        return `Item{name='${this.name}', age=${this.age}}`;
    }
}
```

ItemIterator.ts

```typescript
interface ItemIterator<T> {
    hasNext(): boolean;
    next(): T;
}
```

IterableCollection.ts

```typescript
interface IterableCollection<T> {
    addItem(temp: T): void;
    iterator(): ItemIterator<T>;
}
```

MenuCollection.ts

```typescript
class MenuCollection<T> implements IterableCollection<T> {
    private menuItem: T[] = [];

    constructor(menuItem: T[] = []) {
        this.menuItem = menuItem;
    }

    addItem(temp: T): void {
        this.menuItem.push(temp);
    }

    iterator(): ItemIterator<T> {
        return new MenuItemIterator(this.menuItem);
    }
}

class MenuItemIterator<T> implements ItemIterator<T> {
    private menuItem: T[];
    private currentIndex: number = 0;

    constructor(menuItem: T[]) {
        this.menuItem = menuItem;
    }

    hasNext(): boolean {
        return this.currentIndex < this.menuItem.length;
    }

    next(): T {
        return this.menuItem[this.currentIndex++];
    }
}
```

demo.ts

```typescript
const list: Item[] = [
    new Item('Phu', 18),
    new Item('Nhu', 19),
    new Item('Thoa', 20),
    new Item('Truc', 21)
];

const collection: IterableCollection<Item> = new MenuCollection(list);
collection.addItem(new Item('Nick', 10));
collection.addItem(new Item('Tick', 20));

const itemIterator = collection.iterator();

while (itemIterator.hasNext()) {
    const item: Item = itemIterator.next();
    console.log(item.toString());
}
```

## Khi nào nên sử dụng Iterator

Iterator là một công cụ hữu ích trong lập trình, đặc biệt là khi bạn đối mặt với các tình huống sau:

1. **Khi Cấu Trúc Dữ Liệu Phức Tạp:** Sử dụng Iterator khi bạn có một bộ sưu tập (collection) với cấu trúc phức tạp. Iterator giúp bạn duyệt qua các phần tử mà không cần phải lo lắng về cách chúng được tổ chức bên trong.

2. **Bảo Mật Thông Tin Cấu Trúc:** Khi bạn không muốn tiết lộ chi tiết cấu trúc nội bộ của bộ sưu tập đến với người dùng (clients), Iterator là lựa chọn phù hợp. Nó cung cấp một giao diện đơn giản để tương tác với dữ liệu mà không hé lộ chi tiết phức tạp.

3. **Giảm Thiểu Mã Lặp:** Iterator giúp giảm thiểu lượng mã cần thiết để duyệt qua các phần tử. Thay vì viết các vòng lặp phức tạp, bạn có thể sử dụng các hàm của Iterator để làm việc này một cách gọn gàng và hiệu quả hơn.

