package com.jixialunbi.service;

import com.jixialunbi.model.Notification;
import com.jixialunbi.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j(topic = "NotificationService")
@Service
@RequiredArgsConstructor
public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

}
