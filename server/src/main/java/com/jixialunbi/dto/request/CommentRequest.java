package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Data Transfer Object for Profile request
 */
@Data
public class CommentRequest {

    @NotBlank
    @Size(max = 2000)
    private String content;

    @NotNull
    private long postId;

    private Long parentId;

    private Long replyId;

}
