import re

src = open("src/features/exams/data/srwe-final-exam/questions-87-174.ts", encoding="utf-8").read()
i = src.find("number: 87,")
seg = src[i : src.find("number: 88,")]
j = seg.find("explanation")
raw = seg[j : j + 90]
print("real newline char present:", "\n" in raw)
print("backslash-n sequence present:", ("\\" + "n") in raw)
print("first chars:", [repr(c) for c in raw[:60] if c in "\n\\"])

# Where does the file line end for q87 explanation?
lines = src.split("\n")
for idx, ln in enumerate(lines):
    if "number: 87," in ln:
        print("q87 record lines:", "\n".join(lines[idx : idx + 6])[:400])
        break
