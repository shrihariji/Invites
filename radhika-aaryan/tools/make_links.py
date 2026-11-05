"""Read guests.csv + settings.txt and write guest-links.html and guest-links.csv.

Events column: leave empty to show every event, or list ids like  mandva,lagna
"""
import base64, csv, html, sys, urllib.parse
from pathlib import Path

here = Path(__file__).resolve().parent
settings = {}
for line in (here / "settings.txt").read_text(encoding="utf-8").splitlines():
    if "=" in line and not line.lstrip().startswith("#"):
        k, v = line.split("=", 1)
        settings[k.strip()] = v.strip()
base = settings["base_url"]
if not base.endswith("/"):
    base += "/"

rows = []
with open(here / "guests.csv", encoding="utf-8-sig", newline="") as f:
    for r in csv.DictReader(f):
        name = (r.get("Name") or "").strip()
        if not name:
            continue
        events = ",".join(e.strip().lower() for e in (r.get("Events") or "").split(",") if e.strip())
        code = base64.urlsafe_b64encode(f"{name}|{events}".encode()).decode().rstrip("=")
        link = f"{base}?g={code}" + (f"&music={settings['music']}" if settings.get("music") else "")
        msg = settings["message"].replace("{name}", name).replace("{link}", link)
        phone = "".join(ch for ch in (r.get("Phone") or "") if ch.isdigit())
        wa = f"https://wa.me/{phone}?text={urllib.parse.quote(msg)}" if phone else f"https://wa.me/?text={urllib.parse.quote(msg)}"
        rows.append((name, events or "all", link, wa))

with open(here / "guest-links.csv", "w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Name", "Events", "Personal link", "WhatsApp send link"])
    w.writerows(rows)

cards = "\n".join(
    f"<tr><td>{html.escape(n)}</td><td>{html.escape(e)}</td>"
    f"<td><a href='{html.escape(l)}' target='_blank'>Open invite</a></td>"
    f"<td><a class='wa' href='{html.escape(w)}' target='_blank'>Send on WhatsApp</a></td></tr>"
    for n, e, l, w in rows)
(here / "guest-links.html").write_text(f"""<!doctype html><meta charset="utf-8"><title>Guest links</title>
<style>body{{font-family:system-ui;margin:24px;background:#fbf3e4}}table{{border-collapse:collapse;width:100%}}
td,th{{padding:10px;border-bottom:1px solid #d9c9a6;text-align:left}}a.wa{{background:#25d366;color:#fff;padding:6px 12px;border-radius:20px;text-decoration:none}}</style>
<h2>Guest links ({len(rows)})</h2><table><tr><th>Guest</th><th>Events</th><th>Invite</th><th>Send</th></tr>{cards}</table>""", encoding="utf-8")
print(f"Made {len(rows)} guest links -> guest-links.html and guest-links.csv")
