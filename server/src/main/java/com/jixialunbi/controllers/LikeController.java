//package com.jixialunbi.controllers;
//
//import com.jixialunbi.common.R;
//import com.jixialunbi.repository.CategoryRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//
//@RestController
//@RequestMapping("/api/v1")
//public class LikeController {
//
//    @Autowired
//    CategoryRepository categoryRepository;
//
//    @GetMapping("/categories")
//    public R fetchCategories(@RequestParam(required = false, defaultValue = "1") int page, @RequestParam(required = false, defaultValue = "10") int pageSize) {
//        try {
//            return R.ok().data(categoryRepository.findAll());
//        } catch (Exception e) {
//            return R.error().message("系统异常");
//        }
//    }
//
//}