import { html, SafeHtml } from "./html.ts";

export interface PageOptions {
  title: string;
  description: string;
}

/** Wraps page content in the shared HTML document shell. */
export function renderPage(options: PageOptions, content: SafeHtml): string {
  const page = html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${options.title}</title>
        <meta name="description" content="${options.description}" />
        <meta property="og:title" content="${options.title}" />
        <meta property="og:description" content="${options.description}" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#f2ecdf" />
        <link rel="icon" href="/static/img/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/static/css/styles.css" />
      </head>
      <body>
    ${content}
    <script src="/static/js/main.js" defer></script>
      </body>
    </html>
  `;
  return page.toString();
}
