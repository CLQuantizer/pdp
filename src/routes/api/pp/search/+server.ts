import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";

export const GET = async ({ url }) => {
    console.log("Received GET request for /api/pdp/search");
    const query = url.searchParams.get("query");
    if (!query) {
        console.error("No query parameter provided");
        return json({ error: "Query parameter is missing" }, { status: 400 });
    }
    console.log(`Searching for query: ${query}`);
    try {
        // @ts-ignore
        const answer = await env.WORKERS_AI.autorag("pdp-rag").aiSearch({
            query: query,
        });
        console.log("Successfully retrieved answer from AI service");
        return json(answer);
    } catch (error) {
        console.error("Error calling AI service:", error);
        return json({ error: "Failed to fetch from AI service" }, { status: 500 });
    }
}; 