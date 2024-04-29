package com.jixialunbi.repository;

import com.jixialunbi.model.FollowUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Repository
public interface FollowUserRepository extends JpaRepository<FollowUser, Long> {

    @Query(value = """
            select
                c1_0.id,
                c1_0.user_id,
                c1_0.follow_user_id,
                c1_0.deleted,
                c1_0.created_at,
                c1_0.updated_at
            from
                follow_user c1_0
            where
                c1_0.user_id=? and c1_0.follow_user_id=?
            """, nativeQuery = true)
    FollowUser findOneByUserIdAndFollowUserId(long userId, long followUserId);

    ArrayList<FollowUser> findAllByUserIdAndDeleted(long userId, LocalDateTime deleted);

}
