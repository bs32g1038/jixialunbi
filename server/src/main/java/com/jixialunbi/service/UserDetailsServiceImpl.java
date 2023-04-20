package com.jixialunbi.service;

import cn.hutool.core.bean.BeanUtil;
import com.jixialunbi.common.Constants;
import com.jixialunbi.model.User;
import com.jixialunbi.repository.UserRepository;
import com.jixialunbi.security.UserDetailsImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service used for UserDetails related operations
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String account) throws UsernameNotFoundException {
        final User user = userRepository.findByAccount(account)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(Constants.NOT_FOUND_ACCOUNT, account)));
        var _user = new User();
        BeanUtil.copyProperties(user, _user);
        _user.setUsername(user.getAccount());
        return UserDetailsImpl.build(_user);
    }
}
