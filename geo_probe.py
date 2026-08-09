import json, re, sys
d = json.load(open(sys.argv[1], encoding="utf-8"))
t = d["extracted_text"]
print("===TEXT LEN", len(t)); print(t)
h = d["raw_content"]
print("\n===META===")
pats = [
    r"<title[^>]*>.*?</title>",
    r'name="description"[^>]*',
    r'name="robots"[^>]*',
    r'property="og:url"[^>]*',
    r'property="og:title"[^>]*',
    r'property="og:type"[^>]*',
    r'property="og:site_name"[^>]*',
    r'rel="canonical"[^>]*',
]
for p in pats:
    for m in re.findall(p, h, re.I | re.S):
        print("  ", m[:400])
print("\n===H1/H2/H3===")
for m in re.findall(r"<(h[123])[^>]*>(.*?)</\1>", h, re.I | re.S):
    print(" ", m[0].upper(), re.sub("<[^>]+>", "", m[1])[:120])
print("\n===LDJSON===")
for m in re.findall(r'type="application/ld\+json"[^>]*>(.*?)</script>', h, re.I | re.S):
    print(" ", m[:800])
print("\n===IMG ALTS===")
for m in re.findall(r'<img[^>]*alt="([^"]*)"[^>]*>', h, re.I):
    print("  alt:", m[:100])