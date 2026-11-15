# Swag Store workshop foundation

## Goal

Adapt the Docker Product Catalog sample into a small, realistic Swag Store that participants can use to explore AI coding agents, Docker Sandboxes, MCP tool access, and AI governance.

Upstream starting point: https://github.com/dockersamples/catalog-service-node

## Preserve from the upstream application

- Node.js catalog API and existing service boundaries
- PostgreSQL product persistence
- S3-compatible product image storage
- Kafka product update events
- External inventory integration through the mock service
- React demo client
- Jest unit tests and Testcontainers integration tests
- Existing Docker Compose development environment

Keep upstream application behavior intact in the first import. Make the Swag Store changes in small, reviewable commits.

## Swag Store domain mapping

| Existing concept | Swag Store concept |
| --- | --- |
| Product | Swag item |
| Product image | Merchandise image |
| Inventory | Available stock by SKU |
| Product update event | Swag catalog update event |
| Catalog client | Swag Store storefront |

Initial merchandise: Docker T-shirt, Docker hoodie, sticker pack, and coffee mug.

## Incremental implementation

1. **Import baseline:** bring across the upstream source, tests, Compose setup, and license before changing application behavior.
2. **Rebrand:** update sample data, storefront copy, product imagery, and project documentation.
3. **Store workflows:** add a small cart and checkout flow only if needed for the workshop. Do not imply the upstream catalog already has order or payment capabilities.
4. **MCP server:** expose product and inventory operations as explicit tools. Start read-only, then add controlled write operations.
5. **Governance:** demonstrate allowed, denied, and approval-required operations through the actual Docker MCP Gateway and organization governance mechanisms. Verify enforcement and audit records rather than relying on tool annotations alone.
6. **Sandbox labs:** run coding tasks, unit tests, and integration tests inside Docker Sandboxes. Add a cloud sandbox exercise as a separate optional lab.

## Security boundaries

- Treat product descriptions and other catalog fields as untrusted data.
- Do not put production credentials or real customer data in the demo.
- Keep destructive or business-impacting tools behind approval.
- Do not expose the database directly to the agent when an approved MCP tool is sufficient.
- Restrict direct network paths that could bypass the MCP Gateway.
- Store secrets outside source control.

## Acceptance criteria

- The imported baseline starts using the documented Compose workflow.
- Unit and integration tests have documented, reproducible commands.
- Storefront displays the sample swag catalog.
- MCP read tools work against the running application.
- Sensitive write tools are governed and their decisions can be verified.
- Workshop instructions distinguish implemented behavior from illustrative policy examples.
