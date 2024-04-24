package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.NotificationRepository;
import com.jixialunbi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;


@RestController
@RequestMapping("/api/v1")
public class NotificationController {

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    UserService userService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/notifications")
    public R fetchNotifications(Principal principal, @RequestParam(required = false, defaultValue = "1") int page, @RequestParam(required = false, defaultValue = "10") int pageSize) {
        User author = userService.getByAccount(principal.getName());
        return R.ok().data(notificationRepository.findAllByReceiverId(author.getId()));

    }

}