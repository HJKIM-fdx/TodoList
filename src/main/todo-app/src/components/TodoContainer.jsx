import React, { useEffect, useState } from "react";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

const TodoContainer = ({ selectedDate, todoList, setTodoList }) => {
  // state 정의
  const [input, setInput] = useState("");
  const [todoType, settodoType] = useState("");
  const [createDateTime, setCreateDateTime] = useState(selectedDate);
  const [dueDate, setDueDate] = useState();

  // 이벤트 함수
  // 할일 입력 변경 이벤트 함수
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  // 타입 입력 변경 이벤트 함수
  const onTodoTypeChange = (e) => {
    settodoType(e.target.value);
  };
  // 날짜 입력 변경 이벤트 함수
  const onCreateDateTimeChange = (date, dateString) => {
    // date는 moment 객체, dateString은 'YYYY-MM-DD' 형식의 문자열
    setCreateDateTime(dateString); // dateString을 사용하여 문자열 형식으로 상태를 업데이트
  };

  const onDueDateChange = (date, dateString) => {
    setDueDate(dateString);
  };

  useEffect(() => {
    getList();
  }, []);

  // selectedDate 변경될 때마다 createDateTime 업데이트
  useEffect(() => {
    setCreateDateTime(selectedDate);
  }, [selectedDate]);

  // 할일 목록 요청
  const getList = () => {
    // fetch는 디폴트가 get방식요청
    fetch("http://localhost:8081/api/todo")
      .then((response) => response.json())
      .then((data) => {
        // data.result : 할일 목록
        console.log("받아온 데이터:", data);
        setTodoList(data.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 이벤트 함수
  // 체크박스 토글 함수
  const onToggle = async (todo) => {
    // 상태 수정 요청
    const data = {
      // todo의 status 만 바꾸기
      ...todo,
      todoTitle: todo.todoTitle,
      status: !todo.status,
    };
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const url = "http://localhost:8081/api/todo";
      const response = await fetch(url, option);
      const msg = await response.text();
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    // 서버로 부터 할 일 목록 요청
    getList();
  };

  // 할일 삭제 함수
  const onRemove = async (todoId) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const url = `http://localhost:8081/api/todo/delete/${todoId};`;
      const response = await fetch(url, option);
      const msg = await response.text();
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    getList();
  };

  // 할일 수정 함수
  const onUpdate = async (todo) => {
    const data = {
      ...todo,
      todoId: todo.todoId,
      todoTitle: todo.todoTitle,
      todoType: todo.todoType,
    };
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const url = "http://localhost:8081/api/todo";
      const response = await fetch(url, option);
      const msg = await response.text();
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    getList();
  };

  // 전체 삭제 함수
  const onRemoveAll = async () => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const url = "http://localhost:8081/api/todo/delete/-1";
      const response = await fetch(url, option);
      const msg = await response.text();
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    getList();
  };

  // 전체 완료 함수
  const onCompleteAll = async () => {
    const data = {
      todoId: -1,
    };

    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const url = "http://localhost:8081/api/todo";
      const response = await fetch(url, option);
      const msg = await response.text();
      console.log(msg);
    } catch (error) {
      console.log(error);
    }

    // ########################## 클라이언트에서만 처리 (서버X) #################################
    // 전체완료 클릭 후, 리스트 다시 조회
    setTodoList((todoList) => {
      return todoList
        .map((item) => {
          return { ...item, status: true }; // 뒤에 status컬럼만 끄집어내서 비교하기 위해 status
        })
        .sort((a, b) => {
          return a.status - b.status == 0
            ? b.todoId - a.todoId
            : a.status - b.status;
        });
    });

    getList();
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 기본 이벤트 동작 방지 (기존 form에 대한 제출 이벤트)

    // 데이터 등록 요청
    const data = {
      todoTitle: input,
      todoType: todoType,
      dueDate: dueDate,
      createDateTime: createDateTime,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const url = "http://localhost:8081/api/todo";
      const response = await fetch(url, option);
      const msg = await response.text();
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
    getList(); // 할 일 목록 다시 조회
    // 입력 값 비우기
    setInput("");
    settodoType("");
    setDueDate(null);
    setCreateDateTime(null);
  };

  return (
    <div className="container">
      <TodoHeader />
      <TodoInput
        input={input}
        onInputChange={onInputChange}
        onTodoTypeChange={onTodoTypeChange}
        onSubmit={onSubmit}
        todoType={todoType}
        onDueDateChange={onDueDateChange}
        createDateTime={createDateTime}
        onCreateDateTimeChange={onCreateDateTimeChange}
        dueDate={dueDate}
      />
      <TodoList
        todoList={todoList}
        onToggle={onToggle}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
      <TodoFooter onRemoveAll={onRemoveAll} onCompleteAll={onCompleteAll} />
    </div>
  );
};

export default TodoContainer;
