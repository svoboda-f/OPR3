package cz.osu.be.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cz.osu.be.JwtTokenUtil;
import cz.osu.be.model.AppUser;
import cz.osu.be.model.AppUserDetails;
import cz.osu.be.model.UserInfo;
import cz.osu.be.repository.AppUserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AppUser user) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch (DisabledException | BadCredentialsException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        UserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
        String token = jwtTokenUtil.generateToken(userDetails);
        Map<String, String> responseToken = new LinkedHashMap<>();
        responseToken.put("token", token);
        return ResponseEntity.ok(responseToken);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody AppUser user) {
        Optional<AppUser> tmp = appUserRepository.findByUsername(user.getUsername());

        if (tmp.isPresent()) {
            return ResponseEntity.badRequest().body("User with name " + user.getUsername() + " already exists");
        }
        UserInfo userInfo = user.getUserInfo();
        userInfo.setEntries(new ArrayList<>());
        AppUser appUser = new AppUser(user.getUsername(), passwordEncoder.encode(user.getPassword()), userInfo);
        userInfo.setUser(appUser);
        appUserRepository.save(appUser);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping()
    public Map<String, Object> getInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return appUserRepository.findByUsername(auth.getName()).get().getUserInfo().getUserInfo();
    }
}
