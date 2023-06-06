package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.common.utils.PageUtil;
import com.jixialunbi.model.PostCollection;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.PostCollectionRepository;
import com.jixialunbi.repository.PostLikeRepository;
import com.jixialunbi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;


@RestController
@RequestMapping("/api/v1/collection")
public class CollectionController {
    @Autowired
    PostCollectionRepository postCollectionRepository;
    @Autowired
    PostLikeRepository postLikeRepository;
    @Autowired
    UserService userService;

    @GetMapping("/posts")
    public R fetchCategories(
            @RequestParam(required = true) String account,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int pageSize,
            Principal principal
    ) {
        User user;
        if (principal == null) {
            user = null;
        } else {
            user = userService.getByAccount(principal.getName());
        }
        var aimuser = userService.getByAccount(account);
        Page<PostCollection> list = postCollectionRepository.findByAuthorId(aimuser.getId(), PageRequest.of(page, pageSize));
        list.toList().forEach(item -> {
            var post = item.getPost();
            if (user != null) {
                var like = postLikeRepository.findOneByPostIdAndAuthorId(post.getId(), user.getId());
                post.setLiked(like != null && like.getDeleted() == null);
                var cn = postCollectionRepository.findOneByPostIdAndAuthorId(post.getId(), user.getId());
                post.setCollected(cn != null && cn.getDeleted() == null);
            }
        });
        try {
            return R.ok().data(PageUtil.of(list));
        } catch (Exception e) {
            return R.error().message("系统异常");
        }
    }

}