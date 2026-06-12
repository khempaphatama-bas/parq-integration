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
- Bas Google Drive IAM / SSO markdown source folder: `https://drive.google.com/drive/folders/1J75Wu_AQ7m8u_6tLttBfkEAfo_7JdLfx?usp=drive_link`

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
| Bas Google Drive IAM / SSO markdown source folder | Found in Google Drive on 2026-06-12; not copied into repository. | As-is technical reference / not approved PARQ source of truth | Registered as `PARQ-SOT-006` in `MASTER_INDEX.md`. Bas confirmed on 2026-06-12 that it is existing current app flow exported by developer and should remain technical reference only. Contains 19 markdown files across Sign-in / SSO, Identity / Profile, Account Lifecycle, Invitation / Registration, and Kafka / Event Integration. |

## Confirmed Decisions

| ID | Decision | Evidence / Source | Status | Downstream Consumer |
|---|---|---|---|---|
| DEC-BMS-001 | PARQ to-be login will use Option B: perform BMS member check during login as a non-blocking refresh. | User clarification on 2026-06-10: "ไปต่อที่ Option B แบบ non-blocking". | Decision recorded | Simon, Molly, Quinn, Libra |
| DEC-BMS-002 | If BMS is unavailable during login, the user can still enter the app. | User clarification on 2026-06-10: "เข้าได้". | Decision recorded | Simon, Molly, Quinn |
| DEC-BMS-003 | If BMS is unavailable and the user previously had Workplace permission, the app/IAM should allow the existing Workplace permission when it can be detected. | User clarification on 2026-06-10. | Decision recorded | Simon, Molly, Quinn |
| DEC-BMS-004 | Earlier clarification said login-time BMS check uses the same BMS member-check API family as `checkMember` / `GET /members/by-account-id`; this is superseded for PARQ login-time endpoint by `DEC-BMS-006`. | User clarification on 2026-06-10: "อันเดียวกัน"; Bas confirmation on 2026-06-12. | Superseded for login-time endpoint; historical context retained | Simon, IAM owner TBD, BMS owner TBD |
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
| DEC-PARK-001 | Parking Availability starts with user-selected location, not current-location detection. Phase 1 options are One Bangkok and The PARQ; future Fraser property buildings may be added later. | Bas clarification on 2026-06-11. | Decision recorded | Molly, UX/UI, Quinn |
| DEC-PARK-002 | Parking Ticket must detect whether the scanned ticket belongs to One Bangkok or The PARQ. One Bangkok tickets follow the existing live OBK flow; The PARQ tickets use The PARQ rate/capability flow. | Bas clarification on 2026-06-11. | Decision recorded | Molly, Simon, Quinn |
| DEC-PARK-003 | If ticket property cannot be detected, show scan error and retry; if retry still fails, direct user to concierge/support. | Bas clarification on 2026-06-11. | Decision recorded | Molly, UX/UI, Quinn |
| DEC-PARK-004 | The PARQ parking flow has fewer capabilities than One Bangkok and should not show unsupported One Bangkok-only capabilities such as VIP Parking. | Bas clarification on 2026-06-11 plus parking reference docs. | Decision recorded | Molly, UX/UI, Quinn |
| DEC-NOTIF-001 | Phase 1 reuses the existing OBK push notification mechanism and configuration without additional notification platform implementation. | Bas clarification on 2026-06-11; proposal wording cited by Bas. | Decision recorded | Molly, Simon, Quinn |
| DEC-NOTIF-002 | Migrated PARQ users may receive basic notifications such as login/account/system and marketing notifications through the existing OBK mechanism. The PARQ CMS content/campaign management and Workplace-specific PARQ building news are not included in this phase; early building news remains in the existing The PARQ app. | Bas clarification on 2026-06-11. | Decision recorded | Molly, UX/UI, Quinn |
| DEC-TOWER-001 | Multi-tower flow must show both saved last-selected tower and manual tower switching. This supports users who may have rights across One Bangkok towers and The PARQ under one company, such as Fraser Property Co. LTD. | Bas clarification on 2026-06-11. | Decision recorded | Molly, UX/UI, Simon, Quinn |
| DEC-CMS-001 | Phase 1 CMS multi-property user management is view-only for persona/company/property/tower/status metadata; admins should not edit persona metadata in Phase 1. | Bas clarification on 2026-06-11. | Decision recorded | Molly, UX/UI, Simon, Quinn |
| DEC-PORTAL-001 | Portal Current Gate wording is confirmed as `Key Decisions Required`. | Bas confirmation on 2026-06-11. | Decision recorded / `CONF-V2-001` resolved | Libra, Product Team, Management |
| DEC-SOT-001 | The approved PARQ Phase 1 User Flow source is the public Google Sheet provided by Bas. | Bas confirmation on 2026-06-11. | Decision recorded / `CONF-DISC-001` resolved | Libra, Molly, Simon, Quinn |
| DEC-SOT-002 | `[Proposal] The PARQ integration.pdf` is available locally and should be registered as a source/reference artifact. | Bas confirmation on 2026-06-11 and file exists in repository. | Decision recorded / `OQ-CLAR-001` resolved | Libra, Simon, Molly, Quinn |
| DEC-SOT-003 | `PARQ-SOT-006` is existing current app flow / as-is technical reference exported by developer. It is not approved PARQ source of truth. | Bas confirmation after Simon SIM-008 Agent Return Report on 2026-06-12. | Decision recorded / `OQ-SOT-DRIVE-001` resolved | Libra, Molly, Simon, Quinn, PARQ |
| DEC-SOT-004 | For `add_identity_flow.md` precedence, use the Drive version as the latest existing app flow. The repository version is an older reference. | Bas confirmation after Simon SIM-008 Agent Return Report on 2026-06-12. | Decision recorded / `OQ-SOT-DRIVE-002` resolved | Libra, Molly, Simon, Quinn |
| DEC-LIFE-005 | Requirement/SOW and UX should use business wording `within 30 days / Day 31`. TDD may note the current implementation uses `now - 1 month`. | Bas confirmation after Simon SIM-008 Agent Return Report on 2026-06-12. | Decision recorded / `OQ-LIFE-004` resolved for SOW/UX | Molly, Simon, Quinn, Support |
| DEC-BMS-006 | For PARQ login-time BMS check, use `GET /members` with `account_id`. Endpoint confirmation owner is OBK BMS Service Team via PO. Timeout remains TBD. | Bas confirmation after Simon SIM-008 Agent Return Report on 2026-06-12. | Decision recorded / `OQ-BMS-005` partially resolved; timeout remains open | Simon, Molly, Quinn, PARQ |
| DEC-KAFKA-001 | Kafka runtime behavior should reference the delete account document/source. Do not invent additional Kafka runtime controls beyond documented behavior. | Bas confirmation after Simon SIM-008 Agent Return Report on 2026-06-12; Drive `delete_account_flow.md`; Drive `sso-integration/kafka_account_deleted_event.md`. | Decision recorded; undocumented runtime controls remain open only if not covered by source | Simon, Quinn, PARQ |
| DEC-QA-001 | Quinn should not proceed with QA scenario creation yet. Requirement Specification / Scope of Work should be created first. | Bas confirmation after Simon SIM-008 Agent Return Report on 2026-06-12. | Decision recorded | Molly, Quinn, PARQ |
| DEC-SCOPE-001 | In the internal Requirement/SOW, Phase 1.5 should be written as `Deferred / Future Phase`. | Bas scope decision on 2026-06-12. | Decision recorded | Molly, PARQ, Libra |
| DEC-SCOPE-002 | Phase 1 includes QR PromptPay parking payment. Users can pay by themselves through QR Code. | Bas scope decision on 2026-06-12; proposal source registered as `PARQ-SOT-005`; parking references remain supporting context. | Decision recorded | Molly, Simon, Quinn, PARQ |
| DEC-SCOPE-003 | Phase 1 does not include user self-redemption. | Bas scope decision on 2026-06-12. | Decision recorded | Molly, UX/UI, Quinn, PARQ |
| DEC-SCOPE-004 | Store whitelist, automated E-stamp, OCR redemption, automated gate sync, Organization Isolation, CMS sub-menu, and rate configuration belong to Phase 1.5. | Bas scope decision on 2026-06-12. | Decision recorded / Deferred-Future Phase boundary | Molly, Simon, Quinn, PARQ |
| DEC-SCOPE-005 | The PARQ currently has its own CMS/platform for concierge redemption. | Bas scope decision on 2026-06-12. | Decision recorded without platform-detail assumptions | Molly, Simon, Quinn, PARQ |
| DEC-SCOPE-006 | The PARQ concierge redemption platform is separate from the One Bangkok concierge platform. | Bas scope decision on 2026-06-12. | Decision recorded without integration assumptions | Molly, Simon, Quinn, PARQ |
| DEC-SCOPE-007 | Phase 1 should not assume OBK CMS manages The PARQ redemption. | Bas scope decision on 2026-06-12. | Decision recorded | Molly, Simon, Quinn, PARQ |

## Confirmed Source Facts

| ID | Source Fact | Evidence | Status |
|---|---|---|---|
| SF-BMS-001 | Current app checks member from BMS in Sign-up and Add / Remove identity flow. | Project team context plus `add_identity_flow.md`. | Confirmed source/reference fact |
| SF-BMS-002 | BMS `checkMember` can create external identity type `fs` when a member is found and not bound to another account. | `add_identity_flow.md`. | Confirmed source/reference fact |
| SF-BMS-003 | BMS `GET /members/by-account-id` retrieves members associated with an account ID. | `api-members-by-account-id.md`. | Confirmed source/reference fact |
| SF-DRIVE-001 | New Drive source folder contains 19 markdown files and two first-level subfolders: `sign-in` and `sso-integration`. | Google Drive folder listing on 2026-06-12. | Confirmed source/reference fact |
| SF-DRIVE-002 | Drive `add_identity_flow.md` overlaps with the existing repository source/reference artifact `01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md`; Drive version is the latest existing app flow and repository version is older reference. | Drive file listing, repository file scan, Bas confirmation on 2026-06-12. | Confirmed overlap; precedence resolved |
| SF-LIFE-004 | Soft delete / account deactivation publishes Kafka event `ob-iam.account.deleted`. | Drive `delete_account_flow.md`; Drive `sso-integration/kafka_account_deleted_event.md`. | Confirmed source/reference fact |
| SF-LIFE-005 | Permanent account deletion publishes Kafka event `ob-iam.account.permanent-deleted`. | Drive `permanent_delete_account_flow.md`. | Confirmed source/reference fact |
| SF-LIFE-006 | For Requirement/SOW and UX, use business wording `within 30 days / Day 31`; TDD may note current implementation uses `now - 1 month`. | Drive `permanent_delete_account_flow.md`; `Offboarding_User_Flow.png`; Bas confirmation on 2026-06-12. | Confirmed decision for SOW/UX; TDD implementation note preserved |
| SF-BMS-004 | For PARQ login-time BMS check, use `GET /members` with `account_id`. Endpoint confirmation owner is OBK BMS Service Team via PO. Timeout remains TBD. | Bas confirmation on 2026-06-12; `PARQ-ARCH-011`; `PARQ-SOT-006` metadata. | Endpoint confirmed; timeout open |
| SF-PARK-001 | Parking Ticket property detection uses selected UI Location plus FS/Iviva response fields `park_syscode` and `park_name`. | `PARQ-ARCH-010`. | Confirmed source/reference fact; FS value contract remains open |
| SF-TOWER-001 | Persistent tower/default floor uses BMS `default_floor`; temporary tower switching uses App State. | `PARQ-ARCH-010`. | Confirmed source/reference fact; schema/mapping remains open |
| SF-CMS-001 | CMS cross-property visibility is accepted as a Phase 1 risk with manual / limited Seed Account governance; it is not resolved by a technical control. | `PARQ-ARCH-010`; source-intake instruction. | Accepted risk with governance detail open |
| SF-HW-001 | The PARQ hardware/site key contact and site testing window remain blocked; "Contact through PO" is not a named human contact. | `PARQ-ARCH-010`; source-intake instruction. | Blocked |
| SF-SCOPE-001 | Requirement/SOW must show Phase 1.5 as `Deferred / Future Phase`, not as Phase 1 delivery. | Bas scope decision on 2026-06-12. | Confirmed scope-boundary fact |
| SF-PARK-002 | Phase 1 includes QR PromptPay parking payment and does not include user self-redemption. | Bas scope decision on 2026-06-12. | Confirmed scope-boundary fact |
| SF-PARK-003 | The PARQ concierge redemption platform exists separately from the One Bangkok concierge platform; Phase 1 should not assume OBK CMS manages The PARQ redemption. | Bas scope decision on 2026-06-12. | Confirmed scope-boundary fact; no platform details invented |


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
| OQ-BMS-001 | What is the exact technical endpoint and payload contract for login-time BMS member check if `checkMember` and `GET /members/by-account-id` are treated as the same member-check capability? | OBK BMS Service Team via PO | Superseded / partially resolved | Endpoint for PARQ login-time check is now `GET /members` with `account_id` per `DEC-BMS-006`; timeout remains open under `OQ-BMS-002`. |
| OQ-BMS-002 | What timeout, retry, circuit-breaker, audit, and monitoring behavior applies to non-blocking BMS login refresh? | OBK BMS Service Team via PO / IAM owner TBD | Open | Timeout remains TBD. Do not invent retry/circuit-breaker/audit behavior beyond documented source. Simon, Quinn, PARQ. |
| OQ-BMS-003 | If BMS returns member-bound-to-another-account during login, what support message, audit marker, and manual correction path should be used? | PARQ / IAM / Support TBD | Open | Molly, Quinn, Simon |
| OQ-BMS-004 | What cache/source should be used to detect a user's previous Workplace permission while BMS is unavailable, and what freshness limit applies? | IAM owner TBD / FS owner TBD | Open | Simon, Quinn |
| OQ-LIFE-001 | What is the exact system status value and user-facing wording for `Suspens`: `Suspens`, `Suspended`, or `Suspense Status`? | IAM / Product owner TBD | Open | Molly, Simon, Quinn |
| OQ-LIFE-002 | Should hard delete after "over 30 days" be described to users as Day 31, after 30 full days, or another exact timestamp rule? | IAM / Product owner TBD | Resolved for Requirement/SOW and UX | Use `within 30 days / Day 31` for Requirement/SOW and UX per `DEC-LIFE-005`; TDD may note current implementation uses `now - 1 month`. |
| OQ-PARK-001 | What exact The PARQ parking rate source, park/floor mapping, and payment reconciliation rules should be used? | Parking / FS / Argento owners TBD | Open | Molly, Simon, Quinn |
| OQ-PARK-002 | Which One Bangkok-only parking capabilities should be hidden for The PARQ besides VIP Parking? | Product / Parking owner TBD | Open | Molly, UX/UI, Quinn |
| OQ-PARK-003 | What exact error and support copy should appear when scanned ticket property cannot be detected after retry? | Product / Support owner TBD | Open | Molly, UX/UI, Quinn |
| OQ-NOTIF-001 | What exact basic/login/system and marketing notification categories apply to migrated PARQ users under the existing OBK mechanism? | Product / Notification owner TBD | Open | Molly, Quinn |
| OQ-TOWER-001 | What are final display labels for One Bangkok towers and The PARQ, and what copy appears when tower switching is blocked during an active hardware journey? | Product / UX owner TBD | Open | Molly, UX/UI, Quinn |
| OQ-SOT-DRIVE-001 | Is the Bas Google Drive IAM / SSO markdown folder approved source of truth, or technical reference only? | Bas / PARQ | Resolved | Resolved by `DEC-SOT-003`: as-is technical reference exported by developer; not approved PARQ source of truth. |
| OQ-SOT-DRIVE-002 | Which `add_identity_flow.md` is authoritative: the existing repository file or the Drive file? Should the Drive file be copied into the repository with version metadata? | Bas / PARQ / IAM owner TBD | Resolved for precedence | Resolved by `DEC-SOT-004`: Drive version is latest existing app flow; repository version is older reference. Repository archival/versioning remains a Libra action only if requested. |
| OQ-LIFE-004 | Should lifecycle timing be described as Day 31 / over 30 days, or as implementation rule `now - 1 month`? | IAM / Product owner TBD | Resolved for Requirement/SOW and UX | Resolved by `DEC-LIFE-005`: use `within 30 days / Day 31` for Requirement/SOW and UX; TDD may note current implementation uses `now - 1 month`. |
| OQ-BMS-005 | Should BMS member lookup be recorded as `GET /members/by-account-id` or `GET /members` / `members.index`, and what timeout applies? | OBK BMS Service Team via PO | Partially resolved | Resolved by `DEC-BMS-006` for endpoint: use `GET /members` with `account_id` for PARQ login-time check. Timeout remains TBD under `OQ-BMS-002`. |
| OQ-HW-001 | Who is the named The PARQ hardware/site key contact, and what is the confirmed site testing window? | PARQ / Site Operations / FS/Iviva | Blocked | Simon, Quinn, PARQ |
| OQ-CMS-003 | Who owns manual / limited Seed Account governance and audit for the accepted CMS cross-property visibility Phase 1 risk? | PARQ / Security / CMS owner | Open | PARQ, Simon, Quinn |
| OQ-SCOPE-001 | What are the exact operational owner, access method, audit fields, and support workflow for The PARQ's existing concierge redemption platform? | The PARQ / PARQ / Product owner TBD | Open | Molly, Simon, Quinn, PARQ |

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
| 2026-06-11 | Molly | Recorded Bas review comments for Parking Availability location selection, Parking Ticket property routing, Notification Phase 1 scope, Multi-Tower diagrams, and CMS view-only behavior. | Complete with open parking/tower/notification detail questions |
| 2026-06-11 | Libra | Recorded Bas confirmations for Current Gate wording, approved PARQ User Flow Google Sheet, proposal PDF availability, and platform/service ownership. | Complete; `CONF-V2-001`, `CONF-DISC-001`, and `OQ-CLAR-001` resolved |
| 2026-06-12 | Libra | Registered Bas Google Drive IAM / SSO markdown source folder, classified 19 markdown files, flagged `add_identity_flow.md` overlap, lifecycle timing discrepancy, BMS path discrepancy, CMS accepted-risk governance gap, and hardware/site blockers. | Complete with open confirmations |
| 2026-06-12 | Libra | Recorded Bas confirmations after Simon SIM-008: `PARQ-SOT-006` is as-is technical reference only, Drive `add_identity_flow.md` is latest existing app flow, Requirement/SOW and UX use `within 30 days / Day 31`, PARQ login-time BMS check uses `GET /members` with `account_id`, Kafka runtime behavior must reference delete-account source only, and Quinn must wait until Requirement/SOW baseline exists. | Complete; Molly recommended next |
| 2026-06-12 | Libra | Recorded Bas scope decisions for Requirement/SOW preparation: Phase 1.5 is `Deferred / Future Phase`; Phase 1 includes QR PromptPay parking payment and excludes user self-redemption; store whitelist, automated E-stamp, OCR redemption, automated gate sync, Organization Isolation, CMS sub-menu, and rate configuration are Phase 1.5; The PARQ concierge redemption platform is separate from One Bangkok and Phase 1 should not assume OBK CMS manages The PARQ redemption. | Complete; Molly recommended next |
