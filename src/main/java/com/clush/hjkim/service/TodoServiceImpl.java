package com.clush.hjkim.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.clush.hjkim.app.interfaces.TodoService;
import com.clush.hjkim.app.mapper.TodoMapper;
import com.clush.hjkim.app.vo.TodoVO;

@Service
public class TodoServiceImpl implements TodoService{

    private final TodoMapper todoMapper;

    public TodoServiceImpl(TodoMapper todoMapper) {
        this.todoMapper = todoMapper;
    }
    
    @Override
    public List<TodoVO> getTodoList() {
        return todoMapper.getTodoList();
    }

    @Override
    public int addTodoList(TodoVO param) {
        return todoMapper.addTodoList(param);
    }

    @Override
    public int deleteTodoList(int todoId) {
        return todoMapper.deleteTodoList(todoId);
    }

    @Override
    public int deleteAllTodoList(int todoId) {
        return todoMapper.deleteAllTodoList(todoId);
    }

    @Override
    public int updateTodoList(TodoVO param) {
        return todoMapper.updateTodoList(param);
    }

    @Override
    public int completeAll() {
        return todoMapper.completeAll();
    }

}
