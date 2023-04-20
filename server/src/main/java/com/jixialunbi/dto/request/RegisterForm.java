package com.jixialunbi.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RegisterForm {
    @NotEmpty(message = "账号不能为空！")
    private String account;

    @NotEmpty(message = "密码不能为空！")
    private String password;
}
