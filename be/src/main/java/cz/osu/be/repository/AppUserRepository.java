package cz.osu.be.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import cz.osu.be.model.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long>{
    
    Optional<AppUser> findByUsername(String username);
}
