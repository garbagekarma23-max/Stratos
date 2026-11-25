# fonts

The typefaces the pages use, kept in this repository so no page asks Google, or any other website, for its lettering.

| File | What it is | Used by |
| --- | --- | --- |
| `stratos.css` | The `@font-face` rules for Hanken Grotesk and the logo's Archivo | `v2.html` (through `src/head.html`) and `maths-lab.html` |
| `hanken-grotesk-latin-wght-normal.woff2`, `hanken-grotesk-latin-ext-wght-normal.woff2` | Hanken Grotesk, every weight from 400 to 700 in one file, for plain letters and for letters with accents | every word |
| `archivo-stratos.woff2` | Archivo at its widest width (125) and semibold (600), with only the letters S, t, r, a, o and s | the logo |
| `first.css` | The `@font-face` rules for the first prototype | `index.html` |
| `figtree-*.woff2`, `unbounded-*.woff2`, `b612-mono-*.woff2` | Figtree, Unbounded and B612 Mono | `index.html` |
| `OFL-*.txt` | Each typeface's licence, the SIL Open Font License 1.1 | |
| `VERSION` | The package and version each file came from | |

A browser fetches only the files a page needs: each rule's `unicode-range` says which letters its file has, so the Latin Extended file (letters such as ā or ł) is fetched only when a page shows one.

## Where they came from

The Fontsource packages on npm (fontsource.org), which package the Google Fonts files: `@fontsource-variable/hanken-grotesk`, `@fontsource-variable/archivo`, `@fontsource-variable/figtree`, `@fontsource-variable/unbounded` and `@fontsource/b612-mono`, all version 5.3.0. The versions are pinned in `vendor/package.json`. The SIL Open Font License lets anyone use, copy and share the fonts, and change them (as the logo file is cut down), as long as the licence goes with them.

## How to update them

Every file here except this one is written by `vendor/copy-fonts.mjs`. Do not edit them by hand.

1. Change the version numbers in `vendor/package.json`.
2. The logo file needs Python with fontTools and brotli, once: `py -m pip install fonttools brotli` (`python3` on a Mac or Linux).
3. `cd vendor`, then `npm install`, then `npm run copy`. That copies Supabase again too, and then the fonts.
4. Build and run the tests, and look at the screenshots.

The script cuts the logo file down with these two fontTools commands (Archivo's file is 90 KB; the logo's is about 1 KB):

```
py -m fontTools.varLib.instancer node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2 wdth=125 wght=600 -o archivo-125-600.woff2
py -m fontTools.subset archivo-125-600.woff2 --text=Stratos --layout-features=* --name-IDs=* --flavor=woff2 --output-file=../fonts/archivo-stratos.woff2
```

The first sets the width and weight for good, so the file has one style only. The second keeps only the letters of Stratos. If the logo ever needs another letter, add it to `--text` in the script and to the `unicode-range` it writes.
