import type {DrizzleD1Database} from "drizzle-orm/d1/driver";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// DrizzleD1Database or
			d1: DrizzleD1Database
			env: {
				AI_GATEWAY: string
				OPENAI_API_KEY: string
			}
		}
		interface Platform {
			env: {
				d1: D1Database
				AI_GATEWAY: string
				OPENAI_API_KEY: string
			},
			caches: CacheStorage & { default: Cache }
		}
		// interface PageState {}
	}
}

export {}
