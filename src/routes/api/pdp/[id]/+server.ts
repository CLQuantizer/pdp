import { deleteArgument, updateArgument } from '$lib/server/db/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { hashText } from '$lib/server/services/hash';

// Update an argument
export const PATCH: RequestHandler = async ({ request, locals, params }) => {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return json({ error: 'Invalid ID' }, { status: 400 });
        }

        const body = await request.json();
        const { argument, pdp, status } = body;

        const dataToUpdate: { argument?: string; pdp?: string; status?: number, hash?: string } = { pdp, status };

        if (argument) {
            dataToUpdate.argument = argument;
            dataToUpdate.hash = hashText(argument.trim().toLowerCase());
        }

        const updated = await updateArgument(id, dataToUpdate, locals.d1);

        if (!updated) {
            return json({ error: 'Argument not found or could not be updated' }, { status: 404 });
        }

        return json(updated, { status: 200 });

    } catch (error) {
        console.error('Error updating argument:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};

// Delete an argument
export const DELETE: RequestHandler = async ({ params, locals }) => {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return json({ error: 'Invalid ID' }, { status: 400 });
        }

        const deleted = await deleteArgument(id, locals.d1);

        if (!deleted) {
            return json({ error: 'Argument not found' }, { status: 404 });
        }

        return new Response(null, { status: 204 });

    } catch (error) {
        console.error('Error deleting argument:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}; 