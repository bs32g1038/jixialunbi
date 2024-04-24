package com.jixialunbi.common;

import com.jixialunbi.common.result.ResultCode;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * - 全局统一返回结果
 */
@Data
@Schema(name = "全局统一返回结果", description = "全局统一返回结果")
public class R<T> implements Serializable {

    @Schema(description = "是否成功")
    private Boolean success;

    @Schema(description = "返回码")
    private String code;

    @Schema(description = "返回消息")
    private String message;

    @Schema(description = "返回数据")
    private T data;

    public R() {
    }

    public static R ok() {
        R r = new R();
        r.setSuccess(true);
        r.setCode(ResultCode.SUCCESS.getCode());
        r.setMessage(ResultCode.SUCCESS.getMessage());
        return r;
    }

    public static R error(ResultCode resultCode) {
        R r = new R();
        r.setSuccess(false);
        r.setCode(resultCode.getCode());
        r.setMessage(resultCode.getMessage());
        r.setData(null);
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

    public R code(String code) {
        this.setCode(code);
        return this;
    }

    public R data(T value) {
        this.data = value;
        return this;
    }

}