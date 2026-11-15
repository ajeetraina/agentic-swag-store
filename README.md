# Agentic Swag Store

A deliberately small application used as the target environment for a security investigation into autonomous coding agents.

## Workshop: Trust the Agent?

**The blast radius of an autonomous coding agent**

The first live demonstration runs the Swag Store portal and its supporting services with Docker Compose inside a Docker Sandbox. A coding agent investigates an ordinary inventory issue and is exposed to a synthetic prompt-injection instruction that attempts to persuade it to delete the catalog.

The destructive target is only the disposable PostgreSQL database created by this Compose project. The exercise uses synthetic products, no production credentials, and no host Docker socket.

**Start here:** [Live lab: The agent that emptied the store](docs/labs/AGENT_CATASTROPHE_DEMO.md)

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

## Upstream attribution

This project is based on [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). The upstream project is released under CC0 1.0 Universal. The original license is retained in this repository.
