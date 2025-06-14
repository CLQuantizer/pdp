import { d1 } from '$lib/server/db';
import { listArguments } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const argumentsList = await listArguments(d1);
    return {
        arguments: argumentsList,
    };
};
