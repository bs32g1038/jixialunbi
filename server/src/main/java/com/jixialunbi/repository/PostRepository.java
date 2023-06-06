package com.jixialunbi.repository;

import com.jixialunbi.model.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    long countByDeleted(LocalDateTime deleted);

    List<Post> findAllByPinned(Boolean pinned);

    Page<Post> findAll(Specification<Post> specification, Pageable pageable);

    Post findOneById(long id);

    Post findByIdAndAuthorId(long postId, long authorId);

    @Transactional
    @Modifying
    @Query("update Post p set p.likeCount = p.likeCount + :likeCount where p.id = :id")
    void increaseLikeCount(@Param("id") Long id, @Param("likeCount") Integer likeCount);

    @Transactional
    @Modifying
    @Query("update Post p set p.collectionCount = p.collectionCount + :collectionCount where p.id = :id")
    void increaseCollectionCount(@Param("id") Long id, @Param("collectionCount") Integer collectionCount);

}