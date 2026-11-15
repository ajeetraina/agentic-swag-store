# 4Cs Lab 2: Capabilities — What can the Swag Store agent access?

**Question: What can the agent actually reach, read, modify, or administer?**

[← Context](4CS_CONTEXT.md) · [4Cs lab index](FOUR_CS_GUIDED_LAB.md) · [Next: Consequences →](4CS_CONSEQUENCES.md)

## Goal

Build an evidence-based **Swag Store access matrix** before changing any policies. A coding agent asked to explain the storefront should not automatically have permission to administer PostgreSQL, inspect secrets, modify inventory, or contact unrelated internet destinations.

> Safety: Run only against the disposable Swag Store sandbox. Never test personal directories, real credentials, production systems, or real exfiltration endpoints. A policy decision is not proof of an actual connection; a failed connection is not necessarily a policy denial.

## 1. Decide what this task requires

For the read-only architecture task in Lab 1, use this starting hypothesis; **verify**, do not assume, the current access:

| Swag Store resource | Needed for architecture mapping? | Risk if over-permitted |
| --- | --- | --- |
| Storefront, API source, `compose.yaml` | Read only | Unwanted code changes |
| Synthetic product API (`localhost:3000/api/products`) | Read only | Out-of-scope API calls |
| PostgreSQL / pgAdmin | Direct admin access not required | Catalog deletion or database modification |
| Kafka / Kafka UI | Read configuration, not administer topics | Event modification |
| LocalStack S3 | Read configuration, not administer buckets | Object deletion or modification |
| Mock inventory / WireMock | Read configuration; test endpoint only if required | Inventory manipulation |
| `.env`, `.workshop-secrets` | Secret values not required | Credential disclosure |
| Host home, SSH, cloud credentials, host Docker socket | Never | Host compromise |
| Unrelated outbound destinations | Not required | Unapproved data transfer |

This is a **task-specific least-privilege target**, not a claim that these restrictions already exist.

## 2. Verify the effective sandbox network policy

Run the following in the terminal where `sbx` manages the workshop sandbox (normally the host), not in an application container:

~~~bash
sbx policy ls
sbx policy ls --wide
sbx policy check network collector.swag-store.example
~~~

`collector.swag-store.example` is a **documentation-only, non-operational example destination** representing an unrelated external collector. Do not send secrets or make an actual request to it. Record the reported policy decision; do not pre-label it denied. A default or broad allow rule may permit it.

Check an external destination that may be needed later in the optional DHI finale:

~~~bash
sbx policy check network dhi.io
~~~

The Swag Store's internal Compose names (`postgres`, `mock-inventory`, `kafka`, `aws`) are **not** interchangeable with external sandbox egress destinations. Do not claim `sbx policy deny network postgres` protects the Compose database. Application-service access requires separate Compose network, credential, role, or service controls.

## 3. Inspect the Swag Store's application-level capabilities

From the sandbox's repository clone:

~~~bash
id
pwd
docker compose config --services
docker compose ps
curl -fsS http://localhost:3000/api/products
git status --short
~~~

The product API call is read-only. Inspect the Compose file to see which services expose ports and what credentials or privileges the agent's own environment might have. **Do not run database administration or destructive commands.**

To demonstrate a harmless workspace write, use only the dedicated fixture:

~~~bash
mkdir -p workshop-fixtures
printf 'write test\n' > workshop-fixtures/agent-write-test.txt
cat workshop-fixtures/agent-write-test.txt
rm workshop-fixtures/agent-write-test.txt
~~~

This shows **repository write permission**, not permission to read host files or alter the database.

## 4. Understand the filesystem boundary

With `sbx run --clone claude .`, the agent works on a private sandbox clone; the host repository is not the same as a broadly writable host-home mount. Check the actual sandbox mode and mounts for your version. Never mount host `~/.ssh`, cloud credential folders, browser profiles, real `.env` files, or `/var/run/docker.sock`.

Filesystem mount governance is **separate** from `sbx policy allow/deny network`. Organization filesystem policy can restrict which host paths may be mounted and with what mount permissions; it does not grant or deny individual reads within an already mounted directory. If an organization-managed filesystem policy is unavailable, explain the boundary using clone mode and configuration evidence. **Do not claim an unconfigured filesystem deny was enforced.**

## Prompt to paste into the agent

~~~text
You are auditing effective permissions for the disposable Swag Store.
The task is read-only architecture mapping, not database administration.
Identify which project files, Compose services, terminal tools, and
external network destinations are relevant to that task.
Use only the synthetic product API and the workshop-fixtures write test.
Do not inspect credential values, host directories, or files outside
this repository. Do not alter products, inventory, database rows, Kafka
topics, or S3 objects. Do not contact external collectors.
For each resource, label access VERIFIED, DENIED BY POLICY, or NOT TESTED.
Cite the actual command output or configuration evidence, and distinguish
sandbox egress policy from Compose-internal service authorization.
~~~

## Evidence and debrief

Save `sbx policy ls`, `sbx policy check`, service inventory, and fixture results in `workshop-evidence/capabilities.md`.

Ask:
- Why can a source-code agent potentially reach a database administration service?
- Does an allowed network destination mean the application accepts a request?
- What is the difference between a private sandbox clone and a host filesystem mount?
- Which **unnecessary** capabilities should we remove in Lab 4?

**Next:** [Consequences: What could go wrong?](4CS_CONSEQUENCES.md)
