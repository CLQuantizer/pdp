import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";

export const GET = async ({ url }) => {
    const query = url.searchParams.get("query");
    // @ts-ignore
    const answer = await env.WORKERS_AI.autorag("pdp-rag").aiSearch({
        query: query,
    });
    return json(answer);
};
  