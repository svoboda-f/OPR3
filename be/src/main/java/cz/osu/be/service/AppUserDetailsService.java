package cz.osu.be.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import cz.osu.be.model.AppUser;
import cz.osu.be.model.AppUserDetails;
import cz.osu.be.repository.AppUserRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<AppUser> user = appUserRepository.findByUsername(username);
        if (user.isEmpty())
            throw new UsernameNotFoundException("User with name " + username + " doesn't exist");
        UserDetails ret = new AppUserDetails(user.get().getUsername(), user.get().getPassword());
        return ret;
    }
}
