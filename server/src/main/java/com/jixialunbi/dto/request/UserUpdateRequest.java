package com.jixialunbi.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequest {

    private String email;

    private String about;

    private String image;

    private String username;

}
