import { serveDir } from "@std/http/file-server";
import type { Handler } from "../types.ts";

/** Serves ./static/* over HTTP. Path traversal and dotfile protection come from std/http. */
export const handleStatic: Handler = (req) => {
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "static",
    quiet: true,
    showDirListing: false,
    showDotfiles: false,
  });
};
