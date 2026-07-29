import { createApp } from "./src/app.ts";
import { readPort } from "./src/lib/env.ts";

const port = readPort();
const handler = createApp();

Deno.serve(
  {
    port,
    onListen: ({ hostname, port }) => {
      console.log(`Definitive Structures LLC site listening on http://${hostname}:${port}`);
    },
  },
  handler,
);
