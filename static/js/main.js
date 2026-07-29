"use strict";

/** Opens/closes the mobile nav drawer and keeps its aria-expanded state honest. */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      close();
      toggle.focus();
    }
  });
}

/** Fades sections in as they enter the viewport. Falls back to visible-by-default. */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (targets.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

function showBanner(banner, message) {
  if (!banner) return;
  if (message) banner.textContent = message;
  banner.hidden = false;
}

function hideBanner(banner) {
  if (banner) banner.hidden = true;
}

function firstErrorMessage(errors) {
  if (!errors) return undefined;
  const values = Object.values(errors);
  return values.length > 0 ? values[0] : undefined;
}

/**
 * Submits the quote form with fetch so the page never reloads. The form still has a
 * real method/action, so it works with JavaScript disabled — this only intercepts it.
 */
function initQuoteForm() {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const successBanner = document.getElementById("formSuccess");
  const errorBanner = document.getElementById("formError");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideBanner(successBanner);
    hideBanner(errorBanner);
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (result.ok) {
        form.reset();
        showBanner(successBanner);
      } else {
        showBanner(
          errorBanner,
          firstErrorMessage(result.errors) ??
            "Something went wrong. Please check the form and try again.",
        );
      }
    } catch {
      showBanner(
        errorBanner,
        "We couldn't reach the server. Check your connection, or call us directly.",
      );
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

initNavToggle();
initScrollReveal();
initQuoteForm();
