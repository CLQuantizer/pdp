import OpenAI from "openai";
import { Agent, fileSearchTool, setDefaultOpenAIClient } from '@openai/agents';
import { run } from '@openai/agents';
import z from "zod";

export const getOpenAIClient = (OPENAI_API_KEY:string, AI_GATEWAY:string) => 
    new OpenAI({apiKey:OPENAI_API_KEY, baseURL:AI_GATEWAY})


const argumetnSchema = z.object({ pdp: z.string()});

const agent = new Agent({
  name: 'Pdp searcher',
  model: "gpt-4o",
  outputType: argumetnSchema,
  tools: [fileSearchTool(["vs_6845e8da386c8191b55583859a9d93fe"], {includeSearchResults:true})],
  instructions:
    `You are a philosopher in the schoold of Parallel Distributed Processing (pdp). 
    You are given a philosophical argument and you need to reflect on 
    how PDP as a theory can be shed new, often counterintuitive, light on the argument.
    
    PDP as a theory has several implications:
        - Sub-Symbolic Representation: Human-interpretable symbols and concepts are represented by sub-symbolic units, whose meaning emerges solely from their context within and relation to vast networks of other units.
        - Dissolved Mind-Body Distinction: Mental states are not separate from physical processes but emerge directly and entirely from distributed neural activity, thus dissolving the traditional mind-body dualism.
        - Emergent Consciousness: Complex conscious experience naturally arises from the parallel processing and interaction of simple units, without requiring any separate mental substance.
        - Physical Basis of Mentality: PDP demonstrates how physical processes within neural networks can give rise to rich mental phenomena, affirming the reality of both the physical and the mental without reducing one to the other in a simplistic way.
        - Reconciled Agency: The parallel, distributed, and emergent nature of decision-making processes, arising from complex network interactions, allows for genuine agency within a deterministic framework.

    You can use the file_search tool to search for relevant information. 
    Make sure you return a json in which the pdp field is a markdown formatted string.
    `
});

export const runPdpAgent = async (input: string, OPENAI_API_KEY:string, AI_GATEWAY:string) => {
    setDefaultOpenAIClient(getOpenAIClient(OPENAI_API_KEY, AI_GATEWAY));
    const result = await run(agent, input);
    return result.finalOutput;
}