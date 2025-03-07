package com.clush.hjkim.app.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clush.hjkim.app.vo.WeatherResponse;
import com.clush.hjkim.service.WeatherService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "날씨 조회", description = "날씨 조회하는 api 입니다.")
@RequestMapping("/api/weather")
@CrossOrigin("*")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public WeatherResponse getWeather(@RequestParam String city) {
        return weatherService.getWeather(city);
    }

}
