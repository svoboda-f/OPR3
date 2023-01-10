package cz.osu.be.model;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dateOfBirth;
    private int height;
    private String sex;
    @JsonManagedReference
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(targetEntity = Entry.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private List<Entry> entries;

    public UserInfo() {
    }

    public UserInfo(LocalDate dateOfBirth, int height, String sex, User user, List<Entry> entries) {
        this.dateOfBirth = dateOfBirth;
        this.height = height;
        this.sex = sex;
        this.user = user;
        this.entries = entries;
    }

    public Long getId() {
        return this.id;
    }

    public LocalDate getDateOfBirth() {
        return this.dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getHeight() {
        return this.height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getSex() {
        return this.sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Entry> getEntries() {
        return this.entries;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.height = userInfo.height;
        this.dateOfBirth = userInfo.dateOfBirth;
        this.sex = userInfo.sex;
    }

    public Map<String, Object> getUserInfo() {
        Map<String, Object> userInfo = new LinkedHashMap<>();
        userInfo.put("username", this.user.getUsername());
        userInfo.put("dateOfBirth", this.dateOfBirth);
        userInfo.put("height", this.height);
        userInfo.put("sex", this.sex);
        return userInfo;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

}
