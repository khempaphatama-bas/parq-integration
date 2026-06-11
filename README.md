# PARQ Integration Repository

This repository is organized by Libra, Project Librarian for PARQ Integration.

Use `MASTER_INDEX.md` as the primary navigation and source-of-truth tracker.

GitHub repository:
https://github.com/khempaphatama-bas/parq-integration

Root control files:
- `AGENTS.md` - librarian role and boundaries.
- `MASTER_INDEX.md` - document register, ownership, dependencies, and missing artifacts.
- `TASK_BOARD.md` - librarian task tracking.
- `HANDOFF_LOG.md` - handoff and ownership log.

## Repository Map

| Path | Purpose |
|---|---|
| `01_Source_of_Truth/` | Approved source inputs, domain references, system references, and clarification logs. |
| `02_Discovery/` | Discovery reviews, stakeholder flow packs, and gap-analysis references. |
| `03_Architecture/` | Architecture, dependency, boundary, data, API, vendor, and visual flow artifacts. |
| `04_Delivery/` | Delivery artifacts and accepted delivery references. |
| `05_QA/` | QA setup, readiness, validation, and test-support artifacts. |
| `06_Project_Management/` | Scope packs, manuals, training, and project-management references. |
| `07_Portal/` | Static stakeholder portal generated from repository artifacts. |
| `outputs/` | Generated stakeholder outputs that remain traceable to repository source files. |

## Stakeholder Portal

Open the static portal through a local static server:

```text
http://localhost:8765/07_Portal/index.html
```

The portal is a derived view. Repository markdown and source files remain the source of truth.

## Team Start Points

| Need | Start Here |
|---|---|
| Find an artifact or owner | `MASTER_INDEX.md` |
| Understand roles and boundaries | `AGENTS.md` |
| See open and completed work | `TASK_BOARD.md` |
| Review handoffs | `HANDOFF_LOG.md` |
| Prepare a first GitHub release | `RELEASE_CHECKLIST.md` |
| Onboard a new team member | `ONBOARDING.md` |

## Repository Rules

- Do not create new requirements in repository hygiene files.
- Do not rewrite approved business artifacts unless explicitly instructed.
- Keep missing information as open questions.
- Keep every new artifact traceable to owner, input files, output path, status, and downstream consumer.
