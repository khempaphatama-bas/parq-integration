# PARQ Technical Estimation Planning Assumption Pack

Owner: Simon / Senior Solution Architect

Input files:
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`
- `02_Discovery/PARQ_Requirement_Specification_and_Scope_of_Work.md` (`PARQ-REQ-001 v0.4`, Accepted for Internal Estimation)
- `03_Architecture/PARQ_Technical_Estimation_Alignment_and_TDD_Gap_Check.md` (`PARQ-ARCH-012`)
- Supporting architecture references where needed:
  - `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
  - `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`
  - `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`
  - `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`
  - `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`
  - `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md`
  - `03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md`
  - `03_Architecture/PARQ_Architecture_Dependency_Addendum_After_Bas_Confirmations.md`
  - `03_Architecture/PARQ_Drive_IAM_SSO_Source_Impact_Assessment.md`

Output file path: `03_Architecture/PARQ_Technical_Estimation_Planning_Assumption_Pack.md`

Status: Draft / Ready for PARQ and developer estimation planning review

Downstream consumer:
- PARQ / Bas for planning control and later dependency routing
- Developer estimation team for effort framing and risk separation
- Libra for indexing and traceability
- Quinn for later QA readiness input only after explicit PARQ/Bas handoff
- Molly for scope wording awareness only, without SOW rewrite

Rules applied:
- `PARQ-REQ-001 v0.4` is used as the accepted Requirement/SOW baseline and is not rewritten.
- No user stories, acceptance criteria, QA scenarios, UAT scenarios, or detailed test cases are created.
- No final TDD/API contracts are created.
- Missing endpoint behavior, timeout values, owner confirmations, environments, test data, schedules, and vendor decisions remain open questions or blockers.
- External/system owner confirmation is unavailable for now; this pack separates confirmed facts from assumptions and blockers.
- Phase 1.5 deferred/future scope is kept out of Phase 1 implementation planning unless explicitly listed as a deferred dependency.

## 1. Planning Purpose and Baseline References

This pack converts the accepted Requirement/SOW baseline and Simon's TDD gap check into a planning-control view for technical estimation.

Purpose:
- Help Bas and developers start estimation planning without treating unresolved dependencies as confirmed.
- Separate Phase 1 implementation work into bounded reuse, assumption-based integration work, and blocked dependency work.
- Preserve unresolved items for later Bas/PO routing when external/system contacts become available.
- Keep Quinn gated until PARQ/Bas explicitly approves QA readiness work.

Baseline references:
- `PARQ-REQ-001 v0.4` is accepted for internal estimation.
- `PARQ-ARCH-012` confirms the SOW is technically usable for estimation, but not a complete TDD baseline.
- Bas has confirmed a total project window of 6 months and an implementation window of 4 months.
- Bas is the PO / coordination owner.
- External/system owners cannot be contacted for this planning step; no dependency confirmation is marked as resolved by this pack.

Status legend:

| Status | Meaning in this pack |
|---|---|
| Confirmed | Recorded in repository source or Bas/PARQ confirmation. |
| Assumption | Usable for planning/estimation only; must be validated before final design or implementation closure. |
| Blocked | Cannot be finalized until dependency, owner, contract, environment, or hardware information is available. |
| Deferred | Explicit Phase 1.5 / future scope, excluded from Phase 1 implementation estimate unless re-approved. |

## 2. Timeline Planning Frame

Confirmed frame:

| Item | Planning position |
|---|---|
| Total project window | 6 months |
| Implementation window | 4 months |
| QA readiness ownership | Quinn should not start yet; later work requires explicit PARQ/Bas handoff. |
| PO / coordination owner | Bas |
| External/system owner contact | Unavailable for now; planning must use assumptions and blocker tracking. |

Planning interpretation:
- The 4-month implementation window should be treated as an internal planning frame, not a confirmed calendar schedule.
- The remaining project envelope is expected to absorb estimation alignment, dependency confirmation, SIT/UAT/PVT readiness, release readiness, and stakeholder coordination.
- Because endpoint contracts, vendor behavior, environments, hardware access, named contacts, and test data are not fully confirmed, the implementation plan must not imply that high-dependency items are ready for deterministic delivery.

## 3. Phase 1 Implementation Workstream Proposal

| Workstream | Phase 1 scope included | Planning status | Key dependency posture |
|---|---|---|---|
| WS1 Identity, SSO, and BMS login refresh | Existing PARQ sign-in, smart redirect, SSO/IAM alignment, non-blocking BMS login refresh, account reactivation alignment. | Estimate with assumptions | BMS path is confirmed as `GET /members` with `account_id`, but timeout, retry/circuit breaker, audit, and previous-permission freshness remain open. |
| WS2 Registration, persona, profile, and tower context | Phone-first registration, Retail profile creation for brand-new users, Workplace persona display, profile/default floor, saved tower/default floor, temporary tower switch. | Estimate with assumptions | BMS `default_floor`, FS/Iviva workplace metadata, tower/floor mappings, and pending/error rules remain open. |
| WS3 Retail/BZB identity matching and merge | Phone-first BZB lookup, email secondary matching, mandatory merge acknowledgement, conflict/support path. | Estimate with assumptions | BZB conflict contract, wrong-merge manual correction, protected fields, and deletion behavior remain open. |
| WS4 Parking availability, ticket routing, and QR PromptPay payment | Location-selected availability, ticket property detection, One Bangkok vs The PARQ routing, The PARQ QR PromptPay payment surface. | Partly blocked for final confidence | UI/routing shell can be estimated; FS `park_syscode` / `park_name`, rate source, Argento callback/status/reconciliation/refund/support remain blockers. |
| WS5 Visitor pass, My QR, elevator, and turnstile access | Visitor pass workflow, My QR, FS authorization, elevator call, turnstile access. | Estimate with assumptions; hardware validation blocked | FS visitor/access contracts and QR rules are open; The PARQ hardware key contact and site testing window are blocked. |
| WS6 CMS, notification, lifecycle, and cleanup | View-only CMS metadata, existing OBK notification reuse, soft delete/reactivation/hard delete, documented Kafka cleanup references. | Estimate with assumptions | CMS Seed Account governance/audit, notification categories/consent/cleanup proof, and event consumer responsibilities remain open where not documented. |
| WS7 Cross-cutting TDD, error handling, support, and dependency control | TDD consolidation skeleton, API inventory updates, error catalog, support escalation, audit/reconciliation tracking. | Estimate as planning and technical governance work | Must not become final API/TDD contracts until dependency details are confirmed. |

## 4. Modules Ready to Estimate Now

These items can be estimated as bounded Phase 1 planning, reuse, or shell work.

| Module / work item | Why it is ready | Estimation boundary |
|---|---|---|
| Phase 1 / Phase 1.5 scope separation | Confirmed in `PARQ-REQ-001 v0.4` and clarification log. | Exclude Phase 1.5 delivery effort. Include only architecture awareness where needed to avoid rework. |
| Existing OBK app reuse analysis | Existing app capabilities are known at capability level from source/reference artifacts. | Estimate discovery and mapping work; do not assume untouched code can be reused without developer review. |
| TDD consolidation skeleton | `PARQ-ARCH-012` identifies required sections and reusable artifacts. | Estimate documentation structure and gap registration, not final contracts. |
| Webview quick actions for Traffic, Map, and Promotion | Phase 1 webview quick-action boundary is confirmed. | Estimate shell/configuration assuming URLs/config are provided later. Missing URLs remain open. |
| Basic UI shell for persona/location/support states | SOW defines business behavior at a sufficient planning level. | Estimate shell and state handling; data contracts remain assumptions. |
| CMS view-only metadata shell | Phase 1 is view-only for persona/company/property/tower/status metadata. | Estimate view-only surface/filter shell; exclude metadata editing, organization isolation, CMS sub-menu, and Phase 1.5 governance controls. |

## 5. Modules Estimable Only With Assumptions

These modules can enter planning estimates only if assumptions are explicitly recorded and reviewed.

| Module | Estimation assumption | Required later confirmation |
|---|---|---|
| Authentication / SSO / BMS login check | OBK IAM/SSO login flow can be reused; BMS login refresh is non-blocking. | BMS technical contract, timeout, fallback, previous-permission cache/freshness, audit, and rare conflict path. |
| Sign-up and onboarding | Existing registration flow can support phone-first, email-next, consent, brand-new Retail creation, and delayed Workplace activation. | Field overwrite policy, incomplete registration cleanup, invitation/service-code detail, and FS/BMS delayed activation behavior. |
| Retail/BZB matching and persona merge | Normal phone-first lookup and mandatory acknowledgement flow can be estimated separately from conflict recovery. | BZB conflict response, profile/consent overwrite protections, wrong-merge runbook, and hard-delete notification behavior. |
| Workplace persona | FS type detection is sufficient to drive Workplace persona and pending state shell. | FS type contract, company/tower/floor fields, empty metadata handling, stale/cache invalidation, pending vs error behavior. |
| Multi-Tower / Tower Context | Persistent default floor/tower uses BMS `default_floor`; temporary switch uses App State. | BMS schema, FS mapping, App State lifecycle/invalidation, lock rule during hardware journey. |
| My Profile / Default Floor | Existing profile shell can show PARQ workplace metadata as view-only. | OBK vs PARQ floor source behavior, FS floor authorization contract, missing-floor support path. |
| My QR / Access | Existing QR screen can be reused as access identity surface. | QR payload ownership, expiry/refresh, replay protection, property specificity, FS/hardware outage behavior. |
| Parking Availability | Location selector and availability display can be estimated with FS availability assumption. | FS endpoint, property/location identifiers, refresh interval, stale threshold, unavailable state behavior. |
| Visitor Pass | Existing visitor-pass pattern can be reused at workflow level. | FS visitor registration contract, host context mapping, visitor QR validity, local-vs-FS divergence handling, CMS visibility boundary. |
| Notification | Existing OBK notification infrastructure is reused for Phase 1. | Notification categories, consent rules, PARQ audience/segment owner, token/inbox cleanup proof. |
| Account Lifecycle / Delete / Reactivate | Existing IAM/SSO lifecycle can be aligned to Day 31 business wording and documented delete events. | Exact suspended status label, TDD note for `now - 1 month`, BZB/BMS/Notification cleanup behavior, documented event audit controls. |

## 6. Modules Not Ready Until Dependency Confirmation

These areas should not receive final implementation estimates until the blocker is resolved or explicitly accepted by Bas/PARQ.

| Blocked module / capability | Blocking dependency | Why final estimate is not ready |
|---|---|---|
| BMS login-time refresh controls | Timeout, retry/circuit breaker, fallback, audit, monitoring, previous-permission freshness. | Non-blocking behavior is decided, but runtime control design is not confirmed. |
| FS/Iviva workplace and access contracts | FS type, company, tower, floor, parking, visitor, elevator, turnstile field contracts and valid values. | Multiple Phase 1 journeys rely on FS authorization and metadata. |
| Parking Ticket final confidence | FS ticket fields, PARQ rate source, fee calculation source, ticket mismatch handling. | Routing shell can be estimated, but payment amount and operational behavior cannot be finalized. |
| Argento QR PromptPay payment operations | Payment initiation, callback/status, duplicate callback, refund, reconciliation, support ownership. | Highest operational/reconciliation risk in Phase 1 parking. |
| The PARQ elevator/turnstile hardware validation | Named hardware/site contact, test window, test data, environment, escalation/fallback. | API/shell estimate is possible; end-to-end hardware readiness is blocked. |
| CMS Seed Account governance beyond view-only shell | Manual/Seed Account owner, access audit, cross-property visibility controls. | Phase 1 risk is accepted, but operational control detail remains open. |
| Notification cleanup and category behavior | Exact categories, consent, audience ownership, permanent-delete cleanup proof. | Existing infrastructure is reused, but compliance/cleanup confidence is not complete. |
| Kafka/event consumer responsibilities beyond documented delete source | Consumer list, idempotency, retry/DLQ/replay/audit where not documented. | Bas confirmed not to invent Kafka runtime controls beyond documented source. |

## 7. Technical Assumptions Register

| ID | Assumption | Basis | Applies to | Planning use | Confirmation required later | Status |
|---|---|---|---|---|---|---|
| ASSUMP-001 | Existing OBK IAM/SSO capabilities can be reused for PARQ login, registration, delete, and reactivation alignment. | `PARQ-REQ-001 v0.4`, `PARQ-ARCH-012`, Drive as-is reference. | Auth, signup, lifecycle. | Enables bounded reuse estimate. | Developer review of actual implementation touchpoints. | Assumption |
| ASSUMP-002 | Login-time BMS refresh is non-blocking; users can enter the app if BMS is unavailable. | `DEC-BMS-001`, `DEC-BMS-002`. | Auth, Workplace persona. | Estimate login shell separately from BMS runtime controls. | Timeout, retry/circuit breaker, audit, stale permission behavior. | Assumption with confirmed business decision |
| ASSUMP-003 | External/system owner confirmation is unavailable during this planning step. | PARQ handoff instruction. | All integrations. | Keeps blocker register active. | Bas/PO to route later when contacts become available. | Confirmed planning constraint |
| ASSUMP-004 | FS/Iviva remains the authority for Workplace authorization, building access, parking, visitor, elevator, and turnstile validation. | Clarification decision log and architecture artifacts. | Workplace, parking, visitor, access. | Supports workstream grouping. | Field contracts, valid values, timeout/fallback, environment readiness. | Confirmed at ownership level; contract blocked |
| ASSUMP-005 | Phase 1 includes QR PromptPay parking payment and excludes user self-redemption. | `DEC-SCOPE-002`, `DEC-SCOPE-003`. | Parking payment. | Keeps self-redemption out of estimate. | Argento and FS operational contracts. | Confirmed scope |
| ASSUMP-006 | Store whitelist, automated E-stamp, OCR redemption, automated gate sync, Organization Isolation, CMS sub-menu, and rate configuration are Phase 1.5 / Deferred Future Phase. | `DEC-SCOPE-004`. | Parking, CMS, redemption. | Exclude from Phase 1 estimate. | New Bas/PARQ approval if scope changes. | Deferred |
| ASSUMP-007 | CMS Phase 1 is view-only for persona/company/property/tower/status metadata with manual/Seed Account controls. | `DEC-CMS-001`, `SF-CMS-001`. | CMS admin/support. | Estimate view-only shell only. | Seed Account governance/audit owner and access controls. | Assumption with accepted risk |
| ASSUMP-008 | Phase 1 notification reuses existing OBK notification infrastructure only. | `DEC-NOTIF-001`, `DEC-NOTIF-002`. | Notification. | Estimate reuse/configuration discovery only. | Categories, consent, segment owner, cleanup proof. | Confirmed scope with open details |
| ASSUMP-009 | Hardware journeys can be estimated at API/shell level before site validation. | `PARQ-ARCH-012`, `SF-HW-001`. | Elevator, turnstile, My QR, visitor access. | Allows partial developer estimate. | Named site contact, testing window, environment, test data, fallback. | Assumption; hardware blocked |
| ASSUMP-010 | Business/SOW wording uses `within 30 days / Day 31`; TDD may note current implementation uses `now - 1 month`. | `DEC-LIFE-005`. | Account lifecycle. | Prevents wording conflict in estimation discussions. | Developer confirmation of exact implementation timing and user-facing copy. | Confirmed wording; implementation note remains |

## 8. Dependency / Blocker Register

| ID | Dependency / blocker | Status | Affected modules | Planning / estimation impact | Owner to raise later |
|---|---|---|---|---|---|
| BLK-001 | BMS `GET /members` with `account_id` timeout and runtime controls. | Open / Blocked | Login, Workplace refresh, persona. | Estimate non-blocking shell; hold final reliability/control estimate. | Bas/PO to OBK BMS Service Team and IAM owner. |
| BLK-002 | BMS previous Workplace permission source and freshness when BMS is unavailable. | Open / Blocked | Login, Workplace persona. | Required to estimate fallback behavior beyond shell. | Bas/PO to IAM/BMS/FS owners. |
| BLK-003 | BMS `default_floor` schema and mapping to FS tower/floor/property identifiers. | Open / Blocked | Tower context, profile/default floor, access. | Estimate state-management shell; hold mapping finalization. | Bas/PO to BMS and FS/Iviva owners. |
| BLK-004 | FS/Iviva field contracts and valid values for Workplace, parking, visitor, elevator, and turnstile. | Open / Blocked | Workplace, parking, visitor, access. | Major blocker for final integration estimates. | Bas/PO to FS/Iviva / Frasers Property. |
| BLK-005 | Argento QR PromptPay callback/status/refund/reconciliation/support behavior. | Open / Blocked | Parking payment. | Payment shell can be estimated; operational/payment confidence blocked. | Bas/PO to Argento, OBK Backend, Finance/Support. |
| BLK-006 | BZB conflict, overwrite, wrong-merge, and delete handling. | Open | Retail merge, lifecycle. | Normal path can be estimated; conflict/recovery effort remains uncertain. | Bas/PO to BZB and IAM owners. |
| BLK-007 | CMS Seed Account governance/audit and cross-property visibility controls. | Open | CMS, support operations. | View-only shell can be estimated; governance work cannot be finalized. | Bas/PO to CMS owner, Security, PARQ. |
| BLK-008 | Notification categories, consent, audience ownership, and cleanup proof. | Open | Notification, account deletion. | Existing mechanism reuse can be estimated; compliance/detail effort remains uncertain. | Bas/PO to Notification and IAM owners. |
| BLK-009 | Kafka event consumer responsibilities, idempotency, retry/DLQ/replay/audit where not documented. | Open | Lifecycle, cleanup. | Use documented delete-account source only; do not estimate invented controls as confirmed. | Bas/PO to IAM and Kafka/Event Bus owners. |
| BLK-010 | The PARQ hardware/site key contact and testing window. | Blocked | Elevator, turnstile, My QR, visitor access. | API/shell estimate possible; end-to-end readiness and stabilization blocked. | Bas/PO to PARQ / Site Operations / FS/Iviva. |
| BLK-011 | SIT/UAT/PVT environments, test data, named escalation contacts, and vendor availability. | Blocked for QA readiness planning start | All integrations. | Quinn should not start yet; later readiness register requires explicit handoff. | Bas/PARQ. |
| BLK-012 | The PARQ concierge redemption platform operational owner and support workflow. | Open | Parking/redemption boundary, support. | Keep self-redemption and OBK CMS redemption management out of Phase 1 estimate. | Bas/PO to The PARQ / Product owner. |

## 9. Suggested Implementation Sequencing for the 4-Month Window

This is a planning sequence, not a confirmed delivery schedule.

| Implementation frame | Planning focus | Work that can proceed | Work that remains gated |
|---|---|---|---|
| Month 1 planning frame | Foundation, reuse mapping, identity baseline, and TDD skeleton. | OBK reuse assessment, SOW-to-module mapping, IAM/SSO shell, registration shell, BMS non-blocking placeholder, API gap register. | BMS runtime controls, FS/Iviva contracts, vendor confirmations. |
| Month 2 planning frame | Persona, tower/profile, parking availability, and ticket routing shell. | Workplace persona shell, pending/error states, tower App State shell, BMS default-floor placeholder, selected-location availability UI, ticket routing shell. | FS field values, BMS default-floor schema, parking rate/ticket contract. |
| Month 3 planning frame | High-dependency integrations and operational flows. | Argento payment integration shell, visitor pass workflow, My QR/access shell, lifecycle cleanup alignment, CMS view-only shell, notification reuse discovery. | Payment reconciliation/refund/support, visitor/access contracts, event controls beyond source, notification category/consent detail. |
| Month 4 planning frame | Stabilization, integration hardening, support readiness, and QA handoff preparation. | Error/support catalog alignment, audit/reconciliation checklist, developer review closure, readiness inputs for Quinn if PARQ/Bas approves. | Site hardware validation, named contacts, test windows, environment/test data readiness, unresolved vendor decisions. |

Key sequencing recommendation:
- Estimate bounded reuse and shell work separately from high-dependency integration work.
- Do not put hardware end-to-end readiness, payment reconciliation confidence, or vendor runtime controls into the base estimate unless the relevant blocker is resolved.
- Keep Phase 1.5 items out of all Month 1-4 Phase 1 estimates.

## 10. Confirmation List for Bas / PO to Raise Later

When contacts become available, Bas/PO should raise the following without treating this pack as final API/TDD approval.

| Area | Confirmation needed |
|---|---|
| IAM / SSO | Exact implementation touchpoints for PARQ login, registration, account reactivation, SSO sync fallback, lifecycle status naming, and audit ownership. |
| BMS | `GET /members` contract with `account_id`, timeout, retry/circuit breaker, monitoring, previous Workplace permission source/freshness, bound-to-other-account behavior, and `default_floor` schema. |
| FS/Iviva | Field contracts and valid values for FS type, company, tower, floor, parking availability, `park_syscode`, `park_name`, visitor registration, QR/access validation, elevator, and turnstile. |
| BZB | Matching/merge conflict contract, profile overwrite protections, wrong-merge correction process, hard-delete/delete notification behavior. |
| Argento | QR PromptPay initiation, callback/status contract, idempotency, duplicate callback handling, refund, reconciliation, support ownership, and audit data. |
| CMS / Security | View-only filters, metadata sources, Seed Account governance, access audit, cross-property visibility control, and escalation owner. |
| Notification | Phase 1 notification categories, consent rules, PARQ segment/audience owner, token/inbox cleanup behavior, and permanent-delete proof. |
| Kafka / Event Bus | Confirm documented delete-account event behavior, consumers, idempotency, retry/DLQ/replay/audit only where source exists. |
| Elevator / Turnstile / Site Ops | Named The PARQ hardware/site key contact, site testing window, test data, environment, fallback, escalation path. |
| Product / Support | User/support copy for BMS conflict, ticket property detection failure, payment paid-but-not-synced, access denial, missing floor, and account lifecycle naming. |

## 11. Recommendation on Quinn Start Timing

Current recommendation: Quinn should not start yet.

Reason:
- Bas confirmed Quinn should not start at this step.
- This pack is for technical estimation and implementation planning assumptions, not QA readiness work.
- Environment, vendor contacts, test data, hardware testing window, timeout/fallback rules, audit/reconciliation rules, and API contracts remain unresolved.

Recommended trigger for Quinn later:
- PARQ/Bas explicitly hand off QA readiness work.
- Bas/PARQ accept or approve the planning assumption pack as an estimation input.
- Developer estimation has separated base scope, assumption scope, and blocked scope.
- At minimum, a readiness register can be prepared without creating QA scenarios only after PARQ/Bas approves that handoff.

Quinn should still not create detailed SIT/UAT scenarios, negative cases, or regression matrices until the required contracts, environments, named contacts, and test data are available.

## 12. Developer Estimation Guidance

Developers should estimate Phase 1 using separated estimate buckets.

| Estimate bucket | Include | Exclude |
|---|---|---|
| Base reuse / shell estimate | Existing OBK reuse, UI shell, state shell, routing shell, configuration, TDD skeleton, known Phase 1 flow changes. | Vendor-specific runtime behavior that is not confirmed. |
| Assumption-based integration estimate | Integration work where capability is confirmed but contract is incomplete, such as BMS non-blocking refresh, FS-driven persona, BZB normal matching, notification reuse, CMS view-only. | Final SLA, timeout, reconciliation, audit, and site/hardware confidence unless confirmed. |
| Blocked / spike estimate | Technical spikes or optional contingency for BMS controls, FS contracts, Argento payment operations, hardware validation, Kafka controls, CMS governance. | Treating blockers as resolved delivery scope. |
| Deferred / Phase 1.5 exclusion | Architecture awareness only where needed to avoid rework. | Store whitelist, automated E-stamp, OCR redemption, automated gate sync, Organization Isolation, CMS sub-menu, rate configuration, user self-redemption, OBK CMS management of The PARQ redemption. |

For each module estimate, developers should capture:
- Scope included.
- Existing OBK reuse expected.
- Integration surfaces touched.
- Assumptions used.
- Blockers not resolved.
- Deferred items explicitly excluded.
- Confidence level: High, Medium, or Low.

Suggested confidence posture:

| Confidence | Use when |
|---|---|
| High | Existing OBK behavior is reused and no unresolved external contract drives the estimate. |
| Medium | Business behavior is clear, but one or more API/data assumptions remain. |
| Low | External runtime behavior, payment reconciliation, hardware validation, or vendor support ownership drives the estimate. |

## 13. Architecture and TDD Follow-Up Control

This pack does not replace the TDD. It identifies what the TDD must later consolidate.

Architecture/TDD areas that need follow-up:
- BMS runtime controls and `default_floor` mapping.
- FS/Iviva data contracts and access/parking/visitor field values.
- Argento payment callback/status/reconciliation/refund behavior.
- BZB conflict and lifecycle delete behavior.
- CMS view-only metadata, Seed Account governance, and access audit.
- Notification categories, consent, segmentation, and cleanup proof.
- Kafka/event behavior only where source-documented.
- Hardware readiness and site test dependency.
- Sequence diagram addenda identified in `PARQ-ARCH-012`.

## 14. Recommended Next Owner

Recommended next owner: PARQ / Bas.

Reason:
- The next step is not more architecture generation. It is coordination control: review this pack, decide whether it is acceptable for developer estimation planning, and decide what dependency questions Bas/PO should queue for later owner contact.
- Quinn remains gated and should not start until PARQ/Bas explicitly approves QA readiness work.
- Libra should update portal/index traceability later only if PARQ/Bas requests formal filing beyond the repository control updates already made with this pack.

Recommended next task:
- PARQ/Bas review `PARQ-ARCH-013` and confirm whether developers may use it as the estimation planning assumption baseline.
- If approved, prepare a developer estimation briefing that separates base reuse/shell estimates, assumption-based estimates, blocked/spike estimates, and Phase 1.5 exclusions.
