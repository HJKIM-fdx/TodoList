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
@CrossOrigin("*")  
@Tag(name = "Todo 관리", description = "Todo 목록을 조회, 추가, 수정, 삭제하는 API입니다.")
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("")
    @Operation(summary = "Todo 목록 조회", description = "등록된 모든 Todo 목록을 조회합니다.")
    public Map<String, Object> getTodoList() {
        try {
            var result = todoService.getTodoList();
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }

    @PostMapping("")
    @Operation(summary = "Todo 추가", description = "새로운 Todo 항목을 추가합니다.")
    public Map<String, Object> addTodoList(@RequestBody TodoVO param) {
        try {
            var result = todoService.addTodoList(param);
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{todoId}")
    @Operation(summary = "Todo 삭제", description = "특정 Todo 항목을 삭제합니다. <br> `-1`을 입력하면 전체 삭제됩니다.")
    public Map<String, Object> deleteTodoList(@PathVariable int todoId) {
        try {
            var result = 0;
            if (todoId == -1) {
                result = todoService.deleteAllTodoList(todoId);
            } else {
                result = todoService.deleteTodoList(todoId);
            }
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }

    @PutMapping("")
    @Operation(summary = "Todo 수정", description = "특정 Todo 항목을 수정합니다. <br> `-1`을 입력하면 모든 Todo 항목을 완료 처리합니다.")
    public Map<String, Object> updateTodoList(@RequestBody TodoVO param) {
        try {
            var result = 0;
            if (param.getTodoId() == -1) {
                result = todoService.completeAll();
            } else {
                result = todoService.updateTodoList(param);
            }
            return ApiResponseUtils.createResponse(result);
        } catch (Exception e) {
            return ApiResponseUtils.createErrorResponse("오류 : " + e.getMessage());
        }
    }
}
