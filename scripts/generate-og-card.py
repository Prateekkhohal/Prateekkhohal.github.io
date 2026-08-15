"""Render the Open Graph card.

The lattice is drawn with the same fibonacci-sphere distribution and
perspective projection as the live hero (src/components/visuals/FleetLattice.tsx),
so the share card and the site are the same visual system rather than a
lookalike. Typography is composited from the real Archivo and Space Grotesk
files, so it is pixel exact rather than model-rendered.

Rendered at 2x and downsampled for antialiasing.
"""

import math

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


def horizontal_ramp(width, height, full_until, zero_from, invert=False):
    """Mask that is 255 left of `full_until` and 0 right of `zero_from`.

    Built explicitly rather than by rotating a linear gradient, because the
    rotation direction is easy to get backwards and the result silently veils
    the wrong half of the frame.
    """
    xs = np.linspace(0.0, 1.0, width)
    ramp = np.clip((zero_from - xs) / (zero_from - full_until), 0.0, 1.0)
    if invert:
        ramp = 1.0 - ramp
    row = (ramp * 255).astype("uint8")
    return Image.fromarray(np.tile(row, (height, 1)), mode="L")

S = 2  # supersample factor
W, H = 1200 * S, 630 * S

BASE = (8, 8, 10)
WHITE = (250, 250, 250)
MUTED = (161, 161, 170)
DIM = (113, 113, 122)
ACCENT = (37, 99, 235)
ACCENT_BRIGHT = (59, 130, 246)

FONTS = "C:/Users/MrDev/AppData/Local/Temp/claude/d--GITHUB-DESKTOP-Prateekkhohal-github-io/a0daa934-a667-48b0-a055-f9a682fdbc81/scratchpad/fonts"
OUT = "d:/GITHUB-DESKTOP/Prateekkhohal.github.io/public/Assets/IMAGES/og.png"

NODE_COUNT = 46
FOCAL = 3.1

img = Image.new("RGB", (W, H), BASE)
draw = ImageDraw.Draw(img)

# ---- engineering grid, masked to fade toward the left -----------------------
grid = Image.new("RGB", (W, H), BASE)
gd = ImageDraw.Draw(grid)
step = 64 * S
for x in range(0, W, step):
    gd.line([(x, 0), (x, H)], fill=(20, 20, 24), width=1 * S)
for y in range(0, H, step):
    gd.line([(0, y), (W, y)], fill=(20, 20, 24), width=1 * S)
# Grid strengthens toward the right, complementing the type on the left.
img = Image.composite(grid, img, horizontal_ramp(W, H, 0.30, 0.95, invert=True))
draw = ImageDraw.Draw(img)

# ---- lattice ----------------------------------------------------------------
lat = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ld = ImageDraw.Draw(lat)

cx, cy = int(W * 0.735), int(H * 0.5)
scale = H * 0.40
spin, wobble = 0.62, 0.20


def rotate(p):
    x, y, z = p
    x1 = x * math.cos(spin) - z * math.sin(spin)
    z1 = x * math.sin(spin) + z * math.cos(spin)
    y1 = y * math.cos(wobble) - z1 * math.sin(wobble)
    z2 = y * math.sin(wobble) + z1 * math.cos(wobble)
    return x1, y1, z2


def project(p):
    x, y, z = p
    d = FOCAL / (FOCAL + z)
    return cx + x * scale * d, cy + y * scale * d, d


nodes = []
golden = math.pi * (3 - math.sqrt(5))
for i in range(NODE_COUNT):
    y = 1 - (i / (NODE_COUNT - 1)) * 2
    r = math.sqrt(max(0.0, 1 - y * y))
    th = golden * i
    nodes.append(rotate((math.cos(th) * r, y, math.sin(th) * r)))

# latitude rings, so the lattice reads as a volume
for latitude in (-0.55, 0.0, 0.55):
    rr = math.sqrt(max(0.0, 1 - latitude**2))
    pts = []
    for i in range(97):
        a = (i / 96) * math.tau
        pts.append(project(rotate((math.cos(a) * rr, latitude, math.sin(a) * rr)))[:2])
    ld.line(pts, fill=(255, 255, 255, 16), width=1 * S)

ox, oy, _ = project((0.0, 0.0, 0.0))
ACTIVE = 7

order = sorted(range(NODE_COUNT), key=lambda i: -nodes[i][2])
for i in order:
    sx, sy, d = project(nodes[i])
    fog = max(0.0, min(1.0, (d - 0.55) / 0.7))
    active = i == ACTIVE

    ld.line(
        [(ox, oy), (sx, sy)],
        fill=(*ACCENT_BRIGHT, int(255 * (0.55 * fog + 0.3))) if active
        else (255, 255, 255, int(255 * (0.11 * fog + 0.03))),
        width=(2 if active else 1) * S,
    )
    rad = (3.8 if active else 2.5) * d * S
    col = (*ACCENT_BRIGHT, int(255 * (0.85 * fog + 0.15))) if active else (
        228, 228, 231, int(255 * (0.55 * fog + 0.12))
    )
    ld.ellipse([sx - rad, sy - rad, sx + rad, sy + rad], fill=col)

# core glow
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse(
    [ox - 60 * S, oy - 60 * S, ox + 60 * S, oy + 60 * S], fill=(*ACCENT, 90)
)
glow = glow.filter(ImageFilter.GaussianBlur(40 * S))
lat = Image.alpha_composite(lat, glow)
ImageDraw.Draw(lat).ellipse(
    [ox - 5 * S, oy - 5 * S, ox + 5 * S, oy + 5 * S], fill=(219, 234, 254, 255)
)

img = Image.alpha_composite(img.convert("RGBA"), lat).convert("RGB")

# ---- keep the left side clean for type -------------------------------------
veil = Image.new("RGB", (W, H), BASE)
img = Image.composite(veil, img, horizontal_ramp(W, H, 0.40, 0.72))
draw = ImageDraw.Draw(img)

# ---- type -------------------------------------------------------------------
archivo = lambda s: ImageFont.truetype(f"{FONTS}/Archivo-Bold.ttf", s * S)
grotesk = lambda s: ImageFont.truetype(f"{FONTS}/SpaceGrotesk.ttf", s * S)

x0 = 72 * S
draw.text((x0, 150 * S), "PRATEEK KUMAR", font=grotesk(15), fill=DIM)
draw.text((x0 - 2 * S, 186 * S), "Software Engineer", font=archivo(66), fill=WHITE)
draw.text((x0 - 2 * S, 258 * S), "Backend & AI Systems", font=archivo(66), fill=ACCENT_BRIGHT)

draw.line([(x0, 360 * S), (x0 + 120 * S, 360 * S)], fill=ACCENT, width=2 * S)

body = (
    "Real-time services on Node.js and WebSockets,\n"
    "multi-tenant RAG on FastAPI and pgvector,\n"
    "and native Android at Device Owner level."
)
draw.multiline_text((x0, 392 * S), body, font=grotesk(21), fill=MUTED, spacing=10 * S)

stats = [("~0.5s", "WebRTC latency"), ("50+", "live streams"), ("14.5M", "views")]
sx = x0
for value, label in stats:
    draw.text((sx, 522 * S), value, font=archivo(28), fill=WHITE)
    draw.text((sx, 558 * S), label.upper(), font=grotesk(13), fill=DIM)
    sx += int(draw.textlength(value, font=archivo(28))) + 62 * S

draw.text((x0, 596 * S), "prateekkhohal.github.io", font=grotesk(15), fill=DIM)

img = img.resize((1200, 630), Image.LANCZOS)
img.save(OUT, "PNG", optimize=True)
print("wrote", OUT, img.size)
