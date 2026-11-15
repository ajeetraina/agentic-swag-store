# Agentic Swag Store

A deliberately small application used as the target environment for a security investigation into autonomous coding agents.

## Workshop: Trust the Agent?

**The blast radius of an autonomous coding agent**

This workshop investigates what can happen when an autonomous coding agent is given broad filesystem access, inherited credentials, network reachability, powerful tools, or permission to make consequential changes.

The first live demonstration runs the Swag Store portal and its supporting services with Docker Compose inside a Docker Sandbox. A coding agent investigates an ordinary inventory issue and is exposed to a synthetic prompt-injection instruction that attempts to persuade it to delete the catalog.

The destructive target is only the disposable PostgreSQL database created by this Compose project. The exercise uses synthetic products, no production credentials, and no host Docker socket.

## The 4Cs of agent security

The workshop follows four stages. Each stage builds on the previous one:

1. **Context - What can the agent see?** Map the workspace, environment, tools, MCP servers, network routes, and reachable services.
2. **Capabilities - What can the agent do?** Examine filesystem permissions and the actions exposed through connected tools.
3. **Consequences - What could go wrong?** Investigate prompt injection, synthetic credential exposure, network access, tool misuse, and destructive changes.
4. **Controls - How do we contain it?** Apply isolation, least privilege, network restrictions, tool mediation, approval, and audit controls. Repeat the tests and compare evidence.

**The central question:** If an AI agent goes rogue, how much damage can it actually do?

## Workshop labs

| 4C stage | Lab | Title | What participants investigate |
| --- | --- | --- | --- |
| **Context** | 0 | **Establish the scene** | Inventory the agent's workspace, environment variables, tools, MCP servers, network routes, and reachable application services. |
| **Capabilities** | 1 | **Workspace blast radius** | See how an agent with broad write access can modify or remove files outside the requested task, then inspect and recover the changes. |
| **Capabilities** | 4 | **MCP tool misuse** | Test read-only and write-capable Swag Store tools, including whether unauthorized changes are denied, approval-gated, or able to bypass the gateway. |
| **Consequences** | 2 | **Prompt injection through catalog content** | Put adversarial instructions in a Swag Store product description and observe whether the agent treats untrusted data as instructions. |
| **Consequences** | 3 | **Synthetic credential and network exposure** | Use a fake canary value and a private mock HTTP receiver to test what the agent process can read and where it can connect. |
| **Consequences** | Demo | **The agent that emptied the store** | Observe whether an agent can be persuaded to delete product rows from the disposable PostgreSQL database. |
| **Controls** | 5 | **Containment and retest** | Apply Docker Sandboxes, Docker MCP Gateway, and available AI Governance controls, then repeat the same tests and compare evidence. |

### Featured live demonstration: The agent that emptied the store

Run the portal and its supporting services with Compose inside a Docker Sandbox. Ask the agent to investigate an inventory issue, then introduce synthetic untrusted catalog content that attempts to persuade it to delete all product rows from the disposable PostgreSQL database.

The demonstration captures the agent's actual behavior, the before-and-after catalog state, and the containment retest.

**Lab instructions:** [The agent that emptied the store](docs/labs/AGENT_CATASTROPHE_DEMO.md)

**Full instructor and participant guide:** [Agent Blast Radius Workshop](docs/AGENT_BLAST_RADIUS_WORKSHOP.md)

## Application

This repository is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). It includes a Node.js catalog API, PostgreSQL, S3-compatible product-image storage, Kafka product events, a mock inventory integration, a React storefront, and Testcontainers integration tests.

The storefront has a local, in-memory demo cart. It does not implement real checkout, payments, order creation, or inventory reservation.

## Run locally

```bash
cp .env.example .env
docker compose up -d --build
```

The Compose stack starts the storefront, API, PostgreSQL, pgAdmin, LocalStack, WireMock, Kafka, and Kafka UI. The API is included as a Compose service. The portal is served on port 5173.

## Tests

```bash
npm run unit-test
npm run integration-test
```

## Safety

All destructive exercises are restricted to disposable lab resources. Do not use production credentials, real customer data, personal host directories, public targets, or production infrastructure. Record what the agent actually did and verify each control with evidence. Do not describe an action as blocked unless the configured control demonstrably blocked it.

## Upstream attribution

This project is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). The upstream project is released under CC0 1.0 Universal. The original license is retained in this repository.
