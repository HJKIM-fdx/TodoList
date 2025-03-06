package com.clush.hjkim.app.interfaces;

import java.util.List;

import com.clush.hjkim.app.vo.TodoVO;

public interface TodoService {

    public List<TodoVO> getTodoList();
    public int addTodoList(TodoVO param);
    public int deleteTodoList(int todoId);
    public int deleteAllTodoList(int todoId);
    public int updateTodoList(TodoVO param);
    public int completeAll();
}
