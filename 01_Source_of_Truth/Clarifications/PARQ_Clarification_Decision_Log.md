# PARQ Clarification Decision Log

Owner: Libra

Input files:
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `02_Discovery/PARQ_Integration_Architecture_Review.md`

Output file path: `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`

Status: Traceability shell / BMS decision recorded with open questions

Downstream consumer:
- `MASTER_INDEX.md`
- PARQ Orchestrator
- Simon / Senior Solution Architect
- Molly / Assistant PO
- Quinn / QA Lead
- Project leads responsible for source and owner confirmation

## Purpose

This log tracks clarification and decision sources referenced by PARQ Integration repository artifacts.

This artifact does not create requirements, architecture, user stories, or QA scenarios.

## Source Availability Check

| Source / Reference | Repository Status | Traceability Status | Notes |
|---|---|---|---|
| `[Proposal] The PARQ integration.pdf` | Not found in repository scan on 2026-06-10. | Missing source artifact | Keep as unavailable until uploaded or linked. |
| Conversation clarifications / clarification note | No standalone artifact found in repository. | Missing clarification source | Architecture documents reference clarifications, but source content is unavailable as a repository artifact. |
| `03_Architecture/PARQ_User_Flow_Integration_Architecture.md` | Found | Downstream derived architecture artifact | References source of truth and clarifications. |
| `02_Discovery/PARQ_Integration_Architecture_Review.md` | Found | Discovery/reference artifact | Historical-only versus active reference status is not confirmed. |
| `api-members-by-account-id.md` | Found | BMS source/reference artifact | Documents BMS `GET /members/by-account-id`. |
| `add_identity_flow.md` | Found | BMS/IAM identity-flow source/reference artifact | Confirms current BMS `checkMember` usage in identity flow. |

## Confirmed Decisions

| ID | Decision | Evidence / Source | Status | Downstream Consumer |
|---|---|---|---|---|
| DEC-BMS-001 | PARQ to-be login will use Option B: perform BMS member check during login as a non-blocking refresh. | User clarification on 2026-06-10: "ไปต่อที่ Option B แบบ non-blocking". | Decision recorded | Simon, Molly, Quinn, Libra |
| DEC-BMS-002 | If BMS is unavailable during login, the user can still enter the app. | User clarification on 2026-06-10: "เข้าได้". | Decision recorded | Simon, Molly, Quinn |
| DEC-BMS-003 | If BMS is unavailable and the user previously had Workplace permission, the app/IAM should allow the existing Workplace permission when it can be detected. | User clarification on 2026-06-10. | Decision recorded | Simon, Molly, Quinn |
| DEC-BMS-004 | Login-time BMS check uses the same BMS member-check API family as `checkMember` / `GET /members/by-account-id`; exact implementation contract remains a technical open question. | User clarification on 2026-06-10: "อันเดียวกัน". | Decision recorded with technical open question | Simon, IAM owner TBD, BMS owner TBD |
| DEC-BMS-005 | For BMS sync/retry ownership: IAM owns the login-time check/orchestration point; BMS owns member sync/source behavior. | User clarification on 2026-06-10. | Decision recorded with owner naming still TBD | Simon, PARQ, Quinn |

## Confirmed Source Facts

| ID | Source Fact | Evidence | Status |
|---|---|---|---|
| SF-BMS-001 | Current app checks member from BMS in Sign-up and Add / Remove identity flow. | Project team context plus `add_identity_flow.md`. | Confirmed source/reference fact |
| SF-BMS-002 | BMS `checkMember` can create external identity type `fs` when a member is found and not bound to another account. | `add_identity_flow.md`. | Confirmed source/reference fact |
| SF-BMS-003 | BMS `GET /members/by-account-id` retrieves members associated with an account ID. | `api-members-by-account-id.md`. | Confirmed source/reference fact |

## Open Questions

| ID | Open Question | Owner | Status | Downstream Consumer |
|---|---|---|---|---|
| OQ-CLAR-001 | Where is `[Proposal] The PARQ integration.pdf`, or who can provide the approved source file/link? | TBD | Open | Libra, PARQ, Simon |
| OQ-CLAR-002 | Is there an approved clarification note or decision record behind the references in `PARQ_User_Flow_Integration_Architecture.md`? | TBD | Open | Libra, PARQ, Simon, Molly, Quinn |
| OQ-CLAR-003 | Who owns approval of clarification and decision-log entries once source content is provided? | TBD | Open | Libra, PARQ |
| OQ-CLAR-004 | Is `02_Discovery/PARQ_Integration_Architecture_Review.md` historical-only or still an active reference? | TBD | Open | Libra, PARQ, Simon |
| OQ-BMS-001 | What is the exact technical endpoint and payload contract for login-time BMS member check if `checkMember` and `GET /members/by-account-id` are treated as the same member-check capability? | IAM owner TBD / BMS owner TBD | Open | Simon, Quinn |
| OQ-BMS-002 | What timeout, retry, circuit-breaker, audit, and monitoring behavior applies to non-blocking BMS login refresh? | IAM owner TBD / BMS owner TBD | Open | Simon, Quinn, PARQ |
| OQ-BMS-003 | If BMS returns member-bound-to-another-account during login, what support message, audit marker, and manual correction path should be used? | PARQ / IAM / Support TBD | Open | Molly, Quinn, Simon |
| OQ-BMS-004 | What cache/source should be used to detect a user's previous Workplace permission while BMS is unavailable, and what freshness limit applies? | IAM owner TBD / FS owner TBD | Open | Simon, Quinn |

## Owner Confirmation Register

| Artifact / Folder | Current Owner | Confirmation Status | Notes |
|---|---|---|---|
| `01_Source_of_Truth/` | Project Librarian / source artifact owners | Partially defined | Folder owner role exists; named source artifact owners are not confirmed. |
| `02_Discovery/` | Project Librarian / discovery owners | Partially defined | Named discovery owner is not confirmed. |
| `03_Architecture/` | Technical owners | Partially defined | Simon role owns architecture artifact types, but named artifact approval owner is not confirmed. |
| `04_Delivery/` | Delivery/project owners | Missing named owner | Owner not confirmed. |
| `05_QA/` | QA owners | Partially defined | Quinn role owns QA artifact types, but named artifact approval owner is not confirmed. |
| `06_Project_Management/` | Project managers / delivery owners | Missing named owner | Owner not confirmed. |
| `01_Source_of_Truth/PARQ_User_Flow/The_PARQ_Phase_1_User_Flow_Index.xlsx` | TBD | Missing owner | Source-of-truth owner must be confirmed. |
| `03_Architecture/PARQ_User_Flow_Integration_Architecture.md` | TBD | Missing owner | Likely Simon downstream ownership by role, but repository owner is not confirmed. |
| `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md` | TBD | Missing owner | Likely Simon downstream ownership by role, but repository owner is not confirmed. |
| `02_Discovery/PARQ_Integration_Architecture_Review.md` | TBD | Missing owner | Historical-only versus active reference is not confirmed. |

## Change Log

| Date | Owner | Change | Status |
|---|---|---|---|
| 2026-06-10 | Libra | Created traceability shell because referenced proposal and clarification sources are unavailable in repository. | Complete |
| 2026-06-10 | Libra | Added BMS source/reference facts and open PARQ login decision without changing architecture decisions. | Complete with open question |
| 2026-06-10 | Simon | Recorded PARQ decision for BMS Option B non-blocking login refresh and converted the prior BMS login decision into remaining technical open questions. | Complete with open questions |
