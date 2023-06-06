package com.jixialunbi.repository;

import com.jixialunbi.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    PostLike findOneByPostIdAndAuthorId(long postId, long authorId);
}
