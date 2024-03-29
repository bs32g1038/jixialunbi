package com.jixialunbi.repository;

import com.jixialunbi.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsernameIgnoreCase(String name);

    Optional<User> findByUsername(String username);

    Optional<User> findByAccount(String account);

    @Transactional
    @Modifying
    @Query("update User p set p.followCount = p.followCount + :followCount where p.id = :id")
    void increaseFollowCount(@Param("id") Long id, @Param("followCount") Integer followCount);

    @Transactional
    @Modifying
    @Query("update User p set p.fanCount = p.fanCount + :fanCount where p.id = :id")
    void increaseFanCount(@Param("id") Long id, @Param("fanCount") Integer fanCount);


}
