package com.clush.hjkim.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.clush.hjkim.app.vo.WeatherResponse;

@Service
public class WeatherService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    public WeatherResponse getWeather(String city) {
        if (city == null || city.isEmpty()) {
            city = "Seoul";  // 기본값 설정
        }

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric") // 섭씨 온도
                .toUriString();

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        if (response == null || !response.containsKey("main") || !response.containsKey("weather")) {
            throw new RuntimeException("날씨 정보를 가져올 수 없습니다.");
        }

        WeatherResponse weatherResponse = new WeatherResponse();
        weatherResponse.setCity(city);

        // 날씨 설명 (weather -> description)
        List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
        String description = weatherList.isEmpty() ? "정보 없음" : (String) weatherList.get(0).get("description");
        weatherResponse.setDescription(description);

        // 온도 (main -> temp)
        Map<String, Object> mainData = (Map<String, Object>) response.get("main");
        weatherResponse.setTemperature((Double) mainData.get("temp"));

        return weatherResponse;
    }
}
