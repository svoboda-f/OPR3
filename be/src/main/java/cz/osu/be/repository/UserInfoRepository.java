package cz.osu.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cz.osu.be.model.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long>{
    
}
