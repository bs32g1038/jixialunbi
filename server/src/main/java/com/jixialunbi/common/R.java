package com.jixialunbi.common;

import com.jixialunbi.enums.HttpReponseResultCodeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Map;

/**
 * - 全局统一返回结果
 */
@Data
@Schema(name = "全局统一返回结果", description = "全局统一返回结果")
public class R {

    @Schema(description = "是否成功")
    private Boolean success;

    @Schema(description = "返回码")
    private Integer code;

    @Schema(description = "返回消息")
    private String message;

    @Schema(description = "返回数据")
    private Object data;

    public R() {
    }

    public static R ok() {
        R r = new R();
        r.setSuccess(HttpReponseResultCodeEnum.SUCCESS.getSuccess());
        r.setCode(HttpReponseResultCodeEnum.SUCCESS.getCode());
        r.setMessage(HttpReponseResultCodeEnum.SUCCESS.getMessage());
        return r;
    }

    public static R error() {
        R r = new R();
        r.setSuccess(HttpReponseResultCodeEnum.UNKNOWN_REASON.getSuccess());
        r.setCode(HttpReponseResultCodeEnum.UNKNOWN_REASON.getCode());
        r.setMessage(HttpReponseResultCodeEnum.UNKNOWN_REASON.getMessage());
        return r;
    }

    public static R setResult(HttpReponseResultCodeEnum resultCodeEnum) {
        R r = new R();
        r.setSuccess(resultCodeEnum.getSuccess());
        r.setCode(resultCodeEnum.getCode());
        r.setMessage(resultCodeEnum.getMessage());
        return r;
    }

    public R success(Boolean success) {
        this.setSuccess(success);
        return this;
    }

    public R message(String message) {
        this.setMessage(message);
        return this;
    }

    public R code(Integer code) {
        this.setCode(code);
        return this;
    }

    public R data(Object value) {
        this.data = value;
        return this;
    }

    public R data(Map<String, Object> map) {
        this.setData(map);
        return this;
    }

}