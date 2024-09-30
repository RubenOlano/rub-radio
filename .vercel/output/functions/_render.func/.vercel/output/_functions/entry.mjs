import { renderers } from "./renderers.mjs";
import { c as createExports } from "./chunks/entrypoint_hb8HaOuJ.mjs";
import { manifest } from "./manifest_C--IZi7N.mjs";

const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/index.astro.mjs");

const pageMap = new Map([
  [
    "node_modules/.pnpm/astro@4.15.9_rollup@4.22.5_typescript@5.6.2/node_modules/astro/dist/assets/endpoint/generic.js",
    _page0,
  ],
  ["src/pages/index.astro", _page1],
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  middleware: () => import("./_noop-middleware.mjs"),
});
const _args = {
  middlewareSecret: "50d857b4-9aca-4bc2-b99b-4e4504094aed",
  skewProtection: false,
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
