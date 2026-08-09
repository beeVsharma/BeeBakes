# Graphify Guide — Setup `graphify` in Any New Project Folder

> This guide shows how to connect **Graphify** (knowledge graph for code) to Claude Code on a **per-project** basis, so anyone can open this folder and use the graph automatically.

---

## What is Graphify?

Graphify is a Python CLI tool + **MCP server** that:

1. **Scans your project** (all code files, docs, and assets).
2. **Builds a knowledge graph** (`graph.json`) with nodes (files, functions, classes) and edges (imports, calls, relationships).
3. **Provides semantic search** — allowing Claude Code to answer natural-language questions about your project structure.

Read more: [github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)

---

## Prerequisites

- **Python 3.10+** installed.
- **Graphify** installed (`pip install graphify`).
- **Claude Code CLI** installed.
- This project folder opened in Claude Code.

---

## Quick Setup (One-Time per Project)

You can run everything below via Claude Code **agents**, or directly in the terminal.

### Option A — Let Claude Code Do It (Recommended)

Ask your Claude Code agent (e.g. a **planner** agent):

> "Set up graphify for this project folder so the graph is available for queries."

The agent will run the exact steps under **Option B** for you.

### Option B — Run Commands Manually

**Step 1 — Add the Graphify MCP server (local scope)**

Inside your terminal (project root), run:

```bash
claude mcp add graphify -- "python" "-m" "graphify.serve"
```

> **What this does:** Registers Graphify as an MCP server for _this_ project only. It will **not** affect other projects.

**Step 2 — Build the knowledge graph**

```bash
graphify extract .
```

> **What this does:** Scans all source files and generates `graphify-out/graph.json` and `graph.html`.

**Step 3 — Verify**

Look for `graphify-out/` folder. If it has `graph.json`, you are ready.

---

## How To Use It in Claude Code

Once set up, ask Claude things like:

| Your Question (English or Hindi)                                 | What You Get                                     |
| ---------------------------------------------------------------- | ------------------------------------------------ |
| "How is this project structured?"                                | High-level architecture, file tree, entry points |
| "Navbar component kya kya import karta hai?"                     | Exact imports and dependencies of Navbar         |
| "Find all React hooks in this project."                          | Nodes tagged as hooks with file locations        |
| "What calls the `Hero` component?"                               | Call-chain / parent edges pointing to Hero       |
| "Show me the shortest path between `page.tsx` and `CustomCakes`" | Dependency chain linking those files             |
| "Quick graph summary"                                            | Nodes count, edges count, file types breakdown   |

### Available MCP Tools (behind the scenes)

When you ask, Claude Code calls these **Graphify MCP tools** automatically:

| Tool               | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `query_graph`      | Search the graph by node type, label, or edge          |
| `shortest_path`    | Find shortest dependency path between two nodes        |
| `get_neighborhood` | See what surrounds a file (imports, callers, children) |
| `search_nodes`     | Semantic text search across all nodes                  |
| `get_code`         | Retrieve the code snippet for a specific node          |

---

## Folder & File Map (Auto-Generated)

After running `graphify extract .`, the following files are created:

```
project-root/
├── graphify-out/
│   ├── graph.json      ← Knowledge graph data (nodes + edges)
│   ├── graph.html      ← Visual interactive preview (open in browser)
│   ├── GRAPH_REPORT.md ← Markdown report of the graph
│   └── manifest.json   ← File-to-hash mapping for incremental builds
```

---

## Who Set This Up?

This project (`C:\Users\PREET\Desktop\starter-template`) was already set up with Graphify on **2026-06-12**. If someone clones or copies this folder, they should run **Option B** above (or ask their Claude Code agent) to regenerate the graph.

---

## Troubleshooting

| Problem                       | Fix                                                            |
| ----------------------------- | -------------------------------------------------------------- |
| `graphify: command not found` | Run `pip install graphify` in your terminal                    |
| `'python' is not recognized`  | Ensure Python is in your system `PATH`                         |
| MCP fails to connect          | Restart Claude Code; verify `claude mcp list` shows `graphify` |
| Graph is outdated             | Run `graphify extract . --fresh` to rebuild                    |

---

## Quick Reference (Copy-Paste)

```bash
# 1. Install graphify (system-wide, once)
pip install graphify

# 2. Add MCP server to this project
claude mcp add graphify -- "python" "-m" "graphify.serve"

# 3. Build / rebuild the graph
graphify extract .
graphify extract . --fresh   # force rebuild from scratch

# 4. Check graph was built
ls graphify-out/
```

---

**End of guide — auto-generated for this project.**
