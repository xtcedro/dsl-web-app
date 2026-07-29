import type { Handler } from "../types.ts";

export const handleHealth: Handler = () => {
  return Response.json({ status: "ok", time: new Date().toISOString() });
};
