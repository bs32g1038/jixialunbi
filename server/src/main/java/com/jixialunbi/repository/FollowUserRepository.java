package com.jixialunbi.repository;

import com.jixialunbi.model.FollowUser;
import com.jixialunbi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowUserRepository extends JpaRepository<FollowUser, Long> {

    FollowUser findOneByUserIdAndFollowUser(long userId, User user);

}
