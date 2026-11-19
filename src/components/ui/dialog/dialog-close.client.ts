import { mount } from "@cloudflare/nimbus-docs/client";

let n = 0;

mount("[data-dialog-close]", (btn) => {
  const dialog = btn.closest("dialog");
  if (!(dialog instanceof HTMLDialogElement)) return () => {};

  // Declarative close via Invoker Commands: the browser wires the button to
  // the dialog with no click listener at all.
  if (!dialog.id) dialog.id = `nb-dialog-${++n}`;
  btn.setAttribute("command", "close");
  btn.setAttribute("commandfor", dialog.id);

  // Fallback for browsers without Invoker Commands: same behavior, one listener.
  if ("commandForElement" in HTMLButtonElement.prototype) return () => {};
  const close = () => dialog.close();
  btn.addEventListener("click", close);
  return () => btn.removeEventListener("click", close);
});
