import { count } from "drizzle-orm";
import {hypothesesTable} from "$lib/server/db/schema";
import {d1} from "$lib/server/db";

export const load = async () => {
    const select1 = await d1
        .select({cnt: count()})
        .from(hypothesesTable)
        .then(hypotheses => hypotheses[0]?.cnt ?? 0);
    console.log("row count", select1);
}
