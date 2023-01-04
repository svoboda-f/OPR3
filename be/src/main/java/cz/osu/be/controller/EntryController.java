package cz.osu.be.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cz.osu.be.model.Entry;
import cz.osu.be.repository.AppUserRepository;
import cz.osu.be.repository.EntryRepository;

@RestController
@RequestMapping("/api/entries")
public class EntryController {

    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private EntryRepository entryRepository;
    
    @PostMapping
    public Entry addEntry(@RequestBody Entry entry) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Entry newEntry = new Entry(entry);
        appUserRepository.findByUsername(auth.getName()).get().getUserInfo().getEntries().add(newEntry);
        return this.entryRepository.save(newEntry);
    }

    @GetMapping
    public Page<Entry> getEntries(@RequestParam int offset, @RequestParam int size) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        long userId = appUserRepository.findByUsername(auth.getName()).get().getId();
        return entryRepository.getEntriesPaginated(userId, PageRequest.of(offset, size));
    }

    @GetMapping("/between")
    public List<Entry> getEntriesBetween(@RequestParam String from, @RequestParam String to) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        long userId = appUserRepository.findByUsername(auth.getName()).get().getId();
        return entryRepository.getEntriesWithUserIdAndDateBetween(userId, LocalDate.parse(from),LocalDate.parse(to));
    }
}
