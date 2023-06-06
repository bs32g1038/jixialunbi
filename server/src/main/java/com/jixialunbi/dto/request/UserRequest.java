package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

/**
 * Data Transfer Object for User request
 */
@Data
public class UserRequest {

    private Long id;

    @NotBlank
    @Size(min = 3, max = 20)
    private String account;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

    private Set<String> roles;
}
