package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
public class TagController {

    @Autowired
    TagRepository tagRepository;

    @GetMapping("/tags")
    public R fetchTags(@RequestParam(required = false, defaultValue = "1") int page, @RequestParam(required = false, defaultValue = "10") int pageSize) {
        try {
            return R.ok().data(tagRepository.findAll());
        } catch (Exception e) {
            return R.error().message("系统异常");
        }
    }

}