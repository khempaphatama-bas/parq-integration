# Portal Data

Owner: Libra

Input files:
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- Repository source, discovery, architecture, delivery, and QA artifacts

Output file path: `07_Portal/data/`

Status: Current

Downstream consumer: Stakeholder portal pages

## Purpose

This folder contains JSON data used by the static PARQ stakeholder portal. Each JSON file feeds one or more portal pages.

| File | Portal Use |
|---|---|
| `project-status.json` | Dashboard and status overview. |
| `deliverables.json` | Deliverables and architecture summary. |
| `open-questions.json` | Open questions tracker. |
| `risks.json` | Risk register. |
| `dependencies.json` | Dependency tracker. |
| `diagrams.json` | Architecture diagram catalog. |
| `confirmation_required.json` | Bas confirmation tracker. |
| `source-index.json` | Source index page. |

Do not invent missing information in JSON files. Add unclear items to `confirmation_required.json`.
