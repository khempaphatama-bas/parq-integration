# PARQ Architecture Dependency Addendum After Bas Confirmations

Owner: Simon / Senior Solution Architect

Input files:
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`
- `03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md`
- `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md`
- `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`
- `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`
- `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`

Additional Bas confirmations provided for this addendum:
- BMS login member lookup path is confirmed as `GET /members/by-account-id`; timeout remains TBD.
- Parking Ticket property detection uses selected Location plus FS fields `park_syscode` and `park_name`.
- Tower persistence uses BMS `default_floor`; temporary tower switching uses App State.
- CMS RBAC/cross-property visibility is accepted Phase 1 risk with manual / Seed Account controls.
- The PARQ hardware key contact and site testing window remain blocked.

Output file path: `03_Architecture/PARQ_Architecture_Dependency_Addendum_After_Bas_Confirmations.md`

Status: Draft / Architecture dependency addendum with remaining blockers

Downstream consumer:
- Developer technical reviewers
- Quinn / QA Lead for readiness dependency register inputs
- PARQ / Orchestrator for blocker tracking
- Libra / Project Librarian for indexing
- Molly / Assistant PO for UX/business wording alignment

Rules applied:
- No user stories are created.
- No acceptance criteria are created.
- No QA scenarios, UAT scenarios, or test cases are created.
- Missing timeout, hardware contacts, test schedules, payloads, and fallback rules remain open questions.
- This addendum updates architecture readiness only; it does not replace approved source artifacts.

## 1. Executive Summary

The latest Bas confirmations reduce uncertainty in five architecture areas: BMS API path, Parking Ticket property detection, Tower Context persistence, CMS Phase 1 risk posture, and hardware readiness blockers.

Developer technical review can proceed with a sharper integration boundary:
- BMS endpoint path is now clear enough for interface review, but timeout/fallback control design is still blocked.
- Parking Ticket routing now has confirmed data inputs: selected Location, `park_syscode`, and `park_name`.
- Tower Context now has a persistence split: BMS `default_floor` for default/persistent context, App State for temporary switching.
- CMS RBAC/cross-property visibility is an accepted Phase 1 risk, not an unresolved architecture decision, but manual/Seed Account controls must be operationally explicit.
- Elevator/turnstile/site validation remains blocked by missing The PARQ hardware key contact and site testing window.

Overall developer review implication: Go with blockers. Implementation design can be reviewed for dependency alignment, but timeout, fallback, operational control, and hardware readiness cannot be finalized.

## 2. Confirmed Decisions and Impact

| Area | Previously Open / Partially Open | Bas Confirmation Applied | Architecture Impact | Remaining Blocker |
|---|---|---|---|---|
| BMS | Exact login-time BMS API path was open between `checkMember` family and `GET /members/by-account-id`. | Use BMS `GET /members/by-account-id` path for member lookup. | UF-001 can now reference `GET /members/by-account-id` as the confirmed BMS login refresh path. IAM remains the login-time orchestration owner; BMS remains member source. | Timeout, retry, circuit breaker, audit, monitoring, previous-permission freshness, and bound-to-other-account support path remain TBD. |
| Parking Ticket | Ticket property detection method was open. | Use selected Location plus FS fields `park_syscode` and `park_name`. | UF-012 routing can now be based on app-selected location context plus FS returned property/parking identifiers. | Exact FS response contract, source of selected Location ID, mismatch handling, and reconciliation fallback remain open. |
| Tower Context | Selected tower persistence location and invalidation were open. | Persistent tower/default floor uses BMS `default_floor`; temporary switching uses App State. | UF-006, UF-015, and UF-016 should separate persistent default floor from temporary tower context. | Exact `default_floor` schema, mapping to FS tower/floor/location IDs, invalidation rule, and active hardware journey lock rule remain open. |
| CMS Phase 1 | RBAC/cross-property visibility was an unresolved risk. | Accepted Phase 1 risk with manual / Seed Account controls. | Architecture should classify this as accepted operational risk with compensating controls, not a blocker to Phase 1 technical review. | Manual control detail, admin scope, access audit, and named owner remain open. |
| Hardware readiness | Hardware readiness was broadly open. | The PARQ hardware key contact and site testing window remain blocked. | Elevator and turnstile architecture remains correct, but readiness cannot move to final validation planning. | Named hardware contact, site access window, hardware environment, test data, escalation path, and fallback procedure remain blocked. |

## 3. Focus Area Assessment

### 3.1 BMS `GET /members/by-account-id`

| Dimension | Assessment |
|---|---|
| Architecture update | Replace generic "BMS member-check capability family" wording in future UF-001 updates with confirmed `GET /members/by-account-id` for login-time member lookup, while preserving non-blocking behavior. |
| API/data dependency impact | Consumer must provide account-scoped lookup context consistent with the documented BMS API reference. Do not invent additional request fields beyond repository artifacts. |
| Integration dependency impact | BMS remains a non-blocking dependency for persona refresh, not a hard authentication dependency. IAM owns login orchestration and decision to continue app entry when BMS is unavailable. |
| Developer review implication | Developer can review endpoint wiring, error handling boundary, and idempotent persona refresh. Developer cannot finalize timeout/circuit-breaker values. |
| Remaining open questions | What timeout applies? What retry/circuit breaker applies? What audit/monitoring event is required? What previous Workplace permission cache/source and freshness limit applies? What support/audit path applies if BMS indicates a member is bound to another account? |
| Recommended next owner | IAM / OBK Backend for orchestration design; ob-bms service for API contract and error behavior; Simon for architecture update; Quinn for dependency-register impact only. |

### 3.2 Parking Ticket and Property Detection

| Dimension | Assessment |
|---|---|
| Architecture update | UF-012 should add a routing decision that uses selected Location plus FS `park_syscode` and `park_name` to determine whether the ticket follows existing One Bangkok flow or The PARQ-specific flow. |
| API/data dependency impact | FS parking ticket response must expose or map `park_syscode` and `park_name`. App/backend selected Location must be available to ticket lookup/routing logic. |
| Integration dependency impact | OBK Backend should treat property detection as a pre-payment routing step. Argento payment flow remains downstream of successful ticket/rate resolution and must not decide property ownership. |
| Developer review implication | Developer can review route branching, mismatch handling, capability gating, and data propagation. Developer cannot finalize behavior for missing/mismatched FS fields without FS confirmation. |
| Remaining open questions | What are valid `park_syscode` values for One Bangkok and The PARQ? Is `park_name` display-only or logic-safe? What happens if selected Location conflicts with FS `park_syscode` / `park_name`? What is the The PARQ rate source? What support flow applies when property cannot be detected after retry? What reconciliation fallback applies when payment succeeds but FS sync fails? |
| Recommended next owner | FS/Iviva for `park_syscode` / `park_name` contract; OBK Backend for routing design; Argento for payment callback/reconciliation interface; Product/Support for support wording; Simon for UF-012 update. |

### 3.3 Tower Context and `default_floor`

| Dimension | Assessment |
|---|---|
| Architecture update | Tower Context must split persistent default context and temporary context. BMS `default_floor` is the persistent source; App State is the temporary switch state. |
| API/data dependency impact | BMS `default_floor` must map to the authorized tower/floor/location context consumed by FS elevator, turnstile, parking, and Workplace persona views. App State must not overwrite BMS `default_floor` unless a separate update-default-floor action is confirmed. |
| Integration dependency impact | UF-006 handles context selection; UF-015 elevator and UF-016 turnstile must consume the active context while FS remains final authorization owner. |
| Developer review implication | Developer can review state separation, default floor loading, temporary switch lifecycle, and prevention of accidental persistence. Developer cannot finalize mapping or invalidation rules without BMS/FS confirmation. |
| Remaining open questions | What is the exact `default_floor` field shape? Does it include tower/location/property or only floor? How is `default_floor` mapped to FS tower/floor IDs? When is App State cleared? What invalidates saved default floor? What rule prevents tower switching during an active elevator/turnstile journey? |
| Recommended next owner | BMS for `default_floor`; FS/Iviva for tower/floor authorization mapping; Mobile App / OBK Backend for App State handling; Simon for sequence updates. |

### 3.4 CMS Phase 1 Accepted Risk

| Dimension | Assessment |
|---|---|
| Architecture update | CMS Phase 1 RBAC/cross-property visibility should be recorded as accepted risk controlled by manual / Seed Account operations, not as a pending architecture blocker. |
| API/data dependency impact | CMS remains view-only for persona/company/property/tower/status metadata. No Phase 1 edit API or persona metadata write path should be assumed. |
| Integration dependency impact | CMS operational visibility can proceed under controlled access, but IAM/FS/BZB remain sources of truth for identity/persona/workplace/retail data. |
| Developer review implication | Developer can review view-only screens/API calls and verify no metadata edit path is introduced. Developer must not infer full RBAC implementation. |
| Remaining open questions | Who approves Seed Account access? Which admins receive access? What manual review cadence applies? Is admin access logged? What exact cross-property visibility is accepted? When will RBAC/org filtering be revisited after Phase 1? |
| Recommended next owner | PARQ / Security / CMS owner for risk acceptance record and manual controls; Simon for architecture risk classification; Libra for indexing risk status if formally confirmed. |

### 3.5 Hardware Readiness Blockers

| Dimension | Assessment |
|---|---|
| Architecture update | Elevator and turnstile architecture remains dependent on FS for final authorization, but readiness status must stay blocked until The PARQ hardware contact and site testing window are confirmed. |
| API/data dependency impact | Hardware validation needs FS authorization data, gate/lift identifiers, valid/invalid QR/access data, and site environment access. Exact contact and timing are not available. |
| Integration dependency impact | UF-015 Elevator Integration and UF-016 Turnstile Access cannot move to final readiness sign-off without physical/site validation. API-only validation is insufficient for these flows. |
| Developer review implication | Developer can review API integration and error boundaries, but cannot claim hardware readiness or final end-to-end validation readiness. |
| Remaining open questions | Who is The PARQ hardware key contact? What site testing window is available? Which elevator/turnstile environment will be used? What test access data can be provisioned? What escalation path applies during site testing? What fallback operation applies if hardware/FS online validation fails? |
| Recommended next owner | PARQ / site operations for hardware contact and window; FS/Iviva for authorization and hardware integration support; Quinn for readiness tracking after contact/window are confirmed; Simon for keeping architecture blocker visible. |

## 4. Open Question Changes

| Prior Open Question | Updated Status | Notes |
|---|---|---|
| BMS exact login endpoint/path | Partially resolved | Confirmed path is `GET /members/by-account-id`; payload mapping, timeout, retry, circuit breaker, audit, monitoring, and fallback remain open. |
| Ticket property detection method | Partially resolved | Detection inputs confirmed as selected Location plus FS `park_syscode` and `park_name`; exact values, mismatch behavior, and FS response contract remain open. |
| Selected tower storage | Partially resolved | Persistent source confirmed as BMS `default_floor`; temporary state confirmed as App State. Schema, mapping, invalidation, and hardware journey lock remain open. |
| CMS RBAC/data isolation | Risk accepted for Phase 1 | Manual / Seed Account controls accepted as Phase 1 posture. Control detail and audit remain open. |
| Hardware readiness | Still blocked | The PARQ hardware key contact and site testing window remain missing. |

## 5. Developer Review Implications

| Area | Review Status | Developer Can Review Now | Developer Must Not Finalize Yet |
|---|---|---|---|
| BMS | Go with blockers | `GET /members/by-account-id` integration boundary, non-blocking handling, idempotent refresh. | Timeout values, circuit breaker thresholds, audit schema, cache freshness. |
| Parking Ticket | Go with blockers | Routing logic using selected Location + FS `park_syscode` / `park_name`, The PARQ capability gating, One Bangkok flow preservation. | FS field value list, mismatch fallback, PARQ rate source, reconciliation operations. |
| Tower Context | Go with blockers | BMS `default_floor` load, App State temporary switch, no accidental persistence. | Mapping schema, invalidation rules, hardware journey lock behavior. |
| CMS Phase 1 | Go with accepted risk | View-only metadata access and absence of edit path. | Full RBAC/org filtering unless separately approved. |
| Elevator / Turnstile | API review only; hardware readiness blocked | API flow, FS authorization boundary, error display boundary. | End-to-end hardware readiness, site validation plan, final fallback procedure. |

Overall: Developer technical review remains Go with blockers. Final implementation readiness remains No-go for timeout/fallback/hardware-dependent controls until open items are confirmed or formally accepted.

## 6. Architecture Artifact Update Impact

| Artifact | Update Impact |
|---|---|
| `03_Architecture/PARQ_User_Flow_Integration_Architecture.md` | Needs targeted update for UF-001 BMS path, UF-012 parking ticket property detection, UF-006 tower persistence/App State, UF-015/UF-016 hardware blocker status, and UF-007 CMS accepted risk posture. |
| `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md` | Needs matrix updates for BMS `GET /members/by-account-id`, FS `park_syscode` / `park_name`, BMS `default_floor`, App State temporary tower context, and CMS accepted risk. |
| `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md` | Needs dependency-control updates to distinguish resolved decisions from remaining blockers, especially BMS timeout, FS field contract, CMS manual controls, and hardware contact/window. |
| `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md` | Needs diagram updates for UF-001, UF-012, UF-006, UF-015, and UF-016 when diagram update work is assigned. |
| `03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md` | Superseded in selected detail by this addendum; overall impact assessment remains valid. |
| `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md` | Remains valid with one refinement: login-time path now confirmed as `GET /members/by-account-id`; timeout/fallback questions remain. |

## 7. Remaining Architecture Blockers

| Blocker ID | Blocker | Affected Area | Owner Needed | Status |
|---|---|---|---|---|
| BLK-BMS-001 | BMS timeout, retry, circuit breaker, audit, and monitoring are not defined. | BMS / IAM login refresh | IAM / ob-bms | Open |
| BLK-BMS-002 | Previous Workplace permission cache/source and freshness rule are not defined. | BMS / Workplace persona | IAM / FS / ob-bms | Open |
| BLK-PARK-001 | Valid `park_syscode` values, `park_name` usage, and mismatch behavior are not confirmed. | Parking Ticket | FS/Iviva / OBK Backend | Open |
| BLK-PARK-002 | The PARQ rate source and payment reconciliation fallback remain open. | Parking Ticket / Payment | FS/Iviva / OBK Backend / Argento | Open |
| BLK-TOWER-001 | `default_floor` schema and mapping to FS tower/floor/location IDs are not confirmed. | Multi-Tower / Workplace / Hardware | ob-bms / FS/Iviva | Open |
| BLK-TOWER-002 | Temporary App State lifecycle and hardware journey lock rule are not confirmed. | Multi-Tower / Elevator / Turnstile | Mobile App / OBK Backend / FS/Iviva | Open |
| BLK-CMS-001 | Manual / Seed Account control details are not documented. | CMS Phase 1 risk | PARQ / Security / CMS | Open |
| BLK-HW-001 | The PARQ hardware key contact is not confirmed. | Elevator / Turnstile | PARQ / Site Operations / FS/Iviva | Blocked |
| BLK-HW-002 | Site testing window is not confirmed. | Elevator / Turnstile | PARQ / Site Operations / FS/Iviva | Blocked |

## 8. Final Recommendation

Proceed with developer technical review using this addendum as the current dependency-control view for BMS, Parking Ticket, Tower Context, CMS Phase 1 risk, and hardware readiness.

Do not treat endpoint path confirmation as full BMS readiness: timeout/fallback/audit controls remain open.

Do not treat `park_syscode` / `park_name` confirmation as full parking readiness: value mapping, mismatch handling, rate source, and reconciliation remain open.

Do not treat BMS `default_floor` as a complete tower model: schema, FS mapping, App State lifecycle, and hardware journey lock remain open.

Do not block Phase 1 solely on CMS RBAC if risk acceptance and manual / Seed Account controls are formally approved, but keep data exposure and audit controls visible.

Keep UF-015 Elevator and UF-016 Turnstile readiness blocked until The PARQ hardware key contact and site testing window are confirmed.
