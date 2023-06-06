package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Data Transfer Object for Login request
 */
@Data
public class LoginRequest {

    @NotBlank
    @Size(min = 3, max = 20)
    private String account;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

    @NotBlank
    private String captcha;
}
