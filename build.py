"""Build Stratos from the files in src/.

Run it with:  python3 build.py
It writes v2.html next to this file. That one file is the whole app and can be opened in a browser or put on GitHub Pages.

How the pieces fit:
  src/head.html        the page title and the link to the typeface
  src/style.css        how everything looks
  src/body.html        the fixed parts of the page: the five views, the tab bar, the sheet
  src/content.js       the study content: chapters, points, cards and questions
  src/maths-content.js the maths content: chapters, points, worked examples and question templates
  src/10-core.js ...   the script, in the order listed in JS below
  src/recordings.json  the three sound recordings, stored as text
  lab/...              the Maths Lab's keypad, working sheet and line checker. They are read from lab/ so there is
                       one copy, shared with maths-lab.html. MathLive itself is not copied in: v2.html loads it from
                       lab/mathlive the first time maths is opened.
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__)) + '/'
SRC = HERE + 'src/'
LAB = HERE + 'lab/'
MARK = '/*REC*/{}/*REC-END*/'
JS = ['content.js', 'maths-content.js', 'lab/topics.js', 'lab/maths.js', 'lab/keypad.js', 'lab/sheet.js',
      '10-core.js', '15-maths-make.js', '20-sound.js', '30-shell.js', '40-home.js', '50-feed.js', '55-maths.js',
      '60-practice.js', '62-maths-practice.js', '70-social.js', '90-boot.js']

def read(name):
    """A file from src/, or from lab/ when its name starts with lab/."""
    path = LAB + name[4:] if name.startswith('lab/') else SRC + name
    return open(path, encoding='utf8').read().rstrip('\n')

def parts():
    """Return the title, the typeface links, and everything that goes in the body."""
    rec = json.load(open(SRC + 'recordings.json'))
    script = '\n\n'.join(read(n) for n in JS)
    assert script.count(MARK) == 1, 'the marker for the recordings is missing from 20-sound.js'
    script = script.replace(MARK, '/*REC*/' + json.dumps(rec, separators=(',', ':')) + '/*REC-END*/')
    head = read('head.html')
    m = re.match(r'<title>(.*?)</title>\n', head)
    assert m, 'head.html must start with the title'
    body = ('<style>\n' + read('style.css') + '\n\n' + read('lab/keys.css') + '\n</style>\n\n' + read('body.html') +
            '\n\n<script>\n(() => {\n\'use strict\';\n\n' + script + '\n})();\n</script>\n')
    return m.group(1), head[m.end():], body

def standalone():
    title, links, body = parts()
    return ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">\n'
            '<meta name="theme-color" content="#15161a" media="(prefers-color-scheme: dark)">\n'
            '<title>Stratos</title>\n' + links + '\n'
            '<style>:root{padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>\n'
            '</head>\n<body>\n' + body + '</body>\n</html>\n')

if __name__ == '__main__':
    page = standalone()
    open(HERE + 'v2.html', 'w', encoding='utf8').write(page)
    print('wrote v2.html,', round(len(page) / 1024), 'KB')
