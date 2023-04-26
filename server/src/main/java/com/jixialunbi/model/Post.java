package com.jixialunbi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "author_id")
    private User author;

    @Transient
    private List<User> participants = new ArrayList<User>();

    @Transient
    private boolean liked = false;

    @Transient
    private boolean collected = false;

    @Column(name = "tags")
    private String tags;

    @Column(name = "pics")
    private String pics;

    @Column(name = "good")
    private Boolean good;

    @Column(name = "pinned")
    private Boolean pinned;

    @Column(name = "locked")
    private Boolean locked;

    @Column(name = "comment_count")
    private int commentCount;

    @Column(name = "collection_count")
    private int collectionCount;

    @Column(name = "like_count")
    private int likeCount;

    @Column(name = "visit_count")
    private int visitCount;

    @Column(name = "type")
    private int type;

    @Column(name = "deleted", nullable = true)
    private LocalDateTime deleted;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false, updatable = false)
    private LocalDateTime updatedAt;

}
