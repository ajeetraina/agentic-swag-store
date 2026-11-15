# DHI hardening lab 4: Pin policy with a Sandbox kit

## Objective

Move from agent guidance to an enforceable boundary. The DHI MCP server helps the agent discover and evaluate hardened images. A separately configured Sandbox kit can steer the agent toward DHI and apply network policy that constrains registry access.

**Important distinction:** DHI MCP alone does not force the agent to use DHI. A prompt or steering file is guidance, not enforcement. Verify the kit's actual policy and test network behavior.

## 1. Inspect the DHI mixin kit

The Simspace lab references this kit source:

```bash
sbx kit inspect "git+https://github.com/ajeetraina/docker-cloud-sandboxes-demo.git#dir=agent-cli/codex-dhi/dhi-mixin"
```

Review the kit contents before adding it. Confirm its source, steering instructions, allowed network destinations and denied destinations. Do not install a kit you have not inspected.

## 2. Add the kit to the sandbox

Use the sandbox name created in Lab 2:

```bash
sbx kit add swag-dhi "git+https://github.com/ajeetraina/docker-cloud-sandboxes-demo.git#dir=agent-cli/codex-dhi/dhi-mixin"
```

If the kit source or CLI syntax has changed, stop and inspect the current source and CLI help. Do not treat an old simulator transcript as proof that the current kit enforces the same policy.

## 3. Verify the policy

Inspect the effective sandbox policy and test a registry destination that the kit is intended to deny:

```bash
sbx policy check network cgr.dev
```

Use the kit's documented allow/deny list as the source of expected results. The command's actual output is the evidence. Also test an approved DHI destination using the corresponding supported policy-check syntax for your installed CLI.

Do not claim a destination is blocked unless the policy check or an actual connection test confirms it. Record any direct network path that could bypass the intended policy.

## 4. Repeat the containerization task

With both DHI MCP and the kit enabled, ask:

```text
Containerize the Swag Store Node.js API.
Use DHI MCP to research a suitable version-pinned DHI base image.
Follow the sandbox's configured image-source policy.
Explain the repository, tag, package, CVE and attestation evidence
behind your choice. Do not publish or deploy the image.
```

Compare this result with Lab 3. Verify the Dockerfile and built image independently.

## 5. Retest matrix

| Test | Without kit | With kit | Evidence |
| --- | --- | --- | --- |
| DHI catalog query | Record | Record | MCP tool result |
| Agent proposes DHI image | Record | Record | Dockerfile/proposal |
| Agent proposes alternate registry | Record | Record | Transcript |
| Network policy for denied registry | Record | Record | Policy check / connection result |
| Network policy for DHI registry | Record | Record | Policy check / connection result |
| Built image scan | Record | Record | Docker Scout report |

## Cleanup

Remove the kit or sandbox using the supported commands for your installed CLI. Preserve only redacted workshop evidence. Do not remove shared kits or alter organization-wide policy.

## Debrief

- Which behavior came from DHI MCP information?
- Which behavior came from the kit's steering instructions?
- Which restriction was actually enforced by network policy?
- Could the agent bypass the intended route?
- What did the image scan verify independently?

## References

- [Docker DHI MCP documentation](https://docs.docker.com/dhi/tools/mcp/)
- [Simspace: Pin it with a kit](https://github.com/ajeetraina/simspace-container-days/blob/main/labs/securing-the-agentic-stack/04-pin-with-kit.md)
- [DHI mixin kit source](https://github.com/ajeetraina/docker-cloud-sandboxes-demo/tree/main/agent-cli/codex-dhi/dhi-mixin)
