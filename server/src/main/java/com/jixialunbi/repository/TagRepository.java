package com.jixialunbi.repository;

import com.jixialunbi.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findById(Long id);

}