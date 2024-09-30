const b = "data-astro-transition-persist";
function J(t) {
  for (const e of document.scripts)
    for (const n of t.scripts)
      if (
        !n.hasAttribute("data-astro-rerun") &&
        ((!e.src && e.textContent === n.textContent) ||
          (e.src && e.type === n.type && e.src === n.src))
      ) {
        n.dataset.astroExec = "";
        break;
      }
}
function Q(t) {
  const e = document.documentElement,
    n = [...e.attributes].filter(
      ({ name: o }) => (e.removeAttribute(o), o.startsWith("data-astro-")),
    );
  [...t.documentElement.attributes, ...n].forEach(({ name: o, value: r }) =>
    e.setAttribute(o, r),
  );
}
function Z(t) {
  for (const e of Array.from(document.head.children)) {
    const n = nt(e, t);
    n ? n.remove() : e.remove();
  }
  document.head.append(...t.head.children);
}
function tt(t, e) {
  e.replaceWith(t);
  for (const n of e.querySelectorAll(`[${b}]`)) {
    const o = n.getAttribute(b),
      r = t.querySelector(`[${b}="${o}"]`);
    r &&
      (r.replaceWith(n),
      r.localName === "astro-island" &&
        ot(n) &&
        !rt(n, r) &&
        (n.setAttribute("ssr", ""),
        n.setAttribute("props", r.getAttribute("props"))));
  }
}
const et = () => {
    const t = document.activeElement;
    if (t?.closest(`[${b}]`)) {
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) {
        const e = t.selectionStart,
          n = t.selectionEnd;
        return () => R({ activeElement: t, start: e, end: n });
      }
      return () => R({ activeElement: t });
    } else return () => R({ activeElement: null });
  },
  R = ({ activeElement: t, start: e, end: n }) => {
    t &&
      (t.focus(),
      (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) &&
        (typeof e == "number" && (t.selectionStart = e),
        typeof n == "number" && (t.selectionEnd = n)));
  },
  nt = (t, e) => {
    const n = t.getAttribute(b),
      o = n && e.head.querySelector(`[${b}="${n}"]`);
    if (o) return o;
    if (t.matches("link[rel=stylesheet]")) {
      const r = t.getAttribute("href");
      return e.head.querySelector(`link[rel=stylesheet][href="${r}"]`);
    }
    return null;
  },
  ot = (t) => {
    const e = t.dataset.astroTransitionPersistProps;
    return e == null || e === "false";
  },
  rt = (t, e) => t.getAttribute("props") === e.getAttribute("props"),
  it = (t) => {
    J(t), Q(t), Z(t);
    const e = et();
    tt(t.body, document.body), e();
  },
  st = "astro:before-preparation",
  at = "astro:after-preparation",
  ct = "astro:before-swap",
  lt = "astro:after-swap",
  ut = (t) => document.dispatchEvent(new Event(t));
class $ extends Event {
  from;
  to;
  direction;
  navigationType;
  sourceElement;
  info;
  newDocument;
  signal;
  constructor(e, n, o, r, s, u, a, l, f, c) {
    super(e, n),
      (this.from = o),
      (this.to = r),
      (this.direction = s),
      (this.navigationType = u),
      (this.sourceElement = a),
      (this.info = l),
      (this.newDocument = f),
      (this.signal = c),
      Object.defineProperties(this, {
        from: { enumerable: !0 },
        to: { enumerable: !0, writable: !0 },
        direction: { enumerable: !0, writable: !0 },
        navigationType: { enumerable: !0 },
        sourceElement: { enumerable: !0 },
        info: { enumerable: !0 },
        newDocument: { enumerable: !0, writable: !0 },
        signal: { enumerable: !0 },
      });
  }
}
class ft extends $ {
  formData;
  loader;
  constructor(e, n, o, r, s, u, a, l, f, c) {
    super(st, { cancelable: !0 }, e, n, o, r, s, u, a, l),
      (this.formData = f),
      (this.loader = c.bind(this, this)),
      Object.defineProperties(this, {
        formData: { enumerable: !0 },
        loader: { enumerable: !0, writable: !0 },
      });
  }
}
class dt extends $ {
  direction;
  viewTransition;
  swap;
  constructor(e, n) {
    super(
      ct,
      void 0,
      e.from,
      e.to,
      e.direction,
      e.navigationType,
      e.sourceElement,
      e.info,
      e.newDocument,
      e.signal,
    ),
      (this.direction = e.direction),
      (this.viewTransition = n),
      (this.swap = () => it(this.newDocument)),
      Object.defineProperties(this, {
        direction: { enumerable: !0 },
        viewTransition: { enumerable: !0 },
        swap: { enumerable: !0, writable: !0 },
      });
  }
}
async function mt(t, e, n, o, r, s, u, a, l) {
  const f = new ft(t, e, n, o, r, s, window.document, u, a, l);
  return (
    document.dispatchEvent(f) &&
      (await f.loader(),
      f.defaultPrevented ||
        (ut(at), f.navigationType !== "traverse" && D({ scrollX, scrollY }))),
    f
  );
}
function ht(t, e) {
  const n = new dt(t, e);
  return document.dispatchEvent(n), n.swap(), n;
}
const pt = history.pushState.bind(history),
  T = history.replaceState.bind(history),
  D = (t) => {
    history.state &&
      ((history.scrollRestoration = "manual"),
      T({ ...history.state, ...t }, ""));
  },
  x = !!document.startViewTransition,
  I = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
  q = (t, e) => t.pathname === e.pathname && t.search === e.search;
let d, w, E;
const U = (t) => document.dispatchEvent(new Event(t)),
  B = () => U("astro:page-load"),
  wt = () => {
    let t = document.createElement("div");
    t.setAttribute("aria-live", "assertive"),
      t.setAttribute("aria-atomic", "true"),
      (t.className = "astro-route-announcer"),
      document.body.append(t),
      setTimeout(() => {
        let e =
          document.title ||
          document.querySelector("h1")?.textContent ||
          location.pathname;
        t.textContent = e;
      }, 60);
  },
  H = "data-astro-transition-persist",
  M = "data-astro-transition",
  P = "data-astro-transition-fallback";
let O,
  y = 0;
history.state
  ? ((y = history.state.index),
    scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
  : I() &&
    (T({ index: y, scrollX, scrollY }, ""),
    (history.scrollRestoration = "manual"));
async function gt(t, e) {
  try {
    const n = await fetch(t, e),
      r = (n.headers.get("content-type") ?? "").split(";", 1)[0].trim();
    return r !== "text/html" && r !== "application/xhtml+xml"
      ? null
      : {
          html: await n.text(),
          redirected: n.redirected ? n.url : void 0,
          mediaType: r,
        };
  } catch {
    return null;
  }
}
function V() {
  const t = document.querySelector('[name="astro-view-transitions-fallback"]');
  return t ? t.getAttribute("content") : "animate";
}
function bt() {
  let t = Promise.resolve();
  for (const e of Array.from(document.scripts)) {
    if (e.dataset.astroExec === "") continue;
    const n = e.getAttribute("type");
    if (n && n !== "module" && n !== "text/javascript") continue;
    const o = document.createElement("script");
    o.innerHTML = e.innerHTML;
    for (const r of e.attributes) {
      if (r.name === "src") {
        const s = new Promise((u) => {
          o.onload = o.onerror = u;
        });
        t = t.then(() => s);
      }
      o.setAttribute(r.name, r.value);
    }
    (o.dataset.astroExec = ""), e.replaceWith(o);
  }
  return t;
}
const W = (t, e, n, o, r) => {
  const s = q(e, t),
    u = document.title;
  document.title = o;
  let a = !1;
  if (t.href !== location.href && !r)
    if (n.history === "replace") {
      const l = history.state;
      T(
        { ...n.state, index: l.index, scrollX: l.scrollX, scrollY: l.scrollY },
        "",
        t.href,
      );
    } else pt({ ...n.state, index: ++y, scrollX: 0, scrollY: 0 }, "", t.href);
  if (
    ((document.title = u),
    (E = t),
    s || (scrollTo({ left: 0, top: 0, behavior: "instant" }), (a = !0)),
    r)
  )
    scrollTo(r.scrollX, r.scrollY);
  else {
    if (t.hash) {
      history.scrollRestoration = "auto";
      const l = history.state;
      (location.href = t.href),
        history.state ||
          (T(l, ""), s && window.dispatchEvent(new PopStateEvent("popstate")));
    } else a || scrollTo({ left: 0, top: 0, behavior: "instant" });
    history.scrollRestoration = "manual";
  }
};
function yt(t) {
  const e = [];
  for (const n of t.querySelectorAll("head link[rel=stylesheet]"))
    if (
      !document.querySelector(
        `[${H}="${n.getAttribute(H)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`,
      )
    ) {
      const o = document.createElement("link");
      o.setAttribute("rel", "preload"),
        o.setAttribute("as", "style"),
        o.setAttribute("href", n.getAttribute("href")),
        e.push(
          new Promise((r) => {
            ["load", "error"].forEach((s) => o.addEventListener(s, r)),
              document.head.append(o);
          }),
        );
    }
  return e;
}
async function F(t, e, n, o, r) {
  async function s(l) {
    function f(h) {
      const m = h.effect;
      return !m || !(m instanceof KeyframeEffect) || !m.target
        ? !1
        : window.getComputedStyle(m.target, m.pseudoElement)
            .animationIterationCount === "infinite";
    }
    const c = document.getAnimations();
    document.documentElement.setAttribute(P, l);
    const p = document.getAnimations().filter((h) => !c.includes(h) && !f(h));
    return Promise.allSettled(p.map((h) => h.finished));
  }
  if (r === "animate" && !n.transitionSkipped && !t.signal.aborted)
    try {
      await s("old");
    } catch {}
  const u = document.title,
    a = ht(t, n.viewTransition);
  W(a.to, a.from, e, u, o),
    U(lt),
    r === "animate" &&
      (!n.transitionSkipped && !a.signal.aborted
        ? s("new").finally(() => n.viewTransitionFinished())
        : n.viewTransitionFinished());
}
function vt() {
  return d?.controller.abort(), (d = { controller: new AbortController() });
}
async function j(t, e, n, o, r) {
  const s = vt();
  if (!I() || location.origin !== n.origin) {
    s === d && (d = void 0), (location.href = n.href);
    return;
  }
  const u = r ? "traverse" : o.history === "replace" ? "replace" : "push";
  if (
    (u !== "traverse" && D({ scrollX, scrollY }),
    q(e, n) && ((t !== "back" && n.hash) || (t === "back" && e.hash)))
  ) {
    W(n, e, o, document.title, r), s === d && (d = void 0);
    return;
  }
  const a = await mt(
    e,
    n,
    t,
    u,
    o.sourceElement,
    o.info,
    s.controller.signal,
    o.formData,
    l,
  );
  if (a.defaultPrevented || a.signal.aborted) {
    s === d && (d = void 0), a.signal.aborted || (location.href = n.href);
    return;
  }
  async function l(i) {
    const p = i.to.href,
      h = { signal: i.signal };
    if (i.formData) {
      h.method = "POST";
      const g =
        i.sourceElement instanceof HTMLFormElement
          ? i.sourceElement
          : i.sourceElement instanceof HTMLElement && "form" in i.sourceElement
            ? i.sourceElement.form
            : i.sourceElement?.closest("form");
      h.body =
        g?.attributes.getNamedItem("enctype")?.value ===
        "application/x-www-form-urlencoded"
          ? new URLSearchParams(i.formData)
          : i.formData;
    }
    const m = await gt(p, h);
    if (m === null) {
      i.preventDefault();
      return;
    }
    if (m.redirected) {
      const g = new URL(m.redirected);
      if (g.origin !== i.to.origin) {
        i.preventDefault();
        return;
      }
      i.to = g;
    }
    if (
      ((O ??= new DOMParser()),
      (i.newDocument = O.parseFromString(m.html, m.mediaType)),
      i.newDocument.querySelectorAll("noscript").forEach((g) => g.remove()),
      !i.newDocument.querySelector('[name="astro-view-transitions-enabled"]') &&
        !i.formData)
    ) {
      i.preventDefault();
      return;
    }
    const L = yt(i.newDocument);
    L.length && !i.signal.aborted && (await Promise.all(L));
  }
  async function f() {
    if (w && w.viewTransition) {
      try {
        w.viewTransition.skipTransition();
      } catch {}
      try {
        await w.viewTransition.updateCallbackDone;
      } catch {}
    }
    return (w = { transitionSkipped: !1 });
  }
  const c = await f();
  if (a.signal.aborted) {
    s === d && (d = void 0);
    return;
  }
  if ((document.documentElement.setAttribute(M, a.direction), x))
    c.viewTransition = document.startViewTransition(
      async () => await F(a, o, c, r),
    );
  else {
    const i = (async () => {
      await Promise.resolve(), await F(a, o, c, r, V());
    })();
    c.viewTransition = {
      updateCallbackDone: i,
      ready: i,
      finished: new Promise((p) => (c.viewTransitionFinished = p)),
      skipTransition: () => {
        (c.transitionSkipped = !0), document.documentElement.removeAttribute(P);
      },
    };
  }
  c.viewTransition.updateCallbackDone.finally(async () => {
    await bt(), B(), wt();
  }),
    c.viewTransition.finished.finally(() => {
      (c.viewTransition = void 0),
        c === w && (w = void 0),
        s === d && (d = void 0),
        document.documentElement.removeAttribute(M),
        document.documentElement.removeAttribute(P);
    });
  try {
    await c.viewTransition.updateCallbackDone;
  } catch (i) {
    const p = i;
    console.log("[astro]", p.name, p.message, p.stack);
  }
}
async function C(t, e) {
  await j("forward", E, new URL(t, location.href), e ?? {});
}
function Tt(t) {
  if (!I() && t.state) {
    location.reload();
    return;
  }
  if (t.state === null) return;
  const e = history.state,
    n = e.index,
    o = n > y ? "forward" : "back";
  (y = n), j(o, E, new URL(location.href), {}, e);
}
const X = () => {
  history.state &&
    (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY) &&
    D({ scrollX, scrollY });
};
{
  if (x || V() !== "none")
    if (
      ((E = new URL(location.href)),
      addEventListener("popstate", Tt),
      addEventListener("load", B),
      "onscrollend" in window)
    )
      addEventListener("scrollend", X);
    else {
      let t, e, n, o;
      const r = () => {
        if (o !== history.state?.index) {
          clearInterval(t), (t = void 0);
          return;
        }
        if (e === scrollY && n === scrollX) {
          clearInterval(t), (t = void 0), X();
          return;
        } else (e = scrollY), (n = scrollX);
      };
      addEventListener(
        "scroll",
        () => {
          t === void 0 &&
            ((o = history.state.index),
            (e = scrollY),
            (n = scrollX),
            (t = window.setInterval(r, 50)));
        },
        { passive: !0 },
      );
    }
  for (const t of document.scripts) t.dataset.astroExec = "";
}
const K = new Set(),
  A = new WeakSet();
let k,
  G,
  Y = !1;
function At(t) {
  Y ||
    ((Y = !0),
    (k ??= t?.prefetchAll),
    (G ??= t?.defaultStrategy ?? "hover"),
    Et(),
    St(),
    Lt(),
    Pt());
}
function Et() {
  for (const t of ["touchstart", "mousedown"])
    document.body.addEventListener(
      t,
      (e) => {
        v(e.target, "tap") && S(e.target.href, { ignoreSlowConnection: !0 });
      },
      { passive: !0 },
    );
}
function St() {
  let t;
  document.body.addEventListener(
    "focusin",
    (o) => {
      v(o.target, "hover") && e(o);
    },
    { passive: !0 },
  ),
    document.body.addEventListener("focusout", n, { passive: !0 }),
    N(() => {
      for (const o of document.getElementsByTagName("a"))
        A.has(o) ||
          (v(o, "hover") &&
            (A.add(o),
            o.addEventListener("mouseenter", e, { passive: !0 }),
            o.addEventListener("mouseleave", n, { passive: !0 })));
    });
  function e(o) {
    const r = o.target.href;
    t && clearTimeout(t),
      (t = setTimeout(() => {
        S(r);
      }, 80));
  }
  function n() {
    t && (clearTimeout(t), (t = 0));
  }
}
function Lt() {
  let t;
  N(() => {
    for (const e of document.getElementsByTagName("a"))
      A.has(e) || (v(e, "viewport") && (A.add(e), (t ??= Rt()), t.observe(e)));
  });
}
function Rt() {
  const t = new WeakMap();
  return new IntersectionObserver((e, n) => {
    for (const o of e) {
      const r = o.target,
        s = t.get(r);
      o.isIntersecting
        ? (s && clearTimeout(s),
          t.set(
            r,
            setTimeout(() => {
              n.unobserve(r), t.delete(r), S(r.href);
            }, 300),
          ))
        : s && (clearTimeout(s), t.delete(r));
    }
  });
}
function Pt() {
  N(() => {
    for (const t of document.getElementsByTagName("a"))
      v(t, "load") && S(t.href);
  });
}
function S(t, e) {
  t = t.replace(/#.*/, "");
  const n = e?.ignoreSlowConnection ?? !1;
  if (kt(t, n))
    if (
      (K.add(t),
      document.createElement("link").relList?.supports?.("prefetch") &&
        e?.with !== "fetch")
    ) {
      const o = document.createElement("link");
      (o.rel = "prefetch"), o.setAttribute("href", t), document.head.append(o);
    } else fetch(t, { priority: "low" });
}
function kt(t, e) {
  if (!navigator.onLine || (!e && z())) return !1;
  try {
    const n = new URL(t, location.href);
    return (
      location.origin === n.origin &&
      (location.pathname !== n.pathname || location.search !== n.search) &&
      !K.has(t)
    );
  } catch {}
  return !1;
}
function v(t, e) {
  if (t?.tagName !== "A") return !1;
  const n = t.dataset.astroPrefetch;
  return n === "false"
    ? !1
    : e === "tap" && (n != null || k) && z()
      ? !0
      : (n == null && k) || n === ""
        ? e === G
        : n === e;
}
function z() {
  if ("connection" in navigator) {
    const t = navigator.connection;
    return t.saveData || /2g/.test(t.effectiveType);
  }
  return !1;
}
function N(t) {
  t();
  let e = !1;
  document.addEventListener("astro:page-load", () => {
    if (!e) {
      e = !0;
      return;
    }
    t();
  });
}
function Dt() {
  const t = document.querySelector('[name="astro-view-transitions-fallback"]');
  return t ? t.getAttribute("content") : "animate";
}
function _(t) {
  return t.dataset.astroReload !== void 0;
}
(x || Dt() !== "none") &&
  (document.addEventListener("click", (t) => {
    let e = t.target;
    if (
      (t.composed && (e = t.composedPath()[0]),
      e instanceof Element && (e = e.closest("a, area")),
      !(e instanceof HTMLAnchorElement) &&
        !(e instanceof SVGAElement) &&
        !(e instanceof HTMLAreaElement))
    )
      return;
    const n = e instanceof HTMLElement ? e.target : e.target.baseVal,
      o = e instanceof HTMLElement ? e.href : e.href.baseVal,
      r = new URL(o, location.href).origin;
    _(e) ||
      e.hasAttribute("download") ||
      !e.href ||
      (n && n !== "_self") ||
      r !== location.origin ||
      t.button !== 0 ||
      t.metaKey ||
      t.ctrlKey ||
      t.altKey ||
      t.shiftKey ||
      t.defaultPrevented ||
      (t.preventDefault(),
      C(o, {
        history: e.dataset.astroHistory === "replace" ? "replace" : "auto",
        sourceElement: e,
      }));
  }),
  document.addEventListener("submit", (t) => {
    let e = t.target;
    if (e.tagName !== "FORM" || t.defaultPrevented || _(e)) return;
    const n = e,
      o = t.submitter,
      r = new FormData(n, o),
      s = typeof n.action == "string" ? n.action : n.getAttribute("action"),
      u = typeof n.method == "string" ? n.method : n.getAttribute("method");
    let a = o?.getAttribute("formaction") ?? s ?? location.pathname;
    const l = o?.getAttribute("formmethod") ?? u ?? "get";
    if (l === "dialog" || location.origin !== new URL(a, location.href).origin)
      return;
    const f = { sourceElement: o ?? n };
    if (l === "get") {
      const c = new URLSearchParams(r),
        i = new URL(a);
      (i.search = c.toString()), (a = i.toString());
    } else f.formData = r;
    t.preventDefault(), C(a, f);
  }),
  At({ prefetchAll: !0 }));
