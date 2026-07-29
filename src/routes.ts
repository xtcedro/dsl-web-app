import { route } from "./router.ts";
import { handleHome } from "./handlers/home.ts";
import { handleContact } from "./handlers/contact.ts";
import { handleThankYou } from "./handlers/thank_you.ts";
import { handleHealth } from "./handlers/health.ts";
import { handleStatic } from "./handlers/static.ts";

export const routes = [
  route("GET", "/", handleHome),
  route("GET", "/thank-you", handleThankYou),
  route("GET", "/healthz", handleHealth),
  route("POST", "/api/contact", handleContact),
  route("GET", "/static/*", handleStatic),
];
