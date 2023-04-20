package com.jixialunbi.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Data Transfer Object used for authentication response
 */
@Getter
@Builder
public class JwtResponse {

    private String type;
    private String token;
    private Long id;
    private String username;
    private List<String> roles;
}
