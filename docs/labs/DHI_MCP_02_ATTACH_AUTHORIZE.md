# DHI hardening lab 2: Attach and authorize the MCP server

## Objective

Make the registered DHI MCP server available to the coding agent running in a Docker Sandbox, then verify which tools the agent can actually see.

## 1. Check the registration

```bash
sbx mcp ls
sbx mcp inspect remotedhi
sbx mcp auth status
```

If the installed Sandbox version requires an authorization handshake for the remote MCP connection, use the documented flow shown by the CLI. Do not assume that public DHI catalog access requires Docker Hub credentials: the public read-only DHI tools are documented as available without them.

## 2. Start a sandbox with the server attached

From the Swag Store repository root:

```bash
sbx run claude --name swag-dhi --static-mcp remotedhi .
```

The exact options can vary by Sandbox CLI release. If your installed CLI reports a different syntax, use its help output and record the version rather than silently substituting a different command.

## 3. Verify from the agent

Ask the agent:

```text
List the MCP servers and tools available in this session.
For the DHI server, identify which tools are read-only and summarize
what information each can return. Do not access or print credentials.
Do not change files, images, registries or remote resources.
```

Compare the agent's answer with the output of `sbx mcp inspect remotedhi`. Treat the agent's description as a claim until it matches the configured server and observed tool list.

## Evidence

Capture the Sandbox CLI version, server inspection output, agent-visible tool list and any authorization state. Redact tokens and credentials.

## Debrief

- Was the server registered and attached?
- Which tools were actually visible in the session?
- Did the agent's tool inventory match the CLI configuration?
- What would happen if an unnecessary write-capable tool were exposed?

## References

- [Docker DHI MCP documentation](https://docs.docker.com/dhi/tools/mcp/)
- [Simspace: Attach and authorize](https://github.com/ajeetraina/simspace-container-days/blob/main/labs/securing-the-agentic-stack/02-attach-and-authorize.md)
