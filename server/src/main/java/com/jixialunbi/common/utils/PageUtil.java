package com.jixialunbi.common.utils;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Page;

import java.util.HashMap;

@Schema(description = "分页数据")
public class PageUtil {
    public static HashMap of(Page data) {
        HashMap hashMap = new HashMap<String, Object>();
        System.out.println(data.getContent());
        hashMap.put("items", data.getContent());
        hashMap.put("count", data.getTotalElements());
        return hashMap;
    }
}