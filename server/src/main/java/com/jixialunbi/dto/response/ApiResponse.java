package com.jixialunbi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Builds API response in a proper format with timestamp, message and data
 *
 * @param <T>
 */
@Data
@AllArgsConstructor
public class ApiResponse<T> {

    private final String message;
    private final T data;
    private Long timestamp;

    public ApiResponse(Long timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
        this.data = null;
    }
}
