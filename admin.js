// Share the same demo arrays via localStorage simulation (or hardcode same data)
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

function loadStats() {
  const all = [...foundItems, ...lostItems];
  const unclaimed = foundItems.filter(i => i.status === 'Unclaimed').length;
  const openLost = lostItems.filter(i => i.status === 'Open').length;
  const claimed = foundItems.filter(i => i.status === 'Claimed' || i.status === 'Returned').length;
  const matched = lostItems.filter(i => i.status === 'Matched' || i.status === 'Recovered').length;
  document.getElementById('stats').innerHTML = `
    <div class="card"><h4>Total Reports</h4><p class="stat-num">${all.length}</p></div>
    <div class="card"><h4>Unclaimed Found</h4><p class="stat-num">${unclaimed}</p></div>
    <div class="card"><h4>Open Lost</h4><p class="stat-num">${openLost}</p></div>
    <div class="card"><h4>Claimed / Returned</h4><p class="stat-num">${claimed}</p></div>
    <div class="card"><h4>Matched / Recovered</h4><p class="stat-num">${matched}</p></div>
  `;
}

function loadReports() {
  const filter = document.getElementById('filterStatus').value;
  let rows = [];
  foundItems.forEach(i => {
    if (!filter || i.status === filter) {
      rows.push({...i, type: 'FOUND', loc: i.locationFound, date: i.dateFound, person: i.finderName});
    }
  });
  lostItems.forEach(i => {
    if (!filter || i.status === filter) {
      rows.push({...i, type: 'LOST', loc: i.lastSeenLocation, date: i.dateLost, person: i.ownerName});
    }
  });
  rows.sort((a,b) => (b.date || '').localeCompare(a.date || ''));
  document.getElementById('reportsBody').innerHTML = rows.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td><span class="badge ${r.type==='FOUND'?'badge-found':'badge-lost'}">${r.type}</span></td>
      <td>${r.itemName}</td>
      <td>${r.brand || '-'} / ${r.color || '-'}</td>
      <td>${r.loc}</td>
      <td>${r.date}</td>
      <td>${r.person}</td>
      <td><span class="badge badge-status">${r.status}</span></td>
      <td>
        <select onchange="updateStatus('${r.id}','${r.type}', this.value)">
          ${r.type === 'FOUND'
            ? `<option ${r.status==='Unclaimed'?'selected':''}>Unclaimed</option>
               <option ${r.status==='Claimed'?'selected':''}>Claimed</option>
               <option ${r.status==='Returned'?'selected':''}>Returned</option>`
            : `<option ${r.status==='Open'?'selected':''}>Open</option>
               <option ${r.status==='Matched'?'selected':''}>Matched</option>
               <option ${r.status==='Recovered'?'selected':''}>Recovered</option>`
          }
        </select>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="9">No reports</td></tr>';
}

function updateStatus(id, type, status) {
  if (type === 'FOUND') {
    const item = foundItems.find(i => i.id === id);
    if (item) item.status = status;
  } else {
    const item = lostItems.find(i => i.id === id);
    if (item) item.status = status;
  }
  loadStats();
  loadReports();
}

loadStats();
loadReports();
