# PARQ Architecture Impact Assessment From Molly UX Update

Owner: Simon / Senior Solution Architect

Input files:
- `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md`
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`
- `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`
- `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`
- `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`
- `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`

Output file path: `03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md`

Status: Draft / Architecture impact assessed from Molly UX update

Downstream consumer:
- PARQ / Orchestrator for dependency tracking
- Quinn / QA Lead for QA readiness planning inputs
- Developer technical reviewers for implementation impact review
- Libra / Project Librarian for indexing
- Molly / Assistant PO for UX/business open-question alignment

Rules applied:
- No new requirements are created.
- No API fields, endpoint behavior, contacts, SLAs, or timelines are invented.
- No QA scenarios, UAT scenarios, user stories, or acceptance criteria are created.
- Missing information remains open questions.

## 1. Executive Summary

Molly's latest UX/stakeholder flow update introduces meaningful architecture impact in parking, multi-property context, CMS visibility, and account lifecycle. It does not change the previously approved BMS Option B non-blocking login assumption.

Developer technical review can start with constraints. The review should focus on property/location routing, FS/API separation, parking ticket property detection, feature-capability gating, tower-context persistence, CMS read-only metadata exposure, and lifecycle state handling.

Go/no-go:

| Review Area | Go / No-Go | Rationale |
|---|---|---|
| Developer technical review | Go with blockers | There is enough architecture direction to review implementation impact, but API contracts and fallback rules are still open. |
| Final implementation design | No-go | Several cross-system decisions remain open: property/location identifiers, FS parking data shape, ticket property detection, payment reconciliation, tower lock rules, CMS RBAC/data isolation, lifecycle timing, and BMS fallback controls. |
| Quinn QA readiness planning | Go for dependency/register planning | Quinn can add new dependency rows and data requests from this assessment, but should not finalize scenarios or expected results. |

## 2. Impact Area Assessment

### 2.1 Parking Availability

| Dimension | Assessment |
|---|---|
| Architecture impact | Parking Availability must become property/location-aware. The user-selected location is now an explicit input, with Phase 1 options One Bangkok and The PARQ. The architecture must not assume current-location detection or a single parking availability feed. |
| API/data dependency impact | FS/API data must separate availability by property/location, floor, timestamp, total spots, and stale/unavailable state. Existing architecture already identifies `Property/location ID, zone ID, timestamp`, but needs sharper distinction between One Bangkok availability and The PARQ availability. No new field names should be invented until FS confirms contract. |
| Sequence diagram impact | UF-010 Parking Availability sequence should add user-selected location before availability lookup, then branch to One Bangkok versus The PARQ data retrieval. Stale/unavailable response path should be explicit. |
| QA readiness impact | Quinn can start readiness rows for property/location test data, floor labels, stale data handling, and refresh timing. Quinn must wait for FS refresh interval, stale threshold, property identifiers, and floor mapping. |
| Open questions | What FS/API property/location identifier represents One Bangkok and The PARQ? What are PARQ floor labels and default tab? What is refresh interval and stale threshold? How should additional Fraser property buildings scale later? |
| Recommended next owner | Simon for architecture update; FS/Iviva owner for API contract; Molly/Product for labels and display behavior; Quinn for readiness register. |

### 2.2 Parking Ticket and Payment

| Dimension | Assessment |
|---|---|
| Architecture impact | Parking Ticket must detect ticket property and route accordingly: One Bangkok tickets to existing live OBK flow, The PARQ tickets to The PARQ-specific rate/capability flow. This adds a routing decision before fee/payment handling. The PARQ flow must suppress unsupported One Bangkok-only capabilities such as VIP Parking. |
| API/data dependency impact | Ticket lookup/import must return or derive property ownership. The PARQ rate source, park/floor mapping, capability list, and payment/reconciliation rules are still open. Existing Argento + OBK Backend + FS/Iviva payment architecture remains valid, but property-specific ticket handling must be added. |
| Sequence diagram impact | UF-012 sequence should add property detection after active/imported ticket retrieval, branch to existing OBK flow for One Bangkok, branch to The PARQ flow for PARQ ticket, and include cannot-detect retry/support path. Unsupported capability gating should be represented as UI/capability filtering, not payment logic. |
| QA readiness impact | Quinn can start dependency rows for ticket property detection, The PARQ rate source, unsupported capability list, reconciliation fallback, and concierge/support fallback. Quinn must wait for ticket property detection contract, rate source, mapping, and reconciliation rules. |
| Open questions | How does the system detect ticket property? What is The PARQ parking rate source? What is park/floor mapping? Does My QR at PARQ parking gate create/import a ticket? Which One Bangkok-only capabilities besides VIP Parking are hidden? What payment reconciliation fallback applies when payment succeeds but FS sync fails? |
| Recommended next owner | Simon for UF-012 architecture update; FS/Iviva and OBK Backend for ticket/rate/property contract; Argento for payment callback/refund details; Molly/Product for unsupported capability display; Quinn for readiness register. |

### 2.3 Notification

| Dimension | Assessment |
|---|---|
| Architecture impact | Existing notification architecture remains valid with a tighter Phase 1 boundary: only existing OBK notification mechanism is used. The PARQ CMS campaign/news and Workplace-specific PARQ building news are out of Phase 1 and should not be treated as CMS notification integration scope. |
| API/data dependency impact | Notification segmentation still uses existing OBK notification infrastructure, IAM/persona/audience logic, device tokens, inbox state, and cleanup via account lifecycle events. The exact basic/login/system and marketing categories for migrated PARQ users remain open. |
| Sequence diagram impact | UF-014 sequence should show existing OBK notification event and delivery path only. It should explicitly exclude The PARQ CMS campaign/news path from Phase 1 if diagrammed. Account deletion cleanup remains linked to Kafka/Event Bus and Notification cleanup. |
| QA readiness impact | Quinn can start readiness rows for existing OBK notification mechanism, migrated PARQ audience eligibility, device token/inbox cleanup, and marketing consent dependency. Quinn must wait for final notification categories and consent behavior. |
| Open questions | Which basic/login/system notification categories apply to migrated PARQ users? What marketing opt-in/consent behavior applies? Is any user-facing/support message needed to say The PARQ building news remains in the existing The PARQ app during early phase? |
| Recommended next owner | Notification infrastructure owner for delivery/cleanup details; IAM owner for persona/audience source; Molly/Product for category and message boundaries; Quinn for readiness register. |

### 2.4 Multi-Tower

| Dimension | Assessment |
|---|---|
| Architecture impact | Multi-tower support now requires explicit tower context persistence and validation: saved last-selected tower, manual tower switching, and users with rights across One Bangkok and The PARQ. Hardware journeys must lock or constrain tower switching while elevator/access flows are active. |
| API/data dependency impact | IAM/FS must expose or persist authorized building/tower list and selected tower context. FS remains authority for tower/floor permissions. The architecture must avoid treating a tower label as only display text; it affects elevator, turnstile, QR/access, and parking context. |
| Sequence diagram impact | UF-006 sequence should include retrieve authorized tower/building list, load saved selected tower if valid, manual switch path, invalid saved tower path, and hardware journey lock path. UF-015/UF-016 should consume selected tower context. |
| QA readiness impact | Quinn can start readiness rows for users with one tower, multiple One Bangkok towers, The PARQ, and cross-property rights. Quinn must wait for tower identifiers, labels, saved-context storage location, invalidation rules, and hardware journey lock behavior. |
| Open questions | Where is last-selected tower stored? What invalidates saved tower? What are final labels for One Bangkok towers and The PARQ? What exact rule blocks tower switching during active elevator/access journey? How are users with rights across One Bangkok and The PARQ represented in FS/IAM metadata? |
| Recommended next owner | Simon for multi-tower architecture update; IAM/FS owners for tower metadata and persistence; Molly/Product for labels/copy; Quinn for readiness register. |

### 2.5 CMS Multi-Property User Management

| Dimension | Assessment |
|---|---|
| Architecture impact | CMS Phase 1 is now constrained to view-only metadata for persona/company/property/tower/status. No persona metadata editing should be assumed in Phase 1. This reduces write-scope but increases read-scope and data isolation risk. |
| API/data dependency impact | CMS must read metadata from IAM/OBK Backend/FS/BZB-derived sources without becoming source of truth. Metadata edit APIs should not be introduced or exposed for Phase 1 based on current source. RBAC/data isolation remains a blocker because seed admin / broad admin visibility may expose cross-property user details. |
| Sequence diagram impact | UF-007 CMS sequence should show read-only user lookup/detail and metadata view. It should not show edit/update persona metadata in Phase 1. |
| QA readiness impact | Quinn can start readiness rows for CMS read-only visibility and access-control dependencies. Quinn must wait for filter scope, admin visibility rules, org/property isolation, seed account controls, and audit logging. |
| Open questions | Which CMS filters are Phase 1: property, persona, company, status, tower? Can all admins view cross-property user details in production? What compensating controls apply if RBAC/org filtering is not included? Is admin access audited? |
| Recommended next owner | CMS owner for view/API scope; Security/PARQ for RBAC/data isolation acceptance; Simon for boundary update; Quinn for readiness register. |

### 2.6 Account Lifecycle

| Dimension | Assessment |
|---|---|
| Architecture impact | Account lifecycle must clearly split company offboarding from user delete account. Company offboarding removes Workplace through FS/Fineday inactivation and app sync. User delete marks account as `Suspens`/suspended, then daily cronjob hard deletes after over 30 days, with reactivation possible before hard delete. |
| API/data dependency impact | IAM/account lifecycle must expose status and timestamp sufficient for suspended/reactivation/hard-delete decisions. FS/Fineday offboarding sync timing impacts Workplace persona removal. Kafka/Event Bus cleanup remains required for hard delete across Notification and BMS. Exact status value and timing rule remain open. |
| Sequence diagram impact | UF-004 sequence should be expanded or split into company offboarding, user delete/suspend, daily hard delete, reactivation, and cleanup event propagation. Current broad offboarding/account lifecycle sequence remains directionally valid but insufficiently detailed. |
| QA readiness impact | Quinn can start readiness rows for company offboarding, suspended status, reactivation window, hard delete cronjob dependency, and cleanup consumers. Quinn must wait for exact status naming, timing definition, sync SLA, event schema, cleanup proof, and support behavior. |
| Open questions | Is the exact status `Suspens`, `Suspended`, or another value? Does over 30 days mean Day 31, 30 full days, or a timestamp rule? What is FS/Fineday sync SLA? What is daily hard-delete job timing? Which BMS/Notification records are deleted or retained? |
| Recommended next owner | IAM owner for status/timing/reactivation; FS/Iviva or Fineday owner for offboarding sync; Kafka/Notification/BMS owners for cleanup; Molly/Product for user-facing copy; Quinn for readiness register. |

### 2.7 BMS

| Dimension | Assessment |
|---|---|
| Architecture impact | Molly's updates do not create a new BMS dependency and do not change Option B non-blocking login assumptions. BMS remains a non-blocking login refresh dependency, current sign-up/add identity member-check dependency, and cleanup consumer. |
| API/data dependency impact | No new BMS API/data dependency is introduced by the latest UX update. Existing open items remain: exact login endpoint/payload, timeout/circuit breaker, previous Workplace permission cache/source, rare bound-to-other-account support/audit path, and cleanup proof. |
| Sequence diagram impact | UF-001 BMS non-blocking login sequence remains valid. UF-004 cleanup sequence remains valid but should be expanded for lifecycle split if account lifecycle architecture is updated. |
| QA readiness impact | Quinn's BMS readiness input remains unchanged: start dependency planning, wait for endpoint/fallback/audit details before final expected results. |
| Open questions | Same as before: exact BMS login contract, retry/circuit breaker, cache/source for previous Workplace permission, rare conflict support path, PII/retention, and cleanup audit. |
| Recommended next owner | IAM/BMS owners for control design; Simon for keeping architecture alignment; Quinn for readiness register. |

## 3. Architecture Artifact Impact

| Artifact | Status After Molly UX Update | Recommended Action |
|---|---|---|
| `03_Architecture/PARQ_User_Flow_Integration_Architecture.md` | Needs update | Add property/location routing for UF-010, ticket property routing for UF-012, multi-tower saved/manual switch behavior for UF-006, CMS read-only boundary for UF-007, notification Phase 1 exclusion for PARQ CMS campaigns in UF-014, and lifecycle split for UF-004. |
| `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md` | Needs update | Add/clarify data ownership for selected parking location, ticket property, parking capability gating, selected tower context, CMS view-only metadata, and lifecycle status/timestamp. |
| `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md` | Needs update | Add dependency controls for property identifiers, rate source, unsupported capability list, tower lock/invalidation, CMS read-only/RBAC risk, notification category boundary, and lifecycle timing/status. |
| `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md` | Needs update | Update diagrams for UF-010, UF-012, UF-006, UF-007, UF-014, and UF-004. Keep BMS diagrams unchanged except where lifecycle cleanup is expanded. |
| `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md` | Remains valid | No new BMS dependency from Molly update. Keep existing open questions. |
| `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md` | Needs addendum or superseding readiness note | QA readiness remains go for dependency planning, but new parking/multi-tower/CMS/lifecycle blockers should be reflected. |
| `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md` | Source input for this impact assessment | No Simon edit required in this task. |
| `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md` | Source input / already updated by Molly | No Simon edit required unless architecture decisions are later confirmed. |

## 4. Developer Technical Review Go/No-Go

| Area | Technical Review Recommendation | Reason |
|---|---|---|
| Parking Availability | Go with blockers | Review property/location-aware availability design, but wait for FS identifiers, refresh, stale threshold, and floor labels before final design. |
| Parking Ticket and Payment | Go with blockers | Review routing and capability gating design now; wait for ticket property detection contract, PARQ rate source, reconciliation, and unsupported capability list before final implementation. |
| Notification | Go | Existing OBK mechanism remains valid; review should confirm no PARQ CMS campaign/news integration is accidentally introduced in Phase 1. |
| Multi-Tower | Go with blockers | Review selected tower persistence and hardware journey lock; wait for metadata contract, invalidation rules, and tower labels. |
| CMS Multi-Property | Go with blockers | Review read-only metadata and data isolation; wait for RBAC/seed account/filter decisions. |
| Account Lifecycle | Go with blockers | Review lifecycle split and cleanup flow; wait for exact status naming, timing, sync SLA, and event/cleanup details. |
| BMS | Go / no change | Existing BMS Option B non-blocking assumptions remain valid; no new dependency introduced. |

Overall Developer technical review: Go with blockers. Do not proceed to final implementation sign-off until open questions are resolved or formally accepted.

## 5. Input List for Quinn QA Readiness Planning

Quinn can add these readiness inputs to the dependency/register layer. This is not a QA scenario list.

| Area | Readiness Inputs Quinn Can Track |
|---|---|
| Parking Availability | Property/location options, FS availability endpoint readiness, The PARQ floor labels, refresh interval, stale threshold, temporary close state, guest/non-guest action visibility. |
| Parking Ticket and Payment | Ticket property detection readiness, One Bangkok route preservation, The PARQ route readiness, The PARQ rate source, unsupported capability list, Argento payment sandbox, FS sync, reconciliation/support fallback. |
| Notification | Existing OBK notification path, migrated PARQ audience, basic/login/system categories, marketing consent, The PARQ CMS campaign exclusion, cleanup on account deletion. |
| Multi-Tower | Authorized tower list data, saved selected tower storage, manual switching, invalid saved tower handling, cross-property rights data, hardware journey lock. |
| CMS Multi-Property | View-only metadata, filters, admin visibility, seed account restrictions, audit logging, data isolation. |
| Account Lifecycle | Company offboarding sync, suspended status naming, delete timestamp, hard-delete cron timing, reactivation window, Kafka/Event Bus cleanup, BMS/Notification cleanup proof. |
| BMS | Existing non-blocking login refresh controls, sign-up/add identity member-check readiness, timeout/circuit breaker, previous Workplace permission source/cache, cleanup proof. |

## 6. Open Questions Consolidated for Architecture Follow-Up

| ID | Open Question | Recommended Next Owner |
|---|---|---|
| OQ-ARCH-PARK-001 | What FS/API property/location identifiers represent One Bangkok and The PARQ for parking availability? | FS/Iviva owner |
| OQ-ARCH-PARK-002 | What are The PARQ parking floor labels, default tab, refresh interval, stale threshold, and temporary close data source? | FS/Iviva + Product |
| OQ-ARCH-PARK-003 | How is ticket property detected for One Bangkok versus The PARQ tickets? | OBK Backend + FS/Iviva |
| OQ-ARCH-PARK-004 | What is The PARQ parking rate source and park/floor mapping? | FS/Iviva + Parking owner |
| OQ-ARCH-PARK-005 | Which One Bangkok-only parking capabilities besides VIP Parking must be hidden for The PARQ? | Product + Parking owner |
| OQ-ARCH-PARK-006 | What reconciliation/support fallback applies when Argento payment succeeds but FS/Iviva sync fails? | OBK Backend + Argento + FS/Iviva |
| OQ-ARCH-NOTIF-001 | Which exact basic/login/system and marketing notification categories apply to migrated PARQ users? | Notification owner + Product |
| OQ-ARCH-TOWER-001 | Where is selected tower stored, and what invalidates it? | IAM/OBK Backend + FS/Iviva |
| OQ-ARCH-TOWER-002 | What is the hardware journey lock rule for tower switching? | FS/Iviva + Mobile/Backend |
| OQ-ARCH-CMS-001 | Which CMS filters and view-only metadata fields are Phase 1? | CMS owner + Product |
| OQ-ARCH-CMS-002 | What RBAC/data isolation control applies if seed admin can see cross-property user details? | CMS owner + Security/PARQ |
| OQ-ARCH-LIFE-001 | What exact system status value replaces or confirms `Suspens`? | IAM owner + Product |
| OQ-ARCH-LIFE-002 | What exact timing rule defines "deleted over 30 days"? | IAM owner |
| OQ-ARCH-LIFE-003 | What SLA applies to FS/Fineday offboarding sync and daily hard-delete job? | IAM + FS/Iviva |
| OQ-ARCH-BMS-001 | Do Molly's UX changes require any BMS behavior beyond existing Option B non-blocking login refresh? Current assessment says no. | Simon + IAM/BMS owners for confirmation |

## 7. Final Recommendation

Molly's update should trigger targeted architecture updates for UF-010, UF-012, UF-006, UF-007, UF-014, and UF-004. Existing BMS Option B non-blocking architecture remains valid.

Developer technical review can start now, with explicit blockers. Quinn can start QA readiness planning at dependency/register level, especially for property/location parking, ticket property routing, notification scope boundary, multi-tower context, CMS view-only/RBAC, and account lifecycle timing.

Final implementation design and detailed QA expected results should wait for confirmed API contracts, property/tower identifiers, timeout/fallback rules, reconciliation rules, lifecycle timing, and RBAC/data isolation decisions.
