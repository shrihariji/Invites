"""Turn the client's card art + photos into web assets for this invite.
Run: python tools/build_assets.py   (from the invite folder)"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

site = Path(__file__).resolve().parents[1]
src = site.parent / "_client" / "radhika-aryan"
img_dir, ph_dir = site / "assets" / "img", site / "assets" / "photos"

# Scenes (text removed by _client/radhika-aryan/tools/clean_pages.py)
for page, name in {2: "hero", 3: "mehendi", 4: "survani", 5: "mandva", 6: "lagna"}.items():
    im = Image.open(src / "clean" / f"p{page}.png").convert("RGB").resize((1080, 1920), Image.LANCZOS)
    im.save(img_dir / f"{name}.webp", quality=80, method=6)

# Lettering cut from the card (keeps the family's own calligraphy)
for name, w in {"om-ganesh": 420, "ganesh-mini": 140, "gu-mehendi": 520, "gu-survani": 520,
                "gu-mandva": 520, "gu-lagna": 420, "saras-logo": 440}.items():
    im = Image.open(src / "parts" / f"{name}.png").convert("RGBA")
    im.thumbnail((w, w * 3), Image.LANCZOS)
    im.save(img_dir / f"{name}.webp", quality=90, method=6)

# Photos (order = gallery order)
photos = sorted((src / "zip2").glob("*.jpeg")) + [p for i, p in enumerate(sorted((src / "zip1").glob("*.jpeg"))) if i in (2, 3, 4, 5)]
for i, p in enumerate(photos, 1):
    im = Image.open(p).convert("RGB")
    im.thumbnail((900, 1200), Image.LANCZOS)
    im.save(ph_dir / f"m{i:02d}.webp", quality=80, method=6)

# WhatsApp / social preview card 1200x630
hero = Image.open(img_dir / "hero.webp").convert("RGB")
og = hero.resize((1200, int(1200 * 1920 / 1080))).crop((0, 330, 1200, 960)).filter(ImageFilter.GaussianBlur(0.5))
d = ImageDraw.Draw(og, "RGBA")
d.rounded_rectangle((300, 120, 900, 520), 30, fill=(253, 248, 240, 215))
om = Image.open(src / "parts" / "om-ganesh.png").convert("RGBA"); om.thumbnail((90, 140))
og.paste(om, (600 - om.width // 2, 140), om)
script = ImageFont.truetype("C:/Windows/Fonts/Gabriola.ttf", 92)
serif = ImageFont.truetype("C:/Windows/Fonts/pala.ttf", 25)
d.text((600, 345), "Radhika & Aaryan", font=script, fill=(155, 29, 32), anchor="mm")
d.text((600, 440), "30 DEC 2026 – 02 JAN 2027 · AHMEDABAD · GANDHINAGAR", font=serif, fill=(79, 86, 52), anchor="mm")
og.save(img_dir / "og-preview.jpg", quality=86)
print("assets done:", len(list(img_dir.iterdir())), "images,", len(photos), "photos")
