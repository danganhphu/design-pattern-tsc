# Builder

## Giới thiệu

Builder Pattern là một Creational Design Pattern cho phép xây dựng đối tượng phức tạp bằng cách sử dụng các đối tượng riêng biệt đại diện cho từng bộ phận cấu thành.

Builder Pattern tách rời quá trình khởi tạo đối tượng phức tạp khỏi các đại diện của nó. Điều này cho phép cùng một quá trình xây dựng có thể tạo ra nhiều biểu diễn khác nhau của đối tượng.

Mục đích: Builder Pattern được sử dụng để tách rời quá trình khởi tạo đối tượng phức tạp khỏi các đại diện của nó, giúp đạt được những lợi ích sau:

- Tăng tính linh hoạt trong khởi tạo đối tượng phức tạp
- Dễ dàng thay đổi cách khởi tạo đối tượng.
- Hỗ trợ tạo nhiều biểu diễn khác nhau của đối tượng.
- Đơn giản hóa việc test và debug.

Builder Pattern tách rời quá trình xây dựng đối tượng phức tạp thành nhiều bước riêng biệt. Mỗi bước tập trung vào một khía cạnh của đối tượng.

Các đại diện chỉ đơn giản lưu trữ kết quả, không cần quan tâm đến quá trình tạo ra chúng.

### Đặt vấn đề

Trong phát triển phần mềm, ta thường gặp các đối tượng phức tạp với nhiều thuộc tính và thành phần. Ví dụ một đối tượng House có thể bao gồm các thành phần như phòng khách, phòng ngủ, nhà bếp, cửa ra vào, cửa sổ, hệ thống điện, nước, và nhiều thành phần khác.

```mermaid
classDiagram

  House "1" *-- "n" Room
  Room : -name
  Room : -size

  House "1" *-- "n" Door
  Door : -width
  Door : -height
  Door : -material

  House "1" *-- "1" Kitchen
  Kitchen : -layout

  House "1" *-- "n" Window
  Window : -size
  Window : -position

  House "1" *-- "1" ElectricalSystem
  ElectricalSystem : -wiring

  House "1" *-- "1" PlumbingSystem
  PlumbingSystem : -pipes

  class House{
    +House(rooms, doors, windows, kitchen, electrical, plumbing)
  }
```

- Quá trình khởi tạo phức tạp, dễ gây nhầm lẫn với nhiều tham số truyền vào
- Các thành phần của `House` bị phụ thuộc lẫn nhau, khó thay đổi một phần mà không ảnh hưởng các thành phần khác.
- Khó tạo các biến thể khác nhau của `House` một cách linh hoạt.

Như vậy, việc xây dựng các đối tượng phức tạp cần được thiết kế cẩn thận để tránh các vấn đề trên.

### Giải quyết Vấn Đề

Builder Pattern giúp giải quyết vấn đề của việc tạo ra đối tượng phức tạp, như ví dụ sau về việc xây dựng một ngôi nhà. Thay vì tạo ngôi nhà một cách trực tiếp từng phần, chúng ta chia quá trình này thành nhiều bước riêng biệt. Mỗi bước tập trung vào việc xây dựng một khía cạnh cụ thể của ngôi nhà, chẳng hạn như cửa, cửa sổ và nhà bếp.

#### Cách hoạt động

1. **Director (Quản lý)**: Đầu tiên, chúng ta có một người quản lý, được gọi là Director. Quản lý này có nhiệm vụ chỉ đạo quá trình xây dựng ngôi nhà.

2. **Các Concrete Builder (Xây dựng cụ thể)**: Sau đó, chúng ta có các xây dựng cụ thể, ví dụ: Xây dựng Cửa, Xây dựng Cửa sổ và Xây dựng Nhà bếp. Mỗi Concrete Builder chịu trách nhiệm cho việc xây dựng một phần cụ thể của ngôi nhà.

3. **Tạo ngôi nhà**: Chúng ta kết hợp các phần đã xây dựng từ các Concrete Builder để tạo ra ngôi nhà hoàn chỉnh.

#### Ví dụ minh hoạ

Để hiểu rõ hơn, hãy xem ví dụ sau:

```mermaid
graph LR
  A[Director] --> B[Concrete Builder]
  B --> C[Build Door]
  B --> D[Build Window]
  B --> E[Build Kitchen]
  C --> F[House]
  D --> F
  E --> F
```

- Director (Quản lý) gọi Concrete Builder (Xây dựng cụ thể) để bắt đầu xây dựng ngôi nhà.

- Concrete Builder (Xây dựng cụ thể) thực hiện công việc của mình, ví dụ: xây dựng cửa, cửa sổ và nhà bếp.

- Các phần này được kết hợp lại để tạo thành ngôi nhà hoàn chỉnh.

Kết quả là, người dùng ngôi nhà không cần quan tâm đến chi tiết cụ thể của quá trình xây dựng, mà chỉ cần sử dụng ngôi nhà đã hoàn thành một cách dễ dàng.

### Cấu trúc

Builder Pattern có cấu trúc đơn giản, bao gồm các thành phần sau:

```mermaid
classDiagram
Direction TB

Builder <|-- ConcreteBuilder
Director o-- Builder
Product o-- Director

class Director {
+Construct()
}

class Builder {
+BuildPartA()
+BuildPartB() 
}

class ConcreteBuilder {
+BuildPartA()
+BuildPartB()
}

class Product {
-PartA
-PartB
}

```

- **Builder**: Định nghĩa phương thức xây dựng chung.
- **ConcreteBuilder**: Triển khai chi tiết các bước xây dựng cụ thể.
- **Director**: Sử dụng Builder để xây dựng sản phẩm.
- **Product**: Là sản phẩm được tạo ra, chứa các phần do Builder tạo.

Như vậy Builder tách rời quá trình xây dựng phức tạp thành nhiều bước đơn giản, từng bước tập trung vào một khía cạnh riêng lẻ.

## Cách triển khai

Builder Pattern có thể được triển khai theo nhiều cách khác nhau. Có một số cách triển khai phổ biến như sau:

**Định nghĩa Product**: Chúng ta bắt đầu bằng việc định nghĩa lớp `Product` để lưu trữ thông tin đối tượng cuối cùng:

```typescript
class Product {
  private partA?: string;
  private partB?: string;

  setPartA(partA: string): void {
    this.partA = partA;
  }

  setPartB(partB: string): void {
    this.partB = partB;
  }

  show(): void {
    console.log(`Product Parts: ${this.partA} and ${this.partB}`);
  }
}
```

**Định nghĩa Builder** : Sau đó, chúng ta định nghĩa lớp `Builder` với các phương thức xây dựng, nhưng với Builder, mỗi phương thức xây dựng trả về chính builder, cho phép chúng ta gọi tiếp theo một cách liền mạch:

```typescript
class Builder {
  private product: Product = new Product();

  buildPartA(partA: string): Builder {
    this.product.setPartA(partA);
    return this;
  }

  buildPartB(partB: string): Builder {
    this.product.setPartB(partB);
    return this;
  }

  getResult(): Product {
    return this.product;
  }
}
```

Bây giờ, chúng ta có thể sử dụng Builder để xây dựng sản phẩm một cách dễ đọc và gần gũi:

```typescript
const product = new Builder()
  .buildPartA('Part A')
  .buildPartB('Part B')
  .getResult();

// Display the product
product.show();
```

Giải thích

- Chúng ta đã tạo một lớp `Builder` với các phương thức xây dựng trả về chính builder. Điều này cho phép chúng ta gọi tiếp các phương thức một cách liền mạch, tạo một chuỗi dễ đọc để xây dựng sản phẩm.
- Khi sử dụng Builder, các phương thức xây dựng có thể được gọi nối tiếp trên một đối tượng builder duy nhất, giúp giảm bớt sự phức tạp trong mã nguồn và làm cho mã trở nên rõ ràng hơn.
- Cuối cùng, chúng ta gọi `getResult()` để lấy đối tượng Product đã được xây dựng và hiển thị nó.

## Ví dụ minh họa

Dưới đây là một ví dụ minh họa về Builder Pattern:

```typescript
// Đối tượng Product: Nhà
House {
  private foundation?: string;
  private walls?: string;
  private roof?: string;
  private interior?: string;

  setFoundation(foundation: string): void {
    this.foundation = foundation;
  }

  setWalls(walls: string): void {
    this.walls = walls;
  }

  setRoof(roof: string): void {
    this.roof = roof;
  }

  setInterior(interior: string): void {
    this.interior = interior;
  }

  showHouseDetails(): void {
    console.log("House Details:");
    console.log("Foundation: " + this.foundation);
    console.log("Walls: " + this.walls);
    console.log("Roof: " + this.roof);
    console.log("Interior: " + this.interior);
  }
}

interface HouseBuilder {
  buildFoundation(): void;
  buildWalls(): void;
  buildRoof(): void;
  buildInterior(): void;
  getResult(): House;
}

class ConcreteHouseBuilder implements HouseBuilder {
  private house: House = new House();

  buildFoundation(): void {
    this.house.setFoundation("Concrete Foundation");
  }

  buildWalls(): void {
    this.house.setWalls("Concrete Walls");
  }

  buildRoof(): void {
    this.house.setRoof("Concrete Roof");
  }

  buildInterior(): void {
    this.house.setInterior("Modern Interior");
  }

  getResult(): House {
    return this.house;
  }
}

// Director: HouseDirector
class HouseDirector {
  private builder: HouseBuilder;

  constructor(builder: HouseBuilder) {
    this.builder = builder;
  }

  constructHouse(): void {
    this.builder.buildFoundation();
    this.builder.buildWalls();
    this.builder.buildRoof();
    this.builder.buildInterior();
  }
}

const builder = new ConcreteHouseBuilder();

// Create a HouseDirector object and associate it with the builder
const director = new HouseDirector(builder);

// Construct the house
director.constructHouse();

// Get the result
const house = builder.getResult();

// Display the house details
house.showHouseDetails();
```

Trong ví dụ này, chúng ta sử dụng phương pháp Builder để xây dựng một đối tượng `House`, đại diện cho một ngôi nhà. Ví dụ này tách rời quá trình xây dựng ngôi nhà thành nhiều bước riêng biệt, và mỗi bước tập trung vào xây dựng một phần cụ thể của ngôi nhà.

1. **Đối tượng Product: Nhà (House)**:
- Trong ví dụ này, `House` là đối tượng mà chúng ta muốn xây dựng.
- `House` có các thuộc tính như `foundation`, `walls`, `roof`, và `interior`, đại diện cho các phần cấu trúc và nội thất của ngôi nhà.
- Chúng ta định nghĩa các phương thức `setPart` để thiết lập các phần của ngôi nhà và `showHouseDetails` để hiển thị thông tin chi tiết của ngôi nhà.

2. **Builder Interface: Builder**:
- `HouseBuilder` là một giao diện định nghĩa các phương thức để xây dựng một đối tượng `House`.
- Các phương thức trong `HouseBuilder` bao gồm `buildFoundation`, `buildWalls`, `buildRoof`, và `buildInterior`, mỗi phương thức tương ứng với việc xây dựng một phần cụ thể của ngôi nhà.
- `getResult` để lấy đối tượng `House` đã hoàn thành.

3. **Concrete Builder: ConcreteHouseBuilder**:
- `ConcreteHouseBuilder` là lớp cụ thể triển khai `HouseBuilder`.
- Các phương thức của `ConcreteHouseBuilder` được triển khai để xây dựng các phần của ngôi nhà. Ví dụ, `buildFoundation` thiết lập phần nền móng của ngôi nhà là "Concrete Foundation".
- Mỗi phương thức trả về chính đối tượng `ConcreteHouseBuilder` để cho phép chuỗi gọi phương thức (method chaining).

4. **Director: HouseDirector**:
- `HouseDirector` là lớp chịu trách nhiệm hướng dẫn quá trình xây dựng ngôi nhà.
- Nó chấp nhận một đối tượng `HouseBuilder` (ở đây là `ConcreteHouseBuilder`) thông qua hàm tạo và sẽ sử dụng nó để xây dựng ngôi nhà.
- `constructHouse` phương thức của `HouseDirector` gọi các phương thức xây dựng trên builder để xây dựng các phần khác nhau của ngôi nhà theo đúng thứ tự.

5. **Main class**:
- Trong hàm `main`, chúng ta bắt đầu bằng việc tạo một đối tượng `ConcreteHouseBuilder`.
- Sau đó, chúng ta tạo một đối tượng `HouseDirector` và kết nối nó với `ConcreteHouseBuilder`.
- Gọi `constructHouse` để bắt đầu quá trình xây dựng ngôi nhà.
- Cuối cùng, sử dụng `getResult` để nhận đối tượng `House` đã hoàn thành và gọi `showHouseDetails` để hiển thị thông tin chi tiết về ngôi nhà.

Kết quả là, chúng ta đã xây dựng một đối tượng ngôi nhà một cách dễ dàng và linh hoạt, trong đó mỗi phần của ngôi nhà được xây dựng bằng cách sử dụng Builder Pattern. Điều này giúp giảm sự phức tạp và làm cho mã nguồn trở nên rõ ràng hơn.

## So sánh

Builder Pattern có thể được so sánh với một số Design Pattern tương tự, bao gồm:

- **Factory Pattern**: Builder Pattern tập trung vào xây dựng một đối tượng phức tạp bằng cách tạo và cấu hình từng phần, trong khi Factory Pattern tập trung vào việc tạo đối tượng duy nhất và trả về nó.
- **Abstract Factory Pattern**: Cả Builder Pattern và Abstract Factory Pattern đều giúp trong việc tạo đối tượng phức tạp, nhưng Abstract Factory tạo ra một tập hợp các đối tượng có liên quan và cung cấp một giao diện chung để tạo chúng, trong khi Builder tập trung vào việc xây dựng một đối tượng duy nhất.
- **Singleton Pattern**: Singleton Pattern chỉ đảm bảo rằng một lớp chỉ có một đối tượng duy nhất và cung cấp một điểm truy cập đến nó. Builder Pattern không liên quan đến việc tạo đối tượng duy nhất mà tập trung vào việc xây dựng đối tượng phức tạp.

## Kết luận

Builder Pattern là một Design Pattern hữu ích trong những trường hợp cần xây dựng các đối tượng phức tạp. Builder Pattern giúp việc xây dựng các đối tượng phức tạp trở nên dễ dàng hơn và ít xảy ra lỗi hơn.

- Nên sử dụng Builder Pattern khi:
    - Đối tượng phức tạp có nhiều thuộc tính hoặc thành phần.
    - Cần xây dựng nhiều phiên bản khác nhau của đối tượng phức tạp.
    - Cần dễ dàng kiểm tra đối tượng phức tạp.
- Không nên sử dụng Builder Pattern khi:
    - Đối tượng phức tạp không có nhiều thuộc tính hoặc thành phần.
    - Chỉ cần xây dựng một phiên bản duy nhất của đối tượng phức tạp.
    - Không cần dễ dàng kiểm tra đối tượng phức tạp.