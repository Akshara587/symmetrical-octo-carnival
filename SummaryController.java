package com.example.lostfound.controller;

import com.example.lostfound.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/summary")
@CrossOrigin(origins = "*")
public class SummaryController {
  @Autowired private FoundItemRepository foundRepo;
  @Autowired private LostItemRepository lostRepo;

  @GetMapping
  public Map<String, Object> summary() {
    Map<String, Object> res = new LinkedHashMap<>();
    res.put("totalFound", foundRepo.count());
    res.put("totalLost", lostRepo.count());
    res.put("unclaimedFound", foundRepo.findByStatus("Unclaimed").size());
    res.put("claimedFound", foundRepo.findByStatus("Claimed").size() + foundRepo.findByStatus("Returned").size());
    res.put("openLost", lostRepo.findByStatus("Open").size());
    res.put("matchedLost", lostRepo.findByStatus("Matched").size() + lostRepo.findByStatus("Recovered").size());
    res.put("totalReports", foundRepo.count() + lostRepo.count());
    return res;
  }
}
