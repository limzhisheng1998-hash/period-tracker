import { todayKey, addDays, diffDays, toNum, fmt, fmtLong, analyze, monthGrid, shiftMonth, findPatterns, isValidKey } from './cycle.js';
import { PHASES, PHASE_ORDER, FLOWS, MOODS, SYMPTOMS, DOCTOR_SIGNS } from './content.js';
import { kitty } from './mascot.js';
import { jokeForDay } from './jokes.js';
import * as store from './store.js';

let data = store.load();
const ui = { tab: 'home', month: null, sheet: null, ob: null, jokeShown: null };

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const pick = (arr, seed) => arr[Math.abs(seed) % arr.length];
const LABELS = {
  sym: { ...Object.fromEntries(SYMPTOMS.map((s) => [s.id, s.label.toLowerCase()])), headache: 'headaches', tired: 'tired', acne: 'pimples' },
  mood: Object.fromEntries(MOODS.map((s) => [s.id, s.label.toLowerCase()])),
};

function persist() {
  if (!store.save(data)) toast('⚠️ Could not save. Is your phone storage full?');
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2400);
}

// ---------- phase helpers
function phaseInfo(A) {
  return A.phase === 'none' ? null : PHASES[A.phase];
}
function seedFor(A) {
  return toNum(A.today) + (A.phase || '').length;
}
function mascotMessage(A) {
  if (!A.hasData) return 'Hi, I am Mochi! Log your period and I will predict the next one for you 💗';
  return pick(PHASES[A.phase].mascot, seedFor(A));
}
function forecast(A) {
  if (!A.hasData) return '🌤️ Forecast loading… log your first period to unlock it!';
  return pick(PHASES[A.phase].forecasts, seedFor(A) + 1);
}

// ---------- kit resets itself each cycle
function syncKit(A) {
  const cycle = A.last ? A.last.start : null;
  if (data.kit.cycle !== cycle) {
    data.kit.cycle = cycle;
    data.kit.checked = {};
    persist();
  }
}

// ---------- render
function render() {
  const A = analyze(data, todayKey());
  syncKit(A);
  const views = { home: viewHome, calendar: viewCalendar, insights: viewInsights, tips: viewTips, me: viewMe };
  $('#view').innerHTML = views[ui.tab](A);
  document.querySelectorAll('.nav button').forEach((b) => b.classList.toggle('active', b.dataset.tab === ui.tab));
  if (ui.sheet) renderSheet(A);
}

// ---------- HOME
function viewHome(A) {
  const P = phaseInfo(A);
  const today = A.today;
  const hello = data.name ? `Hi ${esc(data.name)} 🌸` : 'Hi there 🌸';
  let big = '🐾';
  let small = 'no data yet';
  let sub = 'Tap the button below when your period starts.';

  if (A.hasData) {
    if (A.inPeriod) {
      big = `Day ${A.periodDayNum}`;
      small = 'of your period';
    } else if (A.daysLate > 0) {
      big = plural(A.daysLate, 'day');
      small = 'late';
    } else if (A.daysUntil === 0) {
      big = 'Today';
      small = 'period expected';
    } else {
      big = plural(A.daysUntil, 'day');
      small = 'until your period';
    }
    sub = `Cycle day ${A.cycleDay} · ${P.emoji} ${P.name}`;
    if (!A.inPeriod) sub += `<br>${A.daysLate > 0 ? 'Was expected' : 'Next period'}: <b>${fmtLong(A.nextStart)}</b>`;
  }

  let buttons = '';
  if (A.askContinue) {
    buttons = `<p class="ask">Still on your period today?</p>
      <div class="row2"><button class="btn primary" data-act="period-yes">Yes 🩸</button><button class="btn soft" data-act="period-ended">It ended ✨</button></div>`;
  } else if (A.periodToday) {
    buttons = `<div class="row2"><button class="btn soft" data-act="log-today">✏️ Log today</button><button class="btn soft" data-act="period-ended">✨ Period ended</button></div>`;
  } else {
    buttons = `<button class="btn primary big-btn" data-act="period-start">🩸 My period started today</button>
      <button class="btn soft" data-act="log-today">✏️ Log how I feel today</button>`;
  }

  let html = `<header class="top"><div><h1>${hello}</h1><p class="muted">${fmt(today, { weekday: 'long', day: 'numeric', month: 'long' })}</p></div></header>`;

  if (isIOS() && !isStandalone() && !data.hideInstall) {
    html += `<section class="card install">
      <button class="x" data-act="dismiss-install" aria-label="Hide">×</button>
      <h3>📲 Add Mochi to your Home Screen</h3>
      <ol><li>Tap the <b>Share</b> button <span class="share-ico">⬆️</span> in Safari</li><li>Scroll and tap <b>Add to Home Screen</b></li><li>Open Mochi from the new icon</li></ol>
      <p class="tiny">Tip: install first, then enter your data inside the installed app. Data typed in Safari does not move over.</p>
    </section>`;
  }

  html += `<section class="card hero phase-${A.phase}">
    <div class="hero-top">
      <div class="ring"><div class="big">${big}</div><div class="small">${small}</div></div>
      <div class="hero-kitty">${kitty(P ? P.mood : 'none', 128)}</div>
    </div>
    <div class="bubble">${esc(mascotMessage(A))}</div>
    <p class="hero-sub">${sub}</p>
    ${buttons}
  </section>`;

  if (A.hasData && A.isLate) {
    html += `<section class="card alert">
      <h3>⏰ Your period is ${plural(A.daysLate, 'day')} late</h3>
      <p>${esc(PHASES.late.about)}</p>
      <ul>${PHASES.late.watch.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <ul>${PHASES.late.care.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </section>`;
  } else if (A.hasData && A.daysLate > 0) {
    html += `<section class="card note">🕐 Your period was expected ${plural(A.daysLate, 'day')} ago. Small delays are normal. I'll tell you if it gets later than ${data.settings.lateAfter} days.</section>`;
  }

  if (A.hasData && data.settings.showFertility && !A.inPeriod && !A.isLate) {
    if (A.ovulationToday) html += `<section class="card fertile-chip">🌼 <b>Ovulation day</b> (estimate). Highest chance of pregnancy today.</section>`;
    else if (A.phase === 'fertile') html += `<section class="card fertile-chip">🌼 <b>Fertile window</b> until ${fmt(A.fertileEnd)}. Ovulation around ${fmt(A.ovulation)}.</section>`;
    else if (toNum(A.fertileStart) > toNum(A.today)) html += `<section class="card fertile-chip soft">🌼 Next fertile window: ${fmt(A.fertileStart)} – ${fmt(A.fertileEnd)}</section>`;
  }

  html += `<section class="card forecast"><h3>Today's cycle forecast</h3><p class="fc">${esc(forecast(A))}</p></section>`;

  const joke = jokeForDay(toNum(today));
  const shown = ui.jokeShown === today;
  html += `<section class="card joke" lang="${joke.lang === 'zh' ? 'zh' : 'en'}">
    <h3>${joke.lang === 'zh' ? '😹 Mochi 每日一笑' : '😹 Mochi\'s joke of the day'} <span class="joke-no">#${joke.number}/365</span></h3>
    <p class="joke-q">${esc(joke.q)}</p>
    ${shown ? `<p class="joke-a">${esc(joke.a)}</p>` : `<button class="btn soft" data-act="joke-reveal">${joke.lang === 'zh' ? '🥁 揭晓答案' : '🥁 Tell me!'}</button>`}
  </section>`;

  if (P && A.phase !== 'late') {
    const title = A.phase === 'pms' ? '🌙 Period coming soon. Get ready!' : `${P.emoji} Tips for today`;
    html += `<section class="card tips-mini">
      <h3>${title}</h3>
      <h4>👀 Watch out for</h4><div class="chips static">${P.watch.slice(0, 5).map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>
      <h4>🥗 Eat more</h4><ul>${P.eat.slice(0, 3).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <h4>🙅 Go easy on</h4><ul>${P.avoid.slice(0, 3).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <button class="link" data-act="tab" data-tab="tips">See all tips →</button>
    </section>`;
  }

  if (A.hasData && (A.phase === 'pms' || A.phase === 'late' || (!A.inPeriod && A.daysUntil <= 7))) {
    const total = data.kit.items.length;
    const done = data.kit.items.filter((i) => data.kit.checked[i.id]).length;
    html += `<section class="card kit-card" data-act="open-kit" role="button">
      <h3>🎒 Comfort kit: ${done}/${total} ready</h3>
      <p class="muted">${done === total ? 'All set! You are prepared 💪' : 'Restock before your period arrives. Tap to check.'}</p>
      <div class="bar"><span style="width:${total ? (done / total) * 100 : 0}%"></span></div>
    </section>`;
  }

  html += `<section class="card partner-card" data-act="open-partner" role="button">
    <h3>💌 Partner view</h3><p class="muted">Send someone a cute update so they know how to help.</p>
  </section>`;

  const daysSinceBackup = data.lastBackup ? diffDays(data.lastBackup, today) : null;
  if (A.hasData && (daysSinceBackup === null || daysSinceBackup > 30)) {
    html += `<section class="card note">💾 ${data.lastBackup ? "It's been a while since" : "You haven't made"} a backup. <button class="link" data-act="backup">Save a backup now</button></section>`;
  }

  html += `<p class="disclaimer">Predictions are estimates, not medical advice, and not birth control.</p>`;
  return html;
}

// ---------- CALENDAR
function viewCalendar(A) {
  const ym = ui.month || A.today.slice(0, 7);
  const [y, m] = ym.split('-').map(Number);
  const title = new Date(y, m - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const actual = new Set(data.periodDays);
  const showF = data.settings.showFertility;
  const tNum = toNum(A.today);

  let cells = '';
  for (const week of monthGrid(ym)) {
    for (const k of week) {
      const cls = ['day'];
      if (k.slice(0, 7) !== ym) cls.push('other');
      if (actual.has(k)) cls.push('period');
      else if (A.predicted.has(k)) cls.push('predicted');
      else if (showF && A.ovulationDays.has(k)) cls.push('ovulation');
      else if (showF && A.fertile.has(k)) cls.push('fertile');
      if (k === A.today) cls.push('today');
      if (toNum(k) > tNum) cls.push('future');
      const log = data.logs[k];
      const hasLog = log && ((log.mood || []).length || (log.symptoms || []).length || log.notes);
      cells += `<button class="${cls.join(' ')}" data-act="open-day" data-key="${k}" aria-label="${fmtLong(k)}">${Number(k.slice(8))}${hasLog ? '<i class="dot"></i>' : ''}</button>`;
    }
  }

  return `<header class="top"><h1>Calendar 📅</h1></header>
  <section class="card cal">
    <div class="cal-head">
      <button class="icon-btn" data-act="cal-move" data-n="-1" aria-label="Previous month">‹</button>
      <button class="cal-title" data-act="cal-today">${title}</button>
      <button class="icon-btn" data-act="cal-move" data-n="1" aria-label="Next month">›</button>
    </div>
    <div class="dow">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<span>${d}</span>`).join('')}</div>
    <div class="grid">${cells}</div>
    <div class="legend">
      <span><i class="lg period"></i>Period</span>
      <span><i class="lg predicted"></i>Predicted</span>
      ${showF ? '<span><i class="lg fertile"></i>Fertile</span><span><i class="lg ovulation"></i>Ovulation</span>' : ''}
      <span><i class="lg logdot"></i>Has notes</span>
    </div>
  </section>
  <p class="muted center">Tap any day to log your period, mood or symptoms.</p>
  <button class="btn soft" data-act="open-add-period">➕ Add a past period (start & end date)</button>`;
}

// ---------- INSIGHTS
function viewInsights(A) {
  const s = A.stats;
  let regular = '–';
  if (s.variation !== null) regular = s.variation <= 7 ? 'Regular 🌟' : 'Irregular 🌀';
  let html = `<header class="top"><h1>My insights 📊</h1></header>
  <section class="stats">
    <div class="stat"><b>${A.avgCycle}</b><span>avg cycle (days)</span></div>
    <div class="stat"><b>${A.avgPeriod}</b><span>avg period (days)</span></div>
    <div class="stat"><b>${s.cyclesLogged}</b><span>cycles logged</span></div>
    <div class="stat"><b class="sm">${regular}</b><span>cycle pattern</span></div>
  </section>`;

  if (A.usingDefaults) html += `<p class="card note">ℹ️ Log at least 2 periods to see your own averages. Until then I use your settings (${data.settings.cycleLength}-day cycle).</p>`;

  const flags = [];
  if (s.cyclesLogged >= 2 && A.avgCycle < 21) flags.push('Your average cycle is shorter than 21 days.');
  if (s.cyclesLogged >= 2 && A.avgCycle > 35) flags.push('Your average cycle is longer than 35 days.');
  if (A.avgPeriod > 7 && !A.usingDefaults) flags.push('Your periods usually last more than 7 days.');
  if (s.variation !== null && s.variation > 7) flags.push(`Your cycle length changes by up to ${s.variation} days. This is common, but mention it to a doctor if it keeps happening.`);
  if (flags.length) html += `<section class="card alert soft"><h3>🩺 Worth mentioning to a doctor</h3><ul>${flags.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></section>`;

  // Patterns
  const pats = findPatterns(data, A.periods, LABELS);
  html += `<section class="card"><h3>🔍 Pattern spotter</h3>`;
  if (pats.length) html += `<ul class="patterns">${pats.map((p) => `<li>${esc(p.text)} <span class="muted">(${p.cycles} cycles)</span></li>`).join('')}</ul>`;
  else html += `<p class="muted">Keep logging your moods and symptoms. After 2 or more cycles I'll spot your personal patterns, like "You often get headaches before your period".</p>`;
  html += `</section>`;

  // History
  html += `<section class="card"><h3>🗓️ Cycle history</h3>`;
  if (!A.periods.length) html += `<p class="muted">No periods logged yet.</p>`;
  else {
    const maxLen = Math.max(35, ...A.cycles.map((c) => c.length));
    html += `<div class="history">`;
    [...A.periods].reverse().slice(0, 12).forEach((p) => {
      const idx = A.periods.indexOf(p);
      const cyc = A.cycles[idx];
      const len = cyc ? cyc.length : diffDays(p.start, A.today) + 1;
      html += `<div class="hrow">
        <div class="hlabel"><b>${fmt(p.start)}</b> <span class="muted">${plural(p.length, 'day')} period · ${cyc ? `${cyc.length}-day cycle` : 'current'}</span></div>
        <div class="hbar"><span class="hp" style="width:${(p.length / maxLen) * 100}%"></span><span class="hc" style="width:${(Math.max(0, len - p.length) / maxLen) * 100}%"></span></div>
      </div>`;
    });
    html += `</div>`;
  }
  html += `</section>`;

  // Top symptoms
  const counts = {};
  Object.values(data.logs).forEach((l) => (l.symptoms || []).forEach((x) => (counts[x] = (counts[x] || 0) + 1)));
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (top.length) {
    const max = top[0][1];
    html += `<section class="card"><h3>😣 Most common symptoms</h3>${top
      .map(([id, n]) => {
        const sy = SYMPTOMS.find((x) => x.id === id);
        return sy ? `<div class="symrow"><span>${sy.emoji} ${sy.label}</span><div class="bar"><span style="width:${(n / max) * 100}%"></span></div><b>${n}</b></div>` : '';
      })
      .join('')}</section>`;
  }

  html += `<button class="btn primary" data-act="open-doctor">🩺 Make a summary for my doctor</button>`;
  return html;
}

// ---------- TIPS
function tipBlock(P) {
  const list = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  return `<p>${esc(P.about)}</p>
    <h4>👀 Watch out for</h4>${list(P.watch)}
    <h4>🥗 Eat more</h4>${list(P.eat)}
    <h4>🙅 Go easy on</h4>${list(P.avoid)}
    <h4>💆 Self-care</h4>${list(P.care)}`;
}
function viewTips(A) {
  const current = A.phase !== 'none' ? A.phase : null;
  let html = `<header class="top"><h1>Tips 💡</h1></header>`;
  if (current) {
    const P = PHASES[current];
    html += `<section class="card current-tip phase-${current}"><p class="tag">Right now</p><h2>${P.emoji} ${P.name}</h2>${tipBlock(P)}</section>`;
  }
  html += `<h3 class="section-title">All cycle phases</h3>`;
  for (const id of PHASE_ORDER) {
    if (id === current) continue;
    if (id === 'fertile' && !data.settings.showFertility) continue;
    const P = PHASES[id];
    html += `<details class="card"><summary>${P.emoji} ${P.name}</summary>${tipBlock(P)}</details>`;
  }
  html += `<section class="card alert soft"><h3>🩺 See a doctor if…</h3><ul>${DOCTOR_SIGNS.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
  <p class="disclaimer">These tips are general information, not medical advice.</p>`;
  return html;
}

// ---------- ME / SETTINGS
function viewMe() {
  const s = data.settings;
  return `<header class="top"><h1>Me & settings ⚙️</h1></header>
  <section class="card form">
    <label>Your name (for greetings & partner updates)<input type="text" maxlength="30" data-setting="name" value="${esc(data.name)}" placeholder="e.g. Mei"></label>
    <label>Usual cycle length (days)<input type="number" inputmode="numeric" min="18" max="60" data-setting="cycleLength" value="${s.cycleLength}"></label>
    <label>Usual period length (days)<input type="number" inputmode="numeric" min="1" max="12" data-setting="periodLength" value="${s.periodLength}"></label>
    <label>Tell me it's "late" after (days)<input type="number" inputmode="numeric" min="1" max="20" data-setting="lateAfter" value="${s.lateAfter}"></label>
    <p class="tiny">Once you've logged 2 or more periods, the app uses your real averages instead of these numbers.</p>
    <div class="switch-row"><span>🌼 Show fertile window & ovulation</span><button class="switch ${s.showFertility ? 'on' : ''}" data-act="toggle-fertility" aria-pressed="${s.showFertility}"><i></i></button></div>
  </section>
  <section class="card list">
    <button class="row" data-act="open-kit">🎒 Comfort kit checklist <span>›</span></button>
    <button class="row" data-act="open-partner">💌 Partner view <span>›</span></button>
    <button class="row" data-act="open-doctor">🩺 Doctor summary <span>›</span></button>
  </section>
  <section class="card">
    <h3>🔒 Your privacy</h3>
    <p>All your data is saved <b>only on this phone</b>. There's no account and no server, and nobody else can see it.</p>
    <p class="tiny">Because of that, deleting the app or resetting your phone deletes your data. Save a backup now and then (e.g. to Files, iCloud Drive or Google Drive).</p>
    <div class="row2"><button class="btn soft" data-act="backup">💾 Save backup</button><button class="btn soft" data-act="restore">📂 Load backup</button></div>
    <p class="tiny">${data.lastBackup ? `Last backup: ${fmtLong(data.lastBackup)}` : 'No backup yet.'}</p>
    <input type="file" id="restore-file" accept="application/json,.json" hidden>
  </section>
  <section class="card">
    <h3>📲 Install on iPhone</h3>
    <ol><li>Open this website in <b>Safari</b></li><li>Tap <b>Share</b> ⬆️ → <b>Add to Home Screen</b></li><li>Open Mochi from the new icon</li></ol>
  </section>
  <button class="btn danger" data-act="erase">🗑️ Delete all my data</button>
  <p class="disclaimer">Mochi Period Tracker 🐱 · Made just for you · Predictions are estimates, not medical advice and not birth control.</p>`;
}

// ---------- SHEETS (pop-up panels)
function openSheet(type, opts = {}) {
  ui.sheet = { type, ...opts };
  document.body.classList.add('sheet-open');
  renderSheet(analyze(data, todayKey()));
  $('#sheet .sheet-body').scrollTop = 0;
}
function closeSheet() {
  if (ui.sheet?.type === 'onboarding') return;
  ui.sheet = null;
  document.body.classList.remove('sheet-open');
  render();
}
function renderSheet(A) {
  const body = $('#sheet .sheet-body');
  const scroll = body.scrollTop;
  const s = ui.sheet;
  const r = { day: sheetDay, kit: sheetKit, partner: sheetPartner, doctor: sheetDoctor, addPeriod: sheetAddPeriod, onboarding: sheetOnboarding }[s.type];
  $('#sheet').classList.toggle('full', s.type === 'onboarding' || s.type === 'doctor');
  $('#sheet .sheet-close').hidden = s.type === 'onboarding';
  body.innerHTML = r(A, s);
  body.scrollTop = scroll;
}

function chips(list, selected, act) {
  return `<div class="chips">${list.map((x) => `<button class="chip ${selected.includes(x.id) ? 'on' : ''}" data-act="${act}" data-val="${x.id}">${x.emoji} ${x.label}</button>`).join('')}</div>`;
}

function sheetDay(A, s) {
  const k = s.key;
  const log = data.logs[k] || {};
  const isPeriod = data.periodDays.includes(k);
  const future = toNum(k) > toNum(A.today);
  let status = '';
  if (A.predicted.has(k)) status = '🩷 Predicted period day';
  else if (data.settings.showFertility && A.ovulationDays.has(k)) status = '🌼 Estimated ovulation day';
  else if (data.settings.showFertility && A.fertile.has(k)) status = '🌼 Fertile window';
  let html = `<h2>${fmt(k, { weekday: 'long', day: 'numeric', month: 'long' })}</h2>${status ? `<p class="muted">${status}</p>` : ''}`;
  if (!future) {
    html += `<div class="switch-row big"><span>🩸 Period day</span><button class="switch ${isPeriod ? 'on' : ''}" data-act="toggle-period" aria-pressed="${isPeriod}"><i></i></button></div>`;
    if (isPeriod) html += `<h4>Flow</h4>${chips(FLOWS, log.flow ? [log.flow] : [], 'flow')}`;
    html += `<h4>Mood</h4>${chips(MOODS, log.mood || [], 'mood')}<h4>Symptoms</h4>${chips(SYMPTOMS, log.symptoms || [], 'sym')}`;
  } else {
    html += `<p class="muted">This day is in the future. You can still add a note (e.g. a trip or exam).</p>`;
  }
  html += `<h4>Notes</h4><textarea data-note="${k}" rows="3" maxlength="500" placeholder="Anything to remember…">${esc(log.notes || '')}</textarea>
  <button class="btn primary" data-act="close-sheet">Done ✓</button>`;
  return html;
}

function sheetKit() {
  return `<h2>🎒 Comfort kit</h2><p class="muted">Tick what you have ready. The ticks reset each new cycle.</p>
  <div class="kit">${data.kit.items
    .map((i) => `<div class="kit-item ${data.kit.checked[i.id] ? 'done' : ''}"><button class="check" data-act="kit-check" data-id="${i.id}" aria-pressed="${!!data.kit.checked[i.id]}">${data.kit.checked[i.id] ? '✓' : ''}</button><span>${esc(i.text)}</span><button class="x" data-act="kit-del" data-id="${i.id}" aria-label="Remove">×</button></div>`)
    .join('')}</div>
  <div class="add-row"><input type="text" id="kit-new" maxlength="60" placeholder="Add an item…"><button class="btn soft" data-act="kit-add">Add</button></div>
  <button class="btn primary" data-act="close-sheet">Done ✓</button>`;
}

// ---- partner
function partnerInfo(A) {
  return { n: data.name || '', p: A.phase, d: A.periodDayNum || 0, u: A.daysUntil ?? 0, l: A.daysLate || 0, t: A.today };
}
function partnerHeadline(info) {
  switch (info.p) {
    case 'period': return `Period day ${info.d} 🩸`;
    case 'late': return `Period is ${plural(info.l, 'day')} late ⏰`;
    case 'pms': return info.l > 0 ? 'Period is due any day now 🌙' : info.u === 0 ? 'Period expected today 🌙' : `Period expected in ${plural(info.u, 'day')} 🌙`;
    case 'none': return 'No cycle data yet 🐾';
    default: return `${PHASES[info.p].emoji} ${PHASES[info.p].name} · period in ${plural(info.u, 'day')}`;
  }
}
function partnerCard(info) {
  const P = PHASES[info.p];
  const who = info.n ? `${esc(info.n)}'s` : 'Cycle';
  return `<div class="partner-view phase-${info.p}">
    ${kitty(P ? P.mood : 'none', 110)}
    <p class="tag">${who} update · ${fmtLong(info.t)}</p>
    <h2>${esc(partnerHeadline(info))}</h2>
    ${P ? `<p class="fc">${esc(pick(P.forecasts, toNum(info.t) + info.p.length + 1))}</p>
    <h4>How you can help 💗</h4><ul>${P.partner.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
  </div>`;
}
function encodeInfo(info) {
  const bytes = new TextEncoder().encode(JSON.stringify(info));
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function decodeInfo(str) {
  try {
    const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const obj = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
    if (!(obj.p in PHASES || obj.p === 'none') || !isValidKey(obj.t)) return null;
    return { n: String(obj.n || '').slice(0, 30), p: obj.p, d: +obj.d || 0, u: +obj.u || 0, l: +obj.l || 0, t: obj.t };
  } catch {
    return null;
  }
}
function partnerLink(info) {
  return `${location.origin}${location.pathname}#partner=${encodeInfo(info)}`;
}
function sheetPartner(A) {
  const info = partnerInfo(A);
  return `<h2>💌 Partner view</h2>
  <p class="muted">Show this screen, or send a link. The link only contains what you see below (no notes, symptoms or history).</p>
  ${partnerCard(info)}
  <button class="btn primary" data-act="share-partner">📤 Send update</button>
  <button class="btn soft" data-act="close-sheet">Close</button>`;
}

// ---- doctor summary
function doctorData(A) {
  const symCounts = {};
  const moodCounts = {};
  const notes = [];
  const since = addDays(A.today, -120);
  for (const [k, l] of Object.entries(data.logs)) {
    (l.symptoms || []).forEach((x) => (symCounts[x] = (symCounts[x] || 0) + 1));
    (l.mood || []).forEach((x) => (moodCounts[x] = (moodCounts[x] || 0) + 1));
    if (l.notes && k >= since) notes.push([k, l.notes]);
  }
  notes.sort((a, b) => (a[0] < b[0] ? 1 : -1));
  const rows = A.periods.map((p, i) => ({ ...p, cycle: A.cycles[i]?.length ?? null })).reverse().slice(0, 12);
  const top = (obj, list) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([id, n]) => `${list.find((x) => x.id === id)?.label || id} (${n}×)`);
  return { rows, syms: top(symCounts, SYMPTOMS), moods: top(moodCounts, MOODS), notes: notes.slice(0, 15) };
}
function doctorHTML(A) {
  const D = doctorData(A);
  const s = A.stats;
  return `<div class="doctor">
    <h2>Menstrual cycle summary</h2>
    <p>${data.name ? `Name: <b>${esc(data.name)}</b> · ` : ''}Generated: ${fmt(A.today, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    <table class="kv">
      <tr><td>Average cycle length</td><td><b>${A.avgCycle} days</b>${A.usingDefaults ? ' (not enough data)' : ''}</td></tr>
      <tr><td>Shortest / longest cycle</td><td>${s.shortest ?? '–'} / ${s.longest ?? '–'} days</td></tr>
      <tr><td>Average period length</td><td>${A.avgPeriod} days</td></tr>
      <tr><td>Cycles logged</td><td>${s.cyclesLogged}</td></tr>
      ${A.hasData ? `<tr><td>Last period started</td><td>${fmt(A.last.start, { day: 'numeric', month: 'short', year: 'numeric' })}</td></tr>` : ''}
      ${A.hasData && A.daysLate ? `<tr><td>Currently late by</td><td>${plural(A.daysLate, 'day')}</td></tr>` : ''}
    </table>
    <h3>Recent periods</h3>
    ${D.rows.length ? `<table class="tbl"><tr><th>Start</th><th>End</th><th>Days</th><th>Cycle</th></tr>${D.rows.map((r) => `<tr><td>${fmt(r.start, { day: 'numeric', month: 'short', year: '2-digit' })}</td><td>${fmt(r.end, { day: 'numeric', month: 'short' })}</td><td>${r.length}</td><td>${r.cycle ?? '–'}</td></tr>`).join('')}</table>` : '<p>No periods logged.</p>'}
    <h3>Most logged symptoms</h3><p>${D.syms.length ? esc(D.syms.join(', ')) : 'None logged'}</p>
    <h3>Most logged moods</h3><p>${D.moods.length ? esc(D.moods.join(', ')) : 'None logged'}</p>
    ${D.notes.length ? `<h3>Notes (last 4 months)</h3><ul>${D.notes.map(([k, n]) => `<li><b>${fmt(k)}:</b> ${esc(n)}</li>`).join('')}</ul>` : ''}
    <p class="tiny">Self-recorded data from a personal tracking app.</p>
  </div>`;
}
function doctorText(A) {
  const D = doctorData(A);
  const lines = [
    'Menstrual cycle summary',
    data.name ? `Name: ${data.name}` : null,
    `Generated: ${fmt(A.today, { day: 'numeric', month: 'long', year: 'numeric' })}`,
    `Average cycle: ${A.avgCycle} days (shortest ${A.stats.shortest ?? '-'}, longest ${A.stats.longest ?? '-'})`,
    `Average period: ${A.avgPeriod} days`,
    '',
    'Recent periods (start – end, days, cycle length):',
    ...D.rows.map((r) => `• ${fmt(r.start, { day: 'numeric', month: 'short', year: 'numeric' })} – ${fmt(r.end)}: ${r.length} days, cycle ${r.cycle ?? '-'}`),
    '',
    `Symptoms: ${D.syms.join(', ') || 'none logged'}`,
    `Moods: ${D.moods.join(', ') || 'none logged'}`,
  ];
  return lines.filter((l) => l !== null).join('\n');
}
function sheetDoctor(A) {
  return `${doctorHTML(A)}
  <div class="row2 no-print"><button class="btn primary" data-act="print-doctor">🖨️ Print / PDF</button><button class="btn soft" data-act="share-doctor">📤 Share as text</button></div>
  <button class="btn soft no-print" data-act="close-sheet">Close</button>`;
}

// ---- add past period
function sheetAddPeriod(A) {
  const start = addDays(A.today, -28);
  return `<h2>➕ Add a past period</h2>
  <div class="form">
    <label>First day<input type="date" id="ap-start" max="${A.today}" value="${start}"></label>
    <label>Last day<input type="date" id="ap-end" max="${A.today}" value="${addDays(start, A.avgPeriod - 1)}"></label>
  </div>
  <button class="btn primary" data-act="save-add-period">Save period</button>
  <button class="btn soft" data-act="close-sheet">Cancel</button>`;
}

// ---- onboarding (first time)
function sheetOnboarding(A) {
  const o = ui.ob;
  return `<div class="onboard">
    ${kitty('none', 150)}
    <h2>Hi, I'm Mochi! 🐱</h2>
    <p>I'll help you track your period and guess when the next one is coming. Everything stays private on this phone.</p>
    <div class="form">
      <label>What should I call you? <span class="muted">(optional)</span><input type="text" id="ob-name" maxlength="30" value="${esc(o.name)}" placeholder="Your name"></label>
      <label>When did your last period start?<input type="date" id="ob-last" max="${A.today}" value="${o.last}" ${o.unknown ? 'disabled' : ''}></label>
      <button class="chip ${o.unknown ? 'on' : ''}" data-act="ob-unknown">🤔 I don't remember</button>
      <label>How many days does your period usually last?<input type="number" id="ob-plen" inputmode="numeric" min="1" max="12" value="${o.plen}"></label>
      <label>How long is your usual cycle? <span class="muted">(from the first day of one period to the first day of the next. Not sure? Keep 28.)</span><input type="number" id="ob-clen" inputmode="numeric" min="18" max="60" value="${o.clen}"></label>
    </div>
    <button class="btn primary big-btn" data-act="ob-finish">Let's start 💗</button>
    <p class="tiny">Predictions are estimates, not medical advice, and not birth control.</p>
  </div>`;
}
function openOnboarding() {
  ui.ob = { name: '', last: '', unknown: false, plen: 5, clen: 28 };
  openSheet('onboarding');
}
function readOb() {
  ui.ob.name = $('#ob-name').value.trim();
  ui.ob.last = $('#ob-last').value;
  ui.ob.plen = $('#ob-plen').value;
  ui.ob.clen = $('#ob-clen').value;
}
const clampInt = (v, lo, hi, dflt) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
};

// ---------- data changes
function markRange(start, end) {
  const today = todayKey();
  const days = new Set(data.periodDays);
  for (let k = start; toNum(k) <= toNum(end) && toNum(k) <= toNum(today); k = addDays(k, 1)) days.add(k);
  data.periodDays = [...days].sort();
  if (toNum(end) < toNum(today)) data.endedPeriods = [...new Set([...data.endedPeriods, start])];
}
function setLog(k, fn) {
  const log = { flow: null, mood: [], symptoms: [], notes: '', ...(data.logs[k] || {}) };
  fn(log);
  if (!log.flow && !log.mood.length && !log.symptoms.length && !log.notes) delete data.logs[k];
  else data.logs[k] = log;
  persist();
}
const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

async function shareOrCopy(payload, okMsg) {
  try {
    if (navigator.share) {
      await navigator.share(payload);
      return;
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText([payload.text, payload.url].filter(Boolean).join('\n'));
    toast(okMsg || 'Copied! Paste it in a message 📋');
  } catch {
    toast('Sharing is not available here');
  }
}

async function doBackup() {
  const json = store.makeBackup(data);
  const name = `mochi-backup-${todayKey()}.json`;
  const file = new File([json], name, { type: 'application/json' });
  let done = false;
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Mochi backup' });
      done = true;
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return;
  }
  if (!done) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
  data.lastBackup = todayKey();
  persist();
  toast('Backup saved 💾');
  render();
}

const ACT = {
  tab: (d) => {
    ui.tab = d.tab;
    if (d.tab === 'calendar') ui.month = null;
    render();
    window.scrollTo(0, 0);
  },
  'period-start': () => {
    const t = todayKey();
    data.periodDays = [...new Set([...data.periodDays, t])].sort();
    setLog(t, (l) => (l.flow = l.flow || 'medium'));
    toast('Logged! Take care of yourself 💗');
    render();
  },
  'period-yes': () => ACT['period-start'](),
  'period-ended': () => {
    const A = analyze(data, todayKey());
    if (A.last) data.endedPeriods = [...new Set([...data.endedPeriods, A.last.start])];
    persist();
    toast('Yay, period done! ✨');
    render();
  },
  'joke-reveal': () => {
    ui.jokeShown = todayKey();
    render();
  },
  'log-today': () => openSheet('day', { key: todayKey() }),
  'open-day': (d) => openSheet('day', { key: d.key }),
  'toggle-period': () => {
    const k = ui.sheet.key;
    if (data.periodDays.includes(k)) {
      data.periodDays = data.periodDays.filter((x) => x !== k);
      setLog(k, (l) => (l.flow = null));
    } else {
      data.periodDays = [...data.periodDays, k].sort();
      // If this re-opens a period you had marked as ended, forget the "ended" mark.
      const A = analyze(data, todayKey());
      const p = A.periods.find((p) => toNum(k) >= toNum(p.start) && toNum(k) <= toNum(p.end));
      if (p && k === todayKey()) data.endedPeriods = data.endedPeriods.filter((x) => x !== p.start);
    }
    persist();
    render();
  },
  flow: (d) => {
    setLog(ui.sheet.key, (l) => (l.flow = l.flow === d.val ? null : d.val));
    render();
  },
  mood: (d) => {
    setLog(ui.sheet.key, (l) => (l.mood = toggleIn(l.mood, d.val)));
    render();
  },
  sym: (d) => {
    setLog(ui.sheet.key, (l) => (l.symptoms = toggleIn(l.symptoms, d.val)));
    render();
  },
  'close-sheet': () => closeSheet(),
  'cal-move': (d) => {
    ui.month = shiftMonth(ui.month || todayKey().slice(0, 7), Number(d.n));
    render();
  },
  'cal-today': () => {
    ui.month = null;
    render();
  },
  'open-kit': () => openSheet('kit'),
  'kit-check': (d) => {
    data.kit.checked[d.id] = !data.kit.checked[d.id];
    persist();
    render();
  },
  'kit-del': (d) => {
    data.kit.items = data.kit.items.filter((i) => i.id !== d.id);
    delete data.kit.checked[d.id];
    persist();
    render();
  },
  'kit-add': () => {
    const v = $('#kit-new').value.trim();
    if (!v) return;
    data.kit.items.push({ id: 'k' + Date.now(), text: v });
    persist();
    render();
  },
  'open-partner': () => openSheet('partner'),
  'share-partner': () => {
    const A = analyze(data, todayKey());
    const info = partnerInfo(A);
    const who = data.name || 'Your person';
    shareOrCopy({ title: 'Mochi update', text: `💌 Update from Mochi 🐱\n${who}: ${partnerHeadline(info)}\nSee how you can help:`, url: partnerLink(info) });
  },
  'open-doctor': () => openSheet('doctor'),
  'print-doctor': () => {
    $('#print-root').innerHTML = doctorHTML(analyze(data, todayKey()));
    window.print();
  },
  'share-doctor': () => shareOrCopy({ title: 'Cycle summary', text: doctorText(analyze(data, todayKey())) }, 'Summary copied 📋'),
  'open-add-period': () => openSheet('addPeriod'),
  'save-add-period': () => {
    const s = $('#ap-start').value;
    const e = $('#ap-end').value;
    if (!isValidKey(s) || !isValidKey(e)) return toast('Please pick both dates');
    if (toNum(e) < toNum(s)) return toast('Last day must be after the first day');
    if (diffDays(s, e) > 13) return toast('That is longer than 2 weeks. Please check the dates.');
    if (toNum(s) > toNum(todayKey())) return toast('First day cannot be in the future');
    markRange(s, e);
    persist();
    ui.month = s.slice(0, 7);
    toast('Period added 🩸');
    closeSheet();
  },
  'toggle-fertility': () => {
    data.settings.showFertility = !data.settings.showFertility;
    persist();
    render();
  },
  backup: () => doBackup(),
  restore: () => $('#restore-file')?.click(),
  erase: () => {
    if (!confirm('Delete ALL your period data from this phone? This cannot be undone.')) return;
    if (!confirm('Are you really sure? Maybe save a backup first.')) return;
    store.erase();
    location.reload();
  },
  'dismiss-install': () => {
    data.hideInstall = true;
    persist();
    render();
  },
  'ob-unknown': () => {
    readOb();
    ui.ob.unknown = !ui.ob.unknown;
    renderSheet(analyze(data, todayKey()));
  },
  'ob-finish': () => {
    readOb();
    const o = ui.ob;
    if (!o.unknown && o.last && !isValidKey(o.last)) return toast('Please check the date');
    data.name = o.name.slice(0, 30);
    data.settings.periodLength = clampInt(o.plen, 1, 12, 5);
    data.settings.cycleLength = clampInt(o.clen, 18, 60, 28);
    if (!o.unknown && o.last && toNum(o.last) <= toNum(todayKey())) {
      markRange(o.last, addDays(o.last, data.settings.periodLength - 1));
    }
    data.onboarded = true;
    persist();
    ui.sheet = null;
    document.body.classList.remove('sheet-open');
    render();
    toast('All set! 🎉');
  },
};

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-act]');
  if (t && ACT[t.dataset.act]) {
    e.preventDefault();
    ACT[t.dataset.act](t.dataset, t);
    return;
  }
  const nav = e.target.closest('.nav button');
  if (nav) ACT.tab(nav.dataset);
});

document.addEventListener('change', async (e) => {
  const el = e.target;
  if (el.dataset.setting) {
    const key = el.dataset.setting;
    if (key === 'name') data.name = el.value.trim().slice(0, 30);
    else {
      const ranges = { cycleLength: [18, 60, 28], periodLength: [1, 12, 5], lateAfter: [1, 20, 5] };
      const [lo, hi, d] = ranges[key];
      data.settings[key] = clampInt(el.value, lo, hi, d);
      el.value = data.settings[key];
    }
    persist();
    toast('Saved ✓');
  }
  if (el.id === 'restore-file' && el.files[0]) {
    const text = await el.files[0].text();
    const restored = store.parseBackup(text);
    el.value = '';
    if (!restored) return toast("That file isn't a Mochi backup 🙀");
    if (!confirm('Replace the data on this phone with this backup?')) return;
    data = restored;
    data.onboarded = true;
    persist();
    toast('Backup loaded 🎉');
    render();
  }
});

document.addEventListener('input', (e) => {
  const k = e.target.dataset?.note;
  if (k) setLog(k, (l) => (l.notes = e.target.value.slice(0, 500)));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && ui.sheet) closeSheet();
  if (e.key === 'Enter' && e.target.id === 'kit-new') ACT['kit-add']();
});

// ---------- environment helpers
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
function isStandalone() {
  return navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
}

// ---------- partner-only page (opened from a shared link)
function renderPartnerPage(info) {
  document.body.classList.add('partner-mode');
  const old = toNum(info.t) < toNum(todayKey());
  $('#app').innerHTML = `<main class="partner-page">
    ${partnerCard(info)}
    ${old ? `<p class="card note">🕐 This update was sent on ${fmtLong(info.t)}, so things may have changed since then.</p>` : ''}
    <p class="disclaimer">Shared from Mochi Period Tracker 🐱. This page saves nothing.</p>
  </main>`;
}

// ---------- start
function boot() {
  const m = location.hash.match(/^#partner=([\w-]+)/);
  if (m) {
    const info = decodeInfo(m[1]);
    if (info) return renderPartnerPage(info);
  }
  $('#sheet-backdrop').addEventListener('click', closeSheet);
  $('#sheet .sheet-close').addEventListener('click', closeSheet);
  render();
  if (!data.onboarded) openOnboarding();
  if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
  // Refresh when the app is reopened (e.g. the next day)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !ui.sheet) render();
  });
}
boot();
