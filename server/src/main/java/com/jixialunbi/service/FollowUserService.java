package com.jixialunbi.service;

import com.jixialunbi.dto.request.UserRequest;
import com.jixialunbi.exception.NoSuchElementFoundException;
import com.jixialunbi.model.Role;
import com.jixialunbi.model.RoleType;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.FollowUserRepository;
import com.jixialunbi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static com.jixialunbi.common.Constants.CREATED_USER;
import static com.jixialunbi.common.Constants.NOT_FOUND_USER;


/**
 * Service used for User related operations
 */
@Slf4j(topic = "UserService")
@Service
@RequiredArgsConstructor
public class FollowUserService {

    private final FollowUserRepository followUserRepository;

    public Boolean isFollow(long userId, User user) {
        var frs = followUserRepository.findOneByUserIdAndFollowUser(userId, user);
        if(frs == null || frs.getDeleted() != null) {
            return false;
        }
        return true;
    }


}
