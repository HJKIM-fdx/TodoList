import React, { useEffect, useState } from "react";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

const TodoContainer = () => {
  // state 정의
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getList()
  }, []);


  // 이벤트 함수
  // 체크박스 토글 함수
  const onToggle = async (todo) => {
    // 클라이언트에서 status 변경
    // const newTodoList = todoList.map((item) => {
    //   return item.todoId == todo.todoId ? { ...item, status: !item.status } : item;
    // });

    // ########################## 클라이언트에서만 처리 (서버X) #################################
    // 클라이언트에서 sort 정렬
    //  newTodoList.sort((a, b) => {
      // 완료 여부(status) 비교해서, 같으면 todoId값으로 정렬
      // 다르면 false인게 먼저 나오도록 정렬
      // a.status가 true이고 b.status가 false이면 → 1 반환 → b가 먼저 오도록 함.
      // a.status가 false이고 b.status가 true이면 → -1 반환 → a가 먼저 오도록 함

      // "음수" , "0", "양수" 순으로 정렬하게 되서 , 음수일 경우 더 앞에 정렬됨
      // 음수 (< 0) → a가 b보다 앞에 위치
      // 양수 (> 0) → b가 a보다 앞에 위치
      // 0 → 순서 변경 없음

      // sort((a, b) => a - b) : a와b를 비교하여 sort
    //   return a.status == b.status ? a.todoId - b.todoId : a.status ? 1 : -1;
    // })

        // state 업데이트
        // setTodoList(newTodoList);

    // 상태 수정 요청
    const data = {
      // todo의 status 만 바꾸기
      ...todo,
      todoTitle:todo.todoTitle,
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
    getList()
  };

  // 할일 입력 변경 이벤트 함수
  const onChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  // 할일 삭제 함수
  const onRemove = async (todoId) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const url = `http://localhost:8081/api/todo/delete/${todoId};`
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    getList()

  }

  // 할일 수정 함수
  const onUpdate = async (todoId, todoTitle) => {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({todoId, todoTitle})
    }

    try {
      const url = 'http://localhost:8081/api/todo';
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    getList()

  }

  // 전체 삭제 함수
  const onRemoveAll = async (todoId) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const url = 'http://localhost:8081/api/todo/delete/-1';
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    getList()
  }

  // 전체 완료 함수
  const onCompleteAll = async () => {

    const data = {
      todoId:-1
    };

    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    try {
      const url = 'http://localhost:8081/api/todo';
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg);
    } catch (error) {
      console.log(error);
    }

    // ########################## 클라이언트에서만 처리 (서버X) #################################
    // 전체완료 클릭 후, 리스트 다시 조회
    // setTodoList((todoList) => {
    //   return todoList.map((item) => {
    //     return { ...item, status: true }; // 뒤에 status컬럼만 끄집어내서 비교하기 위해 status
    //   }).sort((a, b) => {
    //     return a.status - b.status == 0 ? b.no - a.no : a.status - b.status;
    //   })
    //   ;
    // });

    getList();
  };



  // 할일 목록 요청
  const getList = () => {
    // fetch는 디폴트가 get방식요청
    fetch("http://localhost:8081/api/todo")
      .then((response) => response.json())
      .then((data) => {
        // data.result : 할일 목록
        setTodoList(data.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const onSubmit = async (e) => {
    e.preventDefault(); // 기본 이벤트 동작 방지 (기존 form에 대한 제출 이벤트)

    // 데이터 등록 요청
    const data = {
      todoTitle: input
    }

    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    try {
      const url = "http://localhost:8081/api/todo";
      const response = await fetch(url, option);
      const msg = await response.text();
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
    getList() // 할 일 목록 다시 조회
    setInput('') // 입력 값 비우기
  }

  return (
    <div className="container">
      <TodoHeader />
      <TodoInput input={input} onChange={onChange} onSubmit={onSubmit}/>
      <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} onUpdate={onUpdate}/>
      <TodoFooter onRemoveAll={onRemoveAll} onCompleteAll={onCompleteAll}/>
    </div>
  );
};

export default TodoContainer;
