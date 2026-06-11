# PARQ Clarification Decision Log

Owner: Libra

Input files:
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `02_Discovery/PARQ_Integration_Architecture_Review.md`
- `01_Source_of_Truth/API_and_System_References/00_2025_Document/User Flow_20260608.pdf`
- `01_Source_of_Truth/PARQ_User_Flow/Offboarding_User_Flow.png`

Output file path: `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`

Status: Traceability shell / Bas confirmations recorded with remaining open questions

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
| `[Proposal] The PARQ integration.pdf` | Found at `01_Source_of_Truth/API_and_System_References/00_2025_Document/[Proposal] The PARQ integration.pdf`. | Available source artifact | Bas confirmed availability on 2026-06-11; closes `OQ-CLAR-001` and supersedes `PARQ-MISSING-001`. |
| Conversation clarifications / clarification note | No standalone artifact found in repository. | Missing clarification source | Architecture documents reference clarifications, but source content is unavailable as a repository artifact. |
| `03_Architecture/PARQ_User_Flow_Integration_Architecture.md` | Found | Downstream derived architecture artifact | References source of truth and clarifications. |
| `02_Discovery/PARQ_Integration_Architecture_Review.md` | Found | Discovery/reference artifact | Historical-only versus active reference status is not confirmed. |
| `api-members-by-account-id.md` | Found | BMS source/reference artifact | Documents BMS `GET /members/by-account-id`. |
| `add_identity_flow.md` | Found | BMS/IAM identity-flow source/reference artifact | Confirms current BMS `checkMember` usage in identity flow. |
| `User Flow_20260608.pdf` | Found | Bas-confirmed PARQ to-be UX/business flowboard | Created by Bas before AI refinement; should be used as a primary Discovery flow reference together with the user-flow index. |
| Bas Atlassian whiteboard link | External link provided by Bas on 2026-06-11 | Upstream visual source link | `https://mtel-team-persia.atlassian.net/wiki/spaces/~712020fa7446f8961d452993d30c0e76968eb0/whiteboard/65710?atlOrigin=eyJpIjoiMDI0YTlkZWI2YjY3NGQ5M2E5MWEzOWE0YjFiZTk2NGEiLCJwIjoiYyJ9` |
| `Offboarding_User_Flow.png` | Found | Bas-confirmed PARQ lifecycle visual | Clarifies that company offboarding, user delete account, system hard delete after 30 days, and reactivation within 30 days are separate lifecycle flows. |
| PARQ Phase 1 User Flow Google Sheet | Public Google Sheet confirmed by Bas on 2026-06-11. | Approved source link | `https://docs.google.com/spreadsheets/d/1WSGhrt0xSyVVSa37jANQ6XQKirllygVhVMWqP_xaGVo/edit?usp=sharing` |

## Confirmed Decisions

| ID | Decision | Evidence / Source | Status | Downstream Consumer |
|---|---|---|---|---|
| DEC-BMS-001 | PARQ to-be login will use Option B: perform BMS member check during login as a non-blocking refresh. | User clarification on 2026-06-10: "ไปต่อที่ Option B แบบ non-blocking". | Decision recorded | Simon, Molly, Quinn, Libra |
| DEC-BMS-002 | If BMS is unavailable during login, the user can still enter the app. | User clarification on 2026-06-10: "เข้าได้". | Decision recorded | Simon, Molly, Quinn |
| DEC-BMS-003 | If BMS is unavailable and the user previously had Workplace permission, the app/IAM should allow the existing Workplace permission when it can be detected. | User clarification on 2026-06-10. | Decision recorded | Simon, Molly, Quinn |
| DEC-BMS-004 | Login-time BMS check uses the same BMS member-check API family as `checkMember` / `GET /members/by-account-id`; exact implementation contract remains a technical open question. | User clarification on 2026-06-10: "อันเดียวกัน". | Decision recorded with technical open question | Simon, IAM owner TBD, BMS owner TBD |
| DEC-BMS-005 | For BMS sync/retry ownership: IAM owns the login-time check/orchestration point; BMS owns member sync/source behavior. | User clarification on 2026-06-10. | Decision recorded with owner naming still TBD | Simon, PARQ, Quinn |
| DEC-UX-001 | `User Flow_20260608.pdf` is PARQ to-be flow created by Bas before AI use, not merely a legacy OBK reference. | Bas clarification on 2026-06-11. | Decision recorded | Molly, Libra, UX/UI, PARQ |
| DEC-UX-002 | Social login, guest persona, and invitation/service-code paths shown in the Bas flowboard apply to PARQ Phase 1 scope. | Bas clarification on 2026-06-11. | Decision recorded | Molly, Quinn, UX/UI |
| DEC-UX-003 | Add New Email and Add New Phone should be included. If the added phone/email is found with FS type, the user receives Workplace persona rights according to FS sync. | Bas clarification on 2026-06-11. | Decision recorded | Molly, Simon, Quinn, UX/UI |
| DEC-UX-004 | PARQ persona combinations should work like existing One Bangkok App users, including Retail, Workplace, Resident, and combined personas. | Bas clarification on 2026-06-11. | Decision recorded | Molly, Simon, UX/UI |
| DEC-UX-005 | Traffic, Map, and Promotion are Phase 1 webview quick actions only, not standalone native feature builds. | Bas clarification on 2026-06-11. | Decision recorded | Molly, UX/UI, Quinn |
| DEC-UX-006 | Primary navigation list for UX/UI is confirmed: persona card, tower switch, quick menu, My QR, parking, visitor, profile, settings/delete/reactivate. | Bas clarification on 2026-06-11. | Decision recorded | Molly, Libra, UX/UI |
| DEC-LIFE-001 | Company offboarding is separate from user account deletion. When the user resigns, the forward system/FS inactivates the user; after app FS sync, Workplace is removed if FS type is no longer detected. | `Offboarding_User_Flow.png`, provided by Bas on 2026-06-11. | Decision recorded | Molly, Simon, Quinn, UX/UI |
| DEC-LIFE-002 | User delete account marks the account as `Suspens` in the Bas visual; wording/status value needs technical naming confirmation before implementation/UAT copy. | `Offboarding_User_Flow.png`, provided by Bas on 2026-06-11. | Decision recorded with naming open question | Molly, Simon, Quinn |
| DEC-LIFE-003 | System hard delete runs by daily cronjob after the account has been deleted over 30 days; before that, the suspended account remains stored in DB. | `Offboarding_User_Flow.png`, provided by Bas on 2026-06-11. | Decision recorded | Simon, Quinn, Molly |
| DEC-LIFE-004 | Reactivation is available only while the account is suspended and not deleted over 30 days; if over 30 days, the user sees cannot-find-account behavior. | `Offboarding_User_Flow.png`, provided by Bas on 2026-06-11. | Decision recorded | Molly, Quinn, UX/UI |
| DEC-PORTAL-001 | Portal Current Gate wording is confirmed as `Key Decisions Required`. | Bas confirmation on 2026-06-11. | Decision recorded / `CONF-V2-001` resolved | Libra, Product Team, Management |
| DEC-SOT-001 | The approved PARQ Phase 1 User Flow source is the public Google Sheet provided by Bas. | Bas confirmation on 2026-06-11. | Decision recorded / `CONF-DISC-001` resolved | Libra, Molly, Simon, Quinn |
| DEC-SOT-002 | `[Proposal] The PARQ integration.pdf` is available locally and should be registered as a source/reference artifact. | Bas confirmation on 2026-06-11 and file exists in repository. | Decision recorded / `OQ-CLAR-001` resolved | Libra, Simon, Molly, Quinn |

## Confirmed Source Facts

| ID | Source Fact | Evidence | Status |
|---|---|---|---|
| SF-BMS-001 | Current app checks member from BMS in Sign-up and Add / Remove identity flow. | Project team context plus `add_identity_flow.md`. | Confirmed source/reference fact |
| SF-BMS-002 | BMS `checkMember` can create external identity type `fs` when a member is found and not bound to another account. | `add_identity_flow.md`. | Confirmed source/reference fact |
| SF-BMS-003 | BMS `GET /members/by-account-id` retrieves members associated with an account ID. | `api-members-by-account-id.md`. | Confirmed source/reference fact |


## Confirmed Platform / Service Ownership

| System / Platform | Confirmed Ownership | Remaining Gap |
|---|---|---|
| IAM | OBK Backend / OB_IAM_SDK / IAM Service | Named human contact person required for SIT/UAT escalation. |
| BMS | ob-bms service | Named human contact person required for SIT/UAT escalation. |
| FS/Iviva | Frasers Property / Iviva platform | Named human contact person required for SIT/UAT escalation. |
| BZB | Buzzebee external CRM vendor | Named human contact person required for SIT/UAT escalation. |
| Argento | Argento external payment gateway vendor | Named human contact person required for SIT/UAT escalation. |
| CMS | Existing One Bangkok CMS API | Named human contact person required for SIT/UAT escalation. |
| Kafka / Event Bus | Internal event infrastructure used by IAM for async events | Named human contact person required for SIT/UAT escalation. |
| Notification | Existing OBK Notification infrastructure | Named human contact person required for SIT/UAT escalation. |
| Elevator | Authorization owned by FS | Named human contact person required for SIT/UAT escalation. |
| Turnstile | Validation and entry authorization owned by FS | Named human contact person required for SIT/UAT escalation. |

## Open Questions

| ID | Open Question | Owner | Status | Downstream Consumer |
|---|---|---|---|---|
| OQ-CLAR-001 | Where is `[Proposal] The PARQ integration.pdf`, or who can provide the approved source file/link? | Bas / Libra | Resolved | Resolved by `PARQ-SOT-005`; proposal PDF is available locally. |
| OQ-CLAR-002 | Is there an approved clarification note or decision record behind the references in `PARQ_User_Flow_Integration_Architecture.md`? | TBD | Open | Libra, PARQ, Simon, Molly, Quinn |
| OQ-CLAR-003 | Who owns approval of clarification and decision-log entries once source content is provided? | TBD | Open | Libra, PARQ |
| OQ-CLAR-004 | Is `02_Discovery/PARQ_Integration_Architecture_Review.md` historical-only or still an active reference? | TBD | Open | Libra, PARQ, Simon |
| OQ-BMS-001 | What is the exact technical endpoint and payload contract for login-time BMS member check if `checkMember` and `GET /members/by-account-id` are treated as the same member-check capability? | IAM owner TBD / BMS owner TBD | Open | Simon, Quinn |
| OQ-BMS-002 | What timeout, retry, circuit-breaker, audit, and monitoring behavior applies to non-blocking BMS login refresh? | IAM owner TBD / BMS owner TBD | Open | Simon, Quinn, PARQ |
| OQ-BMS-003 | If BMS returns member-bound-to-another-account during login, what support message, audit marker, and manual correction path should be used? | PARQ / IAM / Support TBD | Open | Molly, Quinn, Simon |
| OQ-BMS-004 | What cache/source should be used to detect a user's previous Workplace permission while BMS is unavailable, and what freshness limit applies? | IAM owner TBD / FS owner TBD | Open | Simon, Quinn |
| OQ-LIFE-001 | What is the exact system status value and user-facing wording for `Suspens`: `Suspens`, `Suspended`, or `Suspense Status`? | IAM / Product owner TBD | Open | Molly, Simon, Quinn |
| OQ-LIFE-002 | Should hard delete after "over 30 days" be described to users as Day 31, after 30 full days, or another exact timestamp rule? | IAM / Product owner TBD | Open | Molly, Quinn, Support |

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
| 2026-06-11 | Molly | Recorded Bas confirmations for `User Flow_20260608.pdf`, Add Email/Phone, persona combinations, quick actions, primary navigation, and lifecycle split using `Offboarding_User_Flow.png`. | Complete with open naming/timing questions |
| 2026-06-11 | Libra | Recorded Bas confirmations for Current Gate wording, approved PARQ User Flow Google Sheet, proposal PDF availability, and platform/service ownership. | Complete; `CONF-V2-001`, `CONF-DISC-001`, and `OQ-CLAR-001` resolved |
