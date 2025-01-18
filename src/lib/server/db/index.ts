import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/d1";
export const d1 = drizzle(env.DB);
