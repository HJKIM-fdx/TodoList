-- 할 일 샘플 데이터 삽입
INSERT INTO todos (todoTitle, todoType, text, status, createDateTime, dueDate)
VALUES 
  ('테스트타이틀1', '공부', '테스트텍스트', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('테스트타이틀2', '공부', '테스트텍스트', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('테스트타이틀3', '공부', '테스트텍스트', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('테스트타이틀4', '공부', '테스트텍스트', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('테스트타이틀5', '공부', '테스트텍스트', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('테스트타이틀6', '공부', '테스트텍스트', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('테스트타이틀7', '공부', '테스트텍스트', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

