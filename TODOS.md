# TODO & Unfinished Work

## High Priority

### [sidebar.js](src/components/sidebar.js)
- [x] **Line 129 & 261:** "TODO: NOT MAKE THIS HARDCODED" — The styling applied to active tabs uses hardcoded Tailwind classes instead of extracting them from existing styles or using CSS variables
- [x] **Line 109:** "todo: checke this better" — Need to validate/improve the navbar element selector
- [x] **Line 146:** `let goalsreplacing = "hours" //todo` — This variable seems incomplete, probably meant to expand what stats can be replaced

### [shop.js](src/components/shop.js)
- [x] **Line 17:** Needs a refresh mechanism — "need to refresh for some reason idk" suggests props.items might not be syncing properly from data.js
- [x] **Line 117:** "refresh stuff after or use other method cuz this is super lazy" — Post-action state update is inefficient
- [ ] **Line 69:** "add 'dev' option to some sort of settings" — Developer mode option not fully implemented for shop
- [ ] **Line 244:** "todo smth to turn it off" — Some feature can't be disabled

### [projects.js](src/components/projects.js)
- [ ] **Line 15:** "TODO: only one, but still need to fix" — Bug where only one project shows the approved glow effect

## Medium Priority

### [otherpersonprojectviewer.js](src/components/otherpersonprojectviewer.js)
- [ ] **Line 117:** "coming soon" alert when clicking author name — Feature stub not implemented
- [ ] **Line 171:** Commented code about getting other projects (hardcoded currently)

### [goals.js](src/components/goals.js)
- [ ] **Line 164:** Comment mentions "for later to put in the XXXXXXXXXXXX section maybe" — Incomplete feature

## Low Priority

### [TestCoverage.md](testing/TestCoverage.md)
- [ ] **Line 6:** "TODO: some sort of javascript bs to check if the values are properly getting set" — Test validation incomplete

### [CONTRIBUTING.md](CONTRIBUTING.md)
- [ ] **Chrome Web Store Publish section** says "tbh its a pile of slop just use ai..." — Publishing workflow documentation suggests it might be messy/incomplete

## Summary

**Most Impactful Items:**
1. Fix the **hardcoded styling** in sidebar.js (affects user experience consistency)
2. Debug the **shop.js props syncing issue** (affects data display reliability)
3. Fix the **projects.js bug** where only one approved project shows the glow effect
