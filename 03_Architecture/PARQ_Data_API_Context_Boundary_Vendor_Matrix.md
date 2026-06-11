# PARQ Data, API, Context, Boundary, and Vendor Matrix

Source inputs:
- `01_Source_of_Truth/PARQ_User_Flow/The_PARQ_Phase_1_User_Flow_Index.xlsx`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `02_Discovery/PARQ_Integration_Architecture_Review.md`

Constraint: This document does not create user stories or acceptance criteria.

Architectural challenge: the User Flow Index names integrations at capability level, but the implementation requires clearer ownership for identity, persona, access authorization, payment status, visitor state, QR validation, notification cleanup, and operational support. OBK Backend, IAM, and Kafka/Event Bus must be treated as explicit systems even where the original proposal only highlights SSO, FS, BZB, CMS, and Argento.

## BMS Source Traceability Note

Owner: Libra  
Input files: `01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md`, `01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md`  
Output file path: `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`  
Status: Source traceability note / BMS Option B non-blocking decision recorded  
Downstream consumer: Simon, PARQ, Quinn, Molly

Current confirmed behavior from source/reference files:
- Current app checks member from BMS in Sign-up and Add / Remove identity flow.
- `add_identity_flow.md` confirms BMS `checkMember` runs for new identities and can create external identity type `fs` when a member is found and not bound to another account.
- `api-members-by-account-id.md` documents BMS `GET /members/by-account-id` for account-scoped member lookup.

Decision recorded:
- PARQ to-be login uses BMS member check during login as a non-blocking refresh. If BMS is unavailable, the user can still enter the app. If previous Workplace permission is detectable, the app/IAM should allow the existing Workplace permission as appropriate.
- Login-time BMS check uses the same BMS member-check API family as `checkMember` / `GET /members/by-account-id`; exact endpoint/payload, timeout, retry, and audit details remain open.

## 1. Data Ownership Matrix

| Data Domain | Primary Owner / Source of Truth | System(s) Holding Copy | Key Identifiers | Used By / Related Flows | Ownership Notes / Challenge |
|---|---|---|---|---|---|
| Authentication credential | SSO | IAM session context, Mobile App token storage | Public SSO ID, credential identifier, token | UF-001, UF-003, UF-004, UF-017 | IAM bridges to SSO for login; do not treat IAM password/profile ownership as credential ownership. |
| OBK internal account | IAM | OBK Backend, CMS views, downstream service records | Account ID, Public SSO ID | UF-001 to UF-018 | Account ID is the internal OBK anchor. All merge and cleanup logic should converge to this ID. |
| Local member profile | IAM | OBK Backend, CMS, BZB where synchronized | Account ID, email, phone, name, DOB, gender | UF-001, UF-002, UF-003, UF-007, UF-008 | Registration overwrite rules exist, but field-level protection and consent behavior still need formal policy. |
| Persona entitlement | IAM | Mobile App, OBK Backend, CMS | Account ID, persona type, external identity type | UF-001, UF-002, UF-005, UF-014 | IAM is source of truth for persona entitlements; FS metadata determines Workplace eligibility. |
| BMS workplace/member lookup | BMS | IAM external identity state, Mobile App/Backend consumers where implemented | Account ID, identifier, member ID/UID, tenant, status, `fs` external identity metadata | UF-001 non-blocking login refresh; current app Sign-up and Add / Remove identity flow. | BMS is not only an account-deletion cleanup consumer. PARQ login uses BMS as non-blocking refresh; exact endpoint/payload and fallback controls remain open. |
| Workplace external identity | FS | IAM external identity metadata, OBK Backend cache if any | FS member UID, external identity type `fs`, Account ID mapping | UF-001, UF-003, UF-005, UF-006, UF-008, UF-015, UF-016 | Workplace persona requires non-empty `fs` metadata. Missing metadata must block or degrade workplace functions. |
| Company / tenant / tower / floor authorization | FS | IAM metadata, Mobile App session context, OBK Backend | FS member UID, tower ID, floor ID/list | UF-005, UF-006, UF-008, UF-015 | FS is authority. Challenge: confirm common tower/floor code taxonomy across FS APIs. |
| Parking availability | FS | Mobile App display cache, OBK Backend if proxied | Property/location ID, zone ID, timestamp | UF-010 | FS owns traffic/availability. Need freshness threshold and stale-data UX. |
| Parking ticket and exit authorization status | FS/Iviva | OBK Backend, Mobile App display | Ticket ID, plate/token if applicable, FS ticket status | UF-012 | FS/Iviva is final source of truth for ticket and exit authorization, not Argento. |
| Parking payment transaction | OBK Backend | Argento, FS sync logs | Payment reference, ticket ID, Account ID, Argento transaction ID | UF-012 | OBK owns `car_park_payments` and `car_park_payment_fs_logs`; Argento owns financial processing. |
| Financial settlement / refund execution | Argento | OBK Backend transaction/refund log | Argento transaction ID, refund ID, payment reference | UF-012 | Argento executes financial refund; OBK tracks and reconciles; FS remains ticket-state authority. |
| Visitor pass workflow record | OBK Backend | CMS, Mobile App | Visitor pass ID, Account ID, visitor identifier | UF-013 | OBK stores `visitor_passes`; CMS visibility exists, but Phase 1 CMS management is largely out of scope. |
| Visitor authorization and access validity | FS | OBK Backend visitor state, Turnstile/Elevator validation | FS visitor reference, validity window, QR/access token scope | UF-013, UF-016, UF-015 | FS authorization controls whether visitor access is usable. Local OBK state alone must not imply physical access. |
| Workplace / visitor QR payload | OBK Backend | Mobile App display, FS validation context | QR ID/token, Account ID or visitor pass ID, validity scope | UF-009, UF-013, UF-016 | OBK generates QR; hardware validates online with FS. Single-use behavior remains unconfirmed. |
| Turnstile access decision and audit | FS | Turnstile hardware logs, possible OBK audit copy | QR/token, access decision, timestamp, gate ID | UF-009, UF-016, UF-017 | FS makes online decision. Need audit retention owner and outage policy. |
| Elevator authorization and command result | FS | Elevator system, OBK Backend/Mobile status | FS member UID, tower ID, floor ID, command ID | UF-015 | FS performs final authorization and command outcome. Need timeout/error taxonomy. |
| Retail member identity and privileges | BZB | IAM linkage, Mobile App persona context | BZB member ID, Account ID, email/phone | UF-001, UF-002, UF-003 | BZB is source for retail identity. Different Account IDs across matches trigger conflict. |
| CMS admin account and operational visibility | CMS / OBK Backend | IAM admin identity if integrated | Admin ID, role, organization ID if available | UF-007, UF-013, UF-1.5-002, UF-1.5-003 | Phase 1 RBAC not included; seed account creates data-isolation risk unless compensating controls exist. |
| Notification segment and inbox/device token data | OBK Notification Infrastructure | IAM segment source, Kafka consumers, Mobile App | Account ID, persona, target group ID, device token | UF-014, UF-017 | PARQ uses existing OBK notification pipeline. PARQ CMS campaign/content management is out of Phase 1. |
| Permanent delete cleanup event | IAM / Kafka Event Bus | Notification Service, BMS, downstream consumers | `ob-iam.account.permanent-deleted`, Account ID | UF-004, UF-014, UF-017 | Event delivery and dead-letter handling are critical for privacy cleanup. |
| Traffic monitoring data | FS | Mobile App/OBK Backend display cache | Location ID, status, timestamp | UF-011 | FS owns traffic monitoring, not an undefined third party. Need SLA and quality indicator. |
| Phase 1.5 OCR recognition result | TCCT OCR | OBK Backend, FS gate/fee calculation | Ticket image/token, OCR result, confidence | UF-1.5-001 | Deferred, but its data model should be reserved early to avoid parking-payment rework. |
| Phase 1.5 parking rate/whitelist/campaign config | CMS / OBK Backend, with FS dependency | FS, database seed data | Store ID, campaign ID, rate rule ID, whitelist record | UF-1.5-003 | Clarify whether CMS is master and FS consumes, or FS remains master and CMS mirrors. |

## 2. API Inventory

| API / Integration | Provider | Consumer | Related Flow(s) | Purpose | Data Exchanged | Timing | Status / Challenge |
|---|---|---|---|---|---|---|---|
| `GET /identity/validate` | IAM | Mobile App | UF-001, UF-003 | Pre-check user identity before login/registration | Email/phone, identity status, matching hint | Real-time | Confirm error taxonomy for conflict, not found, and retryable failures. |
| `POST /user/exists` | SSO | IAM | UF-001, UF-003 | Check identity against SSO orchestration layer | Email/phone, existence result | Real-time | SSO is not bypassed by Mobile App; IAM calls SSO. |
| `POST /auth/login` | IAM | Mobile App | UF-001 | App login entry through IAM bridge | Credentials, device/session context | Real-time | IAM must return Account ID and persona entitlements after SSO validation. |
| `POST /oauth/token` | SSO | IAM | UF-001, UF-002, UF-003 | Credential validation/token issuance and conflict control | Credentials, `throwOnConflict: true`, token, Public SSO ID | Real-time | Conflict mode is an actual API behavior; sequence must model conflict. |
| Account Merge Flow | IAM / OBK Backend with SSO orchestration | Mobile App, FS, BZB | UF-002, UF-003 | Merge matched identities into surviving Account ID | Account ID, Public SSO ID, BZB member ID, FS permissions | Real-time + backend transaction | Manual correction runbook needed for incorrect completed merge. |
| BZB retail lookup | BZB | IAM / OBK Backend | UF-001, UF-002, UF-003 | Match retail identity and privileges by email/phone | Email, phone, BZB member ID, match result, Account ID linkage | Real-time | Different Account IDs must trigger conflict. |
| BZB linkage/sync | BZB | IAM / OBK Backend | UF-002, UF-003, UF-004 | Attach or update retail identity to surviving Account ID | Account ID, BZB member ID, profile fields, status | Real-time / near-real-time | Profile overwrite rules require field-level governance. |
| FS external identity / workplace metadata | FS | IAM / OBK Backend | UF-001, UF-003, UF-005 | Resolve Workplace persona eligibility | FS member UID, company/tenant, tower, floors | Real-time | Missing metadata should prevent workplace persona activation. |
| BMS `GET /members/by-account-id` | BMS | IAM / app/backend consumer TBD | UF-001 non-blocking login refresh; source reference | Retrieve all members associated with an account ID | `x-account-id`, member records, tenant, status, `can_preregister`, `redemption_authorized` | Real-time / non-blocking during login if used | Source file exists. PARQ clarified this is the same BMS member-check capability family as `checkMember`; exact login endpoint and payload remain open. |
| BMS `checkMember` during identity flow and login refresh | BMS | IAM | UF-001; current Sign-up and Add / Remove identity flow | Check whether an identity corresponds to a BMS workplace member | Identifier, account ID, BMS member response, external identity type `fs` metadata | Real-time; non-blocking during login | Confirmed current identity-flow behavior. PARQ to-be login uses this capability as non-blocking refresh; timeout/circuit-breaker and mutation rules remain open. |
| FS tower/floor authorization | FS | IAM / OBK Backend / Mobile App | UF-006, UF-008, UF-015 | Validate tower/floor permission and default floor list | Tower ID, floor list, access group | Real-time / session refresh | Need common ID scheme across FS services. |
| FS parking availability API | FS | OBK Backend / Mobile App | UF-010 | Display parking availability and occupancy | Property, zone, capacity, occupancy, timestamp | Real-time / polling | Refresh interval and cache policy open. |
| FS traffic monitoring API | FS | OBK Backend / Mobile App | UF-011 | Display traffic status | Location, traffic status, timestamp | Real-time / polling | SLA and stale status display open. |
| FS parking ticket service | FS/Iviva | OBK Backend | UF-012 | Retrieve ticket and payable amount; update paid/exit status | Ticket ID, amount, status, exit authorization | Real-time | FS/Iviva is source of truth. |
| Argento payment initiation | Argento | OBK Backend | UF-012 | Create PromptPay payment request | Amount, payment reference, QR/payment data | Real-time | Idempotency key required. |
| Argento payment callback | Argento | OBK Backend | UF-012 | Notify payment status | Payment reference, status, timestamp, transaction ID | Async callback | OBK Backend must validate, persist, and sync to FS. |
| OBK payment persistence | OBK Backend | OBK Backend / Support | UF-012 | Track payment and FS synchronization | `car_park_payments`, `car_park_payment_fs_logs` | Real-time + retry | Reconciliation/refund runbook needed. |
| Argento refund API/process | Argento | OBK Backend / Operations | UF-012 | Execute financial refund | Transaction ID, refund reference, amount, status | Operational / async | OBK tracks; Argento executes; FS status implication must be defined. |
| Visitor pass create/update/delete | OBK Backend | Mobile App | UF-013 | Manage local visitor workflow | Visitor data, host Account ID, schedule, status | Real-time | Visitor PII and retention policy needed. |
| `POST /visitors` / visitor registration | FS | OBK Backend | UF-013 | Register visitor invitation/access with FS | Visitor identity, host, validity window, authorized floor/access | Real-time | FS success should be access-enabling state. |
| OBK QR generation | OBK Backend | Mobile App | UF-009, UF-013, UF-016 | Generate workplace/visitor QR | Account ID or visitor pass ID, validity scope, QR payload | Real-time | QR is generated by OBK, validated online by FS. |
| FS QR/access validation | FS | Turnstile / hardware | UF-009, UF-013, UF-016 | Validate QR at access point | QR token, gate ID, timestamp, decision | Real-time online | Outage and single-use policy open. |
| FS elevator command / authorization | FS | OBK Backend / Elevator System | UF-015 | Validate authorized floor and execute elevator call | FS member UID, tower, source/destination floor, command result | Real-time | FS returns final success/failure. |
| CMS user management query | CMS / OBK Backend | CMS Admin | UF-007 | View account/persona/org data | Account profile, personas, external identities, BZB linkage | Admin query | Phase 1 seed account may overexpose data. |
| Notification targeting/delivery | OBK Notification Infrastructure | CMS/Backend, Mobile App | UF-014 | Deliver existing OBK notifications to PARQ audience | Target group, Account ID, persona, device token, message | Push/event | Segment owner must be named. |
| Permanent delete event | Kafka/Event Bus | Notification Service, BMS, downstream consumers | UF-004, UF-014, UF-017 | Trigger data cleanup after hard delete | `ob-iam.account.permanent-deleted`, Account ID | Async event | Retry/dead-letter policy required. |
| Phase 1.5 OCR endpoint | TCCT OCR | OBK Backend / Mobile App | UF-1.5-001 | Recognize parking ticket for e-stamp | Image/token, OCR result, confidence | Real-time | Deferred but architectural dependency exists. |
| Phase 1.5 FS fee/gate calculation | FS | OBK Backend / CMS | UF-1.5-001, UF-1.5-003 | Calculate net fee/rate and gate result | Ticket, rate rule, redemption, net fee | Real-time | Rate master ownership unresolved. |

## 3. Context Diagram

```mermaid
flowchart LR
    User["PARQ / OBK User"] --> App["One Bangkok Mobile App"]
    Admin["CMS Admin / Operations"] --> CMS["OBK CMS"]
    Support["Support / Concierge"] --> CMS

    App --> IAM["IAM\nProfile + Persona Entitlement"]
    IAM <--> SSO["SSO\nAuthentication + Orchestration"]
    IAM <--> BZB["Buzzee Bee / BZB CRM\nRetail Identity + Privileges"]
    IAM <--> Backend["OBK Backend\nQR, Payment, Visitor, Integration Logic"]

    Backend <--> FS["Forward System / Iviva\nWorkplace, Parking, Visitor, Access"]
    IAM <--> FS
    CMS <--> Backend
    CMS <--> IAM

    Backend <--> Argento["Argento\nPromptPay + Refund Processing"]
    Argento --> Backend

    Backend --> Notify["OBK Notification Infrastructure"]
    IAM --> Kafka["Kafka / Event Bus"]
    Kafka --> Notify
    Kafka --> BMS["BMS Service"]

    FS <--> Gate["Turnstile System"]
    FS <--> Lift["Elevator System"]

    App --> Backend
    App --> Notify

    Backend -. Phase 1.5 .-> OCR["TCCT OCR"]
    Backend -. Phase 1.5 .-> FS
    CMS -. Phase 1.5 config .-> Backend
```

Context challenge: if OBK Backend is omitted, the architecture incorrectly implies Mobile App directly owns payment callback, QR generation, visitor persistence, and FS synchronization. These are backend responsibilities and must be visible in integration ownership and test planning.

## 4. System Boundary Diagram

```mermaid
flowchart TB
    subgraph Client["Client Boundary"]
        App["One Bangkok Mobile App"]
    end

    subgraph OBK["One Bangkok Controlled Boundary"]
        IAM["IAM\nLocal profile + persona entitlement"]
        Backend["OBK Backend\nIntegration orchestration, QR, visitor, payment records"]
        CMS["OBK CMS\nAdmin visibility / operational tooling"]
        Notify["Notification Infrastructure"]
        Kafka["Kafka / Event Bus"]
        BMS["BMS Service"]
    end

    subgraph Identity["Identity / Authentication Boundary"]
        SSO["SSO\nAuthentication + credential validation"]
    end

    subgraph Vendor["External Vendor / Partner Boundary"]
        FS["Forward System / Iviva\nAccess, Parking, Visitor, Elevator, Turnstile policy"]
        BZB["Buzzee Bee / BZB CRM\nRetail identity + loyalty"]
        Argento["Argento\nPayment gateway + refund execution"]
        OCR["TCCT OCR\nPhase 1.5 ticket recognition"]
    end

    subgraph SiteHardware["Site Hardware Boundary"]
        Gate["Turnstile"]
        Lift["Elevator"]
    end

    App --> IAM
    App --> Backend
    IAM <--> SSO
    IAM <--> BZB
    IAM <--> FS
    Backend <--> FS
    Backend <--> Argento
    Backend --> Notify
    CMS <--> Backend
    CMS <--> IAM
    IAM --> Kafka
    Kafka --> Notify
    Kafka --> BMS
    FS <--> Gate
    FS <--> Lift
    Backend -. Phase 1.5 .-> OCR
```

Boundary notes:
- SSO is authentication/orchestration, but IAM owns local member profile and persona entitlement.
- FS is not a single generic dependency; it is a set of separate runtime-critical services across workplace, parking, visitor, elevator, turnstile, and traffic.
- CMS Phase 1 seed account is a boundary risk because full RBAC/org isolation is not included.
- Argento must not be treated as ticket source of truth; FS/Iviva owns ticket and exit status.
- Turnstile and elevator are hardware boundaries; successful app/API behavior is not sufficient without SIT/UAT/PVT hardware validation.

## 5. External Vendor Dependency Matrix

| Vendor / External System | Related Flows | Dependency Type | Data / Service Required | Runtime Criticality | Environment Required | Failure Impact | Challenge / Mitigation |
|---|---|---|---|---|---|---|---|
| SSO | UF-001, UF-002, UF-003, UF-004, UF-017, UF-018 | Authentication and orchestration | `POST /user/exists`, `POST /oauth/token`, `throwOnConflict: true`, token/Public SSO ID | High | SIT/UAT/PVT | Users cannot login/register; merge conflicts cannot be handled correctly | Confirm token/error contract and conflict behavior under load. |
| FS / Iviva | UF-001, UF-003, UF-005, UF-006, UF-008, UF-009, UF-010, UF-011, UF-012, UF-013, UF-015, UF-016, UF-018 | Workplace, parking, visitor, access, traffic, hardware authority | External identity metadata, tower/floor auth, parking availability/ticket, visitor registration, QR validation, elevator command, turnstile decision, traffic feed | High | SIT/UAT/PVT plus hardware-linked test path | Workplace persona, parking, visitor pass, turnstile, and elevator can fail | Split FS interface ownership by service; define SLA, timeout, outage policy, and error catalog. |
| Buzzee Bee / BZB CRM | UF-001, UF-002, UF-003, UF-004, UF-018 | Retail identity and privilege matching | Email/phone lookup, BZB member ID, retail privileges, Account ID linkage | High for merge; Medium for workplace-only continuity if deferrable | SIT/UAT/PVT | Retail persona merge fails, wrong merge, duplicate conflict | Conflict rule exists; need manual correction process and profile overwrite governance. |
| Argento | UF-012, UF-018 | Payment gateway and refund execution | PromptPay initiation, callback/status, transaction ID, refund execution | High for parking payment | SIT/UAT/PVT payment sandbox | Payment unavailable, duplicate payment, paid-but-unsynced ticket | OBK Backend must own idempotency, transaction log, FS sync log, reconciliation, support operations. |
| CMS / Admin tooling | UF-007, UF-013, UF-014, UF-1.5-002, UF-1.5-003 | Operational visibility/configuration | User/persona view, visitor pass visibility, audience tooling, future car park config | Medium in Phase 1; High for Phase 1.5 operations | SIT/UAT | Seed admin may see broader OBK data; operational support gaps | Phase 1 RBAC is not included; apply compensating controls or formal risk acceptance. |
| Turnstile system | UF-009, UF-013, UF-016, UF-018 | Physical access hardware | QR scan, online FS validation, access decision | High | Mandatory SIT/UAT/PVT hardware validation | Access denied/allowed incorrectly; site operations disrupted | Define outage policy, audit retention, online validation latency threshold. |
| Elevator system | UF-013, UF-015, UF-018 | Physical access hardware | Elevator command execution, floor access result | High | Mandatory SIT/UAT/PVT hardware validation | Authorized user/visitor cannot access floor; unauthorized floor command risk | FS final authorization must be enforced; define timeout/fallback. |
| OBK Notification Infrastructure | UF-014, UF-017, UF-018 | Existing OBK notification delivery | Persona/audience targeting, device tokens, inbox/read status | Medium | SIT/UAT | Wrong audience or stale tokens after delete | Segment creation owner and cleanup validation required. |
| Kafka / Event Bus | UF-004, UF-014, UF-017 | Async cleanup/event distribution | `ob-iam.account.permanent-deleted` | Medium / compliance-critical | SIT/UAT | Hard-deleted account data remains in notification/BMS | Retry/dead-letter monitoring required. |
| BMS Service | UF-001, UF-004, UF-017 | Non-blocking login member refresh and downstream cleanup consumer | BMS member check, `GET /members/by-account-id` / `checkMember` capability family, account deletion event consumption | Medium for persona freshness; non-blocking for app entry; compliance-critical for cleanup | SIT/UAT | Workplace persona may not refresh during login; deleted account data remains downstream | Confirm exact login endpoint/payload, timeout/circuit-breaker, cache/source for previous Workplace permission, consumer ownership, and deletion SLA. |
| TCCT OCR | UF-1.5-001 | Deferred parking e-stamp recognition | OCR endpoint, ticket token, confidence score | Deferred; High for Phase 1.5 | Phase 1.5 SIT/UAT | Automated e-stamp cannot launch | Reserve data model now; avoid rework in payment/ticket flows. |
