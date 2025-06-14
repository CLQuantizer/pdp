import { test } from "vitest";
import { runPdpAgent } from "./pdpAgent";

test("test agent", {only:true, timeout:100000}, async () => {
    const result = await runPdpAgent("The Chinese Room thought experiment")
    console.log("result:", JSON.stringify(result, null, 2))
})

