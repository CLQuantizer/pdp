import { sequence } from "@sveltejs/kit/hooks";
import { drizzle } from "drizzle-orm/d1";

export const handleError = ({ error }:any) => {
    return { message: error};
};

const setupDatabase = async ({ event, resolve }:any) => {
    const env = event.platform?.env;
    if (!env) throw new Error("env not found");
    event.locals.env = env;
    event.locals.d1 = drizzle(env.DB);
    return resolve(event);
};

export const handle = sequence(
    setupDatabase
);

// const handleUserSession: Handle = async ({ event, resolve }) => {
//     let userId = event.cookies.get(USER_ID);

//     if (!userId) {
//         userId = crypto.randomUUID();
//         event.cookies.set(USER_ID, userId, {
//             path: '/',
//             httpOnly: true,
//             secure: true,
//             sameSite: 'lax',
//             maxAge: 60 * 60 * 24 * 365 // 1 year
//         });
//     }
//     event.locals.userId = userId;
//     return resolve(event);
// };
