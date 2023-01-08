package cz.osu.be.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private double weight;

    public Entry() {}

    public Entry(Entry entry) {
        this.date = entry.date;
        this.weight = entry.weight;
    }
    
    public Entry(LocalDate date, double weight) {
        this.date = date;
        this.weight = weight;
    }

    public Long getId() {
        return this.id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public double getWeight() {
        return this.weight;
    }
    
}
