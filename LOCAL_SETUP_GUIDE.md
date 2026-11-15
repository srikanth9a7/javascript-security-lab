# Local Setup, Browser Evidence, and GitHub Upload

This is a **local-only security lab**. It intentionally includes two vulnerable examples. Keep the GitHub repository **private**, and do **not** deploy the vulnerable pages on GitHub Pages or a public web server.

## 1. Open the project

Extract the ZIP file. Open the `lantern-lab` folder in Visual Studio Code (**File > Open Folder**).

Confirm that the folder contains `index.html`, four example `.html` files, `scripts/`, `assets/`, and `screenshots/`.

## 2. Start a local server

Open **Terminal > New Terminal** in VS Code. Make sure the terminal is in the `lantern-lab` folder.

On Windows, use:

```powershell
py -m http.server 8000
```

On macOS/Linux, use:

```bash
python3 -m http.server 8000
```

If port 8000 is already busy, replace `8000` with `8001` in both the command and URL. Open `http://localhost:8000/` in Chrome or Edge. Leave the terminal open while using the website. Stop the server with `Ctrl+C` when finished.

## 3. Demonstrate both flaws and both corrections

| Open page | Click | Expected evidence |
|---|---|---|
| `xss-unsafe.html` | **Use controlled injection input**, then **Post observation** | Status changes to `Injected JavaScript executed inside the page` |
| `xss-safe.html` | Same two clicks | Message appears as literal text; status says `no script executed` |
| `eval-unsafe.html` | **Use controlled runtime input**, then **Calculate** | Page marker changes to `Unexpected JavaScript executed` and the result is `32` |
| `eval-safe.html` | Same two clicks | Page marker remains `unchanged`, and input is rejected |

The payloads only update text inside these pages; they do not contact external services.

## 4. Take your own screenshots

For each page, capture the visible URL, entered input, and resulting status. Use `Windows + Shift + S` on Windows or `Command + Shift + 4` on Mac. Suggested names:

- `01_xss_vulnerable_result.png`
- `02_xss_corrected_result.png`
- `03_eval_vulnerable_result.png`
- `04_eval_corrected_result.png`

Also open `scripts/xss-unsafe.js`, `scripts/xss-safe.js`, `scripts/eval-unsafe.js`, and `scripts/eval-safe.js` in VS Code, and capture code screenshots showing the key lines (unsafe `innerHTML` and `eval`, safe `textContent` and input parsing). Save screenshots under `screenshots/`. The supplied screenshots are examples; your own browser screenshots can demonstrate you tested the project locally.

## 5. Push to your GitHub repository

**Recommended:** create a new **private, empty repository** on GitHub. Do not pre-create a README, license, or gitignore, because this folder already has files.

Open the terminal inside the `lantern-lab` folder and run:

```bash
git init
git add .
git commit -m "Add web input security comparison project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with the actual names. If prompted, sign in to GitHub using the browser or approved credentials; do not put a password in the repository or source code.

If the repository already exists and has commits, **do not force push**. Instead, clone it and copy the project files into it, then commit and push:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
# Copy the extracted project files into this folder using File Explorer/Finder.
git add .
git commit -m "Add JavaScript injection examples and safe alternatives"
git push
```

## 6. Verify GitHub

Refresh the repository page. Confirm that you can see `index.html`, the four HTML files, the `scripts` folder, the `screenshots` folder, and `README.md`.

If you need to add newly captured screenshots later, save them in `screenshots/` and run:

```bash
git add screenshots
git commit -m "Add local browser results"
git push
```

## Evidence for the APA report

A clear report can present paired screenshots: XSS before and after, then `eval()` before and after. Explain each flawed line, why the controlled payload changes unrelated page content, how the corrected version treats the same input, and the relevance of CSP. Source code may be shown as figures with captions; do not use screenshots to obscure attribution or provenance.
