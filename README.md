# Lantern Trail: JavaScript Security Comparison

This repository contains two paired examples for a secure web development course project.

| Project requirement | Vulnerable page | Corrected page |
|---|---|---|
| Script injection in a page (DOM XSS) | `xss-unsafe.html` | `xss-safe.html` |
| Runtime JavaScript evaluation (`eval`) | `eval-unsafe.html` | `eval-safe.html` |

## Project description

The **Observation Wall** displays visitor comments for a lantern-and-astronomy exhibit. The vulnerable implementation passes user input to `innerHTML`, causing an HTML event handler inside a test message to execute. The corrected version uses `textContent` and a restrictive Content Security Policy (CSP).

The **Lantern Count Desk** calculates how many lanterns are required for a set of stations. Its vulnerable implementation calls `eval()` on user input. The corrected version recognizes a limited arithmetic pattern and uses explicit operators rather than evaluating code.

These examples are meant for a controlled, local classroom environment. The provided payloads change visible status text only; they do not send information to any server.

## Files

- `index.html`: project overview
- `xss-unsafe.html` / `scripts/xss-unsafe.js`: DOM script-injection example
- `xss-safe.html` / `scripts/xss-safe.js`: safe DOM text rendering
- `eval-unsafe.html` / `scripts/eval-unsafe.js`: runtime evaluation example
- `eval-safe.html` / `scripts/eval-safe.js`: restricted arithmetic without `eval`
- `assets/style.css`: common presentation style
- `screenshots/`: code images and browser output evidence for the accompanying report
- `tests/`: browser test scripts

**Local setup and screenshot guide:** see [LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md). Keep this project local and publish source code only in a private repository; do not deploy the vulnerable pages publicly.

## Preview and verification

From the project directory, start a static local server:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000/`. The two sample-input buttons populate controlled payloads for comparison. Select **Post observation** or **Calculate** to see the outcome. The vulnerable examples should change an unrelated status message; the corrected ones must not.

## Publish to GitHub

Create an empty repository on GitHub (without a pre-created README), then run from inside this directory:

```bash
git init
git add .
git commit -m "Add JavaScript injection lab and secure fixes"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the placeholder repository URL with your own. Do not commit passwords, API keys, cookies, or real user data.

## Security and learning references

- [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP JavaScript and TypeScript Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JavaScript_and_TypeScript_Security_Cheat_Sheet.html)
- [OWASP Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [MDN `eval()` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)

The corrected examples are intentionally small educational demonstrations, not a complete production security architecture.
