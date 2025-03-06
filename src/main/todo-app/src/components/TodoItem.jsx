import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const TodoItem = ({ todo, onToggle, onRemove, onUpdate }) => {
  let { todoId, todoTitle, status, todoType, dueDate, createDateTime } = todo;
  let itemClass = `todoItem ${status ? 'checked' : ''}`;

  // console.log("넘어온 todo 데이터:", todo); // ✅ todo 객체 확인
  // console.log("createDateTime: ", createDateTime); // ✅ undefined인지 확인

  // ✅ 날짜를 "M월 D일" 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    if (!dateString) return ""; 
    return dayjs(dateString).format("M/D"); 
  };

  // ✅ 상태 추가
  const [newTitle, setNewTitle] = useState(todoTitle);
  const [newTodoType, setNewTodoType] = useState(todoType);
  const [newDueDate, setNewDueDate] = useState(dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : "");
  const [newCreateDateTime, setnewCreateDateTime] = useState(createDateTime? dayjs(createDateTime).format("YYYY-MM-DD") : "");

  // ✅ 수정 버튼 클릭 시 최신 상태 반영하여 onUpdate 호출
  const handleUpdate = () => {
    const updatedTodo = {
      ...todo,
      todoTitle: newTitle,
      todoType: newTodoType,
      dueDate: newDueDate, 
      createDateTime: newCreateDateTime
    };
    onUpdate(updatedTodo);
  };

  return (
    <li className={itemClass}>
      <div className='item'>
        {/* 체크박스 */}
        <Checkbox checked={status} onChange={() => onToggle(todo)} />

        {/* 제목 입력 필드 */}
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          className="edit-input"
        />

        {/* 타입 입력 필드 */}
        <input 
          type="text" 
          value={newTodoType} 
          onChange={(e) => setNewTodoType(e.target.value)}
          className="edit-input"
        />

        {/* ✅ 시작일 입력 필드 */}
        <input 
          type="text" 
          value={formatDate(newDueDate)} // "M월 D일" 형식 표시
          onFocus={(e) => (e.target.type = "date")} // 클릭 시 date picker 표시
          onBlur={(e) => (e.target.type = "text")} // 포커스 해제 시 다시 "M월 D일" 형식
          onChange={(e) => setNewDueDate(e.target.value)}
          className="edit-input"
          disabled
        />

        {/* ✅ 마감일 입력 필드 */}
        <input 
          type="text" 
          value={formatDate(newCreateDateTime)} // "M월 D일" 형식 표시
          onFocus={(e) => (e.target.type = "date")} // 클릭 시 date picker 표시
          onBlur={(e) => (e.target.type = "text")} // 포커스 해제 시 다시 "M월 D일" 형식
          onChange={(e) => setnewCreateDateTime(e.target.value)}
          className="edit-input"
          disabled
        />
      </div>

      <div className='item btnUpDel'>
        {/* 수정 버튼 */}
        <Button 
          icon={<FormOutlined />} 
          onClick={handleUpdate}
          size="small"
        >
          수정
        </Button>

        {/* 삭제 버튼 */}
        <Button 
          icon={<DeleteOutlined />} 
          onClick={() => onRemove(todoId)}
          size="small"
        >
          삭제
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
