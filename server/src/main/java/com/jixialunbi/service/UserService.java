package com.jixialunbi.service;

import com.jixialunbi.dto.request.UserRequest;
import com.jixialunbi.exception.NoSuchElementFoundException;
import com.jixialunbi.model.Role;
import com.jixialunbi.model.RoleType;
import com.jixialunbi.model.User;
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
public class UserService {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    public User create(UserRequest request) {
        // add default role (ROLE_USER) to the user
        final Set<Role> roles = new HashSet<>(Arrays.asList(new Role(1L, RoleType.ROLE_USER)));

        // add ROLE_ADMIN role if requested by admin
        if (request.getRoles() != null && request.getRoles().contains(RoleType.ROLE_ADMIN.name()))
            roles.add(new Role(2L, RoleType.ROLE_ADMIN));

        final User user = new User();
        log.info(request.getEmail());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRoles(roles);
        userRepository.save(user);
        log.info(CREATED_USER);
        return user;
    }


    public User getById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementFoundException(NOT_FOUND_USER));
    }

    public User getByAccount(String account) {
        return userRepository.findByAccount(account)
                .orElseThrow(() -> new NoSuchElementFoundException(NOT_FOUND_USER));
    }
}
