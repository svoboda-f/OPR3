package cz.osu.be.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import cz.osu.be.model.Entry;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long>{
    
    @Query(value = "Select * from entry e Where e.user_id = ?1", nativeQuery = true)
    List<Entry> getEntriesWithUserId(long userId);

    @Query(value = "Select * from entry e where e.user_id = ?1 and e.date between ?2 and ?3", nativeQuery = true)
    List<Entry> getEntriesWithUserIdAndDateBetween(long userId, LocalDate from, LocalDate to);

    @Query(value = "Select * from entry e where e.user_id = ?1", countQuery = "select count(*) from entry where user_id = ?1", nativeQuery = true)
    Page<Entry> getEntriesPaginated(long userId, Pageable pageable);
}
