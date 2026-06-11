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

Status: Current / Updated with confirmation items

Downstream consumer: Product Team, Business Team, Vendor Team, Management, PARQ Orchestrator, Bas for confirmation items

## Purpose

This folder contains a static stakeholder-friendly portal for PARQ Integration. It summarizes existing repository artifacts and links back to source markdown or source files. It does not create new requirements, architecture decisions, user stories, or QA scenarios.

## Pages

| Page | Purpose | Data Source |
|---|---|---|
| `index.html` | Portal entry and status overview | `data/project-status.json` |
| `dashboard.html` | KPI cards, highlights, and area status | `data/project-status.json` |
| `deliverables.html` | Deliverables tracker | `data/deliverables.json` |
| `architecture.html` | Architecture artifact summary with user-flow links | `data/deliverables.json` |
| `architecture-diagrams.html` | Detected Mermaid diagrams grouped by diagram type | `data/diagrams.json` |
| `open-questions.html` | Open questions tracker | `data/open-questions.json` |
| `risks.html` | Risk register | `data/risks.json` |
| `dependencies.html` | Dependency tracker | `data/dependencies.json` |
| `confirmation-required.html` | Items requiring Bas confirmation | `data/confirmation_required.json` |
| `source-index.html` | Source index by area and artifact | `data/source-index.json` |

## Shared Assets

| File | Purpose |
|---|---|
| `assets/style.css` | Shared styling for cards, tables, badges, navigation, and diagram blocks. |
| `assets/app.js` | Shared navigation, source-link, badge, JSON-loading, and related-link helpers. |

## Diagram Handling

Mermaid diagram blocks detected in repository markdown are listed in `data/diagrams.json` and displayed on `architecture-diagrams.html`.

If a diagram-like section is described in text but has no Mermaid code, it is not converted into a diagram. It is recorded in `data/confirmation_required.json` for Bas confirmation.

Mermaid rendering currently references Mermaid.js from a CDN. Because no local Mermaid runtime was found in the repository, `CONF-007` asks Bas to confirm whether CDN usage is acceptable or whether a local approved Mermaid asset should be supplied.

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
