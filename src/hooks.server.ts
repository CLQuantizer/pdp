import { sequence } from "@sveltejs/kit/hooks";

export const handleError = ({ error }:any) => {
    return { message: error};
};

// const setupDatabase: Handle = async ({ event, resolve }) => {
//     const DB = event.platform?.env?.DB;
//     if (!DB) throw new Error("DB not found");
//     event.locals.db = drizzle(DB);
//     return resolve(event);
// };

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

export const handle = sequence(
    // setupDatabase
);