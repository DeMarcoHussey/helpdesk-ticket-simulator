// Simple Help Desk Ticket Simulator — DeMarco Hussey
const form = document.getElementById('ticketForm');
const ticketsList = document.getElementById('ticketsList');
const statusFilter = document.getElementById('statusFilter');
const categoryFilter = document.getElementById('categoryFilter');
const exportBtn = document.getElementById('exportBtn');

let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');

function save(){ localStorage.setItem('tickets', JSON.stringify(tickets)); }
function uid(){ return Math.random().toString(36).slice(2, 9); }
function now(){ return new Date().toLocaleString(); }

function render(){
  const s = statusFilter.value, c = categoryFilter.value;
  ticketsList.innerHTML = '';
  tickets
    .filter(t => s==='All'||t.status===s)
    .filter(t => c==='All'||t.category===c)
    .sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt))
    .forEach(t => ticketsList.appendChild(ticketCard(t)));
}

function ticketCard(t){
  const el = document.createElement('div');
  el.className = 'ticket';
  el.innerHTML = `
    <div class="row">
      <h3>#${t.id} — ${t.category}</h3>
      <span class="badge">${t.status}</span>
    </div>
    <p><strong>Requester:</strong> ${t.reqName} (${t.reqEmail})</p>
    <p>${t.description}</p>
    <p class="meta">Created: ${t.createdAt}</p>
    <div class="row">
      <select data-id="${t.id}" class="statusSelect">
        ${['Open','In Progress','Resolved','Closed'].map(s => `<option ${t.status===s?'selected':''}>${s}</option>`).join('')}
      </select>
      <button class="resolveBtn" data-id="${t.id}">Add Resolution</button>
      <button class="deleteBtn" data-id="${t.id}">Delete</button>
    </div>
    ${t.resolution ? `<div class="small"><p><strong>Resolution:</strong> ${t.resolution}</p><p class="meta">Resolved: ${t.resolvedAt||''}</p></div>` : ''}
  `;

  el.querySelector('.statusSelect').addEventListener('change', e=>{
    const id = e.target.getAttribute('data-id');
    const ticket = tickets.find(x=>x.id===id);
    ticket.status = e.target.value;
    if (ticket.status==='Resolved' && !ticket.resolution){
      ticket.resolution = 'Resolved per KB guidance.';
      ticket.resolvedAt = now();
    }
    save(); render();
  });

  el.querySelector('.resolveBtn').addEventListener('click', e=>{
    const id = e.target.getAttribute('data-id');
    const resolution = prompt('Enter resolution notes (steps taken, KB used, prevention tips):');
    if (resolution){
      const ticket = tickets.find(x=>x.id===id);
      ticket.resolution = resolution;
      ticket.status = 'Resolved';
      ticket.resolvedAt = now();
      save(); render();
    }
  });

  el.querySelector('.deleteBtn').addEventListener('click', e=>{
    const id = e.target.getAttribute('data-id');
    tickets = tickets.filter(x=>x.id!==id);
    save(); render();
  });

  return el;
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const t = {
    id: uid(),
    reqName: document.getElementById('reqName').value.trim(),
    reqEmail: document.getElementById('reqEmail').value.trim(),
    category: document.getElementById('category').value,
    description: document.getElementById('description').value.trim(),
    status: 'Open',
    createdAt: now(),
    resolution: null,
    resolvedAt: null
  };
  tickets.unshift(t);
  save();
  form.reset();
  render();
});

statusFilter.addEventListener('change', render);
categoryFilter.addEventListener('change', render);

exportBtn.addEventListener('click', ()=>{
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tickets, null, 2));
  const a = document.createElement('a');
  a.href = dataStr; a.download = 'tickets_export.json'; a.click();
});

// Seed example tickets once
if (!localStorage.getItem('seeded')){
  tickets.push(
    {id: uid(), reqName:'Maria Lopez', reqEmail:'maria.lopez@example.com', category:'Printer', description:'Printer shows offline for everyone in Room 204.', status:'Open', createdAt: now(), resolution:null, resolvedAt:null},
    {id: uid(), reqName:'David Lee', reqEmail:'david.lee@example.com', category:'Wi-Fi', description:'Laptop disconnects from Wi-Fi every 10 minutes.', status:'In Progress', createdAt: now(), resolution:null, resolvedAt:null}
  );
  localStorage.setItem('seeded','1'); save();
}
render();
