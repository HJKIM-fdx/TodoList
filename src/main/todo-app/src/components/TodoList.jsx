import React from 'react'
import TodoItem from './TodoItem'
import CalendarComponent from './CalendarComponent'

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
        todoList.map( (todo) => (
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