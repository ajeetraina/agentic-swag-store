# Lab 4: Capacity

**Question:** Does every teammate get the same sandbox?

**Answer:** Yes, if you write it down in `.sbxenv.yaml` and commit it.

## The problem

Labs 1 to 3 built a good sandbox with a long list of commands. A teammate who types `sbx run claude .` gets none of it.

## 1. Write the file

Create `sbxenv.yaml` in the repo root:

```yaml
schemaVersion: "1"
agent: claude

kits:
  # DHI MCP + steering + 3rd-party registry deny, from Lab 3
  - git+https://github.com/ajeetraina/docker-cloud-sandboxes-demo.git#dir=agent-cli/codex-dhi/dhi-mixin

ports:
  - sandbox: 5173   # storefront
    host: 5173
  - sandbox: 3000   # API
    host: 3000
```

> [!NOTE]
> Your `sbx policy` rules from Lab 2 live on your machine only. To share network rules, put them in a kit and list it under `kits:`. The `dhi-mixin` kit is an example: it carries its own allow and deny rules.

## 2. Preview it

```bash
sbx rm swag
sbx env plan
```

The plan shows the agent, kit, and ports it will set up. Nothing changes until you approve.

## 3. Run it

```bash
sbx env run
```

## 4. Share it

```bash
git add .sbxenv.yaml
git commit -m "Add shared Swag Store sandbox"
git push
```

A teammate now runs `git pull` and `sbx env run`, and gets the same sandbox.

## What you learned

| Before | After |
|---|---|
| A list of flags in your shell history | One file in the repo |
| Each laptop is different | Every laptop gets the same sandbox |
| Changes are silent | Changes go through pull request review |

---

| Previous | Next |
| :-- | --: |
| [← Lab 3: Choice](03-choice.md) | [Lab 5: Coordinate →](05-coordinate.md) |
