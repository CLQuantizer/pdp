<div class="prose max-w-none">
    <h1>Technical Documentation</h1>

    <h2>Overview</h2>
    <p>
        This document provides a technical overview of the PDP Philosophy Platform. It covers the project's architecture, technologies used, and details about the AI agent.
    </p>

    <h2>Technology Stack</h2>
    <p>The platform is built with the following technologies:</p>
    <ul>
        <li><strong>SvelteKit</strong>: A full-stack web framework for building fast and robust web applications.</li>
        <li><strong>Tailwind CSS</strong>: A utility-first CSS framework for rapid UI development.</li>
        <li><strong>TypeScript</strong>: For static typing and improved developer experience.</li>
        <li><strong>OpenAI API</strong>: Used for the PDP agent's intelligence.</li>
    </ul>

    <h2>Project Structure</h2>
    <p>The project is organized as a standard SvelteKit application:</p>
    <ul>
        <li><code>src/lib</code>: Contains the core application logic, including server-side code, client-side utilities, and Svelte components.</li>
        <li><code>src/routes</code>: Defines the application's pages and API endpoints.</li>
        <li><code>static</code>: For static assets like images and fonts.</li>
    </ul>

    <h2>The PDP Agent</h2>
    <p>
        The PDP agent is the core of this platform. It's implemented using the OpenAI's Agents SDK.
    </p>
    <p>
        The agent's configuration can be found in <code>src/lib/integrations/openai/pdpAgent.ts</code>.
        It is a specialized agent instructed to act as a philosopher from the PDP school of thought.
    </p>
    <p>
        The agent is designed to take a philosophical argument as input and return a markdown-formatted string that analyzes the argument from a PDP perspective. 
        The agent's model is <code>gpt-o3</code>.
    </p>

    <h3>API Endpoint</h3>
    <p>
        The agent is exposed via an API endpoint at <code>/api/pdp</code>. You can send a POST request with a JSON body containing the argument to get the agent's analysis.
    </p>
    <pre><code>
POST /api/pdp
Content-Type: application/json

&lbrace;
  "argument": "Your philosophical argument here"
&rbrace;
    </code></pre>
</div> 