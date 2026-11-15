"""Exercise the actual page JavaScript in a browser and capture output evidence.
The runtime loads local HTML/CSS/JS into about:blank so no external host or file navigation is required.
"""
from pathlib import Path
import re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / 'screenshots'
SHOTS.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    for file_name, image_name, script in [
        ('xss-unsafe.html','browser_xss_vulnerable.png','xss-unsafe.js'),
        ('xss-safe.html','browser_xss_corrected.png','xss-safe.js'),
        ('eval-unsafe.html','browser_eval_vulnerable.png','eval-unsafe.js'),
        ('eval-safe.html','browser_eval_corrected.png','eval-safe.js'),
    ]:
        page=browser.new_page(viewport={'width':1080,'height':840}, device_scale_factor=1.4)
        markup=(ROOT/file_name).read_text()
        markup=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>', '', markup)
        markup=re.sub(r'<link rel="stylesheet"[^>]*>', '', markup)
        markup=re.sub(r'<script defer src="[^"]+"></script>', '', markup)
        page.set_content(markup, wait_until='load')
        page.add_style_tag(content=(ROOT/'assets/style.css').read_text())
        page.add_script_tag(content=(ROOT/'scripts'/script).read_text())
        page.locator('#sample').click()
        page.locator('#post' if 'xss' in file_name else '#calculate').click()
        page.wait_for_timeout(300)
        badge=page.locator('#result-badge' if 'xss' in file_name else '#runtime-marker').inner_text()
        output=page.locator('#wall' if 'xss' in file_name else '#answer').inner_text()
        page.screenshot(path=str(SHOTS/image_name), full_page=True, animations='disabled')
        print(f'{file_name}: marker={badge}; output={output[:90]}')
        if file_name=='xss-unsafe.html': assert 'Injected JavaScript executed' in badge
        if file_name=='xss-safe.html':
            assert 'no script executed' in badge
            assert '<img' in output
        if file_name=='eval-unsafe.html':
            assert 'Unexpected JavaScript executed' in badge
            assert '32' in output
        if file_name=='eval-safe.html':
            assert 'unchanged' in badge
            assert 'Only two numbers' in output
            page.locator('#expression').fill('8 * 4')
            page.locator('#calculate').click()
            assert '32' in page.locator('#answer').inner_text()
        page.close()
    browser.close()
print('All four browser comparisons passed.')
