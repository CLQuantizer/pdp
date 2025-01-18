<script lang="ts">
    import type {Hypothesis} from "$lib/client/schemas";
    
    export let data
    $: hypotheses = data.hypotheses as Hypothesis[]
</script>

<div class="flex flex-col w-screen">
    <div class="container mx-auto pt-6 pb-24">
        <slot></slot>
        {#if hypotheses.length > 0}
            <div class="space-y-4 my-2">
                <h3 class="text-xl font-semibold">Previous Hypotheses</h3>
                <div class="space-y-4">
                    {#each hypotheses as hypothesis}
                        <div class="p-4 border rounded-lg bg-white/5">
                            <div class="space-y-2">
                                <h4 class="font-medium">Context:</h4>
                                <p class="text-sm">{hypothesis.context}</p>
                                <h4 class="font-medium">Hypothesis:</h4>
                                <p class="text-sm">{hypothesis.text}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
