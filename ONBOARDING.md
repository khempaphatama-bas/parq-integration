# New Team Member Onboarding

Owner: Libra

Input files:
- `README.md`
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `07_Portal/README.md`

Output file path: `ONBOARDING.md`

Status: Current onboarding guide

Downstream consumer: Product Team, Business Team, Vendor Team, Management, PARQ Orchestrator, new contributors

## Purpose

This guide helps a new team member understand the PARQ Integration repository without creating new requirements or changing approved artifacts.

## Read First

| Step | File | Why |
|---|---|---|
| 1 | `README.md` | Understand repository structure and start points. |
| 2 | `AGENTS.md` | Understand agent roles, owners, and boundaries. |
| 3 | `MASTER_INDEX.md` | Find the official document register and source-of-truth status. |
| 4 | `TASK_BOARD.md` | See current open items and completed work. |
| 5 | `HANDOFF_LOG.md` | See latest handoffs and ownership transitions. |
| 6 | `07_Portal/index.html` | Use the stakeholder-friendly visual view. |

## Folder Guide

| Folder | What Belongs Here | Who Uses It |
|---|---|---|
| `01_Source_of_Truth/` | Approved source files, system references, user-flow index, clarification logs. | All roles |
| `02_Discovery/` | Discovery reviews and stakeholder flow references. | Product, Business, Molly, Libra |
| `03_Architecture/` | Architecture, dependency, data, API, vendor, visual, and BMS impact artifacts. | Simon, Quinn, PARQ, Libra |
| `04_Delivery/` | Delivery-ready references and release inputs. | PARQ, project managers |
| `05_QA/` | QA setup and readiness support artifacts. | Quinn, QA team |
| `06_Project_Management/` | Scope packs, manuals, training, and project references. | Project managers, delivery team |
| `07_Portal/` | Static stakeholder portal generated from repository data. | Product, Business, Vendor, Management |
| `outputs/` | Generated stakeholder outputs. | Stakeholders and project leads |

## Working Rules

- Repository files are the shared source of truth.
- Do not create new requirements unless explicitly assigned by the correct owner.
- Do not rewrite approved business artifacts without explicit instruction.
- Missing information must be recorded as open questions, not assumptions.
- New artifacts must include owner, input files, output path, status, and downstream consumer.
- Update `MASTER_INDEX.md` when adding, moving, or reclassifying artifacts.

## Portal Use

Open the portal through a local static server:

```text
http://localhost:8765/07_Portal/index.html
```

Use the portal for stakeholder navigation. Use the markdown/source files for source-of-truth review.

## Common First Tasks

| Task | Where to Start |
|---|---|
| Find current open decisions | `07_Portal/confirmation-required.html` and `TASK_BOARD.md` |
| Find architecture dependencies | `03_Architecture/` and `07_Portal/dependencies.html` |
| Find BMS-related source references | `MASTER_INDEX.md` and `01_Source_of_Truth/API_and_System_References/` |
| Check if an artifact is approved or missing | `MASTER_INDEX.md` |
| Prepare for release | `RELEASE_CHECKLIST.md` |
