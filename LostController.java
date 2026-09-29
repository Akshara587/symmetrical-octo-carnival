package com.example.lostfound.controller;

import com.example.lostfound.model.LostItem;
import com.example.lostfound.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lost")
@CrossOrigin(origins = "*")
public class LostController {
  @Autowired private LostItemRepository repo;

  @GetMapping
  public List<LostItem> getAll() { return repo.findAll(); }

  @GetMapping("/{id}")
  public ResponseEntity<LostItem> getById(@PathVariable String id) {
    return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestBody LostItem item) {
    if (item.itemName == null || item.itemName.isBlank() || item.lastSeenLocation == null ||
        item.ownerName == null || item.contact == null)
      return ResponseEntity.badRequest().body(Map.of("error", "Name, location, owner and contact are required"));
    if (item.status == null) item.status = "Open";
    return ResponseEntity.ok(repo.save(item));
  }

  @PutMapping("/{id}/status")
  public ResponseEntity<LostItem> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
    return repo.findById(id).map(item -> {
      item.status = body.get("status");
      return ResponseEntity.ok(repo.save(item));
    }).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id) { repo.deleteById(id); }
}
