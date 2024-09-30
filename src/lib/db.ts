import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const listeningHistory = pgTable("listeningHistory", {
  id: serial("id").primaryKey(),
  song: text("song").notNull(),
  artist: text("artist").notNull(),
  album: text("album").notNull(),
  art: text("art").notNull(), // URL to album art
  length: integer("length").notNull(), // in seconds
  listenedAt: timestamp("listendAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

const client = postgres(import.meta.env.DB_URL!, { prepare: false });
export const db = drizzle(client);
