package com.jixialunbi.enums;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum NotificationTypeEnum {
    HUANGYING(20000, "欢迎");

    private final int code;
    private final String message;

    NotificationTypeEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
