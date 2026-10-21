# -*- coding: utf-8 -*-
"""
Μικροί έλεγχοι για το πρόγραμμα katseye-game/katseye.py (μόνο με την τυπική βιβλιοθήκη της Python).

Τρέξιμο:  python3 -m unittest discover -s tests -v

Τι ελέγχουμε:
  1. Το πρόγραμμα φορτώνει και χωρίς colorama (απλό κείμενο).
  2. Κάθε επιλογή του μενού (1-6) έχει ένα πλήρες μέλος: όνομα, γεγονότα και πρόκληση.
  3. Ολόκληρο το παιχνίδι τρέχει μέχρι το τέλος: μια λάθος απάντηση ζητά ξανά, μια σωστή διαλέγει το μέλος.
"""

import contextlib
import importlib.util
import io
import os
import sys
import unittest
from unittest import mock

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROGRAM = os.path.join(ROOT, "katseye-game", "katseye.py")


def load_without_colorama():
    """Φορτώνει το katseye.py σαν να μην ήταν εγκατεστημένη η colorama."""
    spec = importlib.util.spec_from_file_location("katseye", PROGRAM)
    assert spec and spec.loader, PROGRAM
    module = importlib.util.module_from_spec(spec)
    with mock.patch.dict(sys.modules, {"colorama": None}):  # None = ImportError στο import
        spec.loader.exec_module(module)
    return module


katseye = load_without_colorama()


class MembersTest(unittest.TestCase):
    def test_loads_without_colorama(self):
        self.assertFalse(katseye.COLOR)
        self.assertEqual(katseye.colored("γεια", "", bold=True), "γεια")

    def test_every_menu_choice_has_a_complete_member(self):
        # Το μενού λέει «Γράψε έναν αριθμό (1-6)»: κάθε αριθμός πρέπει να υπάρχει.
        self.assertEqual(list(katseye.MEMBERS), [str(n) for n in range(1, 7)])
        names = [m["name"] for m in katseye.MEMBERS.values()]
        self.assertEqual(len(set(names)), len(names), "κάθε μέλος μία φορά")
        for number, m in katseye.MEMBERS.items():
            for field in ("name", "emoji", "country", "vibe"):
                self.assertTrue(str(m[field]).strip(), f"{number}: {field}")
            self.assertGreaterEqual(len(m["facts"]), 1, number)
            for fact in m["facts"]:
                self.assertTrue(fact.strip(), number)
            for field in ("emoji", "description", "reps"):
                self.assertTrue(m["challenge"][field].strip(), f"{number}: challenge {field}")

    def test_every_bonus_challenge_is_complete(self):
        self.assertGreaterEqual(len(katseye.EXTRA_CHALLENGES), 1)
        for ch in katseye.EXTRA_CHALLENGES:
            for field in ("emoji", "name", "text"):
                self.assertTrue(ch[field].strip(), field)


class GameTest(unittest.TestCase):
    def play(self, choices):
        """Παίζει όλο το παιχνίδι (χωρίς αναμονές) και επιστρέφει ό,τι τύπωσε.

        Στο μενού «(1-6)» δίνει με τη σειρά τις `choices`, σε κάθε άλλη ερώτηση πατά απλώς ENTER.
        """
        replies = iter(choices)
        out = io.StringIO()

        def fake_input(prompt=""):
            if "(1-6)" not in prompt:
                return ""
            try:
                return next(replies)
            except StopIteration:
                raise AssertionError("το μενού ρώτησε ξανά, αλλά δεν έμειναν απαντήσεις") from None

        with mock.patch("builtins.input", fake_input), \
                mock.patch.object(katseye.time, "sleep", lambda _seconds: None), \
                contextlib.redirect_stdout(out):
            katseye.main()
        return out.getvalue()

    def test_wrong_choice_asks_again_then_the_member_is_picked(self):
        text = self.play(["7", "abc", "", "3"])
        self.assertEqual(text.count("δοκίμασε να πληκτρολογήσεις έναν αριθμό από 1 έως 6"), 3)
        third = katseye.MEMBERS["3"]
        self.assertIn(f"Το αγαπημένο σου είναι: {third['name']}!", text)
        self.assertIn(third["facts"][0], text)
        self.assertIn("Τα λέμε την επόμενη φορά!", text)

    def test_every_member_plays_to_the_end(self):
        for number, m in katseye.MEMBERS.items():
            text = self.play([number])
            self.assertIn(f"Αγαπ. Μέλος: {m['name']}", text, number)
            self.assertIn(m["challenge"]["reps"], text, number)


if __name__ == "__main__":
    unittest.main()
