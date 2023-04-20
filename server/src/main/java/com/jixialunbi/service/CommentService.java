package com.jixialunbi.service;

import com.jixialunbi.exception.NoSuchElementFoundException;
import com.jixialunbi.model.Comment;
import com.jixialunbi.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.jixialunbi.common.Constants.NOT_FOUND_CATEGORY;

@Slf4j(topic = "CommentService")
@Service
@RequiredArgsConstructor
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    public Comment getById(long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementFoundException(NOT_FOUND_CATEGORY));
    }
}
