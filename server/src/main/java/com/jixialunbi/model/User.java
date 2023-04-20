package com.jixialunbi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = {"username"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "account")
    private String account;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "about")
    private String about;

    @Column(name = "image")
    private String image;

    @Column(name = "is_actived")
    private boolean isActived;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "comment_count")
    private int commentCount;

    @Column(name = "post_count")
    private int postCount;

    @Column(name = "like_count")
    private int likeCount;

    @Column(name = "follow_count")
    private int followCount;

    @Transient
    private Boolean followed;

    @Column(name = "banned")
    private boolean banned;

    @JsonFormat
    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT NOW()")
    private LocalDateTime createdAt;

    @JsonFormat
    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT NOW()")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    @JsonIgnoreProperties({"users"})
    private Set<Role> roles = new HashSet<>();

    public void addRole(Role role) {
        roles.add(role);
        role.getUsers().add(this);
    }

    public void removeRole(Role role) {
        roles.remove(role);
        role.getUsers().remove(this);
    }
}