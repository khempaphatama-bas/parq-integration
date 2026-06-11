# PARQ Stakeholder Portal

Owner: Libra

Input files:
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `01_Source_of_Truth/`
- `02_Discovery/`
- `03_Architecture/`
- `04_Delivery/`
- `05_QA/`

Output file path: `07_Portal/`

Status: Current Working Baseline / Portal v2 implemented with confirmation items

Downstream consumer: Product Team, Business Team, Vendor Team, Management, PARQ Orchestrator, Bas for confirmation items

## Purpose

This folder contains the static Project Hub for PARQ Integration. It summarizes existing repository artifacts and links back to source markdown or source files. It does not create new requirements, architecture decisions, user stories, or QA scenarios.

The portal is the working layer. Repository files remain the storage layer and source of truth.

## Portal v2 Navigation

| Top Navigation | Purpose | Data Source |
|---|---|---|
| `index.html` | Home / Project Command Center | `data/project-hub.json`, `data/project-controls.json` |
| `project.html` | Project overview, timeline gate, source index, and controls entry | `data/project-hub.json`, `data/deliverables.json` |
| `discovery.html` | Discovery and design entry point | `data/deliverables.json`, `data/project-controls.json` |
| `architecture.html` | Architecture baseline and technical entry point | `data/deliverables.json` |
| `delivery.html` | Delivery readiness and next-owner handoff view | `data/project-hub.json`, `data/project-controls.json` |
| `qa.html` | QA inputs, SIT/UAT blockers, and readiness view | `data/deliverables.json`, `data/project-controls.json` |
| `work-by-role.html` | Filtered entry points for Designer, Developer, QA, and Product Team | `data/role-access.json` |

## Pages

| Page | Purpose | Data Source |
|---|---|---|
| `project-controls.html` | Unified Risk / Blocker / Dependency / Open Question / Confirmation Required view | `data/project-controls.json` |
| `architecture-diagrams.html` | Diagram context and Mermaid rendering grouped by diagram type | `data/diagrams.json` |
| `dashboard.html` | Preserved legacy dashboard view | `data/project-status.json` |
| `deliverables.html` | Preserved legacy deliverables tracker | `data/deliverables.json` |
| `open-questions.html` | Preserved legacy open-question tracker | `data/open-questions.json` |
| `risks.html` | Preserved legacy risk register | `data/risks.json` |
| `dependencies.html` | Preserved legacy dependency tracker | `data/dependencies.json` |
| `confirmation-required.html` | Preserved legacy confirmation tracker | `data/confirmation_required.json` |
| `source-index.html` | Preserved legacy source index | `data/source-index.json` |

## Shared Assets

| File | Purpose |
|---|---|
| `assets/style.css` | Shared styling for cards, tables, badges, navigation, and diagram blocks. |
| `assets/app.js` | Shared navigation, source-link, badge, JSON-loading, and related-link helpers. |

## Diagram Handling

Mermaid diagram blocks detected in repository markdown are listed in `data/diagrams.json` and displayed on `architecture-diagrams.html`.

If a diagram-like section is described in text but has no Mermaid code, it is not converted into a diagram. It is recorded in `data/confirmation_required.json` for Bas confirmation.

The Netlify deployment publishes `07_Portal/` only. Source artifact actions therefore resolve repository paths to GitHub `blob` or `tree` URLs at runtime.

Mermaid rendering currently references Mermaid.js from a CDN. Because no local Mermaid runtime was found in the repository, `CONF-007` asks Bas to confirm whether CDN usage is acceptable or whether a local approved Mermaid asset should be supplied.

If Mermaid rendering fails for a diagram, the diagram card keeps all metadata visible, marks the runtime diagram status as `Needs Confirmation`, and opens the source Mermaid fallback.

## Local Viewing

Open the portal through the existing local static server:

```text
http://localhost:8765/07_Portal/index.html
```

If the server is not running, start any static file server from the repository root and open the same path.

## Update Workflow

1. Update the relevant JSON file under `07_Portal/data/`.
2. Keep source links pointed at repository artifacts.
3. Do not hardcode large tables into HTML pages when the data can live in JSON.
4. Add unclear or unconfirmed items to `data/confirmation_required.json` instead of guessing.
5. Update `MASTER_INDEX.md`, `TASK_BOARD.md`, and `HANDOFF_LOG.md` when portal scope, ownership, status, or handoff changes.
