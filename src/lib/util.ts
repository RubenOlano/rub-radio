import { between, count, desc, sum } from "drizzle-orm";
import { db, listeningHistory } from "./db";

export function getMonthRange(): [Date, Date] {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return [start, end];
}

export async function getTopArtists() {
  const [start, end] = getMonthRange();

  const res = await db
    .select({
      songCount: count(),
      artistName: listeningHistory.artist,
      listeningTime: sum(listeningHistory.length),
      artistImage: listeningHistory.artistImage,
    })
    .from(listeningHistory)
    .where(between(listeningHistory.listenedAt, start, end))
    .groupBy(listeningHistory.artist, listeningHistory.artistImage)
    .orderBy(desc(count()))
    .limit(10);

  return res;
}
