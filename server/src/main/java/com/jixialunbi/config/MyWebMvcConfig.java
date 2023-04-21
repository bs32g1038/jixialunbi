package com.jixialunbi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.jixialunbi.common.utils.Common.getJarFilePath;

@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        System.out.println(getJarFilePath());
        System.out.println("getJarFilePath()");
        registry.addResourceHandler("/static/**").addResourceLocations("file:" + getJarFilePath() + "/static/");
    }
}