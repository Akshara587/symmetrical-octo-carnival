package com.example.lostfound.repository;

import com.example.lostfound.model.FoundItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FoundItemRepository extends MongoRepository<FoundItem, String> {
  List<FoundItem> findByStatus(String status);
  List<FoundItem> findByItemNameContainingIgnoreCase(String name);
}
