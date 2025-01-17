# Proxy Pattern

## Khái Niệm

Trong lĩnh vực phần mềm, một trong những thách thức là làm thế nào để quản lý truy cập đến các nguồn lực và dịch vụ một cách hiệu quả. Đây là nơi mà Proxy Pattern, một phương pháp thiết kế phổ biến, trở nên rất hữu ích. Nó không chỉ giúp điều chỉnh quyền truy cập mà còn cung cấp các tính năng bổ sung như khởi tạo khi cần (lazy initialization), bảo mật, và ghi nhật ký, mà không cần thay đổi đối tượng ban đầu.

### Tổng quan

- **Định Nghĩa của Pattern:** Proxy Pattern tạo ra một đại diện, hay còn gọi là 'proxy', để quản lý việc truy cập vào một đối tượng khác. Điều này giúp kiểm soát cách đối tượng này được dùng và truy cập trong hệ thống.

- **Mục Đích:** Mẫu thiết kế này rất hữu ích để kiểm soát hoặc mở rộng chức năng của một đối tượng mà không cần phải sửa đổi mã nguồn gốc của nó. Nó thường được dùng trong việc quản lý tài nguyên, cải thiện bảo mật và tăng hiệu suất.

- **Ý Tưởng Cốt Lõi:** Proxy Pattern chủ yếu là việc tạo ra một lớp trung gian, hay 'proxy', giúp quản lý truy cập một cách chặt chẽ đến đối tượng gốc. Nó không chỉ kiểm soát quyền truy cập mà còn cung cấp cơ hội để cải thiện hiệu suất và bảo mật thông qua các phương pháp như khởi tạo khi cần và kiểm soát truy cập.


## Đặt Vấn Đề

Tưởng tượng bạn đang xây dựng một hệ thống thư viện số cho việc lưu trữ và truy cập các tài liệu quan trọng. Ban đầu, hệ thống này chỉ đơn giản gồm các chức năng cơ bản như tìm kiếm tài liệu (`DocumentSearch`) và xem tài liệu (`DocumentViewer`).

```mermaid
classDiagram
    class DigitalLibrarySystem {
        +searchDocument()
        +viewDocument()
    }

    class DocumentSearch {
        +search()
    }

    class DocumentViewer {
        +view()
    }

    DigitalLibrarySystem --> DocumentSearch : uses
    DigitalLibrarySystem --> DocumentViewer : uses
```

Khi hệ thống phát triển, bạn muốn thêm vào các tính năng như kiểm soát quyền truy cập dựa trên vai trò người dùng, tải tài liệu từ các nguồn ngoại tuyến, và giám sát việc sử dụng tài liệu. Điều này dẫn đến việc phải phát triển thêm nhiều lớp và dịch vụ mới, làm tăng độ phức tạp của hệ thống.

### Khó Khăn và Vấn Đề
- **Hiệu Suất**: Tải tài liệu lớn hoặc từ nguồn ngoại tuyến có thể làm chậm hệ thống, đặc biệt khi nhiều người dùng cùng truy cập.
- **Bảo Mật**: Kiểm soát quyền truy cập và bảo vệ thông tin nhạy cảm trở nên khó khăn và phức tạp.
- **Quản Lý Tài Nguyên**: Theo dõi và giám sát việc sử dụng tài liệu đòi hỏi cơ chế phức tạp và tốn kém tài nguyên hệ thống.


```mermaid
classDiagram
    class DigitalLibrarySystem {
        +searchDocument()
        +viewDocument()
        +loadDocument()
        +checkAccess()
        +monitorUsage()
    }

    class DocumentSearch {
        +search()
    }

    class DocumentViewer {
        +view()
    }

    class DocumentLoader {
        +load()
    }

    class AccessControl {
        +checkPermission()
    }

    class UsageMonitor {
        +monitor()
    }

    DigitalLibrarySystem --> DocumentSearch : uses
    DigitalLibrarySystem --> DocumentViewer : uses
    DigitalLibrarySystem --> DocumentLoader : uses
    DigitalLibrarySystem --> AccessControl : uses
    DigitalLibrarySystem --> UsageMonitor : uses
```

Khi không sử dụng Proxy Pattern, mỗi tương tác với hệ thống - từ tìm kiếm đến xem và tải tài liệu - có thể trở nên chậm chạp và không an toàn. Việc xử lý trực tiếp mọi yêu cầu cũng làm tăng khả năng quá tải hệ thống và gặp phải các vấn đề bảo mật.

## Giải pháp

Để tối ưu hóa hệ thống thư viện số đang ngày càng phức tạp và đa năng, việc áp dụng Proxy Pattern là một giải pháp hữu hiệu. Proxy Pattern giúp kiểm soát tương tác với hệ thống, nâng cao hiệu suất, và tăng cường bảo mật. Dưới đây là cách thức triển khai Proxy Pattern:

1. **Tạo Proxy Classes**: Các lớp proxy như `DocumentLoaderProxy`, `AccessControlProxy`, và `UsageMonitorProxy` được thiết kế để kiểm soát và quản lý quyền truy cập đến các tài nguyên. Các lớp này hoạt động như trung gian, xử lý các tác vụ phức tạp và nhạy cảm.

2. **Cải Thiện Hiệu Suất và Bảo Mật**: Các lớp Proxy có thể cache dữ liệu, thực hiện xác thực, và giám sát quyền truy cập. Điều này giúp giảm thiểu tải không cần thiết và tăng tốc độ xử lý, đồng thời bảo vệ thông tin nhạy cảm.

3. **Đơn Giản Hóa Quy Trình**: Việc sử dụng Proxy giúp giảm độ phức tạp trong việc quản lý các chức năng của hệ thống, tạo điều kiện thuận lợi cho việc mở rộng và bảo trì.

Sơ đồ sau đây minh họa cách thức các Proxy được tích hợp và hoạt động trong hệ thống:

```mermaid
classDiagram
    class DigitalLibrarySystem {
        +searchDocument()
        +viewDocument()
    }

    class DocumentSearch {
        +search()
    }

    class DocumentViewer {
        +view()
    }

    class DocumentLoaderProxy {
        +load()
    }

    class AccessControlProxy {
        +checkPermission()
    }

    class UsageMonitorProxy {
        +monitor()
    }

    DigitalLibrarySystem --> DocumentSearch : uses
    DigitalLibrarySystem --> DocumentViewer : uses
    DocumentViewer --> DocumentLoaderProxy : uses
    DocumentLoaderProxy --> AccessControlProxy : uses
    AccessControlProxy --> UsageMonitorProxy : uses
```

Trong sơ đồ này, `DigitalLibrarySystem` tương tác trực tiếp với `DocumentSearch` và `DocumentViewer`. Khi cần tải và xem tài liệu, `DocumentViewer` sẽ thông qua `DocumentLoaderProxy`. Proxy này tiếp tục giao tiếp với `AccessControlProxy` để kiểm tra quyền truy cập và `UsageMonitorProxy` để theo dõi sử dụng, đảm bảo quá trình này được thực hiện một cách an toàn và hiệu quả.

## Cấu Trúc

```mermaid
classDiagram
    class Subject {
        <<interface>>
        +Request()
    }

    class RealSubject {
        +Request()
    }

    class Proxy {
        -realSubject RealSubject
        +Request()
    }

    class Client {
    }

    Subject <|.. RealSubject : implements
    Subject <|.. Proxy : implements
    Proxy --> RealSubject : references
    Client --> Subject : accesses
```

**Sơ đồ**:
- **Subject**: Đây là interface mà cả RealSubject và Proxy đều triển khai. Nó định nghĩa phương thức `Request()` cần được thực thi.
- **RealSubject**: Lớp thực sự thực hiện logic của phương thức `Request()`. Đây là lớp mà Proxy sẽ đại diện hoặc "ủy quyền".
- **Proxy**: Lớp này duy trì một tham chiếu đến đối tượng RealSubject và cũng triển khai interface Subject. Nó có thể kiểm soát hoặc bổ sung hành vi trước hoặc sau khi chuyển yêu cầu đến RealSubject.
- **Client**: Lớp này sử dụng đối tượng Subject, không biết rằng nó thực sự đang tương tác với Proxy của RealSubject.

**Tổ chức và Tương tác**:
- Trong Proxy Pattern, Client tương tác với đối tượng thông qua interface Subject, cho phép sử dụng Proxy thay thế cho RealSubject.
- Proxy nhận yêu cầu từ Client và có thể thực hiện một số tác vụ như truy cập kiểm soát, caching, hoặc lazy initialization trước hoặc sau khi chuyển yêu cầu đến RealSubject.
- Nếu Proxy quyết định chuyển tiếp yêu cầu, nó gọi phương thức `Request()` của đối tượng RealSubject.
- Sự sắp xếp này cho phép thêm lớp trung gian giữa Client và RealSubject mà không làm thay đổi hợp đồng interface, đảm bảo sự linh hoạt và khả năng mở rộng của code.

## Ví dụ áp dụng Decorator Pattern

Proxy Pattern là một pattern thuộc nhóm Structural Design Patterns, giúp cung cấp một đại lý hoặc người đại diện để kiểm soát việc truy cập vào đối tượng gốc. Trong ví dụ này, chúng ta sẽ xem xét một tình huống trong đó Proxy Pattern được sử dụng để quản lý việc tải và hiển thị video. `ProxyVideo` đóng vai trò là proxy cho `RealVideo`. Khi một client yêu cầu xem video thông qua `ProxyVideo`, nó sẽ kiểm tra xem video đã được tải hay chưa và quyết định có cần tải video đó không. Điều này giúp tiết kiệm tài nguyên bằng cách tránh tải lại video đã có sẵn.

### Sơ đồ


```mermaid
  classDiagram
      class Video {
          <<interface>>
          +showVideo()
      }
      class RealVideo {
          +url String
          +showVideo()
      }
      class ProxyVideo {
          -realVideo RealVideo
          +url String
          +showVideo()
      }
      Video <|.. RealVideo
      Video <|.. ProxyVideo
  ```

### Ví dụ Code

Video.ts

```typescript
interface Video {
    showVideo(): void;
}
```

RealVideo.ts

```typescript
class RealVideo implements Video {
    private url: string;

    constructor(url: string) {
        this.url = url;
        console.log(`Video loaded: ${this.url}`);
    }

    public showVideo(): void {
        console.log(`Video Showed: ${this.url}`);
    }
}
```

ProxyVideo.ts

```typescript
class ProxyVideo implements Video {
    private realVideo: RealVideo | null = null;
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public showVideo(): void {
        if (this.realVideo === null) {
            this.realVideo = new RealVideo(this.url);
        } else {
            console.log(`Video already exists: ${this.url}`);
        }
        this.realVideo.showVideo();
    }
}
```

main.ts

```typescript
function main(): void {
    const proxyVideo = new ProxyVideo("design-patterns.mp4");
    proxyVideo.showVideo();
    console.log();
    proxyVideo.showVideo();
}

// Execute the main function to demonstrate the pattern
main();
```

Kết quả

```
Video loaded: design-patterns.mp4
Video Showed: design-patterns.mp4

Video already exits:design-patterns.mp4
Video Showed: design-patterns.mp4
```

Dựa trên cấu trúc của phần viết về Flyweight Pattern, dưới đây là cách áp dụng tương tự cho Proxy Pattern:

## Khi nào áp dụng mẫu Proxy

Mẫu Proxy phù hợp trong các tình huống mà việc truy cập trực tiếp vào một đối tượng không phải là lựa chọn tối ưu, hoặc cần có thêm các lớp trung gian để quản lý hoặc bổ sung chức năng cho đối tượng đó. Dưới đây là một số tình huống cụ thể:

1. **Kiểm Soát Truy cập**: Khi bạn muốn kiểm soát hoặc hạn chế quyền truy cập vào một đối tượng, Proxy Pattern có thể đóng vai trò như một bức tường lửa. Điều này thường thấy trong việc quản lý quyền truy cập đối với đối tượng nhạy cảm hoặc quan trọng.

2. **Lười Biếng Tải Đối tượng (Lazy Loading)**: Đối với việc tải các đối tượng lớn hoặc tốn kém về tài nguyên, việc sử dụng Proxy Pattern giúp trì hoãn quá trình này cho đến khi thực sự cần thiết. Điều này giúp tăng hiệu suất và tiết kiệm tài nguyên.

3. **Tạo Log và Điều khiển Quyền truy cập**: Khi cần theo dõi hoặc ghi lại các hoạt động truy cập đối với một đối tượng, sử dụng Proxy giúp bạn dễ dàng thêm chức năng này mà không làm thay đổi đối tượng gốc.

4. **Tối ưu Hóa Hiệu suất và Bộ nhớ**: Trong các ứng dụng đòi hỏi tối ưu hóa về hiệu suất và bộ nhớ, như trong trường hợp các đối tượng cần tải dữ liệu từ mạng, Proxy Pattern có thể giúp giảm bớt tải trọng bằng cách cache hoặc trì hoãn việc tải dữ liệu.

5. **Chức năng Bổ sung hoặc Sửa đổi**: Khi muốn thêm hoặc sửa đổi chức năng của một đối tượng mà không làm thay đổi mã nguồn của đối tượng đó, Proxy Pattern cung cấp một cách hiệu quả để thực hiện điều này.

Proxy Pattern không nên sử dụng khi không cần quản lý, kiểm soát hoặc bổ sung chức năng cho đối tượng, hoặc khi việc thêm một lớp trung gian làm tăng độ phức tạp không cần thiết cho ứng dụng. Trong những trường hợp này, việc sử dụng trực tiếp đối tượng gốc có thể là lựa chọn tốt hơn.