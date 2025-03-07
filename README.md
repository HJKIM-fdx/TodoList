# 할 일 관리 앱  (날씨 체크 & 알림 리마인드)

## 1. 프로젝트 소개
캘린더와 To-do List를 이용하여 할 일 관리를 할 수 있는 웹 어플리케이션입니다. 할 일 CRUD 기능과 더불어 추가적인 기능으로,

1. 현재 날씨 조회 기능 
2. 마감일 지난 경우, 브라우저 알림 기능
   
을 구현하였습니다.


## 2. 소스 실행 사전 준비 작업

### 1. 사전 설치 작업
아래와 같은 프로그램이 설치되어야 합니다.
1. Java 17
2. Node.js
3. Gradle
4. Visual Studio code (Spring boot, Java, React, Rest API Client 확장프로그램 설치)
5. MYSql
6. Debeaver (MYSql 데이터베이스 확인용, 필요 시 설치)
7. DB생성 : (DataBase 명 : Clush / 테이블 명 : todos / 포트 : 3306) 으로 생성했습니다.

### 2. Debeaver에 MYSql DDL Script 실행
```sql
use Clush;
DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
  todoId INT AUTO_INCREMENT PRIMARY KEY,             -- 할 일 고유 ID
  todoTitle VARCHAR(100),                            -- 할 일 제목
  todoType VARCHAR(10),                              -- 할 일 유형
  status BOOLEAN DEFAULT FALSE,                      -- 할 일 완료 여부
  createDateTime TIMESTAMP NULL,                     -- 생성 날짜
  dueDate TIMESTAMP NULL                             -- 마감 기한
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3. Debeaver에 MYSql 기초 데이터 DML Script 실행 (필요 시)

```sql
INSERT INTO todos (todoTitle, todoType, status, createDateTime, dueDate)
VALUES 
('정보처리기사 필기', '시험', 1, '2025-03-02 10:48:10', '2025-03-02 09:00:00'),
('캘린더 앱을 개발', '개발', 1, '2025-03-03 10:48:10', '2025-03-07 09:00:00'),
('치과 예약', '기타', 0, '2025-03-24 10:48:10', '2025-03-24 09:00:00'),
('리액트 강의 수강', '공부', 0, '2025-03-04 10:48:10', '2025-03-05 09:00:00');
```

### 4. DB 정보 추가 (application-local.db.properties)
```
spring.datasource.url=jdbc:mysql://localhost:3306/Clush
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### 5. 백앤드 실행
1. 깃허브에서 프로젝트 파일 다운로드
```
git clone https://github.com/HJKIM-fdx/TodoList.git
cd TodoList/app
```

2. Gradle 빌드
```./gradle clean build```

3. jar 실행
```
cd .\build\libs\
java -jar .\app-0.0.1-SNAPSHOT.jar
```

4. 브라우저로 헬스체크 api 실행
```
http://localhost:8081/api/healthcheck
```

### 5-1. 백앤드 API 테스트 케이스
[API 백앤드 테스트시나리오.xlsx](https://github.com/user-attachments/files/19120099/API.xlsx)


