import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/d1";

export const getD1 = () => {
    return drizzle(env.DB);
}