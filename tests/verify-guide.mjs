import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// Build forbidden patterns without embedding raw institutional names in plain text
const FORBIDDEN_PATTERNS = [
  new RegExp('universidad\\s+de\\s+antioquia', 'i'),
  new RegExp('\\budea\\b', 'i'),
  new RegExp('economicas_?udea', 'i'),
  new RegExp('l[oó]pez\\s+de\\s+micay', 'i'),
  new RegExp('gobernaci[oó]n\\s+del\\s+cauca', 'i'),
  new RegExp('wilmer\\s+adher', 'i'),
  new RegExp('harold\\s+morales', 'i'),
  new RegExp('ingrid\\s+pamela', 'i'),
  new RegExp('cauca\\s+territorio\\s+de\\s+paz', 'i'),
];

test('S3: .gitignore excludes raw source PDF directory', () => {
  const gitignorePath = path.join(ROOT, '.gitignore');
  assert.ok(fs.existsSync(gitignorePath), '.gitignore must exist');
  const content = fs.readFileSync(gitignorePath, 'utf8');
  assert.match(content, /Diplomado_UdeA_2025\//);
});

test('S1 & S3: Corpus analysis document exists, covers all 7 PDFs, and is strictly anonymized', () => {
  const analysisPath = path.join(ROOT, 'docs', 'analisis-corpus-sgr.md');
  assert.ok(fs.existsSync(analysisPath), 'docs/analisis-corpus-sgr.md must exist');
  const content = fs.readFileSync(analysisPath, 'utf8');

  // Must cover all 7 documents and core methodology topics
  assert.match(content, /Marco General/i);
  assert.match(content, /Sistema General de Regal[ií]as/i);
  assert.match(content, /Identificaci[oó]n/i);
  assert.match(content, /Preparaci[oó]n/i);
  assert.match(content, /Documento T[eé]cnico de Soporte/i);
  assert.match(content, /Manual Conceptual MGA/i);
  assert.match(content, /Instructivo MGA/i);

  // Must use Entidad 1 / Entidad 2 anonymization placeholders
  assert.match(content, /Entidad 1/i);
  assert.match(content, /Entidad 2/i);

  for (const pattern of FORBIDDEN_PATTERNS) {
    assert.doesNotMatch(
      content,
      pattern,
      `Forbidden entity reference matched ${pattern} in docs/analisis-corpus-sgr.md`
    );
  }
});

test('S2 & S3: Web guide and presentation files exist, include interactive features, and are strictly anonymized', () => {
  const requiredFiles = ['index.html', 'styles.css', 'app.js', 'README.md'];
  for (const file of requiredFiles) {
    const fullPath = path.join(ROOT, file);
    assert.ok(fs.existsSync(fullPath), `${file} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      assert.doesNotMatch(
        content,
        pattern,
        `Forbidden entity reference matched ${pattern} in ${file}`
      );
    }
  }

  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const js = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const combined = html + '\n' + js;

  // Verify anonymization placeholders are used
  assert.match(combined, /Entidad 1/i);
  assert.match(combined, /Entidad 2/i);

  // Verify core methodological sections and presentation mode
  assert.match(combined, /Modo Presentaci[oó]n/i);
  assert.match(combined, /Árbol de Problemas|Arbol de Problemas/i);
  assert.match(combined, /Cadena de Valor/i);
  assert.match(combined, /Tasa Social de Descuento/i);
  assert.match(combined, /Documento T[eé]cnico de Soporte/i);
});
