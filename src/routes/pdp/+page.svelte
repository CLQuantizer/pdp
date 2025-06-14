<script lang="ts">
	import { marked } from 'marked';
	import { enhance } from '$app/forms';
	export let data;
	export let form;

	let argumentsList = data.arguments;
	let editingId: number | null = null;

	// Reactively update the list when form actions are successful
	$: {
		if (form?.success) {
			if (form.newArgument) {
				argumentsList = [...argumentsList, form.newArgument];
			} else if (form.updatedArgument) {
				argumentsList = argumentsList.map((arg) =>
					arg.id === form.updatedArgument.id ? form.updatedArgument : arg
				);
				editingId = null;
			}
			// For delete, we rely on a page reload or manual list update.
			// A full page invalidation is easier here.
		}
	}
</script>

<svelte:head>
	<title>PDP Arguments</title>
</svelte:head>

<main class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">PDP Arguments</h1>

	<section class="mb-8">
		<h2 class="text-xl font-semibold mb-2">Create New Argument</h2>
		<form method="POST" action="?/create" use:enhance class="bg-white p-4 rounded shadow">
			<label for="argument" class="block mb-2">Argument/Problem/Proposition:</label>
			<textarea
				id="argument"
				name="argument"
				rows="4"
				required
				class="w-full p-2 border rounded"
			></textarea>
			<button type="submit" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>Get PDP interpretation & Save</button
			>
		</form>
		{#if form?.missing}
			<p class="text-red-500 mt-2">Argument text is required.</p>
		{/if}
		{#if form?.error}
			<p class="text-red-500 mt-2">{form.error}</p>
		{/if}
	</section>

	<hr class="my-8" />

	<section>
		<h2 class="text-xl font-semibold mb-2">Existing Arguments</h2>
		{#each argumentsList as arg (arg.id)}
			<div class="bg-white p-4 rounded shadow mb-4">
				{#if editingId === arg.id}
					<form method="POST" action="?/update" use:enhance>
						<input type="hidden" name="id" value={arg.id} />
						<label for="edit-argument-{arg.id}" class="block mb-2">Argument:</label>
						<textarea id="edit-argument-{arg.id}" name="argument" rows="2" class="w-full p-2 border rounded"
							>{arg.argument}</textarea
						>

						<label for="edit-pdp-{arg.id}" class="block mt-4 mb-2">PDP View:</label>
						<textarea id="edit-pdp-{arg.id}" name="pdp" rows="10" class="w-full p-2 border rounded"
							>{arg.pdp}</textarea
						>

						<label for="edit-status-{arg.id}" class="block mt-4 mb-2">Status:</label>
						<input
							type="number"
							id="edit-status-{arg.id}"
							name="status"
							value={arg.status}
							class="w-full p-2 border rounded"
						/>

						<div class="flex gap-2 mt-4">
							<button
								type="submit"
								class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button
							>
							<button
								type="button"
								on:click={() => (editingId = null)}
								class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button
							>
						</div>
					</form>
				{:else}
					<h3 class="text-lg font-bold">{arg.argument}</h3>
					<div class="prose mt-2 p-2 bg-gray-50 rounded">
						{@html marked(arg.pdp || '')}
					</div>
					<small class="block text-gray-500 mt-2"
						>Status: {arg.status} | Created: {new Date(arg.createdAt).toLocaleString()} | Updated: {new
							Date(arg.updatedAt).toLocaleString()}</small
					>
					<div class="flex gap-2 mt-4">
						<button
							on:click={() => (editingId = arg.id)}
							class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button
						>
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								// Optimistic UI update for deletion
								argumentsList = argumentsList.filter((a) => a.id !== arg.id);
								return async ({ result }) => {
									if (result.type === 'error') {
										// if it fails, put it back.
										// A proper app would use invalidateAll() or similar
										// For now, this is simple.
										argumentsList = [...argumentsList, arg].sort((a, b) => a.id - b.id);
									}
								};
							}}
						>
							<input type="hidden" name="id" value={arg.id} />
							<button
								type="submit"
								class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button
							>
						</form>
					</div>
				{/if}
			</div>
		{:else}
			<p>No arguments found. Create one!</p>
		{/each}
	</section>
</main> 