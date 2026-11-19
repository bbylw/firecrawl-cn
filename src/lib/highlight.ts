/**
 * Tiny build-time syntax highlighter for the landing page's code samples.
 * Produces HTML with the .tok-* classes defined in styles/landing.css.
 * Cosmetic only — samples are fixed, known snippets.
 */

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Part = { src: string; cls: string };

const STR = { src: `"(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'`, cls: "tok-str" };
const NUM = { src: `\\b\\d+(?:\\.\\d+)?\\b`, cls: "tok-num" };
const BOOL = { src: `\\b(?:true|false|True|False|null|None|nil)\\b`, cls: "tok-bool" };
const FN = { src: `\\b[A-Za-z_]\\w*(?=\\s*\\()`, cls: "tok-fn" };
const CLS = { src: `\\b[A-Z][A-Za-z0-9_]*\\b`, cls: "tok-cls" };
const COM_HASH = { src: `#[^\\n]*`, cls: "tok-com" };
const COM_SLASH = { src: `//[^\\n]*`, cls: "tok-com" };

const kw = (words: string[]): Part => ({
  src: `\\b(?:${words.join("|")})\\b`,
  cls: "tok-key",
});

const LANGS: Record<string, Part[]> = {
  python: [
    COM_HASH, STR,
    kw(["from", "import", "as", "def", "class", "return", "for", "in", "if", "else", "with", "await", "async", "print", "lambda", "not", "and", "or"]),
    BOOL, NUM, FN, CLS,
  ],
  js: [
    COM_SLASH, STR,
    kw(["import", "from", "export", "const", "let", "var", "new", "await", "async", "function", "return", "for", "of", "if", "else", "class"]),
    BOOL, NUM, FN, CLS,
  ],
  java: [
    COM_SLASH, STR,
    kw(["import", "package", "new", "public", "private", "class", "void", "static", "final", "return", "for", "if", "else"]),
    BOOL, NUM, FN, CLS,
  ],
  rust: [
    COM_SLASH, STR,
    kw(["use", "let", "mut", "async", "await", "fn", "pub", "struct", "impl", "match", "return", "dyn", "for", "in", "if", "else", "Some", "None", "Ok", "Err"]),
    BOOL, NUM, FN, CLS,
  ],
  go: [
    COM_SLASH, STR,
    kw(["package", "import", "func", "var", "const", "return", "for", "range", "if", "else", "nil", "defer", "go"]),
    BOOL, NUM, FN, CLS,
  ],
  elixir: [
    COM_HASH, STR,
    kw(["def", "do", "end", "defmodule", "fn", "case", "with"]),
    BOOL, NUM, FN, CLS,
  ],
  bash: [
    COM_HASH, STR,
    { src: `^\\s*[a-z][\\w.-]*`, cls: "tok-fn" },
    { src: `(?:^|\\s)--?[A-Za-z][\\w-]*`, cls: "tok-key" },
    NUM,
  ],
  json: [
    { src: `"(?:[^"\\\\\\n]|\\\\.)*"(?=\\s*:)`, cls: "tok-attr" },
    STR, BOOL, NUM,
  ],
  toml: [
    COM_HASH, STR,
    { src: `^\\s*\\[[^\\]\\n]*\\]`, cls: "tok-attr" },
    { src: `^\\s*[\\w-]+(?=\\s*=)`, cls: "tok-key" },
    NUM,
  ],
  groovy: [
    COM_SLASH, STR,
    kw(["dependencies", "implementation", "repositories", "maven", "mavenCentral", "url"]),
    NUM, FN,
  ],
  md: [
    { src: `^#{1,6}[^\\n]*`, cls: "tok-key" },
    { src: `^\\s*-\\s`, cls: "tok-fn" },
  ],
  text: [],
};

export function highlight(code: string, lang: string): string {
  const parts = LANGS[lang] ?? [];
  if (parts.length === 0) return esc(code);
  const master = new RegExp(parts.map((p) => `(${p.src})`).join("|"), "gm");
  let out = "";
  let last = 0;
  for (const m of code.matchAll(master)) {
    const idx = m.index ?? 0;
    out += esc(code.slice(last, idx));
    let cls = "tok-var";
    for (let g = 1; g < m.length; g++) {
      if (m[g] !== undefined) {
        cls = parts[g - 1].cls;
        break;
      }
    }
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = idx + m[0].length;
  }
  out += esc(code.slice(last));
  return out;
}