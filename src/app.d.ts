/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
				DB: D1Database
				AI_GATEWAY: string
				OPENAI_API_KEY: string
			},
			caches: CacheStorage & { default: Cache }
		}
		// interface PageState {}
	}
}

export {}
