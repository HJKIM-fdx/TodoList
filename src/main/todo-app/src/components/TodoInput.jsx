import React, { useState } from "react";
import { Input, Button, DatePicker, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // ✅ dayjs 임포트

const TodoInput = ({
  input,
  onInputChange,
  onSubmit,
  todoType,
  onTodoTypeChange,
  dueDate,
  onDueDateChange,
  createDateTime,
  onCreateDateTiemChange
}) => {
  const [errors, setErrors] = useState({ input: false, todoType: false, dueDate: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { input: false, todoType: false, dueDate: false };
    let isValid = true;

    if (!input.trim()) {
      newErrors.input = true;
      isValid = false;
    }
    if (!todoType.trim()) {
      newErrors.todoType = true;
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      message.error("모든 필드를 입력해주세요!");
      return;
    }

    setErrors({ input: false, todoType: false, dueDate: false });
    onSubmit(e); // 원래 onSubmit 함수 호출
  };

  return (
    <div>
      {/* 할 일 입력 폼 */}
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="할 일 입력"
          name="input"
          value={input}
          onChange={onInputChange}
          style={{ marginBottom: "10px", borderColor: errors.input ? "red" : undefined }}
        />
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="btn">
          추가
        </Button>
      </form>

      {/* 타입 입력, 마감일, 생성일을 같은 줄에 배치 (8:8:8 비율) */}
      <Row gutter={16}>
        <Col span={8}>
          <Input
            type="text"
            placeholder="타입 입력"
            name="todoType"
            value={todoType}
            onChange={onTodoTypeChange}
            style={{ marginBottom: "10px", borderColor: errors.todoType ? "red" : undefined }}
          />
        </Col>
        <Col span={8}>
          <DatePicker
            name="dueDate"
            value={dueDate ? dayjs(dueDate) : null} // ✅ 마감일 선택
            onChange={onDueDateChange}
            style={{ width: "100%", borderColor: errors.dueDate ? "red" : undefined }}
            placeholder="시작일"
          />
        </Col>
        <Col span={8}>
          <DatePicker
            name="createDateTime"
            value={createDateTime ? dayjs(createDateTime) : null} // ✅ 생성일 선택
            onChange={onCreateDateTiemChange}
            style={{ width: "100%" }}
            placeholder="마감일"
          />
        </Col>
      </Row>
    </div>
  );
};

export default TodoInput;
