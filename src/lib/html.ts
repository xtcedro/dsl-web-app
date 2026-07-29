const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes text for safe insertion into HTML. Use for any untrusted or dynamic value. */
export function escapeHtml(value: unknown): string {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}

/** Marks a string as pre-sanitized HTML so `html` will not escape it. */
export class SafeHtml {
  constructor(readonly value: string) {}
  toString(): string {
    return this.value;
  }
}

/** Wraps a string that is already safe HTML (e.g. static markup you authored). */
export function raw(value: string): SafeHtml {
  return new SafeHtml(value);
}

/**
 * Tagged template for building HTML. Interpolated values are escaped by default;
 * arrays are flattened and joined; values wrapped with `raw()` pass through unescaped.
 */
export function html(strings: TemplateStringsArray, ...values: unknown[]): SafeHtml {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) {
    out += stringifyValue(values[i]);
    out += strings[i + 1];
  }
  return new SafeHtml(out);
}

function stringifyValue(value: unknown): string {
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(stringifyValue).join("");
  if (value === null || value === undefined || value === false) return "";
  return escapeHtml(value);
}
