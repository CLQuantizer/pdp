import OpenAI from "openai";
import {OPENAI_API_KEY, AI_GATEWAY} from "$env/static/private";
import { Agent, fileSearchTool } from '@openai/agents';
import { run } from '@openai/agents';
import { setDefaultOpenAIKey } from '@openai/agents';

setDefaultOpenAIKey(OPENAI_API_KEY);

const agent = new Agent({
  name: 'Pdp searcher',
  model: "gpt-4o",
  tools: [fileSearchTool(["vs_6845e8da386c8191b55583859a9d93fe"], {includeSearchResults:true})],
  instructions:
    `You are a philosopher in the schoold of Parallel Distributed Processing. 
    You are given a question and you need to generate queries to search among the vector store.
    Focus on how PDP as a theory can be used to answer the question:
    
    - The PDP model dissolves the traditional mind-body distinction by showing how mental states emerge from distributed neural activity.
    - Complex conscious experience arises naturally from the parallel processing of simple units, without requiring a separate mental substance.
    - PDP shows how physical processes can give rise to mental phenomena while maintaining the reality of both.
    - The parallel distributed nature of decision-making processes reconciles determinism with genuine agency.

    You can use the file_search tool and summarize the results for a later response,`
});

export const runPdpAgent = async () => {
    const result = await run(agent, "The Chinese Room thought experiment is unsound. Why?");
    return result;
}

const openai = new OpenAI({apiKey:OPENAI_API_KEY, baseURL:AI_GATEWAY});

export const givePdpWisdom = async (input: string) => {
    const response = await openai.responses.create({
        model: "gpt-4o", 
        input,
        tools: [{
            type: "file_search",
            vector_store_ids: ["vs_6845e8da386c8191b55583859a9d93fe"],
        }],
    });
    return response;
}

