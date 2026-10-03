// Property portal page: interactive sample building ("Try it").
// Fictional building, people and numbers. No connection to the real portal.
(function () {
  if (!document.getElementById('try-it')) return;

const LEVELS = [ { id: 'site', name: 'Site' }, { id: 'f1', name: 'Floor 1' }, { id: 'f2', name: 'Floor 2' }, { id: 'roof', name: 'Roof' } ];
const levelName = (id) => LEVELS.find(l => l.id === id).name;

const V = {
  plumb: 'Lanier Plumbing', plumbPh: '(770) 555-0142',
  fire: 'Summit Fire Protection', firePh: '(678) 555-0118',
  elec: 'Brightline Electric', elecPh: '(470) 555-0190',
  mech: 'Peachtree Mechanical', mechPh: '(770) 555-0177',
  access: 'Keystone Access Control', accessPh: '(678) 555-0163'
};

const FEATURES = [
  { id: 'ws', level: 'site', x: 128, y: 336, cat: 'safe', name: 'Main water shut-off', where: 'Curb box, front walk, 6 ft left of the sidewalk', confirmed: 'Apr 2026', call: V.plumb, ph: V.plumbPh },
  { id: 'fdc', level: 'site', x: 300, y: 326, cat: 'safe', name: 'Fire department connection', where: 'Front wall, left of entry', confirmed: 'Jan 2026', call: V.fire, ph: V.firePh },
  { id: 'gas', level: 'site', x: 520, y: 210, cat: 'sys', name: 'Gas meter', where: 'East wall, behind fence', confirmed: 'Mar 2026', call: 'Atlanta Gas Light (emergency)', ph: '(770) 555-0100' },
  { id: 'xfmr', level: 'site', x: 520, y: 96, cat: 'sys', name: 'Transformer', where: 'East pad', confirmed: 'Feb 2026', call: 'Utility outage line', ph: '(800) 555-0112' },
  { id: 'gen', level: 'site', x: 545, y: 292, cat: 'sys', name: 'Emergency generator', where: 'East pad, behind the screen wall', confirmed: 'Jul 14, 2026', issue: { list: 'Generator: monthly test missed', why: 'Run under load monthly · last tested Jul 14, due Aug 14', pill: 'overdue 7 weeks', action: 'Record test' }, call: V.elec, ph: V.elecPh },
  { id: 'asm', level: 'site', x: 60, y: 60, cat: 'safe', name: 'Assembly point', where: 'North lot, light pole 4', confirmed: 'May 2026', call: 'Posted in the tenant emergency plan', ph: '' },

  { id: 'facp', level: 'f1', x: 275, y: 142, cat: 'safe', name: 'Fire alarm panel', where: 'Fire control room 1-FC', confirmed: 'Jun 2025', issue: { list: 'Fire alarm panel: annual inspection overdue', why: 'Inspected yearly · last Jun 2025, due Jun 2026', pill: 'overdue 3 months', action: 'Record inspection' }, call: V.fire, ph: V.firePh },
  { id: 'riser', level: 'f1', x: 240, y: 142, cat: 'safe', name: 'Sprinkler riser', where: 'Fire control room 1-FC', confirmed: 'Jan 2026', call: V.fire, ph: V.firePh },
  { id: 'epanel', level: 'f1', x: 340, y: 142, cat: 'sys', name: 'Main electrical panel', where: 'Electrical room 1-E', confirmed: 'Mar 2026', call: V.elec, ph: V.elecPh },
  { id: 'aed', level: 'f1', x: 300, y: 262, cat: 'safe', name: 'AED', where: 'Lobby, by the elevators', confirmed: 'Sep 2026', issue: { list: 'AED pads expire in December', why: 'Pads expire Dec 2026 · order replacements now', pill: 'due in 2 months', action: 'Record new pads', soon: true }, call: 'Pads and battery checked monthly', ph: '' },
  { id: 'door', level: 'f1', x: 300, y: 318, cat: 'acc', name: 'Main entry', where: 'Lobby, card reader', confirmed: 'Jul 2026', call: V.access, ph: V.accessPh },

  { id: 'v2', level: 'f2', x: 240, y: 200, cat: 'sys', name: 'Floor 2 water valve', where: 'Restroom chase, access panel behind the sink wall', confirmed: 'Apr 2026', call: V.plumb, ph: V.plumbPh },
  { id: 'ext2', level: 'f2', x: 210, y: 190, cat: 'safe', name: 'Fire extinguisher 2-E', where: 'Corridor, by Suite 202', confirmed: 'Aug 28, 2026', issue: { list: 'Fire extinguisher 2-E: September monthly check missed', why: 'Checked monthly · last Aug 28, due Sep 28', pill: 'overdue 5 days', action: 'Record check' }, call: V.fire, ph: V.firePh },
  { id: 'idf', level: 'f2', x: 260, y: 142, cat: 'sys', name: 'Telecom closet (IDF)', where: 'Room 2-T, locked', confirmed: 'Feb 2026', call: 'Northside Fiber (carrier)', ph: '(404) 555-0124' },
  { id: 'e2', level: 'f2', x: 340, y: 142, cat: 'sys', name: 'Electrical panel 2', where: 'Room 2-E, stacked over 1-E', confirmed: 'Mar 2026', call: V.elec, ph: V.elecPh },

  { id: 'hatch', level: 'roof', x: 238, y: 76, cat: 'acc', name: 'Roof hatch', where: 'Over stair A', confirmed: 'May 2026', issue: { list: 'Roof hatch: no key holder listed', why: 'Who has the key? Nobody is recorded', pill: 'missing', action: 'Add key holder' }, call: 'Key holder: none listed', ph: '' },
  { id: 'rtu1', level: 'roof', x: 130, y: 110, cat: 'sys', name: 'Rooftop unit RTU-1', where: 'Serves Suites 101, 102, 201, 202', confirmed: 'Apr 2026', call: V.mech, ph: V.mechPh },
  { id: 'rtu2', level: 'roof', x: 470, y: 250, cat: 'sys', name: 'Rooftop unit RTU-2', where: 'Serves Suites 103, 104, 203, 204, lobby', confirmed: 'Apr 2026', call: V.mech, ph: V.mechPh },
  { id: 'drn', level: 'roof', x: 520, y: 70, cat: 'sys', name: 'Roof drain', where: 'Northeast corner', confirmed: 'Sep 2026', call: V.mech + ' (cleans quarterly)', ph: V.mechPh }
];

// Suites: position on the plan + tenant contacts
const SUITE_BOX = { 1: [40, 40, 160, 140], 4: [400, 40, 160, 140], 2: [40, 200, 160, 120], 3: [400, 200, 160, 120] };
const SUITES = {
  '101': { tenant: 'Harbin & Cole CPAs', contacts: [
    { role: 'Primary', name: 'Dana Harbin', ph: '(678) 555-0151', conf: 'Aug 2026' },
    { role: 'After hours', name: 'Dana Harbin (cell)', ph: '(404) 555-0152', conf: 'Aug 2026', ah: true } ] },
  '102': { tenant: 'Northfork Title', contacts: [
    { role: 'Primary', name: 'Luis Ortega', ph: '(770) 555-0161', conf: 'Jun 2026' },
    { role: 'After hours', name: 'Luis Ortega (cell)', ph: '(678) 555-0162', conf: 'Jun 2026', ah: true } ] },
  '103': { tenant: 'Ridgeway Dental', contacts: [
    { role: 'Primary', name: 'Dr. Amy Ridgeway', ph: '(770) 555-0171', conf: 'Mar 2026' },
    { role: 'After hours', name: 'Office manager (cell)', ph: '(470) 555-0172', conf: 'Mar 2026', ah: true } ] },
  '104': { tenant: 'Lumen Physical Therapy', contacts: [
    { role: 'Primary', name: 'Grace Lumen', ph: '(678) 555-0181', conf: 'Jul 2026' },
    { role: 'After hours', name: 'Grace Lumen (cell)', ph: '(404) 555-0182', conf: 'Jul 2026', ah: true } ] },
  '201': { tenant: 'Copperline Insurance', contacts: [
    { role: 'Primary', name: 'Ray Whitfield', ph: '(770) 555-0191', conf: 'May 2026' },
    { role: 'After hours', name: 'Ray Whitfield (cell)', ph: '(678) 555-0192', conf: 'May 2026', ah: true } ] },
  '202': { tenant: 'Aster Design Studio', contacts: [
    { role: 'Primary', name: 'Maya Chen', ph: '(404) 555-0131', conf: 'Sep 2026' },
    { role: 'After hours', name: 'Maya Chen (cell)', ph: '(404) 555-0132', conf: 'Sep 2026', ah: true } ] },
  '203': { tenant: 'Kessler Engineering', contacts: [
    { role: 'Primary', name: 'Tom Kessler', ph: '(770) 555-0141', conf: 'Jul 2026' },
    { role: 'After hours', name: 'Priya Nair (facilities, cell)', ph: '(678) 555-0144', conf: 'Jul 2026', ah: true },
    { role: 'Billing', name: 'J. Morris', ph: '(770) 555-0145', conf: 'Mar 2026', stale: true, issue: { list: 'Suite 203 billing contact: 6-month check due', why: 'Tenant contacts re-checked every 6 months · last Mar 2026', pill: 'due last month' } } ] },
  '204': { vacant: true, note: 'Vacant 74 days. Make-ready walk-through done in August.' }
};
const suiteLevel = (n) => n[0] === '1' ? 'f1' : 'f2';

const ABSENT = [];
const staleContacts = () => Object.entries(SUITES).flatMap(([n, s]) => (s.contacts || []).filter(c => c.stale && !state.confirmed.has('c' + n + c.role)).map(c => ({ n, c })));

const state = { level: 'site', sel: null, sit: null, step: 0, focus: 0, confirmed: new Set() };
// Leak walkthrough: step = furthest card revealed (0 none, 1 valve, 2 suite above,
// 3 plumber); focus = the card whose place is lit on the plan (click any revealed
// card to go back to it). The next card pulses until clicked.
// sel: { kind: 'feat'|'suite', id }

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const staleNow = (f) => !!f.issue && !state.confirmed.has(f.id);

function missingItems() {
  const out = ABSENT.map(a => ({ go: 'absent', id: a.id, level: a.level, title: a.title }));
  FEATURES.filter(staleNow).forEach(f => out.push({ go: 'feat', id: f.id, level: f.level, title: f.issue.list, why: f.issue.why, soon: f.issue.soon }));
  staleContacts().forEach(({ n, c }) => out.push({ go: 'suite', id: n, level: suiteLevel(n), title: c.issue.list, why: c.issue.why }));
  return out;
}

// --- plan drawing ---
const R = (x, y, w, h, cls, label, big) => `<rect class="room ${cls || ''}" x="${x}" y="${y}" width="${w}" height="${h}"/>` +
  (label ? `<text class="rlab ${big ? 'big' : ''}" x="${x + w / 2}" y="${cls === 'core' ? y + 16 : y + h / 2 + 4}">${label}</text>` : '');

function suiteShape(n) {
  const [x, y, w, h] = SUITE_BOX[n[2]];
  const s = SUITES[n];
  const on = (state.sel && state.sel.kind === 'suite' && state.sel.id === n) || (!state.sel && state.sit === 'leak' && state.focus === 2 && n === '202');
  return `<g class="suite ${s.vacant ? 'vac' : ''} ${on ? 'on' : ''}" data-suite="${n}" tabindex="0" role="button" aria-label="Suite ${n}${s.vacant ? ', vacant' : ', ' + esc(s.tenant)}">
    <rect class="room ${s.vacant ? 'vacant' : ''}" x="${x}" y="${y}" width="${w}" height="${h}"/>
    <text class="rlab big" x="${x + w / 2}" y="${y + h / 2 - 3}">Suite ${n}</text>
    <text class="rlab tn" x="${x + w / 2}" y="${y + h / 2 + 12}">${s.vacant ? 'Vacant' : esc(s.tenant)}</text></g>`;
}

function floor(n) {
  let g = ['1', '2', '3', '4'].map(k => suiteShape(n + '0' + k)).join('');
  g += R(220, 240, 160, 80, '', n === '1' ? 'Lobby' : 'Break room', true);
  g += R(220, 40, 50, 60, 'core', 'Stair A') + R(270, 40, 60, 60, 'core', 'Elev') + R(330, 40, 50, 60, 'core', 'Stair B');
  g += R(220, 100, 80, 60, 'core', n === '1' ? 'Fire ctrl' : 'Telecom') + R(300, 100, 80, 60, 'core', 'Electrical');
  g += R(220, 160, 160, 60, 'core', 'Restrooms');
  return g + `<rect class="outline" x="40" y="40" width="520" height="280"/>`;
}

function drawLevel(id) {
  const defs = `<defs><pattern id="ti-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#1F2A33"/><line class="hatchline" x1="0" y1="0" x2="0" y2="8"/></pattern></defs>`;
  if (id === 'f1') return defs + floor('1');
  if (id === 'f2') return defs + floor('2');
  if (id === 'roof') return defs + `<rect class="room" x="40" y="40" width="520" height="280"/>
      <rect class="roofbox" x="270" y="40" width="60" height="60"/><text class="rlab" x="300" y="74">Elev overrun</text>
      <rect class="roofbox" x="95" y="85" width="70" height="50"/><text class="rlab" x="130" y="150">RTU-1</text>
      <rect class="roofbox" x="435" y="225" width="70" height="50"/><text class="rlab" x="470" y="290">RTU-2</text>
      <text class="rlab big" x="300" y="200">Membrane roof · drains to NE</text>
      <rect class="outline" x="40" y="40" width="520" height="280"/>`;
  return defs + `<rect class="ground" x="0" y="0" width="600" height="380"/>
    <rect class="road" x="0" y="352" width="600" height="28"/><text class="roadlab" x="16" y="370">PARKWAY DRIVE</text>
    <rect class="pave" x="20" y="20" width="80" height="300"/><text class="rlab" x="60" y="200" transform="rotate(-90 60 196)">Parking</text>
    <rect class="room core" x="140" y="60" width="360" height="250"/><text class="rlab big" x="320" y="190">Bellwether Office Tower · 8 floors</text>
    <rect class="outline" x="140" y="60" width="360" height="250"/>
    <path d="M300 310 L300 352" stroke="rgba(233,228,216,0.25)" stroke-width="10"/>`;
}

function focusSet() {
  if (state.sel && state.sel.kind === 'feat') return new Set([state.sel.id]);
  if (state.sel && state.sel.kind === 'suite') return new Set();
  if (state.sit === 'leak') return state.focus === 1 || state.focus === 3 ? new Set(['v2']) : state.focus === 2 ? new Set() : null;
  if (state.sit === 'overdue') return new Set(FEATURES.filter(staleNow).map(f => f.id));
  return null; // just exploring: nothing dimmed
}

function symbol(f, focus) {
  const { x, y } = f;
  const dim = focus && !focus.has(f.id);
  const pulse = state.sit === 'overdue' && !state.sel && !dim;
  let shape;
  if (f.cat === 'sys') shape = `<path class="sym sys" d="M${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} L${x - 8} ${y} Z"/>`;
  else if (f.cat === 'acc') shape = `<path class="sym acc" d="M${x} ${y - 8} L${x + 8} ${y + 6} L${x - 8} ${y + 6} Z"/>`;
  else shape = `<circle class="sym safe" cx="${x}" cy="${y}" r="7"/>`;
  const on = (state.sel && state.sel.kind === 'feat' && state.sel.id === f.id) || (!state.sel && state.sit === 'leak' && (state.focus === 1 || state.focus === 3) && f.id === 'v2');
  return `<g class="feat ${on ? 'sel' : ''} ${dim ? 'dim' : ''}" data-id="${f.id}" tabindex="0" role="button" aria-label="${esc(f.name)}">
    <circle class="hit" cx="${x}" cy="${y}" r="16"/>${staleNow(f) ? `<circle class="stale-ring ${pulse ? 'pulse' : ''}" cx="${x}" cy="${y}" r="13"/>` : ''}<circle class="halo" cx="${x}" cy="${y}" r="11"/>${shape}</g>`;
}

// --- side panel ---
function phone(p) { return p ? `<span class="phone">${esc(p)}</span>` : ''; }

function panelSituation() {
  if (state.sit === 'leak') {
    const s = SUITES['202'], ah = s.contacts.find(c => c.ah);
    // One step at a time: a card shows its details once reached; the next one pulses.
    const card = (n, title, body) => {
      const st = n === state.focus ? 'now' : n <= state.step ? 'done' : n === state.step + 1 ? 'next' : 'later';
      return `<div class="step ${st}"><span class="n">${n}</span><button class="item lstep ${st === 'now' ? 'key' : ''}" data-step="${n}" ${st === 'later' ? 'disabled' : ''} aria-expanded="${n <= state.step}">
        <span class="t">${title}</span>${n <= state.step ? body : (st === 'next' ? '<span class="m tap">Tap for the next step</span>' : '')}</button></div>`;
    };
    return `<p class="kicker">2:10 a.m. · Suite 102</p>
      <h3>Water from above. Stop it, find it, fix it.</h3>
      ${card(1, 'On-call tech shuts the Floor 2 water valve', `<span class="m">Restroom chase, access panel behind the sink wall · confirmed Apr 2026</span>`)}
      ${card(2, `Suite 202 is directly above · ${esc(s.tenant)}`, `<span class="m">Most likely source. To get in after hours: ${esc(ah.name)}</span>${phone(ah.ph)}`)}
      ${card(3, `Plumber · ${V.plumb} repairs it`, `<span class="m">Meets the tech at the valve · 24-hour line · confirmed Apr 2026</span>${phone(V.plumbPh)}`)}
      ${state.step >= 3 ? '<p class="why">The drawings never showed that valve. Your tech knew. Now the map does too.</p>' : ''}
      ${state.step >= 1 ? '<button class="back restart" data-restart>↺ Start over</button>' : ''}`;
  }
  if (state.sit === 'afterhours') return panelSuite('203', 'Saturday · alarm company calling');
  return panelMissing('Monday morning');
}

function panelSuite(n, kicker) {
  const s = SUITES[n];
  if (s.vacant) return `<button class="back" data-back>← Back</button><p class="kicker">${levelName(suiteLevel(n))}</p><h3>Suite ${n} · Vacant</h3><p class="sub">${esc(s.note)}</p>`;
  const rows = s.contacts.map(c => {
    const stale = c.stale && !state.confirmed.has('c' + n + c.role);
    return `<li class="item ${c.ah ? 'key' : ''}"><span class="t">${esc(c.role)}${c.ah ? '<span class="pill ah">call this one</span>' : ''}</span>
      <span class="m">${esc(c.name)}</span>${phone(c.ph)}
      <span class="m">Confirmed ${state.confirmed.has('c' + n + c.role) ? 'today' : esc(c.conf)}${stale ? `<span class="pill stale">${esc(c.issue.pill)}</span>` : ''}</span>${stale ? `<span class="m">${esc(c.issue.why)}</span>` : ''}
      ${stale ? `<button class="go" data-confirm-contact="${n}|${esc(c.role)}">Mark confirmed today →</button>` : ''}</li>`;
  }).join('');
  return `${kicker ? '' : '<button class="back" data-back>← Back</button>'}
    <p class="kicker">${esc(kicker || levelName(suiteLevel(n)))}</p>
    <h3>Suite ${n} · ${esc(s.tenant)}</h3>
    <ul class="list">${rows}</ul>
    `;
}

function panelFeature(id) {
  const f = FEATURES.find(x => x.id === id);
  const stale = staleNow(f);
  return `<button class="back" data-back>← Back</button>
    <p class="kicker">${levelName(f.level)}</p>
    <h3>${esc(f.name)}</h3>
    <dl class="kv">
      <dt>Where</dt><dd>${esc(f.where)}</dd>
      <dt>Who to call</dt><dd>${esc(f.call)}${f.ph ? '<br>' + phone(f.ph) : ''}</dd>
      <dt>${f.issue ? 'Last done' : 'Confirmed'}</dt><dd>${state.confirmed.has(f.id) ? 'Today' : esc(f.confirmed)}<span class="pill ${stale ? (f.issue.soon ? 'soon' : 'stale') : 'ok'}">${stale ? esc(f.issue.pill) : 'current'}</span></dd>
      ${stale ? `<dt>Rule</dt><dd>${esc(f.issue.why)}</dd>` : ''}
    </dl>
    ${stale ? `<button class="rec primary" data-confirm-feat="${f.id}">${esc(f.issue.action)} today</button>` : ''}`;
}

function panelMissing(kicker) {
  const items = missingItems();
  return `${kicker ? `<p class="kicker">${kicker}</p>` : ''}
    <h3>What's missing<span class="count ${items.length ? '' : 'ok'}">${items.length ? items.length + ' to check' : 'all clear'}</span></h3>
    <ul class="list">${items.map(m => `<li><button class="item" data-goto="${m.go}:${m.id}"><span class="t">${esc(m.title)}</span><span class="m">${m.why ? esc(m.why) + ' · ' : ''}${levelName(m.level)}</span></button></li>`).join('')}</ul>
    <p class="why">Most buildings can't produce this list at all.</p>`;
}

function panelStart() {
  return `<p class="kicker">Start here</p>
    <h3>Pick a situation above, or tap the plan.</h3>
    <p class="sub">Suites show tenant contacts. Symbols show equipment and who services it.</p>`;
}

function renderSide() {
  let html;
  if (state.sel && state.sel.kind === 'feat') html = panelFeature(state.sel.id);
  else if (state.sel && state.sel.kind === 'suite') html = panelSuite(state.sel.id, state.sit === 'afterhours' && state.sel.id === '203' ? 'Saturday · alarm company calling' : null);
  else if (state.sit) html = panelSituation();
  else html = panelStart();
  $('ti-side').innerHTML = html;
}

function renderTabs() {
  const flagged = new Set(missingItems().map(m => m.level));
  $('ti-tabs').innerHTML = LEVELS.map(l => `<button class="tab" role="tab" id="ti-tab-${l.id}" aria-selected="${l.id === state.level}" data-level="${l.id}">${l.name}${flagged.has(l.id) ? '<span class="dot"></span>' : ''}</button>`).join('');
}
function renderPlan() {
  $('ti-plan').innerHTML = drawLevel(state.level) + FEATURES.filter(f => f.level === state.level).map(f => symbol(f, focusSet())).join('');
  $('ti-plan').setAttribute('aria-label', 'Plan of ' + levelName(state.level));
}
function renderSits() { document.querySelectorAll('#try-it .sit').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sit === state.sit))); }
function render() { renderSits(); renderTabs(); renderPlan(); renderSide(); }

function toast(msg) { const t = $('ti-toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, 3400); }

function goto(spec) {
  const [kind, id] = spec.split(':');
  if (kind === 'feat') { const f = FEATURES.find(x => x.id === id); state.level = f.level; state.sel = { kind, id }; }
  else if (kind === 'suite') { state.level = suiteLevel(id); state.sel = { kind, id }; }
  else if (kind === 'absent') { state.level = 'site'; state.sel = null; }
}

function startSituation(sit) {
  state.sit = sit;
  if (sit === 'leak') { state.level = 'f2'; state.sel = null; state.step = 0; state.focus = 0; }
  if (sit === 'afterhours') { state.level = 'f2'; state.sel = { kind: 'suite', id: '203' }; }
  if (sit === 'overdue') { state.level = 'site'; state.sel = null; }
  render();
}

// --- events ---
$('ti-situations').addEventListener('click', e => { const b = e.target.closest('[data-sit]'); if (b) startSituation(b.dataset.sit); });
$('ti-tabs').addEventListener('click', e => { const b = e.target.closest('[data-level]'); if (!b) return; state.level = b.dataset.level; state.sel = null; render(); });
function planPick(e) {
  const f = e.target.closest('.feat'); const s = e.target.closest('.suite');
  if (f) state.sel = { kind: 'feat', id: f.dataset.id };
  else if (s) state.sel = { kind: 'suite', id: s.dataset.suite };
  else return false;
  render(); return true;
}
$('ti-plan').addEventListener('click', planPick);
$('ti-plan').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && planPick(e)) e.preventDefault(); });
$('ti-side').addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.hasAttribute('data-back')) { state.sel = null; render(); }
  else if (t.dataset.goto) { goto(t.dataset.goto); render(); }
  else if (t.dataset.sitgo) startSituation(t.dataset.sitgo);
  else if (t.dataset.step) { state.step = Math.max(state.step, Number(t.dataset.step)); state.focus = Number(t.dataset.step); state.level = 'f2'; state.sel = null; render(); }
  else if (t.hasAttribute('data-restart')) startSituation('leak');
  else if (t.dataset.confirmFeat) { state.confirmed.add(t.dataset.confirmFeat); toast('Recorded today. It is off the list.'); render(); }
  else if (t.dataset.confirmContact) { const [n, role] = t.dataset.confirmContact.split('|'); state.confirmed.add('c' + n + role); toast('Contact confirmed today.'); render(); }
});
render();

})();
