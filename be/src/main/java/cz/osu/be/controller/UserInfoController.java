package cz.osu.be.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import cz.osu.be.model.UserInfo;
import cz.osu.be.repository.UserRepository;
import cz.osu.be.service.UserInfoService;

@RestController
@RequestMapping("/api/user-info")
public class UserInfoController {

    @Autowired
    private UserRepository appUserRepository;
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping()
    public Map<String, Object> getInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return appUserRepository.findByUsername(auth.getName()).get().getUserInfo().getUserInfo();
    }

    @PatchMapping
    public ResponseEntity<Object> setInfo(@RequestBody UserInfo userInfo) {
        Map<String, Object> ret = new LinkedHashMap<>();
        try {
            ret = this.userInfoService.updateUserInfo(userInfo);
            return ResponseEntity.ok().body(ret);
        } catch (ResponseStatusException exception) {
            ret.put("error", exception.getReason());
            return ResponseEntity.status(exception.getStatusCode()).body(ret);
        }
    }
}
