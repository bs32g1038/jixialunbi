package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.dto.request.CommentRequest;
import com.jixialunbi.model.Comment;
import com.jixialunbi.model.Post;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.CommentRepository;
import com.jixialunbi.repository.PostRepository;
import com.jixialunbi.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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
        try {
            return R.ok().data(commentRepository.findAll());
        } catch (Exception e) {
            return R.error().message("系统异常");
        }
    }

    @GetMapping("/post-comments")
    public R fetchCommentsByPostId(@RequestParam(required = true) long postId) {
        try {
            return R.ok().data(commentRepository.findByPostId(postId));
        } catch (Exception e) {
            return R.error().message("系统异常");
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/comments")
    @Transactional
    public R createComment(@Valid @RequestBody CommentRequest commentRequest, Principal principal) {
        var comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setReplyId(commentRequest.getReplyId());
        comment.setParentId(commentRequest.getParentId());
        comment.setPostId(commentRequest.getPostId());
        User author = userService.getByAccount(principal.getName());
        author.setCommentCount(author.getCommentCount() + 1);
        Post post = postRepository.findOneById(commentRequest.getPostId());
        post.setCommentCount(post.getCommentCount() + 1);
        comment.setAuthor(author);
        try {
            return R.ok().data(commentRepository.save(comment));
        } catch (Exception e) {
            return R.error().message("系统异常");
        }
    }

}