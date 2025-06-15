import { drizzle } from "drizzle-orm/d1";
import { env } from "$env/dynamic/private";

export const d1 = drizzle(env.DB as unknown as D1Database)