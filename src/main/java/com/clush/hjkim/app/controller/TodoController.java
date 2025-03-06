package com.clush.hjkim.app.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clush.hjkim.app.interfaces.TodoService;
import com.clush.hjkim.app.utils.ApiResponseUtils;
import com.clush.hjkim.app.vo.TodoVO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin("*")   // 다른 서버에서 자원을 요청하는 허용범위를 지정하는 어노테이션
@Tag(name = "TodoList 조회", description = "TodoList 조회하는 API입니다.")
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("")
    @Operation(summary = "Todo 목록 조회", description = "등록된 Todo 목록을 조회하는 API입니다.")
    public Map<String, Object> getTodoList() {
        try {
            var result = todoService.getTodoList();
            return ApiResponseUtils.createResponse(result);

        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }

    @PostMapping("")
    @Operation(summary = "Todo 목록 조회", description = "등록된 Todo 목록을 조회하는 API입니다.")
    public Map<String, Object> addTodoList(@RequestBody TodoVO param) {

        try {
            var result = todoService.addTodoList(param);
            return ApiResponseUtils.createResponse(result);

        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{todoId}")
    @Operation(summary = "Todo 목록 조회", description = "등록된 Todo 목록을 조회하는 API입니다.")
    public Map<String, Object> deleteTodoList(@PathVariable int todoId) {

        try {
            var result = 0;
            // 전체 삭제 (todoId = -1 )로 요청 받을 때
            if (todoId == -1) {
                result = todoService.deleteAllTodoList(todoId);
            }
            // 삭제
            else {
                result = todoService.deleteTodoList(todoId);
            }
            return ApiResponseUtils.createResponse(result);

        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }



    @PutMapping("")
    @Operation(summary = "Todo 목록 조회", description = "등록된 Todo 목록을 조회하는 API입니다.")
    public Map<String, Object> updateTodoList(@RequestBody TodoVO param) {

        try {
            var result = 0;
            // 전체 완료 (todoId = -1)로 요청 받을 때
            if (param.getTodoId() == -1) {
                result = todoService.completeAll();    
            }
            result = todoService.updateTodoList(param);
            return ApiResponseUtils.createResponse(result);

        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }


}
