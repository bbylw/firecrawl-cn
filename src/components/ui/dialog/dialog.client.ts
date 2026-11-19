import { lockScroll, mount, unlockScroll } from "@cloudflare/nimbus-docs/client";

mount("[data-dialog]", (root) => {
  if (!(root instanceof HTMLDialogElement)) return () => {};
  const dialog = root;

  // Native light dismiss: clicks on the ::backdrop close the dialog.
  // Esc and the back gesture already work without it.
  dialog.setAttribute("closedby", "any");

  const sync = () => (dialog.open ? lockScroll() : unlockScroll());
  const observer = new MutationObserver(sync);
  observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });

  const cleanups = [() => observer.disconnect()];

  // Light-dismiss fallback for browsers without closedby. Test the pointer
  // position, not event.target: the dialog is also the target for its own
  // padding. Require press AND release outside, so a text-selection drag
  // ending on the backdrop does not dismiss.
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    const outside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    const onPress = (e: PointerEvent) => {
      pressedOutside = outside(e);
    };
    const onRelease = (e: PointerEvent) => {
      if (pressedOutside && outside(e)) dialog.close();
      pressedOutside = false;
    };
    dialog.addEventListener("pointerdown", onPress);
    dialog.addEventListener("pointerup", onRelease);
    cleanups.push(() => {
      dialog.removeEventListener("pointerdown", onPress);
      dialog.removeEventListener("pointerup", onRelease);
    });
  }

  return () => {
    cleanups.forEach((fn) => fn());
    // A swap while open never fires `close`; balance the scroll lock.
    if (dialog.open) unlockScroll();
  };
});
