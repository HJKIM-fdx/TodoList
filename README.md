# 할 일 관리 앱  (현재날씨 조회 & 마감된 할 일 알림 리마인드)
![image](https://github.com/user-attachments/assets/ecc6e483-6536-4c80-98a2-b795990f434d)


## 1. 프로젝트 소개
캘린더와 To-do List를 이용하여 할 일 관리를 할 수 있는 웹 어플리케이션입니다. 

**기본기능 CRUD**
1. 할 일 추가
2. 할 일 조회
3. 할 일 수정
4. 할 일 삭제
5. 할 일 전체 삭제


**추가기능**

[백앤드]
1. 현재 날씨 조회 API

[프론트앤드]
1. 마감일 지난 경우, 브라우저 알림 기능
   
   ![image](https://github.com/user-attachments/assets/b767437a-f021-4090-98e0-f933521a8684)

    1-1. 마감일 지난 경우, 해당 할 일 캘린더와 To-do List에 빨갛게 색상 처리

   ![image](https://github.com/user-attachments/assets/a4e800dc-584c-497a-98bd-736b508531eb)

   ![image](https://github.com/user-attachments/assets/dc085d7b-9542-4802-9939-22a6b7c03ce4)



3. 완료 버튼 클릭 시, 해당 할 일 캘린더와 To-do List에 취소선으로 표시

   ![image](https://github.com/user-attachments/assets/72b00812-25d3-4719-9bfe-24d2b21b0dc0)

   ![image](https://github.com/user-attachments/assets/fb324f97-8788-44ea-878f-30a4410508b2)



5. 날씨 조회 API로 가져온 데이터로 현재 날씨 조회 기능

   ![image](https://github.com/user-attachments/assets/6794c5a6-4cca-4264-bf6d-aa0e1dcf41ab)


7. 글자 수 제한 기능

8. 빈 값 입력 방지 기능

9. 시작일과 마감일 오입력 방지 기능 (마감일이 시작일보다 과거 날짜인 경우 추가 불가)

10. 캘린더에서 날짜 클릭 시, To-do List에 시작일에 날짜 자동 입력



## 2. 소스 실행 사전 준비 작업

### 2-1. 사전 설치 작업
아래와 같은 프로그램이 설치되어야 합니다.
1. Java 17
2. Node.js
3. Gradle
4. Visual Studio code (Spring boot, Java, React, Rest API Client 확장프로그램 설치)
5. MYSql
6. Debeaver (MYSql 데이터베이스 확인용, 필요 시 설치)
7. DB생성 : (DataBase 명 : Clush / 테이블 명 : todos / 포트 : 3306) 으로 생성했습니다.

### 2-2. Debeaver에 MYSql DDL Script 실행
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


### 2-3. Debeaver에 MYSql 기초 데이터 DML Script 실행 (필요 시)

```sql
INSERT INTO todos (todoTitle, todoType, status, createDateTime, dueDate)
VALUES 
('정보처리기사 필기', '시험', 1, '2025-03-02 10:48:10', '2025-03-02 09:00:00'),
('캘린더 앱 개발', '개발', 1, '2025-03-03 10:48:10', '2025-03-07 09:00:00'),
('토익 1회풀기', '공부', 0, '2025-03-21 10:48:10', '2025-03-22 09:00:00'),
('엔진오일 교환', '기타', 0, '2025-03-22 10:48:10', '2025-03-23 09:00:00'),
('부모님 용돈', '기타', 0, '2025-03-25 10:48:10', '2025-03-26 09:00:00'),
('리플 전부 매도', '투자', 0, '2025-03-05 10:48:10', '2025-03-06 09:00:00'),
('비트코인 전재산투자', '투자', 0, '2025-03-28 10:48:10', '2025-03-29 09:00:00'),
('치과 예약', '기타', 0, '2025-03-24 10:48:10', '2025-03-24 09:00:00'),
('박람회 참석', '기타', 0, '2025-03-17 10:48:10', '2025-03-17 09:00:00'),
('친구 모임', '기타', 0, '2025-03-18 10:48:10', '2025-03-18 09:00:00'),
('고향 내려가기', '기타', 0, '2025-03-19 10:48:10', '2025-03-19 09:00:00'),
('일본 여행 알아보기', '공부', 0, '2025-03-20 10:48:10', '2025-03-25 09:00:00'),
('리액트 강의 수강', '공부', 0, '2025-03-04 10:48:10', '2025-03-05 09:00:00');
```

### 2-4. DB 정보 추가 (application-local.db.properties)
```
spring.datasource.url=jdbc:mysql://localhost:3306/Clush
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```



# 백엔드

## 3. 백엔드 실행
1. 깃허브에서 프로젝트 파일 다운로드
```
git clone https://github.com/HJKIM-fdx/TodoList.git
cd {프로젝트 경로}/app/src/main/java/com/clush/hjkim/app
```

2. Gradle 빌드
```
./gradle clean build
```

3. jar 실행
```
cd .\build\libs\
java -jar .\app-0.0.1-SNAPSHOT.jar
```

4. 브라우저로 헬스체크 api 실행하여 접속테스트
```
http://localhost:8081/api/healthcheck
```



## 4. 백엔드 API 테스트 케이스
[API 백앤드 테스트시나리오.xlsx](https://github.com/user-attachments/files/19121271/API.xlsx)


테스트 케이스는 Visual Studio Code의 Rest Client을 사용하여 http 요청을 통해 진행하였습니다.

프로젝트 내의 api.http 로 직접 요청보낼 수 있습니다. (파일 위치 : app/api.http)



## 5. 백엔드 API 명세
Swagger URL : http://localhost:8081/swagger-ui/index.html#/

### 5-1. HealthCheck API

| HTTP Method | Endpoint      | 설명          |
|-------------|---------------|---------------|
| GET         | /healthcheck  | 서비스 상태 확인 |

---

### 5-2. Todo 관리 API

### 5-2.1 Todo 목록 조회

| HTTP Method | Endpoint | 설명                |
|-------------|----------|---------------------|
| GET         | /api/todo | 등록된 모든 Todo 목록을 조회 |

### 5-2.2 Todo 추가

| HTTP Method | Endpoint | 설명                  |
|-------------|----------|-----------------------|
| POST        | /api/todo | 새로운 Todo 항목을 추가 |

### 5-2.3 Todo 삭제

| HTTP Method | Endpoint                | 설명                                            |
|-------------|-------------------------|-------------------------------------------------|
| DELETE      | /api/todo/delete/{todoId} | 특정 Todo 항목을 삭제. <br> -1을 입력하면 전체 삭제됩니다. |

### 5-2.4 Todo 수정

| HTTP Method | Endpoint | 설명                                                 |
|-------------|----------|------------------------------------------------------|
| PUT         | /api/todo | 특정 Todo 항목을 수정. <br> -1을 입력하면 모든 Todo 항목을 완료 처리합니다. |

---

### 5-3. 날씨 조회 API

| HTTP Method | Endpoint       | 설명              |
|-------------|----------------|-------------------|
| GET         | /api/weather   | 특정 도시의 날씨를 조회 |
****

# 프론트엔드

## 6. 프론트엔드 실행
1. 패키지 설치
```
npm install
```

2. 프론트 엔드 경로 이동
```
cd {프로젝트 경로}/app/src/main/todo-app
```

3. 서버 실행
```
npm run dev
```

4. 서버 url을 Ctrl+클릭 으로 브라우저 띄우기


## 6-2. 프론트엔드 테스트 케이스
[프론트앤드 테스트시나리오_todoList.xlsx](https://github.com/user-attachments/files/19121268/_todoList.xlsx)



---
## 7. 주력으로 사용한 컴포넌트 및 주요 라이브러리
### 프론트엔드
- react: UI를 구성하기 위한 JavaScript 라이브러리
- antd: UI 컴포넌트(버튼, 카드, 캘린더 등)를 제공하는 디자인 라이브러리
- dayjs: 날짜 및 시간 처리를 위한 경량 라이브러리

- TodoContainer.jsx : 최상위 컨테이너로 헤더, 인풋, 리스트, 아이템, 푸터를 한꺼번에 관리하는 jsx 파일
  
📦 TodoContainer  // 최상위 컨테이너

 ├── 📄 TodoHeader  // 헤더

 ├── 📄 TodoInput  // 새로운 할 일 입력 필드

 ├── 📂 TodoList  // 할 일 목록을 감싸는 컨테이너

 │    ├── 📄 TodoItem  // 개별 할 일 항목 (체크박스, 삭제 버튼 포함 가능)

 │    ├── 📄 TodoItem  

 │    ├── 📄 TodoItem  

 ├── 📄 TodoFooter  // 전체 삭제, 전체 완료 기능

 
### 백엔드
- MyBatis 3.0.3 : SQL 쿼리를 xml로 작성하여 DB와 연결하기 위한 라이브러리
- H2 Database : MYSql 사용 전, 메모리 환경으로 개발 환경에서 임시 데이터베이스로 사용
- Lombok : @Getter, @Setter 사용
- MySQL Connector : MySQL DB 연결을 위해 사용
- springdoc-openapi-starter-webmvc-ui : Spring Boot에서 Swagger UI를 사용하여 API 문서를 자동 생성하고, 웹 브라우저에서 쉽게 확인할 수 있도록 도와주는 라이브러리


## 8. 프로젝트 구조
### 백엔드
![image](https://github.com/user-attachments/assets/6eda0afe-dea9-46ab-af13-9ee11d494c74)

### 프론트엔드
![image](https://github.com/user-attachments/assets/09ce6ccd-6e36-4a9a-9ecd-14f2b57b3ed5)







