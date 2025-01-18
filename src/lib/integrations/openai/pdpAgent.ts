import OpenAI from "openai";
import {OPENAI_API_KEY, AI_GATEWAY} from "$env/static/private";

const openai = new OpenAI({apiKey:OPENAI_API_KEY, baseURL:AI_GATEWAY});

export const givePdpWisdom = async (input: string) => {
    const response = await openai.responses.create({
        model: "gpt-4o",
        input: "What is deep research by OpenAI?",
        tools: [{
            type: "file_search",
            vector_store_ids: ["vs_6845e8da386c8191b55583859a9d93fe"],
        }],
    });
    console.log(response);

}