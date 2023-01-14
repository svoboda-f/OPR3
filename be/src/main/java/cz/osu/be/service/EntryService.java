package cz.osu.be.service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import cz.osu.be.model.Entry;
import cz.osu.be.model.User;
import cz.osu.be.repository.EntryRepository;

@Service
public class EntryService {

    @Autowired
    private EntryRepository entryRepository;
    @Autowired
    private AuthService authService;

    public Entry addEntry(Entry entry) {
        User currentUser = this.authService.getCurrentUser();
        Entry newEntry = new Entry(entry);
        currentUser.getUserInfo().getEntries().add(newEntry);
        return this.entryRepository.save(newEntry);
    }

    public void deleteEntry(long entryId) {
        User currentUser = this.authService.getCurrentUser();
        Entry entry = this.entryRepository.findById(entryId).get();
        currentUser.getUserInfo().getEntries().remove(entry);
        this.entryRepository.save(entry);        
    }

    public Entry updateEntry(Entry entry) {
        Entry updatedEntry = this.entryRepository.findById(entry.getId()).get();
        updatedEntry.setDate(entry.getDate());
        updatedEntry.setWeight(entry.getWeight());
        return this.entryRepository.save(updatedEntry);
    }

    public Map<String, Object> getEntriesPaginated(int offset, int size, String field, String direction) {
        Map<String, Object> ret = new LinkedHashMap<>();
        Page<Entry> page = this.entryRepository.getEntriesPaginated(this.authService.getCurrentUsersId(),
                PageRequest.of(offset, size).withSort(Sort.by(Direction.fromString(direction), field)));
        ret.put("entries", page.getContent());
        ret.put("numberOfPages", page.getTotalPages());
        return ret;
    }

    public List<Entry> getEntriesBetween(LocalDate from, LocalDate to) {
        return this.entryRepository.getEntriesWithUserIdAndDateBetween(this.authService.getCurrentUsersId(), from, to);
    }

    public Entry getMax() {
        long userId = this.authService.getCurrentUsersId();
        return this.entryRepository.getEntriesWithUserId(userId).stream().max(Comparator.comparing(Entry::getWeight))
                .orElse(null);
    }

    public Entry getMin() {
        long userId = this.authService.getCurrentUsersId();
        return this.entryRepository.getEntriesWithUserId(userId).stream().min(Comparator.comparing(Entry::getWeight))
                .orElse(null);
    }
}
