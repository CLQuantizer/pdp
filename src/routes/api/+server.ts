import {json} from "@sveltejs/kit";
import {hypothesesTable} from "$lib/server/db/schema";

export const GET = async ({locals})=> {
    const hypo = await locals.d1.select().from(hypothesesTable).all();
    return json({hypo});
}