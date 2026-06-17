# PARQ Requirement Traceability Matrix

Owner: Molly

Approver: Bas

Status: Approved / Bas Tower Context Revision Applied

Source baseline: Bas-approved Molly Traceability Matrix input baseline dated 16 Jun 2026, updated by Bas clarification on 2026-06-16 to separate Tower Context Management.

Output file: `02_Discovery/PARQ_Requirement_Traceability_Matrix.md`

Downstream consumers:
- Bas
- Developer estimation team
- Simon
- Libra
- Quinn later, after explicit PARQ QA readiness handoff

Purpose:
This artifact formalizes the Bas-approved User Flow to Epic alignment into a Requirement Traceability Matrix for The PARQ Integration to One Bangkok Application. Bas later clarified on 2026-06-16 that Tower Context Management shall be separated for the Feature Breakdown Matrix and traceability mapping. Future traceability work shall extend this approved mapping and must not recreate Epic alignment from scratch unless Bas/PARQ explicitly changes it.

Rules applied:
- No new requirements were created.
- No user stories, acceptance criteria, QA scenarios, UAT scenarios, detailed test cases, API contracts, or TDD contracts were created.
- Unknown mappings are marked open or needs confirmation.
- Phase 1 / Phase 1.5 boundary remains unchanged.

## 1. Approved Epic Alignment Table

The following table reflects the Bas-approved User Flow to Epic mapping provided on 16 Jun 2026, with the later Bas clarification on 2026-06-16 to separate Tower Context Management. This Epic alignment is the current baseline for this matrix and is not reinterpreted.

| User Flow | Epic |
|---|---|
| UF-001 Existing PARQ User Sign-in | Authentication & Account Integration |
| UF-002 Retail Account Matching & Persona Merge | Authentication & Account Integration |
| UF-003 Sign-up & User Onboarding | Authentication & Account Integration |
| UF-004 Offboarding & Account Lifecycle | Authentication & Account Integration |
| UF-005 Workplace Persona UI Integration | Workplace Persona Experience |
| UF-006 Multi-Tower Support | Tower Context Management |
| UF-007 CMS Multi-Property User Management | CMS Multi-Property User Management |
| UF-008 User Profile Management | Profile Management |
| UF-009 My QR | QR Identity |
| UF-010 Parking Availability | Parking Experience |
| UF-011 Traffic Monitoring | Parking Experience |
| UF-012 Parking Payment & Ticket | Parking Experience |
| UF-013 Visitor Pass | Visitor Pass Management |
| UF-014 Support OBK Notification for PARQ User | Notification Integration |
| UF-015 Elevator Integration | Physical Access |
| UF-016 Turnstile Access | Physical Access |

## 2. Formal Traceability Matrix

| Trace ID | Epic | User Flow ID | User Flow Name | Related Requirement / FR IDs from PARQ-REQ-001 v0.4 | Related Business Rule / Scope Note | Source Artifact | Related Discovery / UX Artifact | Related Architecture Artifact | Estimation Reference / Developer Task Reference | Open Question / Dependency | QA Readiness Note | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RTM-001 | Authentication & Account Integration | UF-001 | Existing PARQ User Sign-in | FR-AUTH-001 to FR-AUTH-007 | BR-001; BR-006; BR-007; phone wins over email; valid login may enter app if FS/BMS refresh is unavailable; BMS check uses `GET /members` with `account_id` and timeout TBD. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Existing PARQ user sign-in | PARQ-ARCH-001 UF-001; PARQ-ARCH-007; PARQ-ARCH-011; PARQ-ARCH-012 | PARQ-ARCH-012 Authentication / SSO / BMS login check; Developer breakdown IAM / SSO / Login and BMS login-time member check | OQ-BMS-001; OQ-BMS-002; BMS timeout, fallback, previous Workplace permission freshness, support copy remain open. | QA readiness can trace login, smart redirect, and non-blocking dependency behavior after explicit PARQ QA handoff; no QA scenarios created here. | Mapped with open dependencies |
| RTM-002 | Authentication & Account Integration | UF-002 | Retail Account Matching & Persona Merge | FR-MERGE-001 to FR-MERGE-006; related FR-AUTH-002 | BR-001 to BR-005; phone-first BZB lookup; email secondary; auto-merge acknowledgement cannot be denied; migrated PARQ users do not get automatic Retail creation. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Retail account matching / conflict | PARQ-ARCH-001 UF-002; PARQ-ARCH-004; PARQ-ARCH-012 | PARQ-ARCH-012 Retail/BZB matching and persona merge; Developer breakdown Retail / BZB matching and merge | BZB conflict behavior, wrong-merge correction runbook, protected profile/consent fields, and hard-delete notification behavior remain open. | QA readiness can trace normal merge and conflict dependency areas later; no test cases created here. | Mapped with open dependencies |
| RTM-003 | Authentication & Account Integration | UF-003 | Sign-up & User Onboarding | FR-SIGNUP-001 to FR-SIGNUP-009 | BR-004; brand-new registrations create Retail profile; registration can complete if FS authorization is unavailable; v0.4 flow order includes phone verification, email entry, email verification, existing email redirect, consent, required information, account with Retail profile, FS check. | PARQ-SOT-001; PARQ-SOT-003; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 New user onboarding | PARQ-ARCH-001 UF-003; PARQ-ARCH-011; PARQ-ARCH-012 | PARQ-ARCH-012 Sign-up / onboarding; Developer breakdown Sign-up and Onboarding | Field-level overwrite policy, incomplete registration cleanup, BMS/FS behavior during delayed Workplace activation, and invitation/service-code detail remain open. | QA readiness can later trace phone/email/consent/required-info order from v0.4; no QA scenarios created here. | Mapped with open dependencies |
| RTM-004 | Authentication & Account Integration | UF-004 | Offboarding & Account Lifecycle | FR-LIFE-001 to FR-LIFE-010 | BR-024 to BR-029; company offboarding removes Workplace only; account deletion applies all personas; reactivation within 30 days; Day 31 hard delete; SSO owns hard delete and BZB delete notification where required. | PARQ-SOT-001; PARQ-SOT-004; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Account lifecycle; Offboarding_User_Flow.png | PARQ-ARCH-001 UF-004; PARQ-ARCH-009; PARQ-ARCH-011; PARQ-ARCH-012 | PARQ-ARCH-012 Account Lifecycle / Delete / Reactivate; Developer breakdown Account Lifecycle / Delete / Reactivation | OQ-LIFE-001; OQ-LIFE-002; exact suspended status label, downstream cleanup consumers, BZB/BMS/Notification cleanup proof, and event audit controls remain open. | QA readiness can later trace lifecycle states and cleanup dependencies; detailed lifecycle cases are not defined here. | Mapped with open dependencies |
| RTM-005 | Workplace Persona Experience | UF-005 | Workplace Persona UI Integration | FR-WP-001 to FR-WP-007 | BR-007 to BR-010; Workplace persona appears as soon as FS type is detected; no FS type means no Workplace home; Retail home remains default unless changed; Traffic, Map, Promotion are webview quick actions. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Workplace persona activation | PARQ-ARCH-001 UF-005; PARQ-ARCH-009; PARQ-ARCH-012 | PARQ-ARCH-012 Workplace persona; Developer breakdown Workplace Persona | OQ-FS-001; OQ-FS-002; FS type contract, metadata fields, cache invalidation, and pending/error rules remain open. | QA readiness can later trace visible Workplace states and entitlement dependencies; no scenarios created here. | Mapped with open dependencies |
| RTM-006 | Tower Context Management | UF-006 | Multi-Tower Support | FR-TOWER-001 to FR-TOWER-006 | BR-011; selected tower/building context is displayed on Persona Card; permission authorization follows selected context; hardware-related journeys block switching; empty FS metadata filtered; Building and Tower are treated as the same business concept for PARQ scope. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4; PARQ-REQ-003 | PARQ-UX-001 Multi-tower context support | PARQ-ARCH-001 UF-006; PARQ-ARCH-009; PARQ-ARCH-010; PARQ-ARCH-012 | PARQ-ARCH-012 Multi-Tower / Tower Context; Developer breakdown Multi-Tower / Tower Context; PARQ-REQ-003 E10 Tower Context Management | BMS `default_floor` schema, FS mapping, App State lifecycle/invalidation, and final hardware lock rule remain open. | QA readiness can later trace context display, switching, and hardware lock dependencies; no scenarios created here. | Mapped with open dependencies |
| RTM-007 | CMS Multi-Property User Management | UF-007 | CMS Multi-Property User Management | FR-CMS-001 to FR-CMS-006 | BR-023; Phase 1 CMS metadata is view-only; no persona metadata edit; all CMS admins can view cross-property user details unless later restriction confirmed; Organization Isolation and CMS sub-menu are Phase 1.5. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 CMS multi-property user management | PARQ-ARCH-001 UF-007; PARQ-ARCH-009; PARQ-ARCH-010; PARQ-ARCH-012 | PARQ-ARCH-012 CMS Multi-Property User Management; Developer breakdown CMS Multi-Property User Management | OQ-CMS-001; OQ-CMS-002; final filters, metadata fields, Seed Account governance, access audit remain open. | QA readiness can later trace view-only and governance dependencies after explicit QA handoff; no scenarios created here. | Mapped with open dependencies |
| RTM-008 | Profile Management | UF-008 | User Profile Management | FR-PROFILE-001 to FR-PROFILE-006 | BR-011; BR-012; PARQ floor data is FS-driven and not manually set in Phase 1; OBK default floor remains as-is; missing floor shows property-relevant support state. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Profile management | PARQ-ARCH-001 UF-008; PARQ-ARCH-010; PARQ-ARCH-012 | PARQ-ARCH-012 My Profile / Default Floor; Developer breakdown My Profile / Default Floor | OQ-FS-001; OQ-FS-002; FS floor authorization contract, missing-floor support routing, and BMS/default-floor mapping remain open. | QA readiness can later trace profile metadata and default-floor behavior; no scenarios created here. | Mapped with open dependencies |
| RTM-009 | QR Identity | UF-009 | My QR | FR-QR-001 to FR-QR-007 | My QR is user identity QR; available before full company/floor authorization is loaded; may be used for turnstile and parking gate scanning; QR validity and refresh remain open. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 My QR / turnstile access | PARQ-ARCH-001 UF-009; PARQ-ARCH-012 | PARQ-ARCH-012 My QR / Access; Developer breakdown My QR / Access | OQ-QR-001; QR payload ownership, expiry/refresh, property specificity, replay behavior, and hardware outage fallback remain open. | QA readiness can later trace QR display and access-validation dependencies; no scenarios created here. | Mapped with open dependencies |
| RTM-010 | Parking Experience | UF-010 | Parking Availability | FR-PARK-001 to FR-PARK-006 | BR-013; BR-014; user selects location first; Phase 1 locations are One Bangkok and The PARQ; future Frasers Property scalability is noted but not new Phase 1 scope. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Parking availability | PARQ-ARCH-001 UF-010; PARQ-ARCH-009; PARQ-ARCH-012 | PARQ-ARCH-012 Parking Availability; Developer breakdown Parking Availability | OQ-FS-001; FS endpoint, property/location IDs, refresh interval, stale threshold, and unavailable response behavior remain open. | QA readiness can later trace selected-location availability and stale/unavailable states; no scenarios created here. | Mapped with open dependencies |
| RTM-011 | Parking Experience | UF-011 | Traffic Monitoring | FR-WP-006; open: no dedicated Traffic FR in PARQ-REQ-001 v0.4 | Phase 1 quick action for PARQ Traffic is webview-based per Workplace persona scope; detailed integration source/SLA remains unspecified. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Traffic monitoring | PARQ-ARCH-001 UF-011; PARQ-ARCH-012 sequence addendum list does not prioritize UF-011 beyond dependency awareness | Developer task reference open; no dedicated row in developer breakdown other than webview quick actions under Workplace Persona and cross-cutting support | Open / needs confirmation if a dedicated Traffic FR or developer estimation row is required; FS traffic SLA and fallback remain open. | QA readiness can later trace webview quick action and data-source dependency only; no scenarios created here. | Mapped with unclear FR granularity |
| RTM-012 | Parking Experience | UF-012 | Parking Payment & Ticket | FR-PARK-007 to FR-PARK-015 | BR-015 to BR-020; ticket property detection routes OBK as-is vs The PARQ; The PARQ hides unsupported OBK-only features; QR PromptPay is Phase 1; user self-redemption and OBK CMS management of PARQ redemption are excluded. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Parking ticket and payment | PARQ-ARCH-001 UF-012; PARQ-ARCH-009; PARQ-ARCH-010; PARQ-ARCH-012 | PARQ-ARCH-012 Parking Ticket and QR PromptPay Payment; Developer breakdown Parking Ticket and QR PromptPay Payment | OQ-PARK-001 to OQ-PARK-004; FS `park_syscode` and `park_name`, PARQ rate source, Argento callback/status/reconciliation/refund/support, paid-but-not-synced handling remain blockers. | QA readiness can later trace payment/routing dependencies; final payment validation is blocked by owner confirmations. | Mapped with blockers |
| RTM-013 | Visitor Pass Management | UF-013 | Visitor Pass | FR-VISITOR-001 to FR-VISITOR-005 | Visitor pass uses host identity, property/tower context, visitor details, validity period, and FS/access validation; visitor pass and parking ticket are not automatically cancelled by Workplace offboarding alone if account remains active. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Visitor pass creation and usage | PARQ-ARCH-001 UF-013; PARQ-ARCH-012 | PARQ-ARCH-012 Visitor Pass; Developer breakdown Visitor Pass | FS visitor registration contract, property/tower/floor mapping, visitor QR validity, local-vs-FS divergence, and CMS visibility boundary remain open. | QA readiness can later trace host/visitor pass dependencies; no scenarios created here. | Mapped with open dependencies |
| RTM-014 | Notification Integration | UF-014 | Support OBK Notification for PARQ User | FR-NOTIF-001 to FR-NOTIF-005 | BR-021; BR-022; reuse existing OBK notification mechanism; no new notification platform; PARQ CMS campaigns/building news out of Phase 1. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Notification receiving | PARQ-ARCH-001 UF-014; PARQ-ARCH-009; PARQ-ARCH-012 | PARQ-ARCH-012 Notification; Developer breakdown Notification | OQ-NOTIF-001; exact categories, consent behavior, segment owner, and token/inbox cleanup proof remain open. | QA readiness can later trace notification scope and cleanup dependencies; no scenarios created here. | Mapped with open dependencies |
| RTM-015 | Physical Access | UF-015 | Elevator Integration | FR-QR-006; FR-QR-007; FR-TOWER-004; related FR-TOWER-001 to FR-TOWER-003 | FS/access layer validates elevator authorization; selected tower context affects hardware permissions; switching is blocked during active hardware journey. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 Elevator access | PARQ-ARCH-001 UF-015; PARQ-ARCH-012; PARQ-ARCH-010 | PARQ-ARCH-012 Hardware diagrams needing update; Developer breakdown Hardware: Elevator / Turnstile | OQ-HW-001; OQ-FS-001; named hardware/site contact, site testing window, FS floor authorization contract, timeout/retry/fallback remain blocked. | QA readiness remains gated by hardware/site readiness and explicit PARQ QA handoff; no scenarios created here. | Mapped with blockers |
| RTM-016 | Physical Access | UF-016 | Turnstile Access | FR-QR-003; FR-QR-006; FR-QR-007; related FR-TOWER-004 | QR may be used for turnstile access; FS/access layer validates identity and permission; denied/timeout state routes to support path when final rules are confirmed. | PARQ-SOT-001; PARQ-SOT-002; PARQ-REQ-001 v0.4 | PARQ-UX-001 My QR / turnstile access | PARQ-ARCH-001 UF-016; PARQ-ARCH-012; PARQ-ARCH-010 | PARQ-ARCH-012 Hardware diagrams needing update; Developer breakdown Hardware: Elevator / Turnstile and My QR / Access | OQ-QR-001; OQ-HW-001; QR validity/refresh, replay, FS outage policy, access audit ownership, and hardware readiness remain open. | QA readiness remains gated by hardware/site readiness and explicit PARQ QA handoff; no scenarios created here. | Mapped with blockers |

## 3. Coverage Summary

| Coverage item | Result |
|---|---|
| Bas-approved Epic alignment preserved | Yes, with Bas's later 2026-06-16 clarification applied to separate UF-006 Multi-Tower Support under Tower Context Management. |
| UF-001 to UF-016 included | Yes. All sixteen approved Phase 1 user flows are included in the Formal Traceability Matrix. |
| Orphan user flows in approved scope | None identified. Bas-approved note preserved: no orphan User Flows were identified. |
| Traceability coverage | 100% for UF-001 to UF-016, preserving Bas-approved coverage assessment after the Tower Context Management update. |
| Unknown mappings | Marked open / needs confirmation instead of invented. Main example: UF-011 Traffic Monitoring has confirmed webview/quick-action scope but no dedicated FR family in PARQ-REQ-001 v0.4. |
| Phase 1 / Phase 1.5 boundary | Unchanged. Deferred items remain excluded from Phase 1 traceability unless Bas/PARQ explicitly changes scope. |

Note:
The workbook also contains cross-cutting or delivery-support rows beyond UF-016, such as Security & Compliance, Testing & Deployment, Project Documentation, User Manual, Technical Documentation, and Load Testing. They are not part of the Bas-approved UF-001 to UF-016 Epic alignment baseline for this RTM. They may be added to a separate delivery or compliance traceability view if Bas/PARQ requests it.

## 4. Open Questions / Dependencies Affecting Traceability

| Area | Traceability impact | Current reference |
|---|---|---|
| BMS timeout and fallback | Affects UF-001 sign-in and BMS non-blocking Workplace refresh traceability. | OQ-BMS-001; OQ-BMS-002; PARQ-ARCH-012 |
| BZB conflict and delete handling | Affects UF-002 merge and UF-004 lifecycle traceability. | FR-MERGE; FR-LIFE; PARQ-ARCH-012 |
| Sign-up field and cleanup behavior | Affects UF-003 estimate and later QA readiness traceability. | PARQ-REQ-001 v0.4; PARQ-ARCH-012 |
| FS/Iviva contracts | Affects UF-005, UF-006, UF-008, UF-009, UF-010, UF-012, UF-013, UF-015, UF-016. | OQ-FS-001; OQ-FS-002; PARQ-ARCH-010; PARQ-ARCH-012 |
| QR validity and refresh | Affects UF-009 and UF-016. | OQ-QR-001 |
| Parking rate, ticket, and Argento payment operations | Affects UF-012 and final payment confidence. | OQ-PARK-001 to OQ-PARK-004; PARQ-ARCH-012 |
| Traffic Monitoring FR granularity | UF-011 is mapped to Workplace quick-action/webview scope but has no dedicated FR family in PARQ-REQ-001 v0.4. | FR-WP-006; PARQ-SOT-001; PARQ-ARCH-001 |
| CMS filters and governance | Affects UF-007. | OQ-CMS-001; OQ-CMS-002 |
| Notification categories and consent | Affects UF-014. | OQ-NOTIF-001 |
| Lifecycle status and cleanup consumers | Affects UF-004. | OQ-LIFE-001; OQ-LIFE-002 |
| Hardware/site readiness | Affects UF-015 and UF-016. | OQ-HW-001; OQ-CONTACT-001; PARQ-ARCH-012 |

## 5. Source References

| Source | Use in this RTM |
|---|---|
| Bas-approved Molly Traceability Matrix input baseline, 16 Jun 2026 | Epic alignment baseline and coverage note. |
| `01_Source_of_Truth/PARQ_User_Flow/The_PARQ_Phase_1_User_Flow_Index.xlsx` | User Flow IDs, names, personas, priority, dependencies, integrations, and source notes for UF-001 to UF-016. |
| `02_Discovery/PARQ_Requirement_Specification_and_Scope_of_Work.md` | FR IDs, business rules, scope notes, open questions, and Phase 1 / Phase 1.5 boundary. |
| `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md` | Related UX/discovery flow references and user-visible dependency impacts. |
| `03_Architecture/PARQ_User_Flow_Integration_Architecture.md` | Flow-to-system architecture mapping and integration risks. |
| `03_Architecture/PARQ_Technical_Estimation_Alignment_and_TDD_Gap_Check.md` | Estimation readiness, TDD gap references, dependency and sequence update needs. |
| `03_Architecture/PARQ_Developer_Estimation_Task_Breakdown.md` | Developer estimation task reference only. |
| `MASTER_INDEX.md`, `TASK_BOARD.md`, `HANDOFF_LOG.md` | Repository registration, task status, and handoff traceability. |
| `02_Discovery/PARQ_Feature_Breakdown_Matrix.md` | Feature Breakdown Matrix v0.4 and Bas clarification source for separated Tower Context Management traceability. |

## 6. Change Log

| Version | Date | Owner | Change summary | Status |
|---|---|---|---|---|
| 0.1 | 2026-06-16 | Molly | Created formal Requirement Traceability Matrix from Bas-approved Molly mapping dated 16 Jun 2026, using `PARQ-REQ-001 v0.4` and related Discovery/Architecture references. | Draft / Ready for Bas Review |
| 0.2 | 2026-06-16 | Molly | Applied Bas clarification to separate UF-006 Multi-Tower Support under Tower Context Management and linked Feature Breakdown Matrix v0.4 as traceability input. | Approved / Bas Tower Context Revision Applied |
