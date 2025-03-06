package com.clush.hjkim.app.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.clush.hjkim.app.vo.TodoVO;

@Mapper
public interface TodoMapper {

    List<TodoVO> getTodoList();
    int addTodoList(TodoVO param);
    int deleteTodoList(int todoId);
    int deleteAllTodoList(int todoId);
    int updateTodoList(TodoVO param);
    int completeAll();

}
