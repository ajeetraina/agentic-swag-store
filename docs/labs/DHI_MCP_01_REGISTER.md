# DHI hardening lab 1: Register the DHI MCP server

## Objective

Discover Docker Hardened Images (DHI) metadata through the remote, read-only DHI MCP server. This adds a trusted source of image, package, CVE and attestation information to the agent's context.

## Prerequisites

- Docker Sandboxes CLI and a supported MCP-capable coding agent.
- The Agentic Swag Store repository cloned into a disposable sandbox.
- Network access to the official DHI MCP endpoint.

## 1. Register the remote server

From the host terminal, register the remote DHI MCP endpoint:

```bash
sbx mcp add remotedhi --url https://dhi.io/mcp
sbx mcp ls
sbx mcp inspect remotedhi
```

Confirm the endpoint is exactly `https://dhi.io/mcp` and review the tools exposed by the server.

## 2. Understand the tools

The public read-only catalog tools include repository and tag discovery, image details, package metadata, CVEs and attestations. Examples include:

- `dhi_list_repositories`
- `dhi_get_repository`
- `dhi_get_tag_definition`
- `dhi_get_image_details`
- `dhi_get_image_packages`
- `dhi_get_image_cves`
- `dhi_get_image_attestations`

Do not enable or use mirror-management tools in this beginner lab. They are administrative operations and may require organization credentials.

## 3. Authentication note

The public read-only DHI catalog tools do not require Docker Hub credentials according to the DHI MCP documentation. Your Sandbox MCP integration may still present a separate authorization or connection step depending on the installed CLI/control-plane version. Check its reported status and follow the supported flow only if it is required:

```bash
sbx mcp auth status
```

Do not paste registry passwords, Docker Hub tokens or other credentials into the agent conversation.

## Evidence

Record the registered server name, endpoint, available read-only tools and any authorization status. Do not record tokens or secret values.

## Debrief

- Which data can the agent now retrieve?
- Which tools are read-only?
- Is the MCP server a policy enforcement boundary? No. It provides information to the agent; it does not by itself prevent the agent from choosing another registry.

## References

- [Docker DHI MCP documentation](https://docs.docker.com/dhi/tools/mcp/)
- [Simspace: Register DHI MCP](https://github.com/ajeetraina/simspace-container-days/blob/main/labs/securing-the-agentic-stack/01-register-dhi-mcp.md)
