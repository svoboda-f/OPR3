package cz.osu.be.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cz.osu.be.model.Entry;
import cz.osu.be.service.EntryService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.0.10:4200"})
@RequestMapping("/api/entries")
public class EntryController {

    @Autowired
    private EntryService entryService;
    
    @PostMapping
    public Entry addEntry(@RequestBody Entry entry) {
        return this.entryService.addEntry(entry);
    }

    @DeleteMapping
    public void deleteEntry(@RequestBody long entryId) {
        this.entryService.deleteEntry(entryId);
    }

    @PatchMapping
    public Entry updateEntry(@RequestBody Entry entry) {
        return this.entryService.updateEntry(entry);
    }

    @GetMapping
    public Map<String, Object> getEntries(@RequestParam int offset, @RequestParam int size, @RequestParam String field, @RequestParam String direction) {
        return this.entryService.getEntriesPaginated(offset, size, field, direction);
    }

    @GetMapping("/between")
    public List<Entry> getEntriesBetween(@RequestParam String from, @RequestParam String to) {
        return this.entryService.getEntriesBetween(LocalDate.parse(from), LocalDate.parse(to));
    }

    @GetMapping("/max-weight") 
    public Entry getMax() {
        return this.entryService.getMax();
    }

    public Entry getMin() {
        return this.entryService.getMin();
    }
}
