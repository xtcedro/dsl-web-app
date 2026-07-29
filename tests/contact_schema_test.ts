import { assert, assertEquals, assertFalse } from "@std/assert";
import { contactSchema, flattenContactErrors } from "../src/schemas/contact.ts";

Deno.test("contactSchema accepts a valid submission", () => {
  const result = contactSchema.safeParse({
    name: "Pat Homeowner",
    email: "pat@example.com",
    phone: "(405) 555-0100",
    city: "Edmond",
    style: "Detached gable",
    message: "Gate is on the north side.",
  });
  assert(result.success);
  if (result.success) {
    assertEquals(result.data.name, "Pat Homeowner");
    assertEquals(result.data.city, "Edmond");
  }
});

Deno.test("contactSchema trims whitespace and defaults an empty message", () => {
  const result = contactSchema.safeParse({
    name: "  Pat Homeowner  ",
    email: " pat@example.com ",
    phone: "405-555-0100",
    city: "Norman",
    style: "Attached lean-to",
  });
  assert(result.success);
  if (result.success) {
    assertEquals(result.data.name, "Pat Homeowner");
    assertEquals(result.data.message, "");
  }
});

Deno.test("contactSchema rejects an invalid email", () => {
  const result = contactSchema.safeParse({
    name: "Pat",
    email: "not-an-email",
    phone: "405-555-0100",
    city: "Norman",
    style: "Attached lean-to",
  });
  assertFalse(result.success);
});

Deno.test("contactSchema rejects a city outside the service area enum", () => {
  const result = contactSchema.safeParse({
    name: "Pat",
    email: "pat@example.com",
    phone: "405-555-0100",
    city: "Dallas",
    style: "Attached lean-to",
  });
  assertFalse(result.success);
});

Deno.test("contactSchema rejects a name that's too short", () => {
  const result = contactSchema.safeParse({
    name: "P",
    email: "pat@example.com",
    phone: "405-555-0100",
    city: "Norman",
    style: "Attached lean-to",
  });
  assertFalse(result.success);
});

Deno.test("flattenContactErrors keeps the first message per field", () => {
  const result = contactSchema.safeParse({
    name: "",
    email: "bad",
    phone: "x",
    city: "Nowhere",
    style: "Nope",
  });
  assert(!result.success);
  if (!result.success) {
    const errors = flattenContactErrors(result.error);
    assert("name" in errors);
    assert("email" in errors);
    assert("city" in errors);
  }
});
