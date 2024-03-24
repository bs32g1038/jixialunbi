package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

/**
 * Data Transfer Object for Profile request
 */
@Data
public class PostRequest {

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    @Size(max = 12000)
    private String content;

//    @NotNull
//    private long categoryId;

    @NotNull
    private List<Long> tags;

    private String pics;
}
