import { listArguments } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { getD1 } from '$lib/server/db';

export const load: PageServerLoad = async () => {
    const d1 = getD1();
    const argumentsList = await listArguments(d1);
    return {
        arguments: argumentsList,
    };
};
