package com.clush.hjkim.app.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoVO {
    private int todoId;             // 할 일 고유 ID
    private String todoTitle;       // 할 일 제목
    private String todoType;        // 할 일 유형
    private Boolean status = false;         // 진행 상태 
    private Date createDateTime;    // 생성 날짜
    private Date dueDate;           // 마감 기한
}
