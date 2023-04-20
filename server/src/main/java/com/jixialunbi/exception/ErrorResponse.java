package com.jixialunbi.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Builds exception handler response in a proper format with status, message, stackTrace and errors
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private final int status;
    private final String message;
    private String stackTrace;
    private List<ValidationError> errors;

    /**
     * Adds validation error for handling unprocessable entity
     *
     * @param field
     * @param message
     */
    public void addValidationError(String field, String message) {
        if (Objects.isNull(errors)) {
            errors = new ArrayList<>();
        }
        errors.add(new ValidationError(field, message));
    }

    private record ValidationError(String field, String message) {
    }
}
