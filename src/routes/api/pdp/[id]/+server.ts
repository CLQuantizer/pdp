import { getD1 } from '$lib/server/db';
import { deleteArgument, updateArgument } from '$lib/server/db/schema';
import { json, type RequestHandler } from '@sveltejs/kit';

// Update an argument
export const PATCH: RequestHandler = async ({ request, params }) => {
    const d1 = getD1();
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return json({ error: 'Invalid ID' }, { status: 400 });
        }

        const body = await request.json();
        const { argument, pdp, status } = body;

        const updated = await updateArgument(id, {
            argument,
            pdp,
            status,
        }, d1);

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
export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return json({ error: 'Invalid ID' }, { status: 400 });
        }

        const deleted = await deleteArgument(id, d1);

        if (!deleted) {
            return json({ error: 'Argument not found' }, { status: 404 });
        }

        return new Response(null, { status: 204 });

    } catch (error) {
        console.error('Error deleting argument:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}; 