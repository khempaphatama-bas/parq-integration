# TASK BOARD

Project: PARQ Integration

Last updated: 2026-06-11

## Open

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| LIB-001 | Confirm artifact owners for all indexed folders and documents. | Libra | Ready for handoff | Owner fields remain `TBD` in `MASTER_INDEX.md`; collect confirmations from project leads and update index only when confirmed. |
| LIB-002 | Add or link `[Proposal] The PARQ integration.pdf`. | TBD | Open | Repository scan on 2026-06-10 did not find the proposal PDF. Logged as `PARQ-MISSING-001` in `MASTER_INDEX.md` and `OQ-CLAR-001` in the clarification decision log. |
| LIB-004 | Confirm whether discovery review is historical-only or active reference. | TBD | Open | `PARQ_Integration_Architecture_Review.md` currently marked `Reference`; status is not confirmable from repository files alone. Logged as `OQ-CLAR-004`. |
| LIB-008 | Confirm source content for conversation clarifications / clarification note. | TBD | Open | Traceability shell created, but no approved clarification source content is present in the repository. Logged as `OQ-CLAR-002`. |
| MOL-002 | Create UX/stakeholder visual user-flow pack. | Molly | Ready for handoff | Diagram user journeys for UX/UI designer and stakeholders using source user-flow index, architecture flow pack, and technical dependencies; do not invent missing business decisions. |
| QA-001 | Create SIT/UAT/negative/regression matrix from approved architecture dependencies. | Quinn | Blocked | Depends on SIM-001 and environment readiness inputs. |
| MOL-001 | Extract business rules and acceptance criteria from source-of-truth and architecture artifacts. | Molly | Pending | Should start after source/clarification gaps are confirmed or explicitly accepted as open questions. |

## Done

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| LIB-005 | Repository folder reorganization and index refresh. | Libra | Done | Root control files, folder structure, README coverage, and index refresh completed. |
| LIB-006 | Create librarian root folder structure. | Libra | Done | `01_Source_of_Truth` through `06_Project_Management` created, with `04_Delivery` replacing prior `04_Backlog`. |
| LIB-007 | Move existing PARQ artifacts into librarian folders. | Libra | Done | Existing PARQ artifacts moved into source, discovery, architecture, QA, and project-management folders. |
| LIB-003 | Add clarification note or decision log. | Libra | Done | Created `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md` as a traceability shell with open questions and no invented clarification content. |
| SIM-001 | Create technical dependency control pack. | Simon | Done with open questions | Created `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`; open questions remain for named owners, API details, PII/consent, error contracts, environments, hardware readiness, and operational runbooks. |
| SIM-002 | Create visual architecture and flow pack. | Simon | Done with open questions | Created `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`; open questions remain visible under each diagram for owners, APIs, SLAs, environments, fallback behavior, PII/consent, and operational decisions. |
| SIM-003 | Assess BMS impact for PARQ login, registration, and identity-update flows. | Simon | Done with decision recorded | Created and updated `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`; PARQ selected Option B non-blocking login refresh. Endpoint, timeout, cache/source for previous Workplace permission, mutation, support, PII, and audit details remain open. |
| LIB-009 | Improve stakeholder portal navigation, diagrams, and confirmation tracking. | Libra | Done with confirmation items | Updated `07_Portal/` with shared navigation, cross-links, architecture diagram page, confirmation-required page, source index, JSON data files, and README. Mermaid runtime approval/local asset remains a Bas confirmation item. |
