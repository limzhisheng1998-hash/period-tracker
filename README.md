# 🐱 Mochi Period Tracker

A cute, private period tracker that you add to your iPhone Home Screen like an app.

## Privacy
- Your records are saved **only on your phone**. There's no account, no server and no tracking.
- The website only delivers the app itself. Your period data is never uploaded.
- Use **Me → Save backup** now and then. If you delete the app or reset your phone, your data is gone unless you have a backup.

## Features
- Log your period with one tap, plus flow, mood, symptoms and notes
- Predicts your next period, fertile window and ovulation (gets better after 2+ cycles)
- Late period alert (default: 5 days; change it in **Me**)
- "Period coming soon" tips: symptoms to watch for, food to eat and food to avoid
- Today's cycle forecast and Mochi the kitty, whose mood changes with your cycle
- 🎒 Comfort kit checklist that resets each cycle
- 🔍 Pattern spotter, e.g. "You often get headaches 1–3 days before your period"
- 🩺 Doctor summary (print / save as PDF / share as text)
- 💌 Partner view: send a cute update link (contains only the summary shown, no history)
- Works offline

## Install on iPhone
1. Open the website link in **Safari**
2. Tap **Share** ⬆️ → **Add to Home Screen**
3. Open **Mochi** from the new icon and set it up there

> Data typed in Safari doesn't move into the Home Screen app, so install first.

## For developers
Plain HTML/CSS/JavaScript with no build step. Run tests with `node tests/cycle.test.mjs`.
When you change app files, bump `CACHE` in `sw.js` so phones pick up the update.
