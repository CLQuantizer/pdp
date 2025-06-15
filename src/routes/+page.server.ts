import { listArguments } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const recentArguments = await listArguments(locals.d1, 1, 5);
    return {
        recentArguments,
    };
};
