// ============================================================
    //  ΜΈΛΗ KATSEYE — με πλήρη στοιχεία για τις κάρτες!
    // ============================================================
    const MEMBERS = [
      {
        name: "Sophia",
        emoji: "🌟",
        color: "#ff4fa3",
        flag: "🇵🇭",
        country: "Philippines/USA",
        role: "Leader & Main Vocalist",
        fact: "Κόρη διάσημης Φιλιππινέζας τραγουδίστριας — το τραγούδι είναι στο αίμα της!"
      },
      {
        name: "Manon",
        emoji: "💜",
        color: "#a855f7",
        flag: "🇨🇭",
        country: "Switzerland",
        role: "Vocalist",
        fact: "Μιλάει Αγγλικά και Ελβετικά Γερμανικά — έγραφε τραγούδια από τα 15!"
      },
      {
        name: "Daniela",
        emoji: "🔥",
        color: "#f97316",
        flag: "🇺🇸",
        country: "USA",
        role: "Main Rapper & Main Dancer",
        fact: "Χορεύει από τα 4 της! Η μαμά της ήταν παγκόσμια πρωταθλήτρια στο ballroom!"
      },
      {
        name: "Lara",
        emoji: "🌊",
        color: "#22d3ee",
        flag: "🇺🇸",
        country: "USA (Indian-American)",
        role: "Lead Dancer & Vocalist",
        fact: "Η πρώτη Ινδή καλλιτέχνης στην HYBE! Αγαπά τα crystals και τον καφέ!"
      },
      {
        name: "Megan",
        emoji: "⚡",
        color: "#fbbf24",
        flag: "🇺🇸",
        country: "USA",
        role: "Lead Dancer",
        fact: "Έχει παίξει σε Disney Channel και έχει περπατήσει σε Paris Fashion Week!"
      },
      {
        name: "Yoonchae",
        emoji: "🌙",
        color: "#f472b6",
        flag: "🇰🇷",
        country: "South Korea",
        role: "Vocalist & Maknae",
        fact: "Είναι η πιο νέα — αποφοίτησε από λύκειο ενώ ετοίμαζαν το πρώτο τους EP!"
      },
    ];

    // ============================================================
    //  ΕΡΩΤΉΣΕΙΣ ΚΟΥΊΖ
    // ============================================================
    const QUESTIONS = [
      {
        q: "💃 Τι σημαίνει 'χορογραφία' στο K-pop;",
        opts: ["Οι στίχοι του τραγουδιού", "Οι σχεδιασμένες κινήσεις χορού", "Τα ρούχα της μπάντας", "Το μουσικό βίντεο"],
        ans: 1,
        fact: "Η χορογραφία είναι η τέχνη του σχεδιασμού των κινήσεων χορού! Τα K-pop γκρουπ εξασκούνται για ΏΡΕΣ κάθε μέρα! 💪"
      },
      {
        q: "🎶 Η KATSEYE έκανε ντεμπούτο το 2024! Από ποια χώρα είναι η εταιρεία τους;",
        opts: ["Νότια Κορέα", "Ιαπωνία", "ΗΠΑ", "Βραζιλία"],
        ans: 2,
        fact: "Η KATSEYE έχει συμβόλαιο με την Geffen Records στις ΗΠΑ και την HYBE στη Νότια Κορέα — διεθνείς σούπερσταρ! 🌎"
      },
      {
        q: "🌟 Στο K-pop, ποιος είναι το 'center' ενός γκρουπ;",
        opts: [
          "Το πιο κοντό μέλος",
          "Το μέλος που στέκεται στη μέση κατά τις εμφανίσεις",
          "Ο αρχηγός του γκρουπ",
          "Ο βασικός τραγουδιστής"
        ],
        ans: 1,
        fact: "Το center είναι συνήθως το πιο ορατό μέλος — στέκεται ακριβώς στη μέση της σκηνής! 🎯"
      },
      {
        q: "💜 Τι σημαίνει το 'aegyo' (애교) στην κουλτούρα του K-pop;",
        opts: [
          "Ένα είδος γρήγορης κίνησης χορού",
          "Ένα παραδοσιακό κορεατικό όργανο",
          "Χαριτωμένη, γλυκιά συμπεριφορά για να χαμογελούν οι φαν",
          "Το όνομα του fan club του γκρουπ"
        ],
        ans: 2,
        fact: "Το aegyo είναι να συμπεριφέρεσαι υπερ-χαριτωμένα — όπως να κλείνεις το μάτι, να μιλάς με φωνούλα, ή να κάνεις καρδούλες με τα χέρια σου! 🥰"
      },
      {
        q: "🎤 Τι είναι ένα 'fancam' στο K-pop;",
        opts: [
          "Μια κάμερα μέσα στο κινητό του φαν",
          "Ένα βίντεο που εστιάζει σε ένα μόνο μέλος κατά τη διάρκεια παράστασης",
          "Μια επανάληψη σε αργή κίνηση",
          "Η κύρια κάμερα της συναυλίας"
        ],
        ans: 1,
        fact: "Τα fancams είναι βίντεο όπου μια κάμερα ακολουθεί μόνο ΈΝΑ μέλος όλη την ώρα — κάθε αληθινός φαν έχει τον αγαπημένο του! 📹"
      },
      {
        q: "🕺 Ποια από αυτές είναι μια αληθινή κίνηση χορού K-pop;",
        opts: ["The Moonwalk Step", "The Body Roll", "The Star Hop", "The Rainbow Flip"],
        ans: 1,
        fact: "Το body roll είναι πολύ δημοφιλές στο K-pop! Κουνάς το σώμα σου σαν κύμα από το στήθος μέχρι τους γοφούς. Δοκίμασέ το! 🌊"
      },
      {
        q: "⭐ Μέσα από ποιο τηλεοπτικό διαγωνισμό σχηματίστηκε η KATSEYE;",
        opts: [
          "American Idol",
          "K-pop Star",
          "The Debut: Dream Academy",
          "Dancing with the Stars"
        ],
        ans: 2,
        fact: "Το The Debut: Dream Academy ήταν το μέρος όπου έξι πανταλαντούχες κοπέλες ήρθαν μαζί για να σχηματίσουν την KATSEYE! 🏆"
      },
    ];

    // ============================================================
    //  ΠΡΟΚΛΉΣΕΙΣ ΧΟΡΟΎ & ΑΘΛΗΤΙΣΜΟΎ
    // ============================================================
    const CHALLENGES = [
      { emoji:"💃", count:"8 φορές!", text:"Κάνε την καλύτερη K-pop idol πόζα σου! Κράτα τη για 3 δευτερόλεπτα κάθε φορά. Είσαι αστέρι, Αριάνα!" },
      { emoji:"🤸", count:"5 τούμπες!", text:"Κάνε τις καλύτερες τούμπες γυμναστικής σου! Η KATSEYE θα ήταν ΤΌΣΟ εντυπωσιασμένη!" },
      { emoji:"🌊", count:"20 δευτερόλεπτα!", text:"Κάνε πως κολυμπάς πεταλούδα όρθια — χέρια πάνω από το κεφάλι σου σαν κύματα! Συνέχισε!" },
      { emoji:"⭐", count:"10 αστεράτα άλματα!", text:"Πήδα όσο πιο ψηλά μπορείς με τα χέρια και τα πόδια ανοιχτά σαν αστέρι! Μπορείς!" },
      { emoji:"🎶", count:"1 ολόκληρο τραγούδι!", text:"Διάλεξε το αγαπημένο σου τραγούδι KATSEYE και χόρεψε ΟΛΟ. Χωρίς σταμάτημα! 🎤" },
      { emoji:"🤸", count:"8 άλματα!", text:"Κάνε τα καλύτερα γυμναστικά άλματα τυφλοπόντικα — τράβα τα γόνατά σου όσο πιο ψηλά μπορείς κάθε φορά!" },
      { emoji:"💫", count:"3 φορές!", text:"Φτιάξε τη δική σου κίνηση χορού K-pop 8 χτύπων και εκτέλεσέ τη 3 φορές. Γύρισέ το αν θες — είσαι χορογράφος τώρα!" },
    ];

    // ============================================================
    //  ΚΑΤΆΣΤΑΣΗ ΠΑΙΧΝΙΔΙΟΎ
    // ============================================================
    let score = 0;
    let currentQ = 0;
    let selectedMember = "";
    let answered = false;

    // ============================================================
    //  ΣΚΟΡΜΠΟΡΝΤ (localStorage)
    // ============================================================
    const BEST_SCORE_KEY = "ariana_best_score";

    function getBestScore() {
      return parseInt(localStorage.getItem(BEST_SCORE_KEY) || "0", 10);
    }

    function saveBestScore(s) {
      localStorage.setItem(BEST_SCORE_KEY, String(s));
    }

    function updateBestScoreDisplay() {
      document.getElementById("bestScoreDisplay").textContent = getBestScore();
    }

    function clearBestScore() {
      localStorage.removeItem(BEST_SCORE_KEY);
      updateBestScoreDisplay();
    }

    // ============================================================
    //  WEB AUDIO API — Ήχοι χωρίς εξωτερικά αρχεία
    // ============================================================
    let audioCtx = null;
    let soundEnabled = true;

    // Δημιουργούμε το AudioContext μόνο μετά από κάποια αλληλεπίδραση
    function ensureAudioCtx() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
    }

    // Βοηθητική: παίζει μια νότα
    function playNote(freq, startTime, duration, type = "sine", gainVal = 0.3) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    }

    // ✅ Σωστή απάντηση: ανερχόμενη μελωδία C-E-G
    function playCorrectSound() {
      if (!soundEnabled) return;
      ensureAudioCtx();
      const t = audioCtx.currentTime;
      playNote(523.25, t,        0.2, "sine", 0.3); // C5
      playNote(659.25, t + 0.22, 0.2, "sine", 0.3); // E5
      playNote(783.99, t + 0.44, 0.3, "sine", 0.35); // G5
    }

    // ❌ Λάθος απάντηση: κατερχόμενη θλιβερή μελωδία
    function playWrongSound() {
      if (!soundEnabled) return;
      ensureAudioCtx();
      const t = audioCtx.currentTime;
      playNote(392.00, t,        0.25, "sawtooth", 0.2); // G4
      playNote(261.63, t + 0.28, 0.4,  "sawtooth", 0.2); // C4
    }

    // 💜 Επιλογή μέλους: sparkle (γρήγορες ψηλές νότες)
    function playMemberSelectSound() {
      if (!soundEnabled) return;
      ensureAudioCtx();
      const t = audioCtx.currentTime;
      const freqs = [1046.5, 1318.5, 1567.98, 2093];
      freqs.forEach((f, i) => {
        playNote(f, t + i * 0.07, 0.12, "sine", 0.2);
      });
    }

    // 🎉 Έναρξη παιχνιδιού: fanfare
    function playStartSound() {
      if (!soundEnabled) return;
      ensureAudioCtx();
      const t = audioCtx.currentTime;
      playNote(523.25, t,        0.15, "square", 0.25); // C5
      playNote(659.25, t + 0.17, 0.15, "square", 0.25); // E5
      playNote(783.99, t + 0.34, 0.15, "square", 0.25); // G5
      playNote(1046.5, t + 0.51, 0.35, "square", 0.3);  // C6
    }

    // 🏆 Νέο ρεκόρ: 5 νότες πανηγυρισμού
    function playNewRecordSound() {
      if (!soundEnabled) return;
      ensureAudioCtx();
      const t = audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      notes.forEach((f, i) => {
        playNote(f, t + i * 0.18, 0.25, "sine", 0.35);
      });
    }

    // Κουμπί εναλλαγής ήχου
    document.getElementById("soundToggle").addEventListener("click", function () {
      ensureAudioCtx();
      soundEnabled = !soundEnabled;
      this.textContent = soundEnabled ? "🔊" : "🔇";
    });

    // ============================================================
    //  ΧΟΡΕΥΤΉΣ — animations
    // ============================================================
    function dancerCelebrate() {
      const d = document.getElementById("dancer");
      d.classList.remove("celebrate", "sad");
      // Μικρή καθυστέρηση για να γίνει reflow
      void d.offsetWidth;
      d.classList.add("celebrate");
      setTimeout(() => {
        d.classList.remove("celebrate");
      }, 2100);
    }

    function dancerSad() {
      const d = document.getElementById("dancer");
      d.classList.remove("celebrate", "sad");
      void d.offsetWidth;
      d.classList.add("sad");
      setTimeout(() => {
        d.classList.remove("sad");
      }, 1100);
    }

    // ============================================================
    //  ΚΙΝΟΎΜΕΝΗ ΕΙΚΌΝΑ ΑΙΩΡΟΎΜΕΝΩΝ ΑΣΤΕΡΙΏΝ
    // ============================================================
    function createStars() {
      const container = document.getElementById("starsContainer");
      const icons = ["⭐","💫","✨","🌟","💜","💗","🩷"];
      for (let i = 0; i < 30; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.textContent = icons[Math.floor(Math.random() * icons.length)];
        star.style.left = Math.random() * 100 + "vw";
        star.style.animationDuration = (6 + Math.random() * 12) + "s";
        star.style.animationDelay = (Math.random() * 10) + "s";
        star.style.fontSize = (0.8 + Math.random() * 1.2) + "rem";
        container.appendChild(star);
      }
    }

    // ============================================================
    //  ΔΗΜΙΟΥΡΓΊΑ ΚΟΥΜΠΙΏΝ ΜΕΛΏΝ
    // ============================================================
    function buildMemberButtons() {
      const grid = document.getElementById("membersGrid");
      MEMBERS.forEach((member, index) => {
        const btn = document.createElement("button");
        btn.className = "member-btn";
        btn.id = "member-" + index;
        btn.innerHTML = `<span class="emoji">${member.emoji}</span>${member.name}`;
        btn.onclick = () => selectMember(index);
        grid.appendChild(btn);
      });
    }

    // ============================================================
    //  ΕΠΙΛΟΓΉ ΜΈΛΟΥΣ — εμφανίζει κάρτα πληροφοριών
    // ============================================================
    function selectMember(index) {
      ensureAudioCtx();
      playMemberSelectSound();

      MEMBERS.forEach((_, i) => {
        document.getElementById("member-" + i).classList.remove("active");
      });
      document.getElementById("member-" + index).classList.add("active");
      selectedMember = MEMBERS[index].name;

      // Ενημέρωσε την κάρτα πληροφοριών μέλους
      const m = MEMBERS[index];
      document.getElementById("memberInfoEmoji").textContent = m.emoji;
      document.getElementById("memberInfoName").textContent = m.flag + " " + m.name + " — " + m.country;
      document.getElementById("memberInfoMeta").textContent = "🎤 " + m.role;
      document.getElementById("memberInfoFact").textContent = "💡 " + m.fact;

      const card = document.getElementById("memberInfoCard");
      card.classList.remove("show");
      void card.offsetWidth; // reflow για να ξαναπαίξει animation
      card.classList.add("show");

      document.getElementById("startBtn").disabled = false;
    }

    // ============================================================
    //  ΈΝΑΡΞΗ ΠΑΙΧΝΙΔΙΟΎ
    // ============================================================
    function startGame() {
      ensureAudioCtx();
      playStartSound();
      document.getElementById("memberSection").style.display = "none";
      document.getElementById("quizSection").style.display = "block";
      showQuestion();
    }

    // ============================================================
    //  ΕΜΦΆΝΙΣΗ ΕΡΏΤΗΣΗΣ
    // ============================================================
    function showQuestion() {
      answered = false;
      const q = QUESTIONS[currentQ];
      const pct = (currentQ / QUESTIONS.length) * 100;
      document.getElementById("progressBar").style.width = pct + "%";
      document.getElementById("qNumDisplay").textContent = currentQ + 1;
      document.getElementById("questionBox").textContent = q.q;

      const grid = document.getElementById("optionsGrid");
      grid.innerHTML = "";
      q.opts.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i);
        grid.appendChild(btn);
      });

      const fb = document.getElementById("feedback");
      fb.className = "feedback";
      fb.textContent = "";
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("challengeCard").classList.remove("show");
    }

    // ============================================================
    //  ΈΛΕΓΧΟΣ ΑΠΆΝΤΗΣΗΣ
    // ============================================================
    function checkAnswer(chosen) {
      if (answered) return;
      answered = true;

      ensureAudioCtx();

      const q = QUESTIONS[currentQ];
      const buttons = document.querySelectorAll(".option-btn");
      buttons.forEach(b => b.disabled = true);

      const fb = document.getElementById("feedback");

      if (chosen === q.ans) {
        buttons[chosen].classList.add("correct");
        score += 10;
        document.getElementById("scoreDisplay").textContent = score;
        fb.textContent = "⭐ ΜΠΡΑΒΟ! Το έπιασες! " + q.fact;
        fb.className = "feedback good show";
        playCorrectSound();
        dancerCelebrate();
        showChallenge();
      } else {
        buttons[chosen].classList.add("wrong");
        buttons[q.ans].classList.add("correct");
        fb.textContent = "Όχι ακριβώς! Η απάντηση ήταν: " + q.opts[q.ans] + " — " + q.fact;
        fb.className = "feedback bad show";
        playWrongSound();
        dancerSad();
      }

      document.getElementById("nextBtn").style.display = "inline-block";
    }

    // ============================================================
    //  ΕΜΦΆΝΙΣΗ ΠΡΌΚΛΗΣΗΣ ΧΟΡΟΎ
    // ============================================================
    function showChallenge() {
      const ch = CHALLENGES[currentQ % CHALLENGES.length];
      document.getElementById("challengeEmoji").textContent = ch.emoji;
      document.getElementById("challengeCount").textContent = ch.count;
      document.getElementById("challengeText").textContent = ch.text;
      document.getElementById("challengePlaceholder").style.display = "none";
      document.getElementById("challengeCard").classList.add("show");
    }

    // ============================================================
    //  ΕΠΌΜΕΝΗ ΕΡΏΤΗΣΗ
    // ============================================================
    function nextQuestion() {
      currentQ++;
      if (currentQ >= QUESTIONS.length) {
        showResults();
      } else {
        showQuestion();
      }
    }

    // ============================================================
    //  ΕΜΦΆΝΙΣΗ ΑΠΟΤΕΛΕΣΜΆΤΩΝ — με έλεγχο ρεκόρ
    // ============================================================
    function showResults() {
      document.getElementById("quizSection").style.display = "none";

      const total = QUESTIONS.length * 10;
      const section = document.getElementById("resultsSection");
      const emoji   = document.getElementById("resultsEmoji");
      const title   = document.getElementById("resultsTitle");
      const msg     = document.getElementById("resultsMsg");

      document.getElementById("progressBar").style.width = "100%";

      // Έλεγχος νέου ρεκόρ
      const prevBest = getBestScore();
      const isNewRecord = score > prevBest;
      if (isNewRecord) {
        saveBestScore(score);
        updateBestScoreDisplay();
        document.getElementById("newRecordBanner").classList.add("show");
        playNewRecordSound();
        dancerCelebrate();
      } else {
        document.getElementById("newRecordBanner").classList.remove("show");
      }

      if (score === total) {
        emoji.textContent = "🏆";
        title.textContent = "ΤΈΛΕΙΟ ΣΚΟΡ! ΕΊΣΑΙ ΘΡΎΛΟΣ!";
        msg.textContent = `ΩΑΩ, Αριάνα! ${score}/${total} αστέρια! Ξέρεις ΤΑ ΠΑΝΤΑ για το K-pop! Η ${selectedMember} θα ήταν ΤΌΣΟ περήφανη για σένα! Είσαι ειδικός K-pop τώρα! 🎤✨`;
      } else if (score >= total * 0.7) {
        emoji.textContent = "🌟";
        title.textContent = "Απίθανη Δουλειά, Αριάνα!";
        msg.textContent = `Έκανες ${score}/${total} αστέρια! Ξέρεις πολύ καλά το K-pop σου! Η ${selectedMember} σίγουρα θα ήθελε να σε έχει στην KATSEYE! Συνέχισε να χορεύεις! 💃`;
      } else if (score >= total * 0.4) {
        emoji.textContent = "💜";
        title.textContent = "Μεγάλη Προσπάθεια, Αστέρι Χορού!";
        msg.textContent = `Έκανες ${score}/${total} αστέρια! Κάθε αστέρι K-pop ξεκινά κάπου — συνέχισε να μαθαίνεις και να παίζεις! Η ${selectedMember} πιστεύει σε σένα! 💪`;
      } else {
        emoji.textContent = "🎶";
        title.textContent = "Συνέχισε να Εξασκείσαι, Σούπερσταρ!";
        msg.textContent = `Έκανες ${score}/${total} αστέρια αυτή τη φορά! Παίξε ξανά και θα τα πας ακόμα καλύτερα — τα αστέρια K-pop ποτέ δεν τα παρατάνε! Η ${selectedMember} λέει: ΤΑ ΚΑΤΑΦΈΡΝΕΙΣ! 🌟`;
      }

      section.classList.add("show");
    }

    // ============================================================
    //  ΕΠΑΝΑΦΟΡΆ ΠΑΙΧΝΙΔΙΟΎ
    // ============================================================
    function resetGame() {
      score = 0;
      currentQ = 0;
      selectedMember = "";
      answered = false;

      document.getElementById("scoreDisplay").textContent = "0";
      document.getElementById("qNumDisplay").textContent = "0";
      document.getElementById("progressBar").style.width = "0%";
      document.getElementById("newRecordBanner").classList.remove("show");

      MEMBERS.forEach((_, i) => {
        const btn = document.getElementById("member-" + i);
        if (btn) btn.classList.remove("active");
      });

      document.getElementById("memberInfoCard").classList.remove("show");
      document.getElementById("startBtn").disabled = true;
      document.getElementById("memberSection").style.display = "block";
      document.getElementById("quizSection").style.display = "none";
      document.getElementById("resultsSection").classList.remove("show");
      document.getElementById("challengeCard").classList.remove("show");
      document.getElementById("challengePlaceholder").style.display = "block";
    }

    // ============================================================
    //  ΕΚΚΊΝΗΣΗ ΌΛΩΝ ΌΤΑΝ ΦΟΡΤΏΝΕΙ Η ΣΕΛΊΔΑ
    // ============================================================
    createStars();
    buildMemberButtons();
    updateBestScoreDisplay(); // Διάβασε και εμφάνισε το αποθηκευμένο ρεκόρ
