/* empty css                                 */
import {
  c as createComponent,
  r as renderTemplate,
  m as maybeRenderHead,
  a as createAstro,
  b as addAttribute,
  f as renderComponent,
  g as renderHead,
  h as renderSlot,
} from "../chunks/astro/server_BKMyejKU.mjs";
import { desc, count } from "drizzle-orm";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
export { renderers } from "../renderers.mjs";

const $$Astro$5 = createAstro();
const $$HomeIcon = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
    Astro2.self = $$HomeIcon;
    const { fill = false } = Astro2.props;
    return renderTemplate`${!fill ? renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>` : renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"></path><path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"></path></svg>`}`;
  },
  "/Users/ruben/rub-radio/src/icons/HomeIcon.astro",
  void 0,
);

const listeningHistory = pgTable("listeningHistory", {
  id: serial("id").primaryKey(),
  song: text("song").notNull(),
  artist: text("artist").notNull(),
  album: text("album").notNull(),
  art: text("art").notNull(),
  // URL to album art
  length: integer("length").notNull(),
  // in seconds
  listenedAt: timestamp("listendAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});
const client = postgres(
  "postgresql://postgres.adzltwzdigjfjrylqvto:miQ59eWsHjVwNvS9@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
  { prepare: false },
);
const db = drizzle(client);

const colors = [
  "from-indigo-500",
  "from-pink-500",
  "from-purple-500",
  "from-yellow-500",
  "from-green-500",
  "from-blue-500",
  "from-red-500",
];
const PAGE_SIZE = 10;

const $$Astro$4 = createAstro();
const $$PlaylistEntry = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
    Astro2.self = $$PlaylistEntry;
    const { idx } = Astro2.props;
    const [song] = await db
      .select()
      .from(listeningHistory)
      .orderBy(desc(listeningHistory.listenedAt))
      .offset(PAGE_SIZE * idx)
      .limit(1);
    if (!song) throw new Error("No song found");
    return renderTemplate`${maybeRenderHead()}<a class="flex items-center space-x-4 p-3 rounded-md hover:bg-gray-800 hover:text-white transition-colors ease-in-out duration-300"${addAttribute(`/?playlist=${idx + 1}`, "href")}> <img class="w-12 h-12 rounded-md shadow-md transition-transform transform hover:scale-105"${addAttribute(song.art, "src")}${addAttribute(song.song, "alt")}> <div class="flex flex-col justify-center"> <span class="text-sm font-semibold text-gray-400 hover:text-white truncate">
Rub's Listening - ${idx + 1} </span> </div> </a>`;
  },
  "/Users/ruben/rub-radio/src/components/PlaylistEntry.astro",
  void 0,
);

const $$Astro$3 = createAstro();
const $$Sidebar = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
    Astro2.self = $$Sidebar;
    const currentRoute = Astro2.url.pathname;
    const [songCount] = await db
      .select({ count: count() })
      .from(listeningHistory);
    if (!songCount) throw new Error("No playlists found");
    const playlistCount = Math.ceil((songCount.count - PAGE_SIZE) / PAGE_SIZE);
    return renderTemplate`${maybeRenderHead()}<div class="hidden md:flex flex-col text-gray-500 bg-black h-screen w-60 p-4 border-r border-gray-900 overflow-y-scroll scrollbar-hide"> <div class="space-y-6"> <a href="/"${addAttribute(
      [
        "flex items-center space-x-4 p-3 rounded-md hover:bg-gray-800 transition-colors ease-in-out duration-300",
        {
          "text-white bg-gray-800": currentRoute === "/",
          "hover:text-white": currentRoute !== "/",
        },
      ],
      "class:list",
    )}> ${renderComponent($$result, "HomeIcon", $$HomeIcon, { fill: currentRoute === "/" })} <span class="text-sm font-semibold">Home</span> </a> <hr class="border-gray-700"> <div class="flex flex-col space-y-2"> <span class="text-xs text-gray-400 uppercase tracking-widest">
My History
</span> ${Array.from({ length: playlistCount }).map((_, idx) => renderTemplate`${renderComponent($$result, "PlaylistEntry", $$PlaylistEntry, { idx: idx + 1 })}`)} </div> </div> </div>`;
  },
  "/Users/ruben/rub-radio/src/components/Sidebar.astro",
  void 0,
);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
    Astro2.self = $$Layout;
    const { title = "Rub Radio" } = Astro2.props;
    return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-black h-screen overflow-hidden"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
  },
  "/Users/ruben/rub-radio/src/layouts/Layout.astro",
  void 0,
);

const $$Astro$1 = createAstro();
const $$Song = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
    Astro2.self = $$Song;
    const { song, idx } = Astro2.props;
    function formatTime(time_ms) {
      const minutes = Math.floor(time_ms / 6e4);
      const seconds = ((time_ms % 6e4) / 1e3).toFixed(0);
      return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
    }
    return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-8 gap-4 items-center p-2 hover:bg-gray-800 transition-colors duration-250 ease-in-out rounded-lg"> <span class="text-gray-400 text-center">${idx}</span> <div class="flex col-span-4 space-x-4 items-center"> <img class="rounded-md w-12 h-12 md:w-16 md:h-16 shadow-sm"${addAttribute(song.art, "src")}${addAttribute(song.song, "alt")}> <div class="flex flex-col"> <h3 class="text-base md:text-lg font-medium text-white truncate"> ${song.song} </h3> <p class="text-sm text-gray-400 truncate">${song.artist}</p> </div> </div> <div class="hidden md:block col-span-2 text-gray-400 truncate"> ${song.album} </div> <div class="text-right text-gray-400"> ${formatTime(song.length)} </div> </div>`;
  },
  "/Users/ruben/rub-radio/src/components/Song.astro",
  void 0,
);

const $$ClockIcon = createComponent(
  ($$result, $$props, $$slots) => {
    return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path> </svg>`;
  },
  "/Users/ruben/rub-radio/src/icons/ClockIcon.astro",
  void 0,
);

const $$Astro = createAstro();
const $$Index = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Index;
    const page = parseInt(Astro2.url.searchParams.get("playlist") ?? "1");
    const [latestPlaying, ...rest] = await db
      .select()
      .from(listeningHistory)
      .orderBy(desc(listeningHistory.listenedAt))
      .offset(PAGE_SIZE * (page - 1))
      .limit(10);
    if (!latestPlaying) throw new Error("No currently playing song");
    const color = colors[latestPlaying.artist.charCodeAt(0) % colors.length];
    const timeElapsed_ms =
      Date.now() - new Date(latestPlaying.listenedAt).getTime();
    const song_length_ms = latestPlaying.length;
    const isPlaying = timeElapsed_ms < song_length_ms;
    return renderTemplate`${renderComponent(
      $$result,
      "Layout",
      $$Layout,
      {},
      {
        default: (
          $$result2,
        ) => renderTemplate` ${maybeRenderHead()}<div class="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide"> <section${addAttribute(`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`, "class")}> <img${addAttribute(
          [
            "rounded-full w-32 h-32 md:w-48 md:h-48 shadow-lg",
            { "animate-spin-slow": isPlaying },
          ],
          "class:list",
        )}${addAttribute(latestPlaying.art, "src")}${addAttribute(latestPlaying.song, "alt")}> <div class="flex flex-col space-y-2"> <h1 class="text-3xl md:text-4xl lg:text-6xl font-bold">
Rub's Listening - ${page} </h1> <h2 class="text-2xl md:text-3xl lg:text-5xl font-bold"> ${latestPlaying.song} </h2> <p class="text-lg md:text-xl text-gray-300">
by: ${latestPlaying.artist} </p> </div> </section> <section class="p-8"> <div class="space-y-3 text-gray-400"> <div class="grid grid-cols-8"> <span class="text-center">#</span> <div class="flex col-span-4 space-x-4 items-center"> <span class="text-center">Title</span> </div> <div class="hidden md:block col-span-2">Album</div> <div class="justify-self-end"> ${renderComponent($$result2, "ClockIcon", $$ClockIcon, {})} </div> </div> <hr class="border-gray-600"> ${renderComponent($$result2, "Song", $$Song, { song: latestPlaying, idx: 1 })} ${rest.map((song, i) => renderTemplate`${renderComponent($$result2, "Song", $$Song, { song: song, idx: i + 2 })}`)} </div> </section> </div> `,
      },
    )}`;
  },
  "/Users/ruben/rub-radio/src/pages/index.astro",
  void 0,
);

const $$file = "/Users/ruben/rub-radio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Index,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);

const page = () => _page;

export { page };
