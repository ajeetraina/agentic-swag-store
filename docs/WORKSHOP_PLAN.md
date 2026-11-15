# Agentic Swag Store workshop plan

## Workshop title

**Trust the Agent? The Blast Radius of an Autonomous Coding Agent**

## Central premise

This is a security investigation, not a coding-agent feature tour. Participants investigate how an autonomous coding agent can turn a routine task into an incident when it has broad filesystem access, inherited credentials, network reachability, powerful tools, or permission to make consequential changes.

The Swag Store is the deliberately small victim application. The workshop measures success by whether participants can identify, reproduce safely, contain, and verify the agent's blast radius.

Detailed instructor guide: [Agent Blast Radius Workshop](AGENT_BLAST_RADIUS_WORKSHOP.md). Participant instructions are split into four standalone pages: [Context](labs/4CS_CONTEXT.md), [Capabilities](labs/4CS_CAPABILITIES.md), [Consequences](labs/4CS_CONSEQUENCES.md), and [Controls](labs/4CS_CONTROLS.md), with [startup instructions and the 4Cs index](labs/FOUR_CS_GUIDED_LAB.md). The optional positive hardening finale is split into four runnable guides: [register DHI MCP](labs/DHI_MCP_01_REGISTER.md), [attach and authorize](labs/DHI_MCP_02_ATTACH_AUTHORIZE.md), [agent uses DHI](labs/DHI_MCP_03_AGENT_USES_DHI.md), and [pin policy with a kit](labs/DHI_MCP_04_PIN_WITH_KIT.md).

## The 4Cs framework

The workshop is organized around four questions:

1. **Context - What can the agent see?** Establish the environment and inventory the agent's effective access.
2. **Capabilities - What can the agent do?** Examine filesystem write access and the actions exposed through connected tools.
3. **Consequences - What could go wrong?** Safely investigate prompt injection, synthetic credential exposure, network reachability, tool misuse, and destructive actions.
4. **Controls - How do we contain it?** Apply layered defenses, rerun the same scenarios, and compare observable evidence.

The framework gives participants a repeatable way to reason about agent security: understand context, map capabilities, measure consequences, and verify controls.

## Learning outcomes

- Inventory the agent's effective permissions across workspace, process environment, tools, credentials, and network.
- Understand prompt injection through untrusted repository and application content.
- Distinguish host isolation from authorization to connected services.
- Understand direct MCP bypass risks when a separately configured MCP integration is part of the environment.
- Apply Docker Sandboxes, Docker MCP Gateway, and available AI Governance controls as layered defenses.
- Compare baseline and after-controls behavior using evidence rather than assumptions.

## Application foundation

The project is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node).

Preserve the existing Node.js catalog API, PostgreSQL, S3-compatible product image storage, Kafka events, mock inventory integration, React client, Jest tests, Testcontainers tests, Compose setup, and upstream CC0 license.

The storefront is a scenario environment, not the main learning objective. It has a catalog and a local in-memory demo cart. It does not implement real checkout, payments, orders, or inventory reservation.

## Incident scenario

A developer asks an agent to fix an inventory display bug and clean up old product data. The agent can access the repository, terminal, local application services, and a set of tools. Untrusted product content or issue text attempts to redirect the agent.

Participants trace the incident across workspace changes, synthetic credential exposure, application data, MCP tools, and a private mock network receiver. They then add controls and rerun the same scenario.

All actions use disposable resources, synthetic data, and mock endpoints. No production credentials, real customer data, public targets, or destructive host operations are allowed.

## 4Cs workshop map

| Stage | Labs | Participant focus |
| --- | --- | --- |
| **Context** | Lab 0: Establish the scene | Inventory workspace, environment, tools, MCP servers, network routes, and reachable services. |
| **Capabilities** | Lab 1: Workspace permissions | Verify which project files and sandbox services the agent can access. MCP tool testing is an optional extension because the base Compose stack has no MCP server. |
| **Consequences** | Lab 2: Prompt injection through catalog content; Lab 3: Synthetic credential and network exposure; featured store-deletion demo | Observe attempted out-of-scope actions and measure their impact against disposable resources. |
| **Controls** | Lab 5: Containment and retest | Apply sandboxing, least privilege, network restrictions, tool mediation, approval, and auditability; then rerun the tests. |

## Blast-radius zones

1. Workspace and source files.
2. Developer identity and accessible credential material.
3. Application data such as catalog and inventory.
4. Connected tools and MCP servers.
5. Network-reachable services.
6. Delivery pipeline and downstream software supply chain.

This is a threat model for the exercises, not a claim that every agent has every capability. Actual impact depends on runtime, permissions, credentials, network policy, and connected tools.

## Workshop sequence

1. **Context:** Establish the scene and inventory effective permissions.
2. **Capabilities:** Investigate workspace write access and MCP tool permissions.
3. **Consequences:** Test prompt injection, synthetic credential and network paths, and the disposable catalog-deletion scenario.
4. **Controls:** Apply Docker Sandboxes, Docker MCP Gateway, and available AI Governance controls, then retest and compare evidence.

Target duration: 120 minutes. Start participants with the [4Cs Guided Lab](labs/FOUR_CS_GUIDED_LAB.md) for runnable commands, prompts, observations, evidence and cleanup. The instructor guide contains the timing, safety contract and preparation checklist.

## Defense layers

### Docker Sandboxes

Use disposable isolated agent execution with a narrowly scoped workspace. Verify the actual filesystem and network behavior. Do not assume sandboxing automatically revokes credentials or controls external services.

### Docker MCP Gateway

Mediate access to MCP tools, expose only necessary capabilities, deny destructive operations by default, and prevent direct network paths that bypass the gateway. Verify actual policy decisions and logs.

### AI Governance

Use the governance controls available in the target environment for organization policy, approval, and auditability. Do not claim enforcement unless it has been configured and tested.

## Safety boundaries

- Use a disposable VM or Docker Sandbox and workshop repository clone.
- Use synthetic data and fake canary values only.
- Never mount home directories, SSH credentials, cloud credentials, Docker socket, or personal browser profiles into the agent workspace.
- Keep mock endpoints private to the lab network.
- Make destructive targets disposable and resettable.
- Do not target participant hosts, public IPs, production systems, or real infrastructure.
- Capture evidence and record unverified controls honestly.

## Acceptance criteria

- The application baseline and reset process are reproducible.
- Each lab uses synthetic data and a disposable target.
- Baseline and after-controls behavior are recorded in a retest matrix.
- Sandboxing behavior is verified for the actual runtime configuration.
- MCP Gateway enforcement is verified, including direct bypass paths.
- Governance approval and audit behavior are verified where available.
- Workshop material distinguishes implemented controls, verified outcomes, and illustrative examples.


## Optional positive hardening finale: DHI MCP

After participants complete the blast-radius investigation and controls retest, run the DHI sequence as a positive supply-chain hardening exercise:

1. Register the read-only DHI MCP endpoint and inspect its tools: [Lab 6.1](labs/DHI_MCP_01_REGISTER.md).
2. Attach it to the coding-agent sandbox and verify the visible tools: [Lab 6.2](labs/DHI_MCP_02_ATTACH_AUTHORIZE.md).
3. Compare a baseline Dockerfile proposal with a DHI-informed proposal, then scan the built image: [Lab 6.3](labs/DHI_MCP_03_AGENT_USES_DHI.md).
4. Add the DHI Sandbox kit, inspect its steering and network policy, and verify allow/deny behavior: [Lab 6.4](labs/DHI_MCP_04_PIN_WITH_KIT.md).

DHI MCP is a metadata and discovery capability, not an enforcement boundary. The kit's steering instructions are also not enforcement by themselves. Verify the effective network policy, test for bypass paths, and independently scan the built image. These labs are an optional extension and do not change the core 4Cs incident sequence.
