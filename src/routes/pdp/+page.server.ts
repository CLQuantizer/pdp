import { d1 } from '$lib/server/db';
import { listArguments, createArgument, deleteArgument, updateArgument } from '$lib/server/db/schema';
import { runPdpAgent } from '$lib/integrations/openai/pdpAgent';
import { fail } from '@sveltejs/kit';

export const load = async () => {
    const argumentsList = await listArguments(d1);
    return {
        arguments: argumentsList,
    };
};

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const argument = data.get('argument') as string;

        if (!argument) {
            return fail(400, { argument, missing: true });
        }

        try {
            const processedArgument = argument.trim().toLowerCase();
            const pdpResponse = await runPdpAgent(processedArgument);

            if (!pdpResponse || !(pdpResponse.output as any)[0].pdp) {
                return fail(500, { error: 'Failed to get PDP interpretation' });
            }

            const newArgument = await createArgument({
                argument: processedArgument,
                pdp: (pdpResponse.output as any)[0].pdp,
                status: 0, // default status
            }, d1);

            return { success: true, newArgument };
        } catch (error) {
            console.error('Error creating argument:', error);
            return fail(500, { error: 'Internal server error' });
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));

        if (isNaN(id)) {
            return fail(400, { error: 'Invalid ID' });
        }

        try {
            await deleteArgument(id, d1);
            return { success: true };
        } catch (error) {
            console.error('Error deleting argument:', error);
            return fail(500, { error: 'Internal server error' });
        }
    },
    update: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));
        const argument = data.get('argument') as string;
        const pdp = data.get('pdp') as string;
        const status = Number(data.get('status'));

        if (isNaN(id) || !argument || !pdp || isNaN(status)) {
            return fail(400, { error: 'Invalid data for update' });
        }

        try {
            const updatedArgument = await updateArgument(id, {
                argument,
                pdp,
                status,
            }, d1);
            return { success: true, updatedArgument };
        } catch (error) {
            console.error('Error updating argument:', error);
            return fail(500, { error: 'Internal server error' });
        }
    },
};
