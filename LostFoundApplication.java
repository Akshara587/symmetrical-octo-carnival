package com.example.lostfound;

import com.example.lostfound.model.*;
import com.example.lostfound.repository.*;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class LostFoundApplication {
  public static void main(String[] args) {
    SpringApplication.run(LostFoundApplication.class, args);
  }

  @Bean
  CommandLineRunner init(FoundItemRepository foundRepo, LostItemRepository lostRepo) {
    return args -> {
      if (foundRepo.count() == 0) {
        foundRepo.saveAll(List.of(
          new FoundItem(null, "Water Bottle", "Milton", "Blue", "Steel bottle with college sticker",
            "Library 2nd Floor", LocalDate.of(2025,9,20), "Security Office", "Rahul S", "98765xxxxx", "Unclaimed"),
          new FoundItem(null, "Wireless Earbuds", "boAt", "Black", "Case slightly scratched",
            "Cafeteria", LocalDate.of(2025,9,22), "Admin Block", "Priya M", "priya@mail.com", "Claimed"),
          new FoundItem(null, "ID Card", "", "White", "Student ID – CSE Dept",
            "Parking Lot", LocalDate.of(2025,9,25), "Security Office", "Arun K", "", "Unclaimed")
        ));
      }
      if (lostRepo.count() == 0) {
        lostRepo.saveAll(List.of(
          new LostItem(null, "Laptop Bag", "American Tourister", "Black", "Contains notebook and charger",
            "Seminar Hall", LocalDate.of(2025,9,18), "Divya R", "divya@college.edu", "Open"),
          new LostItem(null, "Calculator", "Casio", "Grey", "fx-991ES Plus",
            "Exam Hall B", LocalDate.of(2025,9,21), "Karthik V", "90000xxxxx", "Matched"),
          new LostItem(null, "Umbrella", "Stag", "Red", "Foldable, broken tip",
            "Main Gate", LocalDate.of(2025,9,24), "Sneha P", "sneha@mail.com", "Open")
        ));
      }
    };
  }
}
