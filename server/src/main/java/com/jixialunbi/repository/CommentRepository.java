package com.jixialunbi.repository;

import com.jixialunbi.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPostId(Long postId);

    Page<Comment> findAll(Specification<Comment> specification, Pageable pageable);

    @Query(value = """
            select
                    c1_0.id,
                    c1_0.content,
                    c1_0.created_at,
                    c1_0.description,
                    c1_0.parent_id,
                    c1_0.post_id,
                    c1_0.reply_id,
                    c1_0.updated_at,
                    c1_0.author_id
                from
                    comment c1_0
                where
                    c1_0.post_id=? limit ?,?
            """, nativeQuery = true)
    List<Comment> getRecent10Comments(Long postId, Integer page, Integer limit);
}