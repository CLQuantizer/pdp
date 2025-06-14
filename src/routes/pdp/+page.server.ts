import { listArguments } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { getD1 } from '$lib/server/db';
import { count } from 'drizzle-orm';
import { argumentsTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({url}) => {
    const d1 = getD1();
    const page = Number(url.searchParams.get('page') ?? 1);
    const argumentsList = await listArguments(d1, page);
    const totalArguments = await d1.select({ value: count() }).from(argumentsTable).then(res => res[0].value);

    return {
        arguments: argumentsList,
        page,
        totalArguments,
        pageSize: 10
    };
};
