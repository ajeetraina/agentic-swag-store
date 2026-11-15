# Agentic Swag Store

An AI-agent-ready Swag Store application based on the Docker Product Catalog sample.

This repository starts from [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). The upstream application demonstrates a Node.js catalog API, PostgreSQL, S3-compatible product-image storage, Kafka product events, an external inventory service, a React demo client, and Testcontainers integration tests.

## Workshop goal

Use a realistic application to explore how to build and run AI coding agents safely with Docker Sandboxes, Docker MCP Gateway, and AI Governance.

The initial baseline preserves the upstream application structure. Swag Store-specific branding, data, workflows, MCP tools, and governance exercises will be added incrementally.

## Planned workshop capabilities

- Rebrand the product catalog as a Docker Swag Store.
- Add realistic swag products and storefront workflows.
- Add a Swag MCP server with read and write tools.
- Demonstrate allowed, denied, and approval-required tool operations.
- Run development and tests inside Docker Sandboxes.
- Explore local and cloud sandbox workflows.

## Getting started

The baseline follows the upstream development workflow. It requires Node.js 22+ and a container runtime for the supporting services.

```bash
cp .env.example .env
docker compose up -d
npm install --omit=optional
npm run dev
```

Open the demo client at http://localhost:5173.

The original application README is available at [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node/blob/main/README.md). The setup and Compose workflow will be adapted for this repository as the Swag Store transformation progresses.

## Tests

```bash
npm run unit-test
npm run integration-test
```

Integration tests use Testcontainers to launch their dependencies. Run them in an environment where the required container runtime is available.

## Upstream attribution

This project is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). The upstream project is released under CC0 1.0 Universal. The original license is retained in this repository.

## Status

**Stage 1: Upstream application baseline.** Swag Store domain adaptation and agent governance exercises are next.
