package com.example.lostfound.repository;

import com.example.lostfound.model.LostItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LostItemRepository extends MongoRepository<LostItem, String> {
  List<LostItem> findByStatus(String status);
  List<LostItem> findByItemNameContainingIgnoreCase(String name);
}
