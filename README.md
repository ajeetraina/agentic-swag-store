# Agentic Swag Store

An AI-agent-ready Swag Store application based on the Docker Product Catalog sample.

This repository starts from [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). The application demonstrates a Node.js catalog API, PostgreSQL, S3-compatible product-image storage, Kafka product events, an external inventory service, a React storefront, and Testcontainers integration tests.

## Workshop goal

Use a realistic application to explore how to build and run AI coding agents safely with Docker Sandboxes, Docker MCP Gateway, and AI Governance.

## Storefront demo

The React client presents the catalog as a responsive product-card storefront. Participants can add products to a local, in-memory demo cart and change quantities.

**Important:** the cart is browser state only. There is no checkout, payment processing, order creation, or inventory reservation. Prices are demo catalog values, not a live offer.

Product photos are served by the existing product-image API when a catalog item has an uploaded image. Items without an image use a visual placeholder. The Kotis Docker store is the intended visual reference for the workshop, but its product photography has not been copied into this repository. Add only image assets that the project has permission to reuse, and retain any required attribution or usage terms.

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
