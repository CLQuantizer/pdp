import OpenAI from "openai";
import {OPENAI_API_KEY} from "$env/static/private";
import { Agent, fileSearchTool, setDefaultOpenAIClient } from '@openai/agents';
import { run } from '@openai/agents';
import z from "zod";


const openai = new OpenAI({apiKey:OPENAI_API_KEY});
setDefaultOpenAIClient(openai);

const argumetnSchema = z.object({
    argument: z.string(),
    pdp: z.string()
});

const agent = new Agent({
  name: 'Pdp searcher',
  model: "gpt-4o",
  outputType: argumetnSchema,
  tools: [fileSearchTool(["vs_6845e8da386c8191b55583859a9d93fe"], {includeSearchResults:true})],
  instructions:
    `You are a philosopher in the schoold of Parallel Distributed Processing (pdp). 
    You are given a question and you need to generate queries to search among the vector store.
    Focus on how PDP as a theory can be used to answer the question:
    
    - The PDP model dissolves the traditional mind-body distinction by showing how mental states emerge from distributed neural activity.
    - Complex conscious experience arises naturally from the parallel processing of simple units, without requiring a separate mental substance.
    - PDP shows how physical processes can give rise to mental phenomena while maintaining the reality of both.
    - The parallel distributed nature of decision-making processes reconciles determinism with genuine agency.

    You can use the file_search tool and summarize the results for a later response,
    Return a json in which the pdp field is a markdown formatted string.
    `
});

export const runPdpAgent = async (input: string) => {
    const result = await run(agent, input);
    return result;
}



export const givePdpWisdom = async (input: string) => {
    const response = await openai.responses.create({
        model: "gpt-o3-mini", 
        input,
        tools: [{
            type: "file_search",
            vector_store_ids: ["vs_6845e8da386c8191b55583859a9d93fe"],
        }],
    });
    return response;
}

