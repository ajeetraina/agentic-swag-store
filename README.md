# Agentic Swag Store

A deliberately small application used as the target environment for a security investigation into autonomous coding agents.

## Workshop: Trust the Agent?

**The blast radius of an autonomous coding agent**

This workshop is not primarily about building an AI coding agent. It is about what can happen when an agent is given broad filesystem access, inherited credentials, network reachability, powerful tools, or permission to make consequential changes.

Participants investigate a simulated incident involving untrusted catalog content, workspace changes, synthetic credential canaries, network access, and MCP tool misuse. They then apply layered controls and repeat the same tests.

**Start here:** [Agent Blast Radius Workshop](docs/AGENT_BLAST_RADIUS_WORKSHOP.md)

The workshop uses disposable resources, synthetic data, and private mock endpoints only. It must never use production credentials, real customer data, public targets, or destructive operations against a participant's host.

## Application

This repository is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). It includes a Node.js catalog API, PostgreSQL, S3-compatible product-image storage, Kafka product events, a mock inventory integration, a React storefront, and Testcontainers integration tests.

The storefront presents catalog items and a local, in-memory demo cart. There is no real checkout, payment processing, order creation, or inventory reservation.

## Getting started

The baseline follows the upstream development workflow. It requires Node.js 22+ and a container runtime for the supporting services.

```bash
cp .env.example .env
docker compose up -d
npm install --omit=optional
npm run dev
```

Open the storefront at http://localhost:5173.

The API runs as a local Node.js process. Docker Compose starts the supporting services used by the API and demo.

## Tests

```bash
npm run unit-test
npm run integration-test
```

Integration tests use Testcontainers to launch their dependencies. Run them in an environment where the required container runtime is available.

## Upstream attribution

This project is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). The upstream project is released under CC0 1.0 Universal. The original license is retained in this repository.
