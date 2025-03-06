package com.clush.hjkim.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@Tag(name = "헬스체크", description = "통신 테스트 api 입니다.")
@RequestMapping("/api")
public class TestController {

    @GetMapping("/healthcheck")
    public String healthCheck() {
        
        return "OK";
    }
    


}
