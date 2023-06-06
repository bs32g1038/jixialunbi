package com.jixialunbi.service;

import com.jixialunbi.dto.request.LoginRequest;
import com.jixialunbi.dto.request.UserRequest;
import com.jixialunbi.dto.response.CommandResponse;
import com.jixialunbi.dto.response.JwtResponse;
import com.jixialunbi.exception.ElementAlreadyExistsException;
import com.jixialunbi.model.Role;
import com.jixialunbi.model.RoleType;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.UserRepository;
import com.jixialunbi.security.JwtUtils;
import com.jixialunbi.security.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static com.jixialunbi.common.Constants.ALREADY_EXISTS_USER;
import static com.jixialunbi.common.Constants.CREATED_USER;

/**
 * Service used for Authentication related operations
 */
@Slf4j(topic = "AuthService")
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    /**
     * Authenticates users by their credentials
     *
     * @param request
     * @return JwtResponse
     */
    public JwtResponse login(LoginRequest request) {
        System.out.println(request.getAccount());
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getAccount(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        final UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        final List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .toList();
        return JwtResponse.builder().token(jwt).id(userDetails.getId()).username(userDetails.getUsername()).roles(roles).build();
    }

    /**
     * Registers users using their credentials and user info
     *
     * @param request
     * @return id of the registered user
     */
    public CommandResponse signup(@Valid UserRequest request) {
        if (userRepository.existsByUsernameIgnoreCase(request.getAccount().trim()))
            throw new ElementAlreadyExistsException(ALREADY_EXISTS_USER);

        final User user = new User();
        user.setAccount(request.getAccount());
        user.setPassword(encoder.encode(request.getPassword().trim()));
        // add default role to the user
        user.setRoles(new HashSet<>(Arrays.asList(new Role(1L, RoleType.ROLE_USER))));
        userRepository.save(user);
        log.info(CREATED_USER);
        return CommandResponse.builder().id(user.getId()).build();
    }
}
