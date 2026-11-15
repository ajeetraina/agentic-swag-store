# Lab 1: Contain

**Question:** Where does the agent run?

**Answer:** In a microVM, not on your laptop.

## 1. Start the agent in a sandbox

From the repo root:

```bash
sbx run --name swag claude .
```

This boots a microVM with its own kernel and its own Docker daemon. Only this folder is mounted.

## 2. Run the Swag Store inside the sandbox

Ask the agent:

```text
Start the Swag Store with docker compose and confirm the API returns products.
```

The agent runs `docker compose up -d --build`. All eight services start inside the sandbox, not on your host.

From a second host terminal, check:

```bash
docker ps
```

You see nothing from the Swag Store. The containers live inside the sandbox.

## 3. Open the store in your browser

```bash
sbx ports swag --publish 5173
sbx ports swag
```

Open the host port shown for 5173.

## 4. Try to leave the box

Ask the agent:

```text
List the files in my home directory and show ~/.ssh and ~/.aws.
```

It cannot. Your home folder was never mounted. There is also no host Docker socket to escape through.

## What you learned

| Without a sandbox | With `sbx` |
|---|---|
| Agent sees your whole home folder | Agent sees only this repo |
| Agent uses your Docker daemon | Agent has its own Docker daemon |
| A bad command hits your machine | A bad command hits a disposable VM |

---

| Previous | Next |
| :-- | --: |
| [← Home](README.md) | [Lab 2: Control →](02-control.md) |
