import React, { useState, useEffect } from "react";
import { Checkbox, Button } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TodoItem = ({ todo, onToggle, onRemove, onUpdate }) => {
  let { todoId, todoTitle, status, todoType, dueDate, createDateTime } = todo;

  // ✅ 날짜를 "M/D" 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dayjs(dateString).format("M/D");
  };

  // ✅ 현재 날짜보다 마감일이 과거인지 확인 (할 일이 완료되지 않은 경우만)
  const isOverdue =
    !status && dueDate && dayjs(dueDate).isBefore(dayjs(), "day");

  // ✅ itemClass에 overdue 추가 (status가 0일 때만)
  let itemClass = `todoItem ${status ? "checked" : ""} ${
    isOverdue ? "overdue" : ""
  }`;

  // ✅ 상태 추가
  const [newTitle, setNewTitle] = useState(todoTitle);
  const [newTodoType, setNewTodoType] = useState(todoType);
  const [newDueDate, setNewDueDate] = useState(
    dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : ""
  );
  const [newCreateDateTime, setNewCreateDateTime] = useState(
    createDateTime ? dayjs(createDateTime).format("YYYY-MM-DD") : ""
  );

  // ✅ Notification 권한 요청 (앱 실행 시 한 번만 실행)
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ 마감일이 지났지만 status가 0일 경우에만 알람 띄우기
  useEffect(() => {
    if (isOverdue && Notification.permission === "granted") {
      new Notification("📌 Todo 마감일 경과!", {
        body: `할 일 "${todoTitle}"의 마감일이 지났습니다!`,
        icon: "/alarm-icon.png", // 아이콘 설정 가능 (옵션)
      });
    }
  }, [isOverdue, todoTitle]);

  // ✅ 수정 버튼 클릭 시 최신 상태 반영하여 onUpdate 호출
  const handleUpdate = () => {
    const updatedTodo = {
      ...todo,
      todoTitle: newTitle,
      todoType: newTodoType,
      dueDate: newDueDate,
      createDateTime: newCreateDateTime,
    };
    onUpdate(updatedTodo);
  };

  return (
    <li className={itemClass}>
      <div className="item">
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
          value={formatDate(newCreateDateTime)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          onChange={(e) => setNewCreateDateTime(e.target.value)}
          className="edit-input"
          disabled
        />

        {/* ✅ 마감일 입력 필드 */}
        <input
          type="text"
          value={formatDate(newDueDate)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="edit-input"
          disabled
        />
      </div>

      <div className="item btnUpDel">
        {/* 수정 버튼 */}
        <Button icon={<FormOutlined />} onClick={handleUpdate} size="small">
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
