# PARQ Architecture Readiness Reassessment After Owner Confirmation

Owner: Simon / Senior Solution Architect

Input files:
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`
- `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`
- `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`
- `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`
- `02_Discovery/PARQ_UX_Stakeholder_User_Flow_Pack.md`

Output file path: `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md`

Status: Draft / Architecture readiness reassessed after Bas ownership confirmations

Downstream consumer:
- Quinn / QA Lead for QA readiness and environment dependency register planning
- PARQ / Orchestrator for dependency tracking
- Libra / Project Librarian for indexing
- Simon / Senior Solution Architect for architecture decision follow-up
- Molly / Assistant PO for UX/business open-question awareness

Rules applied:
- No QA scenarios, UAT scenarios, user stories, or acceptance criteria are created.
- No endpoint details, named human contacts, SLAs, timeout values, fallback rules, or timelines are invented.
- Missing information remains open questions.

## 1. Executive Readiness Position

Architecture readiness has improved materially after Bas confirmations. The project now has a confirmed approved user-flow source, proposal source availability, platform/service ownership, and the Portal gate wording.

Go/no-go for Quinn:

| Planning Area | Recommendation | Rationale |
|---|---|---|
| QA readiness / environment dependency register | Go | Architecture dependencies, platform/service owners, source artifacts, and major open questions are now clear enough for Quinn to start dependency planning. |
| Full SIT/UAT scenario design | Partial go / wait for details | Quinn can structure coverage areas and dependency gates, but should not finalize detailed scenarios until endpoint contracts, environments, test data, SLAs, timeout/fallback rules, audit rules, and named escalation contacts are confirmed. |
| Hardware validation planning for elevator/turnstile | Go for dependency register only | FS ownership is confirmed, but hardware environment, access windows, latency thresholds, outage behavior, and named site escalation contacts are still missing. |
| Payment readiness planning | Go for dependency register only | Argento ownership is confirmed, but sandbox, callback security, idempotency, duplicate callback, reconciliation, and refund flow details remain open. |

Overall readiness for QA readiness planning: 70%.

Overall readiness for final SIT/UAT execution planning: 45%.

## 2. Resolved or Partially Resolved Questions

| Area | Previous Open Question / Gap | Bas Confirmation | Readiness Result | Remaining Gap |
|---|---|---|---|---|
| Portal gate wording | Current Gate wording required confirmation. | Current Gate wording is `Key Decisions Required`. | Resolved. | None for architecture readiness. |
| Approved user-flow source | Approved PARQ User Flow source was unclear between local XLSX and other references. | Approved source is the Google Sheet: `https://docs.google.com/spreadsheets/d/1WSGhrt0xSyVVSa37jANQ6XQKirllygVhVMWqP_xaGVo/edit?usp=sharing`. | Resolved for source-of-truth reference. | Local copy freshness and change-control process still need operational handling. |
| Proposal PDF availability | Proposal PDF was previously missing. | Proposal PDF is available at `01_Source_of_Truth/API_and_System_References/00_2025_Document/[Proposal] The PARQ integration.pdf`. | Resolved for source availability. | Proposal-vs-user-flow precedence remains: approved User Flow Index should remain primary for flow scope. |
| IAM ownership | IAM owner was role/system-level TBD. | IAM ownership is OBK Backend / OB_IAM_SDK / IAM Service. | Partially resolved. | Named human contact, endpoint owner, SIT/UAT escalation owner, and API contract owner still missing. |
| BMS ownership | BMS owner was TBD. | BMS ownership is `ob-bms service`. | Partially resolved. | Named contact, login endpoint/payload, retry/circuit breaker, and audit owner still missing. |
| FS/Iviva ownership | FS/Iviva owner was TBD. | FS/Iviva ownership is Frasers Property / Iviva platform. | Partially resolved. | Per-service owners for workplace, parking, visitor, traffic, elevator, turnstile, and hardware escalation still missing. |
| BZB ownership | BZB owner was TBD. | BZB is Buzzebee external CRM vendor. | Partially resolved. | Named vendor contact, sandbox data, conflict support, and manual correction path still missing. |
| Argento ownership | Argento owner was TBD. | Argento is external payment gateway vendor. | Partially resolved. | Named vendor contact, sandbox, callback security, idempotency, reconciliation, and refund details still missing. |
| CMS ownership | CMS owner was TBD. | CMS is existing One Bangkok CMS API. | Partially resolved. | Seed admin scope, org filtering, admin audit, and compensating controls still missing. |
| Kafka/Event Bus ownership | Event owner was TBD. | Kafka/Event Bus is internal event infrastructure used by IAM. | Partially resolved. | Topic schema, DLQ, replay, consumer monitoring, and named platform contact still missing. |
| Notification ownership | Notification owner was TBD. | Existing OBK Notification infrastructure. | Partially resolved. | PARQ segment owner, token/inbox cleanup verification, and named contact still missing. |
| Elevator ownership | Elevator ownership and authority were mixed between hardware and FS. | Authorization owned by FS. | Partially resolved. | Hardware environment/contact, command timeout, site fallback, and audit owner still missing. |
| Turnstile ownership | Turnstile validation authority was open. | Validation and entry authorization owned by FS. | Partially resolved. | Online validation latency, outage behavior, hardware environment/contact, and audit retention still missing. |

## 3. Still-Open Questions by Gap Type

| Gap Type | Still Missing | Impact on Quinn |
|---|---|---|
| Named human contacts | Named escalation/contact persons for IAM, BMS, FS/Iviva, BZB, Argento, CMS, Kafka/Event Bus, Notification, Elevator, Turnstile. | Quinn can identify dependency owners at service/platform level, but cannot complete escalation matrix. |
| Endpoint details | Exact API URLs, request/response contracts, error codes, auth headers, callback payloads, event schema. | Quinn can prepare dependency register fields, but cannot finalize detailed interface validation. |
| Environment readiness | SIT/UAT/PVT URLs, credentials, tenants, hardware availability, vendor sandbox readiness, test windows. | Quinn can create environment tracker, but cannot mark execution-ready. |
| Test data | Existing PARQ identities, BMS member found/no-match/conflict data, BZB same/different Account ID data, FS floor/tower/visitor/parking data, Argento payment data, deletion-event data. | Quinn can request data sets, but cannot finalize coverage. |
| SLA / timeout / retry | Timeout thresholds, circuit breakers, retry policy, DLQ, reconciliation schedule, outage behavior. | Quinn can flag non-functional dependencies, but cannot define expected pass/fail behavior. |
| Audit / reconciliation | Merge audit, BMS refresh audit, FS access audit, Argento payment reconciliation, Kafka cleanup audit, notification cleanup proof. | Quinn can identify audit checkpoints, but cannot close readiness. |
| Fallback / support | BMS rare conflict support path, FS outage behavior, parking paid-but-unsynced support, visitor pass pending/failed support, CMS seed-account compensating controls. | Quinn can list support dependencies, but cannot finalize user-visible/support expectations. |

## 4. BMS Option B Non-Blocking Login Readiness

Current decision status:

| Decision / Fact | Status |
|---|---|
| PARQ login will perform BMS member check during login. | Confirmed. |
| BMS login check is non-blocking for app entry. | Confirmed. |
| If BMS is unavailable, user can enter the app. | Confirmed. |
| If prior Workplace permission can be detected, app/IAM should allow existing Workplace permission as appropriate. | Confirmed direction; implementation source/cache still open. |
| IAM owns login-time check/orchestration point. | Confirmed at service level: OBK Backend / OB_IAM_SDK / IAM Service. |
| BMS owns member source/sync. | Confirmed at service level: ob-bms service. |

BMS readiness assessment:

| Readiness Dimension | Status | Reason |
|---|---|---|
| Architecture decision | Ready | Option B non-blocking is recorded. |
| Service ownership | Partially ready | IAM and BMS service ownership are now confirmed. Named human contacts remain missing. |
| API contract | Not ready | Exact login endpoint/payload/response mapping remains open, even though `checkMember` and `GET /members/by-account-id` are treated as the same capability family. |
| Fallback behavior | Partially ready | Non-blocking app entry is confirmed. Previous-permission source/cache and freshness rule are open. |
| Error handling | Not ready | Timeout, retry, circuit breaker, rare bound-to-other-account support path, and audit markers remain open. |
| QA readiness input | Ready to start dependency planning | Quinn can start the BMS dependency register, but cannot finalize expected outcomes until contract/fallback details are confirmed. |

Go/no-go for BMS QA readiness:
- Go: Quinn can start BMS readiness dependency register for login refresh, sign-up/add identity, no-match, unavailable/timeout, and cleanup dependencies.
- Wait: Quinn should not finalize detailed expected results for timeout, conflict-like state, previous-permission fallback, or audit until IAM/BMS provide the missing control rules.

## 5. QA Readiness Planning Reassessment

Quinn can start now:

| Work Item Quinn Can Start | Source Basis | Boundary |
|---|---|---|
| QA environment dependency register by system | Platform/service ownership is confirmed. | Register only; no detailed QA/UAT scenarios yet. |
| External dependency contact-request tracker | Named contacts are explicitly missing. | Track request and status; do not invent contact names. |
| Test data request matrix | Architecture identifies required data categories. | Request data categories; do not define detailed test cases. |
| Hardware dependency readiness tracker | Elevator and turnstile are FS-authorized and hardware-dependent. | Track environment, access window, and escalation needs only. |
| Payment dependency readiness tracker | Argento + FS/Iviva + OBK Backend payment dependency is clear. | Track sandbox, callback, reconciliation, and refund readiness only. |
| BMS non-blocking login readiness tracker | BMS Option B decision and owner are confirmed. | Track contract/fallback/audit gaps; do not finalize expected outcomes. |
| Kafka/notification cleanup dependency tracker | Permanent delete event and notification cleanup are known dependencies. | Track topic/consumer/DLQ/audit readiness only. |

Quinn must wait for:

| Blocked Item | Waiting For |
|---|---|
| Final SIT/UAT matrix | Endpoint contracts, environments, test data, timeout/fallback rules, and named contacts. |
| Negative case expected behavior | Error code catalogs, retry rules, support/fallback rules. |
| Hardware validation plan | Elevator/turnstile hardware availability, FS outage policy, site fallback, latency thresholds. |
| Payment execution readiness | Argento sandbox, callback security, idempotency, duplicate handling, refund/reconciliation rules. |
| Account cleanup validation | Kafka topic schema, consumer monitoring, BMS/Notification cleanup proof. |
| CMS admin readiness | Seed account scope, org filtering, admin audit, compensating controls. |

## 6. Remaining Architecture Blockers by System

### IAM

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Service ownership confirmed as OBK Backend / OB_IAM_SDK / IAM Service. | Quinn can assign IAM dependency at service level. |
| Open | Named human contact and API owner missing. | Escalation route incomplete. |
| Open | IAM API contract, error taxonomy, token/session behavior, profile overwrite rules, account lifecycle state naming, and permanent delete orchestration need confirmation. | Expected behavior cannot be finalized. |
| Open | BMS login orchestration mutation behavior: create/update `fs`, default persona update, cache clear, event publish. | BMS Option B readiness incomplete. |

### BMS

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Service ownership confirmed as `ob-bms service`. | Quinn can assign BMS dependency at service level. |
| Open | Named human contact missing. | Escalation route incomplete. |
| Open | Exact login-time endpoint/payload/response mapping still open. | Interface validation cannot be finalized. |
| Open | Timeout, retry, circuit-breaker, previous-permission cache/source, rare bound-to-other-account support path, audit marker, and cleanup proof remain open. | Non-blocking fallback expected behavior cannot be finalized. |

### FS/Iviva

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Ownership confirmed as Frasers Property / Iviva platform. | Quinn can assign FS dependency at platform level. |
| Open | Named human contact and per-service FS owners missing. | Escalation and triage remain weak. |
| Open | Workplace entitlement, tower/floor, parking, visitor, traffic, elevator, and turnstile service contracts remain separate and not fully specified. | Register can start; detailed readiness cannot close. |
| Open | SLA, timeout, retry, outage, access audit, QR replay/single-use, and hardware-linked readiness missing. | Hardware and access validation cannot be finalized. |

### BZB

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Ownership confirmed as Buzzebee external CRM vendor. | Quinn can assign BZB dependency at vendor level. |
| Open | Named vendor contact missing. | Escalation route incomplete. |
| Open | Conflict handling, same/different Account ID data, manual correction runbook, profile overwrite sync, and BZB failure deferral rule remain open. | Merge/readiness behavior cannot be finalized. |

### Argento

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Ownership confirmed as Argento external payment gateway vendor. | Quinn can assign Argento dependency at vendor level. |
| Open | Named vendor contact and sandbox readiness missing. | Payment readiness cannot close. |
| Open | Callback security, idempotency key, duplicate callback handling, settlement report, refund process, and reconciliation timing remain open. | Paid-but-unsynced behavior cannot be finalized. |

### CMS

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Ownership confirmed as existing One Bangkok CMS API. | Quinn can assign CMS dependency at service level. |
| Open | Named human contact missing. | Escalation route incomplete. |
| Open | Seed admin scope, org filtering, admin audit, visitor pass visibility operations, and compensating controls remain open. | CMS readiness and data isolation risk cannot close. |

### Kafka / Event Bus

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Ownership confirmed as internal event infrastructure used by IAM. | Quinn can assign event dependency at platform level. |
| Open | Named human contact missing. | Escalation route incomplete. |
| Open | Topic schema, payload fields, retry, DLQ, replay, monitoring, and consumer success audit remain open. | Account cleanup readiness cannot close. |

### Notification

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Ownership confirmed as existing OBK Notification infrastructure. | Quinn can assign notification dependency at service level. |
| Open | Named human contact missing. | Escalation route incomplete. |
| Open | PARQ segment creation owner, target group maintenance, token/inbox cleanup SLA, and cleanup verification remain open. | Notification readiness cannot close. |

### Elevator

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Authorization owned by FS. | Quinn can route authorization questions to FS/Iviva. |
| Open | Named site/hardware contact missing. | Hardware triage route incomplete. |
| Open | Hardware environment, command-capable users/visitors, tower/floor mapping, timeout behavior, and site fallback remain open. | Elevator validation readiness cannot close. |

### Turnstile

| Status | Blocker / Open Item | QA Impact |
|---|---|---|
| Partially resolved | Validation and entry authorization owned by FS. | Quinn can route authorization questions to FS/Iviva. |
| Open | Named site/hardware contact missing. | Hardware triage route incomplete. |
| Open | Online validation latency, outage behavior, QR replay/single-use behavior, access audit retention, and hardware environment remain open. | Turnstile validation readiness cannot close. |

## 7. Readiness Score by System

| System | Ownership Readiness | Contract Readiness | Environment Readiness | QA Register Start? | Execution Readiness |
|---|---:|---:|---:|---|---|
| IAM | 70% | 45% | 35% | Yes | Not yet |
| BMS | 70% | 40% | 35% | Yes | Not yet |
| FS/Iviva | 65% | 35% | 30% | Yes | Not yet |
| BZB | 65% | 35% | 30% | Yes | Not yet |
| Argento | 65% | 35% | 30% | Yes | Not yet |
| CMS | 65% | 40% | 35% | Yes | Not yet |
| Kafka/Event Bus | 65% | 30% | 30% | Yes | Not yet |
| Notification | 65% | 35% | 35% | Yes | Not yet |
| Elevator | 60% | 30% | 20% | Yes | Not yet |
| Turnstile | 60% | 30% | 20% | Yes | Not yet |

## 8. Required Next Decisions / Inputs

| Priority | Required Input | Owner / Provider | Needed By |
|---|---|---|---|
| P1 | Named human contacts for all systems and vendors. | PARQ / project leads / service owners | Quinn dependency and escalation register |
| P1 | SIT/UAT/PVT environment URLs, credentials, tenants, and availability dates. | Service/platform/vendor owners | Quinn environment readiness register |
| P1 | Test data inventory by system. | IAM, BMS, FS/Iviva, BZB, Argento, CMS, Notification, Kafka owners | Quinn readiness planning |
| P1 | BMS non-blocking login control design. | IAM / BMS / PARQ support | BMS Option B readiness |
| P1 | FS outage/fallback and hardware readiness rules. | FS/Iviva / site operations / hardware teams | Elevator/turnstile readiness |
| P1 | Argento payment callback, idempotency, reconciliation, and refund rules. | Argento / OBK Backend / FS/Iviva | Parking payment readiness |
| P2 | PII/consent/retention field matrix. | Security/privacy owner TBD | Compliance readiness |
| P2 | CMS seed account compensating controls. | CMS / security / PARQ | CMS readiness |
| P2 | Kafka/Event Bus topic schema, DLQ, replay, and audit proof. | IAM / Event platform | Cleanup readiness |

## 9. Final Recommendation for Quinn

Quinn can start QA readiness planning now, specifically the environment dependency register, contact-request register, test-data request register, and system readiness checklist.

Quinn should not yet finalize detailed SIT/UAT scenarios, negative-case expected results, or execution dates. Those remain blocked by missing endpoint contracts, environment readiness, named human contacts, SLA/timeout/fallback rules, audit/reconciliation definitions, and hardware access details.

Architecture is ready enough to move from "blocked" to "ready to start readiness planning with blockers." It is not yet ready for final SIT/UAT execution planning.
