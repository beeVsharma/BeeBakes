# Graph Report - vertikaa  (2026-07-08)

## Corpus Check
- 40 files · ~698,514 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 196 nodes · 158 edges · 44 communities (24 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9ddfc27e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Main issues and solutions` - 11 edges
3. `Graphify Guide — Setup `graphify` in Any New Project Folder` - 9 edges
4. `Vertika / Bee Bakes audit` - 6 edges
5. `scripts` - 5 edges
6. `BeeBakes Bakery Landing Page UI` - 5 edges
7. `Prioritized fix plan` - 4 edges
8. `Vertikaa` - 3 edges
9. `Quick Setup (One-Time per Project)` - 3 edges
10. `Product` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Project README` --conceptually_related_to--> `Next.js Agent Rules`  [INFERRED]
  README.md → AGENTS.md
- `Claude Configuration` --references--> `Next.js Agent Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `Current Session Log` --conceptually_related_to--> `Daily Log 2026-06-12`  [INFERRED]
  .remember/now.md → .remember/today-2026-06-12.md
- `BeeBakes Bakery Landing Page UI` --references--> `Berry Symphony Cake`  [EXTRACTED]
  public/images/media__1781078324687.png → public/images/cake_berry_1781078487770.png
- `BeeBakes Bakery Landing Page UI` --references--> `Caramel Crunch Cake`  [EXTRACTED]
  public/images/media__1781078324687.png → public/images/cake_caramel_1781078507737.png

## Import Cycles
- None detected.

## Communities (44 total, 20 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (10): products, Props, features, images, NavLink, navLinks, Props, Product (+2 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (14): dependencies, framer-motion, lucide-react, next, react, react-dom, name, private (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (12): Available MCP Tools (behind the scenes), Folder & File Map (Auto-Generated), Graphify Guide — Setup `graphify` in Any New Project Folder, How To Use It in Claude Code, Option A — Let Claude Code Do It (Recommended), Option B — Run Commands Manually, Prerequisites, Quick Reference (Copy-Paste) (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, @playwright/test, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (6): Berry Symphony Cake, Caramel Crunch Cake, Belgian Chocolate Bliss Cake, Four-tier Wedding Cake, Red Velvet Dream Cake, BeeBakes Bakery Landing Page UI

### Community 6 - "Community 6"
Cohesion: 0.40
Nodes (3): fraunces, metadata, outfit

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (4): 06:29 | master Discussed Graphify already-installed status; added local-scope MCP via `claude config mcp add graphify --scope local` isolating per-project from other apps (OpenClaude, Hermes)., 07:46 | master Fixed Graphify MCP cmd to `graphify.serve` (was `mcp_server`); built `graph.json` (starter-template); created `GRAPHIFY_GUIDE.md` (per-project usage workflow)., 08:06 | master Reviewed Bee Bakes bakery LP (starter-template); found Hero3D.tsx dead code; created GRAPHIFY_GUIDE.md; delivered 15-priority design improvements list; user asked start critical fixes order; initiated task list, 09:36 | master Implemented critical/high fixes Bee Bakes bakery LP (starter-template); installed lucide-react; activated Hero3D dynamic import Hero.tsx; swapped Navbar mobile icons lucide Menu/X; fixed dead #aboutâ†’#custom-cakes links Navbar+Footer; replaced footer social text SVG icons; added ProductCard loading shimmer+error fallback; built+wired StickyMobileCTA; created ProductModal; Next.js build passes; NIM 429 rate-limit interrupts

### Community 8 - "Community 8"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (3): Next.js Agent Rules, Claude Configuration, Project README

### Community 10 - "Community 10"
Cohesion: 0.18
Nodes (11): 10) Metadata and code hygiene can be stronger, 1) Typography still feels template-like, 2) The layout is too symmetrical, 3) Surface styling is clean but still generic, 4) Product browsing is not fully honest yet, 5) Navigation and footer have dead ends, 6) Accessibility is partially there, but not finished, 7) Form behavior needs real validation and cleaner copy (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (8): Phase 1: Highest impact, lowest risk, Phase 2: Visual polish, Phase 3: Product quality, Prioritized fix plan, Recommended direction, Summary, Vertika / Bee Bakes audit, What is working

### Community 38 - "Community 38"
Cohesion: 0.33
Nodes (4): CustomOrderModalProps, FormData, FormErrors, initialFormData

### Community 39 - "Community 39"
Cohesion: 0.33
Nodes (4): Category, products, RangeItem, tabs

### Community 40 - "Community 40"
Cohesion: 0.50
Nodes (3): Rules, Stack, Vertikaa

## Knowledge Gaps
- **119 isolated node(s):** `session`, `line`, `Props`, `CustomOrderModalProps`, `FormData` (+114 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 4` to `Community 2`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `Main issues and solutions` connect `Community 10` to `Community 11`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `session`, `line`, `Props` to the rest of the system?**
  _121 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._