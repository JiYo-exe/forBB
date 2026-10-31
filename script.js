const envelope = document.querySelector("#envelope");
const letter = envelope.querySelector(".letter");
const hint = document.querySelector(".hint");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
let lastInputWasTouch = false;

function setEnvelopeOpen(isOpen) {
  envelope.classList.toggle("is-open", isOpen);
  envelope.setAttribute("aria-expanded", String(isOpen));
  envelope.setAttribute("aria-label", isOpen ? "Close love letter" : "Open love letter");
  hint.textContent = canHover.matches && !lastInputWasTouch
    ? "Hover over the envelope"
    : isOpen ? "Tap the envelope to close" : "Tap the envelope to open";
}

envelope.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse" && canHover.matches) {
    lastInputWasTouch = false;
    setEnvelopeOpen(true);
  }
});

envelope.addEventListener("pointerleave", (event) => {
  if (event.pointerType === "mouse" && canHover.matches) {
    setEnvelopeOpen(false);
  }
});

envelope.addEventListener("click", (event) => {
  if (event.pointerType === "touch" || !canHover.matches) {
    lastInputWasTouch = event.pointerType === "touch";
    setEnvelopeOpen(!envelope.classList.contains("is-open"));
  }
});

letter.addEventListener("click", (event) => {
  event.stopPropagation();
});

envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setEnvelopeOpen(!envelope.classList.contains("is-open"));
  }
});

setEnvelopeOpen(false);
