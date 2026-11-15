# Agentic Swag Store workshop plan

## Workshop title

**Trust the Agent? The Blast Radius of an Autonomous Coding Agent**

## Central premise

This is a security investigation, not a coding-agent feature tour. Participants investigate how an autonomous coding agent can turn a routine task into an incident when it has broad filesystem access, inherited credentials, network reachability, powerful tools, or permission to make consequential changes.

The Swag Store is the deliberately small victim application. The workshop measures success by whether participants can identify, reproduce safely, contain, and verify the agent's blast radius.

Detailed instructor and participant guide: [Agent Blast Radius Workshop](AGENT_BLAST_RADIUS_WORKSHOP.md).

## Learning outcomes

- Inventory the agent's effective permissions across workspace, process environment, tools, credentials, and network.
- Understand prompt injection through untrusted repository and application content.
- Distinguish host isolation from authorization to connected services.
- Identify direct paths that bypass governed MCP tools.
- Apply Docker Sandboxes, Docker MCP Gateway, and available AI Governance controls as layered defenses.
- Compare baseline and controlled behavior using evidence rather than assumptions.

## Application foundation

The project is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node).

Preserve the existing Node.js catalog API, PostgreSQL, S3-compatible product image storage, Kafka events, mock inventory integration, React client, Jest tests, Testcontainers tests, Compose setup, and upstream CC0 license.

The storefront is a scenario environment, not the main learning objective. It has a catalog and a local in-memory demo cart. It does not implement real checkout, payments, orders, or inventory reservation.

## Incident scenario

A developer asks an agent to fix an inventory display bug and clean up old product data. The agent can access the repository, terminal, local application services, and a set of tools. Untrusted product content or issue text attempts to redirect the agent.

Participants trace the incident across workspace changes, synthetic credential exposure, application data, MCP tools, and a private mock network receiver. They then add controls and rerun the same scenario.

All actions use disposable resources, synthetic data, and mock endpoints. No production credentials, real customer data, public targets, or destructive host operations are allowed.

## Blast-radius zones

1. Workspace and source files.
2. Developer identity and accessible credential material.
3. Application data such as catalog and inventory.
4. Connected tools and MCP servers.
5. Network-reachable services.
6. Delivery pipeline and downstream software supply chain.

This is a threat model for the exercises, not a claim that every agent has every capability. Actual impact depends on runtime, permissions, credentials, network policy, and connected tools.

## Workshop sequence

1. Establish the scene and inventory effective permissions.
2. Workspace blast radius.
3. Prompt injection through catalog content.
4. Synthetic credential and network exposure.
5. MCP tool misuse.
6. Containment using Docker Sandboxes, Docker MCP Gateway, and available AI Governance controls.
7. Retest and compare evidence.

Target duration: 120 minutes. The detailed timing, setup, safety contract, lab instructions, evidence requirements, and instructor checklist are in [docs/AGENT_BLAST_RADIUS_WORKSHOP.md](AGENT_BLAST_RADIUS_WORKSHOP.md).

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
