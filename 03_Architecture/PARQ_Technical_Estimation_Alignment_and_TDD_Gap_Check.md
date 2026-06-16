# PARQ Technical Estimation Alignment and TDD Gap Check

Owner: Simon / Senior Solution Architect

Input files:
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`
- `02_Discovery/PARQ_Requirement_Specification_and_Scope_of_Work.md` (`PARQ-REQ-001 v0.4`, Accepted for Internal Estimation)
- `03_Architecture/PARQ_Drive_IAM_SSO_Source_Impact_Assessment.md`
- `03_Architecture/PARQ_Architecture_Dependency_Addendum_After_Bas_Confirmations.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`
- `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`
- `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`
- `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`
- `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md`
- `03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md`

Output file path: `03_Architecture/PARQ_Technical_Estimation_Alignment_and_TDD_Gap_Check.md`

Status: Draft / Ready for estimation alignment review with blockers

Downstream consumer:
- PARQ / Bas for estimation gating and dependency routing
- Developer technical reviewers for estimation preparation
- Quinn / QA Lead for later readiness-register input only
- Libra / Project Librarian for indexing and traceability
- Molly / Assistant Product Owner for SOW wording awareness only

Rules applied:
- The accepted Requirement/SOW baseline was not rewritten.
- No user stories, acceptance criteria, QA scenarios, UAT scenarios, or test cases are created.
- Missing endpoint behavior, timeout values, owners, environments, test data, and schedules remain open questions.
- Phase 1.5 deferred scope is kept out of Phase 1 estimation.

## 1. Executive Readiness Summary

`PARQ-REQ-001 v0.4` is technically usable as an internal estimation baseline, but it is not yet a complete TDD baseline.

Recommended estimation posture:
- Estimate Phase 1 app/backend reuse and integration-shell work now where boundaries are clear.
- Estimate high-dependency modules with explicit assumptions where API behavior is known at capability level but not contract level.
- Do not finalize estimates for payment reconciliation, FS/Iviva field contracts, BMS timeout/fallback, and hardware readiness until owner confirmations are received.
- Keep Phase 1.5 deferred scope out of Phase 1 estimates.

Overall readiness:

| Area | Readiness |
|---|---|
| Requirement/SOW baseline for estimation | Ready |
| TDD consolidation | Partially ready |
| Developer technical review | Ready with blockers |
| QA readiness register | Ready only after explicit PARQ handoff |
| Detailed QA/UAT scenario planning | Not ready from this task |

## 2. Estimation Readiness by Module

| Module | SOW / flow reference | Estimation category | What Dev can estimate now | TDD / API / dependency gap before final confidence | Recommended treatment |
|---|---|---|---|---|---|
| Authentication / SSO / BMS login check | FR-AUTH, UF-001 | Estimate with assumptions/open questions | IAM/SSO sign-in alignment, smart redirect handling, non-blocking BMS refresh integration shell, existing login reuse. | BMS `GET /members` with `account_id` technical contract, timeout, retry/circuit breaker, previous Workplace permission cache/freshness, support/audit path. | Estimate core auth reuse separately from BMS refresh controls. |
| Sign-up / onboarding | FR-SIGNUP, UF-003 | Estimate with assumptions/open questions | Phone-first flow alignment, email after phone verification, consent order, existing registration reuse, brand-new Retail creation path. | Field-level overwrite policy, incomplete registration cleanup, BMS/FS behavior during delayed Workplace activation, invitation/service-code scope detail. | Estimate mobile/backend flow changes with explicit dependency assumptions. |
| Retail/BZB matching and persona merge | FR-MERGE, UF-002 | Estimate with assumptions/open questions | Phone-first BZB lookup, acknowledgement screen integration, persona merge display, no automatic Retail creation for migrated users. | BZB conflict API behavior, wrong-merge manual correction runbook, protected profile/consent fields, BZB delete handling after hard delete. | Estimate normal path; add risk buffer or separate spike for conflict/recovery. |
| Workplace persona | FR-WP, UF-005 | Estimate with assumptions/open questions | Persona card/home display based on FS type, pending state shell, quick actions for Traffic/Map/Promotion webviews, parking entry point. | FS type contract, company/tower/floor metadata fields, cache invalidation, pending vs error behavior when authorization data is incomplete. | Estimate UI/persona orchestration; dependency assumptions required for data mapping. |
| Multi-Tower / Tower Context | FR-TOWER, UF-006 | Estimate with assumptions/open questions | Selected tower context UI, last-selected context behavior, temporary App State switching, hardware journey lock shell. | BMS `default_floor` schema, mapping to FS tower/floor/location IDs, App State lifecycle/invalidation, lock rule during elevator/turnstile journey. | Estimate state-management shell; hold final mapping effort pending BMS/FS. |
| My Profile / Default Floor | FR-PROFILE, UF-008 | Estimate with assumptions/open questions | Existing profile reuse, display of company/tower metadata, OBK default floor as-is behavior, PARQ view-only floor state. | FS floor authorization contract, missing-floor error/support routing, BMS/default floor mapping for OBK vs PARQ context. | Estimate profile UI reuse; add technical spike for floor/source mapping. |
| My QR / Access | FR-QR, UF-009/015/016 | Estimate with assumptions/open questions | QR screen reuse, QR availability before full floor authorization, access denial/support display shell. | QR validity/refresh, QR payload ownership, property specificity, replay behavior, hardware online validation outage/fallback. | Estimate app QR surface; do not finalize access reliability effort until FS/hardware controls are confirmed. |
| Parking Availability | FR-PARK-001 to FR-PARK-006, UF-010 | Estimate with assumptions/open questions | Location selector, One Bangkok/The PARQ branch, availability display, retry/unavailable state. | FS availability endpoint, property/location identifiers, refresh interval, stale-data threshold, future property scalability design. | Estimate UI and integration shell; keep FS field/refresh assumptions explicit. |
| Parking Ticket and QR PromptPay Payment | FR-PARK-007 to FR-PARK-015, UF-012 | Not ready to estimate until dependency resolved for final payment confidence | Ticket scan flow shell, property routing shell, capability hiding, Argento QR PromptPay initiation surface. | FS `park_syscode` / `park_name` values, PARQ rate source, ticket amount calculation, Argento callback/status/reconciliation/refund/support, paid-but-not-synced handling. | Split estimate: UI/routing can be estimated; payment/reconciliation final estimate blocked. |
| Visitor Pass | FR-VISITOR, UF-013 | Estimate with assumptions/open questions | Existing visitor-pass reuse, host context selection, local visitor pass workflow, support/unavailable state shell. | FS visitor registration contract, property/tower/floor context mapping, visitor access validation, pass validity/QR behavior, CMS visibility boundaries. | Estimate reuse path with FS contract assumptions. |
| Notification | FR-NOTIF, UF-014 | Estimate with assumptions/open questions | Existing OBK notification reuse, PARQ audience/segment linkage at high level, exclusion of PARQ CMS campaigns/building news. | Exact notification categories, consent behavior, segment owner, token/inbox cleanup proof after permanent delete. | Estimate configuration/integration discovery only until category/consent owner confirms. |
| CMS Multi-Property User Management | FR-CMS, UF-007 | Estimate with assumptions/open questions | View-only metadata screen/query changes, candidate filters, no persona metadata edit path, seed/manual access posture. | Filter list finalization, metadata field availability, Seed Account governance/audit owner, accepted cross-property visibility detail. | Estimate view-only scope; exclude Phase 1.5 organization isolation/RBAC UI. |
| Account Lifecycle / Delete / Reactivate | FR-LIFE, UF-004 | Estimate with assumptions/open questions | Existing IAM/SSO soft delete, reactivation, Day 31 wording alignment, permanent delete event references. | Exact `Suspens`/suspended status label, current `now - 1 month` vs Day 31 TDD note, BZB delete notification behavior, downstream cleanup consumers, event audit controls. | Estimate existing lifecycle alignment; separate cleanup/event reconciliation as dependency-risk item. |

## 3. TDD Gap Check

### 3.1 TDD Sections Needed

| TDD section | Why needed for estimation | Reusable source artifacts | Gap to resolve |
|---|---|---|---|
| Solution overview and Phase 1 / Phase 1.5 boundary | Prevents deferred features from entering Phase 1 estimates. | `PARQ-REQ-001`, `PARQ-SOT-002`, `PARQ-ARCH-010`, `PARQ-ARCH-011` | None for boundary; keep deferred scope explicit. |
| Identity, SSO, and account orchestration | Needed for UF-001/UF-003 estimate and auth reuse assumptions. | `PARQ-ARCH-011`, Drive as-is reference, `PARQ-ARCH-001` | BMS timeout/fallback, SSO sync fallback, account conflict/support handling. |
| Registration and onboarding | Needed for phone-first/email-next registration estimate. | `PARQ-REQ-001`, `PARQ-ARCH-011`, latest Drive add identity reference | Field overwrite policy, incomplete registration cleanup, invitation/service-code scope detail. |
| Persona resolution and data ownership | Needed for Workplace/Retail/persona-card estimates. | `PARQ-ARCH-004`, `PARQ-ARCH-005`, `PARQ-ARCH-011` | FS/BMS/BZB field contracts and stale/fallback behavior. |
| BMS integration | Needed for non-blocking login refresh and default-floor dependency. | `PARQ-SOT-002`, `PARQ-ARCH-007`, `PARQ-ARCH-010`, `PARQ-ARCH-011` | `GET /members` contract with `account_id`, timeout, retry/circuit breaker, `default_floor` schema. |
| FS/Iviva integration | Needed for Workplace, tower/floor, parking, visitor, elevator, turnstile estimates. | `PARQ-ARCH-001`, `PARQ-ARCH-004`, `PARQ-ARCH-005`, `PARQ-ARCH-010` | Field contracts by service, valid values, timeout/fallback, environment/hardware readiness. |
| BZB matching and merge | Needed for Retail persona and account merge estimates. | `PARQ-REQ-001`, `PARQ-ARCH-001`, `PARQ-ARCH-004` | Conflict API behavior, manual correction runbook, delete handling. |
| Parking ticket/payment | Needed for QR PromptPay estimate and operational risk. | `PARQ-REQ-001`, `PARQ-ARCH-004`, `PARQ-ARCH-009`, `PARQ-ARCH-010` | PARQ rate source, Argento callback/status/refund, FS sync/reconciliation, support flow. |
| Visitor pass and access | Needed for pass creation/access estimate. | `PARQ-ARCH-001`, `PARQ-ARCH-004`, `PARQ-ARCH-006` | FS registration contract, visitor QR validity, access validation fallback, CMS visibility boundary. |
| CMS view-only user management | Needed for admin/support estimate. | `PARQ-REQ-001`, `PARQ-ARCH-009`, `PARQ-ARCH-010` | Final filters, metadata fields, Seed Account governance/audit. |
| Notification integration | Needed for scope/cost of existing OBK notification reuse. | `PARQ-REQ-001`, `PARQ-ARCH-001`, `PARQ-ARCH-005` | Categories, consent, segment owner, cleanup proof. |
| Account lifecycle and Kafka/events | Needed for delete/reactivate estimate and compliance risk. | `PARQ-ARCH-011`, `PARQ-SOT-002`, Drive delete-account reference | Status wording, event consumer list, BZB delete behavior, documented runtime controls only. |
| Error handling and support escalation | Needed for integration estimate and operational readiness. | `PARQ-ARCH-005`, `PARQ-REQ-001` | Vendor error catalogs, timeout values, user/support copy, escalation contacts. |
| Environment and deployment readiness | Needed for estimation assumptions and later Quinn handoff. | `PARQ-ARCH-005`, `PARQ-ARCH-008`, `TASK_BOARD.md` | SIT/UAT/PVT endpoints, test data, named contacts, hardware window. |

### 3.2 Existing Architecture Artifacts to Reuse

| Artifact | Reuse for estimation / TDD |
|---|---|
| `PARQ_User_Flow_Integration_Architecture.md` | Flow-to-system mapping, sequence candidates, baseline integration risks. |
| `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md` | Data ownership, API inventory, context and boundary diagrams, vendor matrix. |
| `PARQ_Technical_Dependency_Control_Pack.md` | Vendor/API ownership, PII/consent gaps, error catalog baseline, environment readiness matrix. |
| `PARQ_Visual_Architecture_and_Flow_Pack.md` | Diagram-first orientation for non-technical review and sequence gap awareness. |
| `PARQ_BMS_Identity_Flow_Impact_Assessment.md` | BMS Option B non-blocking login decision and BMS impact boundaries. |
| `PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md` | Go/no-go posture for QA readiness planning with blockers. |
| `PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md` | Parking/tower/CMS/notification/lifecycle impact from UX updates. |
| `PARQ_Architecture_Dependency_Addendum_After_Bas_Confirmations.md` | Parking property detection, tower context, CMS risk, hardware blockers. |
| `PARQ_Drive_IAM_SSO_Source_Impact_Assessment.md` | IAM/SSO/API/event source impact; treat Drive content as as-is reference after Bas confirmation. |

### 3.3 Diagrams Needing Update or Addendum for Estimation

| Diagram / sequence | Estimation need | Priority |
|---|---|---|
| UF-001 Existing PARQ Sign-in | Add `GET /members` with `account_id` as non-blocking BMS refresh, timeout TBD, and previous Workplace permission fallback. | P1 |
| UF-003 Sign-up & Onboarding | Reflect v0.4 order: phone verification, email entry/verification, existing email redirect, consent, required info, brand-new Retail profile, FS check. | P1 |
| UF-002 Retail/BZB matching | Add phone-first lookup, acknowledgement-only merge, conflict/manual consolidation path. | P1 |
| UF-006 Multi-Tower | Split BMS `default_floor` persistent state from App State temporary switching and hardware journey lock. | P1 |
| UF-008 My Profile / Default Floor | Show OBK default floor as-is versus PARQ FS-driven view-only floor. | P2 |
| UF-009 My QR / Access | Add QR availability before full authorization, FS/hardware validation, QR validity open point. | P1 |
| UF-010 Parking Availability | Add selected Location and stale/unavailable behavior. | P2 |
| UF-012 Parking Ticket and Payment | Add selected Location + FS `park_syscode`/`park_name`, Argento QR PromptPay, callback/status/reconciliation gaps. | P1 |
| UF-013 Visitor Pass | Add host context, FS registration/access validation, local vs FS state divergence. | P2 |
| UF-014 Notification | Add existing OBK-only notification scope and cleanup dependency. | P2 |
| UF-004 Account Lifecycle | Add soft delete, reactivation within 30 days, Day 31 hard delete, SSO/BZB/Notification/BMS cleanup references. | P1 |
| UF-015/UF-016 Elevator/Turnstile | Add selected context, FS final authorization, hardware/site readiness blocker. | P1 |

## 4. API / Integration Gap Check

| Integration | Estimation impact | Known source position | Gap that affects estimate | Owner needed |
|---|---|---|---|---|
| BMS `GET /members` with `account_id` | Login-time Workplace refresh and previous-permission behavior. | Confirmed business wording for PARQ login; timeout TBD. | Request/response contract, timeout, retry/circuit breaker, audit, bound-to-other-account handling, previous-permission cache/freshness. | OBK BMS Service Team via PO, IAM owner |
| BMS `default_floor` | Tower/default floor and profile behavior. | Persistent tower/default floor uses BMS `default_floor`; temporary switch uses App State. | Schema, mapping to FS tower/floor/property IDs, invalidation and overwrite rules. | BMS, FS/Iviva, Mobile/Backend |
| FS/Iviva FS type and workplace metadata | Workplace persona, profile, access, tower context. | FS owns Workplace authorization. | Field contract for FS type, company, tower, floor, empty metadata filtering, pending/error rule. | FS/Iviva |
| FS/Iviva parking availability | Parking Availability estimate. | Selected Location drives location-specific availability. | Endpoint, property/location IDs, refresh interval, stale-data threshold, unavailable response. | FS/Iviva, OBK Backend |
| FS/Iviva ticket property | Parking Ticket routing estimate. | Selected Location plus `park_syscode` and `park_name`. | Valid values, mismatch behavior, display vs logic field, ticket lookup failure handling. | FS/Iviva |
| FS/Iviva visitor/access | Visitor pass, QR, elevator, turnstile estimates. | FS validates access and authorizations. | Visitor registration contract, QR validity/replay, elevator/turnstile timeout/outage behavior, audit owner. | FS/Iviva, site hardware owners |
| BZB matching/merge/delete | Retail merge and lifecycle cleanup. | Phone first, email secondary; BZB owns Retail identity. | Conflict contract, profile overwrite protection, wrong-merge correction, delete notification handling. | BZB, IAM |
| Argento QR PromptPay | Parking payment estimate. | Phase 1 includes QR PromptPay payment. | Payment initiation/callback/status/refund contracts, idempotency, duplicate callback handling, reconciliation, support ownership. | Argento, OBK Backend, Finance/Support |
| CMS view-only metadata/filter/governance | CMS Phase 1 estimate. | View-only metadata; RBAC/org isolation deferred/accepted risk. | Final filters, metadata sources, admin access scope, Seed Account governance, access audit. | CMS owner, Security, PARQ |
| Notification categories/consent/cleanup | Notification estimate. | Existing OBK mechanism only; PARQ CMS campaigns excluded. | Enabled categories, consent rules, audience/segment owner, permanent-delete cleanup proof. | Notification owner, IAM |
| Kafka delete/reactivation behavior | Lifecycle cleanup estimate. | Reference documented delete-account source only; do not invent runtime controls. | Consumer ownership, event audit, reactivation event use, BMS/Notification cleanup proof. | IAM, Kafka/Event Bus, BMS, Notification |
| Elevator/Turnstile hardware/site readiness | Hardware path estimate and later validation. | FS is final authorization owner; site contact/window blocked. | Named hardware contact, site testing window, test data, environment, escalation/fallback. | PARQ/Site Ops, FS/Iviva |

## 5. Estimation Risk Categories

### 5.1 Ready to Estimate

These can be estimated now with normal discovery assumptions:
- Requirement/SOW documentation handoff and TDD consolidation structure.
- Phase 1 / Phase 1.5 scope separation.
- Existing OBK app reuse analysis.
- Webview quick actions for Traffic, Map, and Promotion, assuming URLs/config already exist or are provided.
- Basic mobile UI shell work for persona cards, selected location, view-only CMS metadata, and support/unavailable states.

### 5.2 Estimate With Assumptions / Open Questions

These can be estimated with clear assumptions and risk buffers:
- Authentication / SSO / BMS login check.
- Sign-up / onboarding.
- Retail/BZB matching and persona merge.
- Workplace persona and pending state.
- Multi-Tower / Tower Context.
- My Profile / Default Floor.
- My QR / Access screen behavior.
- Parking Availability.
- Visitor Pass.
- Notification using existing OBK mechanism.
- CMS Multi-Property User Management view-only.
- Account Lifecycle / Delete / Reactivate.

### 5.3 Not Ready to Estimate Until Dependency Resolved

These should not receive final estimates without owner confirmation:
- BMS timeout, retry/circuit breaker, audit, and previous-permission fallback.
- FS/Iviva field contracts for FS type, tower/floor, parking availability, `park_syscode`, `park_name`, visitor/access validation.
- Argento QR PromptPay callback/status/reconciliation/refund/support behavior.
- Hardware/site readiness for elevator and turnstile.
- Kafka/event runtime controls that are not already documented in delete-account source.
- CMS Seed Account governance/audit if estimate includes admin access control work beyond view-only display.

## 6. Recommended Estimation Sequencing

| Sequence | Estimate item | Why this order | Dependency note |
|---|---|---|---|
| 1 | Scope boundary and existing OBK reuse mapping | Prevents Phase 1.5 and legacy app work from entering Phase 1 estimate. | Use `PARQ-REQ-001 v0.4`; exclude deferred items. |
| 2 | IAM/SSO/authentication baseline | Login and registration are prerequisites for most journeys. | BMS refresh estimated separately because timeout/fallback is open. |
| 3 | Identity/persona/profile shell | Enables Workplace/Retail/Multi-Tower/My Profile estimates. | FS/BMS/BZB contracts remain assumptions. |
| 4 | BMS and FS data contract alignment spike | Reduces uncertainty before tower/access/parking estimates are finalized. | Needs BMS and FS owners. |
| 5 | Parking availability and ticket routing shell | Can progress before full payment reconciliation if property routing is separated. | FS field values still needed. |
| 6 | Argento QR PromptPay payment integration | Highest operational risk in parking. | Needs Argento callback/status/refund/reconciliation details. |
| 7 | Visitor pass and My QR/access integration | Reuses identity/persona and FS context outputs. | Needs FS access and QR validity confirmation. |
| 8 | Elevator and turnstile integration | Hardware/site path is a gating dependency. | Do API estimate now; final hardware estimate waits for contact/window. |
| 9 | CMS and notification | Can be estimated as view-only/configuration with clear exclusions. | Need CMS governance and notification categories/consent. |
| 10 | Account lifecycle and cleanup | Can reuse IAM/SSO references but cleanup needs downstream owners. | Kafka behavior constrained to documented source. |

## 7. Phase 1.5 Exclusion Control

The following must be excluded from Phase 1 estimation unless Bas/PARQ explicitly changes scope:
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

Reserve architecture awareness only where avoiding rework matters, especially parking data model and CMS boundary, but do not estimate delivery effort as Phase 1.

## 8. Estimation Decision Log for Dev

| Decision / posture | Estimation effect |
|---|---|
| `PARQ-REQ-001 v0.4` is accepted for internal estimation. | Dev can use it as module baseline. |
| `PARQ-SOT-006` is as-is technical reference only, not PARQ source of truth. | Use for current app behavior and TDD reference, not as new PARQ scope. |
| Drive `add_identity_flow.md` is latest existing app flow; repository copy is older. | Use Drive reference when estimating add identity/current app reuse. |
| Business lifecycle wording is within 30 days / Day 31; TDD may note `now - 1 month`. | Estimate UX/support wording using Day 31; technical implementation needs TDD note. |
| PARQ login-time BMS check uses `GET /members` with `account_id`; timeout TBD. | Estimate endpoint integration with timeout/fallback risk separated. |
| Phase 1 includes QR PromptPay payment and excludes user self-redemption. | Include Argento QR PromptPay; exclude redemption automation. |
| CMS Phase 1 is view-only and metadata editing is out. | Estimate view-only admin surfaces only. |
| Hardware contact/window remains blocked. | Do not claim final elevator/turnstile readiness estimate. |

## 9. Recommended Next Owner

Recommended next owner: PARQ / Bas.

Reason:
- Simon has completed the estimation/TDD gap check.
- The next action is coordination: decide which dependency owners must answer before estimation workshops, and explicitly approve whether Quinn can start a readiness register from this artifact.
- Quinn should not start detailed QA/UAT scenario planning from this task.

Recommended next task:
- PARQ should route the dependency questions to BMS, FS/Iviva, Argento, BZB, CMS, Notification, IAM/SSO, Kafka/Event Bus, and hardware/site owners, then authorize either:
  - Developer estimation with documented assumptions, or
  - Quinn readiness-register preparation only, after PARQ explicit handoff.

Expected output:
- Dependency owner confirmation list.
- Estimation assumption register.
- Decision on whether Quinn starts QA readiness register only.

## 10. Readiness Statement

| Readiness area | Status | Statement |
|---|---|---|
| Requirement/SOW drafting | Ready / accepted baseline | `PARQ-REQ-001 v0.4` is accepted for internal estimation. Do not rewrite it for this task. |
| TDD consolidation | Partially ready | TDD structure and reusable architecture inputs are clear; final TDD needs API/data/event contracts and owner confirmations. |
| QA readiness register | Ready after explicit PARQ handoff | Quinn can prepare dependency readiness register only after PARQ authorizes handoff. No scenarios from this task. |
| Developer technical review | Ready with blockers | Dev can review and estimate bounded work now, but final confidence depends on BMS timeout, FS field contracts, Argento payment details, CMS governance, notification categories/consent, Kafka controls, and hardware readiness. |
