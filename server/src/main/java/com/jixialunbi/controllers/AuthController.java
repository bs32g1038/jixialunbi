package com.jixialunbi.controllers;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.CircleCaptcha;
import com.jixialunbi.common.R;
import com.jixialunbi.dto.request.LoginRequest;
import com.jixialunbi.dto.request.UserRequest;
import com.jixialunbi.dto.response.CommandResponse;
import com.jixialunbi.dto.response.JwtResponse;
import com.jixialunbi.enums.NotificationTypeEnum;
import com.jixialunbi.model.Notification;
import com.jixialunbi.service.AuthService;
import com.jixialunbi.service.NotificationService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final Clock clock;

    @Autowired
    private final AuthService authService;

    @Autowired
    private final NotificationService notificationService;

    @Autowired
    HttpSession session;

    @PostMapping("/login")
    public R login(@Valid @RequestBody LoginRequest request) {
        final JwtResponse response = authService.login(request);
        return R.ok().data(response);
    }

    @PostMapping("/signup")
    public R signup(@Valid @RequestBody UserRequest request) {
        final CommandResponse response = authService.signup(request);
        Notification notification = new Notification();
        notification.setSenderId(0);
        notification.setReceiverId(response.id());
        notification.setTitle("系统通知");
        notification.setContent("欢迎您，加入到积下论笔社区");
        notification.setBeRead(false);
        notification.setType(NotificationTypeEnum.HUANGYING.getCode());
        notificationService.createNotification(notification);
        return R.ok().data(response);
    }

    @GetMapping("/captcha")
    public ResponseEntity<byte[]> captcha() {
        CircleCaptcha captcha = CaptchaUtil.createCircleCaptcha(120, 60, 4, 20);
        session.setAttribute("code", captcha.getCode());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(captcha.getImageBytes());
    }

}
