package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.dto.request.UserRequest;
import com.jixialunbi.dto.request.UserUpdateRequest;
import com.jixialunbi.enums.HttpReponseResultCodeEnum;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.FollowUserRepository;
import com.jixialunbi.repository.UserRepository;
import com.jixialunbi.service.FollowUserService;
import com.jixialunbi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    FollowUserService followUserService;

    @GetMapping("/users")
    public R fetchUsers(@RequestParam int page, @RequestParam int pageSize) {
        try {
            Pageable pageable = PageRequest.of(page, pageSize);
            Page<User> data = userRepository.findAll(pageable);
            if (data.getSize() <= 0) {
                return R.ok().setResult(HttpReponseResultCodeEnum.NOT_CONTENT);
            }
            return R.ok().data(data);
        } catch (Exception e) {
            return R.error().message("系统异常");
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/login-user-info")
    public R loginUserInfo(Principal principal) {
        return R.ok().data(userRepository.findByAccount(principal.getName()));
    }

    @PostMapping("/user/create")
    public R create(@Valid @RequestBody UserRequest request) {
        if (userRepository.existsByUsernameIgnoreCase(request.getAccount())) {
            return R.error().message("用户名已存在！");
        }
        return R.ok().data(userService.create(request));
    }

    @GetMapping("/user-info/{account}")
    public R getUserInfo(@PathVariable String account, Principal principal) {
        if (principal == null) {
            var user = userRepository.findByAccount(account);
            return R.ok().data(user);
        }
        var login_user = userService.getByAccount(principal.getName());
        var user = userRepository.findByAccount(account);
        boolean followed = followUserService.isFollow(login_user.getId(), user.get().getId());
        user.get().setFollowed(followed);
        return R.ok().data(user);
    }

    @PostMapping("/user/update")
    public R update(@Valid @RequestBody UserUpdateRequest request, Principal principal) {
        var user = userService.getByAccount(principal.getName());
        if (request.getImage() != null) {
            user.setImage(request.getImage());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getUsername() != null) {
            user.setUsername(request.getUsername());
        }
        if (request.getAbout() != null) {
            user.setAbout(request.getAbout());
        }
        userRepository.save(user);
        return R.ok().data(true);
    }

    @PostMapping("/follow-user/{account}")
    public R followUser(@PathVariable String account, Principal principal) {
        var user = userService.getByAccount(principal.getName());
        var followUser = userService.getByAccount(account);
        boolean res = followUserService.followUser(user.getId(), followUser.getId());
        return R.ok().data(res);
    }

}