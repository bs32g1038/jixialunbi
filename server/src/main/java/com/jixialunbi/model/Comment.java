package com.jixialunbi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "content")
    private String content;

    @Column(name = "description")
    private String description;

    @Column(name = "post_id")
    private long postId;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "author_id")
    private User author;

    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "reply_id")
    private Long replyId;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "reply_id", insertable = false, updatable = false)
    private Comment reply;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, updatable = false)
    private LocalDateTime updatedAt;
}
