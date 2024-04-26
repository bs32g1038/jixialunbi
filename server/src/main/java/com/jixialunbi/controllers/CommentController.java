package com.jixialunbi.controllers;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.jixialunbi.common.R;
import com.jixialunbi.dto.request.CommentRequest;
import com.jixialunbi.model.Comment;
import com.jixialunbi.model.Post;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.CommentRepository;
import com.jixialunbi.repository.PostRepository;
import com.jixialunbi.security.UserDetailsImpl;
import com.jixialunbi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @GetMapping("/comments")
    public R fetchComments(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int pageSize) {
        return R.ok().data(commentRepository.findAll());

    }

    @GetMapping("/post-comments")
    public R fetchCommentsByPostId(@RequestParam(required = true) long postId) {
        List<Comment> list = commentRepository.findByPostId(postId);
        List<Comment> parentList = list.stream().filter(v -> v.getParentId() == null).toList();
        List<Map<String, Object>> result = parentList.stream().map(v -> {
            Map<String, Object> map = BeanUtil.beanToMap(v);
            map.put("childrens", list.stream().filter(d -> ObjectUtil.equals(d.getParentId(), v.getId())));
            return map;
        }).toList();
        return R.ok().data(result);

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/comments")
    public R createComment(@Valid @RequestBody CommentRequest commentRequest, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        var comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setReplyId(commentRequest.getReplyId());
        comment.setParentId(commentRequest.getParentId());
        comment.setPostId(commentRequest.getPostId());
        User author = userService.getById(userDetails.getId());
        author.setCommentCount(author.getCommentCount() + 1);
        Post post = postRepository.findOneById(commentRequest.getPostId());
        post.setCommentCount(post.getCommentCount() + 1);
        comment.setAuthor(author);
        return R.ok().data(commentRepository.save(comment));
    }

}