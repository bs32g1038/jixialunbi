package com.jixialunbi.controllers;

import cn.hutool.core.util.StrUtil;
import com.jixialunbi.common.R;
import com.jixialunbi.common.utils.PageUtil;
import com.jixialunbi.dto.request.IdRequest;
import com.jixialunbi.dto.request.PostRequest;
import com.jixialunbi.model.*;
import com.jixialunbi.repository.*;
import com.jixialunbi.service.CategoryService;
import com.jixialunbi.service.UserService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api/v1")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostLikeRepository postLikeRepository;

    @Autowired
    PostCollectionRepository postCollectionRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserService userService;

    @Autowired
    CategoryService categoryService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@Valid @RequestBody PostRequest postRequest, Principal principal) {
        var post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setCategory(categoryService.getById(postRequest.getCategoryId()));
        post.setContent(postRequest.getContent());
        post.setAuthor(userService.getByAccount(principal.getName()));
        if (!StrUtil.isEmpty(postRequest.getTags())) {
            post.setTags(postRequest.getTags());
        }
        var result = postRepository.save(post);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/posts")
    public R fetchPosts(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int pageSize,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String account,
            @RequestParam(required = false, defaultValue = "false") boolean isHot,
            Principal principal
    ) {
        User user;
        if (principal == null) {
            user = null;
        } else {
            user = userService.getByAccount(principal.getName());
        }
        Long authorId = null;
        if (account != null) {
            authorId = userService.getByAccount(account).getId();
        }
        List<Sort.Order> orders = new ArrayList<Sort.Order>();
        if (isHot) {
            orders.add(new Sort.Order(Sort.Direction.DESC, "commentCount"));
        } else {
            orders.add(new Sort.Order(Sort.Direction.DESC, "createdAt"));
        }
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(orders));
        Long finalAuthorId = authorId;
        var test = postRepository.findAll(new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> list = new ArrayList<Predicate>();
                list.add(criteriaBuilder.isNull(root.get("deleted")));
                if (!Objects.isNull(categoryId)) {
                    list.add(criteriaBuilder.equal(root.get("category"), categoryId));
                }
                if (!Objects.isNull(finalAuthorId)) {
                    list.add(criteriaBuilder.equal(root.get("author"), finalAuthorId));
                }
                Predicate[] arr = new Predicate[list.size()];
                query.where(list.toArray(arr));
                return query.getRestriction();
            }
        }, pageable);
        var arr = test.getContent().stream().map(p -> {
            return p.getId();
        });
        final int[] i = {0};
        arr.toList().forEach(postId -> {
            var a = test.getContent().get(i[0]);
            String regex = "<.*?>";
            a.setContent(a.getContent().replaceAll(regex, ""));
            // 组合评论数据
            var comments = commentRepository.findAll(new Specification<Comment>() {
                @Override
                public Predicate toPredicate(Root<Comment> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                    List<Predicate> list = new ArrayList<Predicate>();
                    list.add(criteriaBuilder.equal(root.get("postId"), postId));
                    Predicate[] arr = new Predicate[list.size()];
                    query.where(list.toArray(arr));
                    return query.getRestriction();
                }
            }, PageRequest.of(0, 10));
            a.setParticipants(comments.stream().map(item -> {
                return item.getAuthor();
            }).toList());
            // 点赞数据，收藏数据
            if (user != null) {
                var like = postLikeRepository.findOneByPostIdAndAuthorId(postId, user.getId());
                a.setLiked(like != null && like.getDeleted() == null);
                var cn = postCollectionRepository.findOneByPostIdAndAuthorId(postId, user.getId());
                a.setCollected(cn != null && cn.getDeleted() == null);
            }
            i[0]++;
        });
        return R.ok().data(PageUtil.of(test));
    }

    @GetMapping("/pinned-posts")
    public R pinnedPosts() {
        var test = postRepository.findAllByPinned(true);
        return R.ok().data(test);
    }

    @GetMapping("/posts/{postId}")
    @Transactional
    public R getPost(@PathVariable long postId, Principal principal) {
        var post = postRepository.findById(postId);
        if (!post.get().equals(null)) {
            post.get().setVisitCount(post.get().getVisitCount() + 1);
        }
        User user;
        if (principal == null) {
            user = null;
        } else {
            user = userService.getByAccount(principal.getName());
        }
        // 点赞数据
        if (user != null) {
            var res = postLikeRepository.findOneByPostIdAndAuthorId(postId, user.getId());
            post.get().setLiked(res != null && res.getDeleted() == null);
            var cn = postCollectionRepository.findOneByPostIdAndAuthorId(postId, user.getId());
            post.get().setCollected(cn != null && cn.getDeleted() == null);
        }
        return R.ok().data(post);
    }

    @Transactional
    @PostMapping("/like-post/{postId}")
    public R likePost(@PathVariable long postId, Principal principal) {
        var user = userService.getByAccount(principal.getName());
        var res = postLikeRepository.findOneByPostIdAndAuthorId(postId, user.getId());
        if (res != null) {
            if (res.getDeleted() == null) {
                res.setDeleted(new Date());
                postRepository.increaseLikeCount(postId, -1);
            } else {
                res.setDeleted(null);
                postRepository.increaseLikeCount(postId, 1);
            }
            postLikeRepository.save(res);
            return R.ok().data(true);
        }
        var postLike = new PostLike();
        postLike.setAuthorId(user.getId());
        postLike.setPostId(postId);
        postLike.setDeleted(null);
        postRepository.increaseLikeCount(postId, 1);
        postLikeRepository.save(postLike);
        return R.ok().data(true);
    }

    @Transactional
    @PostMapping("/collect-post/{postId}")
    public R collectPost(@PathVariable long postId, Principal principal) {
        var user = userService.getByAccount(principal.getName());
        var res = postCollectionRepository.findOneByPostIdAndAuthorId(postId, user.getId());
        if (res != null) {
            if (res.getDeleted() == null) {
                res.setDeleted(new Date());
                postRepository.increaseCollectionCount(postId, -1);
            } else {
                res.setDeleted(null);
                postRepository.increaseCollectionCount(postId, 1);
            }
            postCollectionRepository.save(res);
            return R.ok().data(true);
        }
        var postCollection = new PostCollection();
        postCollection.setAuthorId(user.getId());
        postCollection.setPost(postRepository.findById(postId).get());
        postCollection.setDeleted(null);
        postRepository.increaseCollectionCount(postId, 1);
        postCollectionRepository.save(postCollection);
        return R.ok().data(true);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/delete-post")
    @Transactional
    public R deletePosts(@Valid @RequestBody IdRequest idRequest, Principal principal) {
        var user = userService.getByAccount(principal.getName());
        var test = postRepository.findByIdAndAuthorId(idRequest.getId(), user.getId());
        test.setDeleted(new Date());
        user.setPostCount(user.getPostCount() - 1);
        return R.ok().data(test);
    }

}