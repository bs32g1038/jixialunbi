package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.common.utils.PageUtil;
import com.jixialunbi.model.PostCollection;
import com.jixialunbi.repository.PostCollectionRepository;
import com.jixialunbi.repository.PostLikeRepository;
import com.jixialunbi.security.UserDetailsImpl;
import com.jixialunbi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


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
    public R fetchCollectionPosts(
            @RequestParam(required = true) Long id,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int pageSize,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        String regex = "<.*?>";
        var aimuser = userService.getById(id);
        Page<PostCollection> list = postCollectionRepository.findByAuthorId(aimuser.getId(), PageRequest.of(page, pageSize));
        list.toList().forEach(item -> {
            if (item.getPost().getContent() != null) {
                item.getPost().setContent(item.getPost().getContent().replaceAll(regex, ""));
            }
            var post = item.getPost();
            if (userDetails != null) {
                var like = postLikeRepository.findOneByPostIdAndAuthorId(post.getId(), userDetails.getId());
                post.setLiked(like != null && like.getDeleted() == null);
                var cn = postCollectionRepository.findOneByPostIdAndAuthorId(post.getId(), userDetails.getId());
                post.setCollected(cn != null && cn.getDeleted() == null);
            }
        });
        return R.ok().data(PageUtil.of(list));
    }

}