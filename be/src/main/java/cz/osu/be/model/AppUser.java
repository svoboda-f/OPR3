package cz.osu.be.model;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    private String username;
    private String password;

    // private UserInfo userInfo;


    public AppUser() {}

    public AppUser(String username, String password/*, UserInfo userInfo*/) {
        this.username = username;
        this.password = password;
        // this.userInfo = userInfo;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    // public UserInfo getUserInfo() {
    //     return this.userInfo;
    // }
}
