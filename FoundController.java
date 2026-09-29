package com.example.lostfound.controller;

import com.example.lostfound.model.FoundItem;
import com.example.lostfound.repository.FoundItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/found")
@CrossOrigin(origins = "*")
public class FoundController {
  @Autowired private FoundItemRepository repo;

  @GetMapping
  public List<FoundItem> getAll() { return repo.findAll(); }

  @GetMapping("/{id}")
  public ResponseEntity<FoundItem> getById(@PathVariable String id) {
    return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestBody FoundItem item) {
    if (item.itemName == null || item.itemName.isBlank() || item.locationFound == null ||
        item.authority == null || item.finderName == null)
      return ResponseEntity.badRequest().body(Map.of("error", "Name, location, authority and finder are required"));
    if (item.status == null) item.status = "Unclaimed";
    return ResponseEntity.ok(repo.save(item));
  }

  @PutMapping("/{id}/status")
  public ResponseEntity<FoundItem> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
    return repo.findById(id).map(item -> {
      item.status = body.get("status");
      return ResponseEntity.ok(repo.save(item));
    }).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id) { repo.deleteById(id); }
}
