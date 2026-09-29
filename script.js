// Demo data (simulates MongoDB documents)
let foundItems = [
  { id: "F001", itemName: "Water Bottle", brand: "Milton", color: "Blue", description: "Steel bottle with college sticker", locationFound: "Library 2nd Floor", dateFound: "2025-09-20", authority: "Security Office", finderName: "Rahul S", contact: "98765xxxxx", status: "Unclaimed" },
  { id: "F002", itemName: "Wireless Earbuds", brand: "boAt", color: "Black", description: "Case slightly scratched", locationFound: "Cafeteria", dateFound: "2025-09-22", authority: "Admin Block", finderName: "Priya M", contact: "priya@mail.com", status: "Claimed" },
  { id: "F003", itemName: "ID Card", brand: "", color: "White", description: "Student ID – CSE Dept", locationFound: "Parking Lot", dateFound: "2025-09-25", authority: "Security Office", finderName: "Arun K", contact: "", status: "Unclaimed" }
];

let lostItems = [
  { id: "L001", itemName: "Laptop Bag", brand: "American Tourister", color: "Black", description: "Contains notebook and charger", lastSeenLocation: "Seminar Hall", dateLost: "2025-09-18", ownerName: "Divya R", contact: "divya@college.edu", status: "Open" },
  { id: "L002", itemName: "Calculator", brand: "Casio", color: "Grey", description: "fx-991ES Plus", lastSeenLocation: "Exam Hall B", dateLost: "2025-09-21", ownerName: "Karthik V", contact: "90000xxxxx", status: "Matched" },
  { id: "L003", itemName: "Umbrella", brand: "Stag", color: "Red", description: "Foldable, broken tip", lastSeenLocation: "Main Gate", dateLost: "2025-09-24", ownerName: "Sneha P", contact: "sneha@mail.com", status: "Open" }
];

function showTab(name) {
  document.querySelectorAll('.panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (name === 'found') {
    document.getElementById('foundTab').style.display = 'block';
    document.querySelectorAll('.tab')[0].classList.add('active');
  } else if (name === 'lost') {
    document.getElementById('lostTab').style.display = 'block';
    document.querySelectorAll('.tab')[1].classList.add('active');
  } else {
    document.getElementById('searchTab').style.display = 'block';
    document.querySelectorAll('.tab')[2].classList.add('active');
    doSearch();
  }
}

document.getElementById('foundForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const item = {
    id: "F" + String(foundItems.length + 1).padStart(3, "0"),
    itemName: document.getElementById('fName').value,
    brand: document.getElementById('fBrand').value,
    color: document.getElementById('fColor').value,
    description: document.getElementById('fDesc').value,
    locationFound: document.getElementById('fLocation').value,
    dateFound: document.getElementById('fDate').value,
    authority: document.getElementById('fAuthority').value,
    finderName: document.getElementById('fFinder').value,
    contact: document.getElementById('fContact').value,
    status: "Unclaimed"
  };
  foundItems.unshift(item);
  const box = document.getElementById('foundSuccess');
  box.style.display = 'block';
  box.innerHTML = `<strong>Found report submitted!</strong><br>Reference ID: <b>${item.id}</b><br>Item: ${item.itemName} | Location: ${item.locationFound}<br>Handed to: ${item.authority}`;
  this.reset();
});

document.getElementById('lostForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const item = {
    id: "L" + String(lostItems.length + 1).padStart(3, "0"),
    itemName: document.getElementById('lName').value,
    brand: document.getElementById('lBrand').value,
    color: document.getElementById('lColor').value,
    description: document.getElementById('lDesc').value,
    lastSeenLocation: document.getElementById('lLocation').value,
    dateLost: document.getElementById('lDate').value,
    ownerName: document.getElementById('lOwner').value,
    contact: document.getElementById('lContact').value,
    status: "Open"
  };
  lostItems.unshift(item);
  const box = document.getElementById('lostSuccess');
  box.style.display = 'block';
  box.innerHTML = `<strong>Lost report submitted!</strong><br>Reference ID: <b>${item.id}</b><br>Item: ${item.itemName} | Last seen: ${item.lastSeenLocation}<br>We will notify if a match is found.`;
  this.reset();
});

function doSearch() {
  const q = (document.getElementById('searchQ').value || '').toLowerCase();
  const type = document.getElementById('searchType').value;
  let results = [];
  if (type === 'all' || type === 'FOUND') {
    foundItems.filter(i => matches(i, q)).forEach(i => results.push({...i, type: 'FOUND'}));
  }
  if (type === 'all' || type === 'LOST') {
    lostItems.filter(i => matches(i, q)).forEach(i => results.push({...i, type: 'LOST'}));
  }
  const container = document.getElementById('searchResults');
  if (!results.length) {
    container.innerHTML = '<p style="color:#64748b">No matching items found.</p>';
    return;
  }
  container.innerHTML = results.map(i => `
    <div class="card">
      <span class="badge ${i.type === 'FOUND' ? 'badge-found' : 'badge-lost'}">${i.type}</span>
      <span class="badge badge-status" style="margin-left:6px">${i.status}</span>
      <h3 style="margin-top:8px">${i.itemName}</h3>
      <div class="meta">${i.brand || '-'} · ${i.color || '-'}</div>
      <p style="margin:8px 0;font-size:0.9rem">${i.description || ''}</p>
      <div class="meta">📍 ${i.locationFound || i.lastSeenLocation} · 📅 ${i.dateFound || i.dateLost}</div>
      <div class="meta">ID: ${i.id} · ${i.type === 'FOUND' ? 'Finder: ' + i.finderName : 'Owner: ' + i.ownerName}</div>
    </div>
  `).join('');
}

function matches(i, q) {
  if (!q) return true;
  const text = [i.itemName, i.brand, i.color, i.description, i.locationFound, i.lastSeenLocation, i.authority, i.finderName, i.ownerName].join(' ').toLowerCase();
  return text.includes(q);
}

// Default date
document.getElementById('fDate').valueAsDate = new Date();
document.getElementById('lDate').valueAsDate = new Date();
