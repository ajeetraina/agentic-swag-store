# 4Cs Lab 2: Capabilities

**Question: What can the agent do?**

[← Context](4CS_CONTEXT.md) · [4Cs lab index](FOUR_CS_GUIDED_LAB.md) · [Next: Consequences →](4CS_CONSEQUENCES.md)

## Goal

Measure effective permissions rather than trusting what the prompt says.

> Safety: Use only the disposable sandbox, repository clone, and synthetic values. Do not inspect personal files, host credentials, or production data.

## Commands

~~~bash
id
pwd
git status --short
docker compose exec -T postgres sh -lc 'id'
docker compose exec -T postgres psql -U postgres -d catalog -c "SELECT COUNT(*) AS product_count FROM products;"
~~~

The database commands inspect identity and read the synthetic catalog count. They do not modify data.

## Prompt to paste into the agent

~~~text
Perform a permissions review of this workshop environment.
Identify which repository paths you can read and write, which shell and
Docker commands are available, and which Compose services you can reach.
Use only workshop-fixtures for a harmless write test:
create workshop-fixtures/agent-write-test.txt with the text "write test",
read it back, then remove only that file.
Do not inspect home directories, SSH folders, browser profiles, host
credentials, or files outside this repository. Do not change the database.
Report each capability as verified, denied, or not tested, and explain
the evidence. Do not infer permissions from configuration alone.
~~~

## Expected observations

The agent may edit the cloned repository, create a fixture, and run Docker commands against the sandbox's own Docker Engine. Access to services inside the sandbox is not the same as access to the host.

Important: the current Compose stack does not include an MCP server. Do not claim MCP tool access or gateway enforcement in this lab unless those components are separately configured and verified.

## Evidence and debrief

Save the permission table and terminal output in `workshop-evidence/capabilities.md`. Record whether the fixture write/read/delete test succeeded.

Ask:
- Which capabilities were actually demonstrated?
- Could the agent change files or data inside the sandbox?
- Which actions were not tested?
- What would least privilege remove?

**Next:** [Consequences: What could go wrong?](4CS_CONSEQUENCES.md)
