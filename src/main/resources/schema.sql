-- 할 일 (To-Do) 테이블 생성 스크립트
DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
  todoId INT AUTO_INCREMENT PRIMARY KEY,             -- 할 일 고유 ID
  todoTitle VARCHAR(100) NOT NULL,                   -- 할 일 제목
  todoType VARCHAR(10),                     -- 할 일 유형
  text VARCHAR(500),                                 -- 할 일 상세 내용
  status BOOLEAN DEFAULT false,                       -- 할일 완료
  createDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성 날짜
  dueDate TIMESTAMP                                  -- 마감 기한
);