package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Data Transfer Object for Profile request
 */
@Data
public class PostPinRequest {

    @NotNull
    private Long id;

    @NotNull
    private Boolean pinned;
}
