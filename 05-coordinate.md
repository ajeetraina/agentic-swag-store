# Lab 5: Coordinate

**Question:** How do several agents work together?

**Answer:** One sandbox per role, on the same repo. You stay the coordinator.

`sbx` runs one agent per sandbox. Sandboxes cannot talk to each other directly. They share work through the repo.

## 1. Write the task

Create `backlog/SWAG-7-low-stock-badge.md`:

```markdown
# SWAG-7: Low stock badge

Show a "Low stock" badge on a product row when stock is below 10.
- Change only dev/webapp/src/ProductRow.jsx
- Existing tests must still pass
```

## 2. Create one sandbox per role

```bash
sbx create --name developer claude .
sbx create --name reviewer claude .
sbx ls
```

Two microVMs, one workspace. Both get the same network policy from Lab 2.

## 3. Give the developer the task

```bash
sbx exec developer claude -p "Implement backlog/SWAG-7-low-stock-badge.md and commit it."
```

## 4. Let the reviewer check it

```bash
sbx exec reviewer git log --oneline -2
sbx exec reviewer claude -p "Review the latest commit against SWAG-7. Do not edit files. List anything the task did not decide."
```

The reviewer sees the commit because the workspace is shared. A likely open question: what should happen when stock is 0? That is a product call.

## 5. You decide

```bash
sbx exec developer claude -p "Decision: stock 0 shows 'Sold out' instead of 'Low stock'. Apply it and commit."
```

## 6. Clean up

```bash
sbx rm developer reviewer
git log --oneline -3
```

The sandboxes are gone. The commits stay in your repo.

## What you learned

| `sbx` gives you | You still own |
|---|---|
| One isolated box per agent | Who does what |
| A shared workspace | Product decisions |
| One policy for every box | Merging the work |

## The 5 Cs together

| C | What it adds |
|---|---|
| Contain | The agent runs in a microVM |
| Control | It reaches only what you allow |
| Choice | It uses the tools you give it |
| Capacity | Everyone gets the same sandbox |
| Coordinate | Several boxed agents, one repo, you decide |

Back to the [index](README.md)
