package com.clush.hjkim.app.vo;

import lombok.Data;

@Data
public class WeatherResponse {
    private String city;
    private String description;
    private double temperature;
}
