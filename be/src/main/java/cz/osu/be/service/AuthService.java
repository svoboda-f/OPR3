package cz.osu.be.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cz.osu.be.model.UserInfo;
import cz.osu.be.repository.UserRepository;
import cz.osu.be.JwtTokenUtil;
import cz.osu.be.model.User;
import cz.osu.be.model.AppUserDetails;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository appUserRepository;

    public Map<String, Object> login(User user) {
        Authentication authentication;
        Map<String, Object> ret = new LinkedHashMap<>();
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch (DisabledException | BadCredentialsException exception) {
            ret.put("error", "Invalid credentials");
            return ret;
        }
        UserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
        String token = jwtTokenUtil.generateToken(userDetails);
        ret.put("token", token);
        return ret;
    }

    public Map<String, Object> register(User user) {
        Map<String, Object> ret = new LinkedHashMap<>();
        Optional<User> tmp = appUserRepository.findByUsername(user.getUsername());

        if (tmp.isPresent()) {
            ret.put("userAlreadyExist", String.format("User with username '%s' already exists", tmp.get().getUsername()));
            return ret;
        }
        UserInfo userInfo = user.getUserInfo();
        userInfo.setEntries(new ArrayList<>());
        User appUser = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), userInfo);
        userInfo.setUser(appUser);
        appUserRepository.save(appUser);
        ret.put("registered", "ok");
        return ret;
    }

    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return appUserRepository.findByUsername(auth.getName()).get();
    }

    public long getCurrentUsersId() {
        return this.getCurrentUser().getId();
    }

    public void changePassword(String password) {
        User user = this.getCurrentUser();
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        this.appUserRepository.save(user);
    }
}
