package com.clush.hjkim.app.utils;

import java.util.HashMap;
import java.util.Map;

public class ApiResponseUtils {

    private static String RESULT_CODE = "200";
    private static String SUCCESS_MESSAGE = "정상적으로 처리되었습니다";

    private static String ERROR_RESULT_CODE = "500";

    public static <T> Map<String, Object> createResponse(T value) {
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> data = new HashMap<>();
        data.put("result", value);

        response.put("success", "Y");
        response.put("code", RESULT_CODE);
        response.put("message", SUCCESS_MESSAGE);
        response.put("data", data);

        return response;
    }

    public static <T> Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", "N");
        response.put("code", ERROR_RESULT_CODE);
        response.put("message", message);
        
        return response;
    }

}
