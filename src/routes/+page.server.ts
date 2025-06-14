import { listArguments } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { getD1 } from '$lib/server/db';

export const load: PageServerLoad = async () => {
    const d1 = getD1();
    // Fetch the 5 most recent arguments
    const recentArguments = await listArguments(d1, 1, 5);
    return {
        recentArguments,
    };
};
