import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { runPdpAgent } from '$lib/integrations/openai/pdpAgent';
import { createArgument } from '$lib/server/db/schema';
import { d1 } from '$lib/server/db';
import { hashText } from '$lib/server/services/hash';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const { argument } = body;

        if (!argument || typeof argument !== 'string') {
            return json({ error: 'Argument is required and must be a string' }, { status: 400 });
        }

        const processedArgument = argument.trim().toLowerCase();
        const argumentHash = hashText(processedArgument);

        const pdpResponse = await runPdpAgent(processedArgument);

        if (!pdpResponse || !(pdpResponse.output as any)[0].pdp) {
            return json({ error: 'Failed to get PDP interpretation' }, { status: 500 });
        }

        const newArgument = await createArgument({
            argument: processedArgument,
            pdp: (pdpResponse.output as any)[0].pdp,
            status: 0 // default status
        }, d1);

        return json(newArgument, { status: 201 });

    } catch (error) {
        console.error('Error processing request:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};
