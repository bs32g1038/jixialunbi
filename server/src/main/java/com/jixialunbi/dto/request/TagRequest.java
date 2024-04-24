package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Data Transfer Object for Profile request
 */
@Data
public class TagRequest {

    private Long id;

    @NotBlank
    @Size(max = 20)
    private String name;

    private long order;

    @Size(max = 200)
    private String description;

}
