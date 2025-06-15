import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { runPdpAgent } from '$lib/integrations/openai/pdpAgent';
import { createArgument, getArgumentByHash } from '$lib/server/db/schema';
import { hashText } from '$lib/server/services/hash';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { OPENAI_API_KEY, AI_GATEWAY } = locals.env;
	try {
		const body = await request.json();
		const { argument } = body;

		if (!argument || typeof argument !== 'string') {
			return json({ error: 'Argument is required and must be a string' }, { status: 400 });
		}

		const processedArgument = argument.trim().toLowerCase();
		const argumentHash = hashText(processedArgument);

		const existingArgument = await getArgumentByHash(argumentHash, locals.d1);

		if (existingArgument) {
			return json(existingArgument);
		}

		const pdpResponse = await runPdpAgent(processedArgument, OPENAI_API_KEY, AI_GATEWAY);

		if (!pdpResponse) {
			console.error('Failed to get PDP interpretation from response:', JSON.stringify(pdpResponse, null, 2));
			return json({ error: 'Failed to get PDP interpretation' }, { status: 500 });
		}

		const dataToInsert = {
			argument: processedArgument,
			pdp: pdpResponse.pdp,
			status: 0, // default status
			hash: argumentHash
		};

		console.log('Data before DB insertion:', dataToInsert);

		const newArgument = await createArgument(dataToInsert, locals.d1);

		return json(newArgument, { status: 201 });

	} catch (error) {
		console.error('Error processing request:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
