package cz.osu.be.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cz.osu.be.model.User;
import cz.osu.be.model.Auth;
import cz.osu.be.service.AuthService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Auth user) {
        Map<String, Object> ret = authService.login(user);
        if (ret.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ret);
        }
        return ResponseEntity.ok(ret);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody User user) {
        Map<String, Object> ret = authService.register(user);
        if (ret.containsValue("error")) {
            return ResponseEntity.badRequest().body(ret);
        }
        return ResponseEntity.ok().body(ret);
    }

    @PostMapping("/change-password")
    public ResponseEntity<Object> changePassword(@RequestBody String password) {
        Map<String, Object> ret = new LinkedHashMap<>();
        ret.put("ok", "Password changed");
        this.authService.changePassword(password);
        return ResponseEntity.ok().body(ret);
    }
}
