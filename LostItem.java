package com.example.lostfound.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "lost_items")
public class LostItem {
  @Id public String id;
  public String itemName;
  public String brand;
  public String color;
  public String description;
  public String lastSeenLocation;
  public LocalDate dateLost;
  public String ownerName;
  public String contact;
  public String status = "Open";  // Open | Matched | Recovered

  public LostItem() {}
  public LostItem(String id, String itemName, String brand, String color, String description,
                  String lastSeenLocation, LocalDate dateLost, String ownerName,
                  String contact, String status) {
    this.id = id; this.itemName = itemName; this.brand = brand; this.color = color;
    this.description = description; this.lastSeenLocation = lastSeenLocation;
    this.dateLost = dateLost; this.ownerName = ownerName;
    this.contact = contact; this.status = status;
  }
}
