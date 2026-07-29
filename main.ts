import { createApp } from "./src/app.ts";
import { readPort } from "./src/lib/env.ts";

const port = readPort();
const handler = createApp();

Deno.serve(
  {
    port,
    onListen: ({ hostname, port }) => {
      // hostname is a bind address (0.0.0.0 means "every interface"), not something
      // a browser can visit — print a URL that's actually reachable instead.
      const visitHost = hostname === "0.0.0.0" || hostname === "::" ? "localhost" : hostname;
      console.log(`Definitive Structures LLC site listening on http://${visitHost}:${port}`);
    },
  },
  handler,
);
