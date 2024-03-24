package com.jixialunbi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts = new ArrayList<>();

    @JsonFormat
    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT NOW()")
    private LocalDateTime createdAt;

    @JsonFormat
    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT NOW()")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
