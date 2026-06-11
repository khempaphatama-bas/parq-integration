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
| PARQ-SOT-001 | [The_PARQ_Phase_1_User_Flow_Index.xlsx](01_Source_of_Truth/PARQ_User_Flow/The_PARQ_Phase_1_User_Flow_Index.xlsx) | User-flow index | `01_Source_of_Truth/PARQ_User_Flow/` | TBD | Source of truth | Current | PARQ-ARCH-001, PARQ-REVIEW-001 | Primary source for PARQ Phase 1 feature IDs and user-flow IDs. |
| PARQ-SOT-002 | [PARQ_Clarification_Decision_Log.md](01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md) | Clarification and decision traceability log | `01_Source_of_Truth/Clarifications/` | Libra | Traceability shell | BMS Decision Recorded / Open Questions | PARQ-ARCH-001, PARQ-REVIEW-001, PARQ-ARCH-004, PARQ-ARCH-007 | Records BMS Option B non-blocking login decision while keeping missing proposal/clarification source, owner, and technical control questions open. |
| PARQ-ARCH-001 | [PARQ_User_Flow_Integration_Architecture.md](03_Architecture/PARQ_User_Flow_Integration_Architecture.md) | Integration architecture and dependency mapping | `03_Architecture/` | TBD | Derived artifact | Current | PARQ-SOT-001, PARQ-REVIEW-001, PARQ-DOM-001, PARQ-DOM-002 | Maps user flows to systems, APIs, dependencies, failure cases, sequence diagram candidates, and residual architecture risks. |
| PARQ-ARCH-004 | [PARQ_Data_API_Context_Boundary_Vendor_Matrix.md](03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md) | Data ownership, API inventory, context, boundary, and vendor dependency architecture | `03_Architecture/` | TBD | Derived artifact | Current | PARQ-SOT-001, PARQ-ARCH-001, PARQ-REVIEW-001 | Defines data ownership matrix, API inventory, context diagram, system boundary diagram, and external vendor dependency matrix. |
| PARQ-ARCH-005 | [PARQ_Technical_Dependency_Control_Pack.md](03_Architecture/PARQ_Technical_Dependency_Control_Pack.md) | Technical dependency control pack | `03_Architecture/` | Simon | Derived artifact | Draft / Open Questions | PARQ-SOT-001, PARQ-SOT-002, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-REVIEW-001 | Provides vendor/API ownership matrix, PII and consent matrix, integration error catalog baseline, SIT/UAT/PVT environment readiness matrix, and technical risk/decision list for Quinn, PARQ, and Libra. |
| PARQ-ARCH-006 | [PARQ_Visual_Architecture_and_Flow_Pack.md](03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md) | Visual architecture and flow pack | `03_Architecture/` | Simon | Derived artifact | Draft / Open Questions | PARQ-SOT-001, PARQ-SOT-002, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-REVIEW-001 | Diagram-first architecture artifact with context, boundary, dependency, data/persona, priority sequence, and visual risk diagrams for non-technical stakeholder review and Quinn planning input. |
| PARQ-ARCH-007 | [PARQ_BMS_Identity_Flow_Impact_Assessment.md](03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md) | BMS identity flow impact assessment | `03_Architecture/` | Simon | Derived artifact | Draft / Option B Non-Blocking Decision Recorded | PARQ-SYS-002, PARQ-SYS-003, PARQ-SOT-002, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-UX-001 | Assesses current BMS member-check behavior, records PARQ decision for Option B non-blocking login refresh, and keeps endpoint, timeout, cache, mutation, support, PII, and audit questions open. |
| PARQ-REVIEW-001 | [PARQ_Integration_Architecture_Review.md](02_Discovery/PARQ_Integration_Architecture_Review.md) | Architecture review / gap analysis | `02_Discovery/` | TBD | Reference artifact | Reference | PARQ-SOT-001, PARQ-ARCH-001 | Review and gap analysis based on proposal context and the user-flow index. |
| PARQ-UX-001 | [PARQ_UX_Stakeholder_User_Flow_Pack.md](02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md) | UX stakeholder user-flow pack | `02_Discovery/` | Molly | Derived artifact | Draft / Open Questions | PARQ-SOT-001, PARQ-ARCH-001, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-SOT-002 | Journey-first stakeholder flow artifact for UX/UI and decision review; used by BMS impact assessment for downstream UX impacts. |
| PARQ-DOM-001 | [Workplace_Feature](01_Source_of_Truth/Domain_References/Workplace_Feature) | Workplace domain reference set | `01_Source_of_Truth/Domain_References/` | TBD | Source/reference set | Current | PARQ-ARCH-001 | Related to workplace persona, floors, tower context, QR, elevator, and turnstile flows. |
| PARQ-DOM-002 | [Parking_Feature](01_Source_of_Truth/Domain_References/Parking_Feature) | Parking domain reference set | `01_Source_of_Truth/Domain_References/` | TBD | Source/reference set | Current | PARQ-ARCH-001 | Related to parking availability, parking ticket, traffic monitoring, payment, redemption, and FS/Iviva behavior. |
| PARQ-SYS-001 | [00_2025_Document](01_Source_of_Truth/API_and_System_References/00_2025_Document) | OBK API and system reference set | `01_Source_of_Truth/API_and_System_References/` | TBD | Source/reference set | Current | PARQ-ARCH-001, PARQ-QA-001, PARQ-SYS-002, PARQ-SYS-003 | Contains IAM, SSO, BMS, third-party API, profile, OTP, notification, FAQ, live chat, membership, and account lifecycle reference documents. |
| PARQ-SYS-002 | [api-members-by-account-id.md](01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md) | BMS member API reference | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` | TBD | Source/reference artifact | Current | PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-SYS-003 | Documents BMS `GET /members/by-account-id`, including account ID header, member response fields, tenant information, and `BMS_MEMB_001` missing-account error. |
| PARQ-SYS-003 | [add_identity_flow.md](01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md) | IAM add-identity flow with BMS member check | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` | TBD | Source/reference artifact | Current | PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-SYS-002 | Documents current Add Identity create flow. BMS `checkMember` is used for new identities to create `fs` external identity when a member is found and not bound to another account. |
| PARQ-ARCH-002 | [Connect_X_Integration_Analytic](03_Architecture/Connect_X_Integration_Analytic) | Integration technical document set | `03_Architecture/` | TBD | Derived/reference set | Current | PARQ-SYS-001 | Connect X analytics scope and technical documents. |
| PARQ-ARCH-003 | [Connect_X_Integration_Live_Chat_FAQ_Notification](03_Architecture/Connect_X_Integration_Live_Chat_FAQ_Notification) | Integration technical document set | `03_Architecture/` | TBD | Derived/reference set | Current | PARQ-SYS-001 | Connect X live chat, FAQ, email OTP, and notification scope/technical documents. |
| PARQ-PM-001 | [Invitation_Code_Upgrade_Membership](06_Project_Management/Scope_and_Delivery_Packs/Invitation_Code_Upgrade_Membership) | Scope, manual, training, and delivery pack | `06_Project_Management/Scope_and_Delivery_Packs/` | TBD | Delivery/reference set | Current | PARQ-SYS-001 | Invitation code, upgrade membership, parking scope, manuals, HTML references, PDFs, and archived scope document. |
| PARQ-PM-002 | [Migration_Campaign](06_Project_Management/Scope_and_Delivery_Packs/Migration_Campaign) | Scope, technical, manual, and training pack | `06_Project_Management/Scope_and_Delivery_Packs/` | TBD | Delivery/reference set | Current | PARQ-SYS-001 | Migration campaign scope, technical document, user manual, and training guide. |
| PARQ-QA-001 | [Guide_ Account Preparation for One Bangkok App Testing.docx](05_QA/Testing_Account_Preparation/Guide_%20Account%20Preparation%20for%20One%20Bangkok%20App%20Testing.docx) | Testing account preparation guide | `05_QA/Testing_Account_Preparation/` | TBD | Reference artifact | Current | PARQ-SYS-001 | QA setup artifact for One Bangkok app testing account preparation. |
| PARQ-PORTAL-001 | [07_Portal](07_Portal) | Stakeholder Project Hub | `07_Portal/` | Libra | Derived navigation and visualization artifact | Current Working Baseline / Portal v2 | MASTER_INDEX.md, TASK_BOARD.md, HANDOFF_LOG.md, PARQ-SOT-001, PARQ-ARCH-001, PARQ-ARCH-004, PARQ-ARCH-005, PARQ-ARCH-006, PARQ-ARCH-007, PARQ-UX-001 | Data-driven HTML/CSS/JSON Project Hub for Product, Designer, Developer, QA, Vendor, and Management stakeholders. Top navigation is Home, Project, Discovery, Architecture, Delivery, QA, and Work by Role. Unified Project Controls covers risks, blockers, dependencies, open questions, and confirmations. |
| PARQ-MISSING-001 | `[Proposal] The PARQ integration.pdf` | Proposal source artifact | Not found in repository | TBD | Missing source artifact | Unavailable | PARQ-REVIEW-001, PARQ-ARCH-001, PARQ-SOT-002 | Repository scan on 2026-06-10 found other PDFs but did not find this proposal PDF. Must be uploaded or linked before it can be classified as source of truth. |

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
| Workplace domain references | Source/reference set | `01_Source_of_Truth/Domain_References/Workplace_Feature/` |
| Parking domain references | Source/reference set | `01_Source_of_Truth/Domain_References/Parking_Feature/` |
| OBK IAM / SSO / third-party API references | Source/reference set | `01_Source_of_Truth/API_and_System_References/00_2025_Document/` |
| BMS member API reference | Source/reference artifact | `01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md` |
| Add Identity flow with BMS checkMember | Source/reference artifact | `01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md` |
| Conversation clarifications / clarification note | Clarification source | Missing standalone artifact; add when available. |
| `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md` | Traceability shell | Created to track unavailable clarification source content and open questions. |
| `[Proposal] The PARQ integration.pdf` | Proposal source | Missing from repository scan on 2026-06-10; add or link when available. |
| External API/spec ownership | External dependency | SSO, IAM, FS, BZB, Argento, CMS, Kafka/Event Bus, elevator, and turnstile owners still TBD. |

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

## Duplicate / Outdated Document Check

| Check | Result | Action |
|---|---|---|
| Exact duplicate | No exact duplicate identified in current repository scan. | None. |
| Near duplicate | `02_Discovery/PARQ_Integration_Architecture_Review.md` overlaps with `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`, but it is a review/gap-analysis input. | Keep as `Reference`; do not treat as source of truth. |
| Superseded artifact | None confirmed. | Reassess after owners confirm whether the review file is historical only. |
| Missing source artifact | `[Proposal] The PARQ integration.pdf` is referenced but not present. | Add/link source artifact or mark unavailable. |
| Missing clarification artifact | Conversation clarifications are referenced but source content is not stored. | Traceability shell created at `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`; add source content when available. |
| Owner confirmation | Most indexed folders/documents still have `TBD` or role-level owners only. | Keep owner gaps visible until named owners confirm. |
| Discovery review status | `02_Discovery/PARQ_Integration_Architecture_Review.md` cannot be confirmed as historical-only or active reference from repository files alone. | Keep as open question. |
| BMS to-be login behavior | PARQ selected Option B non-blocking login refresh. Exact endpoint/payload, timeout/circuit-breaker, previous-permission cache/source, support path, and audit controls remain open. | Track remaining technical questions in Simon architecture artifacts and Quinn planning inputs. |

## Missing Artifact Recommendations

| Recommended Artifact | Reason |
|---|---|
| PARQ clarification note / decision log | Current architecture document references clarifications that are not independently traceable. |
| External API/spec folder for PARQ vendors | SSO, IAM, FS, BZB, Argento, CMS, and hardware dependencies need explicit source docs and owners. |
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
