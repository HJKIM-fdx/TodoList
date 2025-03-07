import React from 'react'
import TodoItem from './TodoItem'
import dayjs from "dayjs";

const TodoList = ( {todoList, onToggle, onRemove, onUpdate}) => {
  return (
    <div>
        <div className="todo-header">
        <span className="h1">할 일</span>
        <span className="h2">타입</span>
        <span className="h3">시작일</span>
        <span className="h4">마감일</span>
      </div>
      <ul className="todoList">
  {
    [...todoList] // 기존 배열을 변경하지 않도록 복사
      .sort((a, b) => dayjs(a.createDateTime).valueOf() - dayjs(b.createDateTime).valueOf()) // createDateTime 기준 정렬
      .map((todo) => (
        <TodoItem
          key={todo.todoId}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))
  }
</ul>

    </div>
  )
}

export default TodoList