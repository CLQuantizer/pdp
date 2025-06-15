import { listArguments } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    //log d1
    console.log("d1:", JSON.stringify(locals.d1, null, 2))
    const recentArguments = await listArguments(locals.d1, 1, 5);
    return {
        recentArguments,
    };
};
