<script>
import {toggleMode} from "mode-watcher";
import {Button} from "$lib/components/ui/button/index";
import {MoonStar, Sun} from "lucide-svelte";
</script>

<div class="flex justify-end w-full pt-4 pb-2 px-6 gap-4">
    <Button variant="secondary" on:click={()=> window.location.href="/"}>Home</Button>
    <button on:click={toggleMode}>
        <MoonStar class="hidden dark:block"/>
        <Sun class="dark:hidden"/>
    </button>
</div>

<div class="p-4 flex gap-4">
    <aside class="w-1/4">
        <nav class="sticky top-4 flex flex-col gap-2">
            <a href="/docs/introduction" class="text-lg font-semibold hover:underline">Introduction</a>
            <a href="/docs/technical" class="text-lg font-semibold hover:underline">Technical Details</a>
            <a href="/docs/privacy" class="text-lg font-semibold hover:underline">Privacy Policy</a>
            <a href="/docs/tc" class="text-lg font-semibold hover:underline">Terms & Conditions</a>
        </nav>
    </aside>
    <main class="w-3/4">
        <slot />
    </main>
</div>