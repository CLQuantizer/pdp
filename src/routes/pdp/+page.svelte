<script lang="ts">
	import { marked } from 'marked';
	import ky from 'ky';

	export let data;

	type Argument = {
		id: number;
		argument: string;
		pdp: string | null;
		status: number;
		createdAt: Date;
		updatedAt: Date;
	};

	let argumentsList: Argument[] = data.arguments;
	let editingId: number | null = null;
	let newArgumentText = '';
	let isLoading = false;
	let error: string | null = null;

	async function createArgument() {
		isLoading = true;
		error = null;
		try {
			const returnedArgument: Argument = await ky
				.post('/api/pdp', { json: { argument: newArgumentText }, timeout: 30000 })
				.json();
			const exists = argumentsList.some((arg) => arg.id === returnedArgument.id);

			if (!exists) {
				argumentsList = [...argumentsList, returnedArgument];
				newArgumentText = '';
			} else {
				error = 'This argument already exists.';
			}
		} catch (e: any) {
			const res = await e.response.json();
			error = res.error || 'Failed to create argument.';
		} finally {
			isLoading = false;
		}
	}

	async function updateArgument(event: Event & { currentTarget: HTMLFormElement }) {
		if (editingId === null) return;
		isLoading = true;
		error = null;

		const formData = new FormData(event.currentTarget);
		const id = Number(formData.get('id'));
		const argument = formData.get('argument') as string;
		const pdp = formData.get('pdp') as string;
		const status = Number(formData.get('status'));

		try {
			const updatedArgument: Argument = await ky
				.patch(`/api/pdp/${id}`, { json: { argument, pdp, status }, timeout: 30000 })
				.json();
			argumentsList = argumentsList.map((arg) => (arg.id === id ? updatedArgument : arg));
			editingId = null;
		} catch (e: any) {
			const res = await e.response.json();
			error = res.error || 'Failed to update argument.';
		} finally {
			isLoading = false;
		}
	}

	async function deleteArgument(id: number) {
		isLoading = true;
		error = null;
		try {
			await ky.delete(`/api/pdp/${id}`);
			argumentsList = argumentsList.filter((arg) => arg.id !== id);
		} catch (e: any) {
			const res = await e.response.json();
			error = res.error || 'Failed to delete argument.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>PDP Arguments</title>
</svelte:head>

<main class="container mx-auto p-4 bg-background text-foreground">
	<h1 class="text-2xl font-bold mb-4">PDP Arguments</h1>

	{#if error}
		<div
			class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
			role="alert"
		>
			<span class="font-medium">Error:</span>
			{error}
		</div>
	{/if}

	<section class="mb-8">
		<h2 class="text-xl font-semibold mb-2">Create New Argument</h2>
		<form on:submit|preventDefault={createArgument} class="bg-card p-4 rounded-lg border">
			<label for="argument" class="block mb-2 font-medium">Argument/Problem/Proposition:</label>
			<textarea
				id="argument"
				bind:value={newArgumentText}
				rows="4"
				required
				class="w-full p-2 bg-input border rounded-md"
				disabled={isLoading}
			></textarea>
			<button
				type="submit"
				class="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
				disabled={isLoading}
			>
				{#if isLoading}
					<span>Processing...</span>
				{:else}
					<span>Get PDP interpretation & Save</span>
				{/if}
			</button>
		</form>
	</section>

	<hr class="my-8 border-border" />

	<section>
		<h2 class="text-xl font-semibold mb-2">Existing Arguments</h2>
		{#each argumentsList as arg (arg.id)}
			<div class="bg-card p-4 rounded-lg border mb-4">
				{#if editingId === arg.id}
					<form on:submit|preventDefault={updateArgument}>
						<input type="hidden" name="id" value={arg.id} />
						<label for="edit-argument-{arg.id}" class="block mb-2 font-medium">Argument:</label>
						<textarea
							id="edit-argument-{arg.id}"
							name="argument"
							rows="2"
							class="w-full p-2 bg-input border rounded-md"
							value={arg.argument}
						></textarea>

						<label for="edit-pdp-{arg.id}" class="block mt-4 mb-2 font-medium">PDP View:</label>
						<textarea
							id="edit-pdp-{arg.id}"
							name="pdp"
							rows="10"
							class="w-full p-2 bg-input border rounded-md"
							value={arg.pdp || ''}></textarea>

						<label for="edit-status-{arg.id}" class="block mt-4 mb-2 font-medium">Status:</label>
						<input
							type="number"
							id="edit-status-{arg.id}"
							name="status"
							value={`${arg.status}`}
							class="w-full p-2 bg-input border rounded-md"
						/>

						<div class="flex gap-2 mt-4">
							<button
								type="submit"
								class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
							>
								Save
							</button>
							<button
								type="button"
								on:click={() => (editingId = null)}
								class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
							>
								Cancel
							</button>
						</div>
					</form>
				{:else}
					<h3 class="text-lg font-bold">{arg.argument}</h3>
					<div class="prose dark:prose-invert mt-2 p-2 bg-muted rounded-md">
						{@html marked(arg.pdp || '')}
					</div>
					<small class="block text-muted-foreground mt-2"
						>Status: {arg.status} | Created: {new Date(
							arg.createdAt
						).toLocaleString()} | Updated: {new Date(arg.updatedAt).toLocaleString()}</small
					>
					<div class="flex gap-2 mt-4">
						<button
							on:click={() => (editingId = arg.id)}
							class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
						>
							Edit
						</button>
						<button
							on:click={() => deleteArgument(arg.id)}
							class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
							disabled={isLoading}
						>
							Delete
						</button>
					</div>
				{/if}
			</div>
		{:else}
			<p>No arguments found. Create one!</p>
		{/each}
	</section>
</main> 