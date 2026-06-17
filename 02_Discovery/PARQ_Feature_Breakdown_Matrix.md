# PARQ Feature Breakdown Matrix

Owner: Molly, Assistant Product Owner

Approver: Bas

Document version: 0.4

Status: Draft v0.4 / Ready for Bas Review

Output files:
- `02_Discovery/PARQ_Feature_Breakdown_Matrix.md`
- `02_Discovery/PARQ_Feature_Breakdown_Matrix_Jira_Import.csv`

Source baseline:
- PARQ Feature Breakdown Matrix v0.3 workshop review.
- Bas clarification decisions provided on 2026-06-16.
- `PARQ-REQ-001 v0.4` Requirement Specification and Scope of Work.
- `PARQ-REQ-002` Requirement Traceability Matrix.
- `PARQ-SOT-001` PARQ Phase 1 User Flow Index.
- `PARQ-UX-001` UX Stakeholder User Flow Pack.
- `PARQ-ARCH-012` Technical Estimation Alignment and TDD Gap Check.
- `PARQ-ARCH-013` Technical Estimation Planning Assumption Pack.
- `PARQ_Developer_Estimation_Task_Breakdown.md`.

Downstream consumers:
- Bas
- PARQ coordination
- Developer estimation team
- Simon
- Libra
- Quinn later, after explicit QA readiness handoff

Purpose:
This document converts the reviewed Feature Breakdown Matrix v0.3 into a repository baseline candidate for product-view estimation. It keeps Phase 1 scope aligned with approved requirements and separates feature boundaries to reduce duplicate estimation and Phase 1.5 scope leakage.

Rules applied:
- No user stories were created.
- No acceptance criteria were created.
- No QA/UAT scenarios were created.
- No API contracts or technical design were created.
- Missing technical details remain open dependencies.
- Phase 1 and Phase 1.5 boundaries remain unchanged.

Jira import note:
- The CSV version uses `Issue Type = Epic` for E1 to E10 and `Issue Type = Task` for feature rows.
- Feature rows use `Epic Link` to reference the matching epic name.
- Jira administrators may remap fields such as `Feature ID`, `Related User Flow`, `Related FR / Rule`, `Scope Note`, and `Estimation Boundary` into custom Jira fields during import.
- This import file does not create user stories, acceptance criteria, QA/UAT scenarios, API contracts, or technical design.

## 1. Bas Clarifications Applied

| Topic | Bas decision applied in v0.4 |
|---|---|
| Tower Context | Separate Tower Context Management as its own epic and update traceability mapping. |
| Traffic Monitoring | Route to existing PARQ/OBK traffic source only; do not treat as new native traffic integration unless later approved. |
| QR / Tower Context / Physical Access | Separate feature boundaries: QR Identity owns QR enablement; Tower Context owns selected building/tower context; Physical Access owns elevator/turnstile integration and access result handling. |
| Parking Payment | Use feature label `Argento Payment Integration`. |
| Profile Management | Keep `Edit Profile`, with scope note that existing OBK profile edit logic is reused and PARQ workplace metadata remains FS-driven/view-only. |
| CMS | Keep feature label `PARQ User Visibility`, with scope note that Phase 1 is view-only. |
| Account Lifecycle | Split lifecycle into separate features under Authentication and Account Integration. |

## 2. Feature Breakdown Matrix v0.4

| Epic ID | Epic | Feature | Phase | Related User Flow | Related FR / Rule | Scope note | Estimation boundary |
|---|---|---|---|---|---|---|---|
| E1 | Authentication & Account Integration | Existing PARQ User Sign-In | Phase 1 | UF-001 | FR-AUTH-001 to FR-AUTH-007 | The system shall support existing PARQ users signing in through existing One Bangkok Application authentication patterns. | Reuse/adapt OBK IAM/SSO login; do not estimate new authentication platform. |
| E1 | Authentication & Account Integration | OTP Authentication | Phase 1 | UF-001 | FR-AUTH-001 | Existing OBK OTP behavior is reused where applicable. | Existing mechanism reuse/adaptation only. |
| E1 | Authentication & Account Integration | Password Authentication | Phase 1 | UF-001 | FR-AUTH-001 | Existing OBK password login behavior is reused where applicable. | Existing mechanism reuse/adaptation only. |
| E1 | Authentication & Account Integration | Smart Redirect | Phase 1 | UF-001 | FR-AUTH-003 | If account is found, show: "Found your account please log-in with your password or OTP". | UI/message and routing behavior only. |
| E1 | Authentication & Account Integration | Registration Flow Reuse & PARQ Integration | Phase 1 | UF-003 | FR-SIGNUP-001 to FR-SIGNUP-009 | Phone-first registration, OTP phone verification, Email entry and verification, existing Email redirect to login, consent, required information, brand-new Retail profile creation, and delayed FS check. | Reuse/adapt OBK registration; no new invitation deep-linking requirement for Phase 1. |
| E1 | Authentication & Account Integration | Retail Account Matching | Phase 1 | UF-002 | FR-MERGE-001 to FR-MERGE-004 | Match BZB/Retail identity by phone first and email second. | BZB conflict contract and wrong-merge runbook remain open dependencies. |
| E1 | Authentication & Account Integration | Persona Merge | Phase 1 | UF-002 | FR-MERGE-003 to FR-MERGE-006 | App displays acknowledgement screen for auto-merge; user cannot deny a valid merge. | Mandatory acknowledgement screen and merge/link handling; manual consolidation remains operational fallback. |
| E1 | Authentication & Account Integration | Workplace Detection | Phase 1 | UF-001, UF-003, UF-005 | FR-AUTH-005 to FR-AUTH-007; FR-WP-001 | FS/BMS checks may detect Workplace eligibility after login or onboarding. | Detection/result refresh only; Workplace UI state is estimated under E2. |
| E1 | Authentication & Account Integration | Company Offboarding / Workplace Persona Removal | Phase 1 | UF-004 | FR-LIFE-001 to FR-LIFE-004 | When FS/Fineday marks user inactive from company, Workplace persona disappears while Retail can remain active. | Company offboarding is separate from user account deletion. |
| E1 | Authentication & Account Integration | Account Deletion | Phase 1 | UF-004 | FR-LIFE-005 to FR-LIFE-006 | User delete account applies to all personas through SSO lifecycle. | Do not treat Workplace-only offboarding as account deletion. |
| E1 | Authentication & Account Integration | Account Reactivation within 30 Days | Phase 1 | UF-004 | FR-LIFE-007 to FR-LIFE-008 | Suspended account can be reactivated within 30 days. | Exact suspended status label remains open. |
| E1 | Authentication & Account Integration | Day 31 Hard Delete | Phase 1 | UF-004 | FR-LIFE-009 to FR-LIFE-010 | SSO owns hard delete on Day 31 and downstream delete notification where required. | Downstream cleanup proof remains open dependency. |
| E2 | Workplace Persona Experience | Workplace Homepage | Phase 1 | UF-005 | FR-WP-001 to FR-WP-007 | Show Workplace home when FS type is detected and persona is eligible. | Workplace experience only; tower context is separated to E10. |
| E2 | Workplace Persona Experience | Workplace Persona Display | Phase 1 | UF-005 | FR-WP-001 to FR-WP-005 | Display Workplace persona card and relevant metadata when available. | Metadata source and pending/error handling depend on FS. |
| E2 | Workplace Persona Experience | Persona Switching | Phase 1 | UF-005 | FR-WP-003 to FR-WP-005 | Retail home remains default unless user changes default persona in settings. | Persona switching only; building/tower context switching belongs to E10. |
| E2 | Workplace Persona Experience | Pending Workplace State | Phase 1 | UF-005 | FR-WP-002; FR-WP-005 | If FS type is found but company or authorization data is incomplete, show pending Workplace state. | No Workplace home is shown if FS type is not found. |
| E2 | Workplace Persona Experience | Workplace Quick Actions | Phase 1 | UF-005, UF-011 | FR-WP-006; FR-WP-007 | Traffic, Map, and Promotion are available as webview quick actions; Parking is integrated through the app parking flow. | Traffic uses existing PARQ/OBK traffic source; no new native traffic integration is created by this feature. |
| E3 | Profile Management | View Profile | Phase 1 | UF-008 | FR-PROFILE-001 to FR-PROFILE-006 | User can view existing profile and account information. | Existing OBK profile behavior reused. |
| E3 | Profile Management | Edit Profile | Phase 1 | UF-008 | FR-PROFILE-001; FR-PROFILE-006 | Existing OBK editable account-management behavior remains available. | PARQ company/tower/floor metadata is not user-editable. |
| E3 | Profile Management | Company Information Display | Phase 1 | UF-008 | FR-PROFILE-004 | Display company metadata where available from FS. | View-only for PARQ workplace metadata. |
| E3 | Profile Management | Tower Information Display | Phase 1 | UF-008, UF-006 | FR-PROFILE-004; FR-TOWER-001 | Display tower/building metadata where available. | Context selection behavior is owned by E10. |
| E3 | Profile Management | Floor Information Display | Phase 1 | UF-008 | FR-PROFILE-002 to FR-PROFILE-005 | OBK default floor behavior remains as-is; PARQ floor comes from FS only. | PARQ floor is view-only and cannot be manually set in Phase 1. |
| E3 | Profile Management | Identity Information Display | Phase 1 | UF-008 | FR-PROFILE-001; FR-SIGNUP-007 | Display identity information consistently with existing OBK account management. | Add phone/email follows existing OBK logic where applicable. |
| E4 | QR Identity | PARQ User QR Enablement | Phase 1 | UF-009 | FR-QR-001 to FR-QR-007 | Existing OBK My QR is enabled for PARQ users through AccountID/PublicID identity mapping. | Do not estimate a new QR feature; QR validity/refresh remains open. |
| E5 | Physical Access | PARQ Elevator Integration | Phase 1 | UF-015 | FR-QR-006; FR-QR-007; FR-TOWER-004 | Elevator access uses selected context and FS/access authorization. | Final hardware testing remains blocked by site/contact readiness. |
| E5 | Physical Access | PARQ Turnstile Integration | Phase 1 | UF-016 | FR-QR-003; FR-QR-006; FR-QR-007 | Turnstile access uses QR/access validation and FS authorization. | Final hardware testing remains blocked by site/contact readiness. |
| E5 | Physical Access | PARQ Access Authorization Mapping | Phase 1 | UF-015, UF-016 | FR-QR-006; FR-QR-007; FR-TOWER-004 | Physical Access owns access result handling after QR identity and tower context are supplied. | Do not duplicate E4 QR enablement or E10 context selection. |
| E6 | Parking Experience | Parking Availability | Phase 1 | UF-010 | FR-PARK-001 to FR-PARK-006 | User selects location, currently One Bangkok or The PARQ, then views selected-location parking availability. | Future Frasers Property scale is noted only; not Phase 1 scope. |
| E6 | Parking Experience | Traffic Monitoring | Phase 1 | UF-011 | FR-WP-006 | Route to existing PARQ/OBK traffic source through quick action/webview. | No new native traffic integration unless later approved. |
| E6 | Parking Experience | Parking Ticket Routing | Phase 1 | UF-012 | FR-PARK-007 to FR-PARK-010 | App identifies whether the scanned ticket is One Bangkok or The PARQ and routes accordingly. | One Bangkok follows as-is flow; The PARQ follows PARQ-specific flow. |
| E6 | Parking Experience | PARQ Parking Ticket Processing | Phase 1 | UF-012 | FR-PARK-010 to FR-PARK-012 | The PARQ ticket uses PARQ-specific rate/capability behavior and hides unsupported OBK-only features. | VIP Parking and Phase 1.5 redemption features are excluded unless supported/approved. |
| E6 | Parking Experience | Argento Payment Integration | Phase 1 | UF-012 | FR-PARK-013 to FR-PARK-015 | App shows fee, user taps Payment, app routes to Argento QR PromptPay, then receives/checks payment status. | Argento callback/status/reconciliation/refund/support details remain open dependencies. |
| E7 | Visitor Pass Management | Visitor Pass Creation | Phase 1 | UF-013 | FR-VISITOR-001 to FR-VISITOR-005 | Host creates visitor pass in OBK flow where supported by existing logic and FS authorization. | Visitor pass is managed inside OBK at workflow level. |
| E7 | Visitor Pass Management | Visitor Information Management | Phase 1 | UF-013 | FR-VISITOR-002 | Capture visitor details required by existing visitor-pass behavior and FS/access support. | Final FS visitor registration contract remains open. |
| E7 | Visitor Pass Management | Visitor Pass Distribution | Phase 1 | UF-013 | FR-VISITOR-002 to FR-VISITOR-004 | Visitor receives pass/QR or equivalent access information through supported OBK behavior. | Notification/share channel details follow existing app behavior unless separately confirmed. |
| E7 | Visitor Pass Management | Visitor Pass Validation | Phase 1 | UF-013, UF-015, UF-016 | FR-VISITOR-003; FR-QR-006 | Visitor pass validation depends on FS/access authorization where physical access is involved. | Physical access enforcement belongs to E5. |
| E7 | Visitor Pass Management | Visitor Pass Usage | Phase 1 | UF-013 | FR-VISITOR-003 to FR-VISITOR-005 | Visitor uses pass within valid property/tower/time authorization. | Visitor pass/parking ticket are not automatically cancelled by Workplace offboarding alone if account remains active. |
| E8 | Notification Integration | PARQ Notification Enablement | Phase 1 | UF-014 | FR-NOTIF-001 to FR-NOTIF-005 | Reuse existing OBK push notification mechanism and configuration for PARQ users. | The PARQ CMS campaigns/building news and new notification platform are excluded from Phase 1. |
| E9 | CMS Multi-Property User Management | PARQ User Visibility | Phase 1 | UF-007 | FR-CMS-001 to FR-CMS-006 | CMS/admin can view PARQ user metadata for support and management. | Phase 1 is view-only; no metadata edit, Organization Isolation, CMS sub-menu, or rate configuration. |
| E10 | Tower Context Management | Tower Context Selection | Phase 1 | UF-006 | FR-TOWER-001 to FR-TOWER-003 | User can select eligible building/tower context where the user has multiple rights. | Building and tower are treated as same business concept for PARQ scope. |
| E10 | Tower Context Management | Context Persistence | Phase 1 | UF-006 | FR-TOWER-002 | App remembers selected context where supported. | Persistence/invalidation details depend on BMS/App State rules. |
| E10 | Tower Context Management | Context Authorization | Phase 1 | UF-006 | FR-TOWER-001; FR-TOWER-003; FR-TOWER-006 | Authorization is based on selected Persona Card context and eligible FS data. | Empty FS metadata is filtered to prevent broken user experience. |
| E10 | Tower Context Management | Hardware Journey Context Mapping | Phase 1 | UF-006, UF-015, UF-016 | FR-TOWER-004 | During hardware-related journeys, switching is blocked or controlled to prevent access-permission mismatch. | Final hardware-lock rule and site behavior remain open dependencies. |

## 3. Phase 1.5 / Deferred Scope Guardrail

The following must not be estimated as Phase 1 from this matrix:
- Store whitelist.
- Automated E-stamp.
- OCR redemption.
- Automated gate sync.
- Organization Isolation.
- CMS sub-menu.
- Rate configuration.
- User self-redemption.
- OBK CMS management of The PARQ redemption.
- The PARQ CMS campaign/building-news notification through OBK notification.
- New native Traffic Monitoring integration beyond existing PARQ/OBK traffic source routing.

## 4. Traceability Coverage Summary

| Coverage item | Result |
|---|---|
| UF-001 to UF-016 represented | Yes. |
| Tower Context separated | Yes. UF-006 is now mapped to E10 Tower Context Management per Bas clarification. |
| Product-view decomposition | Yes. Features are grouped for product estimation, not technical implementation sequencing. |
| Phase 1.5 contamination | Not identified after applying guardrails. |
| Duplicate-estimation risk | Reduced by separating QR Identity, Tower Context, and Physical Access boundaries. |
| Remaining estimation dependencies | BMS timeout/fallback, FS contracts, Argento payment operations, CMS governance, Notification categories/consent, hardware site readiness. |

## 5. Change Log

| Version | Date | Owner | Change summary | Status |
|---|---|---|---|---|
| 0.3 | 2026-06-16 | Molly / Bas workshop | Feature Breakdown Matrix reviewed in GPT workshop before repository validation. | Workshop input |
| 0.4 | 2026-06-16 | Molly | Applied Bas clarifications: separated Tower Context, constrained Traffic to existing source, separated QR/Tower/Physical Access boundaries, retained `Argento Payment Integration` label, approved Profile Management wording, kept CMS feature name with view-only note, and split Account Lifecycle features under E1. | Draft / Ready for Bas Review |
| 0.4 CSV | 2026-06-16 | Molly | Added Jira import CSV version with Epic rows and feature Task rows, preserving the v0.4 scope and estimation boundaries. | Draft / Ready for Bas Review |
