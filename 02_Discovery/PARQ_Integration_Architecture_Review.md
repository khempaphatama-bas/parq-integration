# PARQ Integration Architecture Review

Source basis: `[Proposal] The PARQ integration.pdf`, proposal date `June 2, 2026`, interpreted through `The_PARQ_Phase_1_User_Flow_Index.xlsx` dated `June 9, 2026`.

Scope focus: SSO, IAM, FS, Buzzee Bee, CMS, Argento.

Important challenge: the proposal names several integrations as dependencies, but does not consistently define system of record, API owner, data contract, event timing, failure behavior, reconciliation process, or operational support ownership.

## 1. Integration Matrix

| ID | Business Capability | Source / Initiator | Target System(s) | Integration Purpose | Data / API Object | Timing | Criticality | Key Assumptions / Challenges |
|---|---|---|---|---|---|---|---|---|
| INT-01 | Existing PARQ user sign-in | Mobile App | SSO, IAM, FS, Buzzee Bee | Authenticate migrated PARQ user and resolve workplace / retail persona | User credential, OTP state, SSO subject, FS authorization, BZB retail identity | Real-time | High | Assumes existing PARQ credential can be accepted without password reset. Need confirm whether PARQ users already exist in OBK SSO/IAM or require migration/pre-provisioning. |
| INT-02 | New PARQ user registration | Mobile App | SSO, IAM, FS, Buzzee Bee | Register, verify, authorize workplace user, optionally link retail | Email/phone, OTP, password, consent, FS identity, BZB identity | Real-time | High | Registration cannot rely only on SSO success; FS must confirm workplace eligibility before persona is granted. |
| INT-03 | Retail account matching and persona merge | IAM / Mobile App | Buzzee Bee, OBK persona entitlement | Match by email/phone and attach retail persona | Phone/email match result, BZB member ID, retail privileges, persona entitlement | Real-time or near real-time | High | Email/phone matching is not sufficient for identity proofing unless conflict handling and duplicate rules are defined. |
| INT-04 | Account lifecycle: company offboarding, delete, reactivate, hard delete | Mobile App / IAM | SSO, FS, Buzzee Bee | Synchronize company offboarding, account suspension, reactivation, hard delete, and entitlements across systems | FS inactive status, account status, deletion timestamp, reactivation request, password state | Real-time FS sync + scheduled hard delete | High | Bas lifecycle visual confirms company offboarding is separate from user account deletion. Remaining gaps: exact `Suspens` status naming, exact over-30-days timing wording, and deletion orchestration controls. |
| INT-05 | Workplace persona rendering | Mobile App | IAM, FS, CMS/user database | Render PARQ workplace persona and quick actions based on entitlements | Persona type, organization, tower, floor, parking, access permissions | Login/session refresh | High | Assumes FS entitlement feed is complete enough for UI visibility, hardware access, and profile defaults. Need define single authorization model. |
| INT-06 | Multi-tower context switching | Mobile App | FS, IAM/persona service | Change tower context and update menu/access permissions | Tower ID, floor list, parking access, elevator/turnstile rights | Real-time | High | Context switching must be authorization-scoped; stale cached permissions could expose invalid quick actions. |
| INT-07 | CMS multi-property user management | CMS | IAM/user database, FS, Buzzee Bee | Admin views consolidated user, persona, organization assignment | User profile, persona list, org metadata, BZB linkage, FS authorization snapshot | Admin query | Medium | Proposal implies CMS visibility across properties; needs RBAC isolation to prevent OBK/PARQ data leakage. |
| INT-08 | Profile authorized floor selection | Mobile App | FS, IAM/profile service | Show only FS-authorized default floor options | Authorized floors, default floor, building/tower | Real-time or cached | High | Need decide whether default floor is stored in OBK profile, FS, or both. Dual-write creates drift risk. |
| INT-09 | My QR workplace access | Mobile App | IAM, FS access control, turnstile validation | Generate and validate QR for workplace identity/access | QR token, user ID, access scope, expiry, FS validation result | Real-time | High | QR trust boundary is unclear: is QR signed by OBK/IAM, validated by FS, or both? Offline turnstile behavior is not defined. |
| INT-10 | Parking availability | Mobile App | FS parking availability service | Display availability by location | Property/location ID, zone, capacity, occupancy, refresh timestamp | Real-time polling | High | Refresh rate, caching, and FS SLA are not defined. Incorrect availability can create operational complaints. |
| INT-11 | Traffic monitoring | Mobile App | Traffic monitoring source, FS or parking platform | Show traffic status for OBK/PARQ | Location, status, timestamp, source confidence | Real-time / periodic | Medium | Proposal does not specify the traffic data source. This is a missing integration owner. |
| INT-12 | Parking ticket/payment | Mobile App | FS parking ticket service, Argento, IAM | Retrieve ticket, initiate PromptPay, update payment status | Ticket ID, amount, user ID, QR PromptPay, payment status, receipt | Real-time + callback/webhook | High | Need define whether Argento callback goes to OBK backend, FS, or both. Reconciliation and idempotency are missing. |
| INT-13 | Concierge-assisted parking redemption | Operations / Concierge | FS, CMS/manual process | Apply benefits manually during Phase 1 | Ticket, entitlement, redemption proof, staff action | Manual / operational | Medium | Manual phase creates audit and customer-dispute risk unless recorded in a system. |
| INT-14 | Visitor pass | Mobile App | FS visitor authorization platform, IAM | Create/delete/reactivate visitor pass | Host identity, visitor details, pass validity, QR/access rights | Real-time | High | Need confirm visitor PII ownership, consent, expiry, and whether pass is usable at turnstile/elevator/concierge. |
| INT-15 | Notifications for PARQ users | CMS/notification service | Mobile App, IAM/persona segmentation | Deliver existing OBK notifications to PARQ audience | Segment, persona, device token, notification content | Event/push | Medium | PARQ CMS notification management is out of scope, but audience segmentation still needs source and governance. |
| INT-16 | Elevator integration | Mobile App | FS elevator system, IAM | Call elevator for authorized floor | User identity, tower, source floor, destination floor, permission result | Real-time | High | Requires hardware test environment and clear fallback if FS/elevator service is unavailable. |
| INT-17 | Turnstile access | Turnstile / Mobile App QR | FS access control, IAM | Validate access at gate | QR/access token, user identity, access decision, audit log | Real-time | High | Access decision authority must be unambiguous. Audit logs should cover denied attempts too. |
| INT-18 | Security, audit, compliance | All systems | SSO, IAM, CMS, FS, Buzzee Bee, Argento | Enforce secure channels, PDPA handling, auditability | Tokens, PII, consent, audit events, integration logs | Always-on | High | Proposal references OBK standards but does not map PII fields, retention, encryption, or audit obligations per integration. |
| INT-19 | Phase 1.5 e-stamp/OCR | Mobile App | TCCT OCR, FS gate/fee calculation, CMS | Recognize ticket, calculate fee, sync gate payment/redemption | Ticket image/token, OCR result, rate config, net fee, gate status | Real-time | Deferred | TCCT OCR is a missing system in the current focus list but is required for Phase 1.5. |
| INT-20 | Phase 1.5 CMS PARQ org isolation | CMS | IAM/RBAC, database, FS | Restrict PARQ admin to Car Park menu and PARQ data | Org ID, admin role, menu permissions, seeded accounts | Admin login/query | Deferred | Dynamic CMS RBAC UI is out of scope, but enforcement is still required at API/data layer. |
| INT-21 | Phase 1.5 parking rate configuration | CMS | FS, database seeding | Configure rate conditions, whitelist, campaigns, redemption records | Store whitelist, mall property, campaign, rate rules, redemption records | Admin update + sync | Deferred | Need define whether FS consumes CMS rules or CMS mirrors FS rules. Otherwise rate mismatch is likely. |

## 2. External System Dependency Matrix

| External System | Used By | Role in PARQ Integration | Dependency Type | Expected Data / Services | Owner / Interface Needed | Availability Impact | Missing / Challenged Point |
|---|---|---|---|---|---|---|---|
| SSO | Mobile App, IAM | Authentication, OTP/password flows, account status | Runtime critical | Sign-in, registration, OTP, forgot password, token/session | SSO API spec, migration/pre-provisioning plan | Users cannot authenticate | Confirm whether migrated PARQ users are preloaded into SSO or authenticated via legacy bridge. |
| IAM | Mobile App, CMS, backend services | Identity, account lifecycle, persona entitlement coordination, authorization claims | Runtime critical | User ID, persona claims, consent, status, role/RBAC, token validation | IAM API spec, claim model, lifecycle ownership | Persona and access decisions become unreliable | IAM is not explicitly named in some flows, but it is required between SSO, FS, CMS, and Mobile. |
| FS | Mobile App, IAM, CMS, parking, hardware | Workplace authorization, floor/tower access, parking availability/ticket, visitor, elevator, turnstile | Runtime critical | Entitlements, floors, towers, QR/access validation, parking availability, ticket service, visitor pass | API specs, SLA, test hardware endpoints, error catalog | Access, parking, visitor, elevator, turnstile degraded | FS appears to be overloaded as entitlement source, access-control system, parking source, visitor platform, and hardware gateway. Need interface decomposition. |
| Buzzee Bee / BZB CRM | IAM, Mobile App | Retail account lookup, automerge, retail persona privileges | Runtime critical for merge; non-critical for pure workplace login if fallback exists | Retail member ID, matched identity, privileges, member status | BZB API spec, matching rules, duplicate handling | Retail persona merge fails or mislinks | Matching by email/phone needs conflict/duplicate policy and user verification. |
| CMS | Operations/Admin, notification, parking config | User management, organization isolation, parking admin functions, content/notification support | Operational critical | Admin user list, persona metadata, org data, car park menus, rate config | CMS API/data model, RBAC model, menu permission model | Admin support and Phase 1.5 parking ops blocked | Proposal says dynamic RBAC is out of scope; enforcement still needs to exist below the UI. |
| Argento | Mobile App/backend, FS parking | QR PromptPay payment processing | Runtime critical for parking payment | Payment initiation, QR code, callback/webhook, payment status, reconciliation | Payment API spec, webhook endpoint, settlement/reconciliation file | Users cannot pay parking in app | Callback recipient and reconciliation owner are not defined. Need idempotency and failed-payment handling. |
| TCCT OCR | Mobile App, CMS, FS | Parking ticket OCR for e-stamp verification | Deferred / Phase 1.5 critical | OCR endpoint, ticket token, confidence, error result | OCR API spec, image constraints, SLA | Automated e-stamp cannot launch | Missing from primary system focus but required by proposal for Phase 1.5. |
| Traffic Monitoring Source | Mobile App | Traffic status for parking areas | Runtime medium | Location status, timestamp, congestion level | API/data feed owner | Traffic feature cannot provide trusted status | Source is unspecified in proposal. Need nominate FS, parking system, CCTV/IoT, or another provider. |
| Notification Infrastructure | CMS/backend, Mobile App | Push/in-app notification delivery to PARQ segments | Runtime medium | Device token, segment, content, delivery status | Notification API, segmentation source | PARQ users may not receive targeted notices | PARQ CMS notification authoring is out of scope, but segment ownership remains required. |
| Turnstile / Elevator Hardware Environment | FS, Mobile App | Physical access validation and elevator call testing | Runtime critical for access features | Gate/elevator API, hardware response, audit logs | Vendor test/prod endpoint, site readiness | Physical access flows fail despite app success | Hardware procurement/installation is out of scope, but SIT/UAT/PVT depends on available hardware environments. |

## 3. Context Diagram

```mermaid
flowchart LR
    User["PARQ / OBK User"] --> Mobile["One Bangkok Mobile App"]
    Admin["Operations / CMS Admin"] --> CMS["OBK CMS"]
    Concierge["Concierge / Parking Ops"] --> CMS

    Mobile --> SSO["SSO"]
    SSO --> IAM["IAM / Identity & Persona Service"]
    Mobile --> IAM

    IAM <--> FS["FS Platform\nAuthorization, Parking, Visitor, Access"]
    IAM <--> BZB["Buzzee Bee / BZB CRM\nRetail Identity & Privileges"]
    CMS <--> IAM
    CMS <--> FS

    Mobile <--> FS
    Mobile <--> Argento["Argento\nPromptPay Payment Gateway"]
    Argento --> Backend["OBK Backend / Payment Callback Handler"]
    Backend <--> FS
    Backend <--> IAM

    FS <--> Turnstile["Turnstile Access"]
    FS <--> Elevator["Elevator System"]

    Mobile --> Notify["OBK Notification Infrastructure"]
    CMS --> Notify

    Mobile -. Phase 1.5 .-> OCR["TCCT OCR"]
    OCR -. Phase 1.5 .-> FS
    CMS -. Phase 1.5 Rate Config .-> FS

    Traffic["Traffic Monitoring Source"] --> Mobile
```

Challenge: the proposal treats OBK App, SSO, IAM, FS, BZB, CMS, and Argento as if their boundaries are already settled. The context diagram exposes missing middle-layer responsibilities: OBK backend/payment callback handler, notification segmentation, traffic source, TCCT OCR, and hardware vendor environments.

## 4. Sequence Diagram Candidate List

| Priority | Candidate Sequence Diagram | Systems Involved | Why It Is Needed |
|---|---|---|---|
| P1 | Existing PARQ user sign-in and persona resolution | Mobile App, SSO, IAM, FS, Buzzee Bee | Highest-risk migration path; validates no-password-reset assumption and persona mapping. |
| P1 | New PARQ user registration and workplace authorization | Mobile App, SSO, IAM, FS, Buzzee Bee | Separates authentication success from workplace authorization success. |
| P1 | Retail account matching and persona merge | Mobile App, IAM, Buzzee Bee, FS | Must define duplicate/mismatch handling, manual merge path, and retail privilege attachment. |
| P1 | Account lifecycle split: company offboarding, delete, reactivation, hard delete | Mobile App, IAM, SSO, FS, Buzzee Bee | Bas-confirmed flow separates FS/Fineday offboarding from user delete and reactivation; timing and status naming still need confirmation. |
| P1 | Multi-tower context switch and entitlement refresh | Mobile App, IAM, FS | Prevents stale UI/permission exposure and wrong elevator/parking/floor options. |
| P1 | My QR generation and turnstile validation | Mobile App, IAM, FS, Turnstile | Physical access requires precise trust boundary, token expiry, and deny-path logging. |
| P1 | Elevator call with authorized floor validation | Mobile App, IAM, FS, Elevator | Needed for hardware SIT/UAT and fallback behavior. |
| P1 | Parking ticket retrieval and Argento PromptPay payment | Mobile App, IAM, FS, Argento, OBK backend | Must show callback, reconciliation, duplicate payment, timeout, and failed-payment handling. |
| P1 | Visitor pass create/delete/reactivate | Mobile App, IAM, FS visitor platform, access control | Visitor PII, pass validity, and access path require explicit flow. |
| P2 | Parking availability refresh | Mobile App, FS parking availability | Defines polling/caching and degraded state. |
| P2 | CMS user management view across properties | CMS, IAM, FS, Buzzee Bee | Needed to validate RBAC and data isolation before operations use it. |
| P2 | PARQ notification segmentation and delivery | CMS/notification service, IAM, Mobile App | Required even if PARQ campaign management is out of scope. |
| P2 | Traffic monitoring status retrieval | Mobile App, traffic source, FS if applicable | Proposal lacks source; diagram will force ownership decision. |
| P2 | Phase 1.5 e-stamp/OCR and FS fee calculation | Mobile App, TCCT OCR, CMS, FS, Argento | Deferred, but must be architected early to avoid rework in parking/payment. |
| P2 | CMS PARQ organization isolation and car park menu access | CMS, IAM/RBAC, database, FS | Dynamic RBAC UI may be out of scope, but enforcement flow is mandatory. |

## 5. Open Questions

1. Are existing PARQ users already provisioned in OBK SSO/IAM, or will sign-in use a migration bridge from the current PARQ identity store?
2. Which system is the master for user identity: SSO subject, IAM customer profile, FS workplace identity, or Buzzee Bee member ID?
3. What is the canonical user matching key across SSO, IAM, FS, and Buzzee Bee: phone, email, national ID/passport, employee ID, member ID, or a new OBK global ID?
4. How are duplicate Buzzee Bee matches handled when email and phone identify different retail accounts?
5. Does FS provide a single entitlement API, or separate APIs for tower, floor, parking, visitor, elevator, and turnstile authorization?
6. Where is persona entitlement persisted: IAM only, FS only, OBK profile service, or a synchronized copy?
7. What is the token/claim model passed from SSO/IAM to backend services? Are persona and tower claims embedded or fetched at runtime?
8. What is the exact implementation naming for `Suspens`, and should "deleted over 30 days" be expressed to users as Day 31, after 30 full days, or another timestamp rule?
9. Does account deletion remove only OBK access, or also FS workplace authorization and Buzzee Bee retail identity?
10. What is the QR trust model: signed by OBK, signed by FS, validated online, validated offline, or exchanged for an FS access token?
11. What happens at turnstile/elevator if FS is unavailable?
12. Does My QR require replay protection, short expiry, rotating token, or device binding?
13. What is the exact Argento integration path: Mobile App to Argento directly, backend to Argento, or FS to Argento?
14. Where does Argento send payment callbacks, and which system updates final parking payment state?
15. How are parking payment reconciliation, refunds, duplicate payments, and abandoned PromptPay QR sessions handled?
16. Who owns traffic monitoring data? If FS is not the source, what provider/API is required?
17. How is concierge-assisted redemption recorded during Phase 1 so disputes can be audited?
18. What PII fields are shared with Buzzee Bee, FS, Argento, TCCT OCR, and notification systems, and what consent covers each transfer?
19. How is CMS data isolation enforced for PARQ admins if dynamic CMS RBAC UI is out of scope?
20. Which CMS menus are available in Phase 1 versus Phase 1.5, and can hidden menus still be accessed by direct URL/API?
21. How are device tokens and notification segments mapped to PARQ workplace persona?
22. What environments exist for FS, Argento, Buzzee Bee, SSO/IAM, CMS, turnstile, and elevator for SIT/UAT/PVT?
23. What are the non-functional requirements per critical integration: SLA, latency, retry policy, rate limit, timeout, and error-code contract?
24. Is parallel run with the legacy PARQ app read-only, dual-write, or functionally independent?
25. Which integrations require production data migration or backfill before go-live?

## 6. Technical Risks

| Risk | Impact | Likelihood | Severity | Mitigation / Required Decision |
|---|---:|---:|---:|---|
| Identity matching by email/phone causes wrong retail merge | High | Medium | High | Define matching hierarchy, conflict path, user confirmation, and audit trail before implementation. |
| SSO migration assumption is invalid and users require password reset | High | Medium | High | Confirm existing PARQ credential compatibility and migration/pre-provisioning approach. |
| IAM/persona model is underspecified | High | High | High | Create canonical identity and persona contract across SSO, IAM, FS, BZB, CMS. |
| FS acts as multiple systems behind one label | High | High | High | Split FS interfaces by domain: entitlement, parking, visitor, access control, elevator, turnstile. Assign owners and SLAs. |
| Physical access depends on real-time FS availability | High | Medium | High | Define offline/degraded access policy, QR expiry, access cache, and incident procedure. |
| Argento callback/reconciliation path is unclear | High | Medium | High | Define payment sequence, webhook receiver, idempotency keys, reconciliation owner, and support runbook. |
| CMS property isolation is treated as UI scope only | High | Medium | High | Enforce organization isolation at API/query layer, not only menu visibility. |
| Traffic monitoring source is not identified | Medium | High | Medium | Nominate source, API, SLA, and fallback display behavior. |
| Manual concierge redemption creates audit gaps | Medium | High | Medium | Require operational record, staff ID, timestamp, ticket ID, benefit applied, and dispute process. |
| Notification segmentation sends messages to wrong audience | Medium | Medium | Medium | Base segment on IAM/persona entitlements, not ad hoc device lists. |
| Phase 1.5 e-stamp design is deferred too far | High | Medium | High | Reserve API/data model now for ticket token, OCR result, fee calculation, rate config, and payment linkage. |
| Soft delete/hard delete conflicts with external system retention | High | Medium | High | Produce data retention matrix and deletion orchestration design. |
| Test environments do not include hardware-equivalent turnstile/elevator paths | High | Medium | High | Secure FS/hardware SIT and UAT environment access early. |
| Stale cached entitlement exposes invalid floor/tower/parking options | Medium | Medium | Medium | Define entitlement refresh trigger, cache TTL, session invalidation, and server-side authorization checks. |
| Missing error-code contracts cause inconsistent mobile UX | Medium | High | Medium | Standardize integration error taxonomy and user-safe messages per API. |
| Load testing excludes external dependencies | Medium | Medium | Medium | Include SSO, IAM, FS, BZB, Argento mocks or controlled external test endpoints with realistic latency/failure. |
