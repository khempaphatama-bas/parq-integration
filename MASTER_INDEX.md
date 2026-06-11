# MASTER INDEX

Repository: One Bangkok App / PARQ

Last updated: 2026-06-11

## Folder Structure

| Folder | Purpose | Owner |
|---|---|---|
| `01_Source_of_Truth/` | Authoritative source inputs and domain/system references. | Project Librarian / source artifact owners |
| `02_Discovery/` | Discovery notes, proposal reviews, gap analysis, and open questions. | Project Librarian / discovery owners |
| `03_Architecture/` | Integration architecture, dependency maps, sequence diagrams, and technical handover artifacts. | Technical owners |
| `04_Delivery/` | Delivery artifacts, release inputs, deployment handoff, and accepted delivery references supplied by owners. | Delivery/project owners |
| `05_QA/` | Testing, validation, readiness, and sign-off artifacts. | QA owners |
| `06_Project_Management/` | Scope packs, user manuals, training, delivery packs, and operational handover. | Project managers / delivery owners |

## Document Register

| Document ID | Document / Folder | Type | Folder Location | Owner | Source-of-Truth Status | Status | Related Artifacts | Notes |
|---|---|---|---|---|---|---|---|---|
| PARQ-SOT-001 | [PARQ Phase 1 User Flow Google Sheet](https://docs.google.com/spreadsheets/d/1WSGhrt0xSyVVSa37jANQ6XQKirllygVhVMWqP_xaGVo/edit?usp=sharing) | User-flow index | Google Sheet; local reference copy in `01_Source_of_Truth/PARQ_User_Flow/` | TBD | Approved / Source of Truth | Current | PARQ-ARCH-001, PARQ-REVIEW-001 | Bas confirmed the public Google Sheet as approved PARQ Phase 1 User Flow Index source on 2026-06-11. Local XLSX remains a repository reference copy. |
| PARQ-SOT-002 | [PARQ_Clarification_Decision_Log.md](01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md) | Clarification and decision traceability log | `01_Source_of_Truth/Clarifications/` | Libra | Traceability shell | BMS Decision Recorded / Proposal Resolved / Open Questions | PARQ-ARCH-001, PARQ-REVIEW-001, PARQ-ARCH-004, PARQ-ARCH-007, PARQ-SOT-005 | Records BMS Option B, Bas confirmations, proposal availability, Google Sheet source confirmation, and remaining open questions. |
| PARQ-SOT-003 | [User Flow_20260608.pdf](01_Source_of_Truth/API_and_System_References/00_2025_Document/User%20Flow_20260608.pdf) | PARQ to-be UX/business flowboard | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` | Bas | Source/reference artifact | Bas Confirmed / Current | PARQ-SOT-001, PARQ-UX-001, PARQ-ARCH-001 | Bas confirmed on 2026-06-11 that this is the PARQ to-be flow created before AI refinement. Use as primary Discovery flow reference together with the user-flow index. Upstream Atlassian whiteboard link is recorded in `PARQ_Clarification_Decision_Log.md`. |
| PARQ-SOT-004 | [Offboarding_User_Flow.png](01_Source_of_Truth/PARQ_User_Flow/Offboarding_User_Flow.png) | PARQ lifecycle visual flow | `01_Source_of_Truth/PARQ_User_Flow/` | Bas | Source/reference artifact | Bas Confirmed / Current | PARQ-SOT-002, PARQ-UX-001, PARQ-ARCH-001 | Clarifies UF-004 lifecycle split: company offboarding, user delete account, daily hard delete after over 30 days, and reactivation within 30 days. |
| PARQ-SOT-005 | [PARQ integration proposal PDF](01_Source_of_Truth/API_and_System_References/00_2025_Document/%5BProposal%5D%20The%20PARQ%20integration.pdf) | Proposal source artifact | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` | Bas / PARQ | Approved / Source of Truth | Current | PARQ-REVIEW-001, PARQ-ARCH-001, PARQ-SOT-002 | Bas confirmed the proposal PDF is available locally on 2026-06-11. Closes previous missing proposal item `PARQ-MISSING-001` and open question `OQ-CLAR-001`. |
| PARQ-ARCH-001 | [PARQ_User_Flow_Integration_Architecture.md](03_Architecture/PARQ_User_Flow_Integration_Architecture.md) | Integration architecture and dependency mapping | `03_Architecture/` | TBD | Derived artifact | Current | PARQ-SOT-001, PARQ-REVIEW-001, PARQ-DOM-001, PARQ-DOM-002 | Maps user flows to systems, APIs, dependencies, failure cases, sequence diagram candidates, and residual architecture risks. |
| PARQ-ARCH-004 | [PARQ_Data_API_Context_Boundary_Vendor_Matrix.md](03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md) | Data ownership, API inventory, context, boundary, and vendor dependency architecture | `03_Architecture/` | TBD | Derived artifact | Current | PARQ-SOT-001, PARQ-ARCH-001, PARQ-REVIEW-001 | Defines data ownership matrix, API inventory, context diagram, system boundary diagram, and external vendor dependency matrix. |
| PARQ-ARCH-005 | [PARQ_Technical_Dependency_Control_Pack.md](03_Architecture/PARQ_Technical_Dependency_Control_Pack.md) | Technical dependency control pack | `03_Architecture/` | Simon | Derived artifact | Draft / Open Questions | PARQ-SOT-001, PARQ-SOT-002, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-REVIEW-001 | Provides vendor/API ownership matrix, PII and consent matrix, integration error catalog baseline, SIT/UAT/PVT environment readiness matrix, and technical risk/decision list for Quinn, PARQ, and Libra. |
| PARQ-ARCH-006 | [PARQ_Visual_Architecture_and_Flow_Pack.md](03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md) | Visual architecture and flow pack | `03_Architecture/` | Simon | Derived artifact | Draft / Open Questions | PARQ-SOT-001, PARQ-SOT-002, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-REVIEW-001 | Diagram-first architecture artifact with context, boundary, dependency, data/persona, priority sequence, and visual risk diagrams for non-technical stakeholder review and Quinn planning input. |
| PARQ-ARCH-007 | [PARQ_BMS_Identity_Flow_Impact_Assessment.md](03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md) | BMS identity flow impact assessment | `03_Architecture/` | Simon | Derived artifact | Draft / Option B Non-Blocking Decision Recorded | PARQ-SYS-002, PARQ-SYS-003, PARQ-SOT-002, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-UX-001 | Assesses current BMS member-check behavior, records PARQ decision for Option B non-blocking login refresh, and keeps endpoint, timeout, cache, mutation, support, PII, and audit questions open. |
| PARQ-ARCH-008 | [PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md](03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md) | Architecture readiness reassessment | `03_Architecture/` | Simon | Derived artifact | Draft / Ready for QA Readiness Planning with Blockers | PARQ-SOT-001, PARQ-SOT-002, PARQ-SOT-005, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-ARCH-007, PARQ-UX-001 | Reassesses architecture readiness after Bas confirmations for source, proposal, platform/service ownership, and gate wording. Provides Quinn go/no-go for QA readiness and environment dependency planning without creating QA scenarios. |
| PARQ-ARCH-009 | [PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md](03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md) | Architecture impact assessment from UX update | `03_Architecture/` | Simon | Derived artifact | Draft / Developer Review Go with Blockers | PARQ-UX-001, PARQ-SOT-002, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-ARCH-007, PARQ-ARCH-008 | Reviews architecture/integration impact from Molly's latest UX updates for parking availability, parking payment, notification, multi-tower, CMS, account lifecycle, and BMS. Provides artifact update list, developer review go/no-go, and Quinn readiness inputs without creating QA scenarios. |
| PARQ-REVIEW-001 | [PARQ_Integration_Architecture_Review.md](02_Discovery/PARQ_Integration_Architecture_Review.md) | Architecture review / gap analysis | `02_Discovery/` | TBD | Reference artifact | Reference | PARQ-SOT-001, PARQ-ARCH-001 | Review and gap analysis based on proposal context and the user-flow index. |
| PARQ-UX-001 | [PARQ_UX_Stakeholder_User_Flow_Pack.md](02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md) | UX stakeholder user-flow pack | `02_Discovery/` | Molly | Derived artifact | Draft / Open Questions | PARQ-SOT-001, PARQ-ARCH-001, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-SOT-002 | Journey-first stakeholder flow artifact for UX/UI and decision review; used by BMS impact assessment for downstream UX impacts. |
| PARQ-DOM-001 | [Workplace_Feature](01_Source_of_Truth/Domain_References/Workplace_Feature) | Workplace domain reference set | `01_Source_of_Truth/Domain_References/` | TBD | Source/reference set | Current | PARQ-ARCH-001 | Related to workplace persona, floors, tower context, QR, elevator, and turnstile flows. |
| PARQ-DOM-002 | [Parking_Feature](01_Source_of_Truth/Domain_References/Parking_Feature) | Parking domain reference set | `01_Source_of_Truth/Domain_References/` | TBD | Source/reference set | Current | PARQ-ARCH-001 | Related to parking availability, parking ticket, traffic monitoring, payment, redemption, and FS/Iviva behavior. |
| PARQ-SYS-001 | [00_2025_Document](01_Source_of_Truth/API_and_System_References/00_2025_Document) | OBK API and system reference set | `01_Source_of_Truth/API_and_System_References/` | TBD | Source/reference set | Current | PARQ-ARCH-001, PARQ-QA-001, PARQ-SYS-002, PARQ-SYS-003, PARQ-SOT-003 | Contains IAM, SSO, BMS, third-party API, profile, OTP, notification, FAQ, live chat, membership, account lifecycle reference documents, and the Bas-confirmed PARQ to-be flowboard. |
| PARQ-SYS-002 | [api-members-by-account-id.md](01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md) | BMS member API reference | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` | ob-bms service | Source/reference artifact | Current | PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-SYS-003 | Documents BMS `GET /members/by-account-id`, including account ID header, member response fields, tenant information, and `BMS_MEMB_001` missing-account error. Named human contact is still required for SIT/UAT escalation. |
| PARQ-SYS-003 | [add_identity_flow.md](01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md) | IAM add-identity flow with BMS member check | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` | OBK Backend / OB_IAM_SDK / IAM Service; BMS owned by ob-bms service | Source/reference artifact | Current | PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-SYS-002 | Documents current Add Identity create flow. BMS `checkMember` is used for new identities to create `fs` external identity when a member is found and not bound to another account. Named human contacts are still required for SIT/UAT escalation. |
| PARQ-ARCH-002 | [Connect_X_Integration_Analytic](03_Architecture/Connect_X_Integration_Analytic) | Integration technical document set | `03_Architecture/` | TBD | Derived/reference set | Current | PARQ-SYS-001 | Connect X analytics scope and technical documents. |
| PARQ-ARCH-003 | [Connect_X_Integration_Live_Chat_FAQ_Notification](03_Architecture/Connect_X_Integration_Live_Chat_FAQ_Notification) | Integration technical document set | `03_Architecture/` | TBD | Derived/reference set | Current | PARQ-SYS-001 | Connect X live chat, FAQ, email OTP, and notification scope/technical documents. |
| PARQ-PM-001 | [Invitation_Code_Upgrade_Membership](06_Project_Management/Scope_and_Delivery_Packs/Invitation_Code_Upgrade_Membership) | Scope, manual, training, and delivery pack | `06_Project_Management/Scope_and_Delivery_Packs/` | TBD | Delivery/reference set | Current | PARQ-SYS-001 | Invitation code, upgrade membership, parking scope, manuals, HTML references, PDFs, and archived scope document. |
| PARQ-PM-002 | [Migration_Campaign](06_Project_Management/Scope_and_Delivery_Packs/Migration_Campaign) | Scope, technical, manual, and training pack | `06_Project_Management/Scope_and_Delivery_Packs/` | TBD | Delivery/reference set | Current | PARQ-SYS-001 | Migration campaign scope, technical document, user manual, and training guide. |
| PARQ-QA-001 | [Guide_ Account Preparation for One Bangkok App Testing.docx](05_QA/Testing_Account_Preparation/Guide_%20Account%20Preparation%20for%20One%20Bangkok%20App%20Testing.docx) | Testing account preparation guide | `05_QA/Testing_Account_Preparation/` | TBD | Reference artifact | Current | PARQ-SYS-001 | QA setup artifact for One Bangkok app testing account preparation. |
| PARQ-PORTAL-001 | [07_Portal](07_Portal) | Stakeholder Project Hub | `07_Portal/` | Libra | Derived navigation and visualization artifact | Current Working Baseline / Portal v2 | MASTER_INDEX.md, TASK_BOARD.md, HANDOFF_LOG.md, PARQ-SOT-001, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-ARCH-007, PARQ-UX-001 | Data-driven HTML/CSS/JSON Project Hub for Product, Designer, Developer, QA, Vendor, and Management stakeholders. Top navigation is Home, Project, Discovery, Architecture, Delivery, QA, and Work by Role. Unified Project Controls covers risks, blockers, dependencies, open questions, and confirmations. |
| PARQ-MISSING-001 | `[Proposal] The PARQ integration.pdf` | Superseded missing-source tracker | Resolved by `PARQ-SOT-005` | Libra | Missing source artifact tracker | Superseded / Resolved | PARQ-SOT-005, PARQ-REVIEW-001, PARQ-ARCH-001, PARQ-SOT-002 | Resolved on 2026-06-11 after Bas confirmed the proposal PDF at `01_Source_of_Truth/API_and_System_References/00_2025_Document/[Proposal] The PARQ integration.pdf`. |

## Classified PARQ Architecture Document

| Field | Classification |
|---|---|
| Document | `03_Architecture/PARQ_User_Flow_Integration_Architecture.md` |
| Document type | Integration architecture and dependency mapping |
| Business area | PARQ Phase 1 integration |
| Folder location | `03_Architecture/` |
| Source-of-truth status | Derived artifact |
| Primary upstream source | `01_Source_of_Truth/PARQ_User_Flow/The_PARQ_Phase_1_User_Flow_Index.xlsx` |
| Related source sets | Workplace domain references, Parking domain references, OBK API/system references |
| Owner | TBD |
| Review owner | TBD |

## Upstream Dependencies: PARQ-ARCH-001

| Dependency | Type | Location / Status |
|---|---|---|
| PARQ Phase 1 user-flow index | Source artifact | `01_Source_of_Truth/PARQ_User_Flow/` |
| Bas PARQ to-be flowboard | Source/reference artifact | `01_Source_of_Truth/API_and_System_References/00_2025_Document/User Flow_20260608.pdf` |
| Bas offboarding lifecycle visual | Source/reference artifact | `01_Source_of_Truth/PARQ_User_Flow/Offboarding_User_Flow.png` |
| Workplace domain references | Source/reference set | `01_Source_of_Truth/Domain_References/Workplace_Feature/` |
| Parking domain references | Source/reference set | `01_Source_of_Truth/Domain_References/Parking_Feature/` |
| OBK IAM / SSO / third-party API references | Source/reference set | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` |
| BMS member API reference | Source/reference artifact | `01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md` |
| Add Identity flow with BMS checkMember | Source/reference artifact | `01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md` |
| Conversation clarifications / clarification note | Clarification source | Missing standalone artifact; add when available. |
| `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md` | Traceability shell | Created to track unavailable clarification source content and open questions. |
| `[Proposal] The PARQ integration.pdf` | Proposal source | Available at `01_Source_of_Truth/API_and_System_References/00_2025_Document/[Proposal] The PARQ integration.pdf`; registered as `PARQ-SOT-005`. |
| External API/spec ownership | External dependency | Platform/service ownership confirmed for IAM, BMS, FS/Iviva, BZB, Argento, CMS, Kafka/Event Bus, Notification, Elevator, and Turnstile. Named human contact persons are still required for SIT/UAT escalation. |

## Downstream Dependencies: PARQ-ARCH-001

| Downstream Artifact / Workstream | Dependency Use |
|---|---|
| PARQ technical documentation | Uses integration matrix, dependency mapping, sequence diagram candidates, and open risks. |
| PARQ data/API/vendor architecture | Uses source user-flow IDs, integration architecture decisions, proposal gap analysis, data ownership, API inventory, context boundaries, and vendor dependencies. |
| PARQ sequence diagrams | Uses P1/P2 sequence diagram candidate list and included Mermaid diagrams. |
| SIT/UAT/PVT planning | Uses environment dependencies and failure cases. |
| Vendor/API contract follow-up | Uses missing ownership and open dependency list. |
| Parking payment support model | Uses Argento, FS/Iviva, OBK Backend, idempotency, reconciliation, and refund dependencies. |
| Visitor pass support model | Uses OBK Backend, FS visitor authorization, CMS visibility, QR, turnstile, and elevator dependencies. |
| Workplace access support model | Uses FS authorization, QR, tower/floor authorization, elevator, turnstile, and outage/fallback risks. |
| Notification segmentation and cleanup | Uses IAM/persona segmentation and permanent-delete event dependency. |
| Security/compliance artifact set | Uses PII, consent, audit, deletion, encryption, and retention open points. |
| Load testing plan | Uses external dependency, rate-limit, mock, latency, and hardware-readiness notes. |
| Technical dependency control | Uses vendor/API ownership gaps, PII/consent gaps, error catalog baseline, SIT/UAT/PVT environment readiness dependencies, and required decision list from `PARQ-ARCH-005`. |
| Visual architecture review | Uses diagram-first context, boundary, dependency, data/persona, sequence, and risk views from `PARQ-ARCH-006` for stakeholder review and SIT/UAT planning orientation. |
| BMS impact assessment | Uses BMS source/reference artifacts to assess current member-check behavior and record Option B non-blocking PARQ to-be login impact. |
| BMS identity decision follow-up | Uses `PARQ-ARCH-007` to track remaining technical controls for the approved non-blocking login dependency. |
| Stakeholder portal | Uses indexed source, discovery, architecture, delivery, QA, task, handoff, risk, dependency, and open-question artifacts to provide visual navigation and confirmation tracking without changing approved artifact content. |
| QA readiness planning | Uses `PARQ-ARCH-008` to start environment dependency, contact-request, test-data request, and system readiness registers while preserving blockers for detailed SIT/UAT execution planning. |
| Developer technical review | Uses `PARQ-ARCH-009` to review Molly UX update impacts with blockers before final implementation design. |
| Quinn QA readiness update | Uses `PARQ-ARCH-009` to add parking property/location, ticket property routing, notification scope, multi-tower context, CMS view-only/RBAC, lifecycle timing, and BMS no-change inputs to the readiness register. |

## Duplicate / Outdated Document Check

| Check | Result | Action |
|---|---|---|
| Exact duplicate | No exact duplicate identified in current repository scan. | None. |
| Near duplicate | `02_Discovery/PARQ_Integration_Architecture_Review.md` overlaps with `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`, but it is a review/gap-analysis input. | Keep as `Reference`; do not treat as source of truth. |
| Superseded artifact | None confirmed. | Reassess after owners confirm whether the review file is historical only. |
| Missing source artifact | `[Proposal] The PARQ integration.pdf` was previously missing and is now available. | Mark `PARQ-MISSING-001` and `OQ-CLAR-001` as resolved/superseded by `PARQ-SOT-005`. |
| Missing clarification artifact | Conversation clarifications are referenced but source content is not stored. | Traceability shell created at `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; add source content when available. |
| Bas flowboard source | `User Flow_20260608.pdf` is now confirmed by Bas as PARQ to-be UX/business flow reference. | Keep indexed as `PARQ-SOT-003`; downstream Discovery should use it with `PARQ-SOT-001`. |
| Bas offboarding lifecycle source | `Offboarding_User_Flow.png` is now copied into `01_Source_of_Truth/PARQ_User_Flow/`. | Keep indexed as `PARQ-SOT-004`; use it to split UF-004 lifecycle into company offboarding, delete, hard delete, and reactivation. |
| Owner confirmation | Platform/service ownership is confirmed for key systems; many artifact owners and named human escalation contacts remain `TBD`. | Keep named human contact gaps visible until SIT/UAT escalation contacts are confirmed. |
| Discovery review status | `02_Discovery/PARQ_Integration_Architecture_Review.md` cannot be confirmed as historical-only or active reference from repository files alone. | Keep as open question. |
| BMS to-be login behavior | PARQ selected Option B non-blocking login refresh. Exact endpoint/payload, timeout/circuit-breaker, previous-permission cache/source, support path, and audit controls remain open. | Track remaining technical questions in Simon architecture artifacts and Quinn planning inputs. |
| QA readiness after Bas confirmations | Architecture is ready for QA readiness/environment dependency register planning, but not for final SIT/UAT execution planning. | Use `PARQ-ARCH-008` as the latest Simon readiness assessment. |
| Molly UX update architecture impact | Parking, multi-tower, CMS, notification, and lifecycle updates introduce targeted architecture changes; BMS Option B remains valid. | Use `PARQ-ARCH-009` before developer technical review and Quinn readiness updates. |


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

## Missing Artifact Recommendations

| Recommended Artifact | Reason |
|---|---|
| PARQ clarification note / decision log | Current architecture document references clarifications that are not independently traceable. |
| External API/spec folder for PARQ vendors | Platform/service ownership is confirmed, but explicit API specs and named escalation contacts are still needed for SSO/IAM, FS/Iviva, BZB, Argento, CMS, Kafka/Event Bus, Notification, Elevator, and Turnstile. |
| PARQ PII and consent matrix | Needed for security, compliance, BZB/FS/Argento data sharing, and account deletion behavior. |
| PARQ integration error catalog | Needed for consistent mobile behavior, support, and testing. |
| PARQ environment readiness tracker | Needed for SIT/UAT/PVT coverage across SSO, IAM, FS, BZB, CMS, Argento, elevator, and turnstile. |
| PARQ payment reconciliation/refund runbook | Needed because parking payment depends on Argento callbacks, OBK Backend records, and FS/Iviva final ticket status. |
| PARQ access outage/fallback runbook | Needed for QR, turnstile, elevator, and FS availability scenarios. |

## Traceability Run Log

| Date | Owner | Input Files | Output File Path | Status | Downstream Consumer |
|---|---|---|---|---|---|
| 2026-06-10 | Libra | `AGENTS.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`; `02_Discovery/PARQ_Integration_Architecture_Review.md` | `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | Complete with open questions | PARQ Orchestrator; Simon / Senior Solution Architect; Molly / Assistant PO; Quinn / QA Lead; project leads responsible for owner/source confirmation |
| 2026-06-10 | Simon | `AGENTS.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`; `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`; `02_Discovery/PARQ_Integration_Architecture_Review.md`; `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md` | `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`; `MASTER_INDEX.md`; `HANDOFF_LOG.md` | Complete with open questions | Quinn / QA Lead; PARQ Orchestrator; Libra / Project Librarian; Simon / Senior Solution Architect |
| 2026-06-10 | Simon | `AGENTS.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`; `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`; `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`; `02_Discovery/PARQ_Integration_Architecture_Review.md`; `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md` | `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`; `MASTER_INDEX.md`; `HANDOFF_LOG.md` | Complete with open questions | Quinn / QA Lead; PARQ Orchestrator; Libra / Project Librarian; non-technical stakeholders |
| 2026-06-10 | Libra | `01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md`; `01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; related architecture artifacts | `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; related architecture traceability notes | Complete with open question | Simon / Senior Solution Architect; PARQ Orchestrator; Quinn / QA Lead; Molly / Assistant PO; Libra / Project Librarian |
| 2026-06-10 | Simon | `AGENTS.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md`; `01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md`; `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`; `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`; `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`; `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`; `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md` | `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | Complete with open decision; superseded by later Option B non-blocking decision row | PARQ Orchestrator; Simon / Senior Solution Architect; Molly / Assistant PO; Quinn / QA Lead; Libra / Project Librarian |
| 2026-06-10 | Simon | `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`; `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`; `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`; `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`; `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`; `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md` | Same files plus `MASTER_INDEX.md`, `TASK_BOARD.md`, `HANDOFF_LOG.md` | Complete with Option B non-blocking decision and open technical questions | PARQ Orchestrator; Simon / Senior Solution Architect; Molly / Assistant PO; Quinn / QA Lead; Libra / Project Librarian |
| 2026-06-11 | Libra | `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; source/discovery/architecture/delivery/QA markdown artifacts; existing `07_Portal/` files | `07_Portal/`; `07_Portal/data/diagrams.json`; `07_Portal/data/confirmation_required.json`; `07_Portal/README.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | Complete with confirmation items | Product Team; Business Team; Vendor Team; Management; PARQ Orchestrator; Bas for confirmation items |
| 2026-06-11 | Libra | Approved Portal v2 design request; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `07_Portal/`; portal JSON data files; source/discovery/architecture/delivery/QA artifacts | `07_Portal/index.html`; `07_Portal/project.html`; `07_Portal/discovery.html`; `07_Portal/architecture.html`; `07_Portal/delivery.html`; `07_Portal/qa.html`; `07_Portal/work-by-role.html`; `07_Portal/project-controls.html`; `07_Portal/architecture-diagrams.html`; `07_Portal/data/project-hub.json`; `07_Portal/data/project-controls.json`; `07_Portal/data/role-access.json`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | Complete with confirmation item | Product Team; Designer; Developer; QA; PARQ Orchestrator; Bas for Current Gate wording confirmation |
| 2026-06-11 | Molly | `User Flow_20260608.pdf`; `Offboarding_User_Flow.png`; Bas clarification answers; `PARQ_UX_Stakeholder_User_Flow_Pack.md`; `PARQ_Clarification_Decision_Log.md` | `01_Source_of_Truth/PARQ_User_Flow/Offboarding_User_Flow.png`; `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md`; `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; `MASTER_INDEX.md`; `02_Discovery/README.md`; portal data files | Complete with open naming/timing questions | Libra; PARQ Orchestrator; UX/UI; Simon; Quinn |
| 2026-06-11 | Molly | Bas UX review comments; `Knowledge Transfer Document - Parking.docx`; `Parking - [Mobile] Parking Ticket.pdf`; `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md`; `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md` | `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md`; `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; `07_Portal/data/diagrams.json`; `07_Portal/data/open-questions.json`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | Complete with open parking/tower/notification questions | Libra; UX/UI; Simon; Quinn; PARQ Orchestrator |
| 2026-06-11 | Libra | Bas confirmations for Current Gate wording, PARQ User Flow Google Sheet, proposal PDF availability, and platform/service ownership; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `PARQ_Clarification_Decision_Log.md`; portal data files | `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; `07_Portal/data/` | Complete; resolved confirmation/missing-source items | Product Team; Designer; Developer; QA; Simon; Quinn; PARQ Orchestrator |
| 2026-06-11 | Simon | `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md`; `PARQ_Clarification_Decision_Log.md`; architecture packs; `PARQ_UX_Stakeholder_User_Flow_Pack.md`; Bas confirmations recorded by Libra | `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | Complete / Ready for Quinn readiness planning with blockers | Quinn / QA Lead; PARQ Orchestrator; Libra; Simon; Molly |
| 2026-06-11 | Simon | `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md`; `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; architecture packs; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | `03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md`; `MASTER_INDEX.md`; `TASK_BOARD.md`; `HANDOFF_LOG.md` | Complete / Developer review go with blockers | Developer technical reviewers; Quinn / QA Lead; PARQ Orchestrator; Libra; Molly; Simon |
