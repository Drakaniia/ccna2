"""Smoke test for /ccna2/exam/modules-14-16."""
import sys
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4321/ccna2/exam/modules-14-16"
failures = []


def check(name, cond, extra=""):
    status = "PASS" if cond else "FAIL"
    print(f"[{status}] {name}" + (f" — {extra}" if extra and not cond else ""))
    if not cond:
        failures.append(name)


def find_question(page, substring):
    """Click tabs until #qText contains substring. Returns True if found."""
    for b in page.locator("button.qtab").all():
        b.click()
        page.wait_for_timeout(250)
        txt = page.locator("#qText").inner_text()
        if substring in txt:
            return True
    return False


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel="chrome")
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))

    page.goto(BASE, wait_until="networkidle")
    page.wait_for_timeout(800)

    # 1. Tab count == question count (63)
    tabs = page.locator("button.qtab").all()
    check("tab count == 63", len(tabs) == 63, f"found {len(tabs)}")

    # 2. Choice question: select options until it auto-checks -> explanation
    auto = False
    for _ in range(6):
        opts = page.locator("#qBody label.option:not(.locked):not(.selected)").all()
        if not opts:
            break
        opts[0].click()
        page.wait_for_timeout(250)
        if page.locator("#qBody label.option.locked").count() > 0:
            auto = True
            break
    body = page.inner_text("body")
    check("choice auto-checks + explanation", auto and "Explanation:" in body)

    # 3. Exhibit question (dump Q9) loads
    check("find exhibit question", find_question(page, "administrative distance value of the route for router R1"))
    page.wait_for_timeout(400)
    imgs = page.locator("#qExhibit img").all()
    loaded = all(i.evaluate("el => el.complete && el.naturalWidth > 0") for i in imgs)
    check("exhibit loads", len(imgs) == 1 and loaded, f"{len(imgs)} imgs")

    # 4. Multi-line command options (dump Q21)
    check("find multi-line option question", find_question(page, "backup ISP connection is used only"))
    page.wait_for_timeout(400)
    code_opts = page.locator("#qBody label.option.code-option").all()
    check("multi-line code options rendered", len(code_opts) == 4, f"{len(code_opts)} code options")
    if code_opts:
        nl = code_opts[0].inner_text().count("\n")
        check("line breaks preserved", nl >= 1, f"{nl} newlines")

    # 5. Pair question (dump Q38): pair all left items -> auto-check -> correct-matches table
    check("find pair question", find_question(page, "Match the routing table entry"))
    page.wait_for_timeout(400)
    left = page.locator(".pairing-board .pair-column").nth(0).locator(".pair-item").all()
    right = page.locator(".pairing-board .pair-column").nth(1).locator(".pair-item").all()
    check("pair board rendered", len(left) == 4 and len(right) == 5, f"left {len(left)} right {len(right)}")
    try:
        for i in range(4):
            left[i].click()
            page.wait_for_timeout(150)
            right[i].click()
            page.wait_for_timeout(150)
        page.wait_for_timeout(600)
        body = page.inner_text("body")
        check("pair auto-check + correct matches", "Correct matches" in body or "correct match" in body.lower())
    except Exception as e:
        check("pair flow", False, str(e))

    # 6. Go to last question, then Submit -> confirm -> score gauge
    try:
        page.locator("button.qtab").last.click()
        page.wait_for_timeout(400)
        page.locator("#footerNextBtn").click()
        page.wait_for_timeout(500)
        page.locator("#confirmSubmit").check()
        page.locator("#doSubmitBtn").click()
        page.wait_for_timeout(800)
        body = page.inner_text("body")
        check("submit -> results screen", "%" in body or "score" in body.lower() or "gauge" in body.lower())
        check("results show a percentage", "%" in body)
    except Exception as e:
        check("submit flow", False, str(e))

    page.screenshot(path="/tmp/exam-14-16.png", full_page=False)
    check("no console errors", len(errors) == 0, "; ".join(errors[:5]))
    browser.close()

print("\n" + ("ALL CHECKS PASSED" if not failures else f"FAILURES: {failures}"))
sys.exit(1 if failures else 0)