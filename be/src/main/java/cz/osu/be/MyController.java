package cz.osu.be;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    @GetMapping("/get")
    public String get() {
        return "REST API WORKS! YAY";
    }
}
