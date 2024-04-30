package com.jixialunbi.controllers;

import com.jixialunbi.common.R;
import com.jixialunbi.repository.NotificationRepository;
import com.jixialunbi.security.UserDetailsImpl;
import com.jixialunbi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
public class NotificationController {

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    UserService userService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/notifications")
    public R fetchNotifications(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestParam(required = false, defaultValue = "1") int page, @RequestParam(required = false, defaultValue = "10") int pageSize) {
        return R.ok().data(notificationRepository.findAllByReceiverId(userDetails.getId()));
    }

}