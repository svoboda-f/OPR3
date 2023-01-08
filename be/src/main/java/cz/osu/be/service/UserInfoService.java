package cz.osu.be.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cz.osu.be.model.UserInfo;

@Service
public class UserInfoService {

    @Autowired
    private AuthService authService;

    public UserInfo getUserInfo() {
        return this.authService.getCurrentUser().getUserInfo();
    }

    public Map<String, Object> updateUserInfo(UserInfo userInfo) {
        UserInfo currentInfo = this.getUserInfo();

        if (userInfo.getHeight() == 0 ||
                userInfo.getDateOfBirth() == null ||
                userInfo.getDateOfBirth().toString().equals("") ||
                userInfo.getSex() == null || userInfo.getSex().equals("") ||
                (!userInfo.getSex().equals("male") && !userInfo.getSex().equals("female"))) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Request body doesn't have all values");
        }
        currentInfo.setUserInfo(userInfo);
        return currentInfo.getUserInfo();
    }
}
