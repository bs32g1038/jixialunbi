package com.jixialunbi.repository;

import com.jixialunbi.model.PostCollection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostCollectionRepository extends JpaRepository<PostCollection, Long> {

    PostCollection findOneByPostIdAndAuthorId(long postId, long authorId);

    Page<PostCollection> findByAuthorId(long authorId, Pageable pageable);
}
