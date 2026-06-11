#!/usr/bin/env python3
"""Extract a chapter's text from the AI Engineering PDF into .extracted/chNN.txt.

Usage: python3 scripts/extract_chapter.py <chapter>   # 1-10, or 'preface'/'epilogue'
"""
import sys
from pathlib import Path

from pypdf import PdfReader

PDF = Path.home() / "Documents/learn/books & pdfs/ai/AI Engineering Building Applications with Foundation Models (Chip Huyen).pdf"

# 0-indexed [start, end) page ranges from the PDF outline
RANGES = {
    "preface": (12, 24),
    "1": (24, 72),
    "2": (72, 136),
    "3": (136, 182),
    "4": (182, 234),
    "5": (234, 276),
    "6": (276, 330),
    "7": (330, 386),
    "8": (386, 428),
    "9": (428, 472),
    "10": (472, 518),
    "epilogue": (518, 520),
}


def main() -> None:
    key = sys.argv[1].lstrip("0") if len(sys.argv) > 1 else ""
    if key not in RANGES:
        sys.exit(f"usage: extract_chapter.py <{'|'.join(RANGES)}>")
    start, end = RANGES[key]
    reader = PdfReader(PDF)
    out_dir = Path(__file__).resolve().parent.parent / ".extracted"
    out_dir.mkdir(exist_ok=True)
    name = f"ch{int(key):02d}" if key.isdigit() else key
    out = out_dir / f"{name}.txt"
    with out.open("w") as f:
        for i in range(start, end):
            text = reader.pages[i].extract_text().replace("‐", "-").replace("‑", "-")
            f.write(f"\n--- page {i} ---\n{text}\n")
    print(f"wrote {out} ({end - start} pages)")


if __name__ == "__main__":
    main()
