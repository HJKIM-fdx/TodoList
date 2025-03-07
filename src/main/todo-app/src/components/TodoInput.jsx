import React, { useState } from "react";
import { Input, Button, DatePicker, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TodoInput = ({
  input,
  onInputChange,
  onSubmit,
  todoType,
  onTodoTypeChange,
  dueDate,
  onDueDateChange,
  createDateTime,
  onCreateDateTimeChange,
}) => {
  const [errors, setErrors] = useState({
    input: false,
    todoType: false,
    createDateTime: false,
  });

  const handleChange = (e, maxLength, callback) => {
    if (e.target.value.length > maxLength) {
      message.warning(`최대 ${maxLength}자까지 입력 가능합니다!`);
      return;
    }
    callback(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {
      input: false,
      todoType: false,
      createDateTime: false,
      dueDate: false,
    };
    let isValid = true;

    if (!input.trim()) {
      newErrors.input = true;
      isValid = false;
    }
    if (!todoType.trim()) {
      newErrors.todoType = true;
      isValid = false;
    }
    if (!createDateTime) {
      newErrors.createDateTime = true;
      isValid = false;
    }
    if (!dueDate) {
      newErrors.dueDate = true;
      isValid = false;
    }
    if (
      dueDate &&
      createDateTime &&
      dayjs(dueDate).isBefore(dayjs(createDateTime), "day")
    ) {
      newErrors.dueDate = true;
      isValid = false;
      message.error("마감일은 시작일보다 이전일 수 없습니다!");
      // TODO : message 기능이 작동하지 않음
    }

    if (!isValid) {
      setErrors(newErrors);
      message.error("모든 필드를 올바르게 입력해주세요!");
      return;
    }

    setErrors({
      input: false,
      todoType: false,
      createDateTime: false,
      dueDate: false,
    });
    onSubmit(e);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="할 일 입력"
          name="input"
          value={input}
          onChange={(e) => handleChange(e, 20, onInputChange)}
          maxLength={50}
          style={{
            marginBottom: "10px",
            borderColor: errors.input ? "red" : undefined,
          }}
        />
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          className="btn"
        >
          추가
        </Button>
      </form>

      <Row gutter={16}>
        <Col span={8}>
          <Input
            type="text"
            placeholder="타입 입력"
            name="todoType"
            value={todoType}
            onChange={(e) => handleChange(e, 10, onTodoTypeChange)}
            maxLength={20}
            style={{
              marginBottom: "10px",
              borderColor: errors.todoType ? "red" : undefined,
            }}
          />
        </Col>
        <Col span={8}>
          <DatePicker
            name="createDateTime"
            value={createDateTime ? dayjs(createDateTime) : null}
            onChange={onCreateDateTimeChange}
            style={{
              width: "100%",
              borderColor: errors.createDateTime ? "red" : undefined,
            }}
            placeholder="시작일"
          />
        </Col>
        <Col span={8}>
          <DatePicker
            name="dueDate"
            value={dueDate ? dayjs(dueDate) : null}
            onChange={onDueDateChange}
            style={{
              width: "100%",
              borderColor: errors.dueDate ? "red" : undefined,
            }}
            placeholder="마감일"
          />
        </Col>
      </Row>
    </div>
  );
};

export default TodoInput;
