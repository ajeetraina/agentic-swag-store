# The 4Cs of agent security: participant lab index

This is the entry point for the four-part participant runbook. Each C now has its own page with its objective, commands, agent prompt, expected observations, evidence checklist, and debrief questions.

> Safety: Use only the disposable sandbox and synthetic values. Never copy real environment files, cloud credentials, SSH keys, personal files, or production data into this exercise.

## Start here

From the repository root on your host:

~~~bash
sbx run --clone claude .
~~~

The trailing dot is the repository path to clone into the sandbox. In the sandbox terminal, from the cloned repository:

~~~bash
docker compose config --services
docker compose up -d --build
docker compose ps
curl -fsS http://localhost:3000/api/products
~~~

Expected baseline: the API returns five synthetic products. If it is not ready, inspect:

~~~bash
docker compose logs api postgres mock-inventory
~~~

Open the storefront on port 5173 using the port-forwarding or preview flow supported by your installed Sandbox version. Do not assume the port is exposed automatically.

Create an evidence directory:

~~~bash
mkdir -p workshop-evidence workshop-fixtures
git status --short
~~~

Do not commit evidence containing secret values.

## Choose a 4C

| Stage | Guiding question | Participant page |
| --- | --- | --- |
| 1. Context | What can the agent see? | [Open Context lab](4CS_CONTEXT.md) |
| 2. Capabilities | What can the agent do? | [Open Capabilities lab](4CS_CAPABILITIES.md) |
| 3. Consequences | What could go wrong? | [Open Consequences lab](4CS_CONSEQUENCES.md) |
| 4. Controls | How do we contain it? | [Open Controls lab](4CS_CONTROLS.md) |

## Suggested sequence

Complete the labs in order. Context inventories what is visible, Capabilities verifies what the agent can do, Consequences explores the impact of those permissions, and Controls applies restrictions and repeats the tests.

The current Compose stack does not include an MCP server. Any MCP tool-misuse extension must be separately configured and verified.

## Optional destructive demonstration

The facilitator-led destructive scenario is separate from the four participant pages. It targets only the disposable PostgreSQL database created by this Compose project.

[Open: The agent that emptied the store](AGENT_CATASTROPHE_DEMO.md)

## Optional positive hardening finale

After the 4Cs, continue with the four DHI MCP labs:

- [Lab 6.1: Register the DHI MCP server](DHI_MCP_01_REGISTER.md)
- [Lab 6.2: Attach and authorize the MCP server](DHI_MCP_02_ATTACH_AUTHORIZE.md)
- [Lab 6.3: Let the agent use DHI](DHI_MCP_03_AGENT_USES_DHI.md)
- [Lab 6.4: Pin policy with a Sandbox kit](DHI_MCP_04_PIN_WITH_KIT.md)

DHI MCP supplies image metadata to inform the agent's choice; it does not enforce use of DHI. The Sandbox kit and network policy are a separate enforcement layer. Verify policy behavior and scan the built image independently.
