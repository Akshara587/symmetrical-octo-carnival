package com.example.lostfound.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "found_items")
public class FoundItem {
  @Id public String id;
  public String itemName;
  public String brand;
  public String color;
  public String description;
  public String locationFound;
  public LocalDate dateFound;
  public String authority;       // to whom it was handed over
  public String finderName;
  public String contact;
  public String status = "Unclaimed";  // Unclaimed | Claimed | Returned

  public FoundItem() {}
  public FoundItem(String id, String itemName, String brand, String color, String description,
                   String locationFound, LocalDate dateFound, String authority,
                   String finderName, String contact, String status) {
    this.id = id; this.itemName = itemName; this.brand = brand; this.color = color;
    this.description = description; this.locationFound = locationFound;
    this.dateFound = dateFound; this.authority = authority;
    this.finderName = finderName; this.contact = contact; this.status = status;
  }
}
