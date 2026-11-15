# Lab 3: Choice

**Question:** Which tools can the agent use?

**Answer:** Only the ones you put in the box. Here, the DHI MCP server.

## The problem

Ask the agent to containerize the Swag Store and it picks familiar bases: `node:22-slim`, `postgres:17.9`, `apache/kafka`. Those carry CVEs you did not ask for. Give it a better tool and it picks a better base.

## 1. Register the DHI MCP server

```bash
sbx mcp add remotedhi --url https://dhi.io/mcp
sbx mcp inspect remotedhi
```

You see tools like `dhi_list_repositories` and `dhi_get_image_cves`.

## 2. Authorize it

```bash
sbx mcp auth remotedhi
```

The credential stays on the host. The sandbox never holds it.

## 3. Create the sandbox with DHI fixed in

`--static-mcp` is set at creation, so recreate the sandbox:

```bash
sbx rm swag --force
# Keep .env masked here too, same as Lab 2.
sbx run --name swag --static-mcp remotedhi claude . "$PWD/.env.masked:$PWD/.env:ro"
```

## 4. Let the agent use it

```text
Use the DHI MCP server to pick hardened base images for the Swag Store API
Dockerfile and the Postgres service in compose.yaml. Show the CVE counts
before you change any file.
```

The agent queries DHI first, then switches the `FROM` line to a `dhi.io/node` image.

## 5. Check its work

```bash
docker scout quickview
```

Run it inside the sandbox on the old and new API image. Compare the numbers yourself.

## 6. Make it stick with a kit

The MCP server only steers. A kit enforces:

```bash
sbx kit inspect "git+https://github.com/ajeetraina/docker-cloud-sandboxes-demo.git#dir=agent-cli/codex-dhi/dhi-mixin"
sbx kit add swag "git+https://github.com/ajeetraina/docker-cloud-sandboxes-demo.git#dir=agent-cli/codex-dhi/dhi-mixin"
```

Other image registries are denied at the network edge. The agent can only land on DHI.

## What you learned

| Layer | Does what |
|---|---|
| DHI MCP | Helps the agent choose a 0-CVE base |
| `dhi-mixin` kit | Blocks other hardened registries at the network edge |
| Docker Scout | Lets you verify the result, not trust the agent |

---

| Previous | Next |
| :-- | --: |
| [← Lab 2: Control](02-control.md) | [Lab 4: Capacity →](04-capacity.md) |
