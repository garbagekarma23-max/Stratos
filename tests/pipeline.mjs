// Runs the content pipeline's own tests (content/test_pipeline.py), so npm test covers them. They use a stand-in for
// the Anthropic API: nothing is sent and no key is needed. They need Python 3 with PyYAML installed
// (py -m pip install -r content/requirements.txt). Run: node pipeline.mjs
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
const out = spawnSync(process.platform === 'win32' ? 'py' : 'python3', ['content/test_pipeline.py'], {cwd: fileURLToPath(new URL('..', import.meta.url)), encoding: 'utf8'});
process.stdout.write((out.stdout || '') + (out.stderr || ''));
if (out.error) console.log('FAIL could not run Python: ' + out.error.message);
process.exitCode = out.status === 0 ? 0 : 1;
