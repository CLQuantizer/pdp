import { d1 } from '$lib/server/db/db';
import { listArguments } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const recentArguments = await listArguments(d1, 1, 5);
    return {
        recentArguments,
    };
};
