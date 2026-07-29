import type { ContactSubmission } from "../schemas/contact.ts";

const DATA_DIR = new URL("../../data/", import.meta.url);
const LEADS_FILE = new URL("leads.jsonl", DATA_DIR);

export interface StoredLead extends ContactSubmission {
  id: string;
  receivedAt: string;
  ip: string;
}

// Serializes concurrent writes so two in-flight submissions never interleave
// their JSON lines in the append-only log.
let writeQueue: Promise<void> = Promise.resolve();

export async function saveLead(lead: StoredLead): Promise<void> {
  const line = JSON.stringify(lead) + "\n";
  const task = writeQueue.then(async () => {
    await Deno.mkdir(DATA_DIR, { recursive: true });
    await Deno.writeTextFile(LEADS_FILE, line, { append: true, create: true });
  });
  writeQueue = task.catch(() => {});
  await task;
}
