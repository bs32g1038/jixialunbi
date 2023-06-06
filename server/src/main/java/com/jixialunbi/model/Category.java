package com.jixialunbi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "od")
    private int od;

    @JsonFormat
    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT NOW()")
    private LocalDateTime createdAt;

    @JsonFormat
    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT NOW()")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
