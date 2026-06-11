# First Release Checklist

Owner: Libra

Input files:
- `README.md`
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `07_Portal/README.md`

Output file path: `RELEASE_CHECKLIST.md`

Status: Draft checklist for first GitHub release

Downstream consumer: PARQ Orchestrator, repository maintainers, project leads

## Pre-Release Repository Checks

| Check | Status | Notes |
|---|---|---|
| Root `README.md` exists | Ready | Provides project map and start points. |
| `AGENTS.md` exists | Ready | Defines agent roles, ownership, and boundaries. |
| `MASTER_INDEX.md` exists | Ready | Primary source-of-truth tracker. |
| `TASK_BOARD.md` exists | Ready | Tracks open and completed work. |
| `HANDOFF_LOG.md` exists | Ready | Tracks handoff history. |
| `.gitignore` exists | Ready | Excludes local metadata, temp files, logs, and dependency folders. |
| Folder-level README files exist | Ready | Added coverage for portal asset/data and output folders. |
| Stakeholder portal exists | Ready | `07_Portal/` contains static HTML/CSS/JSON portal. |
| Missing source artifacts remain visible | Open | Proposal PDF and owner gaps remain open in `MASTER_INDEX.md`. |
| Confirmation items remain visible | Open | Bas confirmation items remain in `07_Portal/data/confirmation_required.json`. |

## First GitHub Release Steps

1. Confirm repository remote URL:
   `https://github.com/khempaphatama-bas/parq-integration`
2. Review `MASTER_INDEX.md` for missing owner or source-of-truth gaps.
3. Review `TASK_BOARD.md` and confirm open items are acceptable for release visibility.
4. Review `HANDOFF_LOG.md` for latest completed handoff.
5. Open the portal locally and check:
   - Dashboard
   - Deliverables
   - Architecture
   - Diagrams
   - Open Questions
   - Risks
   - Dependencies
   - Confirmation Required
   - Source Index
6. Confirm generated outputs under `outputs/` are intended for GitHub.
7. Remove local-only files before release.
8. Tag the first release only after project leads accept the repository as a shared documentation baseline.

## Release Notes Template

```text
Release:
Date:
Owner:
Summary:
Included artifacts:
Known open questions:
Missing source artifacts:
Downstream consumers:
Approval / acceptance:
```
