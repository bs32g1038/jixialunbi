package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.repository.CommentRepository;
import com.jixialunbi.repository.PostRepository;
import com.jixialunbi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class StatisticController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/statistic")
    public R fetchCategories() {
        Map map = new HashMap<>();
        map.put("userCount", userRepository.count());
        map.put("postCount", postRepository.countByDeleted(null));
        map.put("commentCount", commentRepository.count());
        return R.ok().data(map);

    }

}