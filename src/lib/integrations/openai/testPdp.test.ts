import { test } from "vitest";
import { givePdpWisdom, runPdpAgent } from "./pdpAgent";

test("test pdp", {only:true, timeout:100000}, async () => {
    const result = await givePdpWisdom("Why is pdp better than Plato")
    console.log("result:", JSON.stringify(result, null, 2))
})

test("test agent", {only:true, timeout:100000}, async () => {
    const result = await runPdpAgent()
    console.log("result:", JSON.stringify(result, null, 2))
})

