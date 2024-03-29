package com.jixialunbi.service;

import com.jixialunbi.model.FollowUser;
import com.jixialunbi.repository.FollowUserRepository;
import com.jixialunbi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


/**
 * Service used for User related operations
 */
@Slf4j(topic = "FollowUserService")
@Service
@RequiredArgsConstructor
public class FollowUserService {

    private final UserRepository userRepository;

    private final FollowUserRepository followUserRepository;

    public Boolean isFollow(long userId, long followUserId) {
        var frs = followUserRepository.findOneByUserIdAndFollowUserId(userId, followUserId);
        if (frs == null || frs.getDeleted() != null) {
            return false;
        }
        return true;
    }

    @Transactional
    public boolean followUser(long userId, long followUserId) {
        var res = followUserRepository.findOneByUserIdAndFollowUserId(userId, followUserId);
        if (res != null) {
            if (res.getDeleted() == null) {
                res.setDeleted(LocalDateTime.now());
                userRepository.increaseFollowCount(userId, -1);
                userRepository.increaseFanCount(followUserId, -1);
            } else {
                res.setDeleted(null);
                userRepository.increaseFollowCount(userId, 1);
                userRepository.increaseFanCount(followUserId, 1);
            }
            followUserRepository.save(res);
            return true;
        }
        var followUser = new FollowUser();
        followUser.setUser(userRepository.findById(userId).get());
        followUser.setFollowUser(userRepository.findById(followUserId).get());
        followUser.setDeleted(null);
        userRepository.increaseFollowCount(userId, 1);
        userRepository.increaseFanCount(followUserId, 1);
        followUserRepository.save(followUser);
        return false;
    }


}
