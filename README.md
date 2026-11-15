# Agentic Swag Store

An AI-agent-ready Swag Store application built on the Docker Product Catalog sample.

This repository starts from [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node), a sample Node.js catalog service demonstrating container-supported development, PostgreSQL, S3-compatible object storage, Kafka events, an external inventory service, and Testcontainers integration tests.

## Workshop goal

Use a real application to explore how to build and run AI coding agents safely with Docker Sandboxes, Docker MCP Gateway, and AI Governance.

The initial baseline preserves the upstream catalog application. The Swag Store domain transformation and agent governance exercises will be added incrementally.

## Planned workshop capabilities

- Rebrand the product catalog as a Docker Swag Store.
- Add realistic swag products, inventory, and storefront workflows.
- Add a Swag MCP server with read and write tools.
- Demonstrate allowed, denied, and approval-required tool operations.
- Run development and tests inside Docker Sandboxes.
- Explore local and cloud sandbox workflows.

## Getting started

The upstream application currently runs its dependencies with Docker Compose and the Node.js API natively. See the upstream project documentation while the Swag Store setup is being adapted:

- [Upstream repository](https://github.com/dockersamples/catalog-service-node)
- [Upstream README](https://github.com/dockersamples/catalog-service-node/blob/main/README.md)

## Upstream attribution

This project is based on the work in [dockersamples/catalog-service-node](https://github.com/dockersamples/catalog-service-node). The upstream project is released under CC0 1.0 Universal. Its license is retained in this repository.

## Status

The repository is at the application-baseline stage. Swag Store-specific features and workshop instructions are being developed.
