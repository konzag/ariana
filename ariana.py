# -*- coding: utf-8 -*-
"""
ariana.py — Το Terminal KATSEYE Fan Club της Αριάνας! 🌟
=========================================================
Αυτό είναι το πρώτο πρόγραμμα Python της Αριάνας!
Η Python είναι μια γλώσσα προγραμματισμού που λέει στον υπολογιστή τι να κάνει.
Κάθε γραμμή κώδικα εδώ είναι μια εντολή για τον υπολογιστή να ακολουθήσει.

Πώς να το εκτελέσεις:
    python ariana.py
"""

import time    # Το 'time' μας επιτρέπει να κάνουμε το πρόγραμμα να κάνει παύση για ένα δευτερόλεπτο
import random  # Το 'random' μας επιτρέπει να επιλέγουμε πράγματα τυχαία (σαν να ανακατεύουμε χαρτιά!)
import sys     # Το 'sys' μας δίνει πληροφορίες για τον υπολογιστή

# ------------------------------------------------------------------
# Προσπαθούμε να εισάγουμε τη colorama, που προσθέτει χρώμα στο terminal.
# Αν η colorama δεν είναι εγκατεστημένη, χρησιμοποιούμε απλό κείμενο — χωρίς πρόβλημα!
# Το "try/except" σημαίνει: "δοκίμασε αυτόν τον κώδικα, και αν δεν δουλέψει, κάνε
# αυτό αντ' αυτού." Είναι σαν εφεδρικό σχέδιο!
# ------------------------------------------------------------------
try:
    from colorama import init, Fore, Back, Style
    init(autoreset=True)   # autoreset=True σημαίνει ότι τα χρώματα επαναφέρονται μετά από κάθε εκτύπωση
    COLOR = True
except ImportError:
    COLOR = False          # Χωρίς colorama; Θα χρησιμοποιήσουμε απλό κείμενο.

# ------------------------------------------------------------------
# ΒΟΗΘΗΤΙΚΈΣ ΣΥΝΑΡΤΉΣΕΙΣ
# Μια "συνάρτηση" είναι ένα μίνι-πρόγραμμα μέσα στο μεγάλο πρόγραμμα.
# Γράφουμε συναρτήσεις ώστε να μπορούμε να επαναχρησιμοποιούμε τον ίδιο κώδικα πολλές φορές
# χωρίς να χρειάζεται να τον πληκτρολογούμε ξανά!
# ------------------------------------------------------------------

def colored(text, color_code="", bold=False):
    """
    Αυτή η συνάρτηση προσθέτει χρώμα στο κείμενο αν η colorama είναι διαθέσιμη.
    Αν όχι, επιστρέφει απλά το απλό κείμενο.
    Το 'def' σημαίνει ότι ΟΡΊΖΟΥΜΕ μια νέα συνάρτηση.
    Το 'text' είναι αυτό που θέλουμε να εκτυπώσουμε.
    Το 'color_code' είναι ποιο χρώμα να χρησιμοποιήσουμε.
    """
    if not COLOR:
        return text  # Χωρίς υποστήριξη χρώματος; Απλά επέστρεψε το απλό κείμενο
    prefix = (Style.BRIGHT if bold else "") + color_code
    return prefix + text + Style.RESET_ALL


def slow_print(text, delay=0.03):
    """
    Εκτύπωσε κείμενο έναν χαρακτήρα τη φορά, σαν γραφομηχανή!
    Το 'delay' είναι πόσα δευτερόλεπτα να περιμένουμε μεταξύ κάθε γράμματος.
    Αυτό κάνει την ανάγνωση πιο διασκεδαστική και δραματική. 🎭
    """
    for char in text:
        print(char, end="", flush=True)  # Το 'end=""' σημαίνει να μην προσθέσεις νέα γραμμή ακόμα
        time.sleep(delay)                # Περίμενε λίγο πριν το επόμενο γράμμα
    print()  # Τώρα πρόσθεσε τη νέα γραμμή στο τέλος


def print_line(char="─", width=55):
    """Εκτύπωσε μια διακοσμητική γραμμή στην οθόνη."""
    print(colored(char * width, Fore.MAGENTA if COLOR else ""))


def print_blank():
    """Εκτύπωσε μια κενή γραμμή (απλά για να προσθέσεις λίγο χώρο)."""
    print()


def press_enter(prompt="  Πάτησε ENTER για να συνεχίσεις... "):
    """Περίμενε να πατήσει η χρήστης Enter πριν προχωρήσει."""
    print()
    input(colored(prompt, Fore.CYAN if COLOR else ""))
    print()


# ------------------------------------------------------------------
# ΤΟ ΜΕΓΆΛΟ BANNER
# ASCII art είναι μια εικόνα φτιαγμένη εξ ολοκλήρου από γράμματα και σύμβολα!
# Αυτό γράφει "KATSEYE" με έναν διασκεδαστικό τρόπο.
# ------------------------------------------------------------------

BANNER = r"""
  ██╗  ██╗ █████╗ ████████╗███████╗███████╗██╗   ██╗███████╗
  ██║ ██╔╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝╚██╗ ██╔╝██╔════╝
  █████╔╝ ███████║   ██║   ███████╗█████╗   ╚████╔╝ █████╗
  ██╔═██╗ ██╔══██║   ██║   ╚════██║██╔══╝    ╚██╔╝  ██╔══╝
  ██║  ██╗██║  ██║   ██║   ███████║███████╗   ██║   ███████╗
  ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚══════╝
"""

# ------------------------------------------------------------------
# ΔΕΔΟΜΈΝΑ ΜΕΛΏΝ KATSEYE
# Στην Python, ένα "λεξικό" αποθηκεύει πληροφορίες σε ζεύγη:
#   κλειδί: τιμή
# Σαν ένα πραγματικό λεξικό όπου ψάχνεις μια λέξη για να βρεις τη σημασία της!
# Εδώ, το όνομα κάθε μέλους δείχνει σε ένα λεξικό πληροφοριών για αυτό.
# ------------------------------------------------------------------

MEMBERS = {
    "1": {
        "name":    "Sophia",
        "emoji":   "🌟",
        "color":   Fore.MAGENTA if COLOR else "",
        "country": "Φιλιππίνες/ΗΠΑ",
        "vibe":    "Η Sophia είναι η αρχηγός της KATSEYE — κόρη διάσημης Φιλιππινέζας τραγουδίστριας!",
        "facts": [
            "🇵🇭 Κόρη της διάσημης Φιλιππινέζας τραγουδίστριας — το τραγούδι είναι στο αίμα της!",
            "🌟 Είναι η αρχηγός (Leader) της KATSEYE και η Main Vocalist του γκρουπ!",
            "💫 Η Sophia εξασκείται απίστευτα σκληρά — ακριβώς όπως εσύ εξασκείσαι στη γυμναστική!",
        ],
        "challenge": {
            "emoji":       "🌟",
            "description": "ΠΡΟΚΛΗΣΗ ΦΩΝΗΣ SOPHIA: Στάσου ψηλά σαν pop star, πάρε μια μεγάλη ανάσα, και τραγούδησε το αγαπημένο σου τραγούδι KATSEYE όσο πιο δυνατά μπορείς!",
            "reps":        "Τραγούδησε 1 ολόκληρο ρεφρέν!",
        }
    },
    "2": {
        "name":    "Manon",
        "emoji":   "💜",
        "color":   Fore.CYAN if COLOR else "",
        "country": "Ελβετία",
        "vibe":    "Η Manon φέρνει ευρωπαϊκή κομψότητα — μιλά Αγγλικά και Ελβετικά Γερμανικά!",
        "facts": [
            "🇨🇭 Η Manon μεγάλωσε στην Ελβετία — μιλά Αγγλικά και Ελβετικά Γερμανικά!",
            "🎵 Έγραφε τραγούδια από τα 15 της! Είναι πραγματικά ταλαντούχα songwriter!",
            "💜 Εκπαιδεύτηκε στη Νότια Κορέα στην HYBE, μία από τις μεγαλύτερες εταιρείες K-pop.",
        ],
        "challenge": {
            "emoji":       "💜",
            "description": "ΠΡΟΚΛΗΣΗ ΚΟΜΨΟΤΗΤΑΣ MANON: Κάνε την πιο κομψή, χαριτωμένη κίνηση γυμναστικής σου — σαν να εμφανίζεσαι μπροστά σε ένα τεράστιο πλήθος στην Ελβετία!",
            "reps":        "Κράτα την καλύτερη πόζα σου για 10 δευτερόλεπτα!",
        }
    },
    "3": {
        "name":    "Daniela",
        "emoji":   "🔥",
        "color":   Fore.YELLOW if COLOR else "",
        "country": "ΗΠΑ",
        "vibe":    "Η Daniela χορεύει από τα 4 της — η μαμά της ήταν παγκόσμια πρωταθλήτρια ballroom!",
        "facts": [
            "🔥 Χορεύει από τα 4 της! Η ενέργειά της στη σκηνή είναι εκρηκτική!",
            "👑 Η μαμά της ήταν παγκόσμια πρωταθλήτρια στο ballroom — ο χορός είναι οικογενειακή υπόθεση!",
            "🎤 Είναι η Main Rapper ΚΑΙ Main Dancer της KATSEYE — διπλό ταλέντο!",
        ],
        "challenge": {
            "emoji":       "🔥",
            "description": "ΠΡΟΚΛΗΣΗ ΔΥΝΑΜΗΣ DANIELA: Κάνε τον πιο δυνατό, ενεργητικό χορό σου — πήδα, στριφογύρισε, και δώσε ΤΑ ΠΑΝΤΑ!",
            "reps":        "8 μεγάλα άλματα στη σειρά!",
        }
    },
    "4": {
        "name":    "Lara",
        "emoji":   "🌊",
        "color":   Fore.BLUE if COLOR else "",
        "country": "ΗΠΑ (Ινδικής καταγωγής)",
        "vibe":    "Η Lara είναι η πρώτη Ινδή καλλιτέχνης στην HYBE — αγαπά τα crystals και τον καφέ!",
        "facts": [
            "🇺🇸 Η Lara είναι από τις ΗΠΑ με ινδική καταγωγή — η πρώτη Ινδή καλλιτέχνης της HYBE!",
            "💎 Αγαπά τα crystals και πιστεύει στη δύναμή τους!",
            "🌊 Είναι Lead Dancer & Vocalist — ο χορός της έχει μια φυσική, ρέουσα ποιότητα!",
        ],
        "challenge": {
            "emoji":       "🌊",
            "description": "ΠΡΟΚΛΗΣΗ ΚΥΜΑΤΟΣ LARA: Κάνε το καλύτερο ύπτιο κολύμπι σου — αλλά όρθια! Κούνα τα χέρια σου σαν να κολυμπάς μέσα στον αέρα!",
            "reps":        "20 κινήσεις χεριών!",
        }
    },
    "5": {
        "name":    "Megan",
        "emoji":   "⚡",
        "color":   Fore.GREEN if COLOR else "",
        "country": "ΗΠΑ",
        "vibe":    "Η Megan έχει παίξει σε Disney Channel και έχει περπατήσει σε Paris Fashion Week!",
        "facts": [
            "⚡ Η Megan είναι η Lead Dancer — οι κινήσεις της είναι απόλυτα ακριβείς!",
            "🎬 Έχει παίξει σε Disney Channel — ήταν ήδη σταρ πριν την KATSEYE!",
            "👗 Έχει περπατήσει σε Paris Fashion Week — είναι και fashion icon!",
        ],
        "challenge": {
            "emoji":       "⚡",
            "description": "ΠΡΟΚΛΗΣΗ ΑΣΤΕΡΙΟΥ MEGAN: Κάνε 5 διαφορετικές αγριεμένες πόζες K-pop idol — η μια μετά την άλλη — γρήγορα σαν αστραπή!",
            "reps":        "5 πόζες, κράτα κάθε μία για 3 δευτερόλεπτα!",
        }
    },
    "6": {
        "name":    "Yoonchae",
        "emoji":   "🌙",
        "color":   Fore.RED if COLOR else "",
        "country": "Νότια Κορέα",
        "vibe":    "Η Yoonchae είναι η maknae (막내 — πιο νέα) της KATSEYE — αποφοίτησε από λύκειο ενώ ετοίμαζαν το EP τους!",
        "facts": [
            "🇰🇷 Η Yoonchae Jeung είναι από τη Νότια Κορέα — η maknae (막내) του γκρουπ!",
            "🌙 Αποφοίτησε από λύκειο ενώ ετοίμαζαν το πρώτο τους EP — απίστευτη αφοσίωση!",
            "✨ Ως Vocalist & Maknae, προσθέτει αυθεντική κορεατική K-pop ενέργεια στο γκρουπ!",
        ],
        "challenge": {
            "emoji":       "🌙",
            "description": "ΠΡΟΚΛΗΣΗ MAKNAE YOONCHAE: Μάθε το 'σήμα της καρδιάς' (κάνε μια καρδιά με ένα χέρι σταυρώνοντας τον αντίχειρα και τον δείκτη σου) και κάνε το και με τα δύο χέρια!",
            "reps":        "Εξάσκησέ το 10 φορές μέχρι να είναι τέλειο!",
        }
    },
}

# ------------------------------------------------------------------
# ΔΙΑΣΚΕΔΑΣΤΙΚΈΣ ΠΡΟΚΛΉΣΕΙΣ
# Αυτές είναι επιπλέον δραστηριότητες που μπορεί να κάνει η Αριάνα!
# Ανακατεύουν χορό, γυμναστική και κολύμβηση — όλα τα αγαπημένα της!
# ------------------------------------------------------------------

EXTRA_CHALLENGES = [
    {
        "emoji": "🤸",
        "name":  "Διάλειμμα Γυμναστικής!",
        "text":  "Κάνε 5 τούμπες στη σειρά χωρίς σταμάτημα! Βάλε μπρος τον εσωτερικό σου γυμναστή!",
    },
    {
        "emoji": "💃",
        "name":  "Διάλειμμα Χορού!",
        "text":  "Φτιάξε τη δική σου κίνηση χορού K-pop 8 χτύπων τώρα! Χρησιμοποίησε ολόκληρο το σώμα σου!",
    },
    {
        "emoji": "🌊",
        "name":  "Κολυμβητική Κίνηση!",
        "text":  "Όρθια, κάνε τις καλύτερες κινήσεις χεριών πεταλούδας 15 φορές. Νιώσε τα κύματα!",
    },
    {
        "emoji": "⭐",
        "name":  "Δύναμη Αστεριού!",
        "text":  "Πήδα όσο πιο ψηλά μπορείς 10 φορές. Κάθε πήδημα: χέρια και πόδια ανοιχτά σαν αστέρι!",
    },
    {
        "emoji": "🎤",
        "name":  "Τραγούδα το!",
        "text":  "Τραγούδα το αγαπημένο σου κομμάτι από οποιοδήποτε τραγούδι KATSEYE στην ΚΟΡΥΦΗ των πνευμόνων σου!",
    },
]

# ------------------------------------------------------------------
# ΚΎΡΙΟ ΠΡΌΓΡΑΜΜΑ
# Εδώ αρχίζουν τα πάντα! Το "if __name__ == '__main__'" είναι
# ο τρόπος της Python να λέει "τρέξε αυτόν τον κώδικα μόνο αν ξεκινήσαμε
# αυτό το αρχείο απευθείας" — είναι σαν το κουμπί ON του προγράμματος!
# ------------------------------------------------------------------

def main():
    """Η κύρια συνάρτηση που τρέχει ολόκληρο το πρόγραμμα."""

    # ── ΟΘΌΝΗ ΚΑΛΩΣΟΡΊΣΜΑΤΟΣ ────────────────────────────────────
    print()
    print()
    # Εκτύπωσε το μεγάλο banner KATSEYE με έντονο χρώμα
    if COLOR:
        print(Fore.MAGENTA + Style.BRIGHT + BANNER + Style.RESET_ALL)
    else:
        print(BANNER)

    print_line("★", 55)
    slow_print(colored("  ✨  Καλώς ήρθες στο KATSEYE Fan Club της Αριάνας!  ✨", Fore.CYAN if COLOR else "", bold=True))
    print_line("★", 55)
    print_blank()

    time.sleep(0.4)

    # Χαιρέτησε την Αριάνα ονομαστικά!
    slow_print(colored("  Γεια σου, ΑΡΙΆΝΑ! 👋", Fore.YELLOW if COLOR else "", bold=True))
    print_blank()
    slow_print("  Είσαι τώρα ΕΠΊΣΗΜΟ μέλος του")
    slow_print(colored("  KATSEYE Fan Club! 💜", Fore.MAGENTA if COLOR else "", bold=True))
    print_blank()
    slow_print("  Ετοιμάσου για:")
    slow_print(colored("    🎤  Διασκεδαστικά γεγονότα για όλα τα 6 μέλη της KATSEYE", Fore.CYAN if COLOR else ""))
    slow_print(colored("    🤸  Προκλήσεις γυμναστικής & χορού", Fore.CYAN if COLOR else ""))
    slow_print(colored("    🌊  Δραστηριότητες κολύμβησης & αθλητισμού", Fore.CYAN if COLOR else ""))
    slow_print(colored("    ⭐  ΤΟΣΟ πολλή K-pop διασκέδαση!", Fore.CYAN if COLOR else ""))

    press_enter()

    # ── ΡΏΤΗΣΕ ΓΙΑ ΤΟ ΑΓΑΠΗΜΈΝΟ ΜΈΛΟΣ ─────────────────────────
    print_line()
    slow_print(colored("  💜  ΠΟΙΟ ΕΊΝΑΙ ΤΟ ΑΓΑΠΗΜΈΝΟ ΣΟΥ ΜΈΛΟΣ ΤΗΣ KATSEYE;  💜", Fore.MAGENTA if COLOR else "", bold=True))
    print_line()
    print_blank()
    slow_print("  Εδώ είναι όλα τα 6 καταπληκτικά μέλη:")
    print_blank()

    # Κάνε loop για κάθε μέλος και εκτύπωσε τον αριθμό, emoji και όνομά του
    # Τα "for" loops επαναλαμβάνουν κώδικα για κάθε στοιχείο σε μια λίστα
    for number, member in MEMBERS.items():
        line = f"    {number}. {member['emoji']}  {member['name']}  ({member['country']})"
        print(colored(line, member["color"], bold=True))
        time.sleep(0.1)  # Μικρή καθυστέρηση ώστε κάθε όνομα να εμφανίζεται ένα-ένα

    print_blank()

    # Ρώτα συνέχεια μέχρι η Αριάνα να δώσει έγκυρη απάντηση (1-6)
    choice = None
    while choice not in MEMBERS:
        raw = input(colored("  Γράψε έναν αριθμό (1-6) και πάτησε ENTER: ", Fore.YELLOW if COLOR else "")).strip()
        if raw in MEMBERS:
            choice = raw
        else:
            # Αν η είσοδος δεν είναι έγκυρη, πες της και ρώτα ξανά
            print(colored("  Χμ, δοκίμασε να πληκτρολογήσεις έναν αριθμό από 1 έως 6! 😊", Fore.RED if COLOR else ""))

    # Βρήκαμε έγκυρη επιλογή! Πάρε τα δεδομένα αυτού του μέλους από το λεξικό μας
    fave = MEMBERS[choice]
    print_blank()
    time.sleep(0.3)

    # ── ΑΠΟΚΆΛΥΨΗ ΜΈΛΟΥΣ ────────────────────────────────────────
    print_line("♡", 55)
    reveal = f"  {fave['emoji']}  ΑΠΊΘΑΝΗ ΕΠΙΛΟΓΉ, ΑΡΙΆΝΑ!  {fave['emoji']}"
    slow_print(colored(reveal, fave["color"], bold=True))
    print_blank()
    slow_print(colored(f"  Το αγαπημένο σου είναι: {fave['name']}! 🌟", fave["color"], bold=True))
    print_blank()
    slow_print(f"  {fave['vibe']}")
    print_line("♡", 55)

    press_enter()

    # ── ΔΙΑΣΚΕΔΑΣΤΙΚΆ ΓΕΓΟΝΌΤΑ ──────────────────────────────────
    print_line()
    slow_print(colored(f"  ✨  ΔΙΑΣΚΕΔΑΣΤΙΚΆ ΓΕΓΟΝΌΤΑ ΓΙΑ ΤΗΝ {fave['name'].upper()}!  ✨", fave["color"], bold=True))
    print_line()
    print_blank()

    # Δείξε κάθε γεγονός ένα-ένα με μικρή παύση ανάμεσά τους
    for i, fact in enumerate(fave["facts"], start=1):
        slow_print(f"  Γεγονός #{i}: {fact}", delay=0.025)
        time.sleep(0.5)

    press_enter()

    # ── ΠΡΌΚΛΗΣΗ ΜΈΛΟΥΣ ─────────────────────────────────────────
    ch = fave["challenge"]
    print_line("🔥", 27)
    slow_print(colored(f"  {ch['emoji']}  Η ΕΙΔΙΚΉ ΣΟΥ ΠΡΌΚΛΗΣΗ!  {ch['emoji']}", Fore.YELLOW if COLOR else "", bold=True))
    print_line("🔥", 27)
    print_blank()
    slow_print(f"  Επειδή αγαπάς την {fave['name']}, εδώ είναι Η ΠΡΌΚΛΗΣΉ ΣΟΥ:")
    print_blank()

    # Εκτύπωσε την πρόκληση μέσα σε κουτί
    print(colored("  ┌" + "─" * 49 + "┐", Fore.CYAN if COLOR else ""))
    # Αναδίπλωση κειμένου ώστε να χωρά στο κουτί
    desc_words = ch["description"].split()
    line_buf = "  │  "
    for word in desc_words:
        if len(line_buf) + len(word) + 1 > 52:
            # Η γραμμή είναι γεμάτη — εκτύπωσέ τη και άρχισε νέα
            print(colored(line_buf.ljust(52) + "│", Fore.CYAN if COLOR else ""))
            line_buf = "  │  " + word + " "
        else:
            line_buf += word + " "
    if line_buf.strip("  │  "):
        print(colored(line_buf.ljust(52) + "│", Fore.CYAN if COLOR else ""))
    print(colored("  └" + "─" * 49 + "┘", Fore.CYAN if COLOR else ""))
    print_blank()
    slow_print(colored(f"  👉  Στόχος: {ch['reps']}", Fore.YELLOW if COLOR else "", bold=True))
    print_blank()

    input(colored("  Έτοιμη; Πάτησε ENTER όταν τελειώσεις την πρόκληση! 💪 ", Fore.GREEN if COLOR else ""))
    print_blank()
    slow_print(colored("  ΑΠΊΘΑΝΗ ΔΟΥΛΕΙΆ, ΑΡΙΆΝΑ! Τα κατάφερες! 🎉", Fore.GREEN if COLOR else "", bold=True))

    press_enter()

    # ── ΤΥΧΑΊΑ ΠΡΌΚΛΗΣΗ ΜΠΌΝΟΥΣ ─────────────────────────────────
    # Το "random.choice" επιλέγει ένα στοιχείο τυχαία από μια λίστα —
    # σαν να βάζεις το χέρι σε μια τσάντα και να αρπάζεις ένα χωρίς να κοιτάς!
    bonus = random.choice(EXTRA_CHALLENGES)
    print_line("⭐", 27)
    slow_print(colored(f"  {bonus['emoji']}  ΠΡΌΚΛΗΣΗ ΜΠΌΝΟΥΣ: {bonus['name']}  {bonus['emoji']}", Fore.MAGENTA if COLOR else "", bold=True))
    print_line("⭐", 27)
    print_blank()
    slow_print(f"  {bonus['text']}")
    print_blank()
    input(colored("  Πάτησε ENTER όταν τελειώσεις! 🌟 ", Fore.YELLOW if COLOR else ""))
    print_blank()
    slow_print(colored("  ΝΑΙΙΙ!!! Είσαι αστέρι, Αριάνα! ⭐", Fore.YELLOW if COLOR else "", bold=True))

    press_enter()

    # ── ΚΆΡΤΑ FAN CLUB ───────────────────────────────────────────
    # Δώσε στην Αριάνα την επίσημη κάρτα fan club της!
    print_blank()
    if COLOR:
        print(Fore.MAGENTA + Style.BRIGHT + "  ╔══════════════════════════════════════════════════╗")
        print(Fore.MAGENTA + Style.BRIGHT + "  ║                                                  ║")
        print(Fore.CYAN    + Style.BRIGHT + "  ║     🌟  ΕΠΊΣΗΜΗ ΚΆΡΤΑ KATSEYE FAN CLUB  🌟      ║")
        print(Fore.MAGENTA + Style.BRIGHT + "  ║                                                  ║")
        print(Fore.YELLOW  + Style.BRIGHT + "  ║          Όνομα Φαν:  ΑΡΙΆΝΑ  💜                 ║")
        print(Fore.WHITE                  + f"  ║          Αγαπ. Μέλος: {fave['name']} {fave['emoji']}                  ║")
        print(Fore.CYAN                   + "  ║          Επίπεδο: K-pop Dance Star ⭐            ║")
        print(Fore.MAGENTA + Style.BRIGHT + "  ║                                                  ║")
        print(Fore.MAGENTA + Style.BRIGHT + "  ╚══════════════════════════════════════════════════╝")
    else:
        print("  ╔══════════════════════════════════════════════════╗")
        print("  ║                                                  ║")
        print("  ║     *  ΕΠΊΣΗΜΗ ΚΆΡΤΑ KATSEYE FAN CLUB  *        ║")
        print("  ║                                                  ║")
        print("  ║          Όνομα Φαν:  ΑΡΙΆΝΑ                     ║")
        print(f"  ║          Αγαπ. Μέλος: {fave['name']}                     ║")
        print("  ║          Επίπεδο: K-pop Dance Star               ║")
        print("  ║                                                  ║")
        print("  ╚══════════════════════════════════════════════════╝")

    print_blank()

    # ── ΑΝΤΊΟ ────────────────────────────────────────────────────
    print_line("★", 55)
    slow_print(colored("  💜  Ευχαριστούμε που έπαιξες, Αριάνα!  💜", Fore.MAGENTA if COLOR else "", bold=True))
    print_blank()
    slow_print("  Θυμήσου:")
    slow_print(colored("    ✨  Συνέχισε να χορεύεις σαν να μην σε βλέπει κανείς!", Fore.CYAN if COLOR else ""))
    slow_print(colored("    🤸  Συνέχισε να κάνεις τούμπες σαν πρωταθλήτρια γυμναστικής!", Fore.CYAN if COLOR else ""))
    slow_print(colored("    🌊  Συνέχισε να κολυμπάς σαν Ολυμπιονίκης!", Fore.CYAN if COLOR else ""))
    slow_print(colored("    🌟  Συνέχισε να λάμπεις — είσαι η Αριάνα, άλλωστε!", Fore.YELLOW if COLOR else ""))
    print_blank()
    slow_print(colored("  Τα λέμε την επόμενη φορά! KATSEYE FIGHTING! 💪✨", Fore.MAGENTA if COLOR else "", bold=True))
    print_line("★", 55)
    print_blank()


# ------------------------------------------------------------------
# Αυτό είναι το "entry point" — είναι το πρώτο πράγμα που ψάχνει
# η Python όταν τρέχεις αυτό το αρχείο. Σκέψου το ως κουμπί ΕΚΚΊΝΗΣΗΣ!
# ------------------------------------------------------------------
if __name__ == "__main__":
    main()
