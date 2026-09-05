#!/usr/bin/env python
"""Generate TypeScript question data for the SRWE Final Exam from the reference dump.

Parses public/itexamanswers_srwe-final-exam.html, converts each question to the
app's Question TS shape, and writes questions-1-86.ts / questions-87-174.ts plus
index.ts into a scratch directory (moved into src/ by the caller after review).
"""
import html as H
import json
import os
import re
import sys

PROJ = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DUMP = os.path.join(PROJ, "public", "itexamanswers_srwe-final-exam.html")
IMG_DIR = os.path.join(PROJ, "public", "images", "srwe-final-exam")
OUT = os.path.join(os.environ.get("TEMP", "."), "srwe-final", "ts-out")
os.makedirs(OUT, exist_ok=True)

raw = open(DUMP, encoding="utf-8").read()
body = raw[raw.find("<p><strong>1."):]
blocks = re.split(r"(?=<p><(?:strong|b)>\d+\.)", body)

def split_blocks():
    qmap = {}
    for b in blocks:
        m = re.match(r"<p><(?:strong|b)>(\d+)\.", b)
        if m:
            qmap[int(m.group(1))] = b
    return qmap

QMAP = split_blocks()
assert len(QMAP) == 172, len(QMAP)

# ---------------------------------------------------------------- helpers
def unescape(t):
    t = H.unescape(t)
    return t.replace("\u200b", "").replace("\xa0", " ")


def strip_tags(t):
    t = re.sub(r"<br\s*/?>", "\n", t)
    t = re.sub(r"</(p|div|h\d|tr|table|ul|ol|li|pre)>", "\n", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = unescape(t)
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r" *\n *", "\n", t)
    t = re.sub(r"\n{2,}", "\n", t)  # single line breaks only (matches module data style)
    return t.strip()


def clean(t):
    return strip_tags(t)


def drop_wp_captions(t):
    # remove figure/div blocks that wrap an exhibit image + caption text
    return re.sub(r"<div[^>]*class=\"wp-caption[^\"]*\"[^>]*>.*?</div>", "\n", t, flags=re.S)


def drop_pre_blocks(t):
    return re.sub(r"<pre[^>]*>.*?</pre>", "\n", t, flags=re.S)


def drop_code_wrappers(t):
    return re.sub(r'<div class="cbc-code-wrapper".*?</div>', "\n", t, flags=re.S)


def drop_imgs(t):
    return re.sub(r"<img[^>]*>", "", t)


def qheading_text(q):
    m = re.search(r"<p><(?:strong|b)>\d+\.(.*?)</(?:strong|b)>", q, re.S)
    if not m:
        return ""
    t = m.group(1)
    t = re.sub(r"<[^>]+>", "", t)  # inline <code> etc
    return unescape(t).strip()


def qimg(q):
    m = re.search(r"<img[^>]*>", q)
    if not m:
        return None
    s = m.group(0)
    src = re.search(r'src="([^"]+)"', s)
    if not src or not src.group(1).startswith("http"):
        return None
    if re.search(r"gravatar|favicon|avatar", src.group(1), re.I):
        return None
    w = re.search(r'width="(\d+)"', s)
    h = re.search(r'height="(\d+)"', s)
    return {"src": src.group(1),
            "width": int(w.group(1)) if w else None,
            "height": int(h.group(1)) if h else None}


def qexplanation(q):
    start = q.find('<div class="message_box success"')
    if start < 0:
        return None
    seg = q[start:]
    # balance nested <div>s so we stop at the message box's own closing tag
    gt = seg.find('>')
    depth = 1
    end = -1
    for m in re.finditer(r"<div\b|</div>", seg[gt + 1:]):
        depth += 1 if m.group(0).startswith("<div") else -1
        if depth == 0:
            end = gt + 1 + m.end()
            break
    t = seg if end < 0 else seg[:end]
    # drop the code-block "Copy" button bar (nested div incl. its close) but keep the command text
    t = re.sub(r'<div class="cbc-code-bar">.*?</div>', "", t, flags=re.S)
    return clean(t)


def options_ul(q):
    """First <ul> that appears before the explanation box (i.e. the choices)."""
    mbox = re.search(r'<div class="message_box success"', q)
    region = q[:mbox.start()] if mbox else q
    m = re.search(r"<ul[^>]*>(.*?)</ul>", region, re.S)
    if not m:
        return None, []
    lis = re.findall(r"<li[^>]*>.*?</li>", m.group(1), re.S)
    out, correct = [], []
    for li in lis:
        content = re.sub(r"<li[^>]*>", "", li)
        content = re.sub(r"</li>$", "", content)
        out.append(clean(content))
        if "correct_answer" in li:
            correct.append(len(out) - 1)
    return out, correct


def question_body_text(q):
    """All question text (heading + following paragraphs) before the choices."""
    mbox = re.search(r'<div class="message_box success"', q)
    region = q[: mbox.start()] if mbox else q
    opts = re.search(r"<ul[^>]*>", region)
    if opts:
        region = region[: opts.start()]
    # remove the heading paragraph entirely (its text is captured separately)
    hm = re.match(r"<p><(?:strong|b)>.*?</p>", region, re.S)
    if hm:
        region = region[hm.end():]
    else:
        hm2 = re.match(r"<p><(?:strong|b)>.*", region, re.S)
        if hm2:
            region = region[hm2.end():]
    # drop images + captions + pre/code blocks from the visible text
    region = drop_pre_blocks(drop_code_wrappers(drop_imgs(drop_wp_captions(region))))
    txt = strip_tags(region)
    txt = re.sub(r"\n{2,}", "\n", txt).strip()
    return txt


# ------------------------------------------------- exhibit inventory (real files)
exhibits = {}
for fn in os.listdir(IMG_DIR):
    m = re.match(r"q(\d+)-exhibit\.(.+)$", fn)
    if m:
        exhibits[int(m.group(1))] = (m.group(1), m.group(2))
print("exhibit files:", len(exhibits))

# ------------------------------------------------- pair-question overrides
# {number: dict(type=pair, left, right, correctPairs, explanation)}
PAIRS = {
    10: dict(
        type="pair",
        allowMultiMatch=True,
        left=[
            "appropriate for high performance computing applications",
            "error checking before forwarding",
            "forwarding process can begin after receiving the destination address",
            "forwarding process only begins after receiving the entire frame",
            "may forward invalid frames",
            "only forwards valid frames",
        ],
        right=["cut-through", "store-and-forward"],
        correctPairs={0: 0, 1: 1, 2: 0, 3: 1, 4: 0, 5: 1},
        explanation=(
            "Explanation: Topic 2.1.5\n"
            "Cut-through switching begins the forwarding process as soon as the destination MAC "
            "address is received, so it can forward invalid frames and is appropriate for high "
            "performance computing applications because the frame is forwarded with very low latency. "
            "Store-and-forward switching receives the entire frame and performs error checking before "
            "forwarding, so it only forwards valid frames."
        ),
    ),
    13: dict(
        type="pair",
        left=["Disabled", "Layer 1 problem", "Layer 2 problem", "Operational"],
        right=[
            "administratively down",
            "down/down",
            "up/disabled",
            "up/down",
            "up/up",
        ],
        correctPairs={0: 0, 1: 1, 2: 3, 3: 4},
        explanation=(
            "Explanation: Topic 1.2.6\n"
            "The correct pairings are:\n"
            "- Disabled \u2192 administratively down\n"
            "- Layer 1 problem \u2192 down/down\n"
            "- Layer 2 problem \u2192 up/down\n"
            "- Operational \u2192 up/up\n"
            "The up/disabled status combination is not used."
        ),
    ),
    16: dict(
        type="pair",
        left=["Default VLAN", "Management VLAN", "Data VLANs", "Native VLAN"],
        right=[
            "configured to carry user generated traffic",
            "all switch ports are assigned to this VLAN after initial bootup of the switch",
            "carries untagged traffic",
            "an IP address and subnet mask are assigned to this VLAN, allowing the switch to be accessed by HTTP, Telnet, SSH, or SNMP",
            "only accessible by the network administrator",
        ],
        correctPairs={0: 1, 1: 3, 2: 0, 3: 2},
        explanation=None,  # from dump
    ),
    43: dict(
        type="pair",
        left=["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"],
        right=[
            "perform low-level CPU initialization",
            "enter global configuration mode",
            "execute POST",
            "flash file system initialization",
            "load the boot loader from ROM",
            "load the IOS",
            "transfer switch control to the IOS",
        ],
        correctPairs={0: 2, 1: 4, 2: 0, 3: 3, 4: 5, 5: 6},
        explanation=(
            "Explanation: Topic 1.1.1\n"
            "The steps of the switch boot sequence are:\n"
            "1. execute POST\n"
            "2. load the boot loader from ROM\n"
            "3. perform low-level CPU initialization\n"
            "4. flash file system initialization\n"
            "5. load the IOS\n"
            "6. transfer switch control to the IOS\n"
            "Entering global configuration mode is not part of the boot sequence, so it is not used."
        ),
    ),
    93: dict(
        type="pair",
        left=[
            "A message that is used to locate any available DHCP server on a network",
            "A message that is used to acknowledge that the lease is successful",
            "A message that is used to identify the explicit server and lease offer to accept",
            "A message that is used to suggest a lease to a client",
        ],
        right=[
            "DHCPREQUEST",
            "DHCPNAK",
            "DHCPOFFER",
            "DHCPDISCOVER",
            "DHCPACK",
        ],
        correctPairs={0: 3, 1: 4, 2: 0, 3: 2},
        explanation=(
            "Explanation: Topic 7.1.3\n"
            "The correct pairings are:\n"
            "- a message that is used to locate any available DHCP server on a network \u2192 DHCPDISCOVER\n"
            "- a message that is used to suggest a lease to a client \u2192 DHCPOFFER\n"
            "- a message that is used to identify the explicit server and lease offer to accept \u2192 DHCPREQUEST\n"
            "- a message that is used to acknowledge that the lease is successful \u2192 DHCPACK\n"
            "DHCPNAK is not used."
        ),
    ),
    97: dict(
        type="pair",
        left=[
            "a client initiating a message to find a DHCP server",
            "a DHCP server responding to the initial request by a client",
            "the client accepting the IP address provided by the DHCP server",
            "the DHCP server confirming that the lease has been accepted",
        ],
        right=["DHCPACK", "DHCPREQUEST", "DHCPNACK", "DHCPDISCOVER", "DHCPOFFER"],
        correctPairs={0: 3, 1: 4, 2: 1, 3: 0},
        explanation=(
            "Explanation: Topic 7.1.3\n"
            "Place the options in the following order:\n"
            "- a client initiating a message to find a DHCP server \u2192 DHCPDISCOVER\n"
            "- a DHCP server responding to the initial request by a client \u2192 DHCPOFFER\n"
            "- the client accepting the IP address provided by the DHCP server \u2192 DHCPREQUEST\n"
            "- the DHCP server confirming that the lease has been accepted \u2192 DHCPACK\n"
            "DHCPNACK is not used."
        ),
    ),
    108: dict(
        type="pair",
        left=["Step 1", "Step 2", "Step 3", "Step 4"],
        right=[
            "DHCPACK",
            "DHCPREQUEST",
            "DHCPDISCOVER",
            "DHCPREPLY",
            "DHCPINFORMATION-REQUEST",
            "DHCPOFFER",
        ],
        correctPairs={0: 2, 1: 5, 2: 1, 3: 0},
        explanation=(
            "Explanation: Topic 7.1.3\n"
            "The broadcast DHCPDISCOVER message finds DHCPv4 servers on the network. When the DHCPv4 "
            "server receives a DHCPDISCOVER message, it reserves an available IPv4 address to lease to "
            "the client and sends the unicast DHCPOFFER message to the requesting client. When the "
            "client receives the DHCPOFFER from the server, it sends back a DHCPREQUEST. On receiving "
            "the DHCPREQUEST message the server replies with a unicast DHCPACK message. DHCPREPLY and "
            "DHCPINFORMATION-REQUEST are DHCPv6 messages and are not used."
        ),
    ),
    116: dict(
        type="pair",
        left=["Step 1", "Step 2", "Step 3"],
        right=[
            "The standby router assumes the role of the forwarding router using both the IP and MAC addresses of the virtual router.",
            "The standby router stops seeing hello messages from the forwarding router.",
            "The forwarding router fails.",
            "The host initiates an ARP request for the MAC address of the new forwarding router.",
        ],
        correctPairs={0: 2, 1: 1, 2: 0},
        explanation=(
            "Explanation: Topic 9.1.3\n"
            "The HSRP failover process occurs in the following order:\n"
            "Step 1: The forwarding router fails.\n"
            "Step 2: The standby router stops seeing hello messages from the forwarding router.\n"
            "Step 3: The standby router assumes the role of the forwarding router using both the IP "
            "and MAC addresses of the virtual router.\n"
            "Hot Standby Router Protocol (HSRP) is a Cisco-proprietary protocol that is designed to "
            "allow for transparent failover of a first-hop IPv4 device. The ARP request step is not used."
        ),
    ),
}

# Hand-written explanations for questions where the dump box is empty
EXPLAIN_OVERRIDE = {
    152: (
        "Explanation: Topic 16.2.3\n"
        "Users are able to reach other destinations but not the company web server, so the problem is "
        "specific to the route to the network where the server resides. The administrator should use the "
        "show ip route command to verify that the static route to that server network is present in the "
        "routing table; if the route (or its exit interface) is missing, traffic to the server cannot be forwarded."
    ),
}

PAIR_DUMP_EXPLANATION_OVERRIDE = {
    # number -> reason we do not copy dump explanation verbatim
    10: "dump explanation is empty",
    43: "dump explanation wording conflicts with verified board answer",
    93: "dump explanation repeats the scrambled board instead of correct pairings",
    116: "dump explanation omits the step order",
}

# ------------------------------------------------- emit TS helpers
def js(s):
    s = s.replace("\\", "\\\\").replace('"', '\\"')
    s = s.replace("\r", "\\r").replace("\n", "\\n")
    return '"' + s + '"'


def exhibit_obj(n, prefix):
    if n not in exhibits:
        return None
    ext = exhibits[n][1]
    path = f"/images/srwe-final-exam/q{n}-exhibit.{ext}"
    # real dimensions from downloaded file names are resolved by caller; use header widths
    return f"exhibit: {{\n      src: {js(path)},\n      alt: {js('Exhibit for question ' + str(n) + ': ' + prefix)},\n    }},"

# Exhibit dimensions measured from the downloaded files with `file`
DIM = {}
_dims = json.load(open(os.path.join(os.environ.get("TEMP", "."), "srwe-final", "dims.json"), encoding="utf-8"))
for _k, _v in _dims.items():
    DIM[int(_k)] = tuple(_v)

def alt_for(n, hd):
    prefix = re.sub(r"^Refer to the exhibit\.\s*", "", hd).strip()
    prefix = prefix[:88]
    if " " in prefix:
        prefix = prefix.rsplit(" ", 1)[0]
    return f"Exhibit for question {n}: {prefix}"


def exhibit_fields(n, prefix):
    if n not in exhibits:
        return ""
    ext = exhibits[n][1]
    w, h = DIM.get(n, (None, None))
    dims = ""
    if w and h:
        dims = f"\n      width: {w},\n      height: {h},"
    return (
        "    exhibit: {\n"
        f"      src: {js(f'/images/srwe-final-exam/q{n}-exhibit.{ext}')},\n"
        f"      alt: {js(alt_for(n, prefix))},"
        f"{dims}\n"
        "    },"
    )


def emit_question(n, q):
    hd = qheading_text(q)
    lines = []
    lines.append("  {")
    lines.append(f"    number: {n},")

    if n in PAIRS:
        p = PAIRS[n]
        lines.append(f'    type: "pair",')
        # alt prefix uses question text
        lines.append(f"    text: {js(hd)},")
        alt_prefix = re.sub(r"^Refer to the exhibit\.\s*", "", hd)[:90]
        ef = exhibit_fields(n, alt_prefix)
        if ef:
            lines.append(ef)
        lines.append(f"    left: [")
        for it in p["left"]:
            lines.append(f"      {js(it)},")
        lines.append(f"    ],")
        lines.append(f"    right: [")
        for it in p["right"]:
            lines.append(f"      {js(it)},")
        lines.append(f"    ],")
        lines.append(f"    correctPairs: {{ {', '.join(f'{k}: {v}' for k, v in sorted(p['correctPairs'].items()))} }},")
        if p.get("allowMultiMatch"):
            lines.append("    allowMultiMatch: true,")
        expl = p.get("explanation")
        if expl is None:
            expl = qexplanation(q)
        if expl:
            lines.append(f"    explanation: {js(expl)},")
        lines.append("  },")
        return "\n".join(lines)

    tail = question_body_text(q)
    text = (hd + "\n" + tail) if tail else hd
    text = text.strip()
    opts, correct = options_ul(q)
    if not opts:
        raise SystemExit(f"Q{n}: no options found")

    mtype = "single"
    choose = None
    cm = re.search(r"\(Choose\s+(one|two|three)\.\)", text, re.I)
    if cm:
        mtype = "multi"
        choose = {"one": 1, "two": 2, "three": 3}[cm.group(1).lower()]
    if len(correct) > 1:
        mtype = "multi"
        if not choose:
            choose = len(correct)

    lines.append(f'    type: "{mtype}",')
    lines.append(f"    text: {js(text)},")
    alt_prefix = re.sub(r"^Refer to the exhibit\.\s*", "", hd)[:90]
    ef = exhibit_fields(n, alt_prefix)
    if ef:
        lines.append(ef)
    # code blocks shown above the options (outside explanation box)
    pre_region = QMAP[n]
    mbox = re.search(r'<div class="message_box success"', pre_region)
    region = pre_region[: mbox.start()] if mbox else pre_region
    pres = [clean(m.group(1)) for m in re.finditer(r"<pre[^>]*>(.*?)</pre>", region, re.S)]
    if pres:
        code = "\n".join(pres)
        lines.append(f"    code: {js(code)},")
    if mtype == "multi" and choose:
        lines.append(f"    choose: {choose},")
    lines.append("    options: [")
    for o in opts:
        lines.append(f"      {js(o)},")
    lines.append("    ],")
    lines.append(f"    correct: [{', '.join(str(c) for c in correct)}],")
    expl = EXPLAIN_OVERRIDE.get(n) if n in EXPLAIN_OVERRIDE else qexplanation(q)
    if expl:
        lines.append(f"    explanation: {js(expl)},")
    lines.append("  },")
    return "\n".join(lines)


def validate():
    errs = []
    for n, q in QMAP.items():
        hd = qheading_text(q)
        opts, correct = options_ul(q)
        tail = question_body_text(q)
        text = (hd + "\n" + tail) if tail else hd
        if n in PAIRS:
            continue
        cm = re.search(r"\(Choose\s+(one|two|three)\.\)", text, re.I)
        if cm:
            want = {"one": 1, "two": 2, "three": 3}[cm.group(1).lower()]
            if len(correct) != want:
                errs.append(f"Q{n}: choose {want} but {len(correct)} correct")
        elif len(correct) != 1:
            errs.append(f"Q{n}: single but {len(correct)} correct")
        if not re.search(r"[\?\!\.]\)?$", text):
            errs.append(f"Q{n}: text may be truncated? ends {text[-50:]!r}")
        if not opts:
            errs.append(f"Q{n}: no options")
    return errs


print("validation...")
for e in validate():
    print("  ", e)
print("done")

# ---------------------------------------------------------------- assemble files
def emit_file(nums, first_label, last_label):
    header = (
        "import type { Question } from \"../../lib/types\";\n\n"
        f"/** CCNA 2 v7 Course FINAL Exam (Switching, Routing, and Wireless Essentials), questions {first_label}-{last_label}. */\n"
        f"export const questions{first_label}to{last_label}: Question[] = [\n"
    )
    parts = []
    for n in sorted(nums):
        parts.append(emit_question(n, QMAP[n]))
    return header + "\n".join(parts) + "\n];\n"

nums = sorted(QMAP.keys())
half = [n for n in nums if n <= 86]
rest = [n for n in nums if n > 86]
assert len(half) + len(rest) == 172

f1 = emit_file(half, 1, 86)
f2 = emit_file(rest, 87, 174)

idx = (
    'import type { ExamModule } from "../../lib/types";\n'
    'import { questions1to86 } from "./questions-1-86";\n'
    'import { questions87to174 } from "./questions-87-174";\n\n'
    "/** CCNA 2 v7 Course FINAL Exam (Switching, Routing, and Wireless Essentials) — all questions. */\n"
    "export const srweFinalExam: ExamModule = {\n"
    '  id: "srwe-final-exam",\n'
    '  title: "CCNA 2 v7 Course FINAL Exam",\n'
    '  subtitle: "Switching, Routing, and Wireless Essentials",\n'
    '  groupLabel: "Final Exam",\n'
    "  questions: [...questions1to86, ...questions87to174],\n"
    "};\n"
)

open(os.path.join(OUT, "questions-1-86.ts"), "w", encoding="utf-8", newline="\n").write(f1)
open(os.path.join(OUT, "questions-87-174.ts"), "w", encoding="utf-8", newline="\n").write(f2)
open(os.path.join(OUT, "index.ts"), "w", encoding="utf-8", newline="\n").write(idx)
print("wrote:", os.listdir(OUT))
print("file1 lines:", f1.count(chr(10)), "file2 lines:", f2.count(chr(10)))
