# PARQ Developer Estimation Task Breakdown

Owner: Simon / Senior Solution Architect

Input files:
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`
- `02_Discovery/PARQ_Requirement_Specification_and_Scope_of_Work.md` (`PARQ-REQ-001 v0.4`, Accepted for Internal Estimation)
- `03_Architecture/PARQ_Technical_Estimation_Alignment_and_TDD_Gap_Check.md` (`PARQ-ARCH-012`)
- `03_Architecture/PARQ_Technical_Estimation_Planning_Assumption_Pack.md` (`PARQ-ARCH-013`)

Output file path: `03_Architecture/PARQ_Developer_Estimation_Task_Breakdown.md`

Status: Draft / Developer estimation worksheet

Downstream consumer:
- Developer estimation team
- PARQ / Bas for estimation coordination
- Libra for indexing and traceability
- Quinn only after explicit PARQ/Bas QA readiness handoff

Rules applied:
- This worksheet does not create user stories, acceptance criteria, QA scenarios, UAT scenarios, final TDD/API contracts, or new requirements.
- Missing vendor/system details remain blockers or assumptions.
- Phase 1.5 / Deferred Future Phase items are excluded from Phase 1 estimation.

## 1. Estimation Summary

Purpose:
- Give developers a concise module-by-module worksheet for manday/manhour estimation.

Estimation rule:
- Estimate only the work stated in the `Task` and `Sub-tasks for estimation` columns.
- Split estimates into UI/app shell, backend/API integration, configuration/reuse, error/support handling, integration test support, and blocked vendor-dependent work.
- Do not convert assumptions into confirmed scope.

What developers should estimate now:
- Ready-to-estimate modules.
- Assumption-based modules, with assumptions visible in the estimate notes.
- Reuse/shell work that can proceed before vendor/system confirmations.

What should be excluded:
- Blocked vendor-dependent work until dependency confirmation is available.
- Phase 1.5 / Deferred Future Phase scope: store whitelist, automated E-stamp, OCR redemption, automated gate sync, Organization Isolation, CMS sub-menu, rate configuration, user self-redemption, and OBK CMS management of The PARQ redemption.
- Final TDD/API contracts, QA scenarios, UAT scenarios, user stories, and acceptance criteria.

## 2. Developer Estimation Table

| Module | Task | Sub-tasks for estimation | Estimate type | Assumptions | Blockers / Exclusions | Suggested owner/team |
|---|---|---|---|---|---|---|
| IAM / SSO / Login | Align existing PARQ user login with OBK IAM/SSO flow. | Reuse existing login entry points; support phone/email/password/OTP paths where already supported; handle smart redirect; sync login result to persona/profile refresh; preserve login if downstream Workplace refresh is unavailable. | Estimate with assumptions | Existing OBK IAM/SSO login flow can be reused. | Do not estimate final BMS timeout/fallback controls here; handle BMS in separate row. | OBK Backend / IAM Service; Mobile App |
| Sign-up and Onboarding | Implement PARQ sign-up flow alignment from accepted SOW. | Phone-first registration; OTP phone verification; email entry and verification; existing email redirect to login; consent step; required profile input; brand-new Retail profile creation; delayed Workplace activation shell. | Estimate with assumptions | Existing OBK registration flow can be adapted. Brand-new users may create Retail profile. | Field overwrite policy, incomplete registration cleanup, invitation/service-code detail, and delayed FS/BMS activation behavior remain open. | Mobile App; OBK Backend / IAM Service; BZB where Retail creation applies |
| BMS login-time member check | Add non-blocking login-time BMS member refresh. | Call `GET /members` with `account_id`; handle success response for Workplace refresh; handle no member; allow app entry when BMS fails; record basic technical error path for later audit/support. | Estimate with assumptions | Bas confirmed Option B non-blocking login check and `GET /members` with `account_id`. User can enter app if BMS is unavailable. | Timeout, retry/circuit breaker, monitoring, audit marker, previous Workplace permission freshness, and bound-to-other-account support path remain blocked. | OBK Backend / IAM Service; ob-bms service via PO |
| Retail / BZB matching and merge | Estimate Retail/BZB identity matching and mandatory merge acknowledgement. | Phone-first BZB lookup; email secondary lookup; match result handling; merge acknowledgement screen; normal merge/link path; conflict/error support shell. | Estimate with assumptions | Matching is phone-first with email secondary. Merge cannot be denied when valid match is found. | BZB conflict contract, wrong-merge correction, protected profile/consent fields, and hard-delete notification behavior remain open. | Mobile App; OBK Backend / IAM Service; BZB |
| Workplace Persona | Display Workplace persona based on FS-related identity/authorization data. | Persona card/home entry; pending Workplace state; company/property/tower/floor display placeholders; quick action entry points; no-Workplace fallback. | Estimate with assumptions | FS/Iviva is the authority for Workplace entitlement. FS type/metadata drives Workplace persona. | FS type contract, metadata fields, stale/cache invalidation, and pending vs error behavior remain open. | Mobile App; OBK Backend / IAM Service; FS/Iviva |
| Multi-Tower / Tower Context | Support saved and temporary tower/property context. | Display selected property/tower context; save last/default context where supported; temporary tower switch using App State; restrict hardware journey switching shell; handle user with OBK and PARQ rights. | Estimate with assumptions | Persistent default floor/tower uses BMS `default_floor`; temporary switch uses App State. | BMS `default_floor` schema, FS mapping, invalidation rules, and final hardware-lock rule remain open. | Mobile App; OBK Backend / IAM Service; BMS; FS/Iviva |
| My Profile / Default Floor | Show profile and default-floor/tower metadata. | Reuse profile screen; show company/property/tower/status metadata; show PARQ floor as view-only where sourced from FS; handle missing floor/support state. | Estimate with assumptions | Existing profile flow can be reused. PARQ floor comes from FS authorization, not manual user input. | FS floor contract, BMS default-floor mapping, and missing-floor support rule remain open. | Mobile App; OBK Backend / IAM Service; BMS; FS/Iviva |
| My QR / Access | Reuse My QR as access identity surface for PARQ. | QR screen reuse; display QR availability state; refresh/invalid state shell; access denied/support state; route to FS/hardware validation integration where applicable. | Estimate with assumptions | Existing My QR surface can be reused. FS validates access rights. | QR payload ownership, expiry/refresh, replay protection, property specificity, and hardware outage fallback remain open. | Mobile App; OBK Backend; FS/Iviva; Elevator/Turnstile vendors via FS |
| Parking Availability | Add selected-location parking availability for One Bangkok and The PARQ. | Location selector; One Bangkok vs The PARQ branch; call availability source; show availability; refresh/unavailable/stale state shell. | Estimate with assumptions | User selects location first. FS/Iviva provides The PARQ availability data. | FS endpoint, property/location IDs, refresh interval, stale threshold, and unavailable response behavior remain open. | Mobile App; OBK Backend; FS/Iviva |
| Parking Ticket and QR PromptPay Payment | Estimate ticket scan, property routing, and payment shell separately from unresolved payment operations. | Ticket scan entry; detect One Bangkok vs The PARQ using selected Location plus FS fields; route OBK ticket to existing flow; route PARQ ticket to PARQ flow; hide unsupported capabilities; display fee; initiate QR PromptPay payment shell; payment status shell; support state. | Estimate with assumptions | Phase 1 includes QR PromptPay payment. One Bangkok ticket follows existing live flow. The PARQ flow has fewer capabilities. | FS `park_syscode`/`park_name` values, PARQ rate source, amount calculation, Argento callback/status/reconciliation/refund/support, duplicate payment, and paid-but-not-synced handling remain blocked. Exclude VIP Parking if unsupported and all Phase 1.5 redemption items. | Mobile App; OBK Backend; FS/Iviva; Argento |
| Visitor Pass | Reuse visitor-pass workflow for PARQ host and visitor access. | Create/manage visitor pass shell; host context selection; local visitor pass record handling; FS registration call placeholder; QR/pass validity display; cancel/delete/reactivate shell if supported by existing flow. | Estimate with assumptions | Existing visitor-pass capability can be reused at workflow level. FS authorizes visitor access. | FS visitor registration contract, property/tower/floor mapping, visitor QR validity, local-vs-FS divergence, and CMS visibility boundary remain open. | Mobile App; OBK Backend; FS/Iviva; CMS where view-only support applies |
| Notification | Reuse existing OBK notification mechanism for PARQ Phase 1. | PARQ audience/segment linkage shell; login/account/system notification reuse; marketing notification reuse where consent allows; exclude PARQ CMS campaigns/building news; cleanup hook awareness for delete. | Estimate with assumptions | Existing OBK notification infrastructure is reused. PARQ CMS campaigns/building news are out of Phase 1. | Exact categories, consent rules, segment owner, token/inbox cleanup proof remain open. | OBK Notification infrastructure; IAM/Event consumers |
| CMS Multi-Property User Management | Add view-only PARQ/OBK user metadata support in CMS. | View-only persona/company/property/tower/status metadata; search/filter shell; support/admin visibility; no metadata edit path; Seed Account/manual access posture. | Estimate with assumptions | Phase 1 CMS metadata is view-only. Cross-property visibility is accepted Phase 1 risk with manual/Seed Account controls. | Seed Account governance, access audit, final filters, metadata sources, RBAC/org isolation controls remain open. Exclude Organization Isolation, CMS sub-menu, and rate configuration. | CMS; OBK Backend / IAM Service; Security/PARQ governance |
| Account Lifecycle / Delete / Reactivation | Align delete/reactivation/hard-delete behavior with accepted SOW wording. | Soft delete/suspended state alignment; reactivation within 30 days; Day 31 hard-delete wording alignment; reference documented Kafka delete events; cleanup integration awareness for SSO/BMS/BZB/Notification. | Estimate with assumptions | Use business wording `within 30 days / Day 31`; TDD may note current `now - 1 month`. Existing IAM lifecycle can be reused. | Exact suspended status label, downstream cleanup consumers, BZB/BMS/Notification cleanup proof, and undocumented Kafka runtime controls remain open. | OBK Backend / IAM Service; Kafka/Event Bus; BMS; BZB; Notification |
| Hardware: Elevator / Turnstile | Estimate only app/API shell; do not estimate final end-to-end hardware readiness yet. | Elevator call UI/action shell; turnstile QR/access shell; selected context handoff; access denied/support state; integration test support placeholder. | Blocked / Do not estimate yet | FS owns final authorization. API/shell work may be estimated under My QR/Access and tower-context rows. | Named The PARQ hardware/site contact, site testing window, environment, test data, fallback, and escalation path are blocked. Do not estimate final hardware validation/stabilization. | FS/Iviva; Elevator; Turnstile; Site Operations via Bas/PO |
| Cross-cutting: Logging / Audit / Error Handling / Support | Estimate shared technical support work needed across modules. | Standard error mapping shell; user-visible error/support states; operational log points; audit placeholder for merge/payment/access/lifecycle; support escalation data capture; integration test support for blocked dependencies. | Estimate with assumptions | Existing OBK logging/error patterns can be reused where available. | Final timeout values, vendor error catalogs, audit fields, support copy, reconciliation runbooks, and named escalation contacts remain open. | OBK Backend; Mobile App; Support/Ops; Security where audit applies |
| Deferred Phase 1.5 / Exclude | Exclude deferred future scope from Phase 1 estimate. | No Phase 1 delivery estimate. Track only architecture awareness if needed to avoid rework. | Deferred Phase 1.5 / Exclude | Bas confirmed these are Deferred / Future Phase. | Exclude store whitelist, automated E-stamp, OCR redemption, automated gate sync, Organization Isolation, CMS sub-menu, rate configuration, user self-redemption, and OBK CMS management of The PARQ redemption. | PARQ / Bas for future phase decision |

## 3. Manday Estimation Guidance

Developers should estimate each module in separate buckets:

| Estimate bucket | Include in manday/manhour estimate | Keep separate or exclude |
|---|---|---|
| UI / app shell work | Screens, states, navigation, selected location/tower context, display logic, support/unavailable states. | Do not include unresolved vendor behavior as if confirmed. |
| Backend/API integration work | OBK backend orchestration, IAM/SSO alignment, BMS/BZB/FS/Argento/CMS/Notification integration shells, data mapping where confirmed. | Keep final contracts, timeout values, reconciliation, and hardware validation separate until confirmed. |
| Configuration/reuse work | Existing OBK flow reuse, feature flags/config, existing CMS/notification/profile/login reuse. | Do not assume reuse is zero effort; estimate discovery and adaptation. |
| Error/support handling | User-visible error states, support routing, operational log points, audit placeholders. | Final support copy, runbooks, and escalation contacts remain blockers. |
| Integration test support | Developer support for integration verification, mocks/stubs where allowed, environment readiness support. | Do not create QA scenarios or UAT scenarios from this worksheet. |
| Blocked vendor-dependent work | Optional spike or contingency only, clearly separated. | Do not include final delivery estimate for blocked vendor/hardware work until confirmations are available. |

Recommended estimate output per module:
- Base estimate: ready UI/backend/config work.
- Assumption estimate: work that depends on open but manageable assumptions.
- Blocked estimate: spike/contingency only, if Bas/PARQ wants it separated.
- Excluded: Phase 1.5 and unsupported scope.

## 4. Immediate Estimation Use

Use this worksheet as the developer-facing input for manday/manhour estimation.

Use `PARQ-ARCH-013` only when developers need more background on why an item is an assumption or blocker.

Do not use this worksheet to approve final TDD/API contracts, vendor behavior, QA scope, or Phase 1.5 scope.
