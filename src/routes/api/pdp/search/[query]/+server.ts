import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
    const query = params.query;
    // @ts-ignore
    const answer = await env.WORKERS_AI.autorag("pdp-rag").aiSearch({query});
    return json(answer);
};
  