package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IdRequest {

    @NotNull
    private Long id;
}
