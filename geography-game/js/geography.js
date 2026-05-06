const MENU_URL = "../index.html";
const STORAGE_KEY = "ariana_geography_passport_v1";

const CONTINENTS = ["Ευρώπη", "Ασία", "Αφρική", "Βόρεια Αμερική", "Νότια Αμερική", "Ωκεανία"];

// Starter dataset built to be easy to expand. Add more country objects with the same shape.
// Future upgrade point: this can move to JSON/API without changing the rendering functions.
const COUNTRIES = [
  { id: "greece", greekName: "Ελλάδα", englishName: "Greece", continent: "Ευρώπη", capital: "Αθήνα", flagEmoji: "🇬🇷", language: "Ελληνικά", landmark: "Ακρόπολη", landmarkIcon: "🏛️", food: "Μουσακάς", foodIcon: "🍆", animal: "Δελφίνι", animalIcon: "🐬", funFact: "Η Ελλάδα έχει χιλιάδες νησιά και πολλούς αρχαίους μύθους.", coordinates: [38, 24] },
  { id: "italy", greekName: "Ιταλία", englishName: "Italy", continent: "Ευρώπη", capital: "Ρώμη", flagEmoji: "🇮🇹", language: "Ιταλικά", landmark: "Κολοσσαίο", landmarkIcon: "🏟️", food: "Πίτσα", foodIcon: "🍕", animal: "Λύκος των Απεννίνων", animalIcon: "🐺", funFact: "Η Ιταλία μοιάζει στον χάρτη με μπότα.", coordinates: [42, 12] },
  { id: "france", greekName: "Γαλλία", englishName: "France", continent: "Ευρώπη", capital: "Παρίσι", flagEmoji: "🇫🇷", language: "Γαλλικά", landmark: "Πύργος του Άιφελ", landmarkIcon: "🗼", food: "Κρουασάν", foodIcon: "🥐", animal: "Κόκορας", animalIcon: "🐓", funFact: "Ο Πύργος του Άιφελ ήταν κάποτε το ψηλότερο κτίριο στον κόσμο.", coordinates: [47, 2] },
  { id: "spain", greekName: "Ισπανία", englishName: "Spain", continent: "Ευρώπη", capital: "Μαδρίτη", flagEmoji: "🇪🇸", language: "Ισπανικά", landmark: "Σαγράδα Φαμίλια", landmarkIcon: "⛪", food: "Παέγια", foodIcon: "🥘", animal: "Ιβηρικός λύγκας", animalIcon: "🐈", funFact: "Η Ισπανία έχει πολύχρωμες γιορτές και δυνατή παράδοση στη μουσική.", coordinates: [40, -4] },
  { id: "germany", greekName: "Γερμανία", englishName: "Germany", continent: "Ευρώπη", capital: "Βερολίνο", flagEmoji: "🇩🇪", language: "Γερμανικά", landmark: "Πύλη του Βρανδεμβούργου", landmarkIcon: "🏛️", food: "Πρέτσελ", foodIcon: "🥨", animal: "Αετός", animalIcon: "🦅", funFact: "Η Γερμανία έχει πολλά κάστρα και δάση.", coordinates: [51, 10] },
  { id: "uk", greekName: "Ηνωμένο Βασίλειο", englishName: "United Kingdom", continent: "Ευρώπη", capital: "Λονδίνο", flagEmoji: "🇬🇧", language: "Αγγλικά", landmark: "Μπιγκ Μπεν", landmarkIcon: "🕰️", food: "Fish and chips", foodIcon: "🍟", animal: "Κόκκινος σκίουρος", animalIcon: "🐿️", funFact: "Το Λονδίνο έχει μετρό από το 1863.", coordinates: [54, -2] },
  { id: "norway", greekName: "Νορβηγία", englishName: "Norway", continent: "Ευρώπη", capital: "Όσλο", flagEmoji: "🇳🇴", language: "Νορβηγικά", landmark: "Φιόρδ", landmarkIcon: "🏔️", food: "Σολομός", foodIcon: "🐟", animal: "Τάρανδος", animalIcon: "🦌", funFact: "Στη Νορβηγία μπορείς να δεις το βόρειο σέλας.", coordinates: [61, 8] },
  { id: "sweden", greekName: "Σουηδία", englishName: "Sweden", continent: "Ευρώπη", capital: "Στοκχόλμη", flagEmoji: "🇸🇪", language: "Σουηδικά", landmark: "Παλιά Πόλη της Στοκχόλμης", landmarkIcon: "🏘️", food: "Κεφτεδάκια", foodIcon: "🧆", animal: "Άλκη", animalIcon: "🫎", funFact: "Η Στοκχόλμη είναι χτισμένη πάνω σε πολλά νησιά.", coordinates: [60, 18] },
  { id: "japan", greekName: "Ιαπωνία", englishName: "Japan", continent: "Ασία", capital: "Τόκιο", flagEmoji: "🇯🇵", language: "Ιαπωνικά", landmark: "Όρος Φούτζι", landmarkIcon: "🗻", food: "Σούσι", foodIcon: "🍣", animal: "Κόκκινο πάντα", animalIcon: "🐼", funFact: "Η Ιαπωνία έχει τρένα που μοιάζουν να πετούν πάνω στις ράγες.", coordinates: [36, 138] },
  { id: "china", greekName: "Κίνα", englishName: "China", continent: "Ασία", capital: "Πεκίνο", flagEmoji: "🇨🇳", language: "Κινέζικα", landmark: "Σινικό Τείχος", landmarkIcon: "🧱", food: "Νουντλς", foodIcon: "🍜", animal: "Γιγάντιο πάντα", animalIcon: "🐼", funFact: "Το Σινικό Τείχος είναι τεράστιο και περνά από βουνά και κοιλάδες.", coordinates: [35, 104] },
  { id: "india", greekName: "Ινδία", englishName: "India", continent: "Ασία", capital: "Νέο Δελχί", flagEmoji: "🇮🇳", language: "Χίντι και Αγγλικά", landmark: "Ταζ Μαχάλ", landmarkIcon: "🕌", food: "Κάρι", foodIcon: "🍛", animal: "Τίγρη της Βεγγάλης", animalIcon: "🐅", funFact: "Η Ινδία έχει πολλές γλώσσες, χρώματα και γιορτές.", coordinates: [22, 79] },
  { id: "south-korea", greekName: "Νότια Κορέα", englishName: "South Korea", continent: "Ασία", capital: "Σεούλ", flagEmoji: "🇰🇷", language: "Κορεατικά", landmark: "Παλάτι Γκιόνγκμποκ", landmarkIcon: "🏯", food: "Κίμτσι", foodIcon: "🥬", animal: "Κορεατική κίσσα", animalIcon: "🐦", funFact: "Η Σεούλ συνδυάζει παλάτια, τεχνολογία και K-pop ενέργεια.", coordinates: [36, 128] },
  { id: "thailand", greekName: "Ταϊλάνδη", englishName: "Thailand", continent: "Ασία", capital: "Μπανγκόκ", flagEmoji: "🇹🇭", language: "Ταϊλανδικά", landmark: "Μεγάλο Παλάτι", landmarkIcon: "🏯", food: "Pad Thai", foodIcon: "🍜", animal: "Ελέφαντας", animalIcon: "🐘", funFact: "Η Ταϊλάνδη είναι γνωστή για ναούς, αγορές και τροπικά νησιά.", coordinates: [15, 101] },
  { id: "indonesia", greekName: "Ινδονησία", englishName: "Indonesia", continent: "Ασία", capital: "Τζακάρτα", flagEmoji: "🇮🇩", language: "Ινδονησιακά", landmark: "Μπορομπουντούρ", landmarkIcon: "🛕", food: "Νάσι γκορένγκ", foodIcon: "🍚", animal: "Ουρακοτάγκος", animalIcon: "🦧", funFact: "Η Ινδονησία έχει χιλιάδες νησιά.", coordinates: [-2, 118] },
  { id: "egypt", greekName: "Αίγυπτος", englishName: "Egypt", continent: "Αφρική", capital: "Κάιρο", flagEmoji: "🇪🇬", language: "Αραβικά", landmark: "Πυραμίδες της Γκίζας", landmarkIcon: "🔺", food: "Κοσάρι", foodIcon: "🍲", animal: "Καμήλα", animalIcon: "🐪", funFact: "Ο Νείλος βοήθησε έναν από τους αρχαιότερους πολιτισμούς να μεγαλώσει.", coordinates: [27, 30] },
  { id: "morocco", greekName: "Μαρόκο", englishName: "Morocco", continent: "Αφρική", capital: "Ραμπάτ", flagEmoji: "🇲🇦", language: "Αραβικά και Βερβερικά", landmark: "Μεντίνα του Μαρακές", landmarkIcon: "🕌", food: "Ταζίν", foodIcon: "🍲", animal: "Αλεπού της ερήμου", animalIcon: "🦊", funFact: "Στο Μαρόκο συναντάς έρημο, βουνά και πολύχρωμες αγορές.", coordinates: [32, -6] },
  { id: "kenya", greekName: "Κένυα", englishName: "Kenya", continent: "Αφρική", capital: "Ναϊρόμπι", flagEmoji: "🇰🇪", language: "Σουαχίλι και Αγγλικά", landmark: "Μασάι Μάρα", landmarkIcon: "🌾", food: "Ουγκάλι", foodIcon: "🍚", animal: "Λιοντάρι", animalIcon: "🦁", funFact: "Στην Κένυα μπορείς να δεις μεγάλα κοπάδια ζώων στη σαβάνα.", coordinates: [0, 38] },
  { id: "south-africa", greekName: "Νότια Αφρική", englishName: "South Africa", continent: "Αφρική", capital: "Πρετόρια", flagEmoji: "🇿🇦", language: "Πολλές επίσημες γλώσσες", landmark: "Table Mountain", landmarkIcon: "⛰️", food: "Bobotie", foodIcon: "🥘", animal: "Πιγκουίνος Αφρικής", animalIcon: "🐧", funFact: "Η χώρα έχει ακτές, σαβάνες και μεγάλες πόλεις.", coordinates: [-30, 25] },
  { id: "madagascar", greekName: "Μαδαγασκάρη", englishName: "Madagascar", continent: "Αφρική", capital: "Ανταναναρίβο", flagEmoji: "🇲🇬", language: "Μαλαγασικά και Γαλλικά", landmark: "Λεωφόρος των Μπαομπάμπ", landmarkIcon: "🌳", food: "Ρομάζαβα", foodIcon: "🥣", animal: "Λεμούριος", animalIcon: "🐒", funFact: "Πολλά ζώα της Μαδαγασκάρης δεν ζουν πουθενά αλλού.", coordinates: [-19, 47] },
  { id: "nigeria", greekName: "Νιγηρία", englishName: "Nigeria", continent: "Αφρική", capital: "Αμπούτζα", flagEmoji: "🇳🇬", language: "Αγγλικά", landmark: "Βράχος Zuma", landmarkIcon: "🪨", food: "Jollof rice", foodIcon: "🍚", animal: "Γκρι παπαγάλος", animalIcon: "🦜", funFact: "Η Νιγηρία έχει πολύ δυνατή μουσική και κινηματογραφική σκηνή.", coordinates: [9, 8] },
  { id: "usa", greekName: "Ηνωμένες Πολιτείες", englishName: "United States", continent: "Βόρεια Αμερική", capital: "Ουάσινγκτον", flagEmoji: "🇺🇸", language: "Αγγλικά", landmark: "Άγαλμα της Ελευθερίας", landmarkIcon: "🗽", food: "Burger", foodIcon: "🍔", animal: "Φαλακρός αετός", animalIcon: "🦅", funFact: "Οι ΗΠΑ έχουν ερήμους, δάση, φαράγγια και τεράστιες πόλεις.", coordinates: [39, -98] },
  { id: "canada", greekName: "Καναδάς", englishName: "Canada", continent: "Βόρεια Αμερική", capital: "Οτάβα", flagEmoji: "🇨🇦", language: "Αγγλικά και Γαλλικά", landmark: "Καταρράκτες Νιαγάρα", landmarkIcon: "🌊", food: "Poutine", foodIcon: "🍟", animal: "Κάστορας", animalIcon: "🦫", funFact: "Ο Καναδάς έχει πολλές λίμνες και μεγάλα δάση.", coordinates: [57, -106] },
  { id: "mexico", greekName: "Μεξικό", englishName: "Mexico", continent: "Βόρεια Αμερική", capital: "Πόλη του Μεξικού", flagEmoji: "🇲🇽", language: "Ισπανικά", landmark: "Τσιτσέν Ιτσά", landmarkIcon: "🛕", food: "Τάκος", foodIcon: "🌮", animal: "Μονάρχης πεταλούδα", animalIcon: "🦋", funFact: "Στο Μεξικό υπάρχουν αρχαίες πόλεις των Μάγια.", coordinates: [23, -102] },
  { id: "costa-rica", greekName: "Κόστα Ρίκα", englishName: "Costa Rica", continent: "Βόρεια Αμερική", capital: "Σαν Χοσέ", flagEmoji: "🇨🇷", language: "Ισπανικά", landmark: "Ηφαίστειο Αρενάλ", landmarkIcon: "🌋", food: "Gallo pinto", foodIcon: "🍛", animal: "Βραδύποδας", animalIcon: "🦥", funFact: "Η Κόστα Ρίκα έχει τροπικά δάση γεμάτα ζωή.", coordinates: [10, -84] },
  { id: "cuba", greekName: "Κούβα", englishName: "Cuba", continent: "Βόρεια Αμερική", capital: "Αβάνα", flagEmoji: "🇨🇺", language: "Ισπανικά", landmark: "Παλιά Αβάνα", landmarkIcon: "🏘️", food: "Ρύζι με φασόλια", foodIcon: "🍛", animal: "Κολιμπρί μέλισσα", animalIcon: "🐦", funFact: "Η Κούβα είναι νησί με μουσική, χρώματα και παλιά αυτοκίνητα.", coordinates: [21, -79] },
  { id: "brazil", greekName: "Βραζιλία", englishName: "Brazil", continent: "Νότια Αμερική", capital: "Μπραζίλια", flagEmoji: "🇧🇷", language: "Πορτογαλικά", landmark: "Χριστός Λυτρωτής", landmarkIcon: "🗿", food: "Feijoada", foodIcon: "🍲", animal: "Τουκάν", animalIcon: "🦜", funFact: "Ο Αμαζόνιος είναι το μεγαλύτερο τροπικό δάσος του κόσμου.", coordinates: [-10, -55] },
  { id: "argentina", greekName: "Αργεντινή", englishName: "Argentina", continent: "Νότια Αμερική", capital: "Μπουένος Άιρες", flagEmoji: "🇦🇷", language: "Ισπανικά", landmark: "Παταγονία", landmarkIcon: "🏔️", food: "Εμπανάδας", foodIcon: "🥟", animal: "Πιγκουίνος Μαγγελάνου", animalIcon: "🐧", funFact: "Στην Αργεντινή βρίσκεις πάγο, βουνά και τάνγκο.", coordinates: [-34, -64] },
  { id: "peru", greekName: "Περού", englishName: "Peru", continent: "Νότια Αμερική", capital: "Λίμα", flagEmoji: "🇵🇪", language: "Ισπανικά και Κέτσουα", landmark: "Μάτσου Πίτσου", landmarkIcon: "⛰️", food: "Σεβίτσε", foodIcon: "🐟", animal: "Λάμα", animalIcon: "🦙", funFact: "Το Μάτσου Πίτσου βρίσκεται ψηλά στις Άνδεις.", coordinates: [-9, -75] },
  { id: "chile", greekName: "Χιλή", englishName: "Chile", continent: "Νότια Αμερική", capital: "Σαντιάγο", flagEmoji: "🇨🇱", language: "Ισπανικά", landmark: "Έρημος Ατακάμα", landmarkIcon: "🏜️", food: "Pastel de choclo", foodIcon: "🥧", animal: "Κόνδορας", animalIcon: "🦅", funFact: "Η Χιλή είναι πολύ μακριά και λεπτή χώρα στον χάρτη.", coordinates: [-30, -71] },
  { id: "colombia", greekName: "Κολομβία", englishName: "Colombia", continent: "Νότια Αμερική", capital: "Μπογκοτά", flagEmoji: "🇨🇴", language: "Ισπανικά", landmark: "Καθεδρικός του Αλατιού", landmarkIcon: "⛪", food: "Αρέπα", foodIcon: "🫓", animal: "Ιαγουάρος", animalIcon: "🐆", funFact: "Η Κολομβία έχει βουνά, ζούγκλες και καφέ.", coordinates: [4, -74] },
  { id: "australia", greekName: "Αυστραλία", englishName: "Australia", continent: "Ωκεανία", capital: "Καμπέρα", flagEmoji: "🇦🇺", language: "Αγγλικά", landmark: "Όπερα του Σίδνεϊ", landmarkIcon: "🎭", food: "Meat pie", foodIcon: "🥧", animal: "Καγκουρό", animalIcon: "🦘", funFact: "Η Αυστραλία είναι και χώρα και ήπειρος για πολλούς χάρτες.", coordinates: [-25, 134] },
  { id: "new-zealand", greekName: "Νέα Ζηλανδία", englishName: "New Zealand", continent: "Ωκεανία", capital: "Ουέλλινγκτον", flagEmoji: "🇳🇿", language: "Αγγλικά και Μαορί", landmark: "Μίλφορντ Σάουντ", landmarkIcon: "🏞️", food: "Pavlova", foodIcon: "🍰", animal: "Κίουι", animalIcon: "🥝", funFact: "Το κίουι είναι πουλί που δεν πετά και σύμβολο της χώρας.", coordinates: [-41, 174] },
  { id: "fiji", greekName: "Φίτζι", englishName: "Fiji", continent: "Ωκεανία", capital: "Σούβα", flagEmoji: "🇫🇯", language: "Αγγλικά και Φιτζιανά", landmark: "Νησιά Μανουκά", landmarkIcon: "🏝️", food: "Kokoda", foodIcon: "🐟", animal: "Ιγκουάνα Φίτζι", animalIcon: "🦎", funFact: "Τα Φίτζι έχουν καθαρά νερά και κοραλλιογενείς υφάλους.", coordinates: [-17, 179] },
  { id: "samoa", greekName: "Σαμόα", englishName: "Samoa", continent: "Ωκεανία", capital: "Απία", flagEmoji: "🇼🇸", language: "Σαμοανικά και Αγγλικά", landmark: "To Sua Ocean Trench", landmarkIcon: "🌊", food: "Palusami", foodIcon: "🥬", animal: "Θαλάσσια χελώνα", animalIcon: "🐢", funFact: "Η Σαμόα έχει δυνατές παραδόσεις τραγουδιού και χορού.", coordinates: [-14, -172] }
];

const MISSIONS = [
  { id: "europe3", icon: "🧭", title: "Βρες 3 χώρες της Ευρώπης", test: state => countVisitedByContinent(state, "Ευρώπη") >= 3 },
  { id: "flags5", icon: "🏳️", title: "Γέμισε το διαβατήριό σου με 5 σημαίες", test: state => state.visited.length >= 5 },
  { id: "jungle", icon: "🌿", title: "Ανακάλυψε μια χώρα με ζώο που ζει στη ζούγκλα", test: state => visitedCountries(state).some(c => ["Ιαγουάρος", "Τουκάν", "Ουρακοτάγκος", "Λεμούριος"].includes(c.animal)) },
  { id: "tower", icon: "🗼", title: "Βρες μια χώρα που έχει διάσημο πύργο", test: state => visitedCountries(state).some(c => c.landmark.includes("Πύργος")) },
  { id: "oceania", icon: "🏝️", title: "Κάνε ένα ταξίδι στην Ωκεανία", test: state => countVisitedByContinent(state, "Ωκεανία") >= 1 },
  { id: "foods4", icon: "🍽️", title: "Μάζεψε 4 γεύσεις από τον κόσμο", test: state => state.visited.length >= 4 }
];

const DEFAULT_STATE = {
  profileName: "Αριάνα",
  mode: "single",
  players: ["Αριάνα", "Φίλος/Φίλη"],
  currentPlayer: 0,
  visited: [],
  completedMissions: [],
  settings: {
    sound: true,
    narration: true
  },
  timeline: []
};

let state = loadState();
let selectedCountryId = COUNTRIES[0].id;
let currentMatchCountryId = "greece";
let selectedSticker = null;
let albumType = "flags";
let audioCtx = null;

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? mergeState(saved) : structuredClone(DEFAULT_STATE);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function mergeState(saved) {
  return {
    ...structuredClone(DEFAULT_STATE),
    ...saved,
    settings: { ...DEFAULT_STATE.settings, ...(saved.settings || {}) },
    players: saved.players || DEFAULT_STATE.players,
    timeline: saved.timeline || []
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function countryById(id) {
  return COUNTRIES.find(country => country.id === id);
}

function visitedCountries(customState = state) {
  return customState.visited.map(countryById).filter(Boolean);
}

function countVisitedByContinent(customState, continent) {
  return visitedCountries(customState).filter(country => country.continent === continent).length;
}

function coordinatesToPoint([lat, lon]) {
  return {
    x: ((lon + 180) / 360) * 880 + 40,
    y: ((90 - lat) / 180) * 420 + 50
  };
}

function init() {
  $("#returnMenuLink").href = MENU_URL;
  bindNavigation();
  bindControls();
  renderAll();
  showSection(location.hash.replace("#", "") || "profile");
}

function bindNavigation() {
  $$("[data-section-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const section = link.dataset.sectionLink;
      showSection(section);
      history.replaceState(null, "", `#${section}`);
      $("#sideNav").classList.remove("open");
      $(".sidebar-toggle").setAttribute("aria-expanded", "false");
    });
  });

  $(".sidebar-toggle").addEventListener("click", () => {
    const nav = $("#sideNav");
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    $(".sidebar-toggle").setAttribute("aria-expanded", String(open));
  });

  window.addEventListener("hashchange", () => {
    showSection(location.hash.replace("#", "") || "profile");
  });
}

function bindControls() {
  $("#countrySearch").addEventListener("input", event => renderCountryList(event.target.value));
  $("#playerMode").addEventListener("change", event => {
    state.mode = event.target.value;
    saveState();
    renderProfile();
  });
  $("#nextTurnButton").addEventListener("click", () => {
    state.currentPlayer = (state.currentPlayer + 1) % 2;
    saveState();
    renderProfile();
    toast(`Σειρά παίζει τώρα: ${state.players[state.currentPlayer]}`);
  });
  $("#storyButton").addEventListener("click", () => {
    const country = countryById(selectedCountryId) || COUNTRIES[0];
    narrate(country);
    showSection("map");
  });
  $("#newMatchButton").addEventListener("click", () => {
    currentMatchCountryId = randomCountry().id;
    renderMatching();
  });
  $("#soundToggle").addEventListener("change", event => {
    state.settings.sound = event.target.checked;
    saveState();
    gentleSound(720);
  });
  $("#narrationToggle").addEventListener("change", event => {
    state.settings.narration = event.target.checked;
    saveState();
  });
  $("#resetProgressButton").addEventListener("click", () => {
    const keepSettings = state.settings;
    state = { ...structuredClone(DEFAULT_STATE), settings: keepSettings };
    saveState();
    renderAll();
    toast("Το διαβατήριο ξεκίνησε από την αρχή.");
  });
  $$(".album-tabs button").forEach(button => {
    button.addEventListener("click", () => {
      albumType = button.dataset.album;
      $$(".album-tabs button").forEach(btn => btn.classList.toggle("active", btn === button));
      renderAlbum();
    });
  });
}

function showSection(section) {
  if (!document.querySelector(`[data-section="${section}"]`)) section = "profile";
  $$("[data-section]").forEach(panel => panel.classList.toggle("active", panel.dataset.section === section));
  $$("[data-section-link]").forEach(link => link.classList.toggle("active", link.dataset.sectionLink === section));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderMap();
  renderCountryCard(selectedCountryId);
  renderProfile();
  renderContinents();
  renderCountryList();
  renderInfoGrids();
  renderMatching();
  renderPassport();
  renderAlbum();
  renderProgress();
  renderSettings();
}

function renderProfile() {
  $("#profileVisited").textContent = state.visited.length;
  $("#profileFlags").textContent = state.visited.length;
  $("#profileMissions").textContent = state.completedMissions.length;
  $("#playerMode").value = state.mode;
  $("#turnPanel").hidden = state.mode !== "two";
  $("#currentPlayerName").textContent = state.players[state.currentPlayer];
  updateMissions();
}

function renderMap() {
  const pins = $("#mapPins");
  pins.innerHTML = COUNTRIES.map(country => {
    const { x, y } = coordinatesToPoint(country.coordinates);
    const discovered = state.visited.includes(country.id);
    return `
      <g class="map-pin" role="button" tabindex="0" data-country-id="${country.id}" aria-label="${country.greekName}">
        <circle cx="${x}" cy="${y}" r="16" fill="${discovered ? "#16a34a" : "#ff4fa3"}" stroke="white" stroke-width="4"></circle>
        <text x="${x}" y="${y + 8}" text-anchor="middle">${country.flagEmoji}</text>
      </g>
    `;
  }).join("");

  $$(".map-pin").forEach(pin => {
    pin.addEventListener("click", () => openCountry(pin.dataset.countryId));
    pin.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCountry(pin.dataset.countryId);
      }
    });
  });
}

function openCountry(countryId) {
  selectedCountryId = countryId;
  renderCountryCard(countryId);
  gentleSound(540);
}

function renderCountryCard(countryId) {
  const country = countryById(countryId);
  if (!country) return;
  const visited = state.visited.includes(country.id);
  $("#countryCard").innerHTML = `
    <div class="country-card-inner">
      <div class="card-top">
        <div>
          <h3>${country.greekName}</h3>
          <div class="continent-label">${country.continent} · ${country.englishName}</div>
        </div>
        <div class="flag-big" aria-label="Σημαία ${country.greekName}">${country.flagEmoji}</div>
      </div>
      <div class="fact-list">
        ${factRow("🏛️", "Πρωτεύουσα", country.capital)}
        ${factRow("🗣️", "Γλώσσα", country.language)}
        ${factRow(country.landmarkIcon, "Ορόσημο", country.landmark)}
        ${factRow(country.foodIcon, "Γεύση", country.food)}
        ${factRow(country.animalIcon, "Ζώο ή φύση", country.animal)}
        ${factRow("✨", "Μικρό μυστικό", country.funFact)}
      </div>
      <div class="narration-box" id="narrationBox">
        ${storyText(country)}
      </div>
      <div class="card-actions">
        <button class="primary-action" type="button" id="addPassportButton">${visited ? "Σφραγίδα στο διαβατήριο ✓" : "Προσθήκη στο Διαβατήριο"}</button>
        <button class="soft-action" type="button" id="readStoryButton">Άκου/Διάβασε την ιστορία</button>
      </div>
    </div>
  `;

  $("#addPassportButton").addEventListener("click", () => visitCountry(country.id));
  $("#readStoryButton").addEventListener("click", () => narrate(country));
}

function factRow(icon, label, value) {
  return `<div class="fact-row"><span>${icon}</span><span><strong>${label}</strong>${value}</span></div>`;
}

function storyText(country) {
  return `Η Αριάνα ανοίγει τον χάρτη και ταξιδεύει στη ${country.greekName}. Εκεί βλέπει το ${country.landmark}, ακούει ${country.language}, δοκιμάζει ${country.food} και ανακαλύπτει: ${country.funFact}`;
}

function visitCountry(countryId) {
  const country = countryById(countryId);
  if (!country) return;
  if (!state.visited.includes(countryId)) {
    state.visited.push(countryId);
    state.timeline.unshift({
      id: `${countryId}-${Date.now()}`,
      text: `${activePlayer()} ανακάλυψε τη χώρα ${country.greekName} και πήρε σφραγίδα ${country.flagEmoji}.`,
      time: new Date().toLocaleDateString("el-GR")
    });
    state.timeline = state.timeline.slice(0, 12);
    toast(`Νέα σφραγίδα: ${country.greekName} ${country.flagEmoji}`);
  } else {
    toast(`Η ${country.greekName} είναι ήδη στο διαβατήριο.`);
  }
  saveState();
  renderAll();
  renderCountryCard(countryId);
}

function activePlayer() {
  return state.mode === "two" ? state.players[state.currentPlayer] : "Η Αριάνα";
}

function narrate(country) {
  $("#narrationBox")?.scrollIntoView({ behavior: "smooth", block: "center" });
  toast(state.settings.narration ? storyText(country) : "Η αφήγηση κειμένου είναι απενεργοποιημένη.");
  gentleSound(660);
}

function renderContinents() {
  $("#continentGrid").innerHTML = CONTINENTS.map(continent => {
    const total = COUNTRIES.filter(country => country.continent === continent).length;
    const discovered = countVisitedByContinent(state, continent);
    const pct = total ? Math.round((discovered / total) * 100) : 0;
    return `
      <article class="continent-card">
        <h3>${continent}</h3>
        <p>${discovered} από ${total} χώρες ανακαλύφθηκαν.</p>
        <div class="mini-meter" aria-label="Πρόοδος ${continent} ${pct}%"><i style="width:${pct}%"></i></div>
      </article>
    `;
  }).join("");
}

function renderCountryList(filter = "") {
  const normalized = filter.trim().toLocaleLowerCase("el-GR");
  const rows = COUNTRIES
    .filter(country => !normalized || `${country.greekName} ${country.englishName} ${country.continent}`.toLocaleLowerCase("el-GR").includes(normalized))
    .map(country => `
      <article class="country-row">
        <span class="tiny-flag">${country.flagEmoji}</span>
        <div>
          <h3>${country.greekName}</h3>
          <p>${country.continent} · ${country.capital} · ${country.language}</p>
        </div>
        <button type="button" data-open-country="${country.id}">Άνοιγμα</button>
      </article>
    `).join("");
  $("#countryList").innerHTML = rows || `<p class="feedback">Δεν βρέθηκε χώρα με αυτή την αναζήτηση. Δοκίμασε άλλο όνομα.</p>`;
  $$("[data-open-country]").forEach(button => {
    button.addEventListener("click", () => {
      openCountry(button.dataset.openCountry);
      showSection("map");
    });
  });
}

function renderInfoGrids() {
  $("#capitalGrid").innerHTML = COUNTRIES.map(country => infoCard(country.flagEmoji, `${country.capital}`, `${country.greekName} · ${country.continent}`)).join("");
  $("#landmarkGrid").innerHTML = COUNTRIES.map(country => infoCard(country.landmarkIcon, country.landmark, country.greekName)).join("");
  $("#natureGrid").innerHTML = COUNTRIES.map(country => infoCard(country.animalIcon, country.animal, `${country.greekName}: ${country.funFact}`)).join("");
  $("#foodGrid").innerHTML = COUNTRIES.map(country => infoCard(country.foodIcon, country.food, `Μια γεύση από ${country.greekName}`)).join("");
}

function infoCard(icon, title, text) {
  return `<article class="info-card"><h3><span>${icon}</span> ${title}</h3><p>${text}</p></article>`;
}

function renderMatching() {
  const country = countryById(currentMatchCountryId) || randomCountry();
  currentMatchCountryId = country.id;
  selectedSticker = null;
  $("#matchCountry").innerHTML = `
    <h3>${country.greekName}</h3>
    <p>${country.continent} · ${country.capital}</p>
    ${dropSlot("flag", "Σημαία")}
    ${dropSlot("landmark", "Ορόσημο")}
    ${dropSlot("food", "Φαγητό")}
    ${dropSlot("animal", "Ζώο ή φύση")}
  `;

  const distractors = pickDistractors(country, 8);
  const stickers = [
    sticker(country.id, "flag", country.flagEmoji, `Σημαία ${country.greekName}`),
    sticker(country.id, "landmark", country.landmarkIcon, country.landmark),
    sticker(country.id, "food", country.foodIcon, country.food),
    sticker(country.id, "animal", country.animalIcon, country.animal),
    ...distractors
  ].sort(() => Math.random() - 0.5);

  $("#stickerTray").innerHTML = stickers.join("");
  $("#matchFeedback").textContent = "Σύρε ή πάτησε ένα αυτοκόλλητο και σύνδεσέ το με τη χώρα.";
  bindMatchingEvents();
}

function dropSlot(type, label) {
  return `<div class="drop-slot" data-drop-type="${type}"><span>${label}</span><strong>Άδειο</strong></div>`;
}

function sticker(countryId, type, icon, label) {
  return `
    <button class="sticker" type="button" draggable="true" data-sticker-country="${countryId}" data-sticker-type="${type}">
      <span class="sticker-icon">${icon}</span>
      <strong>${label}</strong>
      <small>${typeLabel(type)}</small>
    </button>
  `;
}

function typeLabel(type) {
  return { flag: "σημαία", landmark: "ορόσημο", food: "φαγητό", animal: "ζώο" }[type];
}

function pickDistractors(targetCountry, count) {
  return COUNTRIES
    .filter(country => country.id !== targetCountry.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((country, index) => {
      const types = ["flag", "landmark", "food", "animal"];
      const type = types[index % types.length];
      const icon = type === "flag" ? country.flagEmoji : country[`${type}Icon`];
      const label = type === "flag" ? `Σημαία ${country.greekName}` : country[type];
      return sticker(country.id, type, icon, label);
    });
}

function bindMatchingEvents() {
  $$(".sticker").forEach(item => {
    item.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", JSON.stringify({
        country: item.dataset.stickerCountry,
        type: item.dataset.stickerType,
        label: item.querySelector("strong").textContent
      }));
    });
    item.addEventListener("click", () => {
      selectedSticker = item;
      $$(".sticker").forEach(stickerEl => stickerEl.classList.toggle("selected", stickerEl === item));
      $("#matchFeedback").textContent = `Διάλεξες: ${item.querySelector("strong").textContent}. Τώρα πάτησε τη σωστή θέση στη γωνιά.`;
    });
  });

  $$(".drop-slot").forEach(slot => {
    slot.addEventListener("dragover", event => event.preventDefault());
    slot.addEventListener("drop", event => {
      event.preventDefault();
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      handleDrop(slot, data);
    });
    slot.addEventListener("click", () => {
      if (!selectedSticker) return;
      handleDrop(slot, {
        country: selectedSticker.dataset.stickerCountry,
        type: selectedSticker.dataset.stickerType,
        label: selectedSticker.querySelector("strong").textContent
      });
    });
  });
}

function handleDrop(slot, data) {
  const correct = data.country === currentMatchCountryId && data.type === slot.dataset.dropType;
  if (correct) {
    slot.classList.add("ready");
    slot.querySelector("strong").textContent = data.label;
    $("#matchFeedback").textContent = "Τέλεια σύνδεση!";
    gentleSound(760);
    if ($$(".drop-slot.ready").length === 4) {
      visitCountry(currentMatchCountryId);
      $("#matchFeedback").textContent = "Η γωνιά της χώρας είναι έτοιμη και μπήκε σφραγίδα στο διαβατήριο!";
    }
  } else {
    $("#matchFeedback").textContent = gentleHint(data.type);
    gentleSound(320);
  }
}

function gentleHint(type) {
  const hints = {
    flag: "Δοκίμασε ξανά, αυτή η σημαία ταξίδεψε σε άλλη χώρα!",
    landmark: "Ωραία προσπάθεια, αυτό το ορόσημο ανήκει σε άλλο ταξίδι.",
    food: "Αυτή η γεύση μυρίζει άλλη χώρα. Ψάξε λίγο ακόμα!",
    animal: "Αυτό το ζώο μάλλον πήγε βόλτα σε άλλη φύση."
  };
  return hints[type] || "Δοκίμασε ξανά με περιέργεια.";
}

function renderPassport() {
  const visibleCountries = [...visitedCountries(), ...COUNTRIES.filter(country => !state.visited.includes(country.id)).slice(0, 8)];
  $("#stampGrid").innerHTML = visibleCountries.map(country => {
    const discovered = state.visited.includes(country.id);
    return `
      <div class="stamp ${discovered ? "" : "locked"}">
        <span>${discovered ? country.flagEmoji : "?"}</span>
        <strong>${discovered ? country.greekName : "Νέα χώρα"}</strong>
      </div>
    `;
  }).join("");
  renderMissions();
}

function updateMissions() {
  MISSIONS.forEach(mission => {
    if (mission.test(state) && !state.completedMissions.includes(mission.id)) {
      state.completedMissions.push(mission.id);
      state.timeline.unshift({
        id: `${mission.id}-${Date.now()}`,
        text: `Ολοκληρώθηκε αποστολή: ${mission.title}.`,
        time: new Date().toLocaleDateString("el-GR")
      });
      saveState();
      toast(`Αποστολή ολοκληρώθηκε: ${mission.title}`);
    }
  });
}

function renderMissions() {
  updateMissions();
  $("#missionList").innerHTML = MISSIONS.map(mission => {
    const done = state.completedMissions.includes(mission.id);
    return `
      <article class="mission-card ${done ? "completed" : ""}">
        <span class="mission-icon">${mission.icon}</span>
        <div>
          <h3>${mission.title}</h3>
          <p>${done ? "Μπήκε στο ταξιδιωτικό ημερολόγιο." : "Συνέχισε την εξερεύνηση για να τη συμπληρώσεις."}</p>
        </div>
        <button type="button" data-section-link="map">${done ? "Προβολή" : "Ταξίδι"}</button>
      </article>
    `;
  }).join("");
  $$("[data-section-link='map']").forEach(button => {
    if (button.tagName === "BUTTON") button.addEventListener("click", () => showSection("map"));
  });
}

function renderAlbum() {
  const data = COUNTRIES.map(country => {
    const discovered = state.visited.includes(country.id);
    const iconMap = {
      flags: country.flagEmoji,
      landmarks: country.landmarkIcon,
      foods: country.foodIcon,
      animals: country.animalIcon
    };
    const labelMap = {
      flags: country.greekName,
      landmarks: country.landmark,
      foods: country.food,
      animals: country.animal
    };
    return `
      <article class="album-item ${discovered ? "" : "locked"}">
        <div>
          <span>${discovered ? iconMap[albumType] : "🔒"}</span>
          <h3>${discovered ? labelMap[albumType] : "Κρυμμένο αυτοκόλλητο"}</h3>
          <p>${discovered ? country.greekName : "Ανακάλυψε τη χώρα για να ανοίξει."}</p>
        </div>
      </article>
    `;
  }).join("");
  $("#albumGrid").innerHTML = data;
}

function renderProgress() {
  const pct = Math.round((state.visited.length / COUNTRIES.length) * 100);
  $("#overallPercent").textContent = `${pct}%`;
  $("#overallMeter").style.width = `${pct}%`;
  $("#timeline").innerHTML = state.timeline.length
    ? state.timeline.map(item => `<div class="timeline-item"><strong>${item.time}</strong><br>${item.text}</div>`).join("")
    : `<div class="timeline-item">Το ημερολόγιο περιμένει την πρώτη ανακάλυψη.</div>`;
}

function renderSettings() {
  $("#soundToggle").checked = state.settings.sound;
  $("#narrationToggle").checked = state.settings.narration;
}

function randomCountry() {
  return COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
}

function toast(message) {
  const toastEl = $("#toast");
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(toastEl.hideTimer);
  toastEl.hideTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2600);
}

function gentleSound(freq) {
  if (!state.settings.sound) return;
  try {
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.frequency.value = freq;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);
    oscillator.connect(gain).connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
  } catch {
    // Future audio narration can replace this tiny optional sound hook.
  }
}

document.addEventListener("DOMContentLoaded", init);
