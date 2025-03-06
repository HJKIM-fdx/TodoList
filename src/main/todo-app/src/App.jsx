import './App.css';
import React, { useState } from 'react';
import TodoContainer from './components/TodoContainer';
import CalendarComponent from './components/CalendarComponent';
import Weather from './components/Weather';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [todoList, setTodoList] = useState([]); // todoList 상태를 App에서 관리

  return (
    <div className="app-container">
      <div className="title">
        <h1>일정 관리 캘린더</h1>
          <Weather/>
      </div>
      <div className="content-container">
        {/* 캘린더에서 선택한 날짜를 setSelectedDate로 업데이트 */}
        <CalendarComponent setSelectedDate={setSelectedDate} todoList={todoList} />
        <div className="todo-container">
          {/* TodoContainer에 todoList와 setTodoList 전달 */}
          <TodoContainer 
            selectedDate={selectedDate} 
            todoList={todoList} 
            setTodoList={setTodoList} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
