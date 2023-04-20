package com.jixialunbi.service;

import com.jixialunbi.exception.NoSuchElementFoundException;
import com.jixialunbi.model.Category;
import com.jixialunbi.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.jixialunbi.common.Constants.NOT_FOUND_CATEGORY;

@Slf4j(topic = "CategoryService")
@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public Category getById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementFoundException(NOT_FOUND_CATEGORY));
    }
}
