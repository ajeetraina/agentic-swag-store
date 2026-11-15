# DHI hardening lab 3: Let the agent use DHI

## Objective

Compare a baseline containerization task with a DHI-informed task. The agent should use the DHI MCP catalog to research candidates, then explain its selection with evidence.

## Safety and scope

- Work on a disposable branch or sandbox clone.
- Do not build, push or deploy to production.
- Do not provide registry credentials.
- Do not claim a tag is vulnerability-free without checking current scan results.
- Keep the DHI MCP integration read-only.

## 1. Establish a baseline

In a sandbox without the DHI MCP server attached, ask the agent:

```text
Review the Swag Store Node.js API and propose a production Dockerfile.
Explain your base-image choice, version pinning, multi-stage build
strategy and the security tradeoffs. Do not modify files yet.
```

Save the proposed Dockerfile and rationale as the baseline. Record the image name and tag the agent selected.

## 2. Repeat with DHI MCP available

Start the sandbox using the previous lab and ask:

```text
Review the Swag Store Node.js API and propose a production Dockerfile.
Before selecting a base image, use the DHI MCP server to:
1. Find suitable Docker Hardened Images for this Node.js workload.
2. Inspect candidate tag definitions and image details.
3. Review package metadata, current CVEs and available attestations.
4. Select a supported, version-pinned DHI image and explain why it fits.
5. Propose a multi-stage build where appropriate.

Do not modify files yet. Cite the exact repository and tag you inspected.
Do not claim zero CVEs unless the current tool results support that claim.
Do not use mirror-management tools or publish an image.
```

## 3. Compare the two proposals

Record:

| Dimension | Baseline | DHI-assisted |
| --- | --- | --- |
| Base image and tag | Record | Record |
| Version pinning | Record | Record |
| Package metadata reviewed | Record | Record |
| CVEs reviewed | Record | Record |
| Attestations reviewed | Record | Record |
| Multi-stage build rationale | Record | Record |
| Evidence used for selection | Record | Record |

Do not assume the DHI-assisted proposal is automatically correct. Verify that the selected image and tag exist and are appropriate for the application.

## 4. Build and verify

Only after reviewing the proposed Dockerfile, apply it on a disposable branch. Build the image locally. Then use Docker Scout or the scanning workflow available in your environment to inspect the built image. Compare the scan with the agent's MCP findings.

The MCP server supplies catalog metadata to inform a decision. A scan of the actual built image is a separate verification step. Results change over time, so record the scan date, image digest and tool output rather than hardcoding a CVE count.

## Evidence

Keep both Dockerfile proposals, the DHI repository/tag references, relevant MCP results, build output and actual image scan report. Redact any credentials.

## Debrief

- Did DHI MCP improve the agent's evidence and base-image selection?
- Did it change the Dockerfile or only the explanation?
- Did the built image match the researched tag?
- Did the actual scan agree with the agent's claims?

## References

- [Docker DHI MCP documentation](https://docs.docker.com/dhi/tools/mcp/)
- [Simspace: Agent uses DHI](https://github.com/ajeetraina/simspace-container-days/blob/main/labs/securing-the-agentic-stack/03-agent-uses-dhi.md)
