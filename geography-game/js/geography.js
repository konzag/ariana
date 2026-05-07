'use strict';

const STORAGE_KEY = 'ariana_geography_v2';

const CONTINENT_COLORS = {
  'Ευρώπη': '#4a90e2',
  'Ασία': '#e8a000',
  'Αφρική': '#e05c00',
  'Αμερική': '#27ae60',
  'Ωκεανία': '#9b59b6',
  'Αρκτική': '#00bcd4'
};

const COUNTRIES = [
  { id: 'greece', name: 'Ελλάδα', flag: '🇬🇷', continent: 'Ευρώπη',
    capital: 'Αθήνα', language: 'Ελληνικά', landmark: '🏛️ Παρθενώνας',
    food: '🫒 Μουσακάς', animal: '🦉 Κουκουβάγια',
    fact: 'Η Ελλάδα έχει πάνω από 6.000 νησιά!',
    story: 'Η Ελλάδα είναι η γενέτειρα της δημοκρατίας και των Ολυμπιακών Αγώνων. Οι αρχαίοι Έλληνες έδωσαν στον κόσμο φιλοσοφία, μαθηματικά και θέατρο.',
    pinX: 530, pinY: 195 },
  { id: 'france', name: 'Γαλλία', flag: '🇫🇷', continent: 'Ευρώπη',
    capital: 'Παρίσι', language: 'Γαλλικά', landmark: '🗼 Πύργος Άιφελ',
    food: '🥐 Κρουασάν', animal: '🐓 Κόκορας',
    fact: 'Το Παρίσι έχει πάνω από 1.800 αρτοποιεία!',
    story: 'Η Γαλλία είναι η πιο επισκεπτόμενη χώρα στον κόσμο. Ο Πύργος Άιφελ χτίστηκε το 1889 και αρχικά ήταν προσωρινός!',
    pinX: 460, pinY: 175 },
  { id: 'germany', name: 'Γερμανία', flag: '🇩🇪', continent: 'Ευρώπη',
    capital: 'Βερολίνο', language: 'Γερμανικά', landmark: '🏰 Κάστρο Νόιγκσβανσταϊν',
    food: '🥨 Πρέτζελ', animal: '🦅 Αετός',
    fact: 'Η Γερμανία έχει πάνω από 1.500 είδη μπύρας!',
    story: 'Η Γερμανία είναι γνωστή για τα παραμυθένια κάστρα και τα μεγάλα δάση της. Εδώ γεννήθηκε η τέχνη της τυπογραφίας!',
    pinX: 480, pinY: 160 },
  { id: 'italy', name: 'Ιταλία', flag: '🇮🇹', continent: 'Ευρώπη',
    capital: 'Ρώμη', language: 'Ιταλικά', landmark: '🏛️ Κολοσσαίο',
    food: '🍕 Πίτσα', animal: '🐺 Λύκος',
    fact: 'Η Ιταλία έχει τα περισσότερα μνημεία UNESCO στον κόσμο!',
    story: 'Η Ιταλία μάς έδωσε πίτσα, πάστα, gelato και την Αναγέννηση. Η Ρώμη χτίστηκε σε 7 λόφους!',
    pinX: 490, pinY: 190 },
  { id: 'spain', name: 'Ισπανία', flag: '🇪🇸', continent: 'Ευρώπη',
    capital: 'Μαδρίτη', language: 'Ισπανικά', landmark: '🏟️ Sagrada Familia',
    food: '🥘 Paella', animal: '🐂 Ταύρος',
    fact: 'Η Ισπανία έχει το δεύτερο παλαιότερο εστιατόριο στον κόσμο!',
    story: 'Η Ισπανία είναι γνωστή για τον φλαμένκο χορό, τα ζωηρά φεστιβάλ και την παγκοσμίου φήμης κουζίνα της.',
    pinX: 440, pinY: 190 },
  { id: 'uk', name: 'Βρετανία', flag: '🇬🇧', continent: 'Ευρώπη',
    capital: 'Λονδίνο', language: 'Αγγλικά', landmark: '🎡 Μεγάλο Βεν',
    food: '🫖 Τσάι με μπισκότα', animal: '🦁 Λιοντάρι',
    fact: 'Το Λονδίνο έχει πάνω από 170 μουσεία!',
    story: 'Η Βρετανία έδωσε στον κόσμο τον Σέξπιρ, τους Beatles και τον Χάρι Πότερ. Η βασιλική οικογένεια ζει εδώ εδώ και αιώνες!',
    pinX: 450, pinY: 155 },
  { id: 'russia', name: 'Ρωσία', flag: '🇷🇺', continent: 'Ευρώπη',
    capital: 'Μόσχα', language: 'Ρωσικά', landmark: '⛪ Εκκλησία Αγίου Βασιλείου',
    food: '🥗 Borscht', animal: '🐻 Αρκούδα',
    fact: 'Η Ρωσία είναι τόσο μεγάλη που έχει 11 ζώνες ώρας!',
    story: 'Η Ρωσία είναι η μεγαλύτερη χώρα στον κόσμο. Το Trans-Siberian Railway είναι το μεγαλύτερο σιδηρόδρομο στη Γη!',
    pinX: 680, pinY: 150 },
  { id: 'japan', name: 'Ιαπωνία', flag: '🇯🇵', continent: 'Ασία',
    capital: 'Τόκιο', language: 'Ιαπωνικά', landmark: '⛩️ Όρος Φούτζι',
    food: '🍣 Σούσι', animal: '🦌 Ελάφι',
    fact: 'Η Ιαπωνία αποτελείται από 6.852 νησιά!',
    story: 'Η Ιαπωνία είναι μια χώρα όπου το παλιό και το νέο συνυπάρχουν. Τα άνθη κερασιάς (sakura) είναι σύμβολο ομορφιάς και ανανέωσης.',
    pinX: 790, pinY: 190 },
  { id: 'china', name: 'Κίνα', flag: '🇨🇳', continent: 'Ασία',
    capital: 'Πεκίνο', language: 'Κινεζικά (Μανδαρίνικα)', landmark: '🏯 Σινικό Τείχος',
    food: '🥟 Dumplings', animal: '🐼 Πάντα',
    fact: 'Το Σινικό Τείχος είναι τόσο μεγάλο που δεν χωράει σε μια φωτογραφία!',
    story: 'Η Κίνα έχει τον μεγαλύτερο πληθυσμό στον κόσμο και εφηύρε το χαρτί, την πυρίτιδα και την πυξίδα.',
    pinX: 740, pinY: 200 },
  { id: 'india', name: 'Ινδία', flag: '🇮🇳', continent: 'Ασία',
    capital: 'Νέο Δελχί', language: 'Χίντι', landmark: '🕌 Ταζ Μαχάλ',
    food: '🍛 Κάρι', animal: '🐯 Τίγρης',
    fact: 'Η Ινδία παράγει τον περισσότερο κινηματογράφο στον κόσμο — Bollywood!',
    story: 'Η Ινδία είναι γεμάτη χρώματα, φεστιβάλ και μοναδική μαγειρική. Το Ταζ Μαχάλ χτίστηκε σαν δώρο αγάπης!',
    pinX: 680, pinY: 230 },
  { id: 'egypt', name: 'Αίγυπτος', flag: '🇪🇬', continent: 'Αφρική',
    capital: 'Κάιρο', language: 'Αραβικά', landmark: '🔺 Πυραμίδες της Γκίζας',
    food: '🧆 Φαλάφελ', animal: '🐪 Καμήλα',
    fact: 'Οι Πυραμίδες χτίστηκαν πριν από 4.500 χρόνια χωρίς μηχανήματα!',
    story: 'Η Αίγυπτος είναι μία από τις παλαιότερες πολιτισμένες χώρες. Ο ποταμός Νείλος ήταν η πηγή ζωής για τους αρχαίους Αιγυπτίους.',
    pinX: 560, pinY: 240 },
  { id: 'kenya', name: 'Κένυα', flag: '🇰🇪', continent: 'Αφρική',
    capital: 'Ναϊρόμπι', language: 'Σουαχίλι', landmark: '🦁 Σαβάνα Masai Mara',
    food: '🌽 Ugali', animal: '🦒 Καμηλοπάρδαλη',
    fact: 'Η Κένυα έχει τους πιο γρήγορους δρομείς στον κόσμο!',
    story: 'Η Κένυα είναι το σπίτι των Big Five — λέοντας, ελέφαντας, βουβάλι, ρινόκερος και λεοπάρδαλη.',
    pinX: 590, pinY: 290 },
  { id: 'south_africa', name: 'Νότια Αφρική', flag: '🇿🇦', continent: 'Αφρική',
    capital: 'Πρετόρια', language: '11 επίσημες γλώσσες!', landmark: '⛰️ Επίπεδο Βουνό',
    food: '🍢 Braai', animal: '🐧 Πιγκουΐνος',
    fact: 'Η Νότια Αφρική έχει 3 πρωτεύουσες!',
    story: 'Η Νότια Αφρική είναι γνωστή ως "Το Ουράνιο Έθνος" λόγω των 11 επίσημων γλωσσών της. Εδώ ζουν πιγκουΐνοι στην αφρικανική παραλία!',
    pinX: 560, pinY: 360 },
  { id: 'brazil', name: 'Βραζιλία', flag: '🇧🇷', continent: 'Αμερική',
    capital: 'Μπραζίλια', language: 'Πορτογαλικά', landmark: '🗿 Χριστός Λυτρωτής',
    food: '🥩 Churrasco', animal: '🦜 Παπαγάλος',
    fact: 'Ο Αμαζόνιος ποταμός της Βραζιλίας είναι ο μεγαλύτερος στον κόσμο!',
    story: 'Η Βραζιλία έχει τη μεγαλύτερη τροπική ζούγκλα στη Γη. Κάθε χρόνο διοργανώνει το πιο διάσημο καρναβάλι στον κόσμο στο Ρίο!',
    pinX: 310, pinY: 310 },
  { id: 'usa', name: 'ΗΠΑ', flag: '🇺🇸', continent: 'Αμερική',
    capital: 'Ουάσινγκτον', language: 'Αγγλικά', landmark: '🗽 Άγαλμα Ελευθερίας',
    food: '🍔 Χάμπουργκερ', animal: '🦅 Φαλκόνι',
    fact: 'Οι ΗΠΑ έχουν 50 πολιτείες και η σημαία έχει 50 αστέρια!',
    story: 'Οι ΗΠΑ είναι μια χώρα φτιαγμένη από ανθρώπους από όλο τον κόσμο. Το Χόλυγουντ κάνει τις πιο διάσημες ταινίες στη Γη!',
    pinX: 180, pinY: 210 },
  { id: 'mexico', name: 'Μεξικό', flag: '🇲🇽', continent: 'Αμερική',
    capital: 'Πόλη του Μεξικού', language: 'Ισπανικά', landmark: '🏛️ Χίτσεν Ίτζα',
    food: '🌮 Τάκος', animal: '🦅 Αετός',
    fact: 'Το σοκολάτα και το ποπ-κορν εφευρέθηκαν στο Μεξικό!',
    story: 'Το Μεξικό είναι γεμάτο αρχαίες πυραμίδες Μάγιας και Αζτέκων. Εδώ γεννήθηκε η σοκολάτα!',
    pinX: 170, pinY: 255 },
  { id: 'canada', name: 'Καναδάς', flag: '🇨🇦', continent: 'Αμερική',
    capital: 'Οτάβα', language: 'Αγγλικά & Γαλλικά', landmark: '🍁 Καταρράκτες Νιαγάρα',
    food: '🥞 Poutine', animal: '🦫 Κάστορας',
    fact: 'Ο Καναδάς έχει περισσότερες λίμνες από όλον τον υπόλοιπο κόσμο μαζί!',
    story: 'Ο Καναδάς είναι η δεύτερη μεγαλύτερη χώρα στον κόσμο. Οι φθινοπωρινές φυλλωσιές του είναι από τις πιο όμορφες στη Γη!',
    pinX: 200, pinY: 170 },
  { id: 'argentina', name: 'Αργεντινή', flag: '🇦🇷', continent: 'Αμερική',
    capital: 'Μπουένος Άιρες', language: 'Ισπανικά', landmark: '💃 Tango',
    food: '🥩 Asado', animal: '🦆 Φλαμίνγκο',
    fact: 'Το Tango γεννήθηκε στους δρόμους του Μπουένος Άιρες!',
    story: 'Η Αργεντινή έχει από τα πιο εντυπωσιακά τοπία — από τον παγετώνα Perito Moreno ως τις καταρράκτες Iguazu!',
    pinX: 290, pinY: 370 },
  { id: 'australia', name: 'Αυστραλία', flag: '🇦🇺', continent: 'Ωκεανία',
    capital: 'Καμπέρα', language: 'Αγγλικά', landmark: '🎭 Όπερα Σύδνεϊ',
    food: '🥧 Meat Pie', animal: '🦘 Καγκουρό',
    fact: 'Η Αυστραλία είναι η μόνη χώρα που καλύπτει ολόκληρη ήπειρο!',
    story: 'Η Αυστραλία έχει τα πιο μοναδικά ζώα στον κόσμο, όπως το καγκουρό και το κοάλα. Η Great Barrier Reef είναι ορατή από το διάστημα!',
    pinX: 800, pinY: 360 },
  { id: 'new_zealand', name: 'Νέα Ζηλανδία', flag: '🇳🇿', continent: 'Ωκεανία',
    capital: 'Ουέλιγκτον', language: 'Αγγλικά & Μαορί', landmark: '🏔️ Milford Sound',
    food: '🥝 Ακτινίδιο', animal: '🥝 Kiwi',
    fact: 'Η Νέα Ζηλανδία ήταν η πρώτη χώρα που έδωσε δικαίωμα ψήφου στις γυναίκες (1893)!',
    story: 'Η Νέα Ζηλανδία είναι γνωστή ως το σπίτι του Άρχοντα των Δαχτυλιδιών. Εδώ ζει το kiwi, πουλί που δεν πετά!',
    pinX: 870, pinY: 390 }
];

const MISSIONS = [
  { id: 'europe3', icon: '🏰', title: 'Βρες 3 χώρες της Ευρώπης',
    progress: s => ({ cur: allVisited(s).filter(id => byId(id)?.continent === 'Ευρώπη').length, max: 3 }) },
  { id: 'flags5', icon: '🏳️', title: 'Μάζεψε 5 σημαίες',
    progress: s => ({ cur: allVisited(s).length, max: 5 }) },
  { id: 'allcontinents', icon: '🌍', title: 'Ανακάλυψε μια χώρα από κάθε ήπειρο',
    progress: s => {
      const continents = ['Ευρώπη','Ασία','Αφρική','Αμερική','Ωκεανία'];
      const found = continents.filter(c => allVisited(s).some(id => byId(id)?.continent === c)).length;
      return { cur: found, max: 5 };
    } },
  { id: 'tower', icon: '🗼', title: 'Βρες χώρα με διάσημο πύργο',
    progress: s => ({ cur: allVisited(s).some(id => byId(id)?.landmark?.includes('Πύργος')) ? 1 : 0, max: 1 }) },
  { id: 'passport10', icon: '📘', title: 'Γέμισε 10 σελίδες διαβατηρίου',
    progress: s => ({ cur: allVisited(s).length, max: 10 }) }
];

const DEFAULT_STATE = {
  mode: 'single',
  players: ['Αριάνα', 'Φίλος'],
  currentPlayer: 0,
  playerVisited: [[], []],
  completedMissions: [],
  settings: { sound: true },
  timeline: []
};

let state = loadState();
let selectedCountryId = null;
let flagsCountryId = null;
let albumTab = 'flags';
let audioCtx = null;
let storyVisible = false;

const $ = id => document.getElementById(id);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!raw) return structuredClone(DEFAULT_STATE);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...raw,
      playerVisited: raw.playerVisited || [[], []],
      settings: { ...DEFAULT_STATE.settings, ...(raw.settings || {}) }
    };
  } catch { return structuredClone(DEFAULT_STATE); }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function byId(id) { return COUNTRIES.find(c => c.id === id); }

function allVisited(s = state) {
  const p = s.playerVisited || [[], []];
  return [...new Set([...(p[0] || []), ...(p[1] || [])])];
}

function currentVisited() {
  return state.playerVisited[state.currentPlayer] || [];
}

function isVisited(id) { return allVisited().includes(id); }

function continentColor(continent) {
  return CONTINENT_COLORS[continent] || '#888';
}

function init() {
  bindNavigation();
  bindProfile();
  bindMap();
  bindFlags();
  bindPassport();
  bindCollections();
  bindSettings();
  renderAll();
  const startSection = location.hash.replace('#', '') || 'profile';
  showSection(startSection);
}

function bindNavigation() {
  $$('[data-section-link]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showSection(el.dataset.sectionLink);
    });
  });
  $('sidebarToggle').addEventListener('click', () => {
    const nav = $('sideNav');
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    $('sidebarToggle').setAttribute('aria-expanded', String(open));
  });
  window.addEventListener('hashchange', () => {
    showSection(location.hash.replace('#', '') || 'profile');
  });
}

function showSection(section) {
  if (!document.querySelector(`[data-section="${section}"]`)) section = 'profile';
  $$('[data-section]').forEach(p => p.classList.toggle('active', p.dataset.section === section));
  $$('[data-section-link]').forEach(a => a.classList.toggle('active', a.dataset.sectionLink === section));
  history.replaceState(null, '', `#${section}`);
  $('sideNav').classList.remove('open');
  $('sidebarToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAll() {
  renderProfile();
  renderMap();
  if (!flagsCountryId) newFlagsRound();
  renderPassport();
  renderCollections();
}

// ── Profile ────────────────────────────────────────
function bindProfile() {
  $('playerMode').addEventListener('change', e => {
    state.mode = e.target.value;
    saveState();
    renderProfile();
  });
  $('nextTurnBtn').addEventListener('click', () => {
    state.currentPlayer = (state.currentPlayer + 1) % 2;
    saveState();
    renderProfile();
    toast(`Σειρά παίζει: ${state.players[state.currentPlayer]} ✈️`);
  });
  $('p1Name').addEventListener('change', e => {
    state.players[0] = e.target.value || 'Αριάνα';
    saveState();
    renderProfile();
  });
  $('p2Name').addEventListener('change', e => {
    state.players[1] = e.target.value || 'Φίλος';
    saveState();
    renderProfile();
  });
  $('startJourneyBtn').addEventListener('click', () => showSection('map'));
}

function renderProfile() {
  const visited = currentVisited();
  $('profileVisited').textContent = visited.length;
  $('profileFlags').textContent = visited.length;
  $('profileMissions').textContent = state.completedMissions.length;
  $('playerMode').value = state.mode;
  $('currentPlayerBadge').textContent = state.players[state.currentPlayer];
  $('p1Name').value = state.players[0];
  $('p2Name').value = state.players[1];
  const twoMode = state.mode === 'two';
  $('turnPanel').hidden = !twoMode;
  $('playerNamesPanel').hidden = !twoMode;
}

// ── Map ────────────────────────────────────────────
function bindMap() {
  $('countrySearch').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    $$('.map-pin').forEach(pin => {
      const c = byId(pin.dataset.id);
      const match = !q || c.name.toLowerCase().includes(q) || c.continent.toLowerCase().includes(q);
      pin.style.opacity = match ? '1' : '0.2';
    });
  });
}

function renderMap() {
  const g = $('mapPins');
  g.innerHTML = COUNTRIES.map(c => {
    const visited = isVisited(c.id);
    const color = visited ? continentColor(c.continent) : '#fff';
    const stroke = continentColor(c.continent);
    return `<g class="map-pin" data-id="${c.id}" role="button" tabindex="0" aria-label="${c.name}">
      <circle cx="${c.pinX}" cy="${c.pinY}" r="14" fill="${color}" stroke="${stroke}" stroke-width="4"/>
      <text x="${c.pinX}" y="${c.pinY + 8}" text-anchor="middle" font-size="16">${visited ? '✓' : c.flag}</text>
    </g>`;
  }).join('');

  $$('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => openCountry(pin.dataset.id));
    pin.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCountry(pin.dataset.id); }
    });
  });
}

function openCountry(id) {
  selectedCountryId = id;
  storyVisible = false;
  renderDiscoveryCard(id);
  sound(540);
}

function renderDiscoveryCard(id) {
  const c = byId(id);
  if (!c) return;
  const visited = isVisited(c.id);
  const col = continentColor(c.continent);
  $('countryCard').innerHTML = `
    <div class="card-inner" style="--continent-color:${col}">
      <div class="card-header">
        <span class="card-flag">${c.flag}</span>
        <div>
          <h2 class="card-name">${c.name}</h2>
          <span class="continent-badge" style="background:${col}">${c.continent}</span>
        </div>
      </div>
      <dl class="card-facts">
        <div class="fact-row"><dt>🏙️ Πρωτεύουσα</dt><dd>${c.capital}</dd></div>
        <div class="fact-row"><dt>🗣️ Γλώσσα</dt><dd>${c.language}</dd></div>
        <div class="fact-row"><dt>${c.landmark.split(' ')[0]} Ορόσημο</dt><dd>${c.landmark.slice(c.landmark.indexOf(' ')+1)}</dd></div>
        <div class="fact-row"><dt>${c.food.split(' ')[0]} Φαγητό</dt><dd>${c.food.slice(c.food.indexOf(' ')+1)}</dd></div>
        <div class="fact-row"><dt>${c.animal.split(' ')[0]} Ζώο</dt><dd>${c.animal.slice(c.animal.indexOf(' ')+1)}</dd></div>
        <div class="fact-row fact-highlight"><dt>✨ Γνώριζες;</dt><dd>${c.fact}</dd></div>
      </dl>
      <div class="story-box" id="storyBox" ${storyVisible ? '' : 'hidden'}>${c.story}</div>
      <div class="card-actions">
        <button class="btn-stamp ${visited ? 'btn-stamped' : ''}" id="addStampBtn">
          ${visited ? '✅ Στο διαβατήριο!' : '📮 Πρόσθεσε στο Διαβατήριο!'}
        </button>
        <button class="btn-story" id="readStoryBtn">📖 ${storyVisible ? 'Κλείσε ιστορία' : 'Διάβασε την ιστορία'}</button>
      </div>
    </div>`;

  $('addStampBtn').addEventListener('click', () => visitCountry(id));
  $('readStoryBtn').addEventListener('click', () => {
    storyVisible = !storyVisible;
    renderDiscoveryCard(id);
    sound(600);
  });
}

function visitCountry(id) {
  const c = byId(id);
  if (!c) return;
  const playerArr = state.playerVisited[state.currentPlayer];
  if (!playerArr.includes(id)) {
    playerArr.push(id);
    state.timeline.unshift({
      text: `${state.players[state.currentPlayer]} ανακάλυψε: ${c.name} ${c.flag}`,
      time: new Date().toLocaleDateString('el-GR')
    });
    state.timeline = state.timeline.slice(0, 20);
    toast(`Νέα σφραγίδα: ${c.name} ${c.flag}`);
    sound(760);
    showStampAnimation();
    updateMissions();
  } else {
    toast(`${c.name} είναι ήδη στο διαβατήριο!`);
  }
  saveState();
  renderMap();
  renderPassport();
  renderCollections();
  renderProfile();
  renderDiscoveryCard(id);
}

function showStampAnimation() {
  const el = $('stampAnim');
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 900);
}

// ── Flags game ─────────────────────────────────────
function bindFlags() {
  $('newFlagRound').addEventListener('click', newFlagsRound);
}

function newFlagsRound() {
  const pool = [...COUNTRIES];
  pool.sort(() => Math.random() - 0.5);
  flagsCountryId = pool[0].id;
  renderFlagsGame();
}

function renderFlagsGame() {
  if (!flagsCountryId) {
    const idx = Math.floor(Math.random() * COUNTRIES.length);
    flagsCountryId = COUNTRIES[idx].id;
  }
  const correct = byId(flagsCountryId);
  const others = COUNTRIES.filter(c => c.id !== flagsCountryId)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [correct, ...others].sort(() => Math.random() - 0.5);
  const col = continentColor(correct.continent);

  $('flagsCountryCard').innerHTML = `
    <div class="flags-card" style="--continent-color:${col}">
      <div class="flags-card-inner">
        <span class="flags-continent-badge" style="background:${col}">${correct.continent}</span>
        <h2 class="flags-country-name">${correct.name}</h2>
        <p class="flags-capital">🏙️ ${correct.capital}</p>
        <p class="flags-prompt">Ποια είναι η σημαία αυτής της χώρας;</p>
      </div>
      <div class="flags-drop-zone" id="flagsDropZone" aria-label="Σέρε εδώ τη σωστή σημαία">
        <span>⬇ Σέρε ή πάτησε τη σωστή σημαία εδώ</span>
      </div>
    </div>`;

  $('flagsOptions').innerHTML = options.map(c => `
    <button class="flag-option" draggable="true"
      data-flag-id="${c.id}" aria-label="Σημαία ${c.name}">
      <span class="flag-emoji">${c.flag}</span>
      <span class="flag-name">${c.name}</span>
    </button>`).join('');

  $('flagsFeedback').textContent = 'Πάτησε ή σέρε τη σωστή σημαία!';
  $('flagsFeedback').className = 'flags-feedback';

  bindFlagOptions();
}

function bindFlagOptions() {
  const dropZone = $('flagsDropZone');

  $$('.flag-option').forEach(btn => {
    btn.addEventListener('click', () => checkFlag(btn.dataset.flagId));
    btn.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', btn.dataset.flagId);
      btn.classList.add('dragging');
    });
    btn.addEventListener('dragend', () => btn.classList.remove('dragging'));

    btn.addEventListener('touchstart', e => {
      btn.classList.add('touch-active');
      btn._touchId = e.changedTouches[0].identifier;
    }, { passive: true });
    btn.addEventListener('touchend', e => {
      btn.classList.remove('touch-active');
      const t = Array.from(e.changedTouches).find(t => t.identifier === btn._touchId);
      if (!t) return;
      const el = document.elementFromPoint(t.clientX, t.clientY);
      if (el && (el === dropZone || dropZone.contains(el))) {
        checkFlag(btn.dataset.flagId);
      }
    }, { passive: true });
  });

  if (dropZone) {
    dropZone.addEventListener('dragover', e => e.preventDefault());
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      checkFlag(e.dataTransfer.getData('text/plain'));
    });
  }
}

function checkFlag(flagId) {
  const fb = $('flagsFeedback');
  if (flagId === flagsCountryId) {
    const c = byId(flagsCountryId);
    fb.textContent = `Τέλεια σύνδεση! ${c.flag} — ${c.name}! 🎉`;
    fb.className = 'flags-feedback correct';
    sound(760);
    $('flagsDropZone').innerHTML = `<span style="font-size:3rem">${c.flag}</span>`;
    $$('.flag-option').forEach(b => { b.disabled = true; });
    visitCountry(flagsCountryId);
    setTimeout(newFlagsRound, 1800);
  } else {
    fb.textContent = 'Δοκίμασε ξανά, αυτή η σημαία ταξίδεψε αλλού! ✈️';
    fb.className = 'flags-feedback wrong';
    const wrongBtn = document.querySelector(`.flag-option[data-flag-id="${flagId}"]`);
    if (wrongBtn) {
      wrongBtn.classList.add('shake');
      setTimeout(() => wrongBtn.classList.remove('shake'), 600);
    }
    sound(320);
  }
}

// ── Passport ───────────────────────────────────────
function bindPassport() {}

function renderPassport() {
  renderStamps();
  renderContinentProgress();
  renderMissions();
}

function renderStamps() {
  const visited = allVisited();
  const locked = COUNTRIES.filter(c => !visited.includes(c.id));
  const stampHTML = visited.map(id => {
    const c = byId(id);
    if (!c) return '';
    const col = continentColor(c.continent);
    const rot = (Math.random() * 10 - 5).toFixed(1);
    return `<div class="stamp discovered" style="--rot:${rot}deg;--col:${col}">
      <span class="stamp-flag">${c.flag}</span>
      <span class="stamp-name">${c.name}</span>
    </div>`;
  }).join('');
  const lockedHTML = locked.slice(0, Math.max(0, 12 - visited.length)).map(() =>
    `<div class="stamp locked"><span>?</span></div>`).join('');

  $('stampGrid').innerHTML = stampHTML + lockedHTML;
  $('stampCount').textContent = `${visited.length} / ${COUNTRIES.length} σφραγίδες`;
}

function renderContinentProgress() {
  const visited = allVisited();
  const continents = ['Ευρώπη','Ασία','Αφρική','Αμερική','Ωκεανία'];
  $('continentProgress').innerHTML = continents.map(cont => {
    const total = COUNTRIES.filter(c => c.continent === cont).length;
    const done = visited.filter(id => byId(id)?.continent === cont).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const col = continentColor(cont);
    return `<div class="cont-bar">
      <div class="cont-bar-label">
        <span style="color:${col}">${cont}</span>
        <span>${done}/${total}</span>
      </div>
      <div class="mini-meter"><div class="mini-fill" style="width:${pct}%;background:${col}"></div></div>
    </div>`;
  }).join('');
}

function updateMissions() {
  MISSIONS.forEach(m => {
    if (!state.completedMissions.includes(m.id)) {
      const { cur, max } = m.progress(state);
      if (cur >= max) {
        state.completedMissions.push(m.id);
        toast(`🏆 Αποστολή: ${m.title}`);
        sound(880);
      }
    }
  });
  saveState();
}

function renderMissions() {
  $('missionList').innerHTML = MISSIONS.map(m => {
    const done = state.completedMissions.includes(m.id);
    const { cur, max } = m.progress(state);
    const pct = Math.min(100, Math.round((cur / max) * 100));
    return `<article class="mission-card ${done ? 'done' : ''}">
      <span class="mission-icon">${m.icon}</span>
      <div class="mission-body">
        <h3>${m.title}</h3>
        <div class="mini-meter">
          <div class="mini-fill" style="width:${pct}%;background:${done ? '#27ae60' : '#4a90e2'}"></div>
        </div>
        <small>${cur} / ${max} ${done ? '✅ Ολοκληρώθηκε!' : ''}</small>
      </div>
      ${done ? '<span class="mission-badge">🏅</span>' : ''}
    </article>`;
  }).join('');
}

// ── Collections ────────────────────────────────────
function bindCollections() {
  $$('.album-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      albumTab = btn.dataset.album;
      $$('.album-tab').forEach(b => b.classList.toggle('active', b === btn));
      renderCollections();
    });
  });
}

function renderCollections() {
  const visited = allVisited();
  const propMap = { flags: 'flag', landmarks: 'landmark', foods: 'food', animals: 'animal' };
  const prop = propMap[albumTab];

  $('albumGrid').innerHTML = COUNTRIES.map(c => {
    const isFound = visited.includes(c.id);
    const col = continentColor(c.continent);
    if (isFound) {
      return `<article class="album-item found" style="--continent-color:${col}">
        <span class="album-icon">${c[prop]}</span>
        <strong>${prop === 'flag' ? c.name : c[prop].replace(/^[\S]+\s/, '')}</strong>
        ${prop !== 'flag' ? `<small>${c.name}</small>` : ''}
      </article>`;
    }
    return `<article class="album-item locked">
      <span class="album-icon">❓</span>
      <strong>???</strong>
      <small>Ανακάλυψε τη χώρα</small>
    </article>`;
  }).join('');
}

// ── Settings ───────────────────────────────────────
function bindSettings() {
  $('soundToggle').addEventListener('change', e => {
    state.settings.sound = e.target.checked;
    saveState();
    sound(660);
  });
  $('resetBtn').addEventListener('click', () => {
    if (!confirm('Μηδενισμός όλης της προόδου; Αυτό δεν αναιρείται!')) return;
    const kept = state.settings;
    state = { ...structuredClone(DEFAULT_STATE), settings: kept };
    saveState();
    renderAll();
    toast('Το διαβατήριο ξεκίνησε από την αρχή. ✈️');
  });
  $('soundToggle').checked = state.settings.sound;
}

// ── Utilities ──────────────────────────────────────
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 3000);
}

function sound(freq) {
  if (!state.settings.sound) return;
  try {
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.25);
  } catch {}
}

document.addEventListener('DOMContentLoaded', init);
