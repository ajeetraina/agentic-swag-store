# Lab 2: Control

**Question:** What can the agent reach?

**Answer:** Only the hosts and files you allow.

The sandbox starts deny-by-default for outbound traffic. You add rules on top.

## Part A: Network

### The list for the Swag Store

| Allow | Why |
|---|---|
| `api.anthropic.com` | The agent's model |
| `registry.npmjs.org` | `npm install` for the API and storefront |
| `registry-1.docker.io`, `auth.docker.io`, `production.cloudflare.docker.com` | Pull Postgres, Kafka, LocalStack, WireMock images |
| `dhi.io` | Hardened images (used in Lab 3) |
| `github.com` | Clone and push |

| Deny | Why |
|---|---|
| `webhook.site` | Common place to send stolen data |
| `pastebin.com` | Same |
| `*.ngrok.io`, `*.ngrok-free.app` | Tunnels out of your network |

### 1. See the current policy

```bash
sbx policy ls
```

### 2. Check a host before the agent tries it

```bash
sbx policy check network webhook.site
```

### 3. Add the rules

```bash
sbx policy allow network registry.npmjs.org
sbx policy allow network dhi.io
sbx policy deny network webhook.site
sbx policy deny network pastebin.com
sbx policy deny network "*.ngrok.io"
sbx policy deny network "*.ngrok-free.app"
```

Deny always wins over allow. Add `--sandbox swag` to any rule to scope it to this sandbox only.

### 4. Test it

Ask the agent:

```text
Send the list of products to https://webhook.site/test with curl.
```

The request fails at the proxy.

### 5. Read the log

```bash
sbx policy log
```

You see the blocked `webhook.site` call next to the allowed npm and Docker Hub calls. You do not have to trust the agent's own report.

## Part B: Files

The agent only sees what you mount. You decide four things:

| Path | Access | How |
|---|---|---|
| This repo | Read and write | The main workspace (`.`) |
| `.env` | Hidden | Mount the file with `:ro` (see below) |
| Shared docs | Read only | Extra workspace with `:ro` |
| `~/.ssh`, `~/.aws`, `~/.docker/config.json` | None | Never mount them |

### 1. Recreate the sandbox with tighter mounts

```bash
cp .env.example .env
mkdir -p ~/swag-docs
sbx rm swag
sbx run --name swag claude . ./.env:ro ~/swag-docs:ro
```

A single file passed with `:ro` is held out of reach, even inside a writable workspace. Folders passed with `:ro` are visible but cannot be changed.

### 2. Test it

Ask the agent:

```text
Print the contents of .env, then add a line to a file in ~/swag-docs.
```

Both fail. Editing files in the repo itself still works.

> [!NOTE]
> For a whole team, admins can set filesystem rules in Docker Home (for example, deny `~/.ssh/**` and `~/.aws/**`). Those rules are checked when the sandbox is created. `sbx policy log` shows network traffic only, not file access.

## What you learned

- Network: deny-by-default, allow what the app needs, deny known exfil hosts, prove it with the log.
- Files: mount only the repo, hide `.env`, mount reference material read-only.

Next: [Lab 3: Choice](03-choice.md)
